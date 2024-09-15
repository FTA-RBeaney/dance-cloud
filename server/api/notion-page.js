import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const body = await notion.databases.query({
    database_id: data.id,
    sorts: [
      {
        property: "Order",
        direction: "ascending",
      },
    ],
  });

  return { body };
});
