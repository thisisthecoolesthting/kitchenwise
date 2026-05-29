declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"a-practical-blenders-gift-guide-2.md": {
	id: "a-practical-blenders-gift-guide-2.md";
  slug: "a-practical-blenders-gift-guide-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"a-practical-cast-iron-gift-guide-3.md": {
	id: "a-practical-cast-iron-gift-guide-3.md";
  slug: "a-practical-cast-iron-gift-guide-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"a-practical-instant-pots-gift-guide.md": {
	id: "a-practical-instant-pots-gift-guide.md";
  slug: "a-practical-instant-pots-gift-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"air-fryers-essentials-for-weekend-projects-3.md": {
	id: "air-fryers-essentials-for-weekend-projects-3.md";
  slug: "air-fryers-essentials-for-weekend-projects-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"air-fryers-setup-checklist-for-beginners.md": {
	id: "air-fryers-setup-checklist-for-beginners.md";
  slug: "air-fryers-setup-checklist-for-beginners";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-fryer-2024.md": {
	id: "best-air-fryer-2024.md";
  slug: "best-air-fryer-2024";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-bakeware-upgrades-for-small-spaces-2.md": {
	id: "best-bakeware-upgrades-for-small-spaces-2.md";
  slug: "best-bakeware-upgrades-for-small-spaces-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-cast-iron-skillet.md": {
	id: "best-cast-iron-skillet.md";
  slug: "best-cast-iron-skillet";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-cookware-upgrades-for-small-spaces.md": {
	id: "best-cookware-upgrades-for-small-spaces.md";
  slug: "best-cookware-upgrades-for-small-spaces";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-food-processors-upgrades-for-small-spaces-3.md": {
	id: "best-food-processors-upgrades-for-small-spaces-3.md";
  slug: "best-food-processors-upgrades-for-small-spaces-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"budget-versus-premium-kitchen-gadgets-what-actually-matters-3.md": {
	id: "budget-versus-premium-kitchen-gadgets-what-actually-matters-3.md";
  slug: "budget-versus-premium-kitchen-gadgets-what-actually-matters-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"budget-versus-premium-knives-what-actually-matters-2.md": {
	id: "budget-versus-premium-knives-what-actually-matters-2.md";
  slug: "budget-versus-premium-knives-what-actually-matters-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"budget-versus-premium-stand-mixers-what-actually-matters.md": {
	id: "budget-versus-premium-stand-mixers-what-actually-matters.md";
  slug: "budget-versus-premium-stand-mixers-what-actually-matters";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"carbon-steel-essentials-for-weekend-projects-2.md": {
	id: "carbon-steel-essentials-for-weekend-projects-2.md";
  slug: "carbon-steel-essentials-for-weekend-projects-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"carbon-steel-vs-cast-iron.md": {
	id: "carbon-steel-vs-cast-iron.md";
  slug: "carbon-steel-vs-cast-iron";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"cookware-setup-checklist-for-beginners-3.md": {
	id: "cookware-setup-checklist-for-beginners-3.md";
  slug: "cookware-setup-checklist-for-beginners-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"cutting-boards-setup-checklist-for-beginners-2.md": {
	id: "cutting-boards-setup-checklist-for-beginners-2.md";
  slug: "cutting-boards-setup-checklist-for-beginners-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"food-processors-essentials-for-weekend-projects.md": {
	id: "food-processors-essentials-for-weekend-projects.md";
  slug: "food-processors-essentials-for-weekend-projects";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-compare-bakeware-before-you-buy-3.md": {
	id: "how-to-compare-bakeware-before-you-buy-3.md";
  slug: "how-to-compare-bakeware-before-you-buy-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-compare-cookware-before-you-buy-2.md": {
	id: "how-to-compare-cookware-before-you-buy-2.md";
  slug: "how-to-compare-cookware-before-you-buy-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-compare-cutting-boards-before-you-buy.md": {
	id: "how-to-compare-cutting-boards-before-you-buy.md";
  slug: "how-to-compare-cutting-boards-before-you-buy";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"instant-pots-buying-mistakes-to-avoid-3.md": {
	id: "instant-pots-buying-mistakes-to-avoid-3.md";
  slug: "instant-pots-buying-mistakes-to-avoid-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"kitchen-gadgets-buying-mistakes-to-avoid-2.md": {
	id: "kitchen-gadgets-buying-mistakes-to-avoid-2.md";
  slug: "kitchen-gadgets-buying-mistakes-to-avoid-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"knives-buying-mistakes-to-avoid.md": {
	id: "knives-buying-mistakes-to-avoid.md";
  slug: "knives-buying-mistakes-to-avoid";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"storage-and-maintenance-tips-for-blenders.md": {
	id: "storage-and-maintenance-tips-for-blenders.md";
  slug: "storage-and-maintenance-tips-for-blenders";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"storage-and-maintenance-tips-for-cast-iron-2.md": {
	id: "storage-and-maintenance-tips-for-cast-iron-2.md";
  slug: "storage-and-maintenance-tips-for-cast-iron-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"storage-and-maintenance-tips-for-stand-mixers-3.md": {
	id: "storage-and-maintenance-tips-for-stand-mixers-3.md";
  slug: "storage-and-maintenance-tips-for-stand-mixers-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-quiet-features-that-make-cast-iron-easier-to-use.md": {
	id: "the-quiet-features-that-make-cast-iron-easier-to-use.md";
  slug: "the-quiet-features-that-make-cast-iron-easier-to-use";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-quiet-features-that-make-knives-easier-to-use-3.md": {
	id: "the-quiet-features-that-make-knives-easier-to-use-3.md";
  slug: "the-quiet-features-that-make-knives-easier-to-use-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-quiet-features-that-make-stand-mixers-easier-to-use-2.md": {
	id: "the-quiet-features-that-make-stand-mixers-easier-to-use-2.md";
  slug: "the-quiet-features-that-make-stand-mixers-easier-to-use-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"when-to-replace-your-air-fryers-gear-2.md": {
	id: "when-to-replace-your-air-fryers-gear-2.md";
  slug: "when-to-replace-your-air-fryers-gear-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"when-to-replace-your-carbon-steel-gear.md": {
	id: "when-to-replace-your-carbon-steel-gear.md";
  slug: "when-to-replace-your-carbon-steel-gear";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"when-to-replace-your-cutting-boards-gear-3.md": {
	id: "when-to-replace-your-cutting-boards-gear-3.md";
  slug: "when-to-replace-your-cutting-boards-gear-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
};
"authors": {
"claire-nakamura.md": {
	id: "claire-nakamura.md";
  slug: "claire-nakamura";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"dana-wolff.md": {
	id: "dana-wolff.md";
  slug: "dana-wolff";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"eli-rowe.md": {
	id: "eli-rowe.md";
  slug: "eli-rowe";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"marcus-chen.md": {
	id: "marcus-chen.md";
  slug: "marcus-chen";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"nate-brennan.md": {
	id: "nate-brennan.md";
  slug: "nate-brennan";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"rosa-linden.md": {
	id: "rosa-linden.md";
  slug: "rosa-linden";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
};
"pillars": {
"essential-kitchen-equipment-guide.md": {
	id: "essential-kitchen-equipment-guide.md";
  slug: "essential-kitchen-equipment-guide";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"instant-pot-mastery-guide.md": {
	id: "instant-pot-mastery-guide.md";
  slug: "instant-pot-mastery-guide";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"knife-guide-home-chefs.md": {
	id: "knife-guide-home-chefs.md";
  slug: "knife-guide-home-chefs";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
};
"products": {
"b00004ocij-lodge-cast-iron-skillet-10in.md": {
	id: "b00004ocij-lodge-cast-iron-skillet-10in.md";
  slug: "b00004ocij-lodge-cast-iron-skillet-10in";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b002xvnjdw-silpat-nonstick-baking-mat-set.md": {
	id: "b002xvnjdw-silpat-nonstick-baking-mat-set.md";
  slug: "b002xvnjdw-silpat-nonstick-baking-mat-set";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b009jxps6u-wusthof-classic-8in-chefs-knife.md": {
	id: "b009jxps6u-wusthof-classic-8in-chefs-knife.md";
  slug: "b009jxps6u-wusthof-classic-8in-chefs-knife";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00flywnyq-oxo-good-grips-11lb-scale.md": {
	id: "b00flywnyq-oxo-good-grips-11lb-scale.md";
  slug: "b00flywnyq-oxo-good-grips-11lb-scale";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07gtqvcr8-instant-pot-duo-7-in-1-6qt.md": {
	id: "b07gtqvcr8-instant-pot-duo-7-in-1-6qt.md";
  slug: "b07gtqvcr8-instant-pot-duo-7-in-1-6qt";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
