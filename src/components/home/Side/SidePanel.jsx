import GraphInfo from './GraphInfo';

import Plane from '../Graph/Plane';

import { useState } from 'react';

import { getRandomColour } from '../../../utils/getRandoms';
import { useEffect } from 'react';

const SidePanel = ({ planes, setPlanes }) => {
	const[instructionClicked, setInstructionClicked] = useState(planes?.length ? true : false);

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

	useEffect(()=>{
		// console.log(planes)
	}, [planes])

	return (
		<div id="side-panel" style={{padding: "0.4rem"}}>
			{
				planes.map(
					(plane, index) => (
						<GraphInfo
							key={index}
							idx={index}
							plane={plane}
							handleDeletePlane={handleDeletePlane}
							handleInputChange={handleInputChange}
						/>
					)
				)
			}
			{
				!instructionClicked &&
				<div className="instruction">
					<div className="triangle"></div>
					<div className="text">
						Click to add a plane
					</div>
				</div>
			}

			
			<div>
				<button
					onClick={handleAddPlane}
					style={{
						color: "white",
						padding: "10px 15px",
						border: "none",
						borderRadius: "0.8rem" ,
						backgroundColor: "green",
						cursor: "pointer"
					}}
				>Add Plane</button>
			</div>
		</div>
	);
}

export default SidePanel;