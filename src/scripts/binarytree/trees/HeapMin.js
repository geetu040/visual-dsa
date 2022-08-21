import Traversal from "../utils/Traversal";
import Node from "../main";
import BinaryTree from "./BinaryTree";

let binary_tree = new BinaryTree();

export default class HeapMin extends Traversal {
	insert(root, key) {
		if (key < root.key) {
			let temp = root.key;
			root.key = key;
			this.insert(root, temp);
			return;
		}
		if (root.l === null) {
			root.l = new Node(key);
			return;
		}
		if (root.r === null) {
			root.r = new Node(key);
			return;
		}
		if (root.BF() > 0)
			this.insert(root.r, key);
		else
			this.insert(root.l, key);
	}
	search(root, key) {
		return binary_tree.search(root, key);
	}
	deleteNode(root, node) {
		binary_tree.deleteNode(root, node);
	}
	createTree(root) {
		this.createTreeAux(root, root);
	}
	createTreeAux(root, orig_root) {
		if (root === null) return;
		if (root.l !== null && root.l.key < root.key) {
			// swap left with parent
			let temp = root.l.key;
			root.l.key = root.key;
			root.key = temp;
			// reiterate from parent if a child changes
			let parent = root.getParent(orig_root); 
			if (parent !== null) this.createTreeAux(parent, orig_root);
		}
		if (root.r !== null && root.r.key < root.key) {
			// swap right with parent
			let temp = root.r.key;
			root.r.key = root.key;
			root.key = temp;
			// reiterate from parent if a child changes
			let parent =root.getParent(orig_root); 
			if (parent !== null) this.createTreeAux(parent, orig_root);
		}
		this.createTreeAux(root.l, orig_root);
		this.createTreeAux(root.r, orig_root);
		
	}
}