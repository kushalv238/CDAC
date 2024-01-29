import { faMagnifyingGlass, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './../../stylesheets/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appLogo from './../../resources/images/favicon.jpg'

const Header = (props) => {
	return (
		<header>
			<div className="app-title">
				<div className="app-logo">
					<img src={appLogo} alt='App Logo' title='AppName' />
				</div>
				<p>
					AppName
				</p>
			</div>

			<div id="tutorial-bttn">
				<FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => props.setDraggableComponentIsMounted((prev) => !prev)} title='toggle protractor' />
				<FontAwesomeIcon onClick={() => props.setTutorialActive(true)} icon={faQuestionCircle} title='See Tutorial' ref={props.tutorialButtonRef} />
			</div>

		</header>
	)
}

export default Header