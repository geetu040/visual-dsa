import { useState } from 'react'

import { Box } from './Box'
import { Menu } from './Menu';

import map from "./map.json"
import { algo_names, apply_algo } from '../../scripts/graph/main';
import { box_width, swap, swap_elem, spaceItems } from '../../scripts/graph/utils';

export const GraphPage = () => {

	const s = Math.sqrt(map.length);

	let graph = [];
	const addToRefs = (elem) => {
		graph.push(elem);
	}

	const pointyCorners = () => {
		let map = graph.map((i)=>{return i.classList.contains("g1")?1:0})
		graph.map((item, i)=>{
			if (map[i+1]==0 && map[i+s]==0 && i%s!==s-1) {
				if (! item.classList.contains("rounded-br")) {
					item.classList.add("rounded-br");
				}
			} else {
				if (item.classList.contains("rounded-br")) {
					item.classList.remove("rounded-br");
				}
			}
			if (map[i-1]==0 && map[i-s]==0 && i%s!==0) {
				if (! item.classList.contains("rounded-tl")) {
					item.classList.add("rounded-tl");
				}
			} else {
				if (item.classList.contains("rounded-tl")) {
					item.classList.remove("rounded-tl");
				}
			}
			if (map[i+1]==0 && map[i-s]==0 && i%s!==s-1) {
				if (! item.classList.contains("rounded-tr")) {
					item.classList.add("rounded-tr");
				}
			} else {
				if (item.classList.contains("rounded-tr")) {
					item.classList.remove("rounded-tr");
				}
			}
			if (map[i-1]==0 && map[i+s]==0 && i%s!==0) {
				if (! item.classList.contains("rounded-bl")) {
					item.classList.add("rounded-bl");
				}
			} else {
				if (item.classList.contains("rounded-bl")) {
					item.classList.remove("rounded-bl");
				}
			}
		})
	}

	const send_apply_algo = ()=>{
		apply_algo(graph);
	}

	setTimeout(() => {
		// send_apply_algo();
	}, 500);

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
	}

	return (
		<div className='bg-blue-100 py-10'>
			<div className='w-[80%] border border-blue-900 mx-auto'>
				<Menu props={props} />
				<Box props={props} />
			</div>
		</div>
	)
}
