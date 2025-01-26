import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import {
  createManyTestBarang,
  createTestBarang,
  getTestBarang,
  removeAllTestBarang,
} from "./test-util";

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

describe("GET /api/barang/:barangId", () => {
  beforeEach(async () => {
    await createTestBarang();
  });

  afterEach(async () => {
    await removeAllTestBarang();
  });

  it("should get a barang", async () => {
    const testBarang = await getTestBarang();

    const result = await supertest(web).get("/api/barang/" + testBarang.id);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testBarang.id);
    expect(result.body.data.kode).toBe(testBarang.kode);
    expect(result.body.data.nama).toBe(testBarang.nama);
    expect(Number(result.body.data.harga)).toBe(Number(testBarang.harga));
  });

  it("should return 404 if barang id is not found", async () => {
    const testBarang = await getTestBarang();

    const result = await supertest(web).get(
      "/api/barang/" + (testBarang.id + 1)
    );

    expect(result.status).toBe(404);
  });
});

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
