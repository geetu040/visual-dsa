import {extract_graph, operate} from "./utils"

import backtracking from "./algos/backtracking";
import dijkstra from "./algos/dijkstra";
import dfs from "./algos/dfs";
import bfs from "./algos/bfs";
import prims from "./algos/prims";
import astar from "./algos/astar";

const algos = {
	"Dijkstra's": dijkstra,
	"Backtracking": backtracking,
	"BFS": bfs,
	"Prim's": prims,
	"A Star AI": astar,
	"DFS": dfs,
}
const algo_names = Object.keys(algos);
const alog_fns = Object.values(algos);

function apply_algo(graph) {

	// extracting the graph
	let [map, src, des] = extract_graph(graph);
	// console.log(inverse_extract_graph(map));
	// return;

	// running the algorithm
	let algo = document.getElementsByClassName("g-select")[0].value;
	let ops = alog_fns[algo](map, src, des);
	// return

	// running operation
	document.getElementsByClassName("g-btn")[0].disabled = true;
	operate(graph, ops);

}


export {
	algo_names, apply_algo
}