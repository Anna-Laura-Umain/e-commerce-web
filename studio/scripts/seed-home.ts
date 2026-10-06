import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

async function seedHome() {
  await client.createIfNotExists({
    _id: "homePage",
    _type: "homePage",
    hero: {
      eyebrow: "Small-batch tea & coffee",
      heading: "Tea and coffee, freshly picked for you",
      text: "Loose-leaf teas and small-batch coffee from growers we know by name.",
      primaryButton: { label: "Shop tea", href: "/shop/tea" },
      secondaryButton: { label: "Shop coffee", href: "/shop/coffee" },
    },
  });
  console.log("Home page is ready");
}

seedHome().catch((error) => {
  console.error(error);
  process.exit(1);
});
