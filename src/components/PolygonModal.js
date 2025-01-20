import React from 'react';

const PolygonModal = ({ waypoints }) => (
  <div>
    <h3>Polygon Details</h3>
    <ul>
      {waypoints.map((point, index) => (
        <li key={index}>
          WP{index.toString().padStart(2, '0')}: {point.join(', ')}
        </li>
      ))}
    </ul>
  </div>
);

export default PolygonModal;
