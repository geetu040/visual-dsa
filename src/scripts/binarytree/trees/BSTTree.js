import Traversal from "../utils/Traversal";
import Node from "../main";
import BinaryTree from "./BinaryTree";

let binary_tree = new BinaryTree();

export default class BSTTree extends Traversal {
	insert(root, key) {
		if (key <= root.key) {
			if (root.l === null)
				root.l = new Node(key);
			else
				this.insert(root.l, key);
		}
		if (key > root.key) {
			if (root.r === null)
				root.r = new Node(key);
			else
				this.insert(root.r, key);
		}
	}
	search(root, key) {

		if (root === null)
			return null;

		if (key === root.key)
			return root;

		if (key < root.key)
			return this.search(root.l, key);

		if (key > root.key)
			return this.search(root.r, key);
			
	}
	deleteNode(root, node) {
		binary_tree.deleteNode(root, node);
	}
	createTree(root) {
		this.createTreeAux(root, root);
	}
	createTreeAux(root, orig_root) {

		if (root === null) return;

		let current_node = root;
		let parent = current_node.getParent(orig_root)
		while (parent !== null) {
			if (parent.l === current_node && root.key > parent.key) {
				// node is left and wrongly put
				let temp = root.key;
				root.key = parent.key;
				parent.key = temp;
				this.createTreeAux(orig_root, orig_root);
			} 
			if (parent.r === current_node && root.key < parent.key) {
				// node is right and wrongly put
				let temp = root.key;
				root.key = parent.key;
				parent.key = temp;
				this.createTreeAux(orig_root, orig_root);
			}
			current_node = parent;
			parent = parent.getParent(orig_root);
		}

		this.createTreeAux(root.l, orig_root)
		this.createTreeAux(root.r, orig_root)

	}
}