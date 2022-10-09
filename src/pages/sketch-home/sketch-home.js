import { useRef, useEffect, useCallback, useState, useContext } from "react";
import { Stage, Graphics } from "@saitonakamura/react-pixi";
import * as PIXI from "pixi.js";

import "./sketch-home.css";
import { AuthContext } from "../../services/authenticate";

function SketchHome() {

    const stageRef = useRef();
    const auth = useContext(AuthContext);

    const lastPos = {x: 0, y: 0};
    let isDrawing = false;

    const draw = (graphics) => {
        console.log(graphics);

        graphics.beginFill(0xFFFFFF, 1)
        graphics.drawRect(0, 0, 1600, 800)
        graphics.endFill();

        graphics.on("mousedown", mdown);
        graphics.on("mouseup",  mup);
        graphics.on("mousemove", mmove);
        graphics.on("mouseout", mout);
        
        console.log(stageRef);
        console.log(auth);
    };

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
        saveSketchAsImage(e.target);
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

    const saveSketchAsImage = (graphicsObj) => {

        const app = stageRef.current.app;

        app.renderer.plugins.extract.canvas(graphicsObj).toBlob((blob) => {
            
            const newImg = document.createElement('img');
            const url = URL.createObjectURL(blob);
          
            newImg.onload = () => {
              // no longer need to read the blob so it's revoked
              URL.revokeObjectURL(url);
            };
          
            newImg.src = url;
            console.log(newImg);
            // document.body.appendChild(newImg);
          });
    };

    return (
        <div className="sketch-container">
            <div className="sketch-header">
                <h1>Sketch Home</h1>
                <p className="user">{auth.auth.username}</p>
            </div>
            <div className="stage-container">
                <Stage
                    width={1600}
                    height={800}
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
                    />
                </Stage>
            </div>
        </div>
    );
}

export default SketchHome;