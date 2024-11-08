import React, { useMemo } from 'react';
import '../styles/Output.css';

const Output = ({ encoding, binary }) => {
  const tableWidth = 1000;
  const columnWidth = tableWidth / binary.length;

  const getEncodedPoints = () => {
    const points = [];
    let yPos = 50;
    let lastLevel = 80;
    let lastTransition = false;

    binary.split('').forEach((bit, index) => {
      const xStart = index * columnWidth;
      const xMid = xStart + columnWidth / 2;
      const xEnd = xStart + columnWidth;

      switch (encoding) {
        case 'NRZ-L':
          yPos = bit === '1' ? 20 : 80;
          points.push({ x: xStart, y: yPos });
          points.push({ x: xEnd, y: yPos });
          break;

        case 'NRZ-I':
          if (bit === '1') {
            yPos = yPos === 20 ? 80 : 20;
          }
          points.push({ x: xStart, y: yPos });
          points.push({ x: xEnd, y: yPos });
          break;

        case 'Bipolar AMI':
          if (bit === '1') {
            yPos = lastLevel === 20 ? 80 : 20;
            lastLevel = yPos;
          } else {
            yPos = 50;
          }
          points.push({ x: xStart, y: yPos });
          points.push({ x: xEnd, y: yPos });
          break;

        case 'Pseudoternary':
          if (bit === '0') {
            yPos = lastLevel === 20 ? 80 : 20;
            lastLevel = yPos;
          } else {
            yPos = 50;
          }
          points.push({ x: xStart, y: yPos });
          points.push({ x: xEnd, y: yPos });
          break;

        case 'Manchester':
          yPos = bit === '1' ? 20 : 80;
          points.push({ x: xStart, y: yPos });
          points.push({ x: xMid, y: yPos });
          points.push({ x: xMid, y: bit === '1' ? 80 : 20 });
          points.push({ x: xEnd, y: bit === '1' ? 80 : 20 });
          break;

        case 'Differential Manchester':
          const transition = bit === '0' ? !lastTransition : lastTransition;
          yPos = transition ? 80 : 20;
          points.push({ x: xStart, y: yPos });
          points.push({ x: xMid, y: yPos });
          points.push({ x: xMid, y: yPos === 20 ? 80 : 20 });
          points.push({ x: xEnd, y: yPos === 20 ? 80 : 20 });
          lastTransition = transition;
          break;

        default:
          break;
      }
    });
    return points;
  };

  const encodedPoints = useMemo(getEncodedPoints, [binary, encoding]);

  const pathData = encodedPoints.reduce((path, point, index, arr) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const prevPoint = arr[index - 1];
    let segment = '';

    if (prevPoint.y !== point.y) {
      segment += ` V ${point.y}`;
    }
    segment += ` H ${point.x}`;

    return `${path}${segment}`;
  }, '');

  return (
    <div className="output-container">
      <table className="output-table" style={{ '--column-count': binary.length }}>
        <thead>
          <tr>
            {binary.split('').map((bit, index) => (
              <th key={index}>{bit}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={binary.length}>
              <svg
                className="output-svg"
                viewBox={`0 0 ${tableWidth} 90`}
                preserveAspectRatio="none"
              >
                <path d={pathData} fill="none" stroke="black" strokeWidth="3" />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Output;
