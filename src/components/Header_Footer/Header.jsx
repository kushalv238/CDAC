import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './../../stylesheets/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appLogo from './../../resources/images/favicon.jpg'

const Header = (props) => {
	return (
		<header>
			<div className="app-title">
				<div className="app-logo">
					<img src={appLogo} />
				</div>
				<p>
					AppName
				</p>
			</div>
			<FontAwesomeIcon id='tutorial-bttn' onClick={() => props.setTutorialActive(true)} icon={faQuestionCircle} title='See Tutorial' ref={props.buttonRef} />
		</header>
	)
}

export default Header