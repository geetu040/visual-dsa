import { pos_to_index, shuffle_arr, path_ind_to_ops } from "../utils";

function isSafe(graph, visited, next) {


	let s = graph.length
	let y = next[0];
	let x = next[1];

	if (x < 0 || x >= s)
		return false;
	if (y < 0 || y >= s)
		return false;
	if (graph[y][x] == 1)
		return false;
	if (visited[y][x] == 1)
		return false;

	return true;
}

function backtrack(graph, visited, start, end, path, paths) {
	if (start[0] == end[0] && start[1] == end[1]) {
		paths.push(path);
		return [[], true];
	}

	let up = [start[0] - 1, start[1]]
	let left = [start[0], start[1] - 1]
	let down = [start[0] + 1, start[1]]
	let right = [start[0], start[1] + 1]

	let ops = [];
	let found = false;

	visited[start[0]][start[1]] = 1;
	if (path !== "") {
		ops.push({ "sel": pos_to_index(start, graph.length) })
	}

	let dirs_funcs = [
		() => {
			if (isSafe(graph, visited, down) && !found) {
				let [new_ops, new_found] = backtrack(graph, visited, down, end, path + "D", paths);
				found = new_found;
				ops = ops.concat(new_ops);
			}
		},
		() => {
			if (isSafe(graph, visited, right) && !found) {
				let [new_ops, new_found] = backtrack(graph, visited, right, end, path + "R", paths);
				found = new_found;
				ops = ops.concat(new_ops);
			}
		},
		() => {
			if (isSafe(graph, visited, up) && !found) {
				let [new_ops, new_found] = backtrack(graph, visited, up, end, path + "U", paths);
				found = new_found;
				ops = ops.concat(new_ops);
			}
		},
		() => {
			if (isSafe(graph, visited, left) && !found) {
				let [new_ops, new_found] = backtrack(graph, visited, left, end, path + "L", paths);
				found = new_found;
				ops = ops.concat(new_ops);
			}
		},
	]
	shuffle_arr(dirs_funcs);
	dirs_funcs.forEach((i)=>{i()})

	if (path !== "") {
		ops.push({ "desel": pos_to_index(start, graph.length) })
	}
	visited[start[0]][start[1]] = 0;

	return [ops, found];
}

function getPossiblePaths(graph, start, end) {
	let visited = [];
	let paths = [];

	let s = graph.length;

	for (let i = 0; i < s; i++) {
		let temp = [];
		for (let j = 0; j < s; j++) {
			temp.push(0);
		}
		visited.push(temp);
	}

	let [ops, found] = backtrack(graph, visited, start, end, "", paths);

	return [paths, ops];
}

function convert_path(path, pos, s) {
	if (path === "") {
		return []
	}
	switch (path[0]) {
		case "U":
			pos[0] -= 1;
			break;
		case "L":
			pos[1] -= 1;
			break;
		case "D":
			pos[0] += 1;
			break;
		case "R":
			pos[1] += 1;
			break;
	}
	return [pos_to_index(pos, s)].concat(convert_path(path.slice(1), pos, s))
}

function find_best_path(paths) {
	let shortest_d = Math.min(...paths.map((i) => { return i.length }))
	let shortest_paths = paths.filter(i => { return i.length === shortest_d })
	let r = Math.floor(Math.random() * shortest_paths.length)
	return shortest_paths[r];
}


export default function backtracking(graph, src, des) {
	let s = graph.length
	let [paths, ops] = getPossiblePaths(graph, src, des);
	let best_path = find_best_path(paths);
	let best_path_ind = [pos_to_index(src, s)].concat(
		convert_path(best_path, src, s
	))
	let final_ops = path_ind_to_ops(best_path_ind);
	return ops.concat([{ "pause": 1000 }]).concat(final_ops)


}