import { useState, useEffect } from 'react'

//Since input type color takes color value as #rrggbb only and we use a colour scheme of rgb(a, b, c);
//we import functions from utils to convert between the two colour scheme
import { rgbToHex, hexToRGB } from '../../../utils/colourConversions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons';

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

    return (
        <div id="plane-info" className='planeInfoContainer'>
            <div className='planeControlls'>
                <div className="planeColorInput">
                    <input
                        title={hexToRGB(colour)}
                        type="color"
                        value={colour}
                        className='planeColorInput'
                        onChange={e => setColour(e.target.value)}
                    />
                </div>
                <div className='planeHeading'>
                    <p>
                        Plane {props.idx + 1}
                    </p>
                </div>
                <div className='eyeIcon'>
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
            <div className='planeValuesInputs'>
                <p>Equation: </p>
                <input
                    name='x-cooefficient'
                    type="number"
                    value={xCooefficient}
                    onChange={e => setXCooefficient(parseFloat(e.target.value ? e.target.value : 0))}
                />
                <label htmlFor="x-cooefficient">
                    x
                </label>

                <span>+</span>

                <input
                    name='y-cooefficient'
                    type="number"
                    value={yCooefficient}
                    onChange={e => setYCooefficient(parseFloat(e.target.value ? e.target.value : 0))}
                />
                <label htmlFor="y-cooefficient">
                    y
                </label>

                <span>+</span>

                <input
                    name='z-cooefficient'
                    type="number"
                    value={zCooefficient}
                    onChange={e => setZCooefficient(parseFloat(e.target.value ? e.target.value : 0))}
                />
                <label htmlFor="z-cooefficient">
                    z
                </label>

                <span>=</span>

                <input
                    name='constant'
                    type="number"
                    value={constant}
                    onChange={e => setConstant(parseFloat(e.target.value ? e.target.value : 0))}
                />
            </div>


            <div className="del-btn">
                <FontAwesomeIcon
                    icon={faTrash}
                    title='delete plane'
                    onClick={() => props.handleDeletePlane(props.idx)}
                />
            </div>
        </div>
    )
}

export default GraphInfo