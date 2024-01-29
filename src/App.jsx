import { Routes as Switch, Route } from 'react-router-dom';

import { Header, Home, Quiz } from './components'

import './stylesheets/app.css';

import { useEffect, useRef, useState } from 'react';

import listenForOutsideClicks from './utils/listenForOutsideClicks';

import Tutorial from './components/home/tutorial/Tutorial';
import Protractor from './components/protractor/protractor';

import DraggableComponent from './components/utils/DraggableComponent'
import toast from 'react-hot-toast';

const App = () => {
	// A pop carousel tutorial shows click any where outside or press escape to close it
	const [tutorialActive, setTutorialActive] = useState(!localStorage.getItem('planes')?.length);
	const [listening, setListening] = useState(false);

	const [draggableComponentisMounted, setDraggableComponentIsMounted] = useState(false);

	const tutorialRef = useRef(null);
	const tutorialButtonRef = useRef(null);

	useEffect(() => {
		if(draggableComponentisMounted) {
			toast('Drag the protractor to move.\nScroll over it to rotate.', {icon: 'ℹ️', duration: 6000})
		}
	}, [draggableComponentisMounted])

	useEffect(() => {
		const cleanupFunction = listenForOutsideClicks(listening, setListening, tutorialRef, tutorialButtonRef, tutorialActive, setTutorialActive, 84);
		return cleanupFunction;
	}, [listening, tutorialRef, tutorialButtonRef, tutorialActive, setTutorialActive]);

	return (
		<>
			{
				draggableComponentisMounted &&
				<DraggableComponent children={<Protractor />} />
			}

			{
				(tutorialActive)
					? <div className="grey-BG"></div>
					: <></>
			}
			<div id="tutorialWrapper" className={!tutorialActive ? "hidden" : ""} ref={tutorialRef}>
				<Tutorial tutorialActive={tutorialActive} setTutorialActive={setTutorialActive} />
			</div>

			<Header tutorialButtonRef={tutorialButtonRef} setTutorialActive={setTutorialActive} draggableComponentisMounted={draggableComponentisMounted} setDraggableComponentIsMounted={setDraggableComponentIsMounted} />

			<main>
				<Switch>
					<Route exact path='/' Component={Home} />
					<Route exact path='/quiz' Component={Quiz} />
				</Switch>
			</main>
		</>
	)
}

export default App