import axios from "axios";
import jsonpAdapter from "axios-jsonp";
import _get from "lodash/get";

import { ACTION_TYPES, API_URLS } from "../constants";

export const setLoader = () => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.SET_LOADER,
    });
};

export const clearLoader = () => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.CLEAR_LOADER,
    });
};

export const setWeather = (options) => (dispatch) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const { lat, lng } = options;

    if (apiKey) {
        const url = `${API_URLS.DARK_SKY}${apiKey}/${lat},${lng}`;
        dispatch(setLoader());
        axios
            .get(url, { adapter: jsonpAdapter })
            .then((response) => {
                const payload = _get(response, "data", null);
                dispatch({
                    type: ACTION_TYPES.SET_SELECTED_WEATHER,
                    payload,
                });
                dispatch(clearLoader());
            })
            .catch((err) => {
                dispatch(clearLoader());
                console.log(err);
            });
        return Promise.resolve({});
    } else {
        return Promise.resolve("Api key is not provided");
    }
};

export const clearWeather = () => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.CLEAR_SELECTED_WEATHER,
    });
};

export const setCurrentWeather = (options) => (dispatch) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const { lat, lng } = options;

    if (apiKey) {
        const url = `${API_URLS.DARK_SKY}${apiKey}/${lat},${lng}`;
        dispatch(setLoader());
        axios
            .get(url, { adapter: jsonpAdapter })
            .then((response) => {
                const payload = _get(response, "data", null);
                dispatch({
                    type: ACTION_TYPES.SET_CURRENT_WEATHER,
                    payload,
                });
                dispatch(clearLoader());
                return;
            })
            .catch((err) => {
                dispatch(clearLoader());
                console.log(err);
            });

        return Promise.resolve({});
    } else {
        return Promise.resolve("Api key is not provided");
    }
};
