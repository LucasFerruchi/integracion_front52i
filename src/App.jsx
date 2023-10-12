import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Rutas protegidas
import ProtectedRoutes from "./routes/ProtectedRoutes";
//importar componente loginScreem
import LoginScreen from "./pages/LoginScreen";
import RoutesDos from "./routes/RoutesDos";
// import "./App.css";

//importar componente errorScreem
import ErrorScreen from "./pages/ErrorScreen";

function App() {
  //Estado para manejar el login y datos del usuario
  /* Como necesitamos decirles aotros componentes que 
  estamos logueados, creamos los estados en el componente 
  PADRE */
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  //funcion para guarsar datos del usuario
  const guardarUsuario = (datos) => {
    setUser(datos);
  };

  //funcion para iniciar sesion
  const iniciarSesion = () => {
    setLogin(true);
  };

  //funcion para cerrar sesion
  const cerrarSesion = () => {
    setLogin(false);
  };

  return (
    // !1 -------------------------------------------------------
    // <BrowserRouter>
    //   <Routes>
    //     {/* Rutas proteg para login, datos de usuario y func cerrar sesion */}

    //     {/* Ruta login que recibe funcion iniciar sesion y guardar datos */}

    //     <Route
    //       path="/login"
    //       element={
    //         <LoginScreen
    //           iniciarSesion={iniciarSesion}
    //           guardarUsuario={guardarUsuario}
    //         />
    //       }
    //     />
    //   </Routes>
    // </BrowserRouter>

    //!2 -------------------------------------------------------
    <BrowserRouter>
      <Routes>
        {/* Rutas proteg para login, datos de usuario y func cerrar sesion */}

        <Route
          path="/*"
          element={
            <ProtectedRoutes login={login}>
              <RoutesDos cerrarSesion={cerrarSesion} user={user} />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<ErrorScreen />} />

        {/* //!IR A LoginScreen Y AGREGAR EL navigate para redireccionar */}

        {/* Ruta login que recibe funcion iniciar sesion y guardar datos */}
        <Route
          path="/login"
          element={
            <LoginScreen
              iniciarSesion={iniciarSesion}
              guardarUsuario={guardarUsuario}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
