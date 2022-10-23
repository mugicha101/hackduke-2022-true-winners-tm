import { useRef, useState, useEffect } from 'react';

function ImageSlide({slideData={}, data={}}) {
    return <img 
        width="100%" 
        height="100%" 
        src={slideData.img_url ?? ""}
        style={{objectFit: "contain"}}
    />
}

export default ImageSlide;