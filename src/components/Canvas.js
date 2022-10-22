import { Grid } from "@mui/material";
import CanvasDraw from "@win11react/react-canvas-draw";
import { useRef } from 'react';
 
function Canvas() {
    const canvas = useRef();
    return (
        <>
        <CanvasDraw
            ref={canvas}
            canvasHeight={this.props.height * window.innerHeight}
            canvasWidth={this.props.width * window.innerWidth}
            style={{
                boxShadow:
                    "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
            }} lazyRadius={0} brushRadius={5}/>
            {/* <button style={{width:'100%'}}
            onClick={() => {
              canvas.current.eraseAll();
            }}
          >
            Erase
          </button> */}
        </>
    )
}


export default Canvas;