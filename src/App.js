import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Main from "./views/Main";

const AppContainer = styled.div`
    padding: 16px;
    position: relative;
`;

const Header = styled.header`
    h1 {
        text-align: center;
        font-size: 32px;
    }
`;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: #ffffff;
    opacity: 0.6;
`;

class App extends React.Component {
    render() {
        const { loader } = this.props;

        return (
            <AppContainer>
                <Header>
                    <h1>Weather app</h1>
                </Header>
                {loader && (
                    <LoaderContainer>
                        <Loader
                            type="BallTriangle"
                            color="blue"
                            height={80}
                            width={80}
                        />
                    </LoaderContainer>
                )}
                <Main />
            </AppContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loader: state.loader,
    };
};

export default connect(mapStateToProps)(App);
