import React from 'react';
import {Segment} from "semantic-ui-react";
import Moment from 'react-moment';
import 'moment-timezone';
import LineLabel from "./LineLabel";

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
            return d.replace('minutes', 'min').replace('a minute', '1 min')
        }
    };

    handleToggle = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render() {
        const {expanded} = this.state;
        const {lineName, lineId, towards, expectedArrival, vehicleId, currentLocation} = this.props;

        return (
            <Segment vertical key={vehicleId} onClick={this.handleToggle}>
                    <LineLabel id={lineId} name={lineName}/> {towards}

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