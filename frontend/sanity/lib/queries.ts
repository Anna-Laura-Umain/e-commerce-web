import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0] {
  ...,
  navigation[]->{
    _id,
    name,
    "slug": slug.current
  }
}`);

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const productQuery = defineQuery(`*[
  _type in ["coffee", "tea"]
  && slug.current == $slug
][0]{
  _id,
  name,
  origin,
  roastLevel,
  oxidationLevel,
  flavorNotes,
  price,
  available
}`);

export const homePageQuery =
  defineQuery(`*[_type == "homePage" && _id == "homePage"][0]{
  hero{
    eyebrow,
    heading,
    text,
    primaryButton,
    secondaryButton,
    image{
      ...,
      alt,
      asset->{
        _id,
        metadata { lqip }
      }
    }
  }
}`);

// export const coffeeListQuery = defineQuery(`
//   *[_type == "coffee"
//   && (count($origins) == 0 || origin in $origins)
//   && (count($levels) == 0 || roastLevel in $levels)
//   && (!defined($inStock) || available == true)
// ]
//    | order(name asc){
//   _id,
//   name,
//   origin,
//   roastLevel,
//   flavorNotes,
//   price,
//   available
// }`);

// export const teaListQuery = defineQuery(`
//   *[_type == "tea"
//   && (!defined($origin) == 0 || origin in $origins)
//   && (!defined($level) == 0 || oxidationLevel in $levels)
//   && (!defined($inStock) == 0 || available == true)]
//   | order(name asc){
//   _id,
//   name,
//   origin,
//   oxidationLevel,
//   flavorNotes,
//   price,
//   available
// }`);

export const coffeeListQuery =
  defineQuery(`*[_type == "coffee"] | order(name asc){
  _id, 
  name, 
  origin, 
  roastLevel, 
  flavorNotes, 
  price, 
  available
}`);

export const teaListQuery = defineQuery(`*[_type == "tea"] | order(name asc){
  _id, 
  name, 
  origin, 
  oxidationLevel, 
  flavorNotes, 
  price, 
  available
}`);


export const productDetailQuery = defineQuery(`
  *[_type == $category && _id == $id][0]{
    _id,
    _type,
    name,
    origin,
    flavorNotes,
    price,
    available,
    description,
    processingMethod,
    brewingInstructions,
    roastLevel,
    oxidationLevel,
    teaType
  }
`);

// array::unique removes duplications
// export const coffeeFiltersQuery = defineQuery(` 
//   "origins": array::unique(*[_type == "coffee" && defined(origin)].origin),
//   "levels": array::unique(*[_type === "coffee" && defined(roastLevel)].roastLevel)`);

// export const teaFiltersQuery = defineQuery(` 
//   "origins": array::unique(*[_type == "tea" && defined(origin)].origin),
//   "levels": array::unique(*[_type === "tea" && defined(oxidationLevel)].oxidationLevel)`);

export const shopFiltersQuery = defineQuery(`*[_type == "shopFilters" && _id == "shopFilters"][0]{
  coffee[]{field, label},
  tea[]{field, label}
}`)

export const checkoutProductsQuery = defineQuery(`*[
  _type in ["coffee", "tea"] && _id in $ids
]{
  _id,
  name,
  price,
  available
}`)