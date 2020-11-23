import { join, resolve } from "path";
import consola from "consola";
import { toPascalCase } from "./utils/cases";

export default async function dynamicModule({ withConsole = false }) {
  const logger = consola.withScope("@blokwise/dynamic");

  this.nuxt.hook("components:dirs", (dirs) => {
    dirs.push({
      path: join(__dirname, "components"),
      pattern: "**/*.vue",
      prefix: "nuxt",
    });
  });

  this.nuxt.hook("components:extend", (components) => {
    // grab all possible prefixes
    const prefixes = [
      ...new Set(
        components
          .filter((c) => !c.async)
          .map((c) => {
            const filename = c.filePath.split("\\").pop();
            const componentName = filename.replace(".vue", "");
            const re = new RegExp(`${toPascalCase(componentName)}$`);
            return c.pascalName.replace(re, "");
          })
      ),
    ];

    // there is a default import and a lazy (async) import for each component
    // add plugin to inject the array of async components
    const asyncComponents = components.filter((c) => !c.global && c.async);
    this.addPlugin({
      src: resolve(__dirname, "plugins/dynamic.js"),
      options: { components: asyncComponents, prefixes },
    });

    if (withConsole) {
      logger.success({
        message: "auto import for dynamic components ready",
        additional: `Module @blokwise/dynamic successfully registered.\nReady to auto import ${
          asyncComponents.length
        } items as dynamic components lazily (with prefixes: ${prefixes
          .map((prefix) => `'${prefix}'`)
          .join(", ")}).\nRead docs: https://dynamic.blokwise.io`,
        badge: true,
      });
    }
  });

  return true;
}

module.exports.meta = require("./../package.json");
