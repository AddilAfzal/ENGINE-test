import React from 'react';
import {Label} from "semantic-ui-react";

const colours = {
    'circle': '#ffcd00',
    'hammersmith-city': '#e297b1',
    'metropolitan': '#800057',
};

// https://stackoverflow.com/questions/4726344/how-do-i-change-text-color-determined-by-the-background-color
function idealTextColor(bgColor) {

    var nThreshold = 105;
    var components = getRGBComponents(bgColor);
    var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

    return ((255 - bgDelta) < nThreshold) ? "#292929" : "#ffffff";
}

function getRGBComponents(color) {

    var r = color.substring(1, 3);
    var g = color.substring(3, 5);
    var b = color.substring(5, 7);

    return {
        R: parseInt(r, 16),
        G: parseInt(g, 16),
        B: parseInt(b, 16)
    };
}

function LineLabel(props){
    const {id, name} = props;
    const background = colours[id];
    return (
        <Label style={{background, color: idealTextColor(background)}} horizontal>
            {name}
        </Label>
    )
}

export default LineLabel;