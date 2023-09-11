import { useState } from 'react';

import GraphInfo from './GraphInfo';
import Plane from '../Graph/Plane';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

const SidePanel = ({ planes, setPlanes, panelVisible, setPanelVisible, panelRef, panelButtonRef }) => {
	const [instructionClicked, setInstructionClicked] = useState(planes?.length ? true : false);
	const [hidePlanes, setHidePlanes] = useState(false);
	const [hideNormals, setHideNormals] = useState(false);

	const handleAddPlane = () => {
		setPlanes([...planes, new Plane([0, 0, 0, 0])]);

		setInstructionClicked(true);
	};

	const handleDeletePlane = (planeIndex) => {
		const updatedPlanes = planes.filter((_, index) => index !== planeIndex);
		setPlanes(updatedPlanes);

		setInstructionClicked(updatedPlanes?.length ? true : false);
	};

	const handleInputChange = (planeIndex, coordinates, colour, visibility) => {
		const updatedPlanes = [...planes];

		updatedPlanes[planeIndex].coordinates = coordinates;
		updatedPlanes[planeIndex].colour = colour;
		updatedPlanes[planeIndex].visibility = visibility;

		setPlanes(updatedPlanes);
	};

	//TODO: Remove this on deployment
	//For debuggin purpose only
	// useEffect(() => {
	// 	console.log(planes)
	// }, [planes])

	return (

		<div id="side-panel" className={`${!panelVisible ? 'side-panel-small' : ''}`} style={{ padding: "0.4rem" }} ref={panelRef}>

			<div
				id="panel-toggle-btn"
				title={panelVisible ? 'hide panel' : 'show panel'}
				onClick={() => setPanelVisible(prev => !prev)}
				ref={panelButtonRef}
			>
				<FontAwesomeIcon icon={panelVisible ? faX : faBars} />
			</div>

			<div id="side-panel-options">
				<button className="button" onClick={() => setHidePlanes(prev => !prev)}>{hidePlanes ? 'show' : 'hide'} all planes</button>
				<button onClick={() => setHideNormals(prev => !prev)}>{hideNormals ? 'show' : 'hide'} all normals</button>
			</div>
			{
				planes?.length ?
					<div id="graph-details-wrapper">
						{
							planes.map(
								(plane, index) => (
									<GraphInfo
										key={index}
										idx={index}
										plane={plane}
										hidePlanes={hidePlanes}
										hideNormals={hideNormals}
										handleDeletePlane={handleDeletePlane}
										handleInputChange={handleInputChange}
									/>
								)
							)
						}
					</div>
					: <></>
			}

			<div className='flex justify-content-start gap-3' id='add-plane-bttn-wrapper'>
				<button
					onClick={handleAddPlane}
					id='add-plane-bttn'
					style={{
						color: "white",
						padding: "10px 15px",
						border: "none",
						borderRadius: "0.8rem",
						backgroundColor: "green",
						cursor: "pointer"
					}}
				>Add Plane</button>
				{
					!instructionClicked &&
					<div className="instruction">
						<div className="triangle-left"></div>
						<div className="instruction-text">
							Click to add a plane
						</div>
					</div>
				}
			</div>
		</div>
	);
}

export default SidePanel;