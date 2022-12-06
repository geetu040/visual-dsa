import React from 'react'
import {
	Link
} from "react-router-dom";

export const HomeLink = () => {
	return (
		<Link
			className='absolute w-7 h-7 m-1 border border-black rounded-full opacity-80 bg-black'
			to="/">
		</Link>
	)
}
