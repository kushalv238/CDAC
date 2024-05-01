import { Routes as Switch, Route } from 'react-router-dom';

import { Home, Quiz } from './components'

import './stylesheets/app.css';

const App = () => {
	return (
		<>
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