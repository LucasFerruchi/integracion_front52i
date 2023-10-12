const url = "http://localhost:3000/api/auth/login";

export const authLogin = async (datos) => {
  try {
    //enviamos al backend
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    //recibimos del backend
    const data = await resp.json();

    return data;

    //si ocurre algun error
  } catch (error) {
    console.log(error);
    return { msg: "No se conectó con backend" };
  }
};
