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
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const ref = useRef();

    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
    
        // 👇️ if you need access to parent
        // of the element on which you set the ref
        // console.log(ref.current.parentElement);
        // console.log(ref.current.parentElement.offsetHeight);
        // console.log(ref.current.parentElement.offsetWidth);
    }, []);

    let textBoxes = slideData.text_boxes;
    console.log(textBoxes);

    let moveData = {};
    for (let key in Object.keys(textBoxes)) {
        moveData[key] = {x: 0, y: 0}
    };

    function handleStart(e, key) {
        console.log(moveData);
        moveData[key].x = e.clientX;
        moveData[key].y = e.clientY;
    }

    function handleStop(e, key) {
        console.log(e);
        let tb = textBoxes[key];
        tb.x += (e.clientX - moveData[key].x) / width;
        tb.y += (e.clientY - moveData[key].y) / height;
        console.log(tb.x, tb.y);
    }

    let boxRender = [...Object.keys(textBoxes)].map((key) => {
        let box = textBoxes[key];
        return <Draggable
                onStart={(e) => {
                   // handleStart(e, key);
                }}
                onStop={(e) => {
                    // handleStop(e, key);
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
    return <div ref={ref}>{boxRender}</div>;
}

export default TextSlide;