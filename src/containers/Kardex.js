import React, { useState, useEffect } from "react";
import { getKardex } from "../libs/api";
import "./Kardex.scss";
import { Table } from "react-bootstrap";

export default function Kardex() {
  const [kardex, setKardex] = useState(null);
  useEffect(() => {
    async  function onLoad() {
      try {
        const kardex = await getKardex();
        setKardex(kardex)
      } catch (e) {
        alert(e.message())
      }
    }
    onLoad()
  },[]);

  function createMarkup() {
    return { __html: kardex };
  }

  function renderDangerHTML() {
    return (
      <>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </>
    );
  }

  return (
    <div className="Kardex">
      {kardex && (
        <Table responsive striped bordered hover size="sm">
          {renderDangerHTML()}
        </Table>
      )}
    </div>
  )


}
