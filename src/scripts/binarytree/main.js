import AVLTree from "./trees/AVLTree"
import BinaryTree from "./trees/BinaryTree";
import BSTTree from "./trees/BSTTree";
import HeapMax from "./trees/HeapMax";
import HeapMin from "./trees/HeapMin";
import Traversal from "./utils/Traversal";

export default class Node extends Traversal {

	constructor(key, l=null, r=null) {
		super();
		this.key = key;
		this.l = l;
		this.r = r;
		this.trees = {
			0 : new BinaryTree(),
			1 : new HeapMin(),
			2 : new HeapMax(),
			3 : new BSTTree(),
			4 : new AVLTree(),
		}
	}
	insert(key, tree_type=0) {
		this.trees[tree_type].insert(this, key);
	}
	search(key, tree_type=0) {
		return this.trees[tree_type].search(this, key);
	}
	deleteNode(root, key, tree_type=0) {
		this.trees[tree_type].deleteNode(root, this);
	}
	createTree(tree_type=0) {
		this.trees[tree_type].createTree(this);
	}

}