import "./sketch-preview.css";

function SketchPreview({imgData}) {

    return (
        <div className="preview-container">
            {
                imgData.length > 0 && <img className="sketch-img" src={imgData} />
            }
        </div>
    );
}

export default SketchPreview;