import { Routes as Switch, Route } from 'react-router-dom';

import { Header, Home, Temp, Quiz, Footer } from './components'
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
					<Route exact path='/temp' Component={ Temp } />
				</Switch>
			</main>
			{/* <Footer /> */}
		</>
	)
}

export default App