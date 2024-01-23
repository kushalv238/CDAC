import React from 'react'

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import { plane3D, angleBetweenPlanes, cutePup } from './../../../resources'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faX } from '@fortawesome/free-solid-svg-icons';

const Tutorial = (props) => {
    const [index, setIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(true);

    useEffect(() => {
        setIndex(0)
        setIsSliding(true)
    }, [props.tutorialActive])

    return (
        <>
            <Carousel
                activeIndex={index}
                onSelect={(idx) => setIndex(idx)}
                interval={isSliding ? 5000 : null}
                pause={false}
            >
                <Carousel.Item>
                    <img src={plane3D} alt="3D Plane" className='carouselImg' />
                    <Carousel.Caption>
                        <h3 className='text-success fw-bolder fs-3'>3D Plane</h3>
                        <p className='text-muted fs-6 fw-bold'>A plane in 3D coordinate space is a flat surface that extends indefinitely containing a vector that is perpendicular to the plane called as the normal.</p>
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
                onClick={() => props.setTutorialActive(false)}
                title='Close'
            >
                <FontAwesomeIcon icon={faX} />
            </div>

            <div
                className="playPauseButton flex"
                onClick={() => setIsSliding(prev=>!prev)}
                title={isSliding ? "Pause" : "Play"}
            >
                <FontAwesomeIcon icon={isSliding ? faPause : faPlay} />
            </div>

            <p id='tut-caption'>Press 't' to see this tutorial agin</p>

        </>
    );
}

export default Tutorial