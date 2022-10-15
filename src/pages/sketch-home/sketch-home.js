import { useRef, useEffect, useCallback, useState, useContext } from "react";
import { Stage, Graphics } from "@saitonakamura/react-pixi";
import * as PIXI from "pixi.js";

import "./sketch-home.css";
import { AuthContext } from "../../services/authenticate";
import { saveSketch } from "../../services/sketch-service";
import SketchList from "../sketch-list/sketch-list";
import SketchName from "../../sketch-name/sketch-name";

function SketchHome() {

    const stageRef = useRef();
    const graphicsRef = useRef();
    const auth = useContext(AuthContext);
    const [sketchName, setSketchname] = useState("");
    const [savedSketchName, setSavedSketchname] = useState("");
    const [sketches, setSketches] = useState([...auth.auth.sketches]);

    const lastPos = {x: 0, y: 0};
    let isDrawing = false;

    const draw = useCallback((graphics) => {
        console.log(graphics);

        graphics.beginFill(0xFFFFFF, 1)
        graphics.drawRect(0, 0, 1500, 800)
        graphics.endFill();

        graphics.on("mousedown", mdown);
        graphics.on("mouseup",  mup);
        graphics.on("mousemove", mmove);
        graphics.on("mouseout", mout);
        
        console.log(stageRef);
        console.log(auth);
    }, []);

    const mout = (e) => {
        isDrawing = false;
    };

    const mdown = (e) => {
            
        if(isDrawing) {
            return;
        } 
        const {x, y} = e.data.global;
        
        lastPos.x = x;
        lastPos.y = y;
        
        isDrawing = true;
    };

    const mup = (e) => {
        isDrawing = false;
        console.log(stageRef, e);
    };

    const mmove = (e) => {

        if(!isDrawing) {
            return;
        }

        const {x, y} = e.data.global;
        const target = e.target;
        target.lineStyle({
            width: 10,
            cap: PIXI.LINE_CAP.BUTT,
            join: PIXI.LINE_JOIN.BEVEL,
            color: 0xFBE0,
            native: true
            
        });

        const currentPosition = {};

        currentPosition.x = x;
        currentPosition.y = y;

        target.beginFill(0xffffff, 1);
        target.moveTo(lastPos.x, lastPos.y);
        target.lineTo(currentPosition.x, currentPosition.y);
        target.endFill();
        
        lastPos.x = currentPosition.x;
        lastPos.y = currentPosition.y;

    };

    const handleSketchSave = () => {

        const graphicsObj = graphicsRef.current;

        const app = stageRef.current.app;

        const canvas = app.renderer.plugins.extract.canvas(graphicsObj);

        const imageData = canvas.toDataURL();

        const token = auth.auth.token;

        saveSketch(imageData, token)
            .then(result => {
                const {data, status} = result;
                
                if(status === 200) {
                    setSketches(sketches.concat([data]));
                }
            })
            .catch(error => {
                console.log("Error while saving: ", error);
            });
    };

    const handleSketchNameChange = ({target}) => {
        const {value} = target;
        setSketchname(value);
    };

    const handleNameSave = (e) => {
        setSavedSketchname(sketchName);
    };

    return (
        <div className="sketch-container">
            <div className="sketch-header">
                <h1>Sketch Home</h1>
                <p className="user">{auth.auth.username}</p>
            </div>

            <SketchName 
                sketchName={sketchName} 
                handleSketchSave={handleSketchSave} 
                handleSketchNameChange={handleSketchNameChange}
                handleNameSave={handleNameSave}
            />
            
            <div className="main-area">
                <div className="stage-container">
                    <Stage
                        width={1400}
                        height={700}
                        options={{
                            backgroundColor: 0xffffff,
                            antialias: true,
                            interactive: true
                        }}
                        ref={stageRef}
                    >
                        <Graphics
                            draw={draw}
                            interactive={true}
                            ref={graphicsRef}
                        />
                    </Stage>
                </div>
                <div className="sidebar">
                    <p className="sidebar__heading">User Sketches</p>
                    <SketchList sketches={sketches} />
                </div>
            </div>
        </div>
    );
}

export default SketchHome;