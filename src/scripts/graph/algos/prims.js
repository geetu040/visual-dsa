import { create_ops, pos_to_index, get_sparse } from "../utils";

function findNextBest(graph, visited)
{
	// Initialize min value
	let s = graph.length;
	let min = s*s + 1
	let min_index;

	visited.forEach((v)=>{
		graph[v].forEach((_, i)=>{
			if (_ === 1 && visited.indexOf(i) === -1 && graph[v][i] <= min) {
				min = graph[v][i];
				min_index = i;
			}
		})
	})

	return min_index;
}

function getPath(graph, src, des)
{
	let s = graph.length;

	let visited = [];
	let prev = [];

	for (let i = 0; i < s; i++) {
		prev.push(null)
	}

	let u = src;
	let p = null;
	let last_stable = u;
	
	let found = false;
	while (u !== undefined)
	{
		last_stable = u;
		visited.push(u);
		prev[u] = p;

		if (u === des) {
			found = true;
			break;
		}

		u = findNextBest(graph, visited);

		let min = s*s + 1;
		for (let v_i=0; v_i<visited.length; v_i++) {
			let v = visited[v_i];
			for (let i=0; i<graph[v].length; i++) {
				if (graph[v][i] === 1 && visited.indexOf(i) === -1 && graph[v][i] <= min) {
					min = graph[v][i];
					u = i;
					p = v;
				}
			}
		}
	}
	return create_ops(visited, prev, src, des, found);
}

export default function prims(graph, src, des) {
	let sparse = get_sparse(graph);
	let src_ind = pos_to_index(src, graph.length);
	let des_ind = pos_to_index(des, graph.length);
	let ops = getPath(sparse, src_ind, des_ind);
	return ops;
}