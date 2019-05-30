import React from 'react';
import {Segment} from "semantic-ui-react";
import Moment from 'react-moment';
import 'moment-timezone';

function Platform(props){

    const {lineName, towards, expectedArrival} = props;

    const customFilter = (d) => {
        console.log(d);
        return <div style={{float: 'right'}}>{(d.includes("seconds")) ? "Now" : d}</div>
    };

    return (
        <Segment vertical>
            {towards} ({lineName}) <Moment filter={customFilter} fromNow ago>{expectedArrival}</Moment>
        </Segment>
    )
}

export default Platform;