import { join, resolve } from "path";
import consola from "consola";

export default async function hydratableModule() {
  const logger = consola.withScope("@blokwise/dynamic");

  this.nuxt.hook("components:dirs", (dirs) => {
    dirs.push({
      path: join(__dirname, "components"),
      pattern: "**/*.vue",
      prefix: "nuxt",
      global: isGlobal,
    });
  });

  this.nuxt.hook("components:extend", (components) => {
    // there are a default import and a lazy (async) import for every component found
    // grab all possible prefixes
    const prefixes = [
      ...new Set(
        components
          .filter((c) => !c.async)
          .map((c) => {
            const filename = c.filePath.split("\\").pop();
            const componentName = filename.replace(".vue", "");
            return c.pascalName.replace(componentName, "");
          })
      ),
    ];

    // add nuxt-components plugin to inject the array of detected components
    const hydratableComponents = components.filter((c) => !c.global && c.async);
    this.addPlugin({
      src: resolve(__dirname, "plugins/dynamic.js"),
      options: { components: hydratableComponents, prefixes },
    });

    logger.success({
      message: "hydratables ready",
      additional: `Module @blokwise/dynamic successfully initialized.\nReady to hydrate ${
        hydratableComponents.length
      } lazy dynamic components (with prefixes ${prefixes
        .map((prefix) => `'${prefix}'`)
        .join(
          ", "
        )}).\n\nThis allows the developer to load components detected by @nuxt/components lazily as dynamic components.\nRead docs: https://dynamic.blokwise.io`,
      badge: true,
    });
  });

  return true;
}

module.exports.meta = require("./../package.json");
