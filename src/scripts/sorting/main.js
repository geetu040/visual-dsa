import {
	get_height,
	set_height,
	operate,
	shuffle_arr,
	order_bars,
	set_left_per
} from "./utils"

import bubble_sort from "./algos/bubble_sort"
import selection_sort from "./algos/selection_sort"
import insertion_sort from "./algos/insertion_sort"
import merge_sort from "./algos/merge_sort"
import quick_sort from "./algos/quick_sort"

const algos = [
	insertion_sort,
	selection_sort,
	bubble_sort,
	merge_sort,
	quick_sort,
]

function shuffle() {
	let bars = document.getElementsByClassName("bar");
	let n = bars.length;
	let temp_arr = [];
	for (let i = 0; i < n; i++) {
		temp_arr.push(get_height(bars[i]))
	}

	shuffle_arr(temp_arr)

	for (let i = 0; i < n; i++) {
		set_left_per(bars[i], i * 100 / bars.length)
		set_height(bars[i], temp_arr[i])
	}
}
function sort(method, set_is_sorting, one=false, set_current_intervals=null) {
	let bars = order_bars();
	let bars_height = [];
	for (let i=0; i<bars.length; i++) {
		bars_height.push(get_height(bars[i]));
	}
	let ops = algos[method](bars_height);
	if (document.getElementById("bar-compact").checked || one) {
		ops = ops.filter((op)=>{
			let k = Object.keys(op)[0];
			return  k === "swap" || k === "swap_mult";
		})
	}
	if (one) {
		ops = ops.slice(0, 1);
	}
	set_is_sorting(true);
	let intervals = [];
	operate(ops, set_is_sorting, ops.length, intervals);
	set_current_intervals(intervals);
	
}

export {shuffle, sort, algos}