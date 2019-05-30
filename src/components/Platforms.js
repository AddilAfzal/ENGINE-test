import React, {Fragment, Component} from 'react';
import _ from 'lodash';
import Platform from "./Platform";
import {Message, Segment} from "semantic-ui-react";
import Moment from "react-moment";
class Platforms extends Component {

    constructor(props) {
        super(props);

        this.state = {
            platforms: null,
            lastUpdated: null,
        }
    }

    componentDidMount = async () => {
        this.updateResults();
    };

    updateResults = async () => {
        const response = await this.fetchData();
        const platforms = _.groupBy(response, 'platformName');
        this.setState({platforms, lastUpdated: new Date().getTime()}, () => setTimeout(this.updateResults, 20000));
        // console.log(_.groupBy(response, 'platformName'));
    };


    fetchData = async () => {
        const {stationNaptanId} = this.props;
        // Hard coded from great portland street station. Could be implemented so that station is selectable.
        const url = "https://api.tfl.gov.uk/StopPoint/" + stationNaptanId + "/arrivals";

        return await fetch(url).then(x => x.json());
    };


    render() {
        const {platforms, lastUpdated} = this.state;

        if(platforms) {
            const body = Object.keys(platforms).map((p, key) => <Platform key={key} platformName={p}
                                                                          departures={platforms[p]}/>);

            return (
                <Fragment>
                    <Message>
                        <p>
                            <b>Last updated</b>: <Moment format="HH:mm:ss">{lastUpdated}</Moment>
                        </p>
                    </Message>

                    {body}
                </Fragment>
            );

        } else {
            return <Segment loading={true}/>
        }

    };
};

export default Platforms;