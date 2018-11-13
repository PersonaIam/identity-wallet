/**
 * Created by vladtomsa on 02/11/2018
 */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import checkPropTypes from 'check-prop-types';
import { Header } from './index';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 * */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Header { ...props }/>);

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

const HeaderProps = {
  classes: {},
  onLogout: console.log,
  openSidenav: console.log,
  t: (v) => v
};

describe('<Header /> component tests', () => {
  let wrapper;

  beforeEach(
    () => {
      wrapper = setup(HeaderProps);
    }
  );

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should throw error when not passing required props', () => {
    const check = checkPropTypes(Header.propTypes, {}, 'prop', Header.name);

    expect(check).toBeDefined();
  });

  it('should render successfully when passing required props', () => {
    const check = checkPropTypes(Header.propTypes, HeaderProps, 'prop', Header.name);

    expect(check).toBeUndefined();
  });

  it('should render sinenav menu toggle and open sidenav when toggle clicked', () => {
    const sidenavToggle = findByTestAttribute(wrapper, 'sidenav-menu');

    expect(sidenavToggle.length).toBe(1);

    sidenavToggle.simulate('click');

    wrapper.update();
  });

  it('should render language toggle', () => {
    expect(findByTestAttribute(wrapper, 'language-toggle').length).toBe(1);
  });

  it('should render login and register buttons when not authenticated', () => {
    wrapper.setProps({ userInfo: null });

    expect(findByTestAttribute(wrapper, 'login').length).toBe(1);

    expect(findByTestAttribute(wrapper, 'register').length).toBe(1);

    expect(findByTestAttribute(wrapper, 'user-menu').length).toBe(0);

    expect(findByTestAttribute(wrapper, 'notifications').length).toBe(0);
  });

  test('should render user-menu and and notifications authenticated', () => {
    wrapper.setProps({ userInfo: {} });

    expect(findByTestAttribute(wrapper, 'login').length).toBe(0);

    expect(findByTestAttribute(wrapper, 'register').length).toBe(0);

    expect(findByTestAttribute(wrapper, 'user-menu').length).toBe(1);

    expect(findByTestAttribute(wrapper, 'notifications').length).toBe(1);
  });
});
