import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { User } from '../user/model/user.model'
import { BucketService } from './bucket.service'
import { SignedUrlType } from './model/file-upload.args'

@Resolver()
export class BucketResolver {
	constructor(readonly bucketService: BucketService) {}

	@Query(/* istanbul ignore next */ () => SignedUrlType)
	@UseGuards(GqlAuthGuard)
	profileUploadPath(
		@CurrentUser() user: User,
		@Args('filename', { type: /* istanbul ignore next */ () => String })
		filename: string
	): SignedUrlType {
		const contentType = this.bucketService.getContentType(filename)
		const uniqueFilename = this.bucketService.generateFilename(filename)

		const filePath = `images/${user.id}/profile/${uniqueFilename}`

		const uploadPath = this.bucketService.createUploadUrl(filePath, contentType)

		return {
			filename: uniqueFilename,
			uploadPath,
		}
	}
}
