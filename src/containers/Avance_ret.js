import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { getAvanceRet } from "../libs/api";
import "./Avance_ret.scss";
import { Table } from "react-bootstrap";

export default function AvanceRet() {
  const [avanceReticular, setAvanceRet] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const avanceReticular = await loadAvanceRet();
        setAvanceRet(avanceReticular);
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
    return { __html: avanceReticular };
  }
  function renderDangerHTML() {
    return (
      <>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </>
    );
  }

  function loadAvanceRet() {
    return getAvanceRet();
  }

  return (
    <div className="avanceRet">
      <Table responsive bordered hover size="sm">{!isLoading && renderDangerHTML()}</Table>
    </div>
  );
}