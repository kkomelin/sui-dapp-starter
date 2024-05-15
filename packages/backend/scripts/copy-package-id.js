#!/usr/bin/env node

/**
 * The script copies the deployed package ID from the corresponding Suibase network file to .env.local of the frontend package,
 * which is then read by the app.
 * 
 * The default network is localnet. To change it, pass "-n [NETWORK_TYPE]" through console.
 */

const { promises } = require("node:fs");
const { homedir } = require("node:os");
const path = require("node:path");
const EnvFileWriter = require("env-file-rw").default;

const DEPLOYED_MODULE_NAME = "greeting";

const main = async () => {
  const network = getNetworkFromArgs();
  const sourceFile = sourceFilePath(network, DEPLOYED_MODULE_NAME);
  const targetFile = targetFilePath();

  // Read SuiBase packageId file.
  const data = await promises.readFile(sourceFile, "utf8");
  const packageId = JSON.parse(data)[0];

  // Create .env.local file if it doesn't exist.
  try {
    await promises.writeFile(targetFile, "", { flag: "wx" });
  } catch {}

  // Add VITE_CONTRACT_PACKAGE_ID variable to .env.local or update its value if it exists.
  const envFileWriter = new EnvFileWriter(targetFile, false);
  await envFileWriter.parse();
  envFileWriter.set("VITE_CONTRACT_PACKAGE_ID", packageId);
  await envFileWriter.save();
};

const sourceFilePath = (network, deployedModuleName) => {
  return path.join(
    homedir(),
    `/suibase/workdirs/${network}/published-data/${deployedModuleName}/most-recent/package-id.json`
  );
};

const targetFilePath = () => {
  return path.join(process.cwd(), "../frontend/.env.local");
};

const getNetworkFromArgs = () => {
  const arg = process.argv.slice(2);

  switch (arg[0]) {
    case "-n":
      return arg[1];

    default:
      return "localnet";
  }
};

main().catch((e) => {
  console.error(e);
});
