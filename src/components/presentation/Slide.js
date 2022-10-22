import CanvasSlide from "./slide_types/CanvasSlide.js";
import ImageSlide from "./slide_types/ImageSlide.js";
import PollSlide from "./slide_types/PollSlide.js";
import TextSlide from "./slide_types/TextSlide.js";

function Slide({ type, data }) {
    let slide;
    switch (type) {
        case "canvas":
            slide = <CanvasSlide data={data}/>;
            break;
        case "image":
            slide = <ImageSlide data={data}/>;
            break;
        case "poll":
            slide = <PollSlide data={data}/>;
            break;
        case "text":
            slide = <TextSlide data={data}/>;
            break;
        default:
            slide = <h>No Data</h>;
    }
    return slide;
    // return <div>{slide}<p>{type}</p></div>;
}

export default Slide