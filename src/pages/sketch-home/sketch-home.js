import { useRef, useEffect, useCallback, useState } from "react";
import { Stage, Graphics } from "@saitonakamura/react-pixi";

function SketchHome() {

    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPosition, setLastPosition] = useState({x: 0, y: 0})

    const draw = useCallback((graphics) => {
        console.log(graphics);

        graphics.beginFill(0x0033cc, 1)
        graphics.drawRect(0, 0, window.innerWidth, window.innerWidth)
        graphics.endFill()

        graphics.on("mousedown", mdown);

        graphics.on("mouseup",  mup);

        graphics.on("mousemove", move);

    }, []);

    const mdown = (e) => {

        const {x, y} = e.data.global;

        setLastPosition({x, y});

        setIsDrawing(true);
    };

    const mup = (e) => {
        setIsDrawing(false);
    };

    const move = (e) => {

        const {x, y} = e.data.global;
        const target = e.target;

        const currentPosition = {};

        currentPosition.x = x;
        currentPosition.y = y;
        
        if(isDrawing) {
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