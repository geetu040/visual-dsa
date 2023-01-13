const box_width = 95

function getTransitionEndEventName() {
	var transitions = {
		"transition": "transitionend",
		"OTransition": "oTransitionEnd",
		"MozTransition": "transitionend",
		"WebkitTransition": "webkitTransitionEnd"
	}
	let bodyStyle = document.body.style;
	for (let transition in transitions) {
		if (bodyStyle[transition] !== undefined) {
			return transitions[transition];
		}
	}
}

function index_to_pos(ind, s) {
	return [
		Math.floor(ind / s),	// x
		ind % s,				// y
	]
}
function pos_to_index(pos, s) {
	return pos[0]*s + pos[1];
}
function extract_graph(graph) {
	let s = Math.sqrt(graph.length);

	let map = graph.map((i)=>{return i.classList.contains("g1")?1:0});
	let grid = [];
	for (let i=0; i<s; i++) {
		let row = [];
		for (let j=0; j<s; j++) {
			row.push(map[i*s + j]);
		}
		grid.push(row);
	}

	let src_ind = graph.indexOf(document.getElementsByClassName("g2")[0]);
	let des_ind = graph.indexOf(document.getElementsByClassName("g3")[0]);

	return [
		grid,
		index_to_pos(src_ind, s),
		index_to_pos(des_ind, s),
	]

}
function operate(graph, ops) {
	if (ops.length === 0) {
		document.getElementsByClassName("g-btn")[0].disabled = false;
		return;
	}
	let op = ops[0];
	let delay = null;
	let time = 0;

	if (op.sel !== undefined) {
		graph[op.sel].classList.add("ghigh");
		time = 50;
	}
	if (op.desel !== undefined) {
		graph[op.desel].classList.remove("ghigh");
		time = 10;
	}
	if (op.swap !== undefined) {
		delay = graph[op.swap[0]]
		swap(graph, ...op.swap)
	}

	if (delay) {
		delay.addEventListener(getTransitionEndEventName(), ()=>{
			operate(graph, ops.slice(1));
		}, {once : true});
	}
	else {
		setTimeout(() => {
			operate(graph, ops.slice(1));
		}, time);
	}


}
function shuffle_arr(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
const swap_elem = (graph, elem1, elem2) => {
	swap(graph, graph.indexOf(elem1), graph.indexOf(elem2));
}
const swap = (graph, i1, i2) => {
	let temp = graph[i1];
	graph[i1] = graph[i2];
	graph[i2] = temp;
	spaceItems(graph);
}
const spaceItems = (graph) => {
	let s = Math.sqrt(graph.length);
	graph.map((item, i)=>{
		item.style.setProperty("left", `${(i%s)*(box_width/s)}vmin`);
		item.style.setProperty("top", `${(Math.floor(i/s))*(box_width/s)}vmin`);
	})
}
function path_ind_to_ops(path) {
	if (path.length < 3 ) {
		return []
	}
	return [{ "swap": [path[0], path[1]] }].concat(
		path_ind_to_ops(path.slice(1))
	)
}
function get_sparse(graph) {
	let s = graph.length
	let sparse = []
	for (let i=0; i<s*s; i++) {
		let new_arr = [];
		for (let j=0; j<s*s; j++) {
			let pos_i = index_to_pos(i, s)
			let pos_j = index_to_pos(j, s)

			let i_is_valid = graph[pos_i[0]][pos_i[1]] === 0;
			let j_is_valid = graph[pos_j[0]][pos_j[1]] === 0;
			let is_valid = j_is_valid && i_is_valid

			let j_is_right_of_i = (j === i+1) && (i%s !== s-1)
			let j_is_left_of_i = (j === i-1) && (i%s !== 0)

			let j_is_y_of_i = j-i === s || i-j === s
			let j_i_are_adjacent = j_is_right_of_i || j_is_left_of_i || j_is_y_of_i

			if (is_valid && j_i_are_adjacent) {
				new_arr.push(1);
			} else {
				new_arr.push(0);
			}
		}
		sparse.push(new_arr);
	}
	return sparse;
}
function distance_ind(i, j, s) {
	let pos_i = index_to_pos(i, s)
	let pos_j = index_to_pos(j, s)
	return Math.abs(pos_i[0] - pos_j[0], 2) + Math.abs(pos_i[1] - pos_j[1], 2)
}
function inverse_extract_graph(graph) {
	// console.log(graph);
	// let s = graph.length
	let map = [];
	
	graph.forEach((i)=>{
		i.forEach((j)=>{
			map.push(j);
		})
	})

	return map;
}

function create_ops(visited, prev, src, des) {
	let ops = [];

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
	if (path.length < 2) {
		return []
	}
	let path_ops = path_ind_to_ops(path)

	ops.push(...path_ops);
	return ops;
}


export {
	extract_graph,
	pos_to_index, index_to_pos,
	operate,
	swap_elem, swap, spaceItems, box_width, shuffle_arr,
	path_ind_to_ops, get_sparse,
	distance_ind,
	inverse_extract_graph, create_ops,
}