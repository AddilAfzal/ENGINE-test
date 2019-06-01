import {Container, Menu} from "semantic-ui-react";
import React, {Fragment} from 'react';

function Navigation() {
    return (
        <Fragment>
            <Menu inverted>
                <Container>
                    <Menu.Item header>ENGINE </Menu.Item>
                </Container>
            </Menu>
        </Fragment>)
}

export default Navigation;