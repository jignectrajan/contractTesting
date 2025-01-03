import { Verifier } from "@pact-foundation/pact";
import { resolve } from "path";

describe("Pact Provider Verification", () => {
  it("should validate the provider against the consumer contract", async () => {
    const opts = {
        provider: 'ProductProvider',
        providerBaseUrl: 'http://localhost:8080', // Replace with your provider's URL
        pactBrokerUrl: 'https://jignect-technologies-a250.pactflow.io',
        pactBrokerToken: 'SeEVlMw3J3AKI7lq1mEaTA',
        publishVerificationResult: true,
        providerVersion: '1.0.0', // Replace with your provider version
        consumerVersionSelectors: [
            {
                consumer: 'ProductConsumer', // Replace with your consumer name
                // version: '1.0.0', // The version of the consumer contract you're verifying
                // tag: 'dev', // Specify the tag used for the pact
                latest: true, // Fetch the latest pact version
            },
        ],
        logLevel: 'INFO',
    };

    await new Verifier(opts)
      .verifyProvider()
      .then(output => {
        console.log("Pact Verification Complete!");
        console.log(output);
      });
  });
});
