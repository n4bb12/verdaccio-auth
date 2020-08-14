// because ./client is importing this, too
declare const __dirname: string

export const pluginName = "verdaccio-auth"
export const configKey = "auth"
export const publicRoot = __dirname + "/client"
export const staticUrl = "/-/static/" + pluginName
export const loginUrl = "/-/login"
export const logoutUrl = "/"
