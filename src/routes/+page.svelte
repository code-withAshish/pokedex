<script lang="ts">
	interface APIdata {
		poke1: { id: number; name: string; img: string };
		poke2: { id: number; name: string; img: string };
	}
	const getRandomNumber: (notThisOne?: number) => number = (notThisOne) => {
		const pokeDexNumber = Math.floor(Math.random() * (1008 - 1) + 1);
		if (pokeDexNumber !== notThisOne) return pokeDexNumber;
		return getRandomNumber(notThisOne);
	};
	async function updatePokeData() {
		const id1 = getRandomNumber();
		const id2 = getRandomNumber(id1);
		const params = new URLSearchParams([
			['id1', `${id1}`],
			['id2', `${id2}`]
		]).toString();
		const res = await fetch(`/api/getPokemon?${params}`);
		const data: APIdata = await res.json();
		if (res.ok) {
			return { poke1: data.poke1, poke2: data.poke2 };
		} else {
			throw new Error('Data fetching failed');
		}
	}

	let promise = updatePokeData();

	async function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		const id = e.currentTarget.id;
		let body: { votedFor: number; votedAgainst: number } = {
			votedFor: 0,
			votedAgainst: 0
		};
		if (id === 'poke1') {
			body.votedFor = (await promise).poke1.id;
			body.votedAgainst = (await promise).poke2.id;
		} else {
			if (id === 'poke2') {
				body.votedFor = (await promise).poke2.id;
				body.votedAgainst = (await promise).poke1.id;
			}
		}
		const res = await fetch('/api/castVote', {
			method: 'POST',
			body: JSON.stringify(body)
		});
		console.log(await res.json());

		promise = updatePokeData();
	}
</script>

<main class="h-screen flex flex-col items-center justify-center text-center text-white">
	<h1 class="text-2xl text-center ">Which pokemon is cutest?</h1>
	<div class="p-2" />

	<div
		class="border rounded p-10 flex  flex-col md:flex-row justify-between items-center max-w-3xl"
	>
		{#await promise}
			<div class="w-36 h-36 md:w-64 md:h-64  bg-transparent flex items-center justify-center p-4">
				<span class="min-w-full">Loading...</span>
			</div>
			<div class="p-8 text-5xl">OR</div>

			<div class="w-36 h-36 md:w-64 md:h-64 bg-transparent flex items-center justify-center p-4">
				<span class="min-w-full">Loading...</span>
			</div>
		{:then pokedata}
			<div class="flex flex-col items-center justify-center gap-2 md:gap-5">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					id="poke1"
					class="w-36 h-36 md:w-64 md:h-64  bg-transparent hover:bg-green-500 hover:scale-105 rounded-2xl transition-all duration-200 ease-in text-lg p-4 flex items-center justify-center"
					on:click={handleClick}
				>
					<img src={pokedata.poke1.img} alt="poke2" class="w-36 h-36 md:w-64 md:h-64 " />
				</div>
				<p class="capitalize pt-2">{pokedata.poke1.name}</p>
			</div>
			<div class="p-8 text-5xl">OR</div>

			<div class="flex flex-col items-center justify-center gap-2 md:gap-5">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					id="poke2"
					class="w-36 h-36 md:w-64 md:h-64 bg-transparent hover:bg-green-500 hover:scale-105 rounded-2xl transition-all duration-200 ease-in text-lg p-4 flex items-center justify-center"
					on:click={handleClick}
				>
					<img src={pokedata.poke2.img} alt="poke2" class="w-36 h-36 md:w-64 md:h-64 " />
				</div>
				<p class="capitalize pt-2">{pokedata.poke2.name}</p>
			</div>
		{/await}
	</div>

	<a href="/results"
		><button class="p-2 bg-blue-500 m-2 rounded-md shadow-lg">See Results</button></a
	>
</main>

<style>
	:global(body) {
		@apply bg-gray-800 font-sans;
	}
</style>
