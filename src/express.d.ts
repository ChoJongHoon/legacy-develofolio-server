import { User as UserModel } from './modules/user/model/user.model'

declare global {
	namespace Express {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface User extends UserModel {}
	}
}
