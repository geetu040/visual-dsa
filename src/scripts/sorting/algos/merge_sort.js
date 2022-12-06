function merge_sort_aux(arr, l, r) {
	if (r-l <= 1) {
		if (arr[r] < arr[l]) {
			let temp = arr[l];
			arr[l] = arr[r];
			arr[r] = temp;
			return [{'swap': [l, r]}]; // op
		}
		
		return []; // op
	}
	
	let ops = [];  // op

	let m = Math.ceil((r - l) / 2 + l);
	ops.push({"sel1": m})
	
	let left_ops = merge_sort_aux(arr, l, m); // op
	let right_ops = merge_sort_aux(arr, m+1, r); // op


	ops = ops.concat(left_ops).concat(right_ops); // op
	ops.push({"desel1": m})
	

	let new_arr = [];
	let temp_l = l;
	let temp_r = m+1;

	for (let i=0; i<r-l+1; i++) {
		if (temp_l >= m+1) {
			// right
			new_arr.push(arr[temp_r++]);
		}
		else if (temp_r > r) {
			// left
			new_arr.push(arr[temp_l++]);
		}
		else {
			if (arr[temp_l] < arr[temp_r]) {
				new_arr.push(arr[temp_l++]);
			}
			else {
				new_arr.push(arr[temp_r++]);
			}
		}
	}

	let before = Array.from(Array(r+1).keys()).filter(i=>{return i>=l});
	let after = new_arr.map((i)=>{
		return arr.indexOf(i);
	})
	ops.push({"swap_mult": [before, after]}); // op


	for (let i=0; i<new_arr.length; i++) {
		arr[l+i] = new_arr[i];
	}

	return ops;

}
export default function merge_sort(arr) {
	return merge_sort_aux(arr, 0, arr.length-1);
}