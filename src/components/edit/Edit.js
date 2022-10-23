import { useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";

import { getDatabase, ref, get, set, child, connectDatabaseEmulator } from "firebase/database";

import Slide from "./Slide";

function Edit() {
    const [data, setData] = useState({});
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

    let height = data.height;
    let width = data.width;
    let panel = data.panels[panelIndex];

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            {
                [...Object.keys(panel.slides)].map((key) => {
                    let slide = panel.slides[key];

                    return (
                        <Slide data={slide}/>
                    ) 
                })  
            }
        </Box>
    )
}

export default Edit