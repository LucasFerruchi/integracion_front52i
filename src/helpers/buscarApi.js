const url = "http://localhost:8080/api/buscar";

export const buscarDatos = async (coleccion, termino) => {
  try {
    const resp = await fetch(url + "/" + coleccion + "/" + termino);
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener la info");
  }
};
