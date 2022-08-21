import Traversal from "../utils/Traversal";
import Node from "../main";

export default class BinaryTree extends Traversal {

	insert(node, key) {
		if (node.l === null) {
			node.l = new Node(key);
			return;
		}
		if (node.r === null) {
			node.r = new Node(key);
			return;
		}
		if (node.BF() > 0)
			this.insert(node.r, key);
		else
			this.insert(node.l, key);	
	}
	search(node, key) {
		if (node === null) {
			return null;
		}
		if (node.key === key) {
			return node;
		}
		let atLeft = this.search(node.l, key);
		if (atLeft === null) {
			return this.search(node.r, key);
		}
		return atLeft;
	}
	deleteNode(root, node) {
		if (node.l == null && node.r == null) {
			let parent = node.getParent(root);
			if (parent.l == node) parent.l = null;
			if (parent.r == node) parent.r = null;
			return;
		}
		if (node.l != null) {
			node.key = node.l.key;
			this.deleteNode(root, node.l)
			return;
		}
		if (node.r != null) {
			node.key = node.r.key;
			this.deleteNode(root, node.r)
			return;
		}
	}
	createTree(root) {}

}