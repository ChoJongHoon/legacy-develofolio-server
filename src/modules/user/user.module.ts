import { Module } from '@nestjs/common'
import { DynamooseModule } from 'nestjs-dynamoose'
import { BucketModule } from '../bucket/bucket.module'
import { UserResolver } from './user.resolver'
import { UserSchema } from './user.schema'
import { UserService } from './user.service'

@Module({
	imports: [
		DynamooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
		BucketModule,
	],
	providers: [UserService, UserResolver],
	exports: [UserService],
})
export class UserModule {}
