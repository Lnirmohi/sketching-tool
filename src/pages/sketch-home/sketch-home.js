import { useRef, useEffect, useCallback, useState } from "react";
import { Stage, Graphics } from "@saitonakamura/react-pixi";
import * as PIXI from "pixi.js";

function SketchHome() {

    const lastPos = {x: 0, y: 0};
    let isDrawing = false;

    const draw = useCallback((graphics) => {
        console.log(graphics);


        graphics.beginFill(0xFFFFFF, 1)
        graphics.drawRect(0, 0, window.innerWidth, window.innerWidth)
        graphics.endFill();

        graphics.on("mousedown", (e) => {
            
            if(isDrawing) {
                return;
            } 
            const {x, y} = e.data.global;
            
            lastPos.x = x;
            lastPos.y = y;
            
            isDrawing = true;
        });

        graphics.on("mouseup",  (e) => {
            isDrawing = false;
            
        });

        graphics.on("mousemove", (e) => {

            if(!isDrawing) {
                return;
            }

            const {x, y} = e.data.global;
            const target = e.target;
            target.lineStyle({
                width: 5,
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
            // target.endFill();
            
            lastPos.x = currentPosition.x;
            lastPos.y = currentPosition.y;
            
        });

    }, []);

    return (
        <div id="sketch-container">
            <h1>Sketch Homes</h1>
            <Stage
                width={window.innerWidth} 
                height={window.innerHeight} 
                options={{ 
                    backgroundColor: 0xffffff, 
                    antialias: true,
                    interactive: true
                }}
            >
                <Graphics 
                    draw={draw}
                    interactive={true}
                />
            </Stage>
        </div>
    );
}

export default SketchHome;