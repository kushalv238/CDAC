import { useState, useEffect, useRef } from 'react';

import GraphArea from './Graph/GraphArea';
import SidePanel from './Side/SidePanel';

import Plane from './Graph/Plane';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import listenForOutsideClicks from '../../utils/listenForOutsideClicks';

import './../../stylesheets/home.css';
import Tutorial from './tutorial/Tutorial';

const Home = () => {
	const [planes, setPlanes] = useState(
		localStorage.getItem('planes')
			?
				JSON.parse(localStorage.getItem('planes')).map((plane, index) => {
					return new Plane([plane.a, plane.b, plane.c, plane.d], plane.colour);
				})
			:
				[]
	);

	// A pop carousel tutorial shows click any where outside or press escape to close it
	const [tutorialActive, setTutorialActive] = useState(!planes?.length);
	const [listening, setListening] 		  = useState(false);

	const menuRef = useRef(null);
	const buttonRef = useRef(null);
	useEffect(()=>listenForOutsideClicks(listening, setListening, menuRef, buttonRef, tutorialActive, setTutorialActive), []);


	useEffect(() => {
		const planesInfo = planes.map((plane, index) => {
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
			{
				tutorialActive &&
					<div className="grey-BG">
						
					</div>
			}
			
			<div id="tutorialWrapper" className={!tutorialActive ? "hidden" : ""} ref={menuRef}>
				<Tutorial tutorialActive={tutorialActive} setTutorialActive={setTutorialActive} />
			</div>

			<SidePanel planes={planes} setPlanes={setPlanes} setTutorialActive={setTutorialActive} buttonRef={buttonRef} />
			<GraphArea planes={planes} />
		</div>
	)
}

export default Home