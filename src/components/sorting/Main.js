import React from 'react'
import { swap } from '../../scripts/sorting/utils'

export const Main = ({ props }) => {

	function handleBarClick(k) {
		if (!props.selected) {
			props.set_selected(k);
		} else if (props.selected === k) {
			props.set_selected(null);
		} else {
			let elems = document.getElementsByClassName("bar");
			swap(elems[k], elems[props.selected]);
			props.set_selected(null);
		}
	}



	return (

		<div className='w-[70%] mx-auto h-[40vh] my-4'>
			<div
				className={`
							mx-auto
							w-[100%] h-[100%] relative
							grid grid-cols-${props.N}
						`}>
				{Array.from(Array(props.N).keys()).map((k) => {
					return (<div
						key={k}
						onClick={() => handleBarClick(k)}
						style={{
							height: `${(1 / props.N) * 100 * (k + 1)}%`,
							width: `${100 / props.N}%`,
							left: `${k * 100 / props.N}%`,
							bottom: 0,
							transition: `height 100ms, left ${1000 * props.speed}ms`,
						}}
						className={` bar
									bg-slate-300 border-slate-900
									absolute border rounded-t-sm
									cursor-pointer
									${(k === props.selected) ? "selected-bar" : ""}
								`}
					></div>)
				})}
			</div>
			<div className='w-[100%] mx-auto'>
				<div
					style={{
						width: "0%",
						transition: "width 10ms",
					}}
					className={`
							bar-loader
							mx-auto mt-[1px]
							bg-slate-50
							h-[0.1px] rounded-3xl
						`}>
				</div>
			</div>
		</div>
	)
}
