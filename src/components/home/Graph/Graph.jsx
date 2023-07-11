import Plot from 'react-plotly.js';

const Graph = props => {
    const { data } = props

    return (
        <Plot
            className='plot'
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
                        eye: { x: 1.5, y: -0.9, z: 0.7 },
                    },
                },
                margin: { l: 0, r: 0, b: 0, t: 0 },
                showlegend: true,
            }}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler={true}

            config={{ displaylogo: false, displayModeBar: 'hover', MathJax: true, responsive: true }}
        />
    )
}

export default Graph