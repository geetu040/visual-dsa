import { create_ops, pos_to_index, distance_ind, inverse_extract_graph } from "../utils";

function findBest(graph, dist, visited, des) {

	let s = Math.sqrt(graph.length);
	let min = 999999999
	let min_cord;
	let prev_cord;


	visited.forEach((v)=>{
		// right
		if (v%s !== s-1 && !visited.includes(v+1) && graph[v+1]===0) {
			// if (v===40) {console.log("right")}
			// console.log("right")
			let est = distance_ind(v+1, des, s);
			let cost = dist[v] + est;
			if (cost <= min) {
				min = cost;
				min_cord = v+1;
				prev_cord = v;
			}
		}
		// left
		if (v%s !== 0 && !visited.includes(v-1) && graph[v-1]===0) {
			// if (v===40) {console.log("left")}
			// console.log("left")
			let est = distance_ind(v-1, des, s);
			let cost = dist[v] + est;
			if (cost <= min) {
				min = cost;
				min_cord = v-1;
				prev_cord = v;
			}
		}
		// up
		if (v-s >= 0 && !visited.includes(v-s) && graph[v-s]===0) {
			// if (v===40) {console.log("up")}
			// console.log("up")
			let est = distance_ind(v-s, des, s);
			let cost = dist[v] + est;
			if (cost <= min) {
				min = cost;
				min_cord = v-s;
				prev_cord = v;
			}
		}
		// down
		if (v+s <= s*s-1 && !visited.includes(v+s) && graph[v+s]===0) {
			// if (v===40) {console.log("down")}
			// console.log("down")
			let est = distance_ind(v+s, des, s);
			let cost = dist[v] + est;
			// console.log(dist[v], "_---")
			if (cost <= min) {
				min = cost;
				min_cord = v+s;
				prev_cord = v;
			}
		}
	})


	return [min_cord, prev_cord];
}

function getPath(graph, src, des) {

	let n = graph.length;
	// let s = Math.sqrt(n);

	let visited = [];
	let dist = [];
	let prev = [];

	for (let i = 0; i < n; i++) {
		dist.push(null);
		prev.push(null);
	}

	let cur = src;
	prev[cur] = null;
	dist[cur] = 0;
	let p;

	// for (let i=0; i<s*s; i++)
	// let last_stable = src;
	let found = true;
	while(cur !== des)
	{
		visited.push(cur);
		
		[cur, p] = findBest(graph, dist, visited, des);
		
		if (cur === undefined) {
			found = false;
			break;
		}

		prev[cur] = p;
		dist[cur] = dist[p]+1;
		// last_stable = cur;
		

	}

	return create_ops(visited, prev, src, des, found);

}

export default function astar(graph, src, des) {
	let s = graph.length;
	let graph_lin = inverse_extract_graph(graph);
	return getPath(graph_lin, pos_to_index(src, s), pos_to_index(des, s));
}