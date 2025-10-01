import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { eliminarProducto } from "./ProductoServicio";
import { BsTrash } from "react-icons/bs";

export default function EliminarProducto() {
  const [productoId, setProductoId] = useState("");
  const [mensaje, setMensaje] = useState(null);

  async function eliminar() {
    try {
      await eliminarProducto(productoId);
      setMensaje({ tipo: "success", texto: "✅ Registro eliminado con éxito." });
      setProductoId("");
    } catch (e) {
      setMensaje({ tipo: "danger", texto: e.message || "❌ Error al eliminar." });
    }
  }

  return (
    <Container fluid className="py-4">
      {/* Título */}
      <Row className="mb-4">
        <Col>
          <h3 className="d-flex align-items-center gap-2 mb-1 text-danger">
            <BsTrash /> Eliminar producto
          </h3>
          <small className="text-muted">Ingrese el ID del producto que desea eliminar.</small>
        </Col>
      </Row>

      {/* Card principal */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-2">
            <Col md={11}>
              <Form.Control
                type="text"
                placeholder="🆔 Id del producto"
                value={productoId}
                onChange={(e) => setProductoId(e.target.value)}
              />
            </Col>
            <Col md={1}>
              <Button
                variant="danger"
                className="w-100 d-flex align-items-center justify-content-center gap-1"
                onClick={eliminar}
                disabled={!productoId}
              >
                <BsTrash /> Eliminar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Alertas */}
      {mensaje && (
        <Row>
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
    </Container>
  );
}
