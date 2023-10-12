const url = "http://localhost:3000/api/categorias";
const token = JSON.parse(localStorage.getItem("token"));

export const getCategorias = async (desde = 0) => {};

//Traer categorías por el id
export const getCategoriaById = async (id) => {};

//crear categoria
export const crearCategoria = async (datos) => {};

//Actualizar Categoría
export const actualizarCategoria = async (id, datos) => {};

//Borrar Categoría
export const borrarCategoria = async (id) => {};
