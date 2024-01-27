import { useState, useEffect, useRef } from 'react';

import GraphArea from './Graph/GraphArea';
import SidePanel from './Side/SidePanel';

import Plane from './Graph/Plane';

import './../../stylesheets/home.css';

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

	const panelRef = useRef(null);
	const panelButtonRef = useRef(null);
	// useEffect(listenForOutsideClicks(listening, setListening, panelRef, panelButtonRef, panelVisible, setPanelVisible));

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
			<SidePanel planes={planes} setPlanes={setPlanes} panelVisible={panelVisible} setPanelVisible={setPanelVisible} panelRef={panelRef} panelButtonRef={panelButtonRef} />
			<GraphArea planes={planes} panelVisible={panelVisible} />
		</div>
	)
}

export default Home