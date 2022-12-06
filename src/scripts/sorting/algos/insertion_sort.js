export default function insertion_sort(arr) {
	let ops = [];
	let n = arr.length;
	for (let i=0; i<n; i++) {
		ops.push({"sel1": i}) // op
		for (let j=i; j>0; j--) {
			ops.push({"sel2": j}) // op
			if (arr[j] < arr[j-1]) {
				let temp = arr[j-1];
				arr[j-1] = arr[j];
				arr[j] = temp;
				ops.push({"swap": [j, j-1]}) // op
			}
			ops.push({"desel2": j}) // op
		}
		ops.push({"desel1": i}) // op
	}
	return ops;
}