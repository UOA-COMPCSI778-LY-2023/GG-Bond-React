import { LayersControl, useMapEvents } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import HeatmapLayer from "../HeatmapLayer/HeatmapLayer";

// const apiKey = "AAPK4f354998bf5a4659b9d666b2069641897bTjGcAqQx-CfCSZNh9ToN7ANpoJDprU4gf08kNagIOaR_eSX7gjFQaqM9EzJmu-";
// const baseUrl = "https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles";

const MapLayers = ({ heatData, setSelectedLayer }) => {
    useMapEvents({
        baselayerchange: (event) => {
            setSelectedLayer(event.name);
        },
    });

    return (
        <LayersControl position="bottomleft" collapsed={true}>
            <LayersControl.BaseLayer name="Light map">
                <BasemapLayer name="Gray" />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Dark map">
                <BasemapLayer name="DarkGray" />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Satellite" checked>
                <BasemapLayer name="Imagery" />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Oceans">
                <BasemapLayer name="Oceans" maxZoom={13} />
                {/*China maxZoom={10} */}
            </LayersControl.BaseLayer>
            <LayersControl.Overlay name="HeatMap" checked>
                <HeatmapLayer
                    points={heatData}
                    longitudeExtractor={(m) => m[1]}
                    latitudeExtractor={(m) => m[0]}
                    intensityExtractor={(m) => parseFloat(m[2])}
                />
            </LayersControl.Overlay>
        </LayersControl>
    );
};

export default MapLayers;
