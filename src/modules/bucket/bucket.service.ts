import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'
import mimeTypes from 'mime-types'
import tmp from 'tmp'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

@Injectable()
export class BucketService {
	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService
	) {}

	async syncProfileImage(url: string, id: string) {
		const s3 = new S3()
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
		await s3
			.upload({
				Bucket: this.configService.get('AWS_S3_BUCKET'),
				Key: key,
				Body: stream,
				ContentType: contentType,
			})
			.promise()

		tmpObject.removeCallback()

		return { filename }
	}

	getContentType(filename: string) {
		const contentType = mimeTypes.lookup(filename)

		return contentType || ''
	}

	createUploadUrl(path: string, contentType?: string) {
		const s3 = new S3()
		return s3.getSignedUrl('putObject', {
			Bucket: this.configService.get('AWS_S3_BUCKET'),
			Key: path,
			ContentType: contentType,
			Expires: 60 * 60,
		})
	}

	generateFilename(filename: string) {
		const id = uuid()
		const extention = filename
			.substr(filename.lastIndexOf('.') + 1)
			.toLowerCase()

		return `${id}.${extention}`
	}
}
