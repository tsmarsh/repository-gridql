import { build_app } from "@gridql/server";

import { parse } from "@gridql/server/lib/config.js";
import fs from "fs";
import Log4js from "log4js";

Log4js.configure({
  appenders: {
    out: {
      type: "stdout",
    },
  },
  categories: {
    default: { appenders: ["out"], level: "info" },
  },
});
let logger = Log4js.getLogger("gridql/repository");

let configPath = "./config/config.conf";
if (fs.existsSync(configPath)) {
  parse(configPath)
    .then((config) => {
      logger.info(`Graphlettes: ${config.graphlettes.length}`);
      logger.info(`Restlettes: ${config.restlettes.length}`);
      build_app(config).then((app) => app.listen(config.port));
    })
    .catch((err) => logger.error(`Error parsing config: ${err}`));
} else {
  logger.error("Config missing");
}
