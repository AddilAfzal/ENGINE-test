import React, {Fragment} from 'react';
import {Label, Segment} from "semantic-ui-react";
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
        this.state = {
            expanded: false
        }
    }

    // Function to replace the message thats shown when there is less than a minute till arrival.
    // "few seconds" becomes "Now"
    customFilter = (d) => {
        return (d.includes("seconds")) ? "Now" : d
    };

    handleToggle = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render() {
        const {expanded} = this.state;
        const {lineName, lineId, towards, expectedArrival, vehicleId, currentLocation} = this.props;

        return (
            <Segment vertical key={vehicleId} onClick={this.handleToggle}>
                    <Label style={{background: lineColours[lineId], color: '#fff'}} horizontal>
                        {lineName}
                    </Label> {towards}

                    <div style={{float: 'right'}}>
                        <Moment filter={this.customFilter} fromNow ago>{expectedArrival}</Moment> (<Moment
                        format={'HH:mm'}>{expectedArrival}</Moment> )
                    </div>
                {expanded && <Segment onClick={ (e) => e.stopPropagation()}> {currentLocation}</Segment>}


            </Segment>
        )
    }

}

export default Platform;