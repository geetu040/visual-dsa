function partition(arr, left, right) {

	let pivot = arr[right];
	let pivotIndex = left;

	let ops = [];

	for (let i=left; i<=right; i++) {
		ops.push({'sel1': i}) // OP
		if (arr[i] <= pivot) {
			// swap i with pivot
			if (i !== pivotIndex) {
				let temp = arr[i];
				arr[i] = arr[pivotIndex];
				arr[pivotIndex] = temp;
				ops.push({'swap': [i, pivotIndex]}) // OP
			}
			// increment pivotIndex
			pivotIndex++;
		}
		ops.push({'desel1': i}) // OP
	}
	return [pivotIndex-1, ops];
}

function quick_sort_aux(arr, left, right) {
	if (left >= right) {return [];}

	let [pivotIndex, partition_ops] = partition(arr, left, right);
	let left_ops = quick_sort_aux(arr, left, pivotIndex-1);
	let right_ops = quick_sort_aux(arr, pivotIndex+1, right);

	return partition_ops.concat(left_ops).concat(right_ops);
	
}

export default function quick_sort(arr) {
	return quick_sort_aux(arr, 0, arr.length-1);
}

// let arr = [3, 2, 11, 34, 22, 12, 9]
// let ops = quick_sort_aux(arr, 0, arr.length-1);
// console.log(ops)