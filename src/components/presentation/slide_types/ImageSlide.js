import { useRef, useState, useEffect } from 'react';
import CanvasDraw from '@win11react/react-canvas-draw';

function ImageSlide({ panelIndex, slideIndex, data={}, canvases={}, canvasRefs={}}) {
    const canvas = useRef();
    let id = `${panelIndex},${slideIndex}`;

    return <img 
        width="100%" 
        height="100%" 
        src={data.img_url ?? ""}
        style={{objectFit: "contain"}}
    />
}

export default ImageSlide;