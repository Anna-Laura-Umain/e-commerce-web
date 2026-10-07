import { person } from "./documents/person";
import { page } from "./documents/page";
import { post } from "./documents/post";
import { callToAction } from "./objects/callToAction";
import { infoSection } from "./objects/infoSection";
import { settings } from "./singletons/settings";
import { link } from "./objects/link";
import { blockContent } from "./objects/blockContent";
import button from "./objects/button";
import { blockContentTextOnly } from "./objects/blockContentTextOnly";
import { coffee } from "./documents/coffee";
import { tea } from "./documents/tea";
import { homePage } from "./singletons/homePage";
import { shopFilters } from "./singletons/shopFilters";

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  shopFilters,
  homePage,
  // Documents
  page,
  post,
  person,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
  coffee,
  tea,
];
