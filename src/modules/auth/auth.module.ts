import { HttpModule, Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import AuthController from './auth.controller'
import { AuthService } from './auth.service'
import { GithubStrategy } from './strategy/github.strategy'

@Module({
	imports: [HttpModule, UserModule],
	controllers: [AuthController],
	providers: [AuthService, GithubStrategy],
})
export class AuthModule {}
