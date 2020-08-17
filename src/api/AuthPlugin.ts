import { RemoteUser } from "@verdaccio/types"
import { Router } from "express"

import { AuthPluginType } from "./AuthPluginType"

export interface AuthPlugin {
  /**
   * This option determines how the plugin integrates with Verdaccio, how the
   * user interface gets modified and which conventions apply.
   */
  type: AuthPluginType

  /**
   * The name is used to refer to the authentication method whenever it is
   * displayed to users.
   *
   * If no name is provided, the plugin's module name is used as a fallback.
   */
  name?: string

  /**
   * The logo is used
   * - in the heading of the authentication method's setup instructions
   * - in the login button (for redirect-based authentication methods)
   */
  logoUrl?: string

  /**
   * This creates a dedicated section in the setup instruction.
   *
   * Every entry in the return value is rendered as a separate step.
   *
   * If not implemented or empty, no setup instructions are added for this
   * authentication method.
   *
   * If none of the available authentication methods implement any setup
   * instructions, the corresponding user interface elements get removed.
   */
  getSetupInstructions?: (user: RemoteUser) => Promise<string[]>

  /**
   * If the authentication mechanism is redirect-based, if you would like to
   * serve custom assets, or need other special behaviour, you can add custom
   * request handlers.
   *
   * Note that these request handlers are mounted onto a router with a path
   * prefix and therefore cannot modify Verdaccio or behaviour added by other
   * plugins.
   */
  addRequestHandlers?: (router: Router) => void
}
