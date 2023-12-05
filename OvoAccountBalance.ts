export type OvoAccountBalanceRequest = {
	customer: {
		id: string;
	};
	ovo_account: {
		token_id: string;
	};
};

export type OvoAccountBalanceResponse = {
	customer: {
		id: string;
		name: string;
		email: string;
		phone: string;
		additional_info?: string;
	};
	ovo_account: {
		ovo_cash_balance: number;
		ovo_point_balance: number;
	};
};

export async function getAccountBalance(customer_id: string, token_id: string) {
	const response: OvoAccountBalanceResponse = {
		customer: {
			id: "1232131321",
			name: "Joko",
			email: "joko@gmail.com",
			phone: "081287458232",
			additional_info: "",
		},
		ovo_account: {
			ovo_cash_balance: 100000,
			ovo_point_balance: 100000,
		},
	};
	return response;
}
