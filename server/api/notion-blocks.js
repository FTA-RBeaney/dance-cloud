import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const body = await notion.blocks.children.list({
    block_id: data.id,
  });

  return { body };
});
