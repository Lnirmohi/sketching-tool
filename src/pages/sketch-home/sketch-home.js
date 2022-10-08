import { useRef, useEffect, useCallback, useState } from "react";
import { Stage, Graphics } from "@saitonakamura/react-pixi";

function SketchHome() {

    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPosition, setLastPosition] = useState({x: 0, y: 0})

    const draw = useCallback((graphics) => {
        console.log(graphics);

        let isDraw = false;
        let lastPos = {x: 0, y: 0}

        graphics.beginFill(0xFFFFFF, 1)
        graphics.drawRect(0, 0, window.innerWidth, window.innerWidth)
        graphics.endFill();

        graphics.on("mousedown", (e) => {
        
            const {x, y} = e.data.global;
            
            lastPos.x = x;
            lastPos.y = y;
            
            isDraw = true;
            
        });

        graphics.on("mouseup",  (e) => {
            isDraw = false;
            
        });

        graphics.on("mousemove", (e) => {

            if(isDraw) {
                const {x, y} = e.data.global;
                const target = e.target;
                target.lineStyle(10);
    
                const currentPosition = {};
    
                currentPosition.x = x;
                currentPosition.y = y;
            
                target.beginFill(0xffffff, 1);
                target.moveTo(lastPos.x, lastPos.y);
                target.lineTo(currentPosition.x, currentPosition.y);
                target.endFill();
            }
        });

    }, []);


    const mdown = (e) => {
        
        const {x, y} = e.data.global;
        
        setLastPosition({x, y});
        
        setIsDrawing(true);
        console.log("mousedown", isDrawing, lastPosition);
    };

    const mup = (e) => {
        setIsDrawing(false);
        console.log("mouseup", isDrawing, lastPosition);
    };

    const move = (e) => {

        if(isDrawing) {
            const {x, y} = e.data.global;
            const target = e.target;

            const currentPosition = {};

            currentPosition.x = x;
            currentPosition.y = y;
        
            target.beginFill(0xffffff, 1);
            target.moveTo(lastPosition.x, lastPosition.y);
            target.lineTo(currentPosition.x, currentPosition.y);
            target.endFill();
        }
    };

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