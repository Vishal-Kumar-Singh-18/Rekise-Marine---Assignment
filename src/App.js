import React, { useState } from "react";
import MapContainer from "./components/MapContainer";
import MissionModal from "./components/MissionModal";
import PolygonModal from "./components/PolygonModal";

const App = () => {
  const [drawingMode, setDrawingMode] = useState(null);
  const [linestringWaypoints, setLinestringWaypoints] = useState([]);
  const [polygonWaypoints, setPolygonWaypoints] = useState([]);

  const handleInsertPolygon = (index, position) => {
    setDrawingMode("Polygon");
  };

  const handlePolygonComplete = (waypoints) => {
    setPolygonWaypoints(waypoints);
    setDrawingMode(null); // Exit drawing mode
  };

  return (
    <div>
      <button onClick={() => setDrawingMode("LineString")}>Draw Linestring</button>
      <MapContainer
        drawingMode={drawingMode}
        setWaypoints={setLinestringWaypoints}
        onPolygonComplete={handlePolygonComplete}
      />
      <MissionModal
        waypoints={linestringWaypoints}
        onInsertPolygon={handleInsertPolygon}
      />
      <PolygonModal waypoints={polygonWaypoints} />
    </div>
  );
};

export default App;
