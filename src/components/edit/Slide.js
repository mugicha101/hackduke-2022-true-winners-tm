import { Box, Button, Typography, Divider } from "@mui/material"

import CanvasSlide from "./slide_types/CanvasSlide.js";
import ImageSlide from "./slide_types/ImageSlide.js";
import PollSlide from "./slide_types/PollSlide.js";
import TextSlide from "./slide_types/TextSlide.js";
import ResultSlide from "./slide_types/ResultSlide.js";

import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Slide({slideData, data, index, selected, callbacks}) {
    let type = slideData.type;
    
    let shiftSlide = callbacks.shiftSlide
    let handleSelected = callbacks.handleSelected

    let slide;
    switch (type) {
        case "canvas":
            slide = <CanvasSlide slideData={slideData}/>;
            break;
        case "image":
            slide = <ImageSlide slideData={slideData}/>;
            break;
        case "poll":
            slide = <PollSlide slideData={slideData}/>;
            break;
        case "text":
            slide = <TextSlide slideData={slideData}/>;
            break;
        case "poll_results":
            slide = <ResultSlide slideData={slideData} data={data}/>;
            break;
        default:
            slide = <h>No Data</h>;
    }
    return (
        <Box sx={{
            display: "flex",
            alignItems: "flex-start",
            height: "50vh",
            borderStyle: "solid",
            borderColor: selected === index ? "#BD2D87" : "black",
            borderWidth: selected === index ? "3px" : "3px"
        }}>
            <Box sx={{
                width: "89vh", 
                height: "100%",
                borderStyle: "none solid none none",
            }}>
                {slide}       
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "10vh",
                height: "100%",
                backgroundColor: "#7BB0FE",
            }}>
                <Box sx={{}}>
                    <Typography fontSize="5vh" align="center" fontWeight="">
                        {index+1}
                    </Typography>
                </Box>
                <Divider color="black"/>
                <Box sx={{flexGrow: 1}}/>
                <Button variant="contained" onClick={() => handleSelected(index)} sx={{
                    borderRadius: 0
                }}>
                    <EditIcon/>
                </Button>
                <Button variant="contained" onClick={() => shiftSlide(index, -1)} sx={{
                    borderRadius: 0
                }}>
                    <KeyboardArrowUpIcon/>
                </Button>
                <Button variant="contained" onClick={() => shiftSlide(index, 1)} sx={{
                    borderRadius: 0
                }}>
                    <KeyboardArrowDownIcon/>
                </Button>
            </Box>
        </Box>
        
    );
}

export default Slide