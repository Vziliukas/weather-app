import React from "react";
import styled from "styled-components";
import Main from "./views/Main";

const AppContainer = styled.div`
    padding: 16px;
`;

const Header = styled.header`
    h1 {
        text-align: center;
        font-size: 32px;
    }
`;

function App() {
    return (
        <AppContainer>
            <Header>
                <h1>Weather app</h1>
            </Header>
            <Main />
        </AppContainer>
    );
}

export default App;
