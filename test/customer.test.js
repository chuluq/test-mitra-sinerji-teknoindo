import supertest from "supertest";
import { web } from "../src/application/web";
import {
  createManyTestCustomer,
  createTestCustomer,
  getTestCustomer,
  removeAllTestCustomer,
} from "./test-util";

describe("GET /api/customers/:customerId", () => {
  beforeEach(async () => {
    await createTestCustomer();
  });

  afterEach(async () => {
    await removeAllTestCustomer();
  });

  it("should get a customer", async () => {
    const testCustomer = await getTestCustomer();

    const result = await supertest(web).get(
      "/api/customers/" + testCustomer.id
    );

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testCustomer.id);
    expect(result.body.data.kode).toBe(testCustomer.kode);
    expect(result.body.data.nama).toBe(testCustomer.nama);
    expect(result.body.data.telp).toBe(testCustomer.telp);
  });

  it("should return 404 if customer id is not found", async () => {
    const testCustomer = await getTestCustomer();

    const result = await supertest(web).get(
      "/api/customers/" + (testCustomer.id + 1)
    );

    expect(result.status).toBe(404);
  });
});

describe("GET /api/customers", () => {
  beforeEach(async () => {
    await createManyTestCustomer();
  });

  afterEach(async () => {
    await removeAllTestCustomer();
  });

  it("should list customer", async () => {
    const result = await supertest(web).get("/api/customers/");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBeGreaterThan(0);
  });
});
