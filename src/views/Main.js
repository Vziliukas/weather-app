import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cities from "cities.json";
import countries from "../helpers/countries.json";

import { setWeather, clearWeather, setCurrentWeather } from "../actions";
import SelectField from "../components/SelectField";
import WeatherBox from "../components/WeatherBox";

const MainContainer = styled.main`
    width: 980px;
    margin: 0 auto;

    @media (max-width: 1100px) {
        width: 100%;
    }
`;

const ErrorBox = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-color:#ff6666
    padding: 16px;
    text-align: center;
    border-radius: 4px;
`;

const countryOptions = countries.map((country) => {
    return {
        value: country.code,
        label: country.name,
    };
});

class Main extends React.Component {
    state = {
        selectedCountry: null,
        selectedCity: null,
        err: null,
    };

    componentDidMount() {
        if (
            navigator &&
            navigator.geolocation &&
            navigator.geolocation.getCurrentPosition
        ) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { setCurrentWeather } = this.props;

                const { coords } = pos;
                const options = {
                    lat: coords.latitude,
                    lng: coords.longitude,
                };

                setCurrentWeather(options).then((res) => {
                    if (res && typeof res === "string") {
                        this.setState({ err: res });
                    }
                });
            });
        }
    }

    handleCountryChange = (selectedCountry) => {
        const { clearWeather } = this.props;
        // Always clear city after country selection
        if (selectedCountry) {
            this.setState({ selectedCountry, selectedCity: null });
        } else {
            clearWeather();
            this.setState({ selectedCountry: null, selectedCity: null });
        }
    };

    handleCityChange = (selectedCity) => {
        const { setWeather, clearWeather } = this.props;

        if (selectedCity) {
            this.setState({ selectedCity }, () => {
                setWeather(selectedCity).then((res) => {
                    if (res && typeof res === "string") {
                        this.setState({ err: res });
                    }
                });
            });
        } else {
            clearWeather();
            this.setState({ selectedCity: null });
        }
    };

    getCitiesOptions = (country) => {
        const filteredCities = cities.filter(
            (city) => city.country === country
        );
        return filteredCities.map((filtered) => ({
            value: filtered.name,
            label: filtered.name,
            ...filtered,
        }));
    };

    render() {
        const { selectedCountry, selectedCity, err } = this.state;
        const { weather, currentWeather } = this.props;

        return (
            <MainContainer>
                {err && <ErrorBox>{err}</ErrorBox>}
                {currentWeather && (
                    <WeatherBox
                        src={`./icons/${currentWeather.currently.icon}.svg`}
                        temperature={currentWeather.currently.temperature}
                        time={currentWeather.currently.time}
                        timezone={currentWeather.currently.timezone}
                        windSpeed={currentWeather.currently.windSpeed}
                        summary={currentWeather.currently.summary}
                    />
                )}
                <SelectField
                    label="Select Country"
                    value={selectedCountry}
                    onChange={this.handleCountryChange}
                    options={countryOptions}
                    placeholder="Select Country"
                    isClearable={true}
                />
                {selectedCountry && (
                    <SelectField
                        label="Select City"
                        value={selectedCity}
                        onChange={this.handleCityChange}
                        options={this.getCitiesOptions(selectedCountry.value)}
                        placeholder="Select City"
                        isClearable={true}
                    />
                )}
                {weather && (
                    <WeatherBox
                        src={`./icons/${weather.currently.icon}.svg`}
                        temperature={weather.currently.temperature}
                        time={weather.currently.time}
                        timezone={selectedCity.label}
                        windSpeed={weather.currently.windSpeed}
                        summary={weather.currently.summary}
                    />
                )}
            </MainContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.selectedWeather,
        currentWeather: state.currentWeather,
    };
};

const mapStateToDispatch = (dispatch) => {
    return bindActionCreators(
        { setWeather, clearWeather, setCurrentWeather },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(Main);
