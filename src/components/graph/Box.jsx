import React from 'react'
import { useEffect } from 'react';
import "../../css/graph/Box.css"

export const Box = ({ props }) => {

	useEffect(() => {
		// code to run after render goes here
		props.pointyCorners();
		props.spaceItems(props.graph);
	});

	return (
		<div className='border box-content border-red-900 relative' style={{ width: `${props.box_width}vmin`, height: `${props.box_width}vmin` }}>
			{props.map.map((v, i) => {
				return (
					<div
						ref={props.addToRefs}
						key={i}
						className={`
							absolute
							g${v}
							${(v == 1) && `

							`}
						`}
						style={{
							width: `${props.box_width / props.s}vmin`,
							height: `${props.box_width / props.s}vmin`,
							transition: "left 0.2s, top 0.2s",
						}}
						onClick={(cur) => {
							let gsel = document.getElementsByClassName("gsel")[0];

							let target = cur.currentTarget;
							if (target.classList.contains("g0")) {
								if (gsel) {
									gsel.classList.remove("gsel");
									props.swap_elem(props.graph, gsel, target);
								} else {
									target.classList.remove("g0")
									target.classList.add("g1")
								}
							}
							else if (target.classList.contains("g1")) {
								if (gsel) {
									gsel.classList.remove("gsel");
									props.swap_elem(props.graph, gsel, target);
								} else {
									target.classList.remove("g1")
									target.classList.add("g0")
								}
							}
							else if (target === gsel) {
								gsel.classList.remove("gsel");
							}
							else if (gsel === undefined) {
								target.classList.add("gsel");
							}
							else {
								// target is g2 and selected is g3 or vice virsa
								gsel.classList.remove("gsel");
								props.swap_elem(props.graph, target, gsel);
							}


							props.pointyCorners();
						}}
					></div>
				)
			})}
		</div>
	)
}
