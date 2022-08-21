import Rotations from "./Rotations";

export default class Traversal extends Rotations {
	preOrder (key = false, node = this) {
		if (node === null) return [];
		let order = []

		if (key==true) {order.push(node.key)}
		else {order.push(node)}
		order = order.concat(this.preOrder(key, node.l))
		order = order.concat(this.preOrder(key, node.r))

		return order;
	}
	inOrder (key = false, node = this) {
		if (node === null) return [];
		let order = []

		order = order.concat(this.inOrder(key, node.l))
		if (key==true) {order.push(node.key)}
		else {order.push(node)}
		order = order.concat(this.inOrder(key, node.r))

		return order;
	}
	postOrder (key = false, node = this) {
		if (node === null) return [];
		let order = []

		order = order.concat(this.postOrder(key, node.l))
		order = order.concat(this.postOrder(key, node.r))
		if (key==true) {order.push(node.key)}
		else {order.push(node)}

		return order;
	}
	levelOrder(key=false, order=[this], startIndex=0) {
		let nextIterStartIndex = order.length

		order.slice(startIndex).map((e, i)=>{
			if (e.l != null) order.push(e.l);
			if (e.r != null) order.push(e.r);
			return null;
		})

		if (order.length === nextIterStartIndex) {
			// empty layer
			if (key) return order.map((e)=>{return e.key});
			else return order.map((e)=>{return e});;
			
		}
		return this.levelOrder(key, order, nextIterStartIndex);
	}
}