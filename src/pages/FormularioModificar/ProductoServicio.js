import axios from "axios";

export const API_BASE = "http://localhost:8001";

const cliente = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export async function obtenerProducto(productoId) {
  const { data } = await cliente.get("/productos/" + productoId);
  return data;
}



export async function guardarProducto(productoId, datos) {
  const { data } = await cliente.put("/productos/" + productoId, datos);
  return data;
}
