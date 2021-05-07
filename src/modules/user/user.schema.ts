import { Schema } from 'dynamoose'

export const UserSchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	username: {
		type: String,
	},
	provider: {
		type: String,
	},
	createAt: {
		type: String,
	},
})
