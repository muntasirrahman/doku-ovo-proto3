export type OvoUnbindRequest = {
	customer: {
		id: string;
		name: string;
	};
	ovo_account: {
		token_id: string;
	};
};

export type OvoUnbindResponse = {
	customer: {
		id: string;
		name: string;
	};
	ovo_account: {
		token_id: string;
		status: "SUCCESS";
		message?: string;
	};
};

export async function invokeUnbind(request: OvoUnbindRequest) {
	const response: OvoUnbindResponse = {
		customer: {
			id: "TEST-CIMBXDOKU-05",
			name: "DOKUXCIMB",
		},
		ovo_account: {
			token_id: "1614dc147e404f41f6d2de877fda1f94",
			status: "SUCCESS",
			message: "Success Unbinding Ovo Account",
		},
	};
	return response;
}
