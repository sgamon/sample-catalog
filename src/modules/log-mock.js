import constructQS from './constructQS';

/**
 * Prints a console message alerting the mock request.
 *
 * @param {object} config axios config object
 * @param {integer} status
 */
export default function(config, status=200) {
  let verb = console.info ? 'info' : 'log';
  console[verb](`MOCK AXIOS: ${config.method.toUpperCase()} ${config.url}${constructQS(config.params)} - ${status}`);
};
