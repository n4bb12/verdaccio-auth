export type AuthPluginType = "redirect" | "header" | "form"

// *
// * - `redirect`: Enables the login page and adds a button to initiate the
// * redirect.
// *
// * - `header`: Expects authentication to be handled externally. If this is the
// * only type of authentication mechanism, the default login button and the
// * login page get removed.
// *
// * - `form`: This option adds a login form to the login page. If using
// * the htpasswd plugin, this behaviour gets added automatically.
