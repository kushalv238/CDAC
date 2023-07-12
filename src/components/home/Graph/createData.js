import {
    calculateCrossProduct,
    calculatePlaneIntersection,
    calculateAllAngles,
} from './graphUtilityFunctions'

const offset = [1, 1, 1]; // Adjust the normal intersection offset as needed

// Creates the plotting data and angles between each normals from the array of Plane objects
function createData(planes) {
    const data = planes.map((plane, index) => {
        const { a, b, c, d } = plane.coordinates;
        const { colour } = plane.colour

        // const z = [
        //     [(d - a * -1 - b * -1) / c, (d - a * -1 - b * 1) / c],
        //     [(d - a * 1 - b * -1) / c, (d - a * 1 - b * 1) / c]
        // ];

        let z;
        if (c !== 0) {
            z = [
                [(d - a * -1 - b * -1) / c, (d - a * -1 - b * 1) / c],
                [(d - a * 1 - b * -1) / c, (d - a * 1 - b * 1) / c]
            ];
        } else {
            // Handle the case when c is zero (plane is parallel to Z-axis)
            z = [
                [d / a, d / a],
                [d / a, d / a]
            ];
        }

        return {
            name: `Plane ${index + 1}`,
            type: 'surface',

            x: [[-1, -1], [1, 1]],
            y: [[-1, 1], [-1, 1]],
            z: z,

            colorscale: [
                [0, colour],
                [1, colour],
            ],
            showscale: false,
        }
    })

    planes.forEach((plane1, index1) => {
        const { a: a1, b: b1, c: c1, d: d1 } = plane1.coordinates;
        const { colour } = plane1.colour

        const vector1 = [1, 0, (-a1) / c1];
        const vector2 = [0, 1, (-b1) / c1];
        const crossProduct = calculateCrossProduct(vector1, vector2)

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
            line: { color: colour, width: 5 },
        });

        planes.forEach((plane2, index2) => {
            if (index1 < index2) {
                const intersectionPoint = calculatePlaneIntersection(plane1, plane2);

                //Early return if there is no intersection point
                if (!intersectionPoint?.length) return;

                // Add trace for the intersection point
                data.push({
                    name: `IP ${index1 + 1} - ${index2 + 1}`,
                    type: 'scatter3d',

                    x: [intersectionPoint[0]],
                    y: [intersectionPoint[1]],
                    z: [intersectionPoint[2]],

                    mode: 'markers',
                    marker: { color: 'red', size: 10 },
                });
            }
        });
    });

    const angles = calculateAllAngles(planes);

    return { data, angles };
}

export default createData;