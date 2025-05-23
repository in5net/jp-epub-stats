/**
 * @license BSD-3-Clause
 * Copyright (c) 2024, ッツ Reader Authors
 * All rights reserved.
 */
// Implemented from https://github.com/ttu-ttu/ebook-reader/blob/main/apps/web/src/lib/functions/file-loaders/epub/types.ts

export interface Section {
  reference: string;
  charactersWeight: number;
  label?: string;
  startCharacter?: number;
  characters?: number;
  parentChapter?: string;
  text?: string;
}

export interface EpubMetadataMeta {
  "@_name": string;
  "@_content": string;
}

export interface EpubManifestItem {
  "@_href": string;
  "@_id": string;
  "@_media-type": string;
  "@_properties"?: string;
  "@_fallback"?: string;
}

export interface EpubSpineItemRef {
  "@_idref": string;
}

export interface EpubContent {
  package: {
    metadata: {
      "dc:title":
        | string
        | {
            "#text": string;
          };
      meta?: EpubMetadataMeta | EpubMetadataMeta[];
    };
    manifest: {
      item: EpubManifestItem[];
    };
    spine: {
      itemref: EpubSpineItemRef[];
    };
  };
}

export interface EpubOPFContent {
  "opf:package": {
    "opf:metadata": {
      "dc:title":
        | string
        | {
            "#text": string;
          };
      "opf:meta"?: EpubMetadataMeta | EpubMetadataMeta[];
    };
    "opf:manifest": {
      "opf:item": EpubManifestItem[];
    };
    "opf:spine": {
      "opf:itemref": EpubSpineItemRef[];
    };
  };
}

export function isOPFType(
  contents: EpubContent | EpubOPFContent,
): contents is EpubOPFContent {
  return (contents as EpubOPFContent)["opf:package"] !== undefined;
}
