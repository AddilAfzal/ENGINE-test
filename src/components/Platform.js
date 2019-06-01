import React from 'react';
import {Header, Segment} from "semantic-ui-react";
import Departure from "./Departure";
import _ from 'lodash';

function Platform(props){
    const {platformName, departures, serviceStatusData} = props;
    const orderedDepartures = _.orderBy(departures, 'expectedArrival');

    return (
        <div>
            <Header as='h3' attached='top'>{platformName}</Header>
            <Segment attached>
                <div>
                    {orderedDepartures.map(x => <Departure {...x} serviceStatusData={serviceStatusData} />)}
                </div>
            </Segment>
        </div>
    )
}

export default Platform;