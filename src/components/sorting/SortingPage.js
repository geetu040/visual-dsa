import React from 'react'
import { useState, useEffect } from 'react'

import {shuffle} from '../../scripts/sorting/main'

import { Header } from "./Header"
import { Main } from "./Main"
import { Footer } from "./Footer"

export const SortingPage = () => {

	const roundBtn = `
		cursor-pointer rounded-full text-xs font-bold w-5 h-5
		flex justify-center items-center
		bg-slate-700 text-slate-50
	`

	const [N, set_N] = useState(40);
	const [is_sorting, set_is_sorting] = useState(false);
	const [algo, set_algo] = useState(0);
	const [speed, set_speed] = useState(0.1/1);
	const [time, set_time] = useState(50);
	const [compact, set_compact] = useState(0);
	const [selected, set_selected] = useState(null);
	const [current_intervals, set_current_intervals] = useState(null);

	useEffect(() => {
		set_selected(null);
		setTimeout(() => {
			shuffle();
		}, 100);
	}, [N])

	const props = {
		N, set_N,
		is_sorting, set_is_sorting,
		algo, set_algo,
		speed, set_speed,
		time, set_time,
		compact, set_compact,
		selected, set_selected,
		roundBtn,
		current_intervals, set_current_intervals,
	}
	return (<div className='font-mono bg-slate-900 text-slate-300'>
		<Header props={props} />
		<Main props={props} />
		<Footer props={props} />
	</div>)
}
