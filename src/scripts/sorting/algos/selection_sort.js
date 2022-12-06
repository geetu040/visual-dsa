export default function selection_sort(arr) {
	let ops = [];
	let n = arr.length;
	for (let i=0; i<n; i++) {
		ops.push({"sel1": i}) // op
		let greatest = null;
		let j;
		for (j=0; j<n-i; j++) {
			ops.push({"sel2": j}) // op
			if (greatest === null || (arr[j] > arr[greatest])) {
				greatest = j;
			}
			ops.push({"desel2": j}) // op
		}
		if (greatest !== j-1) {
			let temp = arr[greatest];
			arr[greatest] = arr[j-1];
			arr[j-1] = temp;
			ops.push({"swap": [greatest, j-1]}) // op
		}

		ops.push({"desel1": i}) // op
	}
	return ops;
}