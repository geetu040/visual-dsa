import {extract_graph, operate} from "./utils"

import backtracking from "./algos/backtracking";
import dijkstra from "./algos/dijkstra";
import dfs from "./algos/dfs";
import bfs from "./algos/bfs";
import prims from "./algos/prims";

function apply_algo(graph) {
	// extracting the graph
	let [map, src, des] = extract_graph(graph);

	// running the algorithm
	let ops;
	// ops = backtracking(map, src, des);
	// ops = dijkstra(map, src, des);
	// ops = dfs(map, src, des);
	// ops = bfs(map, src, des);
	ops = prims(map, src, des);

	// running operation
	operate(graph, ops.slice(0, 1000));

}


export {
	apply_algo
}