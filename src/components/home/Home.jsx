import { useState } from 'react';

import GraphArea from './Graph/GraphArea';
import PlaneEquationForm from './Side/SidePanel';

import './../../stylesheets/home.css';

const Home = () => {
	const [planes, setPlanes] = useState([]);
	
	return (
		<div id='home'>
			<PlaneEquationForm planes={planes} setPlanes={setPlanes} />
			<GraphArea planes={planes} />
		</div>
	)
}

export default Home