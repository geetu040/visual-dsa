import { create_ops, pos_to_index, get_sparse } from "../utils";

function getPath(graph, src, des, method)
{
	let s = graph.length;

	let prev = [];
	let visited = [];
	let to_visit = [];
	let found = false;

	for (let i = 0; i < s; i++) {
		prev.push(null)
	}

	to_visit.push(src);

	let last_stable = src;

	while (to_visit.length > 0)
	{
		let u;
		if (method === "dfs") {
			u = to_visit.pop();		// stack (added from back, removed from back);
		}
		if (method === "bfs") {
			u = to_visit.shift();	// queue (added from back, removed from front)
		}
		
		visited.push(u);

		let v;
		for (v = 0; v < s; v++) {
			if (visited.indexOf(v) === -1 && graph[u][v]) {
				if (to_visit.indexOf(v) === -1) {
					to_visit.push(v);
					prev[v] = u;
				}
				if (v === des) {
					found = true;
					break;
				}
			}
		}
		last_stable = u;
		if (found) {
			last_stable = v;
			break;
		}
	}
	return create_ops(visited, prev, src, last_stable);
}

export default function dfs_bfs(graph, src, des, method) {
	let sparse = get_sparse(graph);
	let src_ind = pos_to_index(src, graph.length);
	let des_ind = pos_to_index(des, graph.length);
	let ops = getPath(sparse, src_ind, des_ind, method);
	return ops;
}