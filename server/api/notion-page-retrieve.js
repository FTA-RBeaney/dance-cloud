import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const response = await notion.pages.retrieve({ page_id: data.id });

  return { response };
});
