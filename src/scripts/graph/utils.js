function index_to_pos(ind, s) {
	return {
		x: Math.floor(ind / s),
		y: ind % s,
	}
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

export {
	extract_graph,
}