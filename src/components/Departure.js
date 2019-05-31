import React from 'react';
import {Button, Label, Segment} from "semantic-ui-react";
import Moment from 'react-moment';
import 'moment-timezone';

const lineColours = {
    'circle': '#ffcd00',
    'hammersmith-city': '#e297b1',
    'metropolitan': '#800057',
};


class Platform extends React.Component {

    constructor(props) {
        super(props);
    }

    // Function to replace the message thats shown when there is less than a minute till arrival.
    // "few seconds" becomes "Now"
    customFilter = (d) => {
        console.log(d);
        return (d.includes("seconds")) ? "Now" : d
    };


    render() {
        const {lineName, lineId, towards, expectedArrival, vehicleId} = this.props;

        return (
            <Segment vertical key={vehicleId}>
                <Label style={{background: lineColours[lineId], color: '#fff'}} horizontal>
                    {lineName}
                </Label> {towards}

                <div style={{float: 'right'}}>
                    <Moment filter={this.customFilter} fromNow
                            ago>{expectedArrival}</Moment> (<Moment format={'HH:mm'}>{expectedArrival}</Moment> )
                </div>

            </Segment>
        )
    }

}

export default Platform;