import { useState } from "react";
import { BsSearch, BsSave, BsArrowCounterclockwise, BsPencilSquare } from "react-icons/bs";
import {
  Navbar,
  Container,
  Row,
  Col,
  Button,
  Offcanvas,
} from "react-bootstrap";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-light min-vh-100">
      {/* NAVBAR */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow-sm"
        style={{
          background: "linear-gradient(90deg, #0d6efd, #004085)",
        }}
      >
        <Container fluid>
          {/* Botón hamburguesa en móvil */}
          <Button
            variant="outline-light"
            className="d-lg-none me-2"
            onClick={() => setShowSidebar(true)}
          >
            ☰
          </Button>
          <Navbar.Brand className="fw-bold"> Milena Gamboa</Navbar.Brand>
        </Container>
      </Navbar>

      {/* CONTENIDO */}
      <Container fluid>
        <Row>
          {/* SIDEBAR DESKTOP */}
          <Col
            lg={2}
            className="d-none d-lg-block p-0 border-end bg-white shadow-sm"
            style={{ minHeight: "calc(100vh - 56px)" }}
          >
            <Sidebar />
          </Col>

          {/* MAIN */}
          <Col lg={10} className="p-4">
            <div className="bg-white shadow-sm rounded p-4 h-100">
              {children}
            </div>
          </Col>
        </Row>
      </Container>

      {/* SIDEBAR MÓVIL (Offcanvas) */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="start"
        className="bg-light"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-semibold">📂 Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Sidebar onNavigate={() => setShowSidebar(false)} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
