import React from 'react';
import {Segment} from "semantic-ui-react";
import Moment from 'react-moment';
import 'moment-timezone';

function Platform(props){

    const {lineName, towards, expectedArrival} = props;

    return (
        <Segment>
            {lineName} -> {towards} -> <Moment>{expectedArrival}</Moment>
        </Segment>
    )
}

export default Platform;