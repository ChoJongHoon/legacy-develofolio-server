import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { DynamooseModule } from 'nestjs-dynamoose'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			playground: true,
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DynamooseModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				// local: true,
				aws: {
					accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
					secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
					region: 'ap-northeast-2',
				},
				model: {
					create: true,
					prefix: `${configService.get('SERVICE')}-${configService.get(
						'STAGE'
					)}-`,
					suffix: '-table',
				},
			}),
			inject: [ConfigService],
		}),
		AuthModule,
		UserModule,
	],
})
export class AppModule {}
