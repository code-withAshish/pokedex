import { prisma } from "$lib/db";
import type { PageServerLoad } from "./$types";


export const prerender = true
export const load = (async () => {

    return {
        data: await prisma.pokemon.findMany({
            orderBy: { VoteFor: { _count: 'desc' } },
            select: {
                id: true,
                name: true,
                spriteUrl: true,
                _count: {
                    select: {
                        VoteFor: true,
                        VoteAgainst: true
                    }
                }
            }
        })
    }
}) satisfies PageServerLoad