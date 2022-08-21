import Traversal from "../utils/Traversal";
import BSTTree from "./BSTTree";
import BinaryTree from "./BinaryTree";

let bst_tree = new BSTTree();
let binary_tree = new BinaryTree();

export default class AVLTree extends Traversal {
	insert(root, key) {
		bst_tree.insert(root, key);
		this.createTreeAux(root, root);
	}
	search(root, key) {
		return bst_tree.search(root, key);
	}
	deleteNode(root, node) {
		binary_tree.deleteNode(root, node);
	}
	createTree(root) {
		this.createTreeAux(root, root);
		bst_tree.createTree(root);
	}
	createTreeAux(root, orig_root) {
		if (root === null) return;

		let bf = root.BF();

		while (bf > 1 || bf < -1) {
			if (bf > 1) {
				if (root.l !== null) root.l.rotateLeft(orig_root);
				let isRoot = false;
				if (root === orig_root) isRoot = true;
				let rotated = root.rotateRight(orig_root);
				if (isRoot) {
					root.key = rotated.key;
					root.l = rotated.l;
					root.r = rotated.r;
				}
				this.createTreeAux(orig_root, orig_root);
			}
			if (bf < -1) {
				if (root.r !== null) root.r.rotateRight(orig_root);
				let isRoot = false;
				if (root === orig_root) isRoot = true;
				let rotated = root.rotateLeft(orig_root);
				if (isRoot) {
					root.key = rotated.key;
					root.l = rotated.l;
					root.r = rotated.r;
				}
				this.createTreeAux(orig_root, orig_root);
			}
			bf = root.BF();
		}
		
		this.createTreeAux(root.l, orig_root);
		this.createTreeAux(root.r, orig_root);


	}
}