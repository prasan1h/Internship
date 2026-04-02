import Card from "./Card";
import './CardSection.css'

function CardSection(){
    return (
        <>
        <div className="cardsection-box">
            <Card title={"card 1"} content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti quisquam labore iusto quis praesentium recusandae, iure doloribus nostrum excepturi ex, eius cumque facilis sint odit dicta, eos placeat quasi!"}/>
            <Card title={"card 2"} content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti quisquam labore iusto quis praesentium recusandae, iure doloribus nostrum excepturi ex, eius cumque facilis sint odit dicta, eos placeat quasi!"}/>
            <Card title={"card 3"} content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti quisquam labore iusto quis praesentium recusandae, iure doloribus nostrum excepturi ex, eius cumque facilis sint odit dicta, eos placeat quasi!"}/>
        </div>
        </>
    )
}

export default CardSection