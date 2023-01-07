import {extract_graph} from "./utils"
import backtracking from "./algos/backtracking";


function apply_algo(graph) {
	// extracting the graph
	let [map, src, des] = extract_graph(graph);

	// running the algorithm
	let ops = backtracking(map, src, des);

}


export {
	apply_algo
}