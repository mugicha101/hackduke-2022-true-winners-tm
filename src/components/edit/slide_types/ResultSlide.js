import { useRef, useState, useEffect } from "react"
import { Box, Divider, Typography } from "@mui/material";
import { getDatabase, ref, get, onValue, child, connectDatabaseEmulator } from "firebase/database";
import { PieChart } from 'react-minimal-pie-chart';

function ResultSlide({slideData={}, data={}}) {
    let panel = parseInt(slideData.p_id);
    let slide = parseInt(slideData.sl_id);

    
    let pollData;

    if (!(panel < 0 || panel > data.panels.length || data.panels[panel] == null || data.panels[panel].slides[slide] == null)) {
        pollData = data.panels[panel].slides[slide];
    }

    if (pollData == null || pollData.type !== "poll") {
        return <p style={{textAlign: "center"}}>No poll exists at this location</p>
    }

    let poll_options = pollData.poll_options;

    let pieData = []
    let colors = ["#1976d2", "#A30015", "#BD2D87", "#D8A47F", "#DF99F0"]
    for (let key in poll_options) {
        let entry = poll_options[key]
        pieData.push({title: entry.text, value: entry.votes, color: colors[key], key: parseInt(key)+1})
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
        }}>
            <Typography 
                align="center"
                sx={{
                    fontSize: "5vh",
                    width: "100%"
                }}
            >
                {pollData.question}
            </Typography>
            <Divider color="black"/>
            <PieChart 
                data={pieData} 
                label={({ dataEntry }) => `${parseInt(dataEntry.key)}: ${dataEntry.value}`}
                labelStyle={{
                    fontSize: '0.75vh',
                    fontWeight: 'bold'
                }}
                labelPosition={112}
                radius="30"
                // viewport="10"

            />
        </Box>
    )
}

export default ResultSlide;