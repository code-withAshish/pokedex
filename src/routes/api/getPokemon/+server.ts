
import { error, json as sveltejson } from '@sveltejs/kit';
import { prisma } from "$lib/db"
import type { RequestHandler } from './$types';



export const GET = (async ({ url }) => {

    const id1 = Number(url.searchParams.get('id1'))
    const id2 = Number(url.searchParams.get('id2'))
    if ((id1 <= 0 || id1 > 1008) || (id2 <= 0 || id2 > 1008) || (id1 === id2)) {
        throw error(400, "Bad query params")
    }
    const pokemons = await prisma.pokemon.findMany({ where: { id: { in: [id1, id2] } } })
    return sveltejson({
        poke1: { id: pokemons[0].id, name: pokemons[0].name, img: pokemons[0].spriteUrl },
        poke2: { id: pokemons[1].id, name: pokemons[1].name, img: pokemons[1].spriteUrl }
    })
}) satisfies RequestHandler;