import dotenv from "dotenv";
dotenv.config();

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
    const isDirectory =
      fs.existsSync(mappedSpecifier) &&
      fs.lstatSync(mappedSpecifier).isDirectory();
    //In case the mapped is directory, we will map to index file instead if have
    if (isDirectory) {
      mappedSpecifier += "\\index";
    }
    specifier = `${mappedSpecifier}.js`;
    if (process.env.NODE_ENV == "DEVELOPMENT") {
      console.log("LOADER: " + specifier);
    }
    const url = specifier.startsWith("file:")
      ? specifier
      : pathToFileURL(specifier.toString());

    return resolveTs(url.toString(), context, defaultResolver);
  } else {
    // If we can't find a mapping, just pass it on to the default resolver
    return resolveTs(specifier, context, defaultResolver);
  }
}
