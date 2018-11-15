/**
 * Created by vladtomsa on 09/10/2018
 */
import { attributesConstants } from 'constants/attributes';
import moment from 'moment';

const initialState = {
  attributeTypes: [],
  userAttributes: [],
  userSentValidationRequests: [],
  validatorValidationRequests: [],
  lastCheck: null,
  selectedFileAttribute: null,
  isLoading: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (attributesConstants.ON_GET_ATTRIBUTE_TYPES_INIT):
      return { ...state, isLoading: attributesConstants.ON_GET_ATTRIBUTE_TYPES_INIT };
    case (attributesConstants.ON_GET_USER_ATTRIBUTES_INIT):
      return { ...state, isLoading: attributesConstants.ON_GET_USER_ATTRIBUTES_INIT };
    case (attributesConstants.ON_GET_FILE_ATTRIBUTE_INIT):
      return { ...state, isLoading: attributesConstants.ON_GET_FILE_ATTRIBUTE_INIT };
    case (attributesConstants.ON_CREATE_VALIDATION_REQUEST_INIT):
      return { ...state, isLoading: attributesConstants.ON_CREATE_VALIDATION_REQUEST_INIT };
    case (attributesConstants.ON_GET_VALIDATION_REQUESTS_INIT):
      return { ...state, validatorValidationRequests: [], isLoading: attributesConstants.ON_GET_VALIDATION_REQUESTS_INIT, };
    case (attributesConstants.ON_GET_USER_SENT_VALIDATION_REQUESTS_INIT):
      return { ...state, userSentValidationRequests: [], isLoading: attributesConstants.ON_GET_USER_SENT_VALIDATION_REQUESTS_INIT, };

    case (attributesConstants.ON_GET_ATTRIBUTE_TYPES_SUCCESS):
      return { ...state, isLoading: null, attributeTypes: payload };
    case (attributesConstants.ON_GET_USER_ATTRIBUTES_SUCCESS):
      return { ...state, isLoading: null, userAttributes: payload, lastCheck: moment() };
    case (attributesConstants.ON_GET_FILE_ATTRIBUTE_SUCCESS):
      return { ...state, isLoading: null, selectedFileAttribute: payload };
    case (attributesConstants.ON_GET_VALIDATION_REQUESTS_SUCCESS):
      return { ...state, isLoading: null, validatorValidationRequests: payload };
    case (attributesConstants.ON_GET_USER_SENT_VALIDATION_REQUESTS_SUCCESS):
      return { ...state, isLoading: null, userSentValidationRequests: payload };

    case (attributesConstants.ON_GET_ATTRIBUTE_TYPES_FAILURE):
    case (attributesConstants.ON_GET_USER_ATTRIBUTES_FAILURE):
    case (attributesConstants.ON_GET_FILE_ATTRIBUTE_FAILURE):
    case (attributesConstants.ON_CREATE_VALIDATION_REQUEST_SUCCESS):
    case (attributesConstants.ON_CREATE_VALIDATION_REQUEST_FAILURE):
    case (attributesConstants.ON_GET_VALIDATION_REQUESTS_FAILURE):
    case (attributesConstants.ON_GET_USER_SENT_VALIDATION_REQUESTS_FAILURE):
    case (attributesConstants.ON_VALIDATION_UPDATE_DONE):
      return { ...state, isLoading: null };

    case (attributesConstants.ON_DESELECT_FILE_ATTRIBUTE):
      return { ...state, selectedFileAttribute: null };

    case (attributesConstants.ON_VALIDATION_UPDATE_INIT):
      return { ...state, isLoading: attributesConstants.ON_VALIDATION_UPDATE_INIT };
    default:
      return state;
  }
}
