export default function bubble_sort(arr) {
	let ops = [];
	let n = arr.length;
	for (let i=0; i<n; i++) {
		ops.push({"sel1": i}) // op
		for (let j=1; j<n-i; j++) {
			ops.push({"sel2": j}) // op
			if (arr[j] < arr[j-1]) {
				let temp = arr[j];
				arr[j] = arr[j-1];
				arr[j-1] = temp;
				ops.push({"swap": [j, j-1]}) // op
			}
			ops.push({"desel2": j}) // op
		}
		ops.push({"desel1": i}) // op
	}
	return ops;
}