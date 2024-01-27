import { Routes as Switch, Route } from 'react-router-dom';

import { Header, Home, Quiz, Footer } from './components'
import './stylesheets/app.css';
import { useEffect, useRef, useState } from 'react';
import listenForOutsideClicks from './utils/listenForOutsideClicks';
import Tutorial from './components/home/tutorial/Tutorial';

const App = () => {
	// A pop carousel tutorial shows click any where outside or press escape to close it
	const [tutorialActive, setTutorialActive] = useState(!localStorage.getItem('planes')?.length);
	const [listening, setListening] = useState(false);

	const tutorialRef = useRef(null);
	const buttonRef = useRef(null);

	useEffect(listenForOutsideClicks(listening, setListening, tutorialRef, buttonRef, tutorialActive, setTutorialActive), []);

	return (
		<>
			{
				tutorialActive &&
				<div className="grey-BG"></div>
			}
			<div id="tutorialWrapper" className={!tutorialActive ? "hidden" : ""} ref={tutorialRef}>
				<Tutorial tutorialActive={tutorialActive} setTutorialActive={setTutorialActive} />
			</div>

			<Header buttonRef={buttonRef} setTutorialActive={setTutorialActive} />

			<main>
				<Switch>
					<Route exact path='/' Component={Home} />
					<Route exact path='/quiz' Component={Quiz} />
				</Switch>
			</main>
			{/* <Footer /> */}
		</>
	)
}

export default App