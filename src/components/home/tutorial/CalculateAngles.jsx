import React from 'react'

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import { plane3D, angleBetweenPlanes, cutePup } from './../../../resources'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const CalculateAngles = (props) => {
    const { angles } = props

    const [index, setIndex] = useState(0);
    const [angleInput, setAngleInput] = useState(0);

    function checkAngle(e) {
        e.preventDefault();

        console.log(angles)

        if(!props.angleAvailable) {
            console.log("no angles")
            return;
        }

        console.log(angles[0].angle)

        if (parseFloat(angleInput) === angles[0].angle) {
            console.log("correct")
        } else {
            console.log("wrong")
        }
    }

    useEffect(() => {
        setIndex(0)
    }, [props.calcAnglesPopUpActive])

    return (
        <>
            <Carousel
                activeIndex={index}
                onSelect={(idx) => setIndex(idx)}
                interval={null}
                pause={false}
            >
                <Carousel.Item>
                    <img src={plane3D} alt="3D Plane" className='carouselImg' />
                    <Carousel.Caption>
                        <form onSubmit={checkAngle}>
                            <label htmlFor="angle">Enter angle between Planes 1 and 2: </label>
                            <input type="number" value={angleInput} onChange={e => setAngleInput(e.target.value)} name="angle" id="" />
                            <button type="submit">Submit</button>
                        </form>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={angleBetweenPlanes} alt="angle between planes" className='carouselImg' />
                    <Carousel.Caption>
                        <h3 className='text-success fw-bolder fs-3'>Angle Between Planes</h3>
                        <p className='text-muted fs-6 fw-bold'>The angle between two planes is equal to the angle between their normals.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={cutePup} alt="pup" className='carouselImg' />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div
                className="closeButton flex"
                onClick={() => props.setCalcAnglesPopUpActive(false)}
                title='Close'
            >
                <FontAwesomeIcon icon={faX} />
            </div>

            <p id='tut-caption'>Press 'a' to see this pop-up agin</p>

        </>
    );
}

export default CalculateAngles