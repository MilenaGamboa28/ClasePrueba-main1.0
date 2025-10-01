import { Container, Row, Col, Button, Alert, Table, Spinner } from "react-bootstrap";
import { listarProductos } from "./ProductoServicio";
import { useEffect, useState } from "react";

// 🔹 Importamos íconos de react-bootstrap-icons
import { Star, StarFill, PencilSquare, Trash } from "react-bootstrap-icons";

export default function ListarProducto() {

  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  async function listar() {
    try {
      setCargando(true);
      const data = await listarProductos();
      // añadimos propiedad destacado = false por defecto si no viene de la API
      const dataConDestacado = data.map(p => ({ ...p, destacado: p.destacado ?? false }));
      setProductos(dataConDestacado);
      setCargando(false);
    } catch (e) {
      setMensaje({ tipo: "danger", texto: e?.message });
    }
  }

  useEffect(() => {
    listar();
  }, []);

  // 🔹 Alternar destacado
  function toggleDestacado(index) {
    setProductos(prev =>
      prev.map((p, i) =>
        i === index ? { ...p, destacado: !p.destacado } : p
      )
    );
  }

  return (
    <Container className="py-4">
      <div>Listar productos</div>

      {mensaje && (
        <Row>
          <Col md={12}>
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

      {cargando && <Spinner />}

      {!cargando &&
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Disponible</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {producto.nombre}{" "}
                  {producto.destacado && <StarFill color="gold" />}
                </td>
                <td>{producto.precio}</td>
                <td>{producto.disponible ? "Sí" : "No"}</td>
                <td>
                  <Button size="sm" className="me-2" variant="primary">
                    <PencilSquare /> Modificar
                  </Button>
                  <Button size="sm" variant="danger" className="me-2">
                    <Trash /> Eliminar
                  </Button>
                  <Button
                    size="sm"
                    variant={producto.destacado ? "secondary" : "warning"}
                    onClick={() => toggleDestacado(index)}
                  >
                    {producto.destacado ? <StarFill /> : <Star />}{" "}
                    {producto.destacado ? "Quitar" : "Destacar"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </Container>
  );
}
