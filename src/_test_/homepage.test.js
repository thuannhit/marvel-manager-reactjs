import React from 'react';
import HomePage from '../components/HomePage';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

jest.mock('../components/Exer1', () => () => <div id="Exer1">Exer1</div>);
jest.mock('../components/Exer2', () => () => <div id="Exer2">Exer2</div>);
jest.mock('../components/Exer3', () => () => <div id="Exer3">Exer3</div>);

it('HomePage renders correctly', () => {
    const tree = renderer
        .create(<HomePage/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

describe('Test onClickBtn function', () => {
    it('Test click event', () => {
      const wrapper = shallow(<HomePage />);
      wrapper.instance().onClickBtn({target:{value:'Ex1'}});
      expect(wrapper.instance().state.sCurrentUI).toEqual('Ex1');
    });
  });