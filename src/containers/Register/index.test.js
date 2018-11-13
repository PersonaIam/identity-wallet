/**
 * Created by vladtomsa on 02/11/2018
 */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import checkPropTypes from 'check-prop-types';
import { Register } from './index';
import RegisterForm from './Form';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 * */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Register { ...props }/>);

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
  return wrapper.find(`[data-test-id="${value}"]`);
};

const RegisterProps = {
  classes: {},
  createAccount: console.log,
};

describe('<Register /> component tests', () => {
  let wrapper;

  beforeEach(
    () => {
      wrapper = setup(RegisterProps);
    }
  );

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should throw error when not passing required props', () => {
    const check = checkPropTypes(Register.propTypes, {}, 'prop', Register.name);

    expect(check).toBeDefined();
  });

  it('should render successfully when passing required props', () => {
    const check = checkPropTypes(Register.propTypes, RegisterProps, 'prop', Register.name);

    expect(check).toBeUndefined();
  });

  it('should render registration form', () => {
    const registerForm = wrapper.find(RegisterForm);

    expect(registerForm.length).toBe(1);
  });
});
