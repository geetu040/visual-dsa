import React from 'react'
import { Box } from './Box';
import { Footer } from './Footer';
import { Header } from './Header';
import { Right } from './Right';
import { Top } from './Top';
import "../../css/binarytree/Main.css"

export const Main = ({states, constants}) => {
	return (<>
		<div className='bt-body'>
			<h1 className='bt-heading'>
				BINARY TREES
				<br />
				DSA
			</h1>
			<div className="bt-container" style={{width: constants.width + "vw"}}>
				<Header states={states} constants={constants} />
				<div className="bt-sub-container">
					<div className="bt-sub-container-l" style={{width: (100-constants.rightWidth)+"%"}}>
						<Top states={states} constants={constants} />
						<Box states={states} constants={constants} />
					</div>
					<Right states={states} constants={constants} />
				</div>
				<Footer states={states} constants={constants} />
			</div>
		</div>
	</>)
}
