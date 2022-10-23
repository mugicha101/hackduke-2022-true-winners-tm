import { Typography } from "@mui/material"
import Draggable from "react-draggable"
import { useRef, useState, useEffect } from 'react';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}

function TextSlide({slideData={}, data={}}) {
    const forceUpdate = useForceUpdate();

    let textBoxes = slideData.text_boxes;
    console.log(textBoxes);

    let moveData = {};
    for (let key in Object.keys(textBoxes)) {
        moveData[key] = {moveX: 0, moveY: 0}
    };

    function handleDrag(e, key) {
        console.log(moveData);
        moveData[key].moveX += e.movementX;
        moveData[key].moveY += e.movementY;
    }

    function handleStop(e, key) {
        let tb = textBoxes[key];
        tb.x += moveData[key].moveX / 100;
        tb.y += moveData[key].moveY / 100;
        console.log(tb.x, tb.y);
        forceUpdate();
    }

    return [...Object.keys(textBoxes)].map((key) => {
        let box = textBoxes[key];
        return <Draggable
                onDrag={(e) => {
                   handleDrag(e, key);
                }}
                onStop={(e) => {
                    handleStop(e, key);
                }}>
                <Typography
                sx={{
                    position: "relative",
                    left: `${100 * box.x}%`,
                    top: `${100 * box.y}%`,
                    maxWidth: `${100 * box.width}%`
                }}
                key={key}
            >
                {box.text}
            </Typography>
        </Draggable>;
    })
    
    
    
}

export default TextSlide;