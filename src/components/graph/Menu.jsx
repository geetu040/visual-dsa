import React from 'react'

export const Menu = ({ props }) => {
	const btnStyle = `
		shadow-2xl shadow-blue-900 bg-blue-100 border-blue-900
		border-2 font-bold
		transition-color p-2 rounded-md
		my-1
	`
	return (
		<div className='mx-4 my-5'>
			<div className='flex flex-col flex-wrap text-xl'>
				<select
					className={`
						g-select ${btnStyle}
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
					className={`${btnStyle} g-btn
						w-[80%] mx-auto
						hover:bg-blue-900 hover:text-blue-200 disabled:cursor-not-allowed
					`}
					onClick={() => {
						props.send_apply_algo();
					}}
				>Apply</button>
			</div>
		</div>
	)
}
