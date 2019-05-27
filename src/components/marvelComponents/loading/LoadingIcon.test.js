import React from 'react';
import LoadingIcon from './LoadingIcon';
import renderer from 'react-test-renderer';

it('LoadingIcon renders correctly', () => {
  const tree = renderer
    .create(<LoadingIcon/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});