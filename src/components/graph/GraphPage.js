import React from 'react'

import { Box } from './Box'
import { Menu } from './Menu';

import map from "./map.json"
import { apply_algo } from '../../scripts/graph/main';

export const GraphPage = () => {

	const s = Math.sqrt(map.length);
	const box_width = 80

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
	const spaceItems = () => {
		graph.map((item, i)=>{
			item.style.setProperty("left", `${(i%s)*(box_width/s)}vmin`);
			item.style.setProperty("top", `${(Math.floor(i/s))*(box_width/s)}vmin`);
		})
	}
	const swap_elem = (elem1, elem2) => {
		swap(graph.indexOf(elem1), graph.indexOf(elem2));
	}
	const swap = (i1, i2) => {
		let temp = graph[i1];
		graph[i1] = graph[i2];
		graph[i2] = temp;
		spaceItems();
	}

	let props = {
		map,
		s,
		box_width,
		graph,
		addToRefs,
		pointyCorners,
		spaceItems,
		swap_elem,
		swap,
		apply_algo,
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
