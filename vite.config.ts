import { defineConfig, loadEnv } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import path from "node:path";

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Ensure process.env contains variables from .env for server functions
  Object.assign(process.env, env);

  return {
    server: {
      port: 3000,
    },
    define: {
      "process.env.TSS_SERVER_FN_BASE": JSON.stringify("/_serverFn/"),
      "process.env": {},
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      tailwindcss(),
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart(),
      command === "build" ? nitro() : null,
      viteReact(),
    ],
  };
});
