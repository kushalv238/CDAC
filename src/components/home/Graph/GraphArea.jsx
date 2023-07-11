import Graph from './Graph';
import createData from './createData';

const GraphArea = props => {
	const { data, angles } = createData(props.planes)

	return (
		<div id="graph-area">
			<div className="angle-list">
				{
					angles.map((angleInfo, index) => (
						<div key={index}>{`Angle between ${angleInfo.plane1} and ${angleInfo.plane2}: ${angleInfo.angle}`}</div>
					))
				}
			</div>
			<Graph data={data} />
		</div>
	);

}

export default GraphArea;