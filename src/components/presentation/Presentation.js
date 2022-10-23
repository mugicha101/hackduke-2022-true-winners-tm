import { useRef, useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CanvasDraw from '@win11react/react-canvas-draw';
import React from 'react';

import Slide from "./Slide";

import { getDatabase, ref, get, set, child, connectDatabaseEmulator } from "firebase/database";

function Presentation() {
    const [data, setData] = useState(null);
    const [indexes, setIndexes] = useState([]);
    const canvasRefs = {}

    useEffect(() => {
        const getPanelData = async () => {
            let db = getDatabase();
            let panelDataRef = ref(db, "panel_data");
            let snap = await get(panelDataRef);
            let data = snap.val();

            setData(data)
            setIndexes(new Array(data.width * data.height).fill(0));
        }

        getPanelData()
    }, [])

    function changeSlide(panel, diff, numSlides) {
        let currIndex = indexes[panel];
        if (canvasRefs[panel] && canvasRefs[panel].current) {
            canvasRefs[panel].current.eraseAll();
        }
        
        if (currIndex + diff >= 0 && currIndex + diff < numSlides) {
            setIndexes((prev) => {
                let newIndexes = [...prev]
                newIndexes[panel] += diff
                return newIndexes
            })
        }
    }

    if (data == null) {
        return <></>
    }

    return (
        <Grid container columns={data.width} sx={{
            width: "178vh", //16:9 aspect ratio
            height: "100vh",
        }}>
            {
                [...Object.keys(data.panels)].map((key) => {
                    let panel = data.panels[key]
                    let slide = panel.slides[indexes[key]]
                    let numSlides = Object.keys(panel.slides).length

                    return <Grid item xs={1} key={key} sx={{
                        height: `${100 / data.height}%`
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            borderStyle: "solid solid none none"
                        }}>
                            <Box sx={{
                                // backgroundColor: "green",
                                height: "90%",
                                width: "100%",
                                overflow: "clip",
                            }}>
                                <Slide panelIndex={key} slideIndex={indexes[key]} type={slide.type} data={slide} canvasRefs={canvasRefs}/>
                            </Box>
                            <Grid container sx={{height: "10%", width: "100%"}}>
                                <Grid item xs={6}>
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        disabled={indexes[key] == 0}
                                        sx={{
                                            borderRadius: 0, 
                                            height: "100%"
                                        }}
                                        onClick={(e) => changeSlide(key, -1, numSlides)}
                                    >
                                        <ChevronLeftIcon/>
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        disabled={indexes[key] == numSlides - 1}
                                        sx={{
                                            borderRadius: 0, 
                                            height: "100%"
                                        }}
                                        onClick={(e) => changeSlide(key, 1, numSlides)}
                                    >
                                        <ChevronRightIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                })
            }
        </Grid>
    )
}

export default Presentation;