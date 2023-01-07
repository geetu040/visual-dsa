import React from 'react'
import {sort, shuffle} from '../../scripts/sorting/main'

export const Footer = ({props}) => {

	let btnStyle = "bg-slate-300 text-lg font-bold px-2 rounded text-slate-900"

	return (
		<div className='flex flex-col items-center pt-2 pb-32'>
			<div className='flex justify-center space-x-10 w-[50%] items-center'>
				<button
					className={btnStyle}
					hidden={props.is_sorting}
					onClick={()=>{sort(props.algo, props.set_is_sorting, true)}}
				>Sort One</button>
				<button
					className={btnStyle}
					onClick={()=>{
						if (props.is_sorting) {
							props.current_intervals.forEach(inter => {
								clearInterval(inter);
							});
							let sel1 = document.getElementsByClassName("sel1")[0]
							if (sel1) {sel1.classList.remove("sel1")};
							let sel2 = document.getElementsByClassName("sel2")[0]
							if (sel2) {sel2.classList.remove("sel2")};
							props.set_is_sorting(false);
						} else {
							sort(props.algo, props.set_is_sorting, false, props.set_current_intervals);
						}
					}}
				>
					{props.is_sorting?"Stop":"Sort"}
				</button>
				<button
					className={btnStyle}
					hidden={props.is_sorting}
					onClick={()=>{shuffle()}}
				>Shuffle</button>
			</div>

			<div className='flex justify-center items-center space-x-2 py-2'>
				<span 
					className={props.roundBtn}
					onClick={()=>{if(0.1/props.speed > 0.125){props.set_speed(props.speed*2)}}}
				>-</span>
				<div>Speed:{0.1/props.speed}x</div>
				<span
					className={props.roundBtn}
					onClick={()=>{if(0.1/props.speed < 8){props.set_speed(props.speed/2)}}}
				>+</span>
			</div>
		</div>
	)
}
