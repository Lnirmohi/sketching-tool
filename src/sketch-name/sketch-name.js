import "./sketch-name.css";

function SketchName({
    sketchName, 
    handleSketchSave, 
    handleSketchNameChange,
    handleNameSave
}) {

    return (
        <div className="sketch-info-section">
            <div className="sketch-name-container"
                style={{"border-color": sketchName.length > 3 ? "cornflowerblue" : "gray"}}
            >
                <input 
                    type="text" 
                    value={sketchName} 
                    placeholder="Enter sketch name" 
                    className="sketch-name" 
                    onChange={handleSketchNameChange}
                />
                <button 
                    className="sketch-save-btn" 
                    disabled={sketchName.length < 3} 
                    type="button" 
                    onClick={handleNameSave}
                    style={{"color": sketchName.length > 3 ? "cornflowerblue" : "gray"}}
                    title={sketchName.length > 3 ? "Save sketch" : "Sketch name length should be more than 3"}
                >
                    Done
                </button>
            </div>
            <button 
                className="save-sketch-btn" 
                type="button" 
                onClick={handleSketchSave}
            >
                Save Sketch
            </button>
        </div>
    );
}

export default SketchName;