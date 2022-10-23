import { useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Sidebar from "./Sidebar";
import "../../App.css";

import { getDatabase, ref, get, set, child, connectDatabaseEmulator } from "firebase/database";

import Slide from "./Slide";

function Edit() {
    const [data, setData] = useState(null);
    const [panelIndex, setPanelIndex] = useState(0);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const getPanelData = async () => {
            let db = getDatabase();
            let panelDataRef = ref(db, "panel_data");
            let snap = await get(panelDataRef);
            let data = snap.val();

            setData(data)
        }

        getPanelData()
    }, [])

    if (data == null) {
        return <></>
    }

    let height = data.height;
    let width = data.width;
    let panel = data.panels[panelIndex];

    let numPanels = Object.keys(data.panels).length
    let numSlides = Object.keys(panel.slides).length

    let selectedData = panel.slides[selected]

    function handlePanelIndex(index) {
        if (index === "") {
            setPanelIndex(0)
        } else if (!isNaN(index)) {
            if (index >= numPanels) {
                setPanelIndex(numPanels-1)
            } else if (index >= 0) {
                setPanelIndex(parseInt(index))
            }
        }
    }

    function handleSelected(index) {
        setSelected(index);
    }

    function shiftSlide(index, diff) {
        if (index + diff >= 0 && index + diff < numSlides) {
            setData(prev => {
                let prevPanel = prev.panels[panelIndex]
                console.log(prevPanel);

                let temp1 = prevPanel.slides[index]
                let temp2 = prevPanel.slides[index+diff]

                let copy = {
                    ...prev
                }
                
                copy.panels[panelIndex].slides[index] = temp2
                copy.panels[panelIndex].slides[index+diff] = temp1

                return copy
            })
        }
    }

    function addSlide(type) {
        let index = selected;
        if (index >= 0 && index < numSlides) {
            setData(prev => {
                let prevPanel = prev.panels[panelIndex]

                let copy = {
                    ...prev
                }



                let newSlide;

                switch (type) {
                    case "canvas":
                        newSlide={type: "canvas"};
                        break;
                    case "image":
                        newSlide={img_url: "", type: "image"};
                        break;
                    case "poll":
                        newSlide={poll_options: [{text:"A", votes:0},{text:"B", votes:0},{text:"C", votes:0},{text:"D", votes:0}], question: "", type: "poll"}
                        break;
                    case "text":
                        newSlide={text_boxes: [{text:"PLACEHOLDER", height: 10, width: 50, x: 0, y: 0}], type: "text"}
                        break;
                    case "poll_results":
                        newSlide={p_id: 0, sl_id: 0, type: "poll_results"}
                        break;
                    default:
                        newSlide={text: "No data"};
                }
                
                let updatedSlides = [];
                for (var i = 0; i < prev.panels[panelIndex].slides.length + 1; i++) {
                    if (i < index + 1) {
                        updatedSlides.push(prevPanel.slides[i]);
                    } else if (i == index + 1) {
                        updatedSlides.push(newSlide);
                    } else {
                        updatedSlides.push(prevPanel.slides[i-1]);
                    }
                    setSelected(index + 1);
                }

                copy.panels[panelIndex].slides = updatedSlides;

                numSlides++;

                return copy
            })
        }
    }

    function handleURL(index, url) {
        setData(prev => {
            let copy = {
                ...prev
            }
            
            copy.panels[panelIndex].slides[index].img_url = url

            return copy
        })
    }

    function handlePanel(index, value) {
        setData(prev => {
            let copy = {
                ...prev
            }
            
            if (!isNaN(value)) {
                let newVal;
                if (value === "") {
                    newVal = value
                } else if (value < 0) {
                    newVal = 0
                } else if (value >= numPanels) {
                    newVal = numPanels - 1
                } else {
                    newVal = value
                }

                copy.panels[panelIndex].slides[index].p_id = newVal;
            }


            return copy
        })
    }

    function handleSlide(panel, index, value) {
        setData(prev => {
            let copy = {
                ...prev
            }

            if (!isNaN(value)) {
                let newVal;
                let numSlidesTarget = Object.keys(data.panels[panel].slides).length

                if (value === "" || value === -1) {
                    newVal = ""
                } else if (value < 0) {
                    newVal = 0
                } else if (value >= numSlidesTarget) {
                    newVal = numSlidesTarget - 1
                } else {
                    newVal = value
                }

                copy.panels[panelIndex].slides[index].sl_id = newVal;
            }


            return copy
        })
    }

    function handleText(index, optionIndex, text) {
        setData(prev => {
            let copy = {
                ...prev
            }
            
            copy.panels[panelIndex].slides[index].poll_options[optionIndex].text = text

            return copy
        })
    }

    function saveData() {
        let db = getDatabase();
        let panelRef = ref(db, `panel_data/`)
        set(panelRef, data);
    }

    return (
        <div className="edit">
            <Navbar 
                data={data}
                panelIndex={panelIndex}
                callbacks={{handlePanelIndex: handlePanelIndex, saveData: saveData, addSlide: addSlide}}
            />
            <Box sx={{
                display: "flex",
                "background-color": "rgb(0, 66, 88)"
            }}>
                <Sidebar selected={selected} slideData={selectedData} callbacks={{
                    handleURL: handleURL,
                    handleText: handleText,
                    handlePanel: handlePanel,
                    handleSlide: handleSlide,
                }}/>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "100px",
                    width: "99vh", //89 for the slides and 10 for the side
                    margin: "auto",
                    "background-color": "white",
                    "padding-left": "5%",
                    "padding-right": "5%"
                }}>
                    {
                        [...Object.keys(panel.slides)].map((key) => {
                            let slide = panel.slides[key];

                            return (
                                <Slide 
                                    slideData={slide} 
                                    data={data} 
                                    index={parseInt(key)} 
                                    selected={selected}
                                    key={key}
                                    callbacks={{
                                        shiftSlide: shiftSlide,
                                        handleSelected: handleSelected
                                    }}
                                />
                            ) 
                        })  
                    }
                </Box>
            </Box>
            
        </div>
    )
}

export default Edit