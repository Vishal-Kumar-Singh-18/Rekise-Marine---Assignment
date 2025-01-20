import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import { Style, Stroke, Fill } from "ol/style";

const MapContainer = ({ setWaypoints, drawingMode, onPolygonComplete }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const source = useRef(new VectorSource());

  useEffect(() => {
    // Initialize the map
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: source.current,
          style: new Style({
            stroke: new Stroke({
              color: "#ffcc33",
              width: 3,
            }),
            fill: new Fill({
              color: "rgba(255, 204, 51, 0.4)",
            }),
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([77.5946, 12.9716]),
        zoom: 14,
      }),
    });

    setMap(initialMap);
    return () => initialMap.setTarget(null); // Cleanup
  }, []);

  useEffect(() => {
    if (!map || !drawingMode) return;

    const drawInteraction = new Draw({
      source: source.current,
      type: drawingMode, // "LineString" or "Polygon"
    });

    drawInteraction.on("drawend", (event) => {
      const coordinates = event.feature.getGeometry().getCoordinates();
      if (drawingMode === "LineString") {
        setWaypoints(coordinates);
      } else if (drawingMode === "Polygon") {
        onPolygonComplete(coordinates[0]); // Pass polygon coordinates to the handler
      }
    });

    map.addInteraction(drawInteraction);
    return () => map.removeInteraction(drawInteraction); // Cleanup
  }, [map, drawingMode, setWaypoints, onPolygonComplete]);

  return (
    <div style={{ width: "100%", height: "500px" }} ref={mapRef} />
  );
};

export default MapContainer;
