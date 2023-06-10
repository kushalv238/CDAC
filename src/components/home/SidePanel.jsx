import React, { useState } from 'react';

function PlaneEquationForm({ setPlanes }) {
  const [planes, setPlanesState] = useState([{ equation: '', coefficients: { a: 0, b: 0, c: 0, d: 0 }, isValid: true }]);

  const handleAddPlane = () => {
    setPlanesState([...planes, { equation: '', coefficients: { a: 0, b: 0, c: 0, d: 0 }, isValid: true }]);
  };

  const handleDeletePlane = (planeIndex) => {
    const updatedPlanes = planes.filter((_, index) => index !== planeIndex);
    setPlanesState(updatedPlanes);
    setPlanes(updatedPlanes); // Update the planes in the parent component
  };

  const handleInputChange = (e, planeIndex) => {
    const updatedPlanes = [...planes];
    updatedPlanes[planeIndex].equation = e.target.value;
    setPlanesState(updatedPlanes);
    extractCoefficients(e.target.value, planeIndex);
  };

  const extractCoefficients = (equation, planeIndex) => {
    const regex = /(-?\d+(\.\d+)?)/g;
    const matches = equation.replace(/\s/g, '').match(regex);
  
    if (matches && matches.length === 4 && equation.includes('x') && equation.includes('y') && equation.includes('z') && equation.includes('=')) {
      const [a, b, c, d] = matches.map(parseFloat);
      const updatedPlanes = [...planes];
      updatedPlanes[planeIndex].coefficients = { a, b, c, d };
      updatedPlanes[planeIndex].isValid = true;
      setPlanesState(updatedPlanes);
      setPlanes(updatedPlanes); // Update the planes in the parent component
    } else {
      const updatedPlanes = [...planes];
      updatedPlanes[planeIndex].coefficients = { a: 0, b: 0, c: 0, d: 0 };
      updatedPlanes[planeIndex].isValid = false;
      setPlanesState(updatedPlanes);
      setPlanes(updatedPlanes); // Update the planes in the parent component
    }
  };
  

  return (
    <div id="side-panel">
      {planes.map((plane, index) => (
        <div key={index}>
          <h3>Plane {index + 1}</h3>
          <div>
            <label>
              Equation of the Plane:
              <input
                type="text"
                value={plane.equation}
                onChange={(e) => handleInputChange(e, index)}
              />
            </label>
          </div>
          {!plane.isValid && <p style={{ color: 'red' }}>Invalid equation format. Please enter coefficients in the correct form - ax+by+cz=d.</p>}
          <h4>Coefficients:</h4>
          <p>a: {plane.coefficients.a}</p>
          <p>b: {plane.coefficients.b}</p>
          <p>c: {plane.coefficients.c}</p>
          <p>d: {plane.coefficients.d}</p>
          <button onClick={() => handleDeletePlane(index)}>Delete</button>
        </div>
      ))}
      <div>
        <button onClick={handleAddPlane}>Add Plane</button>
      </div>
    </div>
  );
}

export default PlaneEquationForm;
