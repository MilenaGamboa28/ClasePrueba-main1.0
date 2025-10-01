import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  BsPlusCircle,
  BsPencilSquare,
  BsTrash,
  BsListUl,
} from "react-icons/bs";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    "d-flex align-items-center gap-2 nav-link py-2 px-3 rounded " +
    (isActive
      ? "fw-semibold bg-primary text-white shadow-sm"
      : "text-secondary hover-effect");

  return (
    <Nav className="flex-column p-3 bg-light h-100 shadow-sm rounded">
      {/* Menú CRUD de productos */}
      <Nav.Link as={NavLink} to="/agregar-producto" className={linkClass}>
        <BsPlusCircle /> <span>Agregar producto</span>
      </Nav.Link>

      <Nav.Link as={NavLink} to="/modificar-producto" className={linkClass}>
        <BsPencilSquare /> <span>Modificar producto</span>
      </Nav.Link>

      <Nav.Link as={NavLink} to="/eliminar-producto" className={linkClass}>
        <BsTrash /> <span>Eliminar producto</span>
      </Nav.Link>

      <Nav.Link as={NavLink} to="/listar-productos" className={linkClass}>
        <BsListUl /> <span>Listar productos</span>
      </Nav.Link>
    </Nav>
  );
}
