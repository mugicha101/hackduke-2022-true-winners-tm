import CanvasDraw from '@win11react/react-canvas-draw';
import { useRef, useState, useEffect } from 'react';
import { Button, Box, Grid } from "@mui/material";

function CanvasSlide({panelIndex, slideIndex, data={}, canvases={}, canvasRefs={}}) {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    let id = `${panelIndex},${slideIndex}`;
    let canvas = canvases[id];
    let canvasRef = canvasRefs[id].current;
    console.log(canvasRef);

    useEffect(() => {
      setHeight(ref.current.offsetHeight);
      setWidth(ref.current.offsetWidth);
  
      // 👇️ if you need access to parent
      // of the element on which you set the ref
      // console.log(ref.current.parentElement);
      // console.log(ref.current.parentElement.offsetHeight);
      // console.log(ref.current.parentElement.offsetWidth);
    }, []);

    return (
      <div ref={ref} 
        style={{
          width:"100%",
          height:"100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        {canvases[id]}

        <Grid container>
          <Grid item xs={4}>
            <Button 
              variant="outlined"
              fullWidth
              sx={{borderRadius: 0, height: "100%"}}
              onClick={() => {
                // console.log(canvas.current.getSaveData());
              }}>
                Save
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button 
              variant="outlined"
              fullWidth
              sx={{borderRadius: 0, height: "100%"}}
              onClick={() => {
                if (canvasRef) canvasRef.undo();
              }}
            >
              Undo
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button 
              variant="outlined"
              fullWidth
              sx={{borderRadius: 0, height: "100%"}}
              onClick={() => {
                if (canvasRef) canvasRef.eraseAll();
              }}
            >
              Erase
            </Button>
          </Grid>
        </Grid>
      </div>
    )
}

export default CanvasSlide;