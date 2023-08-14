import { useState, useEffect } from 'react'

//Since input type color takes color value as #rrggbb only and we use a colour scheme of rgb(a, b, c);
//we import functions from utils to convert between the two colour scheme
import { rgbToHex, hexToRGB } from '../../../utils/colourConversions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const GraphInfo = (props) => {
    const plane = props.plane
    const coefficient = plane.coordinates;

    //Get and set plane properties
    const [xCooefficient, setXCooefficient] = useState(coefficient.a);
    const [yCooefficient, setYCooefficient] = useState(coefficient.b);
    const [zCooefficient, setZCooefficient] = useState(coefficient.c);
    const [constant, setConstant] = useState(coefficient.d);
    const [colour, setColour] = useState(rgbToHex(plane.colour.colour));
    const [isVisible, setIsVisible] = useState({ plane: !props.hidePlanes && plane.visibility.plane, normal: !props.hideNormals && plane.visibility.normal })

    useEffect(() => {
        props.handleInputChange(props.idx, { a: xCooefficient, b: yCooefficient, c: zCooefficient, d: constant }, hexToRGB(colour), isVisible);
    }, [xCooefficient, yCooefficient, zCooefficient, constant, colour, isVisible])

    useEffect(() => {
        setIsVisible({ plane: !props.hidePlanes, normal: !props.hideNormals })
    }, [props.hidePlanes, props.hideNormals])
    
    useEffect(() => {
        setXCooefficient(coefficient.a)
        setYCooefficient(coefficient.b)
        setZCooefficient(coefficient.c)
        setConstant(coefficient.d)
        setColour(rgbToHex(plane.colour.colour))
        setIsVisible({ plane: !props.hidePlanes && plane.visibility.plane, normal: !props.hideNormals && plane.visibility.normal })
    }, [props.plane])

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
        btn: {
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "0.8rem",
            cursor: "pointer"
        },
        delBtn: {
            backgroundColor: "red"
        },
        flex: {
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between"
        },
        eyeIcon: {
            display: "flex",
            width: "40%",
            justifyContent: "space-between",
        }
    }

    return (
        <div id="plane-info" style={tempStyling.planeInfoContainer}>
            <div style={{ ...tempStyling.flex, width: "60%" }}>
                <h3 style={tempStyling.planeHeading}>Plane {props.idx + 1}</h3>
                <div style={tempStyling.eyeIcon}>
                    <FontAwesomeIcon
                        title='toggle plane visibility'
                        onClick={() => { setIsVisible({ plane: !isVisible.plane, normal: isVisible.normal }) }}
                        icon={isVisible.plane ? faEye : faEyeSlash}
                        style={{ cursor: "pointer", color: isVisible.plane ? "green" : "red" }}
                    />
                    <FontAwesomeIcon
                        title='toggle normal visibility'
                        onClick={() => { setIsVisible({ plane: isVisible.plane, normal: !isVisible.normal }) }}
                        icon={isVisible.normal ? faEye : faEyeSlash}
                        style={{ cursor: "pointer", color: isVisible.normal ? "green" : "red" }}
                    />
                </div>
            </div>
            <input
                title={hexToRGB(colour)}
                type="color"
                value={colour}
                onChange={e => setColour(e.target.value)}
            />
            <div>
                <label htmlFor="x-cooefficient">
                    x-cooefficient:
                </label>
                <input
                    name='x-cooefficient'
                    type="number"
                    value={xCooefficient}
                    onChange={e => setXCooefficient(parseFloat(e.target.value ? e.target.value : 0))}
                />

                <br />

                <label htmlFor="y-cooefficient">
                    y-cooefficient:
                </label>
                <input
                    name='y-cooefficient'
                    type="number"
                    value={yCooefficient}
                    onChange={e => setYCooefficient(parseFloat(e.target.value ? e.target.value : 0))}
                />

                <br />

                <label htmlFor="z-cooefficient">
                    z-cooefficient:
                </label>
                <input
                    name='z-cooefficient'
                    type="number"
                    value={zCooefficient}
                    onChange={e => setZCooefficient(parseFloat(e.target.value ? e.target.value : 0))}
                />

                <br />

                <label htmlFor="constant">
                    Constant:
                </label>
                <input
                    name='constant'
                    type="number"
                    value={constant}
                    onChange={e => setConstant(parseFloat(e.target.value ? e.target.value : 0))}
                />
            </div>

            <span>Equation:</span>
            <span style={tempStyling.planeEquation}>{xCooefficient}x + {yCooefficient}y + {zCooefficient}z = {constant}</span>

            <span>
                <h4>Coefficients:</h4>
                <p>a: {coefficient.a}</p>
                <p>b: {coefficient.b}</p>
                <p>c: {coefficient.c}</p>
                <p>d: {coefficient.d}</p>
            </span>

            <button
                style={{ ...tempStyling.btn, ...tempStyling.delBtn }}
                onClick={() => props.handleDeletePlane(props.idx)}
            >
                Delete
            </button>
        </div>
    )
}

export default GraphInfo