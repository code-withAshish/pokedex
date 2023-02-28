<script lang="ts">
	import type { PageData } from './$types';

	const generateCountPercent = (count: { VoteFor: number; VoteAgainst: number }) => {
		const { VoteFor, VoteAgainst } = count;
		if (VoteFor + VoteAgainst === 0) {
			return 0;
		}
		return (VoteFor / (VoteFor + VoteAgainst)) * 100;
	};

	export let data: PageData;

	data.data.sort((a, b) => {
		const diff = generateCountPercent(b._count) - generateCountPercent(a._count);
		if (diff === 0) {
			return b._count.VoteFor - a._count.VoteFor;
		}
		return diff;
	});
</script>

<div class="container mx-auto p-10">
	<div class="flex flex-col">
		<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
				<div class="overflow-hidden">
					<table class="min-w-full text-center">
						<thead class="border-b">
							<tr>
								<th scope="col" class="text-md font-medium text-gray-900 px-6 py-4"> Rank</th>
								<th scope="col" class="text-md font-medium text-gray-900 px-6 py-4"> Name </th>
								<th scope="col" class="text-md font-medium text-gray-900 px-6 py-4"> Sprite </th>
								<th scope="col" class="text-md font-medium text-gray-900 px-6 py-4"> Percent</th>
							</tr>
						</thead>
						<tbody>
							{#each data.data as { name, spriteUrl, _count }, i}
								<tr class="border-b">
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
										>{i + 1}</td
									>
									<td
										class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap capitalize"
									>
										{name}
									</td>
									<td
										class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex item justify-center"
									>
										<img src={spriteUrl} alt={'name'} class="h-16 w-16" /></td
									>
									<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
										>{generateCountPercent(_count).toFixed(2)}%</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
