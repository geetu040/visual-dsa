import React from 'react'
import {
	Link
} from "react-router-dom";

export const Home = () => {
	const btnStyle = `
		bg-blue-900
		text-blue-50 font-mono
		py-2 px-3 rounded
		text-3xl
		text-center
	`
	return (<>
		<div className='bg-blue-200 min-h-screen flex flex-col justify-start items-center py-32 space-y-3'>
			<Link className={btnStyle} to="/graph">Graphs Algorithms</Link>
			<Link className={btnStyle} to="/sorting">Sorting Algorithms</Link>
			<Link className={btnStyle} to="/binarytree">Binary Tree</Link>
		</div>
	</>)
}
