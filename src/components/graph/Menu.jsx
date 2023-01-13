import React from 'react'

export const Menu = ({ props }) => {
	setTimeout(() => {
		// props.apply_algo(props.graph);
	}, 100);
	return (
		<div className=''>

			<select
				className='g-select'
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
				className='bg-blue-300 g-btn'
				onClick={() => {
					props.send_apply_algo();
				}}
			>Apply</button>
		</div>
	)
}
