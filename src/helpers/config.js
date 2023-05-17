/**
 * Get value of page meta tag
 *
 * @param {string} name Name of meta
 *
 * @returns {string}
 */
export function getCoreSetting(name) {
  // noinspection JSUnresolvedVariable
  return window.app_config[name];
}
