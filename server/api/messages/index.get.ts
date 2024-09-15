export default eventHandler(async (event) => {
  const db = hubDatabase();

  // TODO: move it a a Server Task
  await db.exec(
    "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, text TEXT, created_at INTEGER, post_id TEXT)"
  );

  const { results } = await db
    .prepare("SELECT * FROM messages ORDER BY created_at DESC")
    .all();

  return results;
});
