import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

const DraggableComponent = (props) => {
    const draggableRef = useRef(null);

    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const handleWheel = (event) => {
            // Update the rotation based on the scroll direction
            setRotation((prevRotation) => prevRotation + event.deltaY / 100);
            event.preventDefault(); // Prevent the default scroll behavior
        };

        const handleTouchMove = (event) => {
            // Check if two fingers are used for touch
            if (event.touches.length === 2) {
                const [touch1, touch2] = event.touches;

                // Calculate the angle between the two touches
                const angle = Math.atan2(
                    touch2.clientY - touch1.clientY,
                    touch2.clientX - touch1.clientX
                );

                // Convert radians to degrees and update the rotation
                setRotation((prevRotation) => (angle * 180) / Math.PI);
            }
        };

        // Attach event listeners to the draggable container
        const containerElement = draggableRef.current;
        containerElement.addEventListener('wheel', handleWheel);
        containerElement.addEventListener('touchmove', handleTouchMove);

        // Cleanup: remove event listeners when the component is unmounted
        return () => {
            containerElement.removeEventListener('wheel', handleWheel);
            containerElement.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <Draggable nodeRef={draggableRef}>
            <div className="draggable-container" ref={draggableRef} >
                <div className="draggable-inner" style={{ transform: `rotate(${rotation}deg)` }}>
                    {props.children}
                </div>
            </div>
        </Draggable>
    );
};

export default DraggableComponent;