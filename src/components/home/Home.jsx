import { useState } from 'react';

import GraphArea from './Graph/GraphArea';
import SidePanel from './Side/SidePanel';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './../../stylesheets/home.css';

const Home = () => {
	const [planes, setPlanes] = useState([]);

	return (
		<div id='home'>
			<SidePanel planes={planes} setPlanes={setPlanes} />
			<GraphArea planes={planes} />
		</div>
	)
}

export default Home