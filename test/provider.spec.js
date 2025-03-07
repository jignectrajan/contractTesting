import { Verifier } from "@pact-foundation/pact";
import { resolve } from "path";

describe("Pact Provider Verification", () => {
  it("should validate the provider against the consumer contract", async () => {
    const opts = {
        provider: 'GetProvider',
        providerBaseUrl: 'http://localhost:8080', // Replace with your provider's URL
        pactBrokerUrl: 'https://jignect-technologies-a250.pactflow.io',
        pactBrokerToken: 'SeEVlMw3J3AKI7lq1mEaTA',
        publishVerificationResult: true,
        providerVersion: '90a1f01efe0bae047f9eb00b3a900ad48e4a0530', // Replace with your provider version
        providerBranch: 'main',
        consumerVersionSelectors: [
            {
                consumer: 'GetConsumer', // Replace with your consumer name
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
