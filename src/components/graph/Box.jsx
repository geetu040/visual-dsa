import React from 'react'
import { useEffect } from 'react';

export const Box = ({ props }) => {

	useEffect(() => {
		// code to run after render goes here
		props.pointyCorners();
		props.spaceItems(props.graph);
	});

	return (
		<div className='p-0 m-0 bg-blue-100 shadow-2xl shadow-blue-900 box-content relative' style={{ width: `${props.box_width}vmin`, height: `${props.box_width}vmin` }}>
			{props.map.map((v, i) => {
				return (
					<div
						ref={props.addToRefs}
						key={i}
						className={`
							cursor-pointer
							absolute
							g${v}
						`}
						style={{
							width: `${props.box_width / props.s}vmin`,
							height: `${props.box_width / props.s}vmin`,
							transition: "left 0.05s, top 0.05s",
							transitionTimingFunction: "linear"
						}}
						onClick={(cur) => {
							let btnDisabled = document.getElementsByClassName("g-btn")[0].disabled
							if (btnDisabled) {
								return;
							}
							let gsel = document.getElementsByClassName("gsel")[0];

							let target = cur.currentTarget;
							if (target.classList.contains("g0")) {
								if (gsel) {
									gsel.classList.remove("gsel");
									props.swap_elem(props.graph, gsel, target);
								} else {
									if (document.getElementsByClassName("g0").length / props.map.length > props.min_ratio) {
										target.classList.remove("g0")
										target.classList.add("g1")
									}
								}
							}
							else if (target.classList.contains("g1")) {
								if (gsel) {
									gsel.classList.remove("gsel");
									props.swap_elem(props.graph, gsel, target);
								} else {
									if (document.getElementsByClassName("g1").length / props.map.length > props.min_ratio) {
										target.classList.remove("g1")
										target.classList.add("g0")
									}
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
