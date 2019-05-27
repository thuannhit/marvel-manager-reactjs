import React from 'react';
import Exer1 from '../components/Exer1';
import renderer from 'react-test-renderer';

it('Exer1 renders correctly', () => {
  const tree = renderer
    .create(<Exer1/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});