import Plot from 'react-plotly.js';
import { useState } from 'react';
import * as math from 'mathjs';


const Temp = () => {
    const [plane1, setPlane1] = useState({
        normal: [1, 0, 0],
        origin: [0, 0, 0],
    });
    const [plane2, setPlane2] = useState({
        normal: [0, 1, 0],
        origin: [0, 0, 0],
    });

    const angle = math.acos(math.dot(plane1.normal, plane2.normal));

    const rotatedPlane2 = {
        normal: math.rotate(plane2.normal, angle),
        origin: plane2.origin,
    };

    return (
        <div>
            <Plot
                width={400}
                height={400}
                data={[
                    {
                        type: "surface",
                        x: [-1, 1],
                        y: [-1, 1],
                        z: (x, y) => math.sqrt(x * x + y * y),
                    },
                    {
                        type: "plane",
                        normal: plane1.normal,
                        origin: plane1.origin,
                    },
                    {
                        type: "plane",
                        normal: rotatedPlane2.normal,
                        origin: rotatedPlane2.origin,
                    },
                ]}
                layout={{
                    title: "Two Planes",
                }}
            />
        </div>
    );
};

export default Temp