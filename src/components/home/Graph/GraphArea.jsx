import { useEffect, useRef, useState } from 'react';
import Graph from './Graph';
import createData from './createData';
import listenForOutsideClicks from '../../../utils/listenForOutsideClicks';
import CalculateAngles from '../tutorial/CalculateAngles';

const GraphArea = props => {
	const { data, angles } = createData(props.planes)

	useEffect(()=>{
		props.setAngleAvailable(typeof angles[0]?.angle === 'number' && !isNaN(angles[0]?.angle))
	}, [angles])

	const [listening, setListening] = useState(false)
	const { calcAnglesPopUpActive, setCalcAnglesPopUpActive, anglesPopUpBttnRef } = props;

	const anglesPopUpRef = useRef(null);

	useEffect(() => {
		const cleanupFunction = listenForOutsideClicks(listening, setListening, anglesPopUpRef, anglesPopUpBttnRef, calcAnglesPopUpActive, setCalcAnglesPopUpActive, 65);
		return cleanupFunction;
	}, [listening, anglesPopUpRef, anglesPopUpBttnRef, calcAnglesPopUpActive, setCalcAnglesPopUpActive]);


	return (
		<div id="graph-area" className={`${!props.panelVisible ? 'graph-area-big' : ''}`}>

			{
				(calcAnglesPopUpActive)
					? <div className="grey-BG"></div>
					: <></>
			}
			<div id="tutorialWrapper" className={!calcAnglesPopUpActive ? "hidden" : ""} ref={anglesPopUpRef}>
				<CalculateAngles angles={angles} angleAvailable={props.angleAvailable} calcAnglesPopUpActive={calcAnglesPopUpActive} setCalcAnglesPopUpActive={setCalcAnglesPopUpActive} />
			</div>

			<div className="angle-list">
				{
					angles.map((angleInfo, index) => (
						<div key={index}>{`Angle between ${angleInfo.plane1} and ${angleInfo.plane2}: ${(angleInfo.angle * 180 / Math.PI)} deg`}</div>
					))
				}
			</div>
			<Graph data={data} panelVisible={props.panelVisible} />
		</div>
	);

}

export default GraphArea;