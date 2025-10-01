import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { crearProducto } from "./ProductoServicio";

// 🔹 Íconos de react-icons/bs
import { BsBoxSeam, BsPlusCircle, BsArrowCounterclockwise } from "react-icons/bs";

export default function AgregarProducto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    precio: "",
    disponible: true,
    descripcion: "",
  });

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  async function manejarEnvio(e) {
    e.preventDefault();
    setGuardando(true);

    try {
      await crearProducto(formulario);
      setMensaje({ tipo: "success", texto: "✅ Producto creado correctamente." });
      setFormulario({ nombre: "", precio: "", disponible: true, descripcion: "" });
    } catch (e) {
      setMensaje({ tipo: "danger", texto: e?.message || String(e) });
    } finally {
      setGuardando(false);
    }
  }

  function limpiar() {
    setFormulario({ nombre: "", precio: "", disponible: true, descripcion: "" });
    setMensaje(null);
  }

  return (
    <Container fluid className="py-4">
      {/* Encabezado */}
      <Row className="mb-4">
        <Col>
          <h3 className="d-flex align-items-center gap-2 mb-1">
            <BsBoxSeam /> Agregar producto
          </h3>
          <small className="text-muted">
            Completa el formulario para registrar un nuevo producto
          </small>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          {mensaje && (
            <Alert
              variant={mensaje.tipo}
              onClose={() => setMensaje(null)}
              dismissible
              className="py-2"
            >
              {mensaje.texto}
            </Alert>
          )}

          {/* Card que ocupa todo el ancho */}
          <Card className="shadow-sm rounded-3">
            <Card.Body>
              <Form onSubmit={manejarEnvio}>
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
                      placeholder="Ej: 250000"
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
                        setFormulario({
                          ...formulario,
                          disponible: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={formulario.descripcion}
                      placeholder="Ej: Producto con garantía de 1 año"
                      onChange={(e) =>
                        setFormulario({ ...formulario, descripcion: e.target.value })
                      }
                    />
                  </Form.Group>
                </Row>

                {/* Botones */}
                <div className="d-flex gap-2 mt-3">
                  <Button type="submit" disabled={guardando}>
                    {guardando ? "Guardando..." : <><BsPlusCircle /> Agregar</>}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={limpiar}
                    disabled={guardando}
                  >
                    <BsArrowCounterclockwise /> Limpiar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
