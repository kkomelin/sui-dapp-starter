#!/usr/bin/env node

/**
 * The script copies the deployed package ID from the localnet logs to the frontend package as .env.local
 * which is then read by the app.
 */

const { promises } = require("node:fs");
const { homedir } = require("node:os");
const path = require("node:path");
const EnvFileWriter = require("env-file-rw").default;

const NETWORK_TYPE = "localnet";
const DEPLOYED_MODULE_NAME = "greeting";

const SOURCE_FILE = path.join(
  homedir(),
  `/suibase/workdirs/${NETWORK_TYPE}/published-data/${DEPLOYED_MODULE_NAME}/most-recent/package-id.json`
);

const TARGET_FILE = path.join(process.cwd(), "../frontend/.env.local");

const main = async () => {
  // Read SuiBase packageId file.
  const data = await promises.readFile(SOURCE_FILE, "utf8");
  const packageId = JSON.parse(data)[0];

  // Create .env.local file if it doesn't exist.
  try {
    await promises.writeFile(TARGET_FILE, "", { flag: "wx" });
  } catch {}

  // Add VITE_CONTRACT_PACKAGE_ID variable to .env.local or update its value if it exists.
  const envFileWriter = new EnvFileWriter(TARGET_FILE, false);
  await envFileWriter.parse();
  envFileWriter.set("VITE_CONTRACT_PACKAGE_ID", packageId);
  await envFileWriter.save();
};

main().catch((e) => {
  console.error(e);
});
