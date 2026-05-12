export const TOOL_CONFIG = {
	estimator: {
		title: 'Bid-to-Win Estimator',
		description: 'Generate 3-tier proposals instantly.',
		free: true,
		fields: [
			{
				name: 'clientName',
				label: 'Client Name',
				type: 'text',
				placeholder: 'Sarah',
				required: true,
			},
		],
	},
	price_objection: {
		title: 'Price Objection Killer',
		description: 'Handle “too expensive” like a pro.',
		free: false,
		fields: [
			{
				name: 'objection',
				label: 'Client Objection',
				type: 'text',
				placeholder: 'Too expensive',
				required: true,
			},
		],
	},
} as const;

export type ToolKey = keyof typeof TOOL_CONFIG;
export type ToolConfig = (typeof TOOL_CONFIG)[ToolKey];
export type FieldType = 'text' | 'textarea';

export interface FieldConfig {
	name: string;
	label: string;
	placeholder?: string;
	type: FieldType;
}
