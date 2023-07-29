/*
loader.js

Usage (I'm also using dotenv, but you can omit the dotenv parts if needed):
DOTENV_CONFIG_PATH=.env node -r dotenv/config --loader=./loader.js /bin/path/to/cli.ts
*/
import { pathToFileURL } from "node:url";
import {
  getFormat,
  load,
  resolve as resolveTs,
  transformSource,
} from "ts-node/esm";
import * as tsConfigPaths from "tsconfig-paths";
import * as fs from "fs";

export { getFormat, transformSource, load };

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig();
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export function resolve(specifier, context, defaultResolver) {
  let mappedSpecifier = matchPath(specifier);
  if (mappedSpecifier) {
    console.log(mappedSpecifier);
    const isDirectory =
      fs.existsSync(mappedSpecifier) &&
      fs.lstatSync(mappedSpecifier).isDirectory();
    //In case the mapped is directory, we will map to index file instead if have
    if (isDirectory) {
      mappedSpecifier += "\\index";
    }
    specifier = `${mappedSpecifier}.js`;

    const url = specifier.startsWith("file:")
      ? specifier
      : pathToFileURL(specifier.toString());

    return resolveTs(url.toString(), context, defaultResolver);
  } else {
    // If we can't find a mapping, just pass it on to the default resolver
    return resolveTs(specifier, context, defaultResolver);
  }
}
