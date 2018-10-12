/**
 * Created by vladtomsa on 09/10/2018
 */
import { attributesConstants } from 'constants/attributes';
import moment from 'moment';

const initialState = {
  attributeTypes: [],
  userAttributes: [],
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
    case (attributesConstants.ON_GET_ATTRIBUTE_TYPES_SUCCESS):
      return { ...state, isLoading: null, attributeTypes: payload };
    case (attributesConstants.ON_GET_USER_ATTRIBUTES_SUCCESS):
      return { ...state, isLoading: null, userAttributes: payload, lastCheck: moment() };
    case (attributesConstants.ON_GET_FILE_ATTRIBUTE_SUCCESS):
      return { ...state, isLoading: null, selectedFileAttribute: payload };
    case (attributesConstants.ON_DESELECT_FILE_ATTRIBUTE):
      return { ...state, selectedFileAttribute: null };
    case (attributesConstants.ON_GET_ATTRIBUTE_TYPES_FAILURE):
    case (attributesConstants.ON_GET_USER_ATTRIBUTES_FAILURE):
    case (attributesConstants.ON_GET_FILE_ATTRIBUTE_FAILURE):
      return { ...state, isLoading: null };
    default:
      return state;
  }
}
