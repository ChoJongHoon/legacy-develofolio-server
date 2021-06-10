import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountModule } from '../account/account.module'
import { User } from './user.model'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([User]), AccountModule],
	controllers: [],
	providers: [UserService, UserResolver],
})
export class UserModule {}
