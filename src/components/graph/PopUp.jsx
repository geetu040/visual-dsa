import React from 'react'

export const PopUp = ({ props }) => {
	if (!props.pop) {
		return <></>
	}
	return (
		<div className='hover:shadow-blue-900 hover:shadow-2xl relative pt-2 pb-2 text-blue text-sm font-bold text-center w-48 border border-blue-900 rounded bg-blue-400'>
			<button onClick={() => { props.set_pop(false) }}
				className='hover:bg-blue-900 hover:text-blue-50 rounded absolute top-0 right-0 px-1'>X</button>
			Click the maze anywhere to make changes
		</div>
	)
}
