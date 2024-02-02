// src/utils/api.js
import axios from "axios";
import config from "../config";

const shipDataApi = axios.create({
    baseURL: config.shipDataURL,
});

const shipImgApi = axios.create({
    baseURL: config.shipImgURL,
});

const pollutionForecastApi = axios.create({
    baseURL: config.pollutionForcastURL,
});

const getShipID = async (mmsi) => {
    const response = await shipImgApi.get(`/get/shipID?mmsi=${mmsi}`);
    return response;
};

const getShipPicture = async (shipId) => {
    const response = await shipImgApi.get(`/get/shipPicture?ship_id=${shipId}`);
    return response;
};

const getShipBasicData = async (
    latLngNE,
    latLngSW,
    type = "0",
    source = 0,
    limit = 500
) => {
    const url = `/rest/v1/ship/list/${latLngSW.lng}/${latLngSW.lat}/${latLngNE.lng}/${latLngNE.lat}/${type}/${source}/${limit}`;
    const response = await shipDataApi.get(url);
    return response;
};

const getShipsBySearch = async (searchTerm) => {
    const url = `/rest/v1/ship/search/${searchTerm}/20`;
    const response = await shipDataApi.get(url);
    return response;
};

const getDownloadFile = async (start_time, end_time, type, polygon, circle) => {
    const url = `/rest/v1/ship/download/${start_time}/${end_time}/${type}/${polygon}/${circle}`;
    const response = await shipDataApi.get(url);
    return response;
};

const getPollutionData = async (mmsi) => {
    const url = `/get/pollution?mmsi=${mmsi}`;
    const response = await pollutionForecastApi.get(url);
    return response;
};

const getTotalPollution = async (mmsi) => {
    const url = `/get/total_pollution?mmsi=${mmsi}`;
    const response = await pollutionForecastApi.get(url);
    return response;
};

const getShipDetail = async (mmsi) => {
    const url = `/rest/v1/ship/${mmsi}`;
    const response = await shipDataApi.get(url);
    return response;
};

export {
    getShipID,
    getShipPicture,
    getShipBasicData,
    getShipsBySearch,
    getDownloadFile,
    getPollutionData,
    getTotalPollution,
    getShipDetail,
};
