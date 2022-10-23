import { useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import Navbar from "../navbar/Navbar";

import { getDatabase, ref, get, set, child, connectDatabaseEmulator } from "firebase/database";

import Slide from "./Slide";

function Edit() {
    const [data, setData] = useState(null);
    const [panelIndex, setPanelIndex] = useState(0);

    useEffect(() => {
        const getPanelData = async () => {
            let db = getDatabase();
            let panelDataRef = ref(db, "panel_data");
            let snap = await get(panelDataRef);
            let data = snap.val();

            setData(data)
        }

        getPanelData()
    }, [])

    if (data == null) {
        return <></>
    }

    let height = data.height;
    let width = data.width;
    let panel = data.panels[panelIndex];

    let numSlides = Object.keys(panel.slides).length

    console.log(data)

    function shiftSlide(index, diff) {
        if (index + diff >= 0 && index + diff < numSlides) {
            setData((prev) => {
                let prevPanel = prev.panels[panelIndex]
                let temp1 = prevPanel.slides[index]
                let temp2 = prevPanel.slides[index+diff]

                let copy = {
                    ...prev,
                    panels: [
                        ...prev.panels,
                    ]
                }
                
                copy.panels[panelIndex].slides[index] = temp2
                copy.panels[panelIndex].slides[index+diff] = temp1

                console.log("copy", copy)

                return copy
            })
        }
    }

    return (
        <div sx={{}}>
            <Navbar sx={{zIndex: 0, position: "sticky"}}/>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "100px",
                width: "99vh", //89 for the slides and 10 for the side
                margin: "auto"
            }}>
                {
                    [...Object.keys(panel.slides)].map((key) => {
                        let slide = panel.slides[key];

                        return (
                            <Slide 
                                slideData={slide} 
                                data={data} 
                                index={parseInt(key)} 
                                key={key}
                                callbacks={{
                                    shiftSlide: shiftSlide
                                }}
                            />
                        ) 
                    })  
                }
            </Box>
        </div>
    )
}

export default Edit