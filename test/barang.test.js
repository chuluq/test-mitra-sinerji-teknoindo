import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { createManyTestBarang, removeAllTestBarang } from "./test-util";

describe("POST /api/barang", () => {
  afterEach(async () => {
    await removeAllTestBarang();
  });

  it("should create new barang", async () => {
    const result = await supertest(web).post("/api/barang").send({
      kode: "test",
      harga: 20000,
      nama: "test",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.kode).toBe("test");
    expect(result.body.data.nama).toBe("test");
    expect(Number(result.body.data.harga)).toBe(20000);
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web).post("/api/barang").send({
      kode: "",
      harga: 20000,
      nama: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if kode already taken", async () => {
    let result = await supertest(web).post("/api/barang").send({
      kode: "test",
      harga: 20000,
      nama: "test",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.kode).toBe("test");
    expect(result.body.data.nama).toBe("test");

    result = await supertest(web).post("/api/barang").send({
      kode: "test",
      harga: 20000,
      nama: "test",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

// describe('DELETE /api/barang/:barangId', () => {
//   it('should delete barang')
//  })

describe("GET /api/barang", () => {
  beforeEach(async () => {
    await createManyTestBarang();
  });

  afterEach(async () => {
    await removeAllTestBarang();
  });

  it("should list barang", async () => {
    const result = await supertest(web).get("/api/barang/");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBeGreaterThan(0);
  });
});
