import React from 'react';
import Table from './Table';
import {shallow} from 'enzyme';
import * as MarvelService from "../../../lib/MarvelService";

jest.mock("../../../lib/MarvelService");

describe('<Table /> renders successfully', () => {
    MarvelService.getMarvelCharacters.mockResolvedValue({ 
        characters: [{ 
            description: '', 
            thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784', extension: '"jpg"' },
            name:'3-D Man'
        }],
        maxPage:1,
        total: 1
    });
    it('renders <Table /> components', () => {
        const wrapper = shallow(<div><Table /></div>);
        expect(wrapper.contains("<th>Name of Hero</th>")).toEqual(false);
    });
});
