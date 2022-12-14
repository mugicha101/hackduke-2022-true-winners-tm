import { useRef, useState, useEffect } from 'react';

function ImageSlide({ panelIndex, slideIndex, data={}, canvasRefs={}}) {
    return <img 
        width="100%" 
        height="100%" 
        src={data.img_url ?? ""}
        style={{objectFit: "contain"}}
    />
}

export default ImageSlide;