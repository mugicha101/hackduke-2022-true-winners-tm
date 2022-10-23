import { useRef, useState, useEffect } from "react";
import { Box, Grid, Button, TextField, Menu, MenuItem } from "@mui/material";
import "./Navbar.css"


import { getDatabase, ref, get, set, child, connectDatabaseEmulator } from "firebase/database";

function Navbar() {
    let buttonText = ["Width", "Height", "Current Panel", "Save", "Add"];

    function navButton(text) {
        return <Button 

            className="item"
            sx={{
                borderRadius: 0
            }}
        >
            {text}
        </Button>
    }

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
                    <TextField label="Width"></TextField>
                </div>
                <div className="item">
                    <TextField label="Height"></TextField>
                </div>
                <div className="item">
                    <TextField label="Panel Index"></TextField>
                </div>

                {navButton("Save")}

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
                    <MenuItem onClick={handleClose}>Text</MenuItem>
                    <MenuItem onClick={handleClose}>Image</MenuItem>
                    <MenuItem onClick={handleClose}>Canvas</MenuItem>
                    <MenuItem onClick={handleClose}>Poll</MenuItem>
                    <MenuItem onClick={handleClose}>Results</MenuItem>
                </Menu>


            </div>
        </div>
    )
}

export default Navbar;