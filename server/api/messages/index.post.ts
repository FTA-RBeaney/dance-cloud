export default eventHandler(async (event) => {
  const { text, post_id, user_id } = await readBody(event);
  const db = hubDatabase();

  await db
    .prepare(
      'INSERT INTO messages (text, created_at, post_id, user_id) VALUES (?1, ?2, ?3, ?4)'
    )
    .bind(text, Date.now(), post_id, user_id)
    .run();

  return {};
});
