import React from 'react';
import {Header, Segment} from "semantic-ui-react";
import Departure from "./Departure";
import _ from 'lodash';

function Platform(props){
    const {platformName, departures} = props;
    const orderedDepartures = _.orderBy(departures, 'expectedArrival');

    return (
        <div>
            <Header as='h3' attached='top'>{platformName}</Header>
            <Segment attached style={{paddingTop: 0}}>
                    {orderedDepartures.map(x => <Departure {...x}/>)}
            </Segment>
        </div>
    )
}

export default Platform;