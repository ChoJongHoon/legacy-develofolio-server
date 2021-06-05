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
			type: Object,
			schema: {
				github: { type: String, required: false },
				stackOverflow: { type: String, required: false },
				facebook: { type: String, required: false },
				twitter: { type: String, required: false },
			},
			required: false,
		},
		createAt: {
			type: String,
		},
	},
	{ saveUnknown: ['content.**'] }
)
