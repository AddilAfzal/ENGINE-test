import React, {Fragment, Component} from 'react';
import './App.css';
import {Container, Header} from "semantic-ui-react";
import Navigation from "./components/Navigation";
import Platforms from "./components/Platforms";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <br/>
                <Container>
                    {/*<ServiceStatus />*/}
                    <Platforms stationNaptanId={'940GZZLUGPS'}/>
                </Container>
            </Fragment>
        );
    }
}

export default App;
