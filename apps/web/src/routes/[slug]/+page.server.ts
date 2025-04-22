import { error } from '@sveltejs/kit';
import { getPayloadInstance } from '$lib/payload-client';

export const load = async ({ params }) => {
	try {
		const payload = await getPayloadInstance();
		const page = await payload.find({
			collection: 'pages',
			where: {
				slug: {
					equals: params.slug
				}
			}
		});
		
		if (!page.docs || page.docs.length === 0) {
			throw error(404, 'Page not found');
		}

		return {
			page: page.docs[0]
		};
	} catch (err: any) {
		console.error('Error loading page:', err);
		throw error(500, `Failed to load page: ${err.message || 'Unknown error'}`);
	}
};