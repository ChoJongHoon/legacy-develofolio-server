import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { DynamooseModule } from 'nestjs-dynamoose'
import { AuthModule } from './modules/auth/auth.module'
import { BucketModule } from './modules/bucket/bucket.module'
import { UserModule } from './modules/user/user.module'

@Module({
	imports: [
		GraphQLModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				autoSchemaFile: true,
				playground: true,
				context: ({ req, res }) => {
					return { req, res }
				},
				cors: {
					origin: configService.get('CLIENT'),
					credentials: true,
				},
			}),
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DynamooseModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				local: true,
				aws: {
					accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
					secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
					region: 'ap-northeast-2',
				},
				model: {
					create: false,
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
		BucketModule,
	],
})
export class AppModule {}
