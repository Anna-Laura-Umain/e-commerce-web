import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

async function seedShopFilters() {
  await client.createIfNotExists({
    _id: "shopFilters",
    _type: "shopFilters",
    coffee: [
      {
        _key: "origin",
        _type: "filterGroup",
        field: "origin",
        label: "Origin",
      },
      {
        _key: "level",
        _type: "filterGroup",
        field: "level",
        label: "Roast level",
      },
      {
        _key: "inStock",
        _type: "filterGroup",
        field: "inStock",
        label: "Availability",
      },
    ],
    tea: [
      {
        _key: "origin",
        _type: "filterGroup",
        field: "origin",
        label: "Origin",
      },
      {
        _key: "level",
        _type: "filterGroup",
        field: "level",
        label: "Oxidation level",
      },
      {
        _key: "inStock",
        _type: "filterGroup",
        field: "inStock",
        label: "Availability",
      },
    ],
  });
  console.log("Shop filters are ready");
}

seedShopFilters().catch((error) => {
  console.error(error);
  process.exit(1);
});
