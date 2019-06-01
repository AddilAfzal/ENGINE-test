import React, {Fragment} from 'react';
import {Header, Segment} from "semantic-ui-react";
import 'moment-timezone';
import _ from 'lodash';
import LineDetails from "./LineDetails";


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

    getLine = (lineId) => {
        const {data} = this.state;
        return _.find(data, ['id', lineId]);
    };

    render() {
        const {lineIds} = this.props;
        const {data} = this.state;

        if(lineIds && data) {
            const lines = lineIds.map(lineId => this.getLine(lineId));

            return (
                <Fragment>
                    <Header as='h3' attached='top'>Service Status</Header>
                    <Segment attached>
                        {lines.map(x => <LineDetails line={x}/> )}
                    </Segment>
                </Fragment>
            )
        } else {
            return <Segment loading={true}/>
        }

    }
}

export default ServiceStatus;