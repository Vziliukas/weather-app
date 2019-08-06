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
    margin: 8px 0;

    p {
        margin: 4px;

        &.icon-summary {
            font-size: 14px;
        }
    }

    ${({ hover }) => hover && "cursor: pointer"}
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

const Arrow = styled.div`
    margin: 8px;
    box-sizing: border-box;
    height: 24px;
    width: 24px;
    border-style: solid;
    border-color: #cccccc;
    border-width: 0px 1px 1px 0px;
    transform: rotate(45deg);
    transition: border-width 150ms ease-in-out;
`

const Icon = styled.img.attrs(({ src }) => ({
    src,
}))`
    width: ${({ width }) => (width ? `${width}` : "64px")};
    height: ${({ height }) => (height ? `${height}` : "64px")};
`;
export default ({ title, src, temperature, time, timezone, windSpeed, summary, toggle, ...rest }) => (
    <Container {...rest} >
        {title && <h3>{title}</h3>}
        <p>{moment(time * 1000).format('LLLL')}</p>
        {timezone && <p>{timezone}</p>}
        <Icon src={src} />
        <p className="icon-summary">{summary}</p>
        <WeatherInfo>
            <div className="flex">
                <p>Temperature: {convertToCelcius(temperature)}</p>
                <Icon src="./icons/celcius.svg" width="48px" height="48px"/>
            </div>
            <p>Wind speed: {windSpeed}</p>
        </WeatherInfo>
        {toggle && <Arrow />}
    </Container>
);
