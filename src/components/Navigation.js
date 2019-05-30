import {Container, Header, Menu} from "semantic-ui-react";
import React, {Fragment} from 'react';

function Navigation() {
    return (
        <Fragment>
            <Menu inverted>
                <Container>
                    <Menu.Item header>ENGINE </Menu.Item>
                </Container>
            </Menu>
            <Container>
                <Header as='h1'>Live departures - Great Portland Street</Header>
            </Container>
        </Fragment>)
};

export default Navigation;