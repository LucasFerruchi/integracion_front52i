const url = "http://localhost:8080/api/cursos";
const token = JSON.parse(localStorage.getItem("token"));

//Traer cursos
export const getCursos = async (limite = 0, pagina = 0) => {};

//Traer cursos por el id
export const getCursoById = async (id) => {};

//crear un curso
export const crearCurso = async (datos) => {};

//Actualizar un curso
export const actualizarCurso = async (id, datos) => {};

//Borrar un curso
export const borrarCurso = async (id) => {};
