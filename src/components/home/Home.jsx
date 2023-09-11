import { useState, useEffect, useRef } from 'react';

import GraphArea from './Graph/GraphArea';
import SidePanel from './Side/SidePanel';

import Plane from './Graph/Plane';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import listenForOutsideClicks from '../../utils/listenForOutsideClicks';

import './../../stylesheets/home.css';
import Tutorial from './tutorial/Tutorial';

const Home = () => {
	const userSettings = JSON.parse(localStorage.getItem('user-settings'))

	const [panelVisible, setPanelVisible] = useState(userSettings ? userSettings.panelVisible : true)

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
	const [listening, setListening] = useState(false);

	const tutorialRef = useRef(null);
	const buttonRef = useRef(null);
	useEffect(listenForOutsideClicks(listening, setListening, tutorialRef, buttonRef, tutorialActive, setTutorialActive));
	
	const panelRef = useRef(null);
	const panelButtonRef = useRef(null);
	useEffect(listenForOutsideClicks(listening, setListening, panelRef, panelButtonRef, panelVisible, setPanelVisible));

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

	useEffect(() => {
		const newSetting = { ...userSettings }
		newSetting.panelVisible = panelVisible

		localStorage.setItem('user-settings', JSON.stringify(newSetting))
	}, [panelVisible])

	return (
		<div id='home'>
			<FontAwesomeIcon id='tutorial-bttn' onClick={() => setTutorialActive(true)} icon={faQuestionCircle} title='See Tutorial' ref={buttonRef} />

			{
				tutorialActive &&
				<div className="grey-BG"></div>
			}

			<div id="tutorialWrapper" className={!tutorialActive ? "hidden" : ""} ref={tutorialRef}>
				<Tutorial tutorialActive={tutorialActive} setTutorialActive={setTutorialActive} />
			</div>

			<SidePanel planes={planes} setPlanes={setPlanes} panelVisible={panelVisible} setPanelVisible={setPanelVisible} panelRef={panelRef} panelButtonRef={panelButtonRef} />
			<GraphArea planes={planes} panelVisible={panelVisible} />
		</div>
	)
}

export default Home