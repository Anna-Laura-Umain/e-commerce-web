# Leaf & Bean

Short description: an online store for a small tea and coffee shop. All products and page content are managed in Sanity Studio, so the shop owner can update the range without touching code.

Built by Anna Baidikova and Laura Lundin as an intern case at Umain.

**Live:**

- Website: https://e-commerce-web-ta8t.vercel.app/
- Sanity Studio: https://anna-laura-org.sanity.studio/ (requires access to the Sanity project)

## Tech stack

Next.js, Sanity, TypeScript, Tailwind

## Getting started

Clone the repo and run `npm install`
Create `frontend/.env.local` and `studio/.env` (ask a teammate for values)
`npm run dev` — frontend on localhost:3000, Studio on localhost:3333

## Project structure

`frontend/` — Next.js site
`studio/` — Sanity Studio, content schemas

## Content model

**Coffee & Tea:** product documents that share a common set of fields (image, name, origin, flavour notes, price, availability, description, processing method and brewing instructions). Coffee adds a roast level. Tea adds an oxidation level and a tea type.

**Page:** content pages with a name, slug, heading and subheading. The page body is built from reusable blocks: Call to Action and Info Section.

**Home Page** (singleton): the hero section, with a small text above the heading, the heading itself, body text, a main and a secondary button, and a background image. If no image is set, a default image is used.

**Settings** (singleton): global site settings. These include the store title, an SEO description, an Open Graph image and the navigation. Navigation items reference Page documents, so editors can manage menu links without changing code.

**Shop Filters** (singleton): filter setup for the Coffee and Tea pages, each configured separately. Editors choose which filters to show (origin, roast/oxidation level, in stock), set their labels and drag them into order. The filter options come from the product data.

**Reusable objects:** `callToAction`, `infoSection`, `button`, `link`, `blockContent` and `blockContentTextOnly`. These are building blocks used inside the documents above.

## Git workflow

`main` is protected: no direct pushes, no force pushes, no deletion.
Every change goes through a pull request with one approval from the other person.

### Branches

One task, one branch, created from an up-to-date `main`:

`feature/` new functionality
`fix/` bug fixes
`refactor/` code changes without new behavior
`docs/` documentation
`chore/` config, dependencies, cleanup

Names are lowercase with hyphens, e.g. `feature/product-schema`.

### Flow

`git checkout main && git pull`
`git checkout -b feature/short-name`
Commit, push, open a PR
The other person reviews and approves
Merge and delete the branch

## What We Learned

This project gave us hands-on experience with new technologies and helped us improve both our technical and collaboration skills.

### Technical Skills

- **Sanity CMS:** Learned how to create schemas, manage content, write GROQ queries, and build CMS-driven pages, navigation, and filters.
- **Zustand:** Gained experience with shared state management, persistence, and keeping UI components in sync with application state.
- **Next.js:** Improved our understanding of the App Router, dynamic routes, Server and Client Components, and API routes.
- **Stripe:** Learned how to integrate a payment service, create checkout sessions, and handle payment verification securely.
- **Mock Data:** Used Faker.js to generate test products and wrote scripts to seed data into Sanity.
- **Reusable Components:** Practiced refactoring code, reducing duplication, and creating shared solutions for different product types.

### Collaboration & Workflow

- **GitHub Workflow:** Practiced working with feature branches, pull requests, code reviews, and branch protection rules.
- **Task Management:** Used a GitHub Kanban board to organize our backlog, track progress, and balance tasks by complexity.
- **Knowledge Sharing:** Made sure both developers had opportunities to practice new technologies, even when it meant refactoring our initial solutions later.
- **Daily Communication:** Used short daily syncs to discuss progress, blockers, and next steps.

### Key Takeaway

Beyond building a functional e-commerce website, we learned how to approach unfamiliar technologies, make technical decisions together, and improve our solutions through collaboration and refactoring.

## Credits

Based on [sanity-template-nextjs-clean](https://github.com/sanity-io/sanity-template-nextjs-clean).
The original template README is in `docs/template-readme.md`.
The project brief is in `docs/Sanity_&_NextJS_e-commerce_store_(intern_case).pdf`.

### Updating types after a schema change

Whenever a schema in `studio/` changes, regenerate the TypeScript types so the frontend knows about the new fields:

1. From `studio/`, extract the schema to the project root:
   `npx sanity schema extract --path=../sanity.schema.json`
2. From `frontend/`, generate types:
   `npx sanity typegen generate`
   This updates `frontend/sanity.types.ts`, which is used by the frontend queries and components.
   Both `sanity.schema.json` and `sanity.types.ts` are committed together with the schema change.

## Mock Data

Mock data for products is generated with [Faker.js](https://fakerjs.dev/) and seeded directly into Sanity.

### Structure

Mock data and seed scripts are located in the `studio` directory:

```text
studio/
├── mock-data/
│   ├── coffees.json            # generated coffee products
│   └── teas.json               # generated tea products
├── scripts/
│   ├── sanityClient.ts         # shared Sanity client used by the scripts
│   ├── generate-coffee.ts      # creates mock-data/coffees.json with Faker.js
│   ├── generate-tea.ts         # creates mock-data/teas.json with Faker.js
│   ├── seed-coffee.ts          # uploads coffees to Sanity
│   ├── seed-tea.ts             # uploads teas to Sanity
│   ├── delete-coffee.ts        # removes seeded coffee documents
│   ├── seed-home.ts            # seeds home page content
│   └── seed-shop-filters.ts    # seeds shop filter options
└── src/
    └── schemaTypes/
        └── documents/
            ├── coffee.ts
            ├── tea.ts
            └── sharedProductFields.ts   # fields shared by coffee and tea
```

### How to Create and Seed Mock Data

If you need to create new mock data, follow these steps:

#### 1. Install dependencies

From the `studio` directory:

```bash
npm install
```

#### 2. Configure Sanity environment variables

Create or update `studio/.env`:

```env
SANITY_API_WRITE_TOKEN="your-write-token-check-in-studio"
```

#### 3. Create a mock data generator

For a new type of mock data, create a generator script in `studio/scripts/`.

For example, the coffee generator is located at `studio/scripts/generate-coffee.ts`. It uses Faker.js to create mock coffee data based on the Sanity product schema and saves the output to `studio/mock-data/coffees.json`.

#### 4. Generate mock data

(coffee generator example)
From the `studio` directory, run:

```bash
npm run generate:coffee
```

This runs `scripts/generate-coffee.ts` and generates `mock-data/coffees.json`.

#### 5. Seed the data into Sanity

The seed script reads the generated `coffees.json` file and creates the corresponding product documents in Sanity.

Run:

```bash
npm run seed:coffee
```

The script uses Sanity Client's `createOrReplace()` method. If a document with the same `_id` already exists in Sanity, it will be overwritten rather than duplicated.

---

### Adding New Mock Data Types

When adding another type of mock data, follow the same pattern (e.g., for tea):

```text
studio/
├── mock-data/
│   ├── coffees.json
│   └── teas.json
└── scripts/
    ├── generate-coffee.ts
    ├── seed-coffee.ts
    ├── generate-tea.ts
    └── seed-tea.ts
```

Add corresponding npm scripts to `studio/package.json`:

```json
{
  "scripts": {
    "generate:coffee": "tsx scripts/generate-coffee.ts",
    "seed:coffee": "tsx scripts/seed-coffee.ts",
    "generate:tea": "tsx scripts/generate-tea.ts",
    "seed:tea": "tsx scripts/seed-tea.ts"
  }
}
```

Then run:

```bash
npm run generate:tea
npm run seed:tea
```

---
