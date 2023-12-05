import { OvoBindingRequest, OvoBindingResponse } from "./OvoBinding";
import { createHmac, createHash } from "crypto";

export type AppConfiguration = {
	clientId: string;
	sharedKey: string;
	baseUrl: string;
	apiPath: {
		customerBinding: string;
		customerUnbinding: string;
		tokenList: string;
		accountBalance: string;
		refund: string;
		payment: string;
	};
};
export type ErrorResponse = {
	code: string;
	message: String;
	type: String;
};
const Crypto_Algorithm = "SHA256";

export function calculateSignature(
	appConfiguration: AppConfiguration,
	requestBody: OvoBindingRequest,
	apiPath: string,
	requestId: string,
	timestamp: string
): [string, string] {
	// calculate message digest
	const requestStr = JSON.stringify(requestBody);
	const hash = createHash(Crypto_Algorithm);
	const requestBodyDigest = hash.update(requestStr).digest("base64");

	// console.log("Message Digest: " + requestBodyDigest);

	const signatureComponents =
		"Client-Id:" +
		appConfiguration.clientId +
		"\n" +
		"Request-Id:" +
		requestId +
		"\n" +
		"Request-Timestamp:" +
		timestamp +
		"\n" +
		"Request-Target:" +
		apiPath +
		"\n" +
		"Digest:" +
		requestBodyDigest;

	const hmac = createHmac(Crypto_Algorithm, appConfiguration.sharedKey);
	const signature = hmac.update(signatureComponents).digest("base64");

	console.log("\nCalculate Signature: ");
	console.log("\tRequest body: " + requestStr);
	console.log("\tInput :\n" + signatureComponents + "\n");

	console.log("\tDigest   : " + requestBodyDigest);
	console.log("\tSignature: HMACSHA256=" + signature);
	console.log("\tReq ID   : " + requestId);
	console.log("\tTimestamp: " + timestamp);

	return [signature, requestBodyDigest];
}

export const generateRequestId = (): string => {
	return String(process.hrtime.bigint());
};

export const generateTimestamp = (): string => {
	return new Date().toISOString().slice(0, 19) + "Z";
};
