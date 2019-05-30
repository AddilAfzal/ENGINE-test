import React from 'react';
import {Header, Segment} from "semantic-ui-react";
import Departure from "./Departure";
import _ from 'lodash';

function Platform(props){
    const {platformName, departures} = props;
    const orderedDepartures = _.orderBy(departures, 'expectedArrival');

    return (
        <Segment>
            <Header as='h3'>{platformName}</Header>
            <div>
                {orderedDepartures.map(x => <Departure {...x}/>)}
            </div>
        </Segment>
    )
}

export default Platform;