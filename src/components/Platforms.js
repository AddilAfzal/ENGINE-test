import React, {Fragment, Component} from 'react';
import _ from 'lodash';
import Platform from "./Platform";
import {Container, Grid, Header, Image, Segment} from "semantic-ui-react";
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
        // One the component has mounted, it will fetch the data.
        this.updateResults();
    };

    updateResults = async () => {
        const response = await this.fetchData();
        const platforms = _.groupBy(response, 'platformName');

        // Update the data stored in the state, replacing the timestamp and queueing the next API call.
        this.setState({platforms, lastUpdated: new Date().getTime()},
            () => setTimeout(this.updateResults, 20000));
    };


    fetchData = async () => {
        const {stationNaptanId} = this.props;
        const url = "https://api.tfl.gov.uk/StopPoint/" + stationNaptanId + "/arrivals";

        return await fetch(url).then(x => x.json());
    };


    render() {
        const {platforms, lastUpdated} = this.state;

        if (platforms) {
            const body = Object.keys(platforms)
                .map((p, key) =>
                    <Grid.Column>
                        <Platform key={key} platformName={p}
                                  departures={platforms[p]}/>
                    </Grid.Column>);

            return (
                <Fragment>
                    <div>
                        <Container style={{marginTop: 40}}>
                            <Header as='h1' style={{marginBottom: 20}}>Live departures</Header>
                            <Grid>
                                <Grid.Column floated='left' width={5}>
                                    <Header as='h3' style={{marginBottom: 15}}><Image src="./Underground.svg" style={{marginTop: -3}}/>
                                        Great Portland Street
                                    </Header>
                                </Grid.Column>
                                <Grid.Column floated='right' width={3} style={{textAlign: 'right', marginTop: 5}}>
                                    <b>Last updated</b>: <Moment format="HH:mm:ss">{lastUpdated}</Moment>
                                </Grid.Column>
                            </Grid>
                        </Container>
                    </div>

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