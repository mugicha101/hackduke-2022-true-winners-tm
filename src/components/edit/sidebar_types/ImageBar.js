import { Box, Typography, Divider, TextField } from "@mui/material";

function ImageBar({selected, slideData, handleURL}) {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Typography fontSize="5vh" >Image</Typography>
            <Divider />
            <TextField 
                label="Image URL"
                value={slideData.img_url}
                onChange={(e) => handleURL(selected, e.target.value)}
                sx={{
                    marginTop: "15px"
                }}
            />
        </Box>
    )
}

export default ImageBar