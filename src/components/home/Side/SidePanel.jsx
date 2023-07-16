import GraphInfo from './GraphInfo';

import Plane from '../Graph/Plane';

import { getRandomColour } from '../../../utils/getRandoms';

const SidePanel = ({ planes, setPlanes }) => {
	const handleAddPlane = () => {
		setPlanes([...planes, new Plane([0, 0, 0, 0])]);
	};
	
	const handleDeletePlane = (planeIndex) => {
		const updatedPlanes = planes.filter((_, index) => index !== planeIndex);
		setPlanes(updatedPlanes);
	};
	
	const handleInputChange = (planeIndex, coordinates, colour) => {		
		const updatedPlanes = [...planes];
		
		updatedPlanes[planeIndex].coordinates = coordinates;
		updatedPlanes[planeIndex].colour = colour;

		setPlanes(updatedPlanes);
	};

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