import React from 'react'

import { useState, useEffect } from 'react'

const GraphInfo = (props) => {
    const[xCooefficient, setXCooefficient] = useState(0);
    const[yCooefficient, setYCooefficient] = useState(0);
    const[zCooefficient, setZCooefficient] = useState(0);
    const[constant, setConstant] = useState(0);

    useEffect(() => {
        props.handleInputChange(props.idx, {a: xCooefficient, b: yCooefficient, c: zCooefficient, d: constant});
    }, [xCooefficient, yCooefficient, zCooefficient, constant])

    const coefficient = props.plane.coordinates;
    
    const tempStyling = {
        planeInfoContainer: {
            margin: props.idx === 0 ? "0 0 1rem 0" : "1rem 0"
        },
        planeHeading: {
            fontSize: "1.5rem"
        },
        planeEquation: {
            fontSize: "1.2rem",
            fontWeight: 600
        },
        my2: {
            margin: "2rem 0"
        },
        btn: {
            color: "black",
            padding: "10px 15px",
            border: "none",
            borderRadius: "0.8rem" 
        },
        delBtn: {
            backgroudColor: "red"
        },
        addBtn: {
            backgroudColor: "green"
        }
        
    }

    return (
        <div id="plane-info" style={tempStyling.planeInfoContainer}>
            <h3 style={tempStyling.planeHeading}>Plane {props.idx + 1}</h3>
            <div>
                <label htmlFor="x-cooefficient">
                    x-cooefficient: 
                </label>
                <input
                    name='x-cooefficient'
                    type="number"
                    value={xCooefficient}
                    onChange={(e) => setXCooefficient(parseInt(e.target.value))}
                />

                <br />

                <label htmlFor="y-cooefficient">
                    y-cooefficient:
                </label>
                <input
                    name='y-cooefficient'
                    type="number"
                    value={yCooefficient}
                    onChange={(e) => setYCooefficient(parseInt(e.target.value))}
                />

                <br />
                
                <label htmlFor="z-cooefficient">
                    z-cooefficient:
                </label>
                <input
                    name='z-cooefficient'
                    type="number"
                    value={zCooefficient}
                    onChange={(e) => setZCooefficient(parseInt(e.target.value))}
                />

                <br />

                <label htmlFor="constant">
                    Constant: 
                </label>
                <input
                    name='constant'
                    type="number"
                    value={constant}
                    onChange={(e) => setConstant(parseInt(e.target.value))}
                />
            </div>

            <span>Equation:</span> 
            <span style={tempStyling.planeEquation}>{xCooefficient}x + {yCooefficient}y + {zCooefficient}z = {constant}</span>
            
            <span style={tempStyling.my2}>
                <h4>Coefficients:</h4>
                <p>a: {coefficient.a}</p>
                <p>b: {coefficient.b}</p>
                <p>c: {coefficient.c}</p>
                <p>d: {coefficient.d}</p>
            </span>

            <button
                style={{...tempStyling.btn, ...tempStyling.delBtn}}
                onClick={() => props.handleDeletePlane(props.idx)}
            >
                Delete
            </button>
        </div>
    )
}

export default GraphInfo