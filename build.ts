import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./index.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "stupid-gene",
    version: Deno.args[0],
    description: "A small evolutionary algorithms library",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/YunnoKon/StupidGene.git",
    },
    bugs: {
      url: "https://github.com/YunnoKon/StupidGene/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});