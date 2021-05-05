import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			playground: true,
		}),
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
	],
})
export class AppModule {}
