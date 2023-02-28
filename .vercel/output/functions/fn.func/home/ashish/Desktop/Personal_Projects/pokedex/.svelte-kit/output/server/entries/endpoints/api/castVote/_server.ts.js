import { j as json } from "../../../../chunks/index.js";
import { p as prisma } from "../../../../chunks/db.js";
const POST = async ({ request }) => {
  const body = await request.json();
  const voteInDb = await prisma.vote.create({ data: { votedForId: body.votedFor, votedAgainstId: body.votedAgainst } });
  return json({ status: true, vote: voteInDb });
};
export {
  POST
};
