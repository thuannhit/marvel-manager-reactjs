import React from 'react';
import Exer2 from '../components/Exer2';
import renderer from 'react-test-renderer';

it('Exer2 renders correctly', () => {
  const tree = renderer
    .create(<Exer2/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
