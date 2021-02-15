import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { getHorario } from "../libs/api";
import "./Horario.scss"

export default function Horario() {
    const [horario, setHorario] = useState(null);

    useEffect(() => {
        async function onLoad() {
            try {
                const horario = await getHorario();
                setHorario(horario)
            } catch (e) {
                alert(e.message)
            }
        }
        onLoad()
    }, []);

    function createMarkup() {
        return { __html: horario };
    }

    function renderDangerHTML() {
        return (
            <>
                <div dangerouslySetInnerHTML={createMarkup()} />
            </>
        );
    }

    return (
        <div className="horario">
            {horario && (
                <div>
                    <Table responsive striped bordered hover size="sm">
                    {renderDangerHTML()}
                </Table>
                <Button>Ordenar horario</Button>
                </div>
            )}
        </div>

    )
}