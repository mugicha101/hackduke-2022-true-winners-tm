import { useRef, useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import './Poll.css';

import { getDatabase, ref, get, set, child, connectDatabaseEmulator } from "firebase/database";

function Navbar() {
    const [type, setType] = useState("");
    const [data, setData] = useState({});
    const [picked, setPicked] = useState(false);

    useEffect(() => {
        const getPanelData = async () => {
            let db = await getDatabase();
            let panelDataRef = await ref(db, "panel_data");
            let snap = await get(panelDataRef);
            let data = await snap.val();

            let currPanel = data.panels[panel];
            let currSlide = currPanel.slides[slide];

            setType(currSlide.type);
            setData(currSlide);
    
            // console.log("type " + type + " poll " + poll);

        }

        getPanelData()
    }, [])


    return (
        // <div className="Poll">
        //     <h2 style={{textAlign: "center"}}>{data.question}</h2>
        //     <Grid container>
        //         {
        //             [...Object.keys(data.poll_options)].map((key) => {
        //                 let poll_options = data.poll_options[key]
        //                 return <Grid item xs={12} key={key}>
        //                     <Button fullWidth onClick={() => addVote(key)}>{poll_options.text}</Button>
        //                 </Grid>
        //             })
        //         }
        //     </Grid>
        // </div>
        <div styles={{width:"100vw"}}>
            <Grid container>
                <Button>Width</Button>
                <Button>Height</Button>
                <Button>Current Panel</Button>
                <Button>Save</Button>
                <Button>Add</Button>
            </Grid>
        </div>
    )
}

export default Navbar;