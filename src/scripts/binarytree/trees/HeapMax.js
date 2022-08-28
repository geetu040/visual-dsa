import Traversal from "../utils/Traversal";
import Node from "../main";
import BinaryTree from "./BinaryTree";

let binary_tree = new BinaryTree();

export default class HeapMax extends Traversal {
	insert(root, key) {
		let current_root = root;
		while (current_root.l !== null) {
			current_root = current_root.l;
		}
		current_root.l = new Node(key);
		this.createTree(root);
	}
	search(root, key) {
		return binary_tree.search(root, key);
	}
	deleteNode(root, node) {
		binary_tree.deleteNode(root, node);
	}
	createTree(root) {
		let levels = root.preOrder(true)
		levels.sort();
		levels.reverse();

		let new_nodes = []
		levels.forEach(key => {
			new_nodes.push( new Node(key) );
		});

		new_nodes.forEach((node, i)=>{
			if (2*i + 1 < new_nodes.length)
				node.l = new_nodes[2*i + 1]
			if (2*i + 2 < new_nodes.length)
				node.r = new_nodes[2*i + 2]
		})

		root.key = new_nodes[0].key;
		root.l = new_nodes[0].l;
		root.r = new_nodes[0].r;
	}
}