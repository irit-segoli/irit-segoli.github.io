import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
	schema: z
		.object({
			title: z.string(),
			year: z.number().int().optional(),
			date: z.coerce.date().optional(),
			publication: z.string().optional(),
			type: z
				.enum(['academic', 'chapter', 'catalog-essay', 'curatorial-text', 'op-ed', 'other'])
				.default('academic'),
			language: z.enum(['he', 'en', 'ar']).default('he'),
			coAuthors: z.array(z.string()).default([]),
			abstract: z.string().optional(),
			tags: z.array(z.string()).default([]),
			section: z.enum(['general', 'justice', 'more']).default('general'),
			hasFullText: z.boolean().default(false),
			pdf: z.string().optional(),
			externalUrl: z.url().optional(),
			thumbnail: z.string().optional(),
			pending: z.boolean().default(false),
			pendingNote: z.string().optional(),
			order: z.number().optional(),
			draft: z.boolean().default(false),
		})
		.refine((d) => d.pending || d.hasFullText || d.pdf || d.externalUrl, {
			message: 'Article needs full text, a PDF, or an external link (or must be marked pending)',
		})
		.refine((d) => d.pending || d.year !== undefined, {
			message: 'Article needs a year unless it is marked pending',
		}),
});

const exhibitions = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/exhibitions' }),
	schema: z
		.object({
			title: z.string(),
			year: z.number().int().optional(),
			date: z.coerce.date().optional(),
			language: z.enum(['he', 'en', 'ar']).default('he'),
			venue: z.string().optional(),
			description: z.string().optional(),
			curators: z.array(z.string()).default([]),
			artists: z.array(z.string()).default([]),
			// Label shown before the artist names; defaults to אמן (one artist) or אמנים (several)
			artistsLabel: z.string().optional(),
			hasCuratorialText: z.boolean().default(false),
			invitation: z.string().optional(),
			catalogPdf: z.string().optional(),
			catalogPdfEn: z.string().optional(),
			installationImages: z.array(z.string()).default([]),
			reviews: z
				.array(
					z.object({
						author: z.string(),
						title: z.string(),
						publication: z.string(),
						issue: z.string().optional(),
						date: z.string().optional(),
						url: z.url().optional(),
						pdf: z.string().optional(),
						found: z.boolean().default(false),
					}),
				)
				.default([]),
			relatedArticles: z.array(reference('articles')).default([]),
			tags: z.array(z.string()).default([]),
			pending: z.boolean().default(false),
			pendingNote: z.string().optional(),
			draft: z.boolean().default(false),
		})
		.refine(
			(d) =>
				d.pending ||
				d.hasCuratorialText ||
				d.invitation ||
				d.catalogPdf ||
				d.installationImages.length > 0,
			{ message: 'Exhibition needs a curatorial text, invitation scan, catalog, or installation photo (or must be marked pending)' },
		)
		.refine((d) => d.pending || d.year !== undefined, {
			message: 'Exhibition needs a year unless it is marked pending',
		}),
});

export const collections = { articles, exhibitions };
