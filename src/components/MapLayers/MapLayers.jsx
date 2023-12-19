import { LayersControl } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";

// const apiKey = "AAPK4f354998bf5a4659b9d666b2069641897bTjGcAqQx-CfCSZNh9ToN7ANpoJDprU4gf08kNagIOaR_eSX7gjFQaqM9EzJmu-";
// const baseUrl = "https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles";

const MapLayers = () => {
    return (
        <LayersControl position="bottomleft" collapsed={true}>
            <LayersControl.BaseLayer name="Light map" checked>
                <BasemapLayer name="Gray" />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Dark map">
                <BasemapLayer name="DarkGray" />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Satellite">
                <BasemapLayer name="Imagery" />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Oceans">
                <BasemapLayer name="Oceans" maxZoom={13} />{" "}
                {/*China maxZoom={10} */}
            </LayersControl.BaseLayer>
        </LayersControl>
    );
};

export default MapLayers;
