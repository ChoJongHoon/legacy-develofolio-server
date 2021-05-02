declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production' | 'test'
		readonly HOST: string
		readonly CLIENT: string

		readonly GITHUB_CLIENT_ID: string
		readonly GITHUB_CLIENT_SECRET: string
	}
}
