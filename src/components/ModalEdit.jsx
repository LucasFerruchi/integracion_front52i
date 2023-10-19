import React, { useEffect, useState } from "react";
//funcion de cursos by id y actualizars
import { getCursoById, actualizarCurso } from "../helpers/cursoApi";
//fucnion de categorias
import { getCategorias } from "../helpers/categoriaApi";

//sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//modal de react bootstrap
import Modal from "react-bootstrap/Modal";

const ModalEdit = ({ show, handleClose, cid }) => {
  const MySwal = withReactContent(Swal);

  //estados para curso y categorias
  const [curso, setCurso] = useState(null);
  const [categorias, setCategorias] = useState(null);

  //cuando se monta---------------------------------
  useEffect(() => {
    traerDatosDeCurso();
    traerCategorias();
  }, []);

  const traerDatosDeCurso = async () => {
    const resp = await getCursoById(cid);

    setCurso(resp.curso);
  };

  const traerCategorias = async () => {
    const resp = await getCategorias();
    setCategorias(resp.categorias);
  };
  //------------------------------------------------

  const handleChange = (e) => {
    //Variable para el swich
    let valueCheck = false;

    //Manejar el switch
    if (e.target.name === "destacado") {
      //cambiar el estado del check
      if (e.target.checked) {
        valueCheck = true;
      } else {
        valueCheck = false;
      }
      // actualizamos el estado curso
      setCurso({
        ...curso,
        [e.target.name]: valueCheck,
      });
    } else {
      setCurso({
        ...curso,
        [e.target.name]: e.target.value,
      });
    }
  };

  // -------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    //funcion actualizar
    await actualizarCurso(curso._id, curso);
    MySwal.fire("Curso actualizado", "", "success");

    // cerrar el modal
    handleClose();
  };

  return (
    <>
      {/* la funcion show es propia del modal y le pasamos show desde TableCursos */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {curso ? (
            <form onSubmit={handleSubmit}>
              <label className="fw-bold">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={curso.nombre}
                name="nombre"
                onChange={handleChange}
              />
              <label className="fw-bold">Descripción</label>
              <textarea
                className="form-control"
                value={curso.descripcion}
                onChange={handleChange}
                name="descripcion"
              ></textarea>
              <label className="fw-bold">Precio</label>
              <input
                type="number"
                className="form-control"
                value={curso.precio}
                onChange={handleChange}
                name="precio"
              />
              {/* cambiar categoria */}
              <div className="my-2">
                <p>
                  <span className="fw-bold">Categoría actual:</span>{" "}
                  {curso.categoria.nombre}
                </p>
                <label className="fw-bold">Cambiar categoría</label>
                <select
                  className="form-select"
                  name="categoria"
                  onChange={handleChange}
                >
                  <option value={curso.categoria.nombre}>
                    Elije una categoría
                  </option>
                  {categorias &&
                    categorias.map((categoria) => (
                      <option key={categoria._id} value={categoria._id}>
                        {categoria.nombre}
                      </option>
                    ))}
                </select>
              </div>
              {/* switch */}
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={curso.destacado}
                  onChange={handleChange}
                  name="destacado"
                />
                <label className="form-check-label fw-bold">Destacado</label>
              </div>
              <div className="d-grid mt-2">
                <button className="btn btn-warning">Actualizar</button>
              </div>
            </form>
          ) : (
            <h3>Cargando...</h3>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEdit;
