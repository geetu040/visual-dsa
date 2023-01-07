import React from 'react'

export const Menu = ({props}) => {
	setTimeout(() => {
		// props.apply_algo(props.graph);
	}, 100);
	return (
		<div>
			<button
				className='bg-blue-300'
				onClick={()=>{
					props.apply_algo(props.graph);
				}}
			>Apply</button>
		</div>
	)
}
