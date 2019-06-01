import React, {Fragment, Component} from 'react';
import _ from 'lodash';
import Platform from "./Platform";
import {Container, Divider, Grid, Header, Image, Segment} from "semantic-ui-react";
import Moment from "react-moment";
import ServiceStatus from "./ServiceStatus";

class Platforms extends Component {

    constructor(props) {
        super(props);

        this.state = {
            response: null,
            platforms: null,
            lastUpdated: null,
        }
    }

    componentDidMount = async () => {
        // One the component has mounted, it will fetch data.
        this.updateResults();
    };

    updateResults = async () => {
        const response = await this.fetchArrivalData();
        const platforms = _.groupBy(response, 'platformName');

        // Update the data stored in the state, replacing the timestamp and queueing the next API call.
        this.setState({response, platforms, lastUpdated: new Date().getTime()},
            () => setTimeout(this.updateResults, 20000));
    };

    fetchArrivalData = async () => {
        const {stationNaptanId} = this.props;
        const url = "https://api.tfl.gov.uk/StopPoint/" + stationNaptanId + "/arrivals";

        return await fetch(url).then(x => x.json());
    };

    render() {
        const {platforms, response, lastUpdated} = this.state;
        const lineIds = _.uniq(_.map(response, 'lineId'));

        if (platforms) {
            const body = Object.keys(platforms)
                .map((p, key) =>
                    <Grid.Column>
                        <Platform key={key} platformName={p}
                                  departures={platforms[p]} />
                    </Grid.Column>);

            return (
                <Fragment>
                    <div>
                        <Container style={{marginTop: 40}}>
                            <Header as='h1' style={{marginBottom: 20}}>Live departures</Header>
                            <Grid style={{marginBottom: -30}}>
                                <Grid.Column floated='left' width={5}>
                                    <Header as='h3' style={{marginBottom: 15}}><Image src="./Underground.svg" style={{marginTop: -6, width: 19}}/>
                                        Great Portland Street
                                    </Header>
                                </Grid.Column>
                                <Grid.Column floated='right' width={3} style={{textAlign: 'right', marginTop: 5}}>
                                    <b>Last updated</b>: <Moment format="HH:mm:ss">{lastUpdated}</Moment>
                                </Grid.Column>
                            </Grid>
                        </Container>
                    </div>

                    <ServiceStatus lineIds={lineIds}/>
                    <Divider/>

                    <Grid stackable columns={Object.keys(platforms).length}>
                        {body}
                    </Grid>
                </Fragment>
            );

        } else {
            // This will be shown on the initial page load, when the API hasnt yet been called.
            return <Segment loading={true}/>
        }

    };
};

export default Platforms;