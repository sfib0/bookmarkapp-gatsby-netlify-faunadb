import { query as q, Client } from 'faunadb';

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

export const handler = async (_, _, callback) => {
  console.log(`Function \`get-bookmarks\` invoked!`);
  try {
    const { data } = await client.query(
      q.Paginate(q.Match(q.Index(`all_links`))),
    );
    console.log(`${data.length} links found!`);
    const linksData = await client.query(data.map((ref) => {
      return q.Get(ref);
    }))
  } catch (error) {}
};
