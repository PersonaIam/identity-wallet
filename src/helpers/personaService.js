/**
 * Created by vladtomsa on 11/10/2018
 */
import {
  PERSONATOSHI_UNIT,
  PERSONA_MAINNET_NAME,
  DAYS_BEFORE_EXPIRATION_NOTIFICATION,
  ATTRIBUTE_EXPIRATIONS_STATES,
} from 'constants/index';
import personajs from 'personajs';
import bip39 from 'bip39';
import moment from "moment/moment";
// import {DATE_FORMAT} from "../constants";

export const getNetwork = () => {
  return personajs.networks[PERSONA_ENV];
};

export const isMainnet = () => {
  const { name } = getNetwork();
  return name === PERSONA_MAINNET_NAME
};

export const dateToPersonaStamp = (time) => {
  const { getTime, getTimeTestnet } = personajs.slots;

  const getTimeFunc = isMainnet() ? getTime : getTimeTestnet;

  return getTimeFunc(time);
};

export const personaStampToDate = (time) => {
  const { getRealTime, getRealTimeTestNet } = personajs.slots;

  const getTimeFunc = isMainnet() ? getRealTime : getRealTimeTestNet;

  return getTimeFunc(time);
};

export const getAttributeExpirationStatusAndRemainingDays = (time) => {
  const expireDate = moment(personaStampToDate(time));
  const remainingDays = expireDate.diff(moment(), 'days') + 1;
  let expirationStatus = ATTRIBUTE_EXPIRATIONS_STATES.AVAILABLE;

  if (remainingDays <= 0) {
    expirationStatus = ATTRIBUTE_EXPIRATIONS_STATES.EXPIRED
  }
  else if (remainingDays < DAYS_BEFORE_EXPIRATION_NOTIFICATION) {
    expirationStatus = ATTRIBUTE_EXPIRATIONS_STATES.WILL_EXPIRE;
  }

  return {
    expirationStatus,
    remainingDays,
  };
};

export const getToken = () => {
  return getNetwork().token;
};

export const generatePassphrase = () => {
  return bip39.generateMnemonic(null, null, bip39.wordlists['english']);
};

export const getPublicKey = (passphrase) => {
  const keyPair = personajs.crypto.getKeys(passphrase);

  return keyPair.publicKey;
};

export const generatePersonaAddress = (passphrase) => {
  const publicKey = getPublicKey(passphrase);
  const { pubKeyHash } = getNetwork();

  return personajs.crypto.getAddress(publicKey, pubKeyHash);
};

export const toshiToPersona = (amount, keepPrecise, numberOfDecimals) => {
  if (!amount) {
    return 0
  }

  let personaAmount = amount / PERSONATOSHI_UNIT;

  if (!keepPrecise) {
    personaAmount = numberToFixed(personaAmount)
  }

  if (typeof numberOfDecimals !== 'number') {
    return personaAmount
  }

  if (typeof personaAmount === 'number') {
    return personaAmount.toFixed(numberOfDecimals)
  }

  // if we have a string, 'toFixed' won't work, so we use our custom implementation for that
  return numberStringToFixed(personaAmount, numberOfDecimals)
};

export const encryptValue = (value, publicKey) => {
  const encryptedValue = personajs.encryption
    .encrypt(publicKey, value);

  return encryptedValue;
};

export const decryptValue = (value, privateKey) => {
  const decryptedValue = personajs.encryption.decrypt(privateKey, value);

  return decryptedValue;
};

const numberToFixed = (x) => {
  let e;
  if (Math.abs(x) < 1.0) {
    e = parseInt(x.toString().split('e-')[1], 10);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    e = parseInt(x.toString().split('+')[1], 10);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += (new Array(e + 1)).join('0');
    }
  }

  return x;
};

const numberStringToFixed = (persona, numberOfDecimals) => {
  if (typeof persona !== 'string' || typeof numberOfDecimals === 'undefined') {
    return persona;
  }

  const splitted = persona.split('.');

  if (numberOfDecimals === 0) {
    return splitted[0];
  }

  const decimals = splitted[1] || [];
  let newDecimals = '';
  for (let i = 0; i < numberOfDecimals; i++) {
    if (i < decimals.length) {
      newDecimals += decimals[i];
    } else {
      newDecimals += '0';
    }
  }

  return splitted[0] + '.' + newDecimals;
};
