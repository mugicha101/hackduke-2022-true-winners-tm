import CanvasSlide from "./slide_types/CanvasSlide.js";
import ImageSlide from "./slide_types/ImageSlide.js";
import PollSlide from "./slide_types/PollSlide.js";
import TextSlide from "./slide_types/TextSlide.js";
import ResultSlide from "./slide_types/ResultSlide.js";

function Slide({ panelIndex, slideIndex, type, data, canvases, canvasRefs }) {
    let slide;
    switch (type) {
        case "canvas":
            slide = <CanvasSlide panelIndex={panelIndex} slideIndex={slideIndex} data={data} canvases={canvases} canvasRefs={canvasRefs}/>;
            break;
        case "image":
            slide = <ImageSlide panelIndex={panelIndex} slideIndex={slideIndex} data={data} canvases={canvases} canvasRefs={canvasRefs}/>;
            break;
        case "poll":
            slide = <PollSlide panelIndex={panelIndex} slideIndex={slideIndex} data={data} canvases={canvases} canvasRefs={canvasRefs}/>;
            break;
        case "text":
            slide = <TextSlide panelIndex={panelIndex} slideIndex={slideIndex} data={data} canvases={canvases} canvasRefs={canvasRefs}/>;
            break;
        case "poll_results":
            slide = <ResultSlide panelIndex={panelIndex} slideIndex={slideIndex} data={data} canvases={canvases} canvasRefs={canvasRefs}/>;
            break;
        default:
            slide = <h>No Data</h>;
    }
    return slide;
    // return <div>{slide}<p>{type}</p></div>;
}

export default Slide