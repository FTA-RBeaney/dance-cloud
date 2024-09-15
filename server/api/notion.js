import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const image_database_id = "bcc08686-98da-4645-898b-551c91cf8614";

let payload = [];

async function getImages() {
  const data = await notion.databases.query({
    database_id: image_database_id,
  });
  return data;
}

getImages().then((data) => {
  payload = data;
});

function getTitles(results) {
  let titles = [];
  results.forEach((result) => {
    titles.push(result.properties);
  });
  return titles;
}

export default defineEventHandler(() => payload.results);
