import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reportes from "./pages/Reportes.jsx";
import Configuracion from "./pages/Configuracion.jsx";
import { Star, StarFill, PencilSquare, Trash } from "react-bootstrap-icons";

import AgregarProducto from "./pages/FormularioAgregar/AgregarProducto.jsx";
import ModificarProducto from "./pages/FormularioModificar/ModificarProducto.jsx";
import EliminarProducto from "./pages/FormularioEliminar/EliminarProducto.jsx";
import ListarProducto from "./pages/Listar/ListarProducto.jsx";

import NoEncontrado from "./pages/NoEncontrado.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/agregar-producto" element={<AgregarProducto />} />
        <Route path="/modificar-producto" element={<ModificarProducto />} />
        <Route path="/eliminar-producto" element={<EliminarProducto />} />
        <Route path="/listar-productos" element={<ListarProducto />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </Layout>
  );
}
