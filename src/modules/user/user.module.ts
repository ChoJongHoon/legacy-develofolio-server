import { Module } from '@nestjs/common'
import { DynamooseModule } from 'nestjs-dynamoose'
import { UserResolver } from './user.resolver'
import { UserSchema } from './user.schema'
import { UserService } from './user.service'

@Module({
	imports: [DynamooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
	providers: [UserService, UserResolver],
	exports: [UserService],
})
export class UserModule {}
