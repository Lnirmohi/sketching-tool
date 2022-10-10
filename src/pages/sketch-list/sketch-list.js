import "./sketch-list.css";

function SketchList({sketches}) {

    return (
        <ul className="user-sketch-list">
            {
                sketches.map(sketch => {
                    return (
                        <li key={sketch.id} className="sketch-item">
                            {sketch.name}
                            <span className="sketch-span">
                                {sketch.imgData.length > 0 && <img className="sketch-img" src={sketch.imgData} />}
                            </span>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default SketchList;