import './canvasComponent.styles.css';
import React from 'react';
import PropTypes from 'prop-types';

const SCALE = -3;

const CanvasComponent = ({ points, selectedAlgorithm, hull }) => {
  const canvasRef = React.useRef(null);

  const setupCanvas = (canvas) => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Translate the origin to the center of the canvas
    ctx.translate(rect.width / 2.5 / dpr, rect.height / 2 / dpr);

    return ctx;
  };

  const drawHull = (ctx, hull, selectedAlgorithm) => {
    if (hull.length < 3) return;

    ctx.beginPath();
    ctx.moveTo(hull[0].x * SCALE, -hull[0].y * SCALE);
    for (let i = 1; i < hull.length; i++) {
      ctx.lineTo(hull[i].x * SCALE, -hull[i].y * SCALE);
    }
    ctx.closePath();
    console.log(selectedAlgorithm, 'the algorithm selected');
    if (selectedAlgorithm === 'grahamScan') {
      ctx.strokeStyle = 'blue';
    } else {
      ctx.strokeStyle = 'red';
    }
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  React.useEffect(() => {
    const ctx = setupCanvas(canvasRef.current);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (points.length >= 3) {
      if (selectedAlgorithm === 'grahamScan') {
        ctx.strokeStyle = 'blue';
        drawHull(ctx, hull, selectedAlgorithm);
      } else {
        drawHull(ctx, hull, selectedAlgorithm);
      }
    }

    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(-point.x * SCALE, -point.y * SCALE, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, [hull, selectedAlgorithm]);

  React.useEffect(() => {
    const ctx = setupCanvas(canvasRef.current);
    if (points.length > 0) {
      // Draw each point
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(-point.x * SCALE, -point.y * SCALE, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }, [points]);

  return (
    <div className="canvasContainer">
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
};

CanvasComponent.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ),
  selectedAlgorithm: PropTypes.string,
  hull: PropTypes.array,
};

export default CanvasComponent;
