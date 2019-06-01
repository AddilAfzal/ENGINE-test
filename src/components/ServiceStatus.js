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


class ServiceStatus extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        this.updateServiceStatus();
    }

    updateServiceStatus = async () => {
        const data = await this.fetchServiceStatus();
        this.setState({data},
            () => setTimeout(this.updateServiceStatus, 60000));
    };

    fetchServiceStatus = async () => {
        const url = "https://api.tfl.gov.uk/line/mode/tube/status";
        return await fetch(url).then(x => x.json());
    };
}

export default ServiceStatus;