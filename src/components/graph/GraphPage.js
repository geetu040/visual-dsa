import { Box } from './Box'
import { Menu } from './Menu';
import { useState } from 'react';

// import map from "./map1.json"
import { algo_names, apply_algo } from '../../scripts/graph/main';
import { box_width, swap, swap_elem, spaceItems } from '../../scripts/graph/utils';

export const GraphPage = () => {

	const s = Math.sqrt(map.length);
	const min_ratio = 0.3;
	const [pop, set_pop] = useState(true);

	let graph = [];
	const addToRefs = (elem) => {
		graph.push(elem);
	}

	const pointyCorners = () => {
		let map = graph.map((i) => { return i.classList.contains("g1") ? 1 : 0 })
		graph.map((item, i) => {
			if (map[i + 1] === 0 && map[i + s] === 0 && i % s !== s - 1) {
				if (!item.classList.contains("rounded-br")) {
					item.classList.add("rounded-br");
				}
			} else {
				if (item.classList.contains("rounded-br")) {
					item.classList.remove("rounded-br");
				}
			}
			if (map[i - 1] === 0 && map[i - s] === 0 && i % s !== 0) {
				if (!item.classList.contains("rounded-tl")) {
					item.classList.add("rounded-tl");
				}
			} else {
				if (item.classList.contains("rounded-tl")) {
					item.classList.remove("rounded-tl");
				}
			}
			if (map[i + 1] === 0 && map[i - s] === 0 && i % s !== s - 1) {
				if (!item.classList.contains("rounded-tr")) {
					item.classList.add("rounded-tr");
				}
			} else {
				if (item.classList.contains("rounded-tr")) {
					item.classList.remove("rounded-tr");
				}
			}
			if (map[i - 1] === 0 && map[i + s] === 0 && i % s !== 0) {
				if (!item.classList.contains("rounded-bl")) {
					item.classList.add("rounded-bl");
				}
			} else {
				if (item.classList.contains("rounded-bl")) {
					item.classList.remove("rounded-bl");
				}
			}
			return 0;
		})
	}

	const send_apply_algo = () => {
		apply_algo(graph);
	}

	let props = {
		map,
		s,
		box_width,
		graph,
		addToRefs,
		pointyCorners,
		spaceItems,
		swap_elem, swap,
		algo_names,
		send_apply_algo,
		min_ratio,
		pop, set_pop,
	}

	return (
		<div className='py-10 bg-blue-200 text-blue-900 pb-[20vh] font-mono'>
			<h1 className='font-gutter font-bold text-6xl py-7 text-center'>
				Graph Algorithms
			</h1>
			<div className='w-[100%] flex flex-wrap-reverse mx-auto justify-center items-end'>
				<Box props={props} />
				<Menu props={props} />
			</div>
		</div>
	)
}

let map = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];