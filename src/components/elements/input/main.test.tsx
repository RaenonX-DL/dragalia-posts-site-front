import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {typeInput} from '../../../../test/utils/event';
import {SupportedLanguages} from '../../../api-def/api/other/lang';
import {InputPanel} from './main';


describe('Input collection', () => {
  let inputData: {
    num?: number,
    nums?: Array<number>,
    check1?: boolean,
    check2?: boolean,
  };
  let fnSetInputData: jest.Mock;

  beforeEach(() => {
    fnSetInputData = jest.fn().mockImplementation((newData) => inputData = newData);
  });

  it('renders section title w/ click to show description', async () => {
    inputData = {};

    renderReact(() => (
      <InputPanel
        inputEntries={[
          {
            type: 'title',
            title: 'title',
            description: 'description',
          },
        ]}
        inputData={inputData}
        setInputData={fnSetInputData}
      />
    ));

    const infoIcon = screen.getByText('', {selector: 'i.bi'});
    userEvent.click(infoIcon);
    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it('renders sub title w/ click to show description', async () => {
    inputData = {};

    renderReact(() => (
      <InputPanel
        inputEntries={[
          {
            type: 'subTitle',
            title: 'title',
            description: 'description',
          },
        ]}
        inputData={inputData}
        setInputData={fnSetInputData}
      />
    ));

    const titleElement = screen.getByText('', {selector: 'i.bi'});
    userEvent.click(titleElement);
    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it('renders separator', async () => {
    inputData = {};

    renderReact(() => (
      <InputPanel
        inputEntries={[{type: 'separator'}]}
        inputData={inputData}
        setInputData={fnSetInputData}
      />
    ));

    expect(screen.getByText('', {selector: 'hr'})).toBeInTheDocument();
  });

  it('renders numeric input', async () => {
    inputData = {num: 7};

    const {rerender} = renderReact(() => (
      <InputPanel
        inputEntries={[
          {
            type: 'inputNumber',
            title: 'title',
            description: 'description',
            getValue: (inputData) => inputData.num || 0,
            getUpdatedInputData: (newValue) => ({num: newValue}),
          },
        ]}
        inputData={inputData}
        setInputData={fnSetInputData}
      />
    ));

    const inputElement = screen.getByDisplayValue('7');
    typeInput(inputElement, '8', {rerender});
    expect(fnSetInputData).toHaveBeenCalledTimes(1);
    expect(fnSetInputData).toHaveBeenLastCalledWith({num: 78});
    expect(screen.getByDisplayValue('78')).toBeInTheDocument();
  });

  it('renders checkbox group', async () => {
    inputData = {check1: false, check2: false};

    const {rerender} = renderReact(() => (
      <InputPanel
        inputEntries={[
          {
            type: 'inputCheckGroup',
            checkboxes: [
              {
                text: 'check 1',
                getValue: (inputData) => inputData.check1 ?? false,
                getUpdatedInputData: (newValue) => ({...inputData, check1: newValue}),
              },
              {
                text: 'check 2',
                getValue: (inputData) => inputData.check2 ?? false,
                getUpdatedInputData: (newValue) => ({...inputData, check2: newValue}),
              },
            ],
          },
        ]}
        inputData={inputData}
        setInputData={fnSetInputData}
      />
    ));

    const check1Button = screen.getByText('check 1');
    const check2Button = screen.getByText('check 2');

    userEvent.click(check1Button);
    rerender();

    expect(fnSetInputData).toHaveBeenCalledTimes(1);
    expect(fnSetInputData).toHaveBeenLastCalledWith({check1: true, check2: false});

    userEvent.click(check2Button);
    rerender();

    expect(fnSetInputData).toHaveBeenCalledTimes(2);
    expect(fnSetInputData).toHaveBeenLastCalledWith({check1: true, check2: true});

    userEvent.click(check1Button);
    rerender();

    expect(fnSetInputData).toHaveBeenCalledTimes(3);
    expect(fnSetInputData).toHaveBeenLastCalledWith({check1: false, check2: true});
  });

  it('renders radio group', async () => {
    inputData = {num: 1};

    const {rerender} = renderReact(() => (
      <InputPanel
        inputEntries={[
          {
            type: 'inputRadioGroup',
            options: [
              {text: 'option 1', code: 1},
              {text: 'option 2', code: 2},
              {text: 'option 3', code: 3},
            ],
            getValue: (inputData) => inputData.num || 1,
            getUpdatedInputData: (newValue) => ({num: newValue}),
            getCheckOptionComparer: (option) => option.code,
            groupName: 'group',
          },
        ]}
        inputData={inputData}
        setInputData={fnSetInputData}
      />
    ));

    const option2 = screen.getByText('option 2');

    userEvent.click(option2);
    rerender();

    expect(fnSetInputData).toHaveBeenCalledTimes(1);
    expect(fnSetInputData).toHaveBeenLastCalledWith({num: 2});
  });

  it('renders enum checkbox group', async () => {
    inputData = {nums: []};

    const {rerender} = renderReact(() => (
      <InputPanel
        inputEntries={[
          {
            type: 'enumCheckGroup',
            options: [
              {
                name: 'enum 1',
                code: 1,
                imagePath: 'enum1.png',
                trans: {
                  [SupportedLanguages.CHT]: 'enum 1 CHT',
                  [SupportedLanguages.EN]: 'enum 1 EN',
                  [SupportedLanguages.JP]: 'enum 1 JP',
                },
              },
              {
                name: 'enum 2',
                code: 2,
                imagePath: 'enum2.png',
                trans: {
                  [SupportedLanguages.CHT]: 'enum 2 CHT',
                  [SupportedLanguages.EN]: 'enum 2 EN',
                  [SupportedLanguages.JP]: 'enum 2 JP',
                },
              },
            ],
            getValue: (inputData) => inputData.nums ?? [],
            getUpdatedInputData: (newValue) => ({nums: newValue}),
          },
        ]}
        inputData={inputData}
        setInputData={fnSetInputData}
      />
    ));

    const enum1Element = screen.getByAltText('enum 1 EN');
    const enum2Element = screen.getByAltText('enum 2 EN');

    userEvent.click(enum1Element);
    rerender();

    expect(fnSetInputData).toHaveBeenCalledTimes(1);
    expect(fnSetInputData).toHaveBeenLastCalledWith({nums: [1]});

    userEvent.click(enum2Element);
    rerender();

    expect(fnSetInputData).toHaveBeenCalledTimes(2);
    expect(fnSetInputData).toHaveBeenLastCalledWith({nums: [1, 2]});

    userEvent.click(enum1Element);
    rerender();

    expect(fnSetInputData).toHaveBeenCalledTimes(3);
    expect(fnSetInputData).toHaveBeenLastCalledWith({nums: [2]});
  });

  it('renders enum radio group', async () => {
    inputData = {num: 1};

    const {rerender} = renderReact(() => (
      <InputPanel
        inputEntries={[
          {
            type: 'enumRadioGroup',
            options: [
              {
                name: 'enum 1',
                code: 1,
                imagePath: 'enum1.png',
                trans: {
                  [SupportedLanguages.CHT]: 'enum 1 CHT',
                  [SupportedLanguages.EN]: 'enum 1 EN',
                  [SupportedLanguages.JP]: 'enum 1 JP',
                },
              },
              {
                name: 'enum 2',
                code: 2,
                imagePath: 'enum2.png',
                trans: {
                  [SupportedLanguages.CHT]: 'enum 2 CHT',
                  [SupportedLanguages.EN]: 'enum 2 EN',
                  [SupportedLanguages.JP]: 'enum 2 JP',
                },
              },
            ],
            getValue: (inputData) => inputData.num ?? 1,
            getUpdatedInputData: (newValue) => ({num: newValue}),
            groupName: 'group',
          },
        ]}
        inputData={inputData}
        setInputData={fnSetInputData}
      />
    ));

    const enum1Element = screen.getByAltText('enum 1 EN');
    const enum2Element = screen.getByAltText('enum 2 EN');

    userEvent.click(enum2Element);
    rerender();

    expect(fnSetInputData).toHaveBeenCalledTimes(1);
    expect(fnSetInputData).toHaveBeenLastCalledWith({num: 2});

    userEvent.click(enum1Element);
    rerender();

    expect(fnSetInputData).toHaveBeenCalledTimes(2);
    expect(fnSetInputData).toHaveBeenLastCalledWith({num: 1});

    userEvent.click(enum2Element);
    rerender();

    expect(fnSetInputData).toHaveBeenCalledTimes(3);
    expect(fnSetInputData).toHaveBeenLastCalledWith({num: 2});
  });

  it('renders multiple inputs', async () => {
    inputData = {check1: false, check2: false};

    renderReact(() => (
      <InputPanel
        inputEntries={[
          {
            type: 'title',
            title: 'title',
            description: 'description',
          },
          {
            type: 'separator',
          },
          {
            type: 'inputCheckGroup',
            checkboxes: [
              {
                text: 'check 1',
                getValue: (inputData) => inputData.check1 ?? false,
                getUpdatedInputData: (newValue) => ({...inputData, check1: newValue}),
              },
              {
                text: 'check 2',
                getValue: (inputData) => inputData.check2 ?? false,
                getUpdatedInputData: (newValue) => ({...inputData, check2: newValue}),
              },
            ],
          },
        ]}
        inputData={inputData}
        setInputData={fnSetInputData}
      />
    ));

    expect(screen.getByText('title', {selector: 'h4'})).toBeInTheDocument();
    expect(screen.getByText('', {selector: 'hr'})).toBeInTheDocument();
    expect(screen.getByText('check 1')).toBeInTheDocument();
    expect(screen.getByText('check 2')).toBeInTheDocument();
  });
});
