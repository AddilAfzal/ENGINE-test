import React from 'react';
import {Header, Segment} from "semantic-ui-react";
import Arrival from "./Arrival";
import _ from 'lodash';

function Platform(props){
    const {platformName, arrivals} = props;
    const orderedArrivals = _.orderBy(arrivals, 'expectedArrival');

    return (
        <div>
            <Header as='h3' attached='top'>{platformName}</Header>
            <Segment attached style={{paddingTop: 0}}>
                    {orderedArrivals.map(x => <Arrival {...x}/>)}
            </Segment>
        </div>
    )
}

export default Platform;