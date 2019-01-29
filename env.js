/**
 * Created by vladtomsa on 17/01/2019
 */
// identity-service endpoint
const API_URLS = {
  localnet: 'http://localhost:8000',
  testnet: 'https://enrollment-test.persona.im',
  persona: 'https://enrollment-test.persona.im',
};

// Persona blockchain endpoint
const PERSONA_URLS = {
  localnet: 'http://localhost:4100',
  testnet: 'https://enrollment-test.persona.im',
  persona: 'https://enrollment-test.persona.im',
};

// Recaptcha site key
const RECAPTCHA_KEYS = {
  localnet: '6LcH_nIUAAAAAAAq_jKpp4gJ_3H8G-JrqFWB4zTL',
  testnet: '6LcpjHUUAAAAADYvU0MxCMtm3KIgt_DrgJrtos4K',
  persona: '6LcH_nIUAAAAAAAq_jKpp4gJ_3H8G-JrqFWB4zTL'
};

module.exports = {
  API_URLS,
  PERSONA_URLS,
  RECAPTCHA_KEYS,
};
