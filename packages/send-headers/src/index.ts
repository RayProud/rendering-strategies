const TEST_HEADER_NAME = "X-Test";

export type CreatePostLoggerRequestOptions = {
	url?: string;
	headers?: HeadersInit;
	body?: BodyInit | null;
};

function defaultEndpoint() {
	if (typeof process !== "undefined" && process.env?.POST_LOGGER_ENDPOINT) {
		return process.env.POST_LOGGER_ENDPOINT;
	}
	return "http://127.0.0.1:4000/";
}

function ensureBody(body: BodyInit | null | undefined) {
	if (body !== undefined && body !== null) {
		return body;
	}

	return JSON.stringify({ sentAt: new Date().toISOString() });
}

function getRandomHeaderValue() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
		try {
			return crypto.randomUUID();
		} catch (error) {
			console.warn(
				"Failed to generate UUID for X-Test header, falling back",
				error,
			);
		}
	}

	return Math.random().toString(16).slice(2);
}

function buildHeaders(headers: HeadersInit | undefined) {
  const composed = new Headers(headers);
  const randomHeaderValue = getRandomHeaderValue();
  if (!composed.has("content-type")) {
    composed.set("content-type", "application/json");
  }
  composed.set(TEST_HEADER_NAME, randomHeaderValue);
  return composed;
}

export function createPostLoggerRequest(
	options: CreatePostLoggerRequestOptions = {},
): Request {
	const url = options.url ?? defaultEndpoint();
	const headers = buildHeaders(options.headers);
	const requestBody = ensureBody(options.body);

	return new Request(url, {
		method: "POST",
		headers,
		body: requestBody,
	});
}

export { TEST_HEADER_NAME };
