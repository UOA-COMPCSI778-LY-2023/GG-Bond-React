import React, { useState, useEffect } from "react";
import L from "leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

function DrawTools({ onChange, setShapeContainer }) {
    const _editableFG = React.useRef(null);

    const _onChange = React.useCallback(() => {
        if (!_editableFG.current || !onChange) {
            return;
        }

        const geojsonData = _editableFG.current.leafletElement.toGeoJSON();
        onChange(geojsonData);
    }, [onChange]);

    const _onEdited = React.useCallback(
        (e) => {
            let layer = e.layers._layers;
            const shapeIds = Object.keys(layer);

            setShapeContainer((prevShapes) => {
                const newShapes = { ...prevShapes };
                shapeIds.forEach((shapeId) => {
                    if (newShapes["polygon"].hasOwnProperty(shapeId)) {
                        const latlngs = layer[shapeId]._latlngs;
                        newShapes["polygon"][shapeId] = latlngs;
                    } else if (newShapes["circle"].hasOwnProperty(shapeId)) {
                        const latlng = layer[shapeId]._latlng;
                        const radius = layer[shapeId]._radius;
                        newShapes["circle"][shapeId][1] = latlng;
                        newShapes["circle"][shapeId][0] = radius;
                    }
                });

                return newShapes;
            });

            _onChange();
        },
        [_onChange]
    );

    const _onCreated = React.useCallback(
        (e) => {
            let type = e.layerType; // polyline; polygon; circle; marker; circlemarker;
            let layer = e.layer;
            if (type === "marker") {
                console.log("_onCreated: marker created", e);
            } else {
                const shapeId = layer._leaflet_id;
                const latlngs = layer._latlngs || layer._latlng;
                if (type === "polygon") {
                    setShapeContainer((prevShapes) => {
                        const newShapes = {
                            ...prevShapes,
                            [type]: {
                                ...prevShapes[type],
                                [shapeId]: latlngs,
                            },
                        };
                        return newShapes;
                    });
                } else if (type === "circle") {
                    const radius = layer._mRadius;
                    setShapeContainer((prevShapes) => {
                        const newShapes = {
                            ...prevShapes,
                            [type]: {
                                ...prevShapes[type],
                                [shapeId]: [radius, latlngs],
                            },
                        };
                        return newShapes;
                    });
                }
            }

            _onChange();
        },
        [_onChange]
    );

    const _onDeleted = (e) => {
        let layer = e.layers._layers;
        const shapeIds = Object.keys(layer);

        setShapeContainer((prevShapes) => {
            const newShapes = { ...prevShapes };

            shapeIds.forEach((shapeId) => {
                if (newShapes["polygon"].hasOwnProperty(shapeId)) {
                    delete newShapes["polygon"][shapeId];
                } else if (newShapes["circle"].hasOwnProperty(shapeId)) {
                    delete newShapes["circle"][shapeId];
                }
            });

            return newShapes;
        });

        _onChange();
    };

    const _onMounted = (drawControl) => {
        // console.log("_onMounted", drawControl);
    };

    const _onEditStart = (e) => {
        // console.log("_onEditStart", e);
    };

    const _onEditStop = (e) => {
        // console.log("_onEditStop", e);
    };

    const _onDeleteStart = (e) => {
        // console.log("_onDeleteStart", e);
    };

    const _onDeleteStop = (e) => {
        // console.log("_onDeleteStop", e);
    };

    const _onDrawStart = (e) => {
        // console.log("_onDrawStart", e);
    };

    return (
        <FeatureGroup>
            <EditControl
                position="topright"
                onEdited={_onEdited}
                onCreated={_onCreated}
                onDeleted={_onDeleted}
                onMounted={_onMounted}
                onEditStart={_onEditStart}
                onEditStop={_onEditStop}
                onDeleteStart={_onDeleteStart}
                onDeleteStop={_onDeleteStop}
                draw={{
                    rectangle: false,
                    polyline: {
                        showLength: true,
                        metric: false,
                        feet: false,
                        nautic: true,
                    },
                    polygon: {
                        showLength: true,
                        metric: false,
                        feet: false,
                        nautic: true,
                        allowIntersection: false,
                    },
                    toolbar: {
                        buttons: {
                            polygon: "Draw an awesome polygon",
                        },
                    },
                }}
                ref={(e) => (_editableFG.current = e)}
            />
        </FeatureGroup>
    );
}

export default DrawTools;
