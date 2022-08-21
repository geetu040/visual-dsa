import Node from "../main";

export default class NodeProperties {
	getParent(root) {
		if (root == this) return null;
		let order = root.preOrder();
		let parent;
		order.forEach((e) => {
			if (e.l == this || e.r == this) parent = e;
		})
		return parent;
	}
	isLeaf() {
		return (this.l === null && this.r === null);
	}
	hasLeftLeafOnly() {
		return (this.l !== null && this.r === null && this.l.isLeaf());
	}
	hasRightLeafOnly() {
		return (this.r !== null && this.l === null && this.r.isLeaf());
	}
	BF () {
		let bf = 0;
		if (this.l !== null) bf += this.l.height();
		if (this.r !== null) bf -= this.r.height();
		return bf;
	}
	height(node=this) {
		if (node == null) 
			return 0;

		let hl = this.height(node.l);
		let hr = this.height(node.r);

		return 1 + ((hl > hr) ? hl : hr)
	}
	width() {
		let width = 0;
		let level_width = 0;
		this.getLevels2D().forEach((e)=>{
			level_width = e.filter((j)=>{return j!==null}).length
			if (level_width > width) {
				width = level_width;
			}
		})
		return width;
	}
	getLeftNode(root) {
		
		if (this === root) return null;

		let levels = root.getTrueLevels2D();

		for (let i=0; i<levels.length; i++) {
			let j = levels[i].indexOf(this);
			if (j === 0) return null;
			if (j !== -1) {
				return levels[i][j-1]
			}
		}

	}


	getLeftSpaces(root) {

		if (this === root) return 0;


		let space = 0;
		let parent = this.getParent(root);

		if (parent.l === null && parent.r === this) space += 0.5;

		let levels = root.getTrueLevels2D();
		let parent_level;
		levels.forEach((l)=>{
			if (l.indexOf(parent) !== -1) {
				parent_level = l;
			}
		})

		let left_of_parent = parent_level[parent_level.indexOf(parent)-1]
		while (left_of_parent !== undefined) {
			if (left_of_parent.l === null) space += 0.5;
			if (left_of_parent.r === null) space += 0.5;
			left_of_parent = parent_level[parent_level.indexOf(left_of_parent)-1]
		}

		space += parent.getLeftSpaces(root);

		return space;
	}


















	// getSpaceBefore(root) {
	// 	if (this === root) return 0;



	// 	let current_parent = this.getParent(root);
	// 	if (current_parent.l !== null && current_parent.r === this) return 0;
	// 	let space = 0;
	// 	let levels = root.getTrueLevels2D();
		
	// 	let current_level = -1;
	// 	levels.forEach((l, i)=>{
	// 		if (l.indexOf(current_parent) !== -1) {
	// 			current_level = i;
	// 		}
	// 	})
	// 	let current_level_back = current_level;
	// 	let thres_sib = 0;

	// 	while (current_parent !== null) {
	// 		// from 1st parent to root

	// 		if (current_parent.l === null) space += 0.5;

	// 		let current_sibling = levels[current_level].indexOf(current_parent) - 1;
	// 		while (current_sibling >= thres_sib) {
	// 			// from parent's first left till parent's left most
	// 			let sib_node = levels[current_level][current_sibling]
	// 			if (sib_node.l === null) space += 0.5
	// 			if (sib_node.r === null) space += 0.5
				
	// 			if (current_level_back === current_level && (sib_node.l !== null || sib_node.r !== null)) {
	// 				if (sib_node.r !== null) space -= 0.5
	// 				return space;
	// 				thres_sib = current_sibling
	// 				break;
	// 			}
				
	// 			current_sibling--;
	// 		}


	// 		current_parent = current_parent.getParent(root);
	// 		current_level--;
	// 	}

	// 	return space;
	// }


	// spaceBeforeFirstNode(root) {
	// 	return 0;
	// 	if (this === root) return 0;

	// 	let space = 0;
	// 	let parent = this.getParent(root);

	// 	if (parent.r === this && parent.l === null) {
	// 		space += 0.5 + parent.spaceBeforeFirstNode(root);
	// 	}
		
	// }
















	leftDistance() {
		if (this.l === null) return 0;
		return this.l.leftDistanceAux() + this.l.rightDistanceAux() + 0.5;
	}
	rightDistance() {
		if (this.r === null) return 0;
		return this.r.leftDistanceAux() + this.r.rightDistanceAux() + 0.5;
	}
	leftDistanceAux() {
		if (this.l === null) return 0;
		return 0.5 + this.l.leftDistanceAux() + this.l.rightDistanceAux();
	}
	rightDistanceAux() {
		if (this.r === null) return 0;
		return 0.5 + this.r.rightDistanceAux() + this.r.leftDistanceAux();
	}

	// getNullsBefore(root) {
	// 	if (this === root) return 0;

	// 	let levels2D = root.getLevels2D();
	// 	let layer = -1;
	// 	levels2D.forEach((l)=>{
	// 		if (l.indexOf(this) !== -1) {
	// 			layer = l;
	// 		}
	// 	})

	// 	let nullCount = 0;
	// 	for (let i=0; i<layer.length; i++) {
	// 		if (layer[i] === this) {
	// 			break;
	// 		}
	// 		if (layer[i] === null) {
	// 			nullCount += 1;
	// 		}
	// 		if (layer[i] !== null) {
	// 			nullCount = 0;
	// 		}
	// 	}

	// 	return nullCount;
	// }

	// getleftNullSpace(root) {
	// 	if (this == root) return 0;

	// 	let parent = this.getParent(root);

	// 	if (parent.l === null && parent.r === this) {
	// 		return 0.5 + parent.getleftNullSpace(root);
	// 	}
	// 	if (parent.l !== null && parent.r === this) {
	// 		return 0;
	// 	}
	// 	if (parent !== root) {
	// 		// console.log(this.key)
	// 	}
	// 	// console.log(this.key)
	// 	return parent.getleftNullSpace(root)

	// 	return 0;
	// }
	// getrightNullSpace(root) {
	// 	if (this == root) return 0;

	// 	let parent = this.getParent(root);
		
	// 	if (parent.r === null && parent.l === this) {
	// 		return 0.5;
	// 	}
	// 	if (parent.r !== null && parent.l === this) {
	// 		return 0;
	// 	}
	// 	return parent.getrightNullSpace(root)

	// 	return 0;
	// }

	// getNullSpace(root) {
	// 	if (this === root) return 0;

	// 	let nullCount = this.getNullsBefore(root);
	// 	let parent = this.getParent(root);
	// 	let nullSpace = 0;

	// 	if (nullCount === 0) return 0;

	// 	if (parent.r === this && nullCount%2 == 0) {
	// 		// right and even

	// 	}
	// 	if (parent.r === this && nullCount%2 == 1) {
	// 		// right and odd

	// 	}
	// 	if (parent.l === this && nullCount%2 == 0) {
	// 		// left and even

	// 		return 0;
	// 		return 1;
	// 	}
	// 	if (parent.l === this && nullCount%2 == 1) {
	// 		// left and odd

	// 	}

	// 	return 0;

	// }




	// widthAbsolute() {
	// 	let width = 0;
	// 	this.getLevels2D().forEach((e)=>{
	// 		if (e.length > width) {
	// 			width = e.length;
	// 		}
	// 	})
	// 	return width;
	// }


	
	depth(root) {
		let to_return = -1;
		root.getLevels2D().forEach((level, i)=>{
			if (level.includes(this)) { to_return =  i; }
		})
		return to_return;
	}
	childrenCount() {
		return this.childrenCountAux(this) - 1;
	}
	childrenCountAux(node) {
		if (node == null)
			return 0;
		return 1 + this.childrenCountAux(node.l) + this.childrenCountAux(node.r);
	}
	getLevels() {
		return this.getLevels2D().flat();
	}
	getTrueLevels() {
		return this.getTrueLevels2D().flat();
	}
	getTrueLevels2D() {
		let levels = this.getLevels2D();
		let new_levels = [];
		levels.forEach((level)=>{
			new_levels = new_levels.concat([level.filter((e)=>{return e!==null})]);
		})
		return new_levels;
	}
	getLevels2D() {
		return [[this]].concat(this.getLevelsAux());
	}
	getLevelsAux(previous_level=[this]) {
		let level = []
		previous_level.forEach((l)=>{
			if (l == null) {
				level.push(null);
				level.push(null);
			} else {
				level.push(l.l);
				level.push(l.r);
			}
		})
		let levelIsNotNull = false
		level.forEach((l)=>{
			if (l !== null) {
				levelIsNotNull = true;
			}
		})
		if (levelIsNotNull) {
			return [level].concat(this.getLevelsAux(level));
		} else {
			return [];
		}
	}
	printTree(l=0) {
		let indent = " - "
		for (let i=0; i<l; i++) indent += indent

		if (this.l != null) {
			this.l.printTree(l+1)
		}
		console.log(indent, this.key)
		if (this.r != null) {
			this.r.printTree(l+1)
		}
	}
	copy(new_node = null) {
		new_node = new Node(this.key)
		if (this.l == null) new_node.l = null;
		else new_node.l = this.l.copy(new_node.l)
		if (this.r == null) new_node.r = null
		else new_node.r = this.r.copy(new_node.r)
		return new_node;
	}
	isFullBinaryTree() {
		if (this.l === null && this.r === null) return true;
		return this.l !== null && this.r !==null && this.l.isFullBinaryTree() && this.r.isFullBinaryTree();
	}
	isPerfectBinaryTree() {
		if (this.l === null && this.r === null) return true;
		return this.isFullBinaryTree() && this.BF()===0 && this.l.isPerfectBinaryTree() && this.r.isPerfectBinaryTree();
	}
	isCompleteBinaryTree() {
		let levels = this.getLevels();
		let nodeReached = false;
		let result = true;
		levels.forEach((level)=>{
			if (level === null) nodeReached = true;
			if (nodeReached && level !== null) result = false;
		})
		return result;
	}
	isBalancedBinaryTree() {
		let exp = this.BF() < 2 && this.BF() > -2;
		if (this.l !== null) exp = exp && this.l.isBalancedBinaryTree();
		if (this.r !== null) exp = exp && this.r.isBalancedBinaryTree();
		return exp;
	}
}