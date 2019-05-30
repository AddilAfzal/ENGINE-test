import React, {Fragment, Component} from 'react';
import _ from 'lodash';
import Platform from "./Platform";
import {Segment} from "semantic-ui-react";
class Platforms extends Component {

    constructor(props) {
        super(props);

        this.state = {
            platforms: null
        }
    }

    componentDidMount = async () => {
        const response = await this.fetchData();
        const platforms = _.groupBy(response, 'platformName');
        this.setState({platforms});
        // console.log(_.groupBy(response, 'platformName'));
    };

    fetchData = async () => {
        const {stationNaptanId} = this.props;
        // Hard coded from great portland street station. Could be implemented so that station is selectable.
        const url = "https://api.tfl.gov.uk/StopPoint/" + stationNaptanId + "/arrivals";

        return await fetch(url).then(x => x.json());
    };


    render() {
        const {platforms} = this.state;

        if(platforms) {
            console.log(platforms);
            return Object.keys(platforms).map((p, key) => <Platform key={key} platformName={p}
                                                                    departures={platforms[p]}/>);

        } else {
            return <Segment loading={true}/>
        }

    };
};

export default Platforms;