export type OvoRefundRequest = {
	order: {
		invoice_number: string;
	};
	payment: {
		original_request_id: string;
	};
	refund: {
		amount: number;
		reason?: string;
	};
};

export type OvoRefundResponse = {
	order: {
		invoice_number: string;
	};
	payment: {
		original_request_id: string;
	};
	refund: {
		amount: number;
		reason?: string;
		status: "SUCCESS" | "FAILED";
		message?: string;
	};
};

export async function makeRefund() {
	const response: OvoRefundResponse = {
		order: {
			invoice_number: "INV_NUMBER_D009",
		},
		payment: {
			original_request_id: "82014",
		},
		refund: {
			amount: 1000,
			reason: "Cancel Order",
			status: "SUCCESS",
			message: "SUCCESS",
		},
	};
	return response;
}
