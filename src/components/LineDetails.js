import React from 'react';
import LineLabel from "./LineLabel";


function LineDetails(props){
    const {line} = props;
    const status = line.lineStatuses[0].statusSeverityDescription;

    return (
         <div style={{display: 'inline', paddingRight: 20}}>
             <LineLabel id={line.id} name={line.name}/> {status}
         </div>
    )
}

export default LineDetails;