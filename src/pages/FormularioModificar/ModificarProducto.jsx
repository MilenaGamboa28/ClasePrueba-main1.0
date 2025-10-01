import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { useState } from "react";
import { obtenerProducto, guardarProducto } from "./ProductoServicio";
import { BsSearch, BsSave, BsArrowCounterclockwise, BsPencilSquare } from "react-icons/bs";

export default function ModificarProducto() {
  const [productoId, setProductoId] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const [formulario, setFormulario] = useState({
    nombre: "",
    precio: "",
    disponible: true,
    descripcion: "",
  });

  function limpiar() {
    setFormulario({ nombre: "", precio: "", disponible: true, descripcion: "" });
    setMensaje(null);
    setProductoId("");
  }

  async function buscar() {
    const data = await obtenerProducto(productoId);
    setFormulario(data);
  }

  async function guardar() {
    setGuardando(true);
    try {
      await guardarProducto(productoId, formulario);
      setMensaje({ tipo: "success", texto: "✅ Producto guardado correctamente." });
      limpiar();
    } catch (e) {
      setMensaje({ tipo: "danger", texto: e?.message || String(e) });
    } finally {
      setGuardando(false);
    }
  }

  return (
    <Container fluid className="py-4">
      {/* Encabezado */}
      <Row className="mb-4">
        <Col>
          <h3 className="d-flex align-items-center gap-2 mb-1 text-primary">
            <BsPencilSquare /> Modificar producto
          </h3>
          <small className="text-muted">Busque un producto por ID y actualice sus datos.</small>
        </Col>
      </Row>

      {/* Tarjeta de búsqueda */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-2">
            <Col md={11}>
              <Form.Control
                type="text"
                placeholder="🔍 Id del producto"
                value={productoId}
                onChange={(e) => setProductoId(e.target.value)}
              />
            </Col>
            <Col md={1}>
              <Button
                variant="primary"
                className="w-100 d-flex align-items-center justify-content-center gap-1"
                onClick={buscar}
                disabled={!productoId}
              >
                <BsSearch /> Buscar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Alertas */}
      {mensaje && (
        <Row className="mb-3">
          <Col>
            <Alert
              variant={mensaje.tipo}
              onClose={() => setMensaje(null)}
              dismissible
              className="py-2"
            >
              {mensaje.texto}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Formulario principal */}
      <Card className="shadow-sm">
        <Card.Body>
          <Form>
            {/* Nombre y Precio */}
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={formulario.nombre}
                  placeholder="Ej: Teclado mecánico"
                  onChange={(e) =>
                    setFormulario({ ...formulario, nombre: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="precio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={formulario.precio}
                  placeholder="Ej: 120000"
                  onChange={(e) =>
                    setFormulario({ ...formulario, precio: e.target.value })
                  }
                />
              </Form.Group>
            </Row>

            {/* Disponible y Descripción */}
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="disponible">
                <Form.Check
                  type="switch"
                  label="Disponible"
                  checked={formulario.disponible}
                  onChange={(e) =>
                    setFormulario({ ...formulario, disponible: e.target.checked })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={formulario.descripcion}
                  placeholder="Ej: Producto con 1 año de garantía"
                  onChange={(e) =>
                    setFormulario({ ...formulario, descripcion: e.target.value })
                  }
                />
              </Form.Group>
            </Row>

            {/* Botones */}
            <div className="d-flex gap-2">
              <Button
                onClick={guardar}
                disabled={guardando || !productoId}
                className="d-flex align-items-center gap-1"
              >
                {guardando ? "Guardando..." : <><BsSave /> Guardar</>}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={limpiar}
                disabled={guardando}
                className="d-flex align-items-center gap-1"
              >
                <BsArrowCounterclockwise /> Limpiar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
