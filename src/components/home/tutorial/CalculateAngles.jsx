import React from 'react'

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import { quizImg, cutePup } from './../../../resources'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const CalculateAngles = (props) => {
    const { angles } = props

    const [index, setIndex] = useState(0);
    const [angleInput, setAngleInput] = useState(0);

    function checkAngle(e) {
        e.preventDefault();

        if (!props.angleAvailable) {
            toast("No valid angles")
            return;
        }

        // allowing an an error of 0.5
        if (Math.abs(parseFloat(angleInput).toFixed(4) - (angles[0].angle / Math.PI * 180).toFixed(4)) <= 0.5) {
            toast.success("Correct!")
        } else {
            toast.error("Wrong")
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
                <Carousel.Item className='bg-light'>
                    <img src={quizImg} alt="Quiz time" className='carouselImg' />
                    <Carousel.Caption>
                        <form onSubmit={checkAngle} className='check-angle-form'>
                            <label htmlFor="angle">Enter angle between Planes 1 and 2: </label>
                            <input type="number" value={angleInput} onChange={e => setAngleInput(e.target.value)} name="angle" id="" />
                            <button type="submit">Submit</button>
                        </form>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="box">
                        <div className="inner-box">
                            <h3 className='text-success fw-bolder fs-1 w-100 text-center'>Angle List</h3>
                            <ul className="angle-list">
                                {
                                    angles.map((angleInfo, index) => (
                                        <li key={index}>{`Angle between ${angleInfo.plane1} and ${angleInfo.plane2}: ${(angleInfo.angle * 180 / Math.PI).toFixed(3)} deg`}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <Carousel.Caption>
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

        </>
    );
}

export default CalculateAngles