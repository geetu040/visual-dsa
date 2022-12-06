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

async function operate(ops, set_is_sorting, total_ops, intervals) {
	document.getElementsByClassName("bar-loader")[0].style.setProperty("width", `${100*(total_ops-ops.length)/total_ops}%`)
	if (ops.length === 0) {
		document.getElementsByClassName("bar-loader")[0].style.setProperty("width", `0%`);
		set_is_sorting(false);
		return;
	}

	function callback() {
		let id = setTimeout(() => {
			operate(ops.slice(1), set_is_sorting, total_ops, intervals);
		}, 1);
		intervals.push(id)
	}

	let bars = order_bars();
	let key = Object.keys(ops[0])[0];
	let val = Object.values(ops[0])[0];
	let delay = null;

	switch (key) {
		case 'swap':
			swap(bars[val[0]], bars[val[1]]);
			delay = bars[val[0]];
			break;
		case 'swap_mult':
			delay = swap_mult(val[0], val[1]);
			break;
		case 'sel1':
			bars[val].classList.add("sel1");
			break;
		case 'desel1':
			document.getElementsByClassName("sel1")[0].classList.remove("sel1");
			break;
		case 'sel2':
			bars[val].classList.add("sel2");
			break;
		case 'desel2':
			document.getElementsByClassName("sel2")[0].classList.remove("sel2");
			break;
		default:
			break;
	}

	if (delay) {
		delay.addEventListener(getTransitionEndEventName(), ()=>{
			callback();
		}, {once : true});
	}
	else {
		callback();
	}
	
}

function swap_mult(before, after) {
	let bars = order_bars();
	let gets = before.map((i) => {
		return get_left_per(bars[i]);
	})
	let j = 0;
	let to_return = null;
	after.map((i) => {
		if (get_left_per(bars[i]) !== gets[j]) {
			to_return = bars[i];
		} 
		set_left_per(bars[i], gets[j++]);
		return i;
	})
	return to_return;
}

function order_bars() {
	let bars_html = document.getElementsByClassName("bar");
	let bars = []
	for (let i = 0; i < bars_html.length; i++) {
		bars.push(bars_html[i]);
	}

	let n = bars.length;
	let ordered_bars = []

	for (let i = 0; i < n; i++) {
		let smallest = null;
		for (let j = 0; j < n; j++) {
			if (bars[j]) {
				if (smallest == null || get_left(bars[j]) < get_left(bars[smallest])) {
					smallest = j;
				}
			}
		}
		ordered_bars.push(bars[smallest]);
		bars[smallest] = null;
	}
	return ordered_bars;
}

function random(min, max) {
	return parseInt(Math.random() * (max - min) + min)
}

function shuffle_arr(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function get_height(item) {
	// return parseFloat(item.style.height.slice(0, -2));
	return parseFloat(getComputedStyle(item).height.slice(0, -2));
}
function get_left(item) {
	return parseFloat(getComputedStyle(item).left.slice(0, -2));
}
function get_left_per(item) {
	let bars = order_bars();
	let i = bars.indexOf(item);
	return 100 * i / bars.length;
}
function set_height(item, val) {
	item.style.setProperty("height", `${val}px`)
}
function set_left(item, val) {
	item.style.setProperty("left", `${val}px`)
}
function set_left_per(item, val) {
	item.style.setProperty("left", `${val}%`)
}

function arrange_display(bars) {
	let n = bars.length;
	for (let i = 0; i < n; i++) {
		bars[i].style.setProperty("left", `${i * 100 / n}%`)
	}
}

function swap(bar1, bar2) {

	let bar1_left = get_left_per(bar1);
	let bar2_left = get_left_per(bar2);

	set_left_per(bar1, bar2_left)
	set_left_per(bar2, bar1_left)

	// await waitForElementTransition(bar1);
}

export {
	random, shuffle_arr,
	set_height, set_left,
	get_height, get_left,
	set_left_per,
	arrange_display,
	swap,
	order_bars,
	operate,
};