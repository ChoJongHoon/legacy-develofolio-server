import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import * as ormconfig from './ormconfig'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...ormconfig,
			entities: null,
			autoLoadEntities: true,
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			context: ({ req, res }: { req: Request; res: Response }) => {
				return { req, res }
			},
			playground: {
				settings: {
					'request.credentials': 'include',
				},
			},
		}),
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
