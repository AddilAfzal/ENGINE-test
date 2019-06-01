import React, {Fragment} from 'react';
import {Label, Segment} from "semantic-ui-react";
import Moment from 'react-moment';
import 'moment-timezone';
import _ from 'lodash';

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
        if(d.includes("seconds")) {
            return "Now"
        } else {
            return d.replace('minutes', 'min').replace('minute', 'min')
        }
    };

    handleToggle = () => {
        this.setState({expanded: !this.state.expanded});
    };

    getLineStatus = () => {
        const {lineId, serviceStatusData} = this.props;
        const line = _.find(serviceStatusData, ['id', lineId]);
        return line.lineStatuses[0].statusSeverityDescription;
    };

    render() {
        const {expanded} = this.state;
        const {lineName, lineId, towards, expectedArrival, vehicleId, currentLocation} = this.props;
        const lineStatus = this.getLineStatus();

        return (
            <Segment vertical key={vehicleId} onClick={this.handleToggle}>
                    <Label style={{background: lineColours[lineId], color: '#fff'}} horizontal>
                        {lineName}
                    </Label> {towards}

                    <div style={{float: 'right', color: (lineStatus === 'Good Service' ? 'green' : '#ad0000')}}>
                        <Moment filter={this.customFilter} fromNow ago>{expectedArrival}</Moment> (<Moment
                        format={'HH:mm'}>{expectedArrival}</Moment> )
                    </div>
                {expanded && <Segment onClick={ (e) => e.stopPropagation()}> {currentLocation}</Segment>}


            </Segment>
        )
    }

}

export default Platform;