import { Config as VerdaccioConfig } from "@verdaccio/types"
import chalk from "chalk"
import { get } from "lodash"

import { configKey, pluginName } from "../constants"
import { logger } from "./logger"

//
// Types
//

export interface PluginConfig {
  org: string
  "client-id": string
  "client-secret": string
  "enterprise-origin"?: string
}

export type PluginConfigKey = keyof PluginConfig

export interface Config extends VerdaccioConfig, PluginConfig {
  middlewares: { [pluginName]: PluginConfig }
  auth: { [pluginName]: PluginConfig }
}

//
// Access
//

export function getConfig(config: Config, key: PluginConfigKey): string {
  const value =
    null ||
    get(config, `middlewares[${pluginName}][${key}]`) ||
    get(config, `auth[${pluginName}][${key}]`)

  return process.env[value] || value
}

//
// Validation
//

function ensurePropExists(config: Config, key: PluginConfigKey) {
  const value = getConfig(config, key)

  if (!value) {
    logger.error(
      chalk.red(
        `[${configKey}] ERR: Missing configuration "auth.${configKey}.${key}"`,
      ),
    )
    throw new Error("Please check your verdaccio config.")
  }
}

function ensureNodeIsNotEmpty(config: Config, node: keyof Config) {
  const path = `[${node}][${configKey}]`
  const obj = get(config, path, {})

  if (!Object.keys(obj).length) {
    throw new Error(`"${node}.${configKey}" must be enabled`)
  }
}

export function validateConfig(config: Config) {
  ensureNodeIsNotEmpty(config, "auth")
  ensureNodeIsNotEmpty(config, "middlewares")

  // ensurePropExists(config, "org")
  // ensurePropExists(config, "client-id")
  // ensurePropExists(config, "client-secret")
}
