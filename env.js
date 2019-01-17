/**
 * Created by vladtomsa on 17/01/2019
 */
// identity-service endpoint
const API_URLS = {
  localnet: 'http://localhost:8000',
  testnet: 'http://localhost:8000',
  persona: 'https://enrollment.test.persona.im/',
};

// Persona blockchain endpoint
const PERSONA_URLS = {
  // localnet: 'http://192.168.1.216:4100',
  localnet: 'http://localhost:4100',
  testnet: 'http://localhost:4100',
  persona: 'http://localhost:4100',
};

// Recaptcha site key
const RECAPTCHA_KEYS = {
  localnet: '6LcH_nIUAAAAAAAq_jKpp4gJ_3H8G-JrqFWB4zTL',
  testnet: '6LcH_nIUAAAAAAAq_jKpp4gJ_3H8G-JrqFWB4zTL',
  persona: '6LcpjHUUAAAAADYvU0MxCMtm3KIgt_DrgJrtos4K'
};

module.exports = {
  API_URLS,
  PERSONA_URLS,
  RECAPTCHA_KEYS,
};
