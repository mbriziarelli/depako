// Top level file is just a mixin of submodules & constants

export { Deflate, deflate, deflateRaw, gzip } from "./lib/deflate.ts";
export { Inflate, inflate, inflateRaw, ungzip } from "./lib/inflate.ts";
export * as constants from "./lib/zlib/constants.ts";
