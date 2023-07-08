import GraphArea from './GraphArea';
import React, { useState } from 'react';

import './../../stylesheets/home.css';
import PlaneEquationForm from './SidePanel';

const Home = () => {
	const [planes, setPlanes] = useState([]);
	// console.log(planes)
	const [colors, setColors] = useState([]);
	return (
		<div id='home'>
			<PlaneEquationForm planes={planes} setPlanes={setPlanes} />
			<GraphArea planes={planes} colors={colors} setColors={setColors} />
		</div>
	)
}

export default Home