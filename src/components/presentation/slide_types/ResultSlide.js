import { useRef, useState, useEffect } from "react"
import { Box, Divider, Typography } from "@mui/material";
import { getDatabase, ref, get, onValue, child, connectDatabaseEmulator } from "firebase/database";
import { PieChart } from 'react-minimal-pie-chart';

function ResultSlide({panelIndex, slideIndex, data={}, canvases={}, canvasRefs={}}) {
    const [pollData, setPollData] = useState(null);

    let panel = data.p_id;
    let slide = data.sl_id;
    
    useEffect(() => {
        let db = getDatabase();
        let pollDataRef = ref(db, `panel_data/panels/${panel}/slides/${slide}`);
        let detach = onValue(pollDataRef, (snap) => {
            setPollData(snap.val());
        })

        return () => detach()
    }, [])

    if (pollData == null) {
        return <></>
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
            
            
            {/* {
                [...Object.keys(poll_options)].map((key) => {
                    let votes = poll_options[key].votes;
                    return <Typography 
                        align="center"
                        sx={{
                            fontSize: "2.5vh",
                            width: "100%"
                        }}
                        key={key}
                    >
                        {`${parseInt(key)+1}. ${votes}`}
                    </Typography>
                })
            } */}
        </Box>
    )
}

export default ResultSlide;