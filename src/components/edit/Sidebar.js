import { Box } from "@mui/material"

import CanvasBar from './sidebar_types/CanvasBar';
import ImageBar from './sidebar_types/ImageBar';
import PollBar from './sidebar_types/PollBar';
import ResultBar from './sidebar_types/ResultBar';
import TextBar from './sidebar_types/TextBar';

function Sidebar({ selected, slideData, callbacks }) {
    let handleURL = callbacks.handleURL;
    let handleText = callbacks.handleText;
    let handlePanel = callbacks.handlePanel;
    let handleSlide = callbacks.handleSlide;

    let sidebar;

    switch (slideData.type) {
        case "canvas":
            sidebar = <CanvasBar />
            break;
        case "image":
            sidebar = <ImageBar selected={selected} slideData={slideData} handleURL={handleURL}/>
            break;
        case "poll":
            sidebar = <PollBar selected={selected} slideData={slideData} handleText={handleText}/>
            break;
        case "text":
            sidebar = <TextBar />
            break;
        case "poll_results":
            sidebar = <ResultBar selected={selected} slideData={slideData} handlePanel={handlePanel} handleSlide={handleSlide}/>
            break;
        default:
            sidebar = <h1>No data</h1>
    }

    return (
        <Box sx={{
            width: "20%",
            boxShadow: "0px 0px 10px 0px",
            padding: "20px",
            "background-color": "rgb(0, 191, 255)"
        }}>
            {sidebar}
        </Box>
    )
}

export default Sidebar