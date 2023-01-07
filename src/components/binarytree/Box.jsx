import React from 'react'
import "../../css/binarytree/Box.css"

export const Box = ({states, constants}) => {

	let extra_margin = 0.5;
	let box_width = constants.width - constants.rightWidth;
	let nodeCounter = 0;
	let levelCounter = 0;
	let keyCounter = 0;
	let root = states.root;
	let levels = constants.levels2D;
	let rootWidth = root.rightDistance() + root.leftDistance() + 1 + extra_margin;
	let nodeSize = box_width / rootWidth;
	if (nodeSize>8) {nodeSize=8}
	let leftSpaces;
	let nodeMargin = nodeSize/30;
	let border_width_divisor = 30;


	const nodeClick = (e) => {
		if (! e.target.classList.contains("bt-node")) return;
		states.setSelected( parseInt(e.target.id.slice(7)) );
	}
	const nodeEnter = (e) => {
		// if (! e.target.classList.contains("bt-node")) return;
		// document.querySelector( "#bt-hoverBox"+ parseInt(e.target.id.slice(7)) ).style.setProperty("visibility", "visible");
	}
	const nodeLeave = (e) => {
		// if (! e.target.classList.contains("bt-node")) {
		// 	document.querySelectorAll(".bt-hoverBox").forEach((h)=>{
		// 		h.style.setProperty("visibility", "hidden");
		// 	})
		// 	return;
		// }
		// document.querySelector( "#bt-hoverBox"+ parseInt(e.target.id.slice(7)) ).style.setProperty("visibility", "hidden")
	}

	let priorNodeWidth = 0;

	return (
		<div className="bt-box" style={{}}>
		<div className="bt-innerBox" style={{
			width: `${rootWidth*nodeSize}vw`,
			// marginLeft: `${(rootWidth/2)*nodeSize}vw`,
		}} >
			{levels.map((level)=>{
				// START OF LEVEL
				priorNodeWidth = 0;
				return (
				<div className='bt-level' id={"bt-level"+levelCounter} key={keyCounter++} style={{height: nodeSize+"vw"}}>
					{level.map((node)=>{
						// START OF NODE

						let node_left_distance = node.leftDistance()
						let node_right_distance = node.rightDistance()

						let left_node_left_distance;
						let right_node_right_distance;
						if (node.l !== null) left_node_left_distance = node.l.leftDistance()
						if (node.r !== null) right_node_right_distance = node.r.rightDistance()



						leftSpaces = node.getLeftSpaces(root) + priorNodeWidth;
						
						return (
						node===null || 
						<div className='bt-outer-node' key={keyCounter++} style={{display: "flex",
						position: "absolute",
						left: `${leftSpaces*nodeSize}vw`,
						}}>
							{node.l !== null && <div className='bt-arrow' style={{

								width: ((node_left_distance - left_node_left_distance - 0.4)*nodeSize)+ "vw",
								height: nodeSize/2 + "vw",

								marginTop: nodeSize/2 + "vw",
								borderTop: `${nodeSize/border_width_divisor}vw solid red`,

								marginLeft: ((left_node_left_distance + 0.4)*nodeSize) + "vw",
								borderLeft: `${nodeSize/border_width_divisor}vw solid red`,
								
								borderTopLeftRadius: "0.5vw",

							}} />}
							<div
								className = {`bt-node ${(node===null)?"bt-null-node":"bt-nonnull-node"} ${nodeCounter===states.selected?"bt-node-selected":""}`}
								style = {{
									margin: nodeMargin/2 + "vw",
									width: (nodeSize-nodeMargin) + "vw",
									height: (nodeSize-nodeMargin) + "vw",

									fontSize: nodeSize/3 + "vw",
									boxShadow: `${nodeSize/4}vw ${nodeSize/4}vw ${nodeSize/4}vw`,
									textShadow: `${nodeSize/2000}vw ${nodeSize/2000}vw ${nodeSize/1}vw`,
								}}
								id = {"bt-node" + (nodeCounter)}
								onClick = {(node==null)?()=>{}:(e)=>{nodeClick(e)}}
								onMouseEnter = {(node==null)?()=>{}:(e)=>{nodeEnter(e)}}
								onMouseLeave = {(node==null)?()=>{}:(e)=>{nodeLeave(e)}}
								key = {keyCounter++}
							>
								{(node == null)?"": node.key}
								{node==null ||
								<>
									<div className="bt-hoverBox" id={"bt-hoverBox"+nodeCounter} style={{}}>
										<div>Height: {node.height()}</div>
										<div>Depth: {node.depth(root)}</div>
										<div>Children: {node.childrenCount()}</div>
										<div>Balance Factor: {node.BF()}</div>
									</div>
								</>}
							</div>

							{node.r !== null && <div className='bt-arrow' style={{
								width: ((node_right_distance - right_node_right_distance - 0.4)*nodeSize)+ "vw",
								height: nodeSize/2 + "vw",

								marginTop: nodeSize/2 + "vw",
								borderTop: `${nodeSize/border_width_divisor}vw solid red`,

								marginRight: ((right_node_right_distance + 0.4)*nodeSize) + "vw",
								borderRight: `${nodeSize/border_width_divisor}vw solid red`,

								borderTopRightRadius: "0.5vw",

							}} />}

							{[1].map(()=>{
								// END OF NODE
								priorNodeWidth += node_left_distance + node_right_distance + 1;
								nodeCounter++;
								return null;
							})}
						</div>);

					})}
				{[0].map(()=>{
					// END OF LEVEL
					levelCounter++;
					return null;
				})}
				</div>
			)})}

			{[0].map(()=>{
				// END OF LAYOUT
				return null;
			})}
		</div>
		</div>
	)
}