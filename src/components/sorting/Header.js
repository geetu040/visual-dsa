import React from 'react'
import { algos } from '../../scripts/sorting/main'

export const Header = ({ props }) => {
	let algo_names = algos.map((algo) => {
		return algo.name.split("_").map((name) => {
			return name.slice(0, 1).toUpperCase() + name.slice(1);
		}).join(" ");
	})
	return (
		<div className='text-center pt-8 pb-5 space-y-1'>
			<h1 className='font-gutter text-slate-300 text-6xl py-7'>Sorting Algorithms</h1>
			<div>
				<label>Algorithm: </label>
				<select
					className='bg-slate-300 text-slate-900 font-semibold text-center rounded'
					onChange={(i) => { props.set_algo(i.target.selectedIndex) }}>
					{algo_names.map((algo, i) => {
						return <option
							key={i}
							value={i}
							className={`
								
							`}
						>{algo}
						</option>
					})}
				</select>
			</div>

			<div className='flex justify-center items-center space-x-1'>
				<input type="checkbox" id="bar-compact" checked={props.compact} onChange={() => props.set_compact(1 - props.compact)} />
				<label htmlFor="bar-compact">Compact Visualization</label>
			</div>

			<div className='flex justify-center items-center space-x-2'>
				<div
					className={props.roundBtn}
					onClick={() => { if (props.N > 10 && !props.is_sorting) { props.set_N(props.N - 1) } }}
				>-</div>
				<div>Bars:{props.N}</div>
				<div
					className={props.roundBtn}
					onClick={() => { if (props.N < 70 && !props.is_sorting) { props.set_N(props.N + 1) } }}
				>+</div>
			</div>

		</div>
	)
}
