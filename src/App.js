import React, {Fragment} from 'react';
import './App.css';
import {Container, Header, Menu} from "semantic-ui-react";


function App() {
    return (
        <Fragment>
            <Menu inverted>
                <Container>
                {/*<Menu.Item header><span style={{color: '#da252f', marginRight: 10}}>ENGINE </span> | <span*/}
                {/*    style={{marginLeft: 10}}>Transformation</span></Menu.Item>           */}
                    <Menu.Item header>ENGINE </Menu.Item>
                </Container>
            </Menu>
            <Container text>
                <Header as='h2'>Live departures at Great Portland Street</Header>
            </Container>
        </Fragment>
    );
}

export default App;
