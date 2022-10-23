import CanvasDraw from '@win11react/react-canvas-draw';
import { useRef, useState, useEffect } from 'react';
import { Button, Box, Grid } from "@mui/material";

function CanvasSlide({panelIndex, slideIndex, data={}, canvasRefs={}}) {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const canvas = useRef();
    canvasRefs[panelIndex] = canvas;

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
        <CanvasDraw
            ref={canvas}
            canvasWidth={width}
            canvasHeight={height}
            hideGrid
            immediateLoading
            lazyRadius={0} brushRadius={2}
        />

        <Grid container>
          <Grid item xs={6}>
            <Button 
              variant="outlined"
              fullWidth
              sx={{borderRadius: 0, height: "100%"}}
              onClick={() => {
                canvas.current.undo();
              }}
            >
              Undo
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="outlined"
              fullWidth
              sx={{borderRadius: 0, height: "100%"}}
              onClick={() => {
                canvas.current.eraseAll();
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