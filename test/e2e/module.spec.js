import { setupTest, expectModuleToBeCalledWith } from "@nuxt/test-utils";

describe("Module", () => {
  setupTest({
    browser: true,
  });

  it("injects Plugin", () => {
    expectModuleToBeCalledWith("addPlugin", {
      src: expect.stringContaining("dynamic.js"),
      options: expect.objectContaining({
        components: expect.any(Array),
        prefixes: expect.any(Array),
      }),
    });
  });
});
