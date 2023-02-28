import { j as json } from "../../../../chunks/index.js";
import { p as prisma } from "../../../../chunks/db.js";
const getRandomPokemon = (notThisOne) => {
  const pokeDexNumber = Math.floor(Math.random() * (1008 - 1) + 1);
  if (pokeDexNumber !== notThisOne)
    return pokeDexNumber;
  return getRandomPokemon(notThisOne);
};
const GET = async () => {
  const pkid1 = getRandomPokemon();
  const pkid2 = getRandomPokemon(pkid1);
  const pokemons = await prisma.pokemon.findMany({ where: { id: { in: [pkid1, pkid2] } } });
  return json({
    poke1: { id: pokemons[0].id, name: pokemons[0].name, img: pokemons[0].spriteUrl },
    poke2: { id: pokemons[1].id, name: pokemons[1].name, img: pokemons[1].spriteUrl }
  });
};
export {
  GET
};
