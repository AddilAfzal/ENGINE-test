import React from 'react';
import LineLabel from "./LineLabel";
import {Label} from "semantic-ui-react";


function LineDetails(props){
    const {line} = props;
    const status = line.lineStatuses[0].statusSeverityDescription;
    let statusColour = null;

    switch (status) {
        case 'Good Service':
            statusColour = 'green';
            break;
        default:
            statusColour = 'orange';
    }
    
    return (
         <div style={{display: 'inline', paddingRight: 30, verticalAlign: 'middle'}}>
             <LineLabel id={line.id} name={line.name}/>
             <Label circular color={statusColour} empty style={{marginRight: 5, verticalAlign: 'middle'}}/>
             <span style={{verticalAlign: 'middle'}}>{status}</span>
         </div>
    )
}

export default LineDetails;