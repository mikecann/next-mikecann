import algoliasearch from "algoliasearch";
import { getAllPosts } from "../pages/api/posts/index";
import { AlgoliaHit } from "../pages/api/algolia/types";
import { config } from "../config/config";

const { ALGOLIA_ADMIN_KEY, ALGOLIA_APP_ID } = config;

async function bootstrap() {
  if (!ALGOLIA_ADMIN_KEY) throw new Error(`missing algolia key!`);

  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
  const index = client.initIndex("next-mikecann");

  await index.clearObjects();

  const toAdd: AlgoliaHit[] = getAllPosts().map((e) => ({
    excerpt: e.content.substr(0, 5000),
    title: e.meta.title,
    coverImage: e.meta.coverImage,
    createdAt: new Date(e.meta.date).getTime(),
    objectID: e.slug,
  }));

  console.log(`adding ${toAdd.length} posts`);

  //console.log("indexing posts in algolia..");
  await index.saveObjects(toAdd);
}

bootstrap()
  .then(() => process.exit())
  .catch((e) => console.error(e));
