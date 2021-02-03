import "./Home.css";
import { Card, CardDeck } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs"
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  return (
    <div className="Home">
      <div className="lander">
        <h1>NoSiit</h1>
        <p className="text-muted">A simple Siit frontend app</p>
        <CardDeck>
        <Card onClick={()=>{history.push("/calif_partial");}}>
          <BsStarFill/>
          <Card.Body>Calificaciones</Card.Body>
        </Card>
        <Card onClick={()=>{history.push("/kardex");}}>
          <BsStarFill/>
          <Card.Body>Kardex</Card.Body>
        </Card>
        <Card onClick={()=>{history.push("/avance_reticular");}}>
          <BsStarFill/>
          <Card.Body>Avance reticular</Card.Body>
        </Card>
        </CardDeck>
      </div>
    </div>
  );
}