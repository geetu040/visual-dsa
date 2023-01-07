const box_width = 80

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
		return;
	}
	let op = ops[0];

	if (op.sel !== undefined) {
		graph[op.sel].classList.add("ghigh");
	}
	if (op.desel !== undefined) {
		graph[op.desel].classList.remove("ghigh");
	}
	if (op.swap !== undefined) {
		swap(graph, ...op.swap)
	}

	setTimeout(() => {
		operate(graph, ops.slice(1))
	}, 200);
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

export {
	extract_graph,
	pos_to_index,
	operate,
	swap_elem, swap, spaceItems, box_width, shuffle_arr
}