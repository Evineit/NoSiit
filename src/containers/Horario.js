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

    function handleSortSchedule(event) {
      event.target.style.display = 'none'
      const parent = document.querySelector('.table > div:nth-child(1) > table:nth-child(11) > tbody:nth-child(1)')
      let nodes = document.querySelectorAll(
        ".table > div:nth-child(1) > table:nth-child(11) > tbody:nth-child(1) > tr#par, .table > div:nth-child(1) > table:nth-child(11) > tbody:nth-child(1) > tr#non"
      );
      let array = Array.from(nodes)
      nodes.forEach((node) => {
        node.remove()
      });

      array.sort((a, b) => {
        if (+a.cells[3].firstChild.data.trim().substring(0,2) > +b.cells[3].firstChild.data.trim().substring(0,2)) {
          return 1;
        }else if (+a.cells[3].firstChild.data.trim().substring(0,2) < +b.cells[3].firstChild.data.trim().substring(0,2)) {
          return -1;
        }
        return 0;
      })

      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        parent.insertBefore(element, parent.lastElementChild)
      }
      removeEmptySaturday()
    }

    function removeEmptySaturday() {
      let nodes = document.querySelectorAll(
        ".table > div:nth-child(1) > table:nth-child(11) > tbody:nth-child(1) > tr#par, .table > div:nth-child(1) > table:nth-child(11) > tbody:nth-child(1) > tr#non"
      );
      let flag = true
      nodes.forEach((node) => {
        if (node.cells.length === 8){
          flag = false
          return
        }
        if (!!node.cells[8].firstChild.data.trim()){
          flag = false
          console.log('false')
          console.log(node.cells[8].firstChild.data.trim())
          console.log(node)
        }
      })
      if (flag) {
        nodes = document.querySelectorAll('.table > div:nth-child(1) > table:nth-child(11) > tbody:nth-child(1) > tr')
        for (let index = 0; index < nodes.length-1; index++) {
          const element = nodes[index];
          element.cells[8].remove()
        }
      }
    }

    return (
        <div className="horario">
            {horario && (
                <div>
                <Table responsive striped bordered hover size="sm">
                    {renderDangerHTML()}
                </Table>
                <Button onClick={(e) => {
                  handleSortSchedule(e)
                }} className="button-sort">Ordenar horario</Button>
                </div>
            )}
        </div>

    )
}