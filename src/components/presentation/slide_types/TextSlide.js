import { Typography } from "@mui/material"
import { useRef, useState, useEffect } from 'react';

function TextSlide({panelIndex, slideIndex, data={}, canvasRefs={}}) {
    let textBoxes = data.text_boxes

    return [...Object.keys(textBoxes)].map((key) => {
        let box = textBoxes[key]
        return <Typography
            sx={{
                position: "relative",
                left: `${100 * box.x}%`,
                top: `${100 * box.y}%`,
                width: `${100 * box.width}%`,
                fontSize: "2.5vh"
            }}
            key={key}
        >
            {box.text}
        </Typography>
    })
    
    
    
}

export default TextSlide;