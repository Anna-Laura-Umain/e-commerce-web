# Component and file audit — 9 October 2026

Base: `1727818` on `main`, after the first cleanup was merged.
Branch: `audit/components-and-files`.

## Review process and scope

Two agents started a broad static audit of frontend components, routes, stores,
queries, types, and Studio schemas/configuration. The second agent independently
identified defects and sent findings to the editing agent. Both agents hit a usage
limit before final review; the primary agent finished the partial changes and
reviewed/tested the resulting diff. This is not a completed independent-agent
approval or an exhaustive guarantee that every file is defect-free.

## Fixed

- Checkout rejects malformed JSON, invalid quantities, duplicate product IDs,
  unavailable/missing products, and invalid prices. It no longer silently creates
  payment for a partial cart. Prices and availability come from current published
  Sanity data rather than browser values or the CDN cache.
- Checkout return URLs use the request URL origin rather than the caller-supplied
  Origin header.
- Preserved the older slug product route, restricted it by category, and reused
  the working product-details/cart component. Current ID-based URLs are unchanged.
- Product lists include `_type`; category and level helpers handle legacy saved
  favorites and avoid treating a tea with `roastLevel: null` as coffee.
- Missing flavor notes no longer cause product card/details rendering to fail.
- Price formatting preserves decimal values rather than rounding to whole SEK.
- The Add to Cart label follows the existing mounted-state convention to avoid
  differing initial server/client output with a persisted cart.
- Sitemap URLs include their protocol, include coffee/tea catalogs, and exclude
  nonexistent blog routes and pages without slugs. Only published CMS pages are used.
- Removed obsolete commented query/demo fragments and regenerated query types.

## Findings still requiring follow-up

| Priority | Finding | Files / next step |
| --- | --- | --- |
| Medium | Revisiting a paid success URL clears the entire current cart again, including items added later. | `frontend/components/ClearCart.tsx`, `frontend/app/checkout/success/page.tsx`: associate clearing with the completed checkout once, ideally with the purchased items. |
| Medium | Unknown CMS page URLs show editor onboarding instead of a public 404. | `frontend/app/[slug]/page.tsx`: keep onboarding in draft mode and use `notFound()` for public requests. |
| Medium | Product schema fields are optional while handwritten types assume complete data. | `studio/src/schemaTypes/documents/sharedProductFields.ts`, `frontend/types/sharedProduct.ts`: agree required fields and migrate/validate existing content before tightening types. |
| Low | `/shop` is a placeholder; cards/details use a shared coffee image for every product. | `frontend/app/shop/page.tsx`, `frontend/components/ProductCard.tsx`, `frontend/components/ProductDetails.tsx`: requires the intended catalog layout and image content. |
| Low | Nested main landmarks and heading links without matching IDs/accessibility labels remain. | `frontend/app/layout.tsx`, page components, `frontend/components/PortableText.tsx`: perform a focused accessibility pass. |
| Low | Studio preview config and link resolvers still support post URLs although no post route exists. | `studio/sanity.config.ts`, `frontend/sanity/lib/utils.ts`: decide whether blog support is planned; inspect CMS content before removal. |

Active schemas and CMS content were not deleted. Seed/delete scripts were not run.
No new payment fulfillment, inventory, or order-management features were added.

## Verification

- `npm run type-check`: passes for Studio and frontend.
- `npm run lint`: passes.
- `node --test frontend/tests/audit.test.mjs`: six tests pass. They exercise actual
  modules with mocked Sanity/Stripe/Next boundaries; they do not make payments.
- Sanity query type generation and `git diff --check`: pass.

A production build, browser interactions, real Stripe checkout, and live CMS data
were not verified. Before merging, smoke-test coffee/tea lists, favorites, both
product URL formats where content exists, cart refresh, and Stripe test checkout
in a configured preview environment.
