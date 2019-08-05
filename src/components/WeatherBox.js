import React from "react";
import styled from "styled-components";
import moment from "moment";
import { convertToCelcius } from "../helpers";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 8px;

    p {
        margin: 4px;

        &.icon-summary {
            font-size: 14px;
        }
    }
`;

const WeatherInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-weight: bold;
    }

    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Icon = styled.img.attrs(({ src }) => ({
    src,
}))`
    width: ${({ width }) => (width ? `${width}` : "64px")};
    height: ${({ height }) => (height ? `${height}` : "64px")};
`;
export default ({ title = "Current", src, temperature, time, timezone, windSpeed, summary }) => (
    <Container>
        <h3>{title}</h3>
        <p>{moment(time).format('LLLL')}</p>
        <p>{timezone}</p>
        <Icon src={src} />
        <p className="icon-summary">{summary}</p>
        <WeatherInfo>
            <div className="flex">
                <p>Temperature: {convertToCelcius(temperature)}</p>
                <Icon src="./icons/celcius.svg" width="48px" height="48px"/>
            </div>
            <p>Wind speed: {windSpeed}</p>
        </WeatherInfo>
    </Container>
);
