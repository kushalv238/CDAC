import React from 'react';
import Plot from 'react-plotly.js';
import * as math from 'mathjs';

class GraphArea extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Prevent re-rendering when planes prop is updated
    return this.props.planes !== nextProps.planes;
  }

  calculateAngle(plane1, plane2) {
    const normal1 = [plane1.coefficients.a, plane1.coefficients.b, plane1.coefficients.c];
    const normal2 = [plane2.coefficients.a, plane2.coefficients.b, plane2.coefficients.c];

    const dotProduct = math.dot(normal1, normal2);
    const magnitudes = math.norm(normal1) * math.norm(normal2);

    // Calculate the angle between the two planes
    const angleRad = Math.acos(dotProduct / magnitudes);
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
    const x = math.range(-5, 5, 0.5).toArray();
    const y = math.range(-5, 5, 0.5).toArray();

    const { planes } = this.props;

    const colors = [
      'rgb(230, 168, 215)',
      'rgb(174, 198, 207)',
      'rgb(223, 223, 188)',
      'rgb(215, 187, 214)',
      'rgb(187, 222, 214)',
      'rgb(202, 234, 181)',
      'rgb(233, 205, 163)',
    ];

    const data = planes.map((plane, index) => {
      const { a, b, c, d } = plane.coefficients;

      // evaluate the function z = ax + by + cz + d for each x and y value
      const z = x.map((xi) =>
        y.map((yi) => {
          const zi = a * xi + b * yi + c * xi + d;
          return zi;
        })
      );

      const colorScale = [
        [0, colors[index % colors.length]],
        [1, colors[index % colors.length]],
      ];

      return {
        type: 'surface',
        x: x,
        y: y,
        z: z,
        colorscale: colorScale,
        showscale: false,
        name: `Plane ${index + 1}`,
      };
    });

    // Calculate angles for each pair of planes
    const angles = this.calculateAllAngles(planes);

    return (
      <div id="graph-area">
        <div className="angle-list">
          {angles.map((angleInfo, index) => (
            <div key={index}>{`Angle between ${angleInfo.plane1} and ${angleInfo.plane2}: ${angleInfo.angle}`}</div>
          ))}
        </div>
        <Plot
          data={data}
          layout={{
            scene: {
              xaxis: { title: 'X' },
              yaxis: { title: 'Y' },
              zaxis: { title: 'Z' },
            },

            margin: { l: 0, r: 0, b: 0, t: 0 },
            showlegend: true,
          }}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
          config={{ displaylogo: false, displayModeBar: 'hover', MathJax: true }}
        />
      </div>
    );
  }
}

export default GraphArea;
