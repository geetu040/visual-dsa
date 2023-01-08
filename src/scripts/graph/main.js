import {extract_graph, operate} from "./utils"

import backtracking from "./algos/backtracking";
import dijkstra from "./algos/dijkstra";
import dfs from "./algos/dfs";
import bfs from "./algos/bfs";

function apply_algo(graph) {
	// extracting the graph
	let [map, src, des] = extract_graph(graph);

	// running the algorithm
	let ops = backtracking(map, src, des);
	// let ops = dijkstra(map, src, des);
	// let ops = dfs(map, src, des);
	// let ops = bfs(map, src, des);

	// running operation
	operate(graph, ops.slice(0, 1000));

}


export {
	apply_algo
}