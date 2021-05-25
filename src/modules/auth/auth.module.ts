import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import AuthController from './auth.controller'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { GithubStrategy } from './strategy/github.strategy'
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
				signOptions: {
					expiresIn: `${configService.get(
						'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
					)}s`,
				},
			}),
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		GithubStrategy,
		AuthResolver,
		JwtStrategy,
		JwtRefreshStrategy,
	],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
