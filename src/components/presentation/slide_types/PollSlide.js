import { Box, Divider, Typography } from "@mui/material";
import { useRef, useState, useEffect } from 'react';

function PollSlide({panelIndex, slideIndex, data={}, canvases={}, canvasRefs={}}) {
    let question = data.question;
    let poll_options = data.poll_options;

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%"
        }}>
            <Typography 
                align="center"
                sx={{
                    fontSize: "5vh",
                    width: "100%"
                }}
            >
                {question}
            </Typography>
            <Divider color="black"/>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                flexGrow: 10
            }}>
                {
                    [...Object.keys(poll_options)].map((key) => {
                        let text = poll_options[key].text;

                        return <Typography 
                            align="center"
                            sx={{
                                fontSize: "2.5vh",
                                width: "100%"
                            }}
                            key={key}
                        >
                            {`${parseInt(key)+1}. ${text}`}
                        </Typography>
                    })
                }
            </Box>
            
        </Box>
    )
}

export default PollSlide;