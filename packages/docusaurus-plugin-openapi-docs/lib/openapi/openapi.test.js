"use strict";
/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const utils_1 = require("@docusaurus/utils");
const _1 = require(".");
const createResponseExample_1 = require("./createResponseExample");
// npx jest packages/docusaurus-plugin-openapi/src/openapi/openapi.test.ts --watch
describe("openapi", () => {
    describe("readOpenapiFiles", () => {
        // it("readOpenapiFiles", async () => {
        //   const results = await readOpenapiFiles(
        //     posixPath(path.join(__dirname, "__fixtures__/examples"))
        //   );
        //   const categoryMeta = results.find((x) =>
        //     x.source.endsWith("_category_.json")
        //   );
        //   expect(categoryMeta).toBeFalsy();
        //   // console.log(results);
        //   const yaml = results.find((x) => x.source.endsWith("openapi.yaml"));
        //   expect(yaml).toBeTruthy();
        //   expect(yaml?.sourceDirName).toBe(".");
        //   expect(yaml?.data.tags).toBeDefined();
        //   expect(yaml?.data["x-tagGroups"]).toBeDefined();
        // });
        // it("tester", async () => {
        //   const results = await readOpenapiFiles(
        //     posixPath(
        //       "/Users/damien.schoof/workspace/talos/openapi/build/openapi.yaml"
        //     )
        //   );
        //   // const categoryMeta = results.find((x) =>
        //   //   x.source.endsWith("_category_.json")
        //   // );
        //   // expect(categoryMeta).toBeFalsy();
        //   // // console.log(results);
        //   // const yaml = results.find((x) => x.source.endsWith("openapi.yaml"));
        //   // expect(yaml).toBeTruthy();
        //   // expect(yaml?.sourceDirName).toBe(".");
        //   // expect(yaml?.data.tags).toBeDefined();
        //   // expect(yaml?.data["x-tagGroups"]).toBeDefined();
        //   const mdsSchema =
        //     results[0]!.data!.components!.schemas![
        //       "Market-Data.MarketDataSnapshot"
        //     ]!;
        //   expect(mdsSchema).toBeDefined();
        //   const bids = mdsSchema.properties!.Bids!;
        //   console.log(bids);
        //   const price = bids.items?.properties?.Price;
        //   expect(price).toBeDefined();
        //   console.log(price);
        //   const example = sampleResponseFromSchema(mdsSchema);
        //   console.log(example);
        // });
        it("tester", async () => {
            const results = await (0, _1.readOpenapiFiles)((0, utils_1.posixPath)("/Users/damien.schoof/workspace/talos/openapi/build/openapi.yaml"));
            // const categoryMeta = results.find((x) =>
            //   x.source.endsWith("_category_.json")
            // );
            // expect(categoryMeta).toBeFalsy();
            // // console.log(results);
            // const yaml = results.find((x) => x.source.endsWith("openapi.yaml"));
            // expect(yaml).toBeTruthy();
            // expect(yaml?.sourceDirName).toBe(".");
            // expect(yaml?.data.tags).toBeDefined();
            // expect(yaml?.data["x-tagGroups"]).toBeDefined();
            const mdsPath = results[0].data.paths["/v1/market-data/snapshot/{symbol}"];
            expect(mdsPath).toBeDefined();
            // console.log(mdsPath);
            const response = mdsPath.get.responses["200"];
            // console.log(response);
            const schema = response.content["application/json"].schema;
            // console.log(JSON.stringify(schema, null, 2));
            // const bids = mdsSchema.properties!.Bids!;
            // console.log(bids);
            // const price = bids.items?.properties?.Price;
            // expect(price).toBeDefined();
            // console.log(price);
            const example = (0, createResponseExample_1.sampleResponseFromSchema)(schema);
            console.log(JSON.stringify(example, null, 2));
            // const mergedAllOf = mergeAllOf(schema?.allOf);
            // console.log(JSON.stringify(mergedAllOf, null, 2));
        });
    });
});
