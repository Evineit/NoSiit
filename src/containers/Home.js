import "./Home.css";
import { Card, CardDeck } from "react-bootstrap";
import { BsStarFill, BsTable, BsTrophy, BsUpload, BsClockFill } from "react-icons/bs"
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  return (
    <div className="Home">
      <div className="lander">
        <h1>NoSiit</h1>
        <p className="text-muted">A simple Siit frontend app</p>
        <CardDeck>
        <Card onClick={()=>{history.push("/horario");}}>
          <BsClockFill/>
          <Card.Body>Horario</Card.Body>
        </Card>
        <Card onClick={()=>{history.push("/calif_partial");}}>
          <BsStarFill/>
          <Card.Body>Calificaciones</Card.Body>
        </Card>
        <Card onClick={()=>{history.push("/kardex");}}>
          <BsTable/>
          <Card.Body>Kardex</Card.Body>
        </Card>
        <Card onClick={()=>{history.push("/avance_reticular");}}>
          <BsTrophy/>
          <Card.Body>Avance reticular</Card.Body>
        </Card>
        <Card onClick={()=>history.push("/grupos_cargados")}>
          <BsUpload/>
          <Card.Body>Grupos cargados</Card.Body>
        </Card>
        </CardDeck>
      </div>
    </div>
  );
}