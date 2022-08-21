import NodeProperties from "./NodeProperties";

export default class Rotations extends NodeProperties {
	rotateRight(root) {
		if (this.l === null) return this;
		if (this == root) {
			let extra_node = root.l.r;
			let original_root = Object.assign(Object.create(Object.getPrototypeOf(root)), root);
			original_root.l = extra_node;
			root = Object.assign(Object.create(Object.getPrototypeOf(root.l)), root.l);
			root.r = original_root;
			root.r.l = extra_node;
			return root;
		}
		let parent = this.getParent(root);
		if (parent.l == this) {
			// is a left child
			let extra_node = this.l.r;
			parent.l = this.l
			this.l.r = this
			this.l = extra_node;
			return this;
		}
		if (parent.r == this) {
			// is a right child
			let extra_node = this.l.r;
			parent.r = this.l;
			this.l.r = this
			this.l = extra_node;
			return this;
		}
	}
	// rotateLeft(root) {
	// 	let rotated = this.rotateLeftAux(root);
	// 	root.key = rotated.key;  
	// 	root.l = rotated.l;
	// 	root.r = rotated.r;
	// 	return root
	// }
	rotateLeft(root) {
		if (this.r === null) return this;
		if (this == root) {
			let extra_node = root.r.l;
			let original_root = Object.assign(Object.create(Object.getPrototypeOf(root)), root);
			original_root.r = extra_node;
			root = Object.assign(Object.create(Object.getPrototypeOf(root.r)), root.r);
			root.l = original_root;
			root.l.r = extra_node;
			return root;
		}
		let parent = this.getParent(root);
		if (parent.r == this) {
			// is a right child
			let extra_node = this.r.l;
			parent.r = this.r
			this.r.l = this
			this.r = extra_node;
			return this;
		}
		if (parent.l == this) {
			// is a left child
			let extra_node = this.r.l;
			parent.l = this.r;
			this.r.l = this
			this.r = extra_node;
			return this;
		}
	}
}