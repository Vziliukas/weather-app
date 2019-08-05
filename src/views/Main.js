import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import _get from "lodash/get";
import cities from "cities.json";
import countries from "../helpers/countries.json";

import { setWeather } from "../actions";
import SelectField from "../components/SelectField";

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
    };

    handleCountryChange = (selectedCountry) => {
        // Always clear city after country selection
        this.setState({ selectedCountry, selectedCity: null });
    };

    handleCityChange = (selectedCity) => {
        const { setWeather } = this.props;
        this.setState({ selectedCity }, () => {
            setWeather(selectedCity);
        });
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
        const { selectedCountry, selectedCity } = this.state;
        const { weather } = this.props;

        const time = _get(weather, "currently.time", "");
        console.log("time", time);
        if (time) {
            console.log(moment(time, "MM-DD-YYYY"));
        }

        console.log("key", process.env.REACT_APP_API_KEY);
        return (
            <main>
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
                {time && (
                    <div>
                        {moment(time * 1000).format(moment.HTML5_FMT.DATE)}
                        <br />
                        {moment(time * 1000).format(moment.HTML5_FMT.TIME)}
                    </div>
                )}
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather,
    };
};

const mapStateToDispatch = (dispatch) => {
    return bindActionCreators({ setWeather }, dispatch);
};

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(Main);
