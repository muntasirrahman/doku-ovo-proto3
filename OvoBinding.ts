import axios, { AxiosError, AxiosResponse } from "axios";
import {
	AppConfiguration,
	calculateSignature,
	generateRequestId,
	generateTimestamp,
} from "./DokuOvo";

type ErrorResponse = {
	code: string;
	message: String;
	type: String;
};

export type OvoBindingRequest = {
	customer: {
		id: string;
		name?: string;
		phone?: string;
		email?: string;
		additional_info?: "None";
	};
	ovo_account: {
		account_mobile_phone: string;
		account_email?: string;
		success_registration_url: string;
		failed_registration_url: string;
	};
	service_type: "RECURRING";
};

export type OvoBindingResponse = {
	customer: {
		id: string;
		name?: string;
		email?: string;
		phone?: string;
		additional_info: "None";
	};
	ovo_account: {
		registration_url: string;
		status: string;
	};
};

export async function createBindingRequest(
	mobileNumber: string,
	email?: string,
	requestId?: string
): Promise<OvoBindingRequest | any> {
	if (!requestId) {
		requestId = generateRequestId();
	}

	const request: OvoBindingRequest = {
		customer: {
			id: requestId,
			name: "Giving Fridays Donors",
			phone: mobileNumber,
			email: email || "support@givingfridays.com",
			additional_info: "None",
		},
		ovo_account: {
			account_mobile_phone: mobileNumber,
			account_email: email || "support@givingfridays.com",
			success_registration_url: "https://www.givingfridays.com",
			failed_registration_url: "https://www.givingfridays.com",
		},
		service_type: "RECURRING",
	};
	return request;
}

export async function invokeBindingRequest(
	appConfig: AppConfiguration,
	request: OvoBindingRequest,
	requestId?: string,
	timestamp?: string
): Promise<any> {
	if (!requestId) {
		requestId = generateRequestId();
		console.log("\tGenerate Req-ID: " + requestId);
	}

	if (!timestamp) {
		timestamp = generateTimestamp();
		console.log("\tGenerate Req-Timestamp: " + timestamp);
	}

	const [signature, messageDigest] = calculateSignature(
		appConfig,
		request,
		appConfig.apiPath.customerBinding,
		requestId,
		timestamp
	);

	const signatureValue = "HMACSHA256=" + signature;

	const axiosConfig = {
		headers: {
			"Request-Id": requestId,
			"Client-Id": appConfig.clientId,
			"Request-Timestamp": timestamp,
			"Request-Target": appConfig.apiPath.customerBinding,
			Signature: signatureValue,
			Digest: messageDigest,
		},
	};

	console.log("Headers: " + JSON.stringify(axiosConfig.headers));

	const url = appConfig.baseUrl + appConfig.apiPath.customerBinding;
	console.log("URL: " + url);

	axios
		.post(url, request, axiosConfig)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			const dokuError: ErrorResponse = err.response?.data?.error;
			const errorStatus = err.response?.status;

			if (errorStatus) {
				// console.error(err);
				console.error("Status : " + errorStatus);
				console.error("Message: " + dokuError.message);
				console.error(JSON.stringify(dokuError));
			} else {
				console.log(" == UNDEFINED ERROR == ");
				console.log(JSON.stringify(err));
			}
		});
}
