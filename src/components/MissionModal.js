import React from 'react';

const MissionModal = ({ waypoints, onInsertPolygon }) => {
  const calculateDistance = (point1, point2) => {
    const R = 6371e3; // Earth's radius in meters
    const [lon1, lat1] = point1;
    const [lon2, lat2] = point2;

    const toRad = (angle) => (angle * Math.PI) / 180;
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(Δλ / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <div>
      <h3>Mission Planner</h3>
      <table>
        <thead>
          <tr>
            <th>WP</th>
            <th>Coordinates (Lon, Lat)</th>
            <th>Distance (m)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {waypoints.map((point, index) => (
            <tr key={index}>
              <td>WP{index.toString().padStart(2, '0')}</td>
              <td>{point.join(', ')}</td>
              <td>
                {index > 0 ? calculateDistance(point, waypoints[index - 1]) : 0}
              </td>
              <td>
                <button onClick={() => onInsertPolygon(index, 'before')}>
                  Insert Polygon Before
                </button>
                <button onClick={() => onInsertPolygon(index, 'after')}>
                  Insert Polygon After
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionModal;
