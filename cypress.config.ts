/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      api_url: "http://localhost:4000",
    },
    setupNodeEvents(on, _config) {
      // implement node event listeners here
      // @TODO: to remove if not working
      let server: any; // static reference to the mock server

      on("task", {
        mockServer({
          interceptUrl,
          fixture,
        }: {
          interceptUrl: string;
          fixture: string;
        }) {
          const fs = require("fs");
          const http = require("http");
          const { URL } = require("url");

          if (server) server.close(); // close any previous instance

          const url = new URL(interceptUrl);
          server = http.createServer((req: any, res: any) => {
            if (req.url === url.pathname) {
              const data = fs.readFileSync(`./cypress/fixtures/${fixture}`);
              res.end(data);
            } else {
              res.end();
            }
          });

          server.listen(url.port);

          return null;
        },
      });
    },
  },
});
