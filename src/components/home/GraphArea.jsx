import React from 'react';
import Plot from 'react-plotly.js';
import * as math from 'mathjs';

class GraphArea extends React.Component {
  render() {
    const x = math.range(-5, 5, 0.5).toArray();
    const y = math.range(-5, 5, 0.5).toArray();

    // evaluate the function z = x + y for each x and y value
    var z = x.map((xi) =>
      y.map((yi) => {
        const zi = xi + yi;
        return zi;
      })
    );

    // create a surface plot of the function
    var trace1 = {
      type: 'surface',
      x: x,
      y: y,
      z: z,
      colorscale: 'Virdis',
    };

    // evaluate the function z = 7x + 3y for each x and y value
    var z2 = x.map((xi) =>
      y.map((yi) => {
        const zi = 7*xi + 3*yi;
        return zi;
      })
    );

    var trace2 = {
      type: 'surface',
      x: x,
      y: y,
      z: z2,
      colorscale: 'blues',
    };

    return (
      <Plot
        data={[trace1, trace2]}
        layout={{
          scene: {
            camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } },
            xaxis: { title: 'X' },
            yaxis: { title: 'Y' },
            zaxis: { title: 'Z' },
          },
          margin: { l: 0, r: 0, b: 0, t: 0 },
        }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    );
  }
}

export default GraphArea;
