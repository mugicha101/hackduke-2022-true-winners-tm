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
                maxWidth: `${100 * box.width}%`
            }}
            key={key}
        >
            {box.text}
        </Typography>
    })
    
    
    
}

export default TextSlide;