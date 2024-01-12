import React from "react";
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

function DrawTools({ onChange }) {
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
            let numEdited = 0;
            e.layers.eachLayer((layer) => {
                numEdited += 1;
            });
            console.log(`_onEdited: edited ${numEdited} layers`, e);

            _onChange();
        },
        [_onChange]
    );

    const _onCreated = React.useCallback(
        (e) => {
            let type = e.layerType;
            let layer = e.layer;
            if (type === "marker") {
                console.log("_onCreated: marker created", e);
            } else {
                console.log("_onCreated: something else created:", type, e);
            }

            _onChange();
        },
        [_onChange]
    );

    const _onDeleted = (e) => {
        let numDeleted = 0;
        e.layers.eachLayer((layer) => {
            numDeleted += 1;
        });
        console.log(`onDeleted: removed ${numDeleted} layers`, e);

        _onChange();
    };

    const _onMounted = (drawControl) => {
        console.log("_onMounted", drawControl);
    };

    const _onEditStart = (e) => {
        console.log("_onEditStart", e);
    };

    const _onEditStop = (e) => {
        console.log("_onEditStop", e);
    };

    const _onDeleteStart = (e) => {
        console.log("_onDeleteStart", e);
    };

    const _onDeleteStop = (e) => {
        console.log("_onDeleteStop", e);
    };

    const _onDrawStart = (e) => {
        console.log("_onDrawStart", e);
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
                }}
                ref={(e) => (_editableFG.current = e)}
            />
        </FeatureGroup>
    );
}

export default DrawTools;
