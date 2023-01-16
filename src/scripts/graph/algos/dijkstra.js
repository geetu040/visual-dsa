import { create_ops, pos_to_index, get_sparse } from "../utils";

function minDistance(dist, sptSet)
{
	// Initialize min value
	let s = dist.length;
	let min = s*s + 1
	let min_index;

	for (let v = 0; v < s; v++)
		if (sptSet[v] === false && dist[v] <= min){
			min = dist[v]
			min_index = v;
		}
	
	return min_index;
}

function getPath(graph, src, des)
{
	let s = graph.length;

	let dist = [];
	let sptSet = [];
	let prev = [];
	let visited = [];

	for (let i = 0; i < s; i++) {
		dist.push(s*s+1);
		sptSet.push(false)
		prev.push(null)
	}

	dist[src] = 0;

	let found = false;
	let last_stable = src;
	for (let count = 0; count < s - 1; count++)
	{
		let u = minDistance(dist, sptSet);
		if (dist[u] !== s*s+1 && u!==src && u!==des) {
			visited.push(u);
		}
		sptSet[u] = true;
		let v;
		for (v = 0; v < s; v++) {
			if (!sptSet[v] && graph[u][v] && dist[u]!==s*s+1 && dist[u] + graph[u][v] < dist[v]) {
				dist[v] = dist[u] + graph[u][v];
				prev[v] = u;
				last_stable = v;
				if (v === des) {
					found = true;
					break;
				}
			}
		}
		if (found) {
			break;
		}
	}
	return create_ops(visited, prev, src, des, found);
}

export default function dijkstra(graph, src, des) {
	let sparse = get_sparse(graph);
	let src_ind = pos_to_index(src, graph.length);
	let des_ind = pos_to_index(des, graph.length);
	let ops = getPath(sparse, src_ind, des_ind);
	return ops;
}