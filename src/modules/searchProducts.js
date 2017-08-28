import _ from 'lodash';

/**
 * Search the product catalog for a partial match on name or price.
 *
 * Ex:
 * constructQS({foo:'alpha', bar:'beta'}) -> '?foo=alpha&bar=beta'
 *
 * @param {array} products
 * @param {string} searchFragment
 *
 * @returns {array} of matching products
 */
export default function(products = [], searchFragment = '') {
  searchFragment = searchFragment.toLowerCase().replace(/[$]/g, '').trim();

  let filteredProducts = products;

  if (searchFragment.length) {
    filteredProducts = products.filter(product => {
      console.log(product.price.toString());
      return (product.name.toLowerCase().indexOf(searchFragment) > -1) ||
        (product.price.toString().indexOf(searchFragment) > -1)
    });
  } else {
    console.log('pass back full product array');
  }

  return filteredProducts;
};
