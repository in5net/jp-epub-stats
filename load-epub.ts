/**
 * @license BSD-3-Clause
 * Copyright (c) 2024, ッツ Reader Authors
 * All rights reserved.
 */
// Implemented from https://github.com/ttu-ttu/ebook-reader/blob/main/apps/web/src/lib/functions/file-loaders/epub/load-epub.ts

import extractEpub from "./extract-epub.ts";
import generateEpubHtml from "./generate-epub-html.ts";
import { isOPFType } from "./types.ts";
import * as path from "@std/path";

export default async function loadEpub(filePath: string) {
  const stream = await Deno.readFile(filePath);
  const blob = new Blob([stream]);
  const { contents, result: data } = await extractEpub(blob);
  const result = generateEpubHtml(data, contents);

  const fileName = path.parse(filePath).name;
  let title = fileName;

  const metadata = isOPFType(contents)
    ? contents["opf:package"]["opf:metadata"]
    : contents.package.metadata;

  if (metadata) {
    const dcTitle = metadata["dc:title"];
    if (typeof dcTitle === "string") {
      title = dcTitle;
    } else if (dcTitle && dcTitle["#text"]) {
      title = dcTitle["#text"];
    }
  }

  return {
    ...result,
    title,
  };
}
