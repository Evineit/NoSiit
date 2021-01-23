import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { getCalif } from "../libs/api";
import "./Home.css";
import { Table } from "react-bootstrap";

export default function Home() {
  const [calif, setCalif] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const calif = await loadCalif();
        setCalif(calif);
      } catch (e) {
        // TODO
        // onError(e);
        alert(e.message);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function createMarkup() {
    return { __html: calif };
  }
  function renderDangerHTML() {
    return (
      <>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </>
    );
  }

  function loadCalif() {
    return getCalif();
  }

  function renderCalif() {
    return (
      <div className="notes">
        {/* <h2 className="pb-3 mt-4 mb-3 border-bottom">Califs</h2> */}
        <Table responsive striped bordered hover size="sm">{!isLoading && renderDangerHTML()}</Table>

      </div>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>NoSiit</h1>
        <p className="text-muted">A simple Siit frontend app</p>
      </div>
    );
  }

  return (
    <div className="Home">
      {/* TODO */}
      {isAuthenticated ? renderCalif() : renderLander()}
    </div>
  );
}