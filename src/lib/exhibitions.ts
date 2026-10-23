import type { CollectionEntry } from 'astro:content';

// Pending exhibitions still get a page once there is a review or related article to show on it
export function hasExhibitionPage(data: CollectionEntry<'exhibitions'>['data']) {
	return !data.pending || data.reviews.length > 0 || data.relatedArticles.length > 0;
}
