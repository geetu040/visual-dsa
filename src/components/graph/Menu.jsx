import React from 'react'
import { PopUp } from './PopUp'

export const Menu = ({ props }) => {
	const btnStyle = `
		shadow-2xl shadow-blue-900 bg-blue-100 border-blue-900
		border-2 font-bold
		transition-color p-2 rounded-md
	`
	return (
		<div className='px-3 py-2'>
			<div className='flex flex-col text-xl space-y-3 justify-center items-center'>
				<select
					className={`
						g-select ${btnStyle} w-48
					`}
					>
					{props.algo_names.map((algo, i) => {
						return <option
							key={i}
							value={i}
						>{algo}
						</option>
					})}
				</select>

				<button
					className={`${btnStyle} g-btn w-32
						hover:bg-blue-900 hover:text-blue-200 disabled:cursor-not-allowed
					`}
					onClick={() => {
						props.send_apply_algo();
					}}
				>Apply</button>
				<PopUp props={props} />
			</div>
		</div>
	)
}
