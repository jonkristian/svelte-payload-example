// payload-client.ts
import { getPayload } from 'payload';
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let payloadInstance: any;

export async function initializePayload() {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	let payloadConfigPathPrefix = '';
	if (import.meta.env.PROD) {
		payloadConfigPathPrefix = '../../../';
	}
	const payloadConfigPath = path.join(
		__dirname,
		`${payloadConfigPathPrefix}../../../cms/src/payload.config.ts`
	);

	try {
		const configModule = await import(/* @vite-ignore */ payloadConfigPath);
		const config = await configModule.default;
		payloadInstance = await getPayload({ config });
	} catch (error) {
		console.error('Error initializing Payload:', error);
		throw error;
	}
}

export async function getPayloadInstance() {
	if (!payloadInstance) {
		await initializePayload();
	}
	return payloadInstance;
}