import { pos_to_index, path_ind_to_ops, get_sparse } from "../utils";

function getPath(graph, src, des, method)
{
	let s = graph.length;

	let ops = [];
	let prev = [];
	let visited = [];
	let to_visit = [];
	let found = false;

	for (let i = 0; i < s; i++) {
		prev.push(null)
	}

	to_visit.push(src);

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
		if (found) {
			break;
		}
	}

	visited.forEach((u)=>{
		if (u !== src && u !== des) {
			ops.push({ "sel": u })
		}
	})
	let rev_ops = []
	visited.forEach((u)=>{
		if (u !== src && u !== des) {
			rev_ops = [{ "desel": u }].concat(rev_ops)
		}
	})
	ops.push(...rev_ops);

	let path = []
	let cur = des;
	while (cur) {
		path = [cur].concat(path)
		cur = prev[cur];
	}
	path = [src].concat(path)
	let path_ops = path_ind_to_ops(path)

	ops.push(...path_ops);
	return ops;
}

export default function dfs_bfs(graph, src, des, method) {
	let sparse = get_sparse(graph);
	let src_ind = pos_to_index(src, graph.length);
	let des_ind = pos_to_index(des, graph.length);
	let ops = getPath(sparse, src_ind, des_ind, method);
	return ops;
}