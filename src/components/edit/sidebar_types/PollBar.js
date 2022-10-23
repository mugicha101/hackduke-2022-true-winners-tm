import { Box, Typography, Divider, TextField } from "@mui/material";

function PollBar({selected, slideData, handleText}) {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Typography fontSize="5vh">Poll</Typography>
            <Divider />
            {
                [...Object.keys(slideData.poll_options)].map(key => {
                    let poll_options = slideData.poll_options[key]

                    return <TextField 
                        label={`Option ${parseInt(key)+1}`}
                        value={poll_options.text}
                        onChange={(e) => handleText(selected, key, e.target.value)}
                        sx={{
                            marginTop: "15px"
                        }}
                        key={key}
                    />
                })
            }
            
        </Box>
    )
}

export default PollBar