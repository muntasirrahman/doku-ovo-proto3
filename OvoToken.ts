export type OvoTokenRequest = {
	customer: {
		id: string;
	};
	token_data: {
		type: "WALLET_RECURRING";
	};
};

export type OvoTokenResponse = {
	customer: {
		id: string;
		name: string;
	};
	token_data: {
		type: "WALLET_RECURRING";
	};
	wallet: {
		issuer: "OVO";
		token_id: string;
		masked_phone_number: string;
	};
};

export async function getToken(customer_id: string) {
	const response: OvoTokenResponse = {
		customer: {
			id: customer_id,
			name: "John Doe",
		},
		token_data: {
			type: "WALLET_RECURRING",
		},
		wallet: {
			issuer: "OVO",
			token_id: "aaaa",
			masked_phone_number: "****1234",
		},
	};
	return response;
}
