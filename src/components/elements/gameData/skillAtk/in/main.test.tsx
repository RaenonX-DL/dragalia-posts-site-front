import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {AttackingSkillInput} from './main';
import {InputData} from './types';
import {generateInputData, overwriteInputData} from './utils/inputData';


describe('ATK skill input', () => {
  let fnOnSearch: jest.Mock;
  let inputData: InputData;
  let setInputData: jest.Mock;

  beforeEach(() => {
    fnOnSearch = jest.fn();
    inputData = generateInputData();
    setInputData = jest.fn().mockImplementation((newData) => inputData = newData);
  });

  it('collapsed to summary on load', async () => {
    renderReact(() => (
      <AttackingSkillInput
        onSearchRequested={fnOnSearch}
        isSearchAllowed
        inputData={inputData}
        setInputData={setInputData}
      />
    ));

    const inspireButton = screen.queryByText(
      translationEN.game.skillAtk.name.crtInspired,
      {selector: '.collapse.show'},
    );
    expect(inspireButton).not.toBeInTheDocument();
  });

  it('cannot search if no info to display', async () => {
    const {rerender} = renderReact(() => (
      <AttackingSkillInput
        onSearchRequested={fnOnSearch}
        isSearchAllowed
        inputData={inputData}
        setInputData={setInputData}
      />
    ));

    const displayDamageInfo = screen.getByText(translationEN.game.skillAtk.display.options.damageInfo);
    const displaySpInfo = screen.getByText(translationEN.game.skillAtk.display.options.spInfo);
    const displayAffliction = screen.getByText(
      translationEN.game.skillAtk.display.options.affliction,
      {selector: 'span'},
    );
    userEvent.click(displayDamageInfo);
    rerender();
    userEvent.click(displaySpInfo);
    rerender();
    userEvent.click(displayAffliction);
    rerender();

    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.click(searchButton);
    rerender();

    const errorMessage = translationEN.game.skillAtk.error.noInfoToDisplay;
    await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
    expect(fnOnSearch).not.toHaveBeenCalled();
  });

  it('sends correct display config in input data', async () => {
    const {rerender} = renderReact(() => (
      <AttackingSkillInput
        onSearchRequested={fnOnSearch}
        isSearchAllowed
        inputData={inputData}
        setInputData={setInputData}
      />
    ));

    const displayAffliction = screen.getByText(
      translationEN.game.skillAtk.display.options.affliction,
      {selector: 'span'},
    );
    userEvent.click(displayAffliction);
    rerender();

    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.click(searchButton);

    expect(fnOnSearch).toHaveBeenCalledTimes(1);
    expect(fnOnSearch)
      .toHaveBeenLastCalledWith(overwriteInputData(generateInputData(), {display: {affliction: false}}));
  });

  it.todo('expands');

  it.todo('uses correct input data to search after changes');

  it.todo('shows correct summary after changes');
});
