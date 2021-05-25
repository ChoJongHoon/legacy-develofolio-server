import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as AWS from 'aws-sdk'
import mimeTypes from 'mime-types'
import tmp from 'tmp'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

@Injectable()
export class BucketService {
	s3: AWS.S3

	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService
	) {
		this.s3 = new AWS.S3({
			region: configService.get('AWS_REGION'),
			accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
			secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
		})
	}

	async syncProfileImage(url: string, id: string) {
		const response = await this.httpService
			.get(encodeURI(url), {
				responseType: 'stream',
			})
			.toPromise()

		const contentType = response.headers['content-type']
		const extension = mimeTypes.extension(contentType)

		const tmpObject = tmp.fileSync()
		const writeStream = fs.createWriteStream(tmpObject.name)
		response.data.pipe(writeStream)

		await new Promise<void>((resolve) => {
			writeStream.on('finish', () => {
				resolve()
			})
		})

		const stream = fs.createReadStream(tmpObject.name)

		const filename = `${uuid()}.${extension}`
		const key = `images/${id}/profile/${filename}`

		// upload
		await this.s3
			.upload({
				Bucket: 'develofoilo-resource',
				Key: key,
				Body: stream,
				ContentType: contentType,
			})
			.promise()

		tmpObject.removeCallback()

		return { filename }
	}
}
