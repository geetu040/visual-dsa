import {extract_graph, operate} from "./utils"
import backtracking from "./algos/backtracking";


function apply_algo(graph) {
	// extracting the graph
	let [map, src, des] = extract_graph(graph);

	// running the algorithm
	let ops = backtracking(map, src, des);

	// running operation
	console.log(ops);
	operate(graph, ops.slice(0, 1000));

}


export {
	apply_algo
}