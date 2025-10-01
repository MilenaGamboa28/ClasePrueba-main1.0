import axios from "axios";

export const API_BASE = "http://localhost:8001";

const cliente = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});
export async function eliminarProducto(productoId) {
  const { data } = await cliente.delete("/productos/" + productoId);
  return data;
}
