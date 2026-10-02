# Leaf & Bean

Short description: an online store for a small tea and coffee shop. All products and page content are managed in Sanity Studio, so the shop owner can update the range without touching code. 

Built by Anna Baidikova and Laura Lundin as an intern case at Umain.

Live: (add after deploy)

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
(in progress...)


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

## What we learned
(in progress ...)

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

Mock data scripts are located in the `studio` directory:

```text
studio/
├── mock-data/
│   └── coffees.json
├── scripts/
│   ├── generate-coffee.ts
│   ├── seed-coffee.ts
│   └── sanityClient.ts
└── src/
    └── schemaTypes/
        └── documents/
            └── product.ts
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
