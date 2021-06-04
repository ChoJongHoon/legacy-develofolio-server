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
		profile: {
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
		socialLinks: {
			type: Array,
			schema: [{ type: Object, schema: { name: String, link: String } }],
		},
		createAt: {
			type: String,
		},
	},
	{ saveUnknown: ['content.**'] }
)
