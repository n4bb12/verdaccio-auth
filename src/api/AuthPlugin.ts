import { RemoteUser } from "@verdaccio/types"
import { Request, Router } from "express"

export type AuthType = "redirect" | "reverse_proxy" | "login_form"

export interface AuthPlugin {
  /**
   * The ID is used for logging and as a namespace for request handlers.
   */
  id: string

  /**
   * This option determines how the default Verdaccio user interface gets
   * modified.
   *
   * - `redirect`: Enables the login page and adds a button to initiate the
   * redirect.
   *
   * - `reverse_proxy`: If this is the only type of authentication mechanism,
   * the default login button gets removed and the login page doesn't get added.
   *
   * - `login_form`: This option adds a login form to the login page. If using
   * the htpasswd plugin, this behaviour gets added automatically.
   */
  type: AuthType

  /**
   * The logo is used
   * - in the heading of the setup instructions for every authentication method
   * - in the login button for redirect-based authentication methods
   */
  logoUrl?: string

  /**
   * This refers to the instructions Verdaccio presents to users by default,
   * however, scoped to a single authentication method.
   *
   * Every entry in the return value is rendered as a separate step.
   *
   * If empty or not implemented, no setup instructions get added.
   *
   * If no authentication method adds setup instructions, the corresponding
   * user interface components get removed.
   */
  getSetupInstructions?: (user: RemoteUser) => Promise<string[]>

  /**
   * This refers to the instructions Verdaccio presents to users by default,
   * however scoped to a single authentication method.
   * Every entry in the return value is rendered as a separate step.
   */
  getRedirectUrl?: (req: Request) => Promise<string>

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
