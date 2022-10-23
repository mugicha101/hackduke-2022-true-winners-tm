import { useRef, useState, useEffect } from "react";
import { Box, Grid, Button, TextField, Menu, MenuItem } from "@mui/material";
import "./Navbar.css"

import { getDatabase, ref, get, set, child, connectDatabaseEmulator } from "firebase/database";

function Navbar({ data, panelIndex, callbacks }) {
    let handlePanelIndex = callbacks.handlePanelIndex
    let saveData = callbacks.saveData
    let addSlide = callbacks.addSlide

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div className="Navbar">
            <div className="container">
                <div className="item">
                    <TextField label="Width" value={data.width} disabled/>
                </div>
                <div className="item">
                    <TextField label="Height" value={data.height} disabled/>
                </div>
                <div className="item">
                    <TextField 
                        label="Panel Index"
                        value={panelIndex}
                        onChange={(e) => handlePanelIndex(e.target.value)}
                    />
                </div>

                <Button className="item" onClick={saveData}>
                    Save
                </Button>

                <Button className="item"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Add
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {addSlide("text"); setAnchorEl(null);}}>Text</MenuItem>
                    <MenuItem onClick={() => {addSlide("image"); setAnchorEl(null);}}>Image</MenuItem>
                    <MenuItem onClick={() => {addSlide("canvas"); setAnchorEl(null);}}>Canvas</MenuItem>
                    <MenuItem onClick={() => {addSlide("poll"); setAnchorEl(null);}}>Poll</MenuItem>
                    <MenuItem onClick={() => {addSlide("poll_results"); setAnchorEl(null);}}>Results</MenuItem>
                </Menu>


            </div>
        </div>
    )
}

export default Navbar;