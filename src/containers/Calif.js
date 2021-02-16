import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { getCalif } from "../libs/api";
import "./Calif.scss";
import { Table } from "react-bootstrap";

export default function Calif() {
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

  return (
    <div className="Calif">
      <Table responsive striped bordered hover size="sm">{!isLoading && renderDangerHTML()}</Table>
    </div>
  );
}