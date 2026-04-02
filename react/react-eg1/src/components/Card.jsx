import "./Card.css"

function Card({title,content}){
    return (
        <>
        <div className="card-box">
            <div className="card-heading"><p>{title}</p></div>
            <div className="card-content"><p>{content}</p></div>
            <div className="card-btn"><a href="">more...</a></div>
        </div>
        </>
    )
}

export default Card