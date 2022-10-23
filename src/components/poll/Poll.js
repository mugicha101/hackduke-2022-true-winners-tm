import { useRef, useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import './Poll.css';

import { getDatabase, ref, get, set, child, connectDatabaseEmulator } from "firebase/database";

function Poll({panel, slide}) {
    const [type, setType] = useState("");
    const [data, setData] = useState({});
    const [picked, setPicked] = useState(false);

    useEffect(() => {
        const getPanelData = async () => {
            let db = getDatabase();
            let panelDataRef = ref(db, "panel_data");
            let snap = await get(panelDataRef);
            let data = snap.val();

            let currPanel = data.panels[panel];
            let currSlide = currPanel.slides[slide];

            setType(currSlide.type);
            setData(currSlide);
    
            // console.log("type " + type + " poll " + poll);

        }

        getPanelData()
    }, [])

    function addVote(key) {
        let db = getDatabase();
        let voteRef = ref(db, `panel_data/panels/${panel}/slides/${slide}/poll_options/${key}/votes`)
        set(voteRef, data.poll_options[key].votes+1)
        setPicked(true)
    }

    if (type !== "poll") {
        return <div className="Poll">Not a valid poll!</div>
    }

    if (picked) {
        return <div className="Poll">Thank you for voting!</div>
    }

    return (
        <div className="Poll">
            <h2 style={{textAlign: "center"}}>{data.question}</h2>
            <Grid container>
                {
                    [...Object.keys(data.poll_options)].map((key) => {
                        let poll_options = data.poll_options[key]
                        return <Grid item xs={12} key={key}>
                            <Button fullWidth onClick={() => addVote(key)}>{poll_options.text}</Button>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    )
}

export default Poll;