import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

function Formulario({ guardarGasto, guardarCrearGasto }) {
  const [nombre, guardarNombre] = useState("");
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);
  const { nanoid } = require("nanoid/non-secure");

  const agregarGasto = (e) => {
    e.preventDefault();

    //Validar
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    //Construir el gasto

    const gasto = {
      nombre,
      cantidad,
      id: nanoid(10),
    };
    console.log(gasto);
    //PAsar el gasto al componente principal

    guardarGasto(gasto);
    guardarCrearGasto(true);
    //resetear el form
    guardarNombre("");
    guardarCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gastos</h2>
      {error ? (
        <Error mensaje="Todos los campos son obligatorios o presupuesto incorrecto" />
      ) : null}
      <div className="campo">
        <label>Gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={(e) => guardarNombre(e.target.value)} //lo que el usuario escribe se guarda en el state
        />
      </div>
      <div className="campo">
        <label>Cantidad Gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          value={cantidad}
          onChange={(e) => guardarCantidad(parseInt(e.target.value), 10)} //lo que el usuario escribe se guarda en el state
        />
      </div>
      <input
        className="button-primary u-full-width"
        type="submit"
        value="Introduce tu gasto"
        onChange={(e) => guardarCantidad(parseInt(e.target.value, 10))}
      />
    </form>
  );
}

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired,
};
export default Formulario;
