import GraphArea from './GraphArea';
import React, { useState } from 'react';

import './../../stylesheets/home.css';
import PlaneEquationForm from './SidePanel';

const Home = () => {
	const [planes, setPlanes] = useState([]);
	return (
		<div id='home'>
			<PlaneEquationForm setPlanes={setPlanes} />
			<GraphArea planes={planes} />
		</div>
	)
}

export default Home