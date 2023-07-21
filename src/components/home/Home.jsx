import { useState, useEffect } from 'react';

import GraphArea from './Graph/GraphArea';
import SidePanel from './Side/SidePanel';

import Plane from './Graph/Plane';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './../../stylesheets/home.css';

const Home = () => {
	const [planes, setPlanes] = useState(
		localStorage.getItem('planes')
		?
			JSON.parse(localStorage.getItem('planes')).map((plane, index)=>{
				return new Plane([plane.a, plane.b, plane.c, plane.d], plane.colour);
			})
		: 
			[]
	);
	
	useEffect(()=> {
		const planesInfo = planes.map((plane, index)=>{
			const { a, b, c, d } = plane.coordinates;
			const { colour } = plane.colour

			return {
				a: a,
				b: b,
				c: c,
				d: d,
				colour: colour
			}
		});
		localStorage.setItem('planes', JSON.stringify(planesInfo));
	}, [planes])

	return (
		<div id='home'>
			<SidePanel planes={planes} setPlanes={setPlanes} />
			<GraphArea planes={planes} />
		</div>
	)
}

export default Home