const keyValueToString = ([key, val]) => {
  if (typeof val === 'object' && !Array.isArray(val)) {
    throw new Error('Please check you params');
  }
  return `${key}=${val}`;
};

module.exports.queryString = obj =>
  Object.entries(obj).map(keyValueToString).join('&');

module.exports.parse = string =>
  Object.fromEntries(string.split('&').map(item => item.split('=')));
