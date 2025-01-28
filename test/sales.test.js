import supertest from "supertest";
import { web } from "../src/application/web.js";
import { createManyTestSales, removeAllTestSales } from "./test-util.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/sales", () => {
  afterEach(async () => {
    await removeAllTestSales();
  });

  it("should create new transaction", async () => {
    const result = await supertest(web)
      .post("/api/sales")
      .send({
        kode: "12345",
        tgl: "2023-04-01T00:00:00.000Z",
        cust_id: 32,
        subtotal: 100000,
        diskon: 1000,
        ongkir: 5000,
        total_bayar: 104000,
        sales_details: [
          {
            barang_id: 87,
            harga_bandrol: 100000,
            qty: 1,
            diskon_pct: 10,
            diskon_nilai: 10000,
            harga_diskon: 90000,
            total: 90000,
          },
        ],
      });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.message).toBe("transaction created");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/sales")
      .send({
        kode: 12345,
        tgl: "2023-04-01T00:00:00.000Z",
        cust_id: 32,
        subtotal: 100000,
        diskon: 1000,
        ongkir: 5000,
        total_bayar: "104000",
        sales_details: [
          {
            barang_id: 87,
            harga_bandrol: 100000,
            qty: 1,
            diskon_pct: 10,
            diskon_nilai: 10000,
            harga_diskon: 90000,
            total: 90000,
          },
        ],
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/sales", () => {
  beforeEach(async () => {
    createManyTestSales();
  });

  afterEach(async () => {
    await removeAllTestSales();
  });

  it("should list sales", async () => {
    const result = await supertest(web).get("/api/sales");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBeGreaterThan(0);
  });
});
