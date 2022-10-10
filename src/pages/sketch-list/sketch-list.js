import "./sketch-list.css";

function SketchList({sketches}) {

    return (
        <ul className="user-sketch-list">
            {
                sketches.map(sketch => <li key={sketch.id} className="sketch-item">{sketch.name}</li>)
            }
        </ul>
    );
}

export default SketchList;