import { defineConfig } from "vite";
import { readdirSync } from "fs";
import path from "path";
import react from "@vitejs/plugin-react-swc";

const absolutePathAliases = {};

// Root resources folder
const srcPath = path.resolve("./src/");

// Ajust the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map(
  (dirent) => dirent.name.replace(/(\.ts){1}(x?)/, "")
);

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      ...absolutePathAliases,
    },
  },
  plugins: [react()],
});
