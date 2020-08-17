import { AuthPlugin } from "./AuthPlugin"

export interface AuthMethod extends AuthPlugin {
  /**
   * This is the npm module name of the authentication method.
   *
   * It is used for logging and error messages.
   */
  moduleName: string

  /**
   * This is the npm module name of the authentication method without the
   * verdaccio prefix.
   *
   * It is used as a logging prefix and serves as a namespace for request
   * handlers added by the authentication method.
   *
   * If the authentication method is redirect-based, it also determines the
   * URL that the corresponding login button redirects to.
   */
  id: string
}
