import React from 'react';
import Exer3 from '../components/Exer3';
import renderer from 'react-test-renderer';

jest.mock('../components/marvelComponents/table/Table', () => () => <div id="TableComponent">TableComponent</div>);
jest.mock('../components/marvelComponents/header/Header', () => () => <div id="HeaderComponent">HeaderComponent</div>);

it('Exer3 renders correctly', () => {
    const tree = renderer
        .create(<Exer3/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
