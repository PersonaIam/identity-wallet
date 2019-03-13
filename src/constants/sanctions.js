/**
 * Created by vladtomsa on 2019-03-11
 */
export const sanctionsConstants = {
  GET_SANCTIONS_INIT: '@GET_SANCTIONS_INIT',
  GET_SANCTIONS_SUCCESS: '@GET_SANCTIONS_SUCCESS',
  GET_SANCTIONS_FAILURE: '@GET_SANCTIONS_FAILURE',
  RESET_SANCTIONS: '@RESET_SANCTIONS',
};

export const SANCTIONS_SOURCES = [
  {
    name: 'US Treasury Sanctions List',
    url: 'www.treasury.gov',
    imgUrl: '/images/US-Treasury.png'
  }, {
    name: 'EU Sanctions List',
    url: 'https://webgate.ec',
    imgUrl: '/images/EU-Logo.png'
  }
];

export const MAP_ATTRIBUTES_TO_SANCTIONS_PARAMS = {
  'first_name': 'firstName',
  'last_name': 'lastName',
  'ssn': 'ssn',
};
