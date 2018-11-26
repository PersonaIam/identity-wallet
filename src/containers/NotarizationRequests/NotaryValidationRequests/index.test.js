/**
 * Created by vladtomsa on 19/11/2018
 */
/**
 * Created by vladtomsa on 01/11/2018
 */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NotaryValidationRequests from './index';

Enzyme.configure({ adapter: new EnzymeAdapter() });


/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 * */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<NotaryValidationRequests { ...props }/>);

  if (state) {
    wrapper.setState(state);
  }

  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} value - value of data-test attribue to search
 * @returns {ShallowWrapper}
 * */
const findByTestAttribute = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
};

describe('<NotaryValidationRequests /> component tests', () => {
  test('renders without crashing', () => {
    const wrapper = setup();
  });
});
