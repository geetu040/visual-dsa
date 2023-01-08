import { pos_to_index, path_ind_to_ops, get_sparse } from "../utils";

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
	let ops = [];

	for (let i = 0; i < s; i++) {
		prev.push(null)
	}

	let found = false;
	let u = src;
	let p = null;
	
	while (u !== undefined)
	{
		visited.push(u);
		prev[u] = p;

		if (u === des) {
			break;
		}

		u = findNextBest(graph, visited);

		let min = s*s + 1;
		visited.forEach((v)=>{
			graph[v].forEach((_, i)=>{
				if (_ === 1 && visited.indexOf(i) === -1 && graph[v][i] <= min) {
					min = graph[v][i];
					u = i;
					p = v;
				}
			})
		})
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

export default function prims(graph, src, des) {
	let sparse = get_sparse(graph);
	let src_ind = pos_to_index(src, graph.length);
	let des_ind = pos_to_index(des, graph.length);
	let ops = getPath(sparse, src_ind, des_ind);
	return ops;
}