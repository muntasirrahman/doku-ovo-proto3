export type OvoPaymentRequest = {
	customer: {
		id: string;
		name?: string;
		phone?: string;
		email?: string;
		additional_info?: string;
	};
	additional_info?: {};
	order: {
		invoice_number: string;
		line_items?: {
			name: string;
			price: number;
			quantity: number;
		}[];
		amount: number;
	};
	ovo_account: {
		token_id: string;
		payment_use_ovo_point?: boolean;
		first_payment?: boolean;
	};
};

export type OvoPaymentResponse = {
	customer: {
		id: string;
		name?: string;
		email?: string;
		phone?: string;
		additional_info?: string;
	};
	additional_info?: {};
	order: {
		invoice_number: string;
		line_items?: {
			name: string;
			price: number;
			quantity: number;
		}[];
		amount: number;
	};
	payment: {
		status: "SUCCESS" | "PENDING" | "TOKEN_EXPIRED";
	};
};

export async function makePayment() {
	const response: OvoPaymentResponse = {
		customer: {
			id: "CUST_UAT_31",
			name: "QA Shifter OVO Recurring",
			email: "cobacobacoba9999@gmail.com",
			phone: "087123123021",
			additional_info: "None",
		},
		additional_info: {},
		order: {
			invoice_number: "INVR_2021_7105",
			line_items: [
				{
					name: "Netflix",
					price: 5000,
					quantity: 1,
				},
			],
			amount: 100000,
		},
		payment: {
			status: "SUCCESS",
		},
	};
	return response;
}
