import { Routes as Switch, Route } from 'react-router-dom';

import { Header, Home, Quiz } from './components'
import './stylesheets/app.css';
import { useEffect, useRef, useState } from 'react';
import listenForOutsideClicks from './utils/listenForOutsideClicks';
import Tutorial from './components/home/tutorial/Tutorial';

const App = () => {
	// A pop carousel tutorial shows click any where outside or press escape to close it
	const [tutorialActive, setTutorialActive] = useState(!localStorage.getItem('planes')?.length);
	const [listening, setListening] = useState(false);

	const tutorialRef = useRef(null);
	const tutorialButtonRef = useRef(null);

	useEffect(() => {
		const cleanupFunction = listenForOutsideClicks(listening, setListening, tutorialRef, tutorialButtonRef, tutorialActive, setTutorialActive, 84);
		return cleanupFunction;
	}, [listening, tutorialRef, tutorialButtonRef, tutorialActive, setTutorialActive]);

	return (
		<>
			{
				(tutorialActive)
					? <div className="grey-BG"></div>
					: <></>
			}
			<div id="tutorialWrapper" className={!tutorialActive ? "hidden" : ""} ref={tutorialRef}>
				<Tutorial tutorialActive={tutorialActive} setTutorialActive={setTutorialActive} />
			</div>

			<Header tutorialButtonRef={tutorialButtonRef} setTutorialActive={setTutorialActive} />

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