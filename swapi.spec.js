const request = require("supertest");

describe("SWAPI API Tests", () => {
  // 1. Teste para pessoa inexistente
  test("Deve receber uma mensagem de erro ao buscar por uma pessoa inexistente", async () => {
    const resposta = await request("https://swapi.dev/api").get("/people/9999");
    expect(resposta.status).toBe(404);
    expect(resposta.body.detail).toBe("Not found");
  });

  // 2. Teste para recuperação de todos os planetas
  test("Deve retornar todos os planetas", async () => {
    const resposta = await request("https://swapi.dev/api").get("/planets/");
    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveProperty("results");
  });

  // 3. Teste para recuperação de um planeta específico
  test("Deve retornar o planeta Tatooine", async () => {
    const resposta = await request("https://swapi.dev/api").get("/planets/1/");
    expect(resposta.status).toBe(200);
    expect(resposta.body.name).toBe("Tatooine");
  });

  // 4. Teste para rota inexistente
  test("Deve retornar 404 para uma rota inexistente", async () => {
    const resposta = await request("https://swapi.dev/api").get("/heroes/");
    expect(resposta.status).toBe(404);
  });

  // 5. Teste para recuperação de todas as naves
  test("Deve retornar todas as naves espaciais", async () => {
    const resposta = await request("https://swapi.dev/api").get("/starships/");
    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveProperty("results");
  });

  // 6. Teste para recuperação de uma nave específica
  test("Deve retornar informações da nave Death Star", async () => {
    const resposta = await request("https://swapi.dev/api").get("/starships/9/");
    expect(resposta.status).toBe(200);
    expect(resposta.body.name).toBe("Death Star");
  });

  // 7. Teste para recuperação de todos os filmes
  test("Deve retornar todos os filmes", async () => {
    const resposta = await request("https://swapi.dev/api").get("/films/");
    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveProperty("results");
  });

  // 8. Teste para filme específico
  test("Deve retornar informações do filme A New Hope", async () => {
    const resposta = await request("https://swapi.dev/api").get("/films/1/");
    expect(resposta.status).toBe(200);
    expect(resposta.body.title).toBe("A New Hope");
  });

  // 9. Teste para consulta com parâmetros inválidos
  test("Deve retornar uma lista vazia para consulta com parâmetros inválidos", async () => {
    const resposta = await request("https://swapi.dev/api").get("/planets/?search=unknownplanet");
    expect(resposta.status).toBe(200);
    expect(resposta.body.results.length).toBe(0);
  });

  // 10. Teste para recurso não encontrado
  test("Deve retornar 404 para um recurso não encontrado", async () => {
    const resposta = await request("https://swapi.dev/api").get("/planets/9999/");
    expect(resposta.status).toBe(404);
    expect(resposta.body.detail).toBe("Not found");
  });
});
