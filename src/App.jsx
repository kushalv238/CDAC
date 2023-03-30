import { Routes as Switch, Route } from 'react-router-dom';

import { Header, Home, Quiz, Footer } from './components'
import './stylesheets/app.css';

const App = () => {
	return (
		<>
			<Header />
			<div id="header-holder"></div>
			<main>
				<Switch>
					<Route exact path='/' Component={ Home } />
					<Route exact path='/quiz' Component={ Quiz } />
				</Switch>
			</main>
			{/* <Footer /> */}
		</>
	)
}

export default App