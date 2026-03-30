export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string;
					email: string | null;
					free_credits: number;
					subscription_status: string | null;
					stripe_customer_id: string | null;
				};
				Insert: {
					id: string;
					email?: string | null;
					free_credits?: number;
					subscription_status?: string | null;
					stripe_customer_id?: string | null;
				};
				Update: {
					id?: string;
					email?: string | null;
					free_credits?: number;
					subscription_status?: string | null;
					stripe_customer_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
				];
			};
			generations: {
				Row: {
					id: string;
					user_id: string;
					tool_used: string;
					input_data: Json;
					output_text: string;
					created_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					tool_used: string;
					input_data: Json;
					output_text: string;
					created_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					tool_used?: string;
					input_data?: Json;
					output_text?: string;
					created_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'generations_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
