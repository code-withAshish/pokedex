import type { RequestHandler } from "./$types";
import { json as sveltejson } from "@sveltejs/kit";
import { prisma } from "$lib/db";


export const POST = (async ({ request }) => {
    const body: { votedFor: number; votedAgainst: number } = await request.json()

    const voteInDb = await prisma.vote.create({ data: { votedForId: body.votedFor, votedAgainstId: body.votedAgainst } })

    return sveltejson({ status: true, vote: voteInDb })
}) satisfies RequestHandler