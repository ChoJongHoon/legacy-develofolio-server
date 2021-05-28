import { Schema } from 'dynamoose'

export const UserSchema = new Schema(
	{
		id: {
			type: String,
			hashKey: true,
		},
		githubId: {
			type: String,
			index: {
				name: 'providerIndex',
				global: true,
			},
		},
		username: {
			type: String,
		},
		thumbnail: {
			type: String,
			required: false,
		},
		content: {
			type: Array,
			schema: [
				{
					type: Object,
				},
			],
			required: false,
		},
		createAt: {
			type: String,
		},
	},
	{ saveUnknown: ['content.**'] }
)
