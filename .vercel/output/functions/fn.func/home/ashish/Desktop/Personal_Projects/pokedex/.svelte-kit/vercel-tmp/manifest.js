export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-0fa55777.js","imports":["_app/immutable/start-0fa55777.js","_app/immutable/chunks/index-2eba10e5.js","_app/immutable/chunks/singletons-a488a060.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/castVote",
				pattern: /^\/api\/castVote\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/castVote/_server.ts.js')
			},
			{
				id: "/api/getPokemon",
				pattern: /^\/api\/getPokemon\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/getPokemon/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
