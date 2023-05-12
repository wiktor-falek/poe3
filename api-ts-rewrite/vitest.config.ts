import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./tests/setup/mongodb-memory-server.ts"]
  }
})
