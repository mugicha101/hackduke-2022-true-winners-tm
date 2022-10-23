import { Box, Typography, Divider, TextField } from "@mui/material";

function ResultBar({selected, slideData, handlePanel, handleSlide}) {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Typography fontSize="5vh" >Poll Results</Typography>
            Add the panel and slide location of the poll you want to display results for!
            <Divider />
            <TextField 
                label="Poll Panel"
                value={slideData.p_id}
                onChange={(e) => handlePanel(selected, e.target.value)}
                sx={{
                    marginTop: "15px"
                }}
            />
            <TextField 
                label="Poll Slide"
                value={slideData.sl_id === "" ? "" : slideData.sl_id+1}
                onChange={(e) => handleSlide(selected, slideData.p_id, e.target.value-1)}
                sx={{
                    marginTop: "15px"
                }}
            />
        </Box>
    )
}

export default ResultBar