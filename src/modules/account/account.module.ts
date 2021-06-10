import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from './account.model'

@Module({
	imports: [TypeOrmModule.forFeature([Account])],
	controllers: [],
	providers: [],
})
export class AccountModule {}
