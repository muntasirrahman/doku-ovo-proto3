import { AppConfiguration } from "./DokuOvo";
import {
	OvoBindingRequest,
	OvoBindingResponse,
	invokeBindingRequest,
	createBindingRequest,
} from "./OvoBinding";
import { configDotenv } from "dotenv";

configDotenv();

const appConfig: AppConfiguration = {
	clientId: process.env.CLIENT_ID || "",
	sharedKey: process.env.SECRET_KEY || "",
	baseUrl: process.env.BASE_URL || "",
	apiPath: {
		customerBinding: "/ovo-open-api/v1/token",
		tokenList: "/tokenization/v1/tokens",
		accountBalance: "/ovo-open-api/v1/balance",
		payment: "/ovo-open-api/v1/payment-recurring",
		refund: "/ovo-open-api/v1/payment-refund",
		customerUnbinding: "/ovo-open-api/v1/token-delete",
	},
};

console.log("Start test for");

const bindingRequest: OvoBindingRequest | any =
	createBindingRequest("081211111111");

invokeBindingRequest(appConfig, bindingRequest);

console.log("===== End =====");
