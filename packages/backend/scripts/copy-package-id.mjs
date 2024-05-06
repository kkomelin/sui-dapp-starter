#!/usr/bin/env node

/**
 * The script copies the deployed package ID from the localnet logs to the frontend package as .env.local
 * which is then read by the app.
 */

import fs from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'

const SOURCE_FILE = path.join(
  homedir(),
  '/suibase/workdirs/localnet/published-data/greeting/most-recent/package-id.json'
)

const TARGET_FILE = path.join(process.cwd(), '../frontend/.env.local')

try {
  const data = fs.readFileSync(SOURCE_FILE, 'utf8')
  const packageId = JSON.parse(data)[0]

  const output = `VITE_CONTRACT_PACKAGE_ID="${packageId}"\n`
  fs.writeFileSync(TARGET_FILE, output)
  
} catch (err) {
  console.error(err)
}
