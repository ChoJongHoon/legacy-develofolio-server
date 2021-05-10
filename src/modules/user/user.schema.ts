import { Schema } from 'dynamoose'

export const UserSchema = new Schema({
	id: {
		type: String,
		hashKey: true,
	},
	provider: {
		type: String,
	},
	providedId: {
		type: String,
		index: {
			global: true,
			rangeKey: 'provider',
		},
	},
	username: {
		type: String,
	},
	createAt: {
		type: String,
	},
})
