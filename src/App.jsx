import './App.css';
import CanvasComponent from './components/canvas/CanvasComponent';
import PointInput from './components/pointInput/PointInput';
import React from 'react';
import { grahamScan } from './algorithms/grahamScan';
import { jarvisMarch } from './algorithms/jarvisMarch';

const App = () => {
  const [hull, setHull] = React.useState([]);
  const [xCoord, setXCoord] = React.useState('');
  const [yCoord, setYCoord] = React.useState('');
  const [points, setPoints] = React.useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    React.useState('grahamScan');

  const handleXChange = (value) => {
    setXCoord(value);
  };

  const handleYChange = (value) => {
    setYCoord(value);
  };

  const addPoint = () => {
    if (xCoord && yCoord) {
      const newPoint = { x: parseFloat(xCoord), y: parseFloat(yCoord) };
      setPoints([...points, newPoint]);
    }
  };

  const clearCanvas = () => {
    console.clear();
    setPoints([]); // Reset the points array
  };

  const calculateConvexHull = () => {
    let calculatedHull = [];
    if (selectedAlgorithm === 'grahamScan') {
      calculatedHull = grahamScan(points);
    } else if (selectedAlgorithm === 'jarvisMarch') {
      calculatedHull = jarvisMarch(points);
    }
    setHull(calculatedHull);
  };

  return (
    <div className="appContainer">
      <CanvasComponent
        hull={hull}
        points={points}
        clearCanvas={clearCanvas}
        selectedAlgorithm={selectedAlgorithm}
      />

      <div>
        <div className="pointStatus">
          <h2>Selected Points</h2>
          {points.map((point, index) => (
            <>
              <p>
                Point-{index + 1}: ( X: {point.x + ' '}
                Y: {point.y})
              </p>
            </>
          ))}
        </div>

        <div className="pointInputs">
          <PointInput
            label={'Please enter the X coordinate'}
            onChange={handleXChange}
          />
          <PointInput
            label={'Please enter the Y coordinate'}
            onChange={handleYChange}
          />

          <button className="submitBtn" onClick={addPoint}>
            Add Point
          </button>

          <button className="submitBtn" onClick={clearCanvas}>
            Clear Canvas
          </button>

          <button className="submitBtn" onClick={calculateConvexHull}>
            Calculate Convex Hull
          </button>

          <div style={{ gap: '10px', display: 'flex' }}>
            <label>
              <input
                type="radio"
                value="grahamScan"
                checked={selectedAlgorithm === 'grahamScan'}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
              />
              Graham Scan
            </label>
            <label>
              <input
                type="radio"
                value="jarvisMarch"
                checked={selectedAlgorithm === 'jarvisMarch'}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
              />
              Jarvis March
            </label>
          </div>
          <h7>&copy; Made By Berke Sukru Palamutcu, All rights reserved</h7>
        </div>
      </div>
    </div>
  );
};

export default App;
