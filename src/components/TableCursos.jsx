import React, { useState } from "react";
//funcion borrar cursos
import { borrarCurso } from "../helpers/cursoApi";

//Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//importar el modal para editar
import ModalEdit from "./ModalEdit";

const TableCursos = ({ cursos, traerCursos }) => {
  const MySwal = withReactContent(Swal);

  //Manejo del modal-------------------
  //mostrar el modal
  const [show, setShow] = useState(false);

  //por id del curso
  const [cid, setCid] = useState(null);

  //cierre del modal
  const handleClose = () => {
    setCid(null);
    setShow(false);
    traerCursos();
  };

  //abre el modal
  const handleShow = (id) => {
    setCid(id);
    setShow(true);
  };
  //--------------------------------------------

  //borrar curso--------------------------------
  const inactivarCurso = async (nombre, id) => {
    // MySwal.fire({
    //   title: "Do you want to save the change?",
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: "Save",
    //   denyButtonText: `don't save`,
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     MySwal.fire("Saved!", "", "success");
    //   } else if (result.isDenied) {
    //     MySwal.fire("Changes are not saved", "", "info");
    //   }
    // });
    //-----------------------------------------------------
    MySwal.fire({
      title: `Está seguro que quiere inactivar el curso ${nombre}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        borrarCurso(id).then((resultado) => {
          console.log(resultado);
          traerCursos();
          MySwal.fire("", `${resultado.msg}`, "success");
        });
      } else if (result.isDenied) {
        MySwal.fire("El curso no se inactivó", "", "info");
      }
    });
  };
  //!configurar el boton eliminar curso

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Categoría</th>
            <th scope="col">Precio</th>
            <th scope="col">Destacado</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {cursos.map((curso) => (
            <tr key={curso._id}>
              <th>{curso.nombre}</th>
              <td>{curso.categoria.nombre}</td>
              <td>{curso.precio}</td>
              <td>
                {curso.destacado ? (
                  <i className="fa fa-star" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                )}
              </td>
              <td>
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleShow(curso._id)}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  {/* boton eliminar curso */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => inactivarCurso(curso.nombre, curso._id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* modales para editar */}
      {show && <ModalEdit show={show} handleClose={handleClose} cid={cid} />}
    </>
  );
};

export default TableCursos;
