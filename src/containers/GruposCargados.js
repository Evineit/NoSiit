import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getGruposCargados } from "../libs/api";
import "./GruposCargados.scss"

export default function GruposCargados() {
    const [grupos, setGrupos] = useState(null);

    useEffect(() => {
        async function onLoad() {
            try {
                const grupos = await getGruposCargados();
                setGrupos(grupos)
            } catch (e) {
                alert(e.message())
            }
        }
        onLoad()
    }, []);

    function createMarkup() {
        return { __html: grupos };
    }

    function renderDangerHTML() {
        return (
            <>
                <div dangerouslySetInnerHTML={createMarkup()} />
            </>
        );
    }

    return (
        <div className="grupos-cargados">
            {grupos && (
                <Table responsive striped bordered hover size="sm">
                    {renderDangerHTML()}
                </Table>
            )}
        </div>
    )
}