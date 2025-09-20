import request from "supertest";
import app from "../server.js";

describe("Items API", () => {
  it("GET /health deve responder ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  // ✅ TESTE CORRIGIDO: Aceita lista vazia
  it("GET /items retorna lista vazia inicialmente", async () => {
    const res = await request(app).get("/items");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  // ✅ NOVO TESTE: Verifica lista com dados
  it("GET /items lista items após criação", async () => {
    await request(app).post("/items").send({ name: "caderno", quantity: 2 });
    
    const res = await request(app).get("/items");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.some(item => item.name === "caderno")).toBe(true);
  });

  it("PUT /items/:id atualiza item", async () => {
    const created = await request(app).post("/items").send({ name: "lapis", quantity: 1 });
    const id = created.body.id;
    const updated = await request(app).put(`/items/${id}`).send({ quantity: 5 });
    expect(updated.status).toBe(200);
    expect(updated.body.quantity).toBe(5);
  });

  it("DELETE /items/:id remove item", async () => {
    const created = await request(app).post("/items").send({ name: "caneta", quantity: 3 });
    const id = created.body.id;
    const del = await request(app).delete(`/items/${id}`);
    expect(del.status).toBe(204);
    const get = await request(app).get(`/items/${id}`);
    expect(get.status).toBe(404);
  });
});