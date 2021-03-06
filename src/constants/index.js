/**
 * Created by vladtomsa on 26/09/2018
 */
export const ACCEPTED_FILE_TYPES = {
  PDF: 'data:application/pdf',
  IMAGE: 'data:image/',
};

export const ATTRIBUTE_EXPIRATIONS_STATES = {
  AVAILABLE: 1,
  WILL_EXPIRE: 2,
  EXPIRED: 3,
};

export const AVAILABLE_LANGUAGES = [
  // {
  //   code: 'de',
  //   name: 'German',
  //   flag: 'germany',
  //   value: 'GERMAN',
  // },
  {
    code: 'en',
    name: 'English',
    flag: 'united-states-of-america',
    value: 'ENGLISH'
  }
];

export const DEFAULT_ATTRIBUTE_CREDIBILITY_MONTHS = 6;

export const DATE_FORMAT = 'YYYY-MM-DD';

export const DATE_HOUR_MINUTE_FORMAT = 'HH:mm';

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

export const DAYS_BEFORE_EXPIRATION_NOTIFICATION = 30;

export const IDENTITY_USE_REQUEST_ACTION = {
  DECLINE: 0,
  APPROVE: 1,
  END: 2,
  CANCEL: 3,
};

export const IDENTITY_USE_REQUEST_STATUSES = {
  PENDING_APPROVAL : 'PENDING_APPROVAL',
  ACTIVE: 'ACTIVE',
  DECLINED: 'DECLINED',
  ENDED: 'ENDED',
  CANCELED: 'CANCELED',
};

export const MAX_CREDIBILITY_TRUST_POINTS = 16;

export const PERSONATOSHI_UNIT = Math.pow(10, 8); // 1 PERSONA has 100000000 "toshi"

export const PERSONA_MAINNET_NAME = 'persona'; // used in helpers/personaservice to check if web accesses mainnet / testenv/ localnet

export const PROVIDER_SERVICE_STATUSES = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export const SANCTIONABLE_ATTRIBUTES = {
  'first_name': true,
  'last_name': true,
  'ssn': true,
};

export const USER_ROLES = {
  IDENTITY_USER: 1,
  NOTARY: 2,
  PROVIDER: 3,
  SYS_ADMIN: 4,
};

export const VALIDATION_REQUEST_ACTION = {
  DECLINE: 0,
  APPROVE: 1,
  NOTARIZE: 2,
  REJECT: 3,
  CANCEL: 4,
};

export const VALIDATION_REQUESTS_STATUSES = {
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  IN_PROGRESS: 'IN_PROGRESS',
  DECLINED: 'DECLINED',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
};

export const VALIDATION_TYPE = {
  FACE_TO_FACE: 'FACE_TO_FACE',
  REMOTE: 'REMOTE',
};
