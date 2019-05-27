import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import DetailView from './DetailView';
import * as MarvelService from "../../../lib/MarvelService";

let props;
beforeEach(() => {
    props = {
        selectedValue: {
            thumbnail: {
                path: 'path',
                extension: 'ext'
            },
            name: 'name',
            description: 'description'
        },
        open: true,
        onClose: jest.fn()
    }
});

jest.mock("../../../lib/MarvelService");
// // it('renders correctly', () => {

// //     apiCalls.getMarvelComics.mockResolvedValue({ comics: [] })
// //     const tree = renderer
// //         .create(<div><DetailView  {...props} /></div>).toJSON();
// //     expect(tree).toMatchSnapshot();
// // });

describe('<DetailView /> renders successfully', () => {
    MarvelService.getMarvelComics.mockResolvedValue(() => Promise.resolve({ comics: [] }));
    it('Render <DetailView /> components', () => {
      const wrapper = shallow(<div><DetailView  {...props} /></div>);
      expect(wrapper.contains("<li>")).toEqual(false);
    });
});