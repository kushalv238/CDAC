import React from 'react';
import Plot from 'react-plotly.js';
import * as math from 'mathjs';

import { useState } from 'react';

class GraphArea extends React.Component {
	// const [scale, setscale] = useState([])

	state = {
		colors: []
	}

	updateColor = (newColor) => {
		this.setState(prev => (
			{
				colors: [...prev.colors, newColor]
			}
		))
	}

	setColor = (colors) => {
		this.setState(
			{
				colors: colors
			}
		)
	}

	shouldComponentUpdate(nextProps) {
		// Prevent re-rendering when planes prop is updated
		return this.props.planes !== nextProps.planes;
	}

	calculateAngle(plane1, plane2) {
		const plane1Coordinates = plane1.coordinates;
		const plane2Coordinates = plane2.coordinates;


		const normal1 = [plane1Coordinates.a, plane1Coordinates.b, plane1Coordinates.c];
		const normal2 = [plane2Coordinates.a, plane2Coordinates.b, plane2Coordinates.c];

		const dotProduct = math.dot(normal1, normal2);

		const magnitudes = math.norm(normal1) * math.norm(normal2);

		// Calculate the angle between the two planes
		const angleRad = math.acos(dotProduct / magnitudes);
		const angleDeg = math.unit(angleRad, 'rad').to('deg');

		return angleDeg;
	}

	calculateAllAngles(planes) {
		const angles = [];
		for (let i = 0; i < planes.length; i++) {
			for (let j = i + 1; j < planes.length; j++) {
				const angle = this.calculateAngle(planes[i], planes[j]);
				const angleInfo = {
					angle,
					plane1: `Plane ${i + 1}`,
					plane2: `Plane ${j + 1}`,
				};
				angles.push(angleInfo);
			}
		}
		return angles;
	}
	
	render() {
		// ax + by + cz = d
		const { planes } = this.props;

		const createUnitNormalVector = (a, b, c) => {
			const magnitude = Math.sqrt(a * a + b * b + c * c);
			return [a / magnitude, b / magnitude, c / magnitude];
		};

		function getRandomColor() {
			return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
		}

		function calculateCrossProduct(vector1, vector2) {
			const result = [];
			result[0] = vector1[1] * vector2[2] - vector1[2] * vector2[1];
			result[1] = vector1[2] * vector2[0] - vector1[0] * vector2[2];
			result[2] = vector1[0] * vector2[1] - vector1[1] * vector2[0];
			return result;
		}

		function calculatePlaneIntersection(a1, b1, c1, d1, a2, b2, c2, d2) {
			const crossProduct = calculateCrossProduct([a1, b1, c1], [a2, b2, c2]);

			if (crossProduct === [0, 0, 0]) return [];

			const intersectionPoint = [
				(d1 * b2 - d2 * b1) / (a1 * b2 - a2 * b1),
				(-d1 * a2 + d2 * a1) / (a1 * b2 - a2 * b1),
				0
			];

			return intersectionPoint;
		}

		const datatemp = [];

		const data = planes.map((plane, index) => {
			const { a, b, c, d } = plane.coordinates;
			// const z = [[(d - a * 0 - b * 0) / c, (d - a * 1 - b * 0) / c], [(d - a * 0 - b * 1) / c, (d - a * 1 - b * 1) / c]]
			const z = [
				[(d - a * -1 - b * -1) / c, (d - a * -1 - b * 1) / c],
				[(d - a * 1 - b * -1) / c, (d - a * 1 - b * 1) / c]
			];

			this.updateColor(getRandomColor());

			return {
				name: `Plane ${index + 1}`,
				type: 'surface',

				x: [[-1, -1], [1, 1]],
				y: [[-1, 1], [-1, 1]],
				z: z,

				colorscale: [
					[0, this.state.colors[index]],
					[1, this.state.colors[index]],
				],
				showscale: false,
			}
		})

		planes.forEach((plane1, index1) => {
			const { a: a1, b: b1, c: c1, d: d1 } = plane1.coordinates;

			const vector1 = [1, 0, (d1 - a1) / c1];
			const vector2 = [0, 1, (d1 - b1) / c1];
			const crossProduct = calculateCrossProduct(vector1, vector2)

			const offset = [1, 1, 1]; // Adjust the offset as needed
			const sidePoint1 = [
				offset[0] - crossProduct[0],
				offset[1] - crossProduct[1],
				offset[2] - crossProduct[2],
			];
			const sidePoint2 = [
				offset[0] + crossProduct[0],
				offset[1] + crossProduct[1],
				offset[2] + crossProduct[2],
			];

			data.push({
				name: `Normal ${index1 + 1}`,
				type: 'scatter3d',
				x: [sidePoint1[0], sidePoint2[0]],
				y: [sidePoint1[1], sidePoint2[1]],
				z: [sidePoint1[2], sidePoint2[2]],
				mode: 'lines',
				line: { color: this.state.colors[index1], width: 5 },
			});
		});

		// Calculate angles for each pair of planes
		const angles = this.calculateAllAngles(planes);

		// console.log(data);
		// console.log(this.props.colors);


		return (
			<div id="graph-area">
				<div className="angle-list">
					{
						angles.map((angleInfo, index) => (
							<div key={index}>{`Angle between ${angleInfo.plane1} and ${angleInfo.plane2}: ${angleInfo.angle}`}</div>
						))
					}
				</div>
				<Plot
					data={data}
					layout={{
						scene: {
							xaxis: {
								title: 'X',
								backgroundcolor: "rgb(200, 200, 230)",
								showbackground: true,
								zerolinecolor: "rgb(0, 0, 0)",
							},
							yaxis: {
								title: 'Y',
								backgroundcolor: "rgb(230, 200, 230)",
								showbackground: true,
								zerolinecolor: "rgb(0, 0, 0)",
							},
							zaxis: {
								title: 'Z',
								backgroundcolor: "rgb(230, 230, 200)",
								showbackground: true,
								zerolinecolor: "rgb(0, 0, 0)",
							},

							annotations: [
								{
									text: `Angle: ${60}°`,
									x: 0.5,
									y: 0,
									z: 1.5,
									showarrow: true
								}
							],
							aspectratio: { x: 1, y: 1, z: 1 },
							camera: {
								eye: { x: -1.5, y: -1.5, z: 0.5 },
							},

						},


						margin: { l: 0, r: 0, b: 0, t: 0 },
						showlegend: true,
					}}
					style={{ width: '100%', height: '100%' }}
					useResizeHandler={true}

					config={{ displaylogo: false, displayModeBar: 'hover', MathJax: true, responsive: true }}
				/>
			</div>
		);
	}
}

export default GraphArea;


// [
//   {
//     type: 'surface',
//     x: [[0, 1], [0, 1]],
//     y: [[0, 0], [1, 1]],
//     z: [[(d - a * 0 - b * 0) / c, (d - a * 1 - b * 0) / c], [(d - a * 0 - b * 1) / c, (d - a * 1 - b * 1) / c]],
//     opacity: 0.8,
//     colorscale: 'Viridis',
//   },
//   {
//     type: 'scatter3d',
//     x: [sidePoint1[0], sidePoint2[0]],
//     y: [sidePoint1[1], sidePoint2[1]],
//     z: [sidePoint1[2], sidePoint2[2]],
//     mode: 'lines',
//     line: { color: 'red', width: 5 },
//   },
// ]