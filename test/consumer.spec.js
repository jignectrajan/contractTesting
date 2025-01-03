import { Pact } from "@pact-foundation/pact";
import { resolve } from "path";
import  fetchProduct from "../src/consumer.js";
import { expect as _expect } from "chai";
const expect = _expect;

const provider = new Pact({
  consumer: "ProductConsumer1",
  provider: "ProductProvider1",
  port: 1234,
  log: resolve(process.cwd(), "logs", "pact.log"),
  dir: resolve(process.cwd(), "pacts"),
  logLevel: "INFO",
});

describe("Pact Consumer Test", () => {
  before(() => provider.setup());

  after(() => provider.finalize());

  afterEach(() => provider.verify());

  describe("when a request for a product is made", () => {
    before(() => {
      return provider.addInteraction({
        state: "product with ID 1 exists",
        uponReceiving: "a request for product with ID 1",
        withRequest: {
          method: "GET",
          path: "/product/1",
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: { id: 1, name: "Product A", price: 100 },
        },
      });
    });

    it("should return the product details", async () => {
      const product = await fetchProduct.fetchProduct(1);
      expect(product).to.deep.equal({ id: 1, name: "Product A", price: 100 });
    });
  });
});
