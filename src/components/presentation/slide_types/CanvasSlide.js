import CanvasDraw from '@win11react/react-canvas-draw';
import { useRef } from 'react';

function CanvasSlide({data={}}) {
    let canvas = useRef();
    return <div>
        <CanvasDraw
            ref={canvas}
            hideGrid
            canvasWidth="100%"
            canvasHeight="100%"
            lazyRadius={0} brushRadius={5}/>
            <button style={{width:'100%'}}
            onClick={() => {
              canvas.current.eraseAll();
            }}
          >
            Erase
          </button>
    </div>
}

export default CanvasSlide;