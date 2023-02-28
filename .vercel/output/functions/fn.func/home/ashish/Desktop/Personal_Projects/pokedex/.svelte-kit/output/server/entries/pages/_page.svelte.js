import { c as create_ssr_component, i as is_promise, n as noop, d as add_attribute, e as escape } from "../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "body{@apply bg-gray-800 font-sans;}",
  map: null
};
async function updatePokeData() {
  const res = await fetch("/api/getPokemon");
  const data = await res.json();
  if (res.ok) {
    return { poke1: data.poke1, poke2: data.poke2 };
  } else {
    throw new Error("Data fetching failed");
  }
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let promise = updatePokeData();
  $$result.css.add(css);
  return `<main class="${"h-screen flex flex-col items-center justify-center text-center text-white"}"><h1 class="${"text-2xl text-center "}">Which pokemon is cutest?</h1>
	<div class="${"p-2"}"></div>

	<div class="${"border rounded p-10 flex flex-col md:flex-row justify-between items-center max-w-3xl"}">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
			<div class="${"w-36 h-36 md:w-64 md:h-64 bg-transparent flex items-center justify-center p-4"}"><span class="${"min-w-full"}">Loading...</span></div>
			<div class="${"p-8 text-5xl"}">OR</div>

			<div class="${"w-36 h-36 md:w-64 md:h-64 bg-transparent flex items-center justify-center p-4"}"><span class="${"min-w-full"}">Loading...</span></div>
		`;
    }
    return function(pokedata) {
      return `
			<div class="${"flex flex-col items-center justify-center gap-5"}">
				<div id="${"poke1"}" class="${"w-36 h-36 md:w-64 md:h-64 bg-transparent hover:bg-green-500 hover:scale-105 rounded-2xl transition-all duration-200 ease-in text-lg p-4 flex items-center justify-center"}"><img${add_attribute("src", pokedata.poke1.img, 0)} alt="${"poke2"}" class="${"w-36 h-36 md:w-64 md:h-64 "}"></div>
				<p class="${"capitalize pt-2"}">${escape(pokedata.poke1.name)}</p></div>
			<div class="${"p-8 text-5xl"}">OR</div>

			<div class="${"flex flex-col items-center justify-center gap-5"}">
				<div id="${"poke2"}" class="${"w-36 h-36 md:w-64 md:h-64 bg-transparent hover:bg-green-500 hover:scale-105 rounded-2xl transition-all duration-200 ease-in text-lg p-4 flex items-center justify-center"}"><img${add_attribute("src", pokedata.poke2.img, 0)} alt="${"poke2"}" class="${"w-36 h-36 md:w-64 md:h-64 "}"></div>
				<p class="${"capitalize pt-2"}">${escape(pokedata.poke2.name)}</p></div>
		`;
    }(__value);
  }(promise)}</div>
</main>`;
});
export {
  Page as default
};
