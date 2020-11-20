import { setupTest, createPage } from "@nuxt/test-utils";

describe("NuxtDynamic", () => {
  setupTest({
    browser: true,
  });

  it("loads components dynamically", async () => {
    const page = await createPage("/");
    const html = await page.innerHTML("body");

    expect(html).toContain("Content of Foo");
    expect(html).toContain("Content of Bar");
    expect(html).toContain("Content of kebab-case");
    expect(html).toContain("Content of snake_case");
  });

  it("handles slots correctly", async () => {
    const page = await createPage("/slots");
    const html = await page.innerHTML("body");

    expect(html).toContain("<div>page</div>");
    expect(html).toContain("<div>article</div>");
  });
});
