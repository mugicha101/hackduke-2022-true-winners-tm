import { Typography } from "@mui/material"

function TextSlide({data={}}) {
    let textBoxes = data.text_boxes
    let one = textBoxes[0]

    return <Typography
        sx={{
            position: "relative",
            left: `${100 * one.x}%`,
            top: `${100 * one.y}%`,
            maxWidth: `${100 * one.width}%`
        }}
    >
        {one.text}
    </Typography>
}

export default TextSlide;