import React from 'react';

import {act, fireEvent, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../../test/render/main';
import {
  ApiResponseCode,
  OptionalSequencedPostMeta,
  PostIdCheckResponse,
  SupportedLanguages,
} from '../../../../../../api-def/api';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {PostFormState} from '../types';
import {FormSequencedMeta} from './sequenced';

describe('Sequenced form meta input', () => {
  let state: PostFormState<OptionalSequencedPostMeta>;
  let setPayload: jest.Mock<void, [keyof OptionalSequencedPostMeta, string]>;
  let setAvailability: jest.Mock<void, [boolean]>;
  const titlePlaceholder = 'Title';
  let fnIdCheck: jest.Mock<Promise<PostIdCheckResponse>, [string, number | null, SupportedLanguages]>;

  beforeEach(() => {
    jest.useFakeTimers();
    state = {
      payload: {
        lang: SupportedLanguages.CHT,
        title: 'Some title',
      },
      isIdAvailable: false,
      isPreloaded: false,
    };
    setPayload = jest.fn().mockImplementation((key: keyof OptionalSequencedPostMeta, value: string) => {
      // @ts-ignore
      state.payload[key] = value;
    });
    setAvailability = jest.fn().mockImplementation((availability) => state.isIdAvailable = availability);
    fnIdCheck = jest.fn().mockImplementation(async () => ({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
      isAdmin: true,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  const invokeRerender = (rerenderFunc: (element: React.ReactElement) => void) => {
    rerenderFunc(
      <FormSequencedMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
        titlePlaceholder={titlePlaceholder}
        fnIdCheck={fnIdCheck}
      />,
    );
  };

  it('shows the valid mark upon passing the check', async () => {
    const {rerender} = await renderReact(
      <FormSequencedMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
        titlePlaceholder={titlePlaceholder}
        fnIdCheck={fnIdCheck}
      />,
    );
    const idField = screen.getByPlaceholderText(translationEN.posts.info.id);
    fireEvent.change(idField, {target: {value: 577}});
    invokeRerender(rerender);

    act(() => {
      jest.runTimersToTime(1100);
    });
    await waitFor(() => {
      expect(setAvailability).toHaveBeenCalledWith(true);
      invokeRerender(rerender);
      expect(idField).toHaveClass('is-valid');
    });
  });

  it('shows the invalid mark upon failing the check', async () => {
    setAvailability = jest.fn().mockImplementation(() => state.isIdAvailable = false);
    fnIdCheck = jest.fn().mockImplementation(async () => ({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: false,
      isAdmin: true,
    }));

    const {rerender} = await renderReact(
      <FormSequencedMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
        titlePlaceholder={titlePlaceholder}
        fnIdCheck={fnIdCheck}
      />,
    );
    const idField = screen.getByPlaceholderText(translationEN.posts.info.id);
    fireEvent.change(idField, {target: {value: 577}});
    invokeRerender(rerender);

    act(() => {
      jest.runTimersToTime(1100);
    });
    await waitFor(() => {
      expect(setAvailability).toHaveBeenCalledWith(false);
      invokeRerender(rerender);
      expect(idField).toHaveClass('is-invalid');
    });
  });

  it('starts checking 1 sec later after the last seq ID change', async () => {
    const {rerender} = await renderReact(
      <FormSequencedMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
        titlePlaceholder={titlePlaceholder}
        fnIdCheck={fnIdCheck}
      />,
    );
    const idField = screen.getByPlaceholderText(translationEN.posts.info.id);
    fireEvent.change(idField, {target: {value: 577}});
    invokeRerender(rerender);

    act(() => {
      jest.runTimersToTime(1100);
    });
    expect(setPayload).toHaveBeenCalledTimes(1);
    expect(fnIdCheck).toHaveBeenCalledTimes(1);
  });

  it('starts checking 1 sec later after the last title change', async () => {
    const {rerender} = await renderReact(
      <FormSequencedMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
        titlePlaceholder={titlePlaceholder}
        fnIdCheck={fnIdCheck}
      />,
    );
    const titleField = screen.getByPlaceholderText(titlePlaceholder);
    fireEvent.change(titleField, {target: {value: 'Another Title'}});
    invokeRerender(rerender);

    act(() => {
      jest.runTimersToTime(1100);
    });
    expect(setPayload).toHaveBeenCalledTimes(1);
    expect(fnIdCheck).toHaveBeenCalledTimes(1);
  });

  it('starts checking 1 sec later after the last lang change', async () => {
    const {rerender} = await renderReact(
      <FormSequencedMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
        titlePlaceholder={titlePlaceholder}
        fnIdCheck={fnIdCheck}
      />,
    );
    const langField = screen.getByTestId('langSelect');
    fireEvent.change(langField, {target: {value: SupportedLanguages.JP}});
    invokeRerender(rerender);

    act(() => {
      jest.runTimersToTime(1100);
    });
    expect(setPayload).toHaveBeenCalledTimes(1);
    expect(fnIdCheck).toHaveBeenCalledTimes(1);
  });

  it('does not start the check within 1 sec of the change', async () => {
    const {rerender} = await renderReact(
      <FormSequencedMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
        titlePlaceholder={titlePlaceholder}
        fnIdCheck={fnIdCheck}
      />,
    );
    const langField = screen.getByTestId('langSelect');
    fireEvent.change(langField, {target: {value: SupportedLanguages.JP}});
    invokeRerender(rerender);

    act(() => {
      jest.runTimersToTime(100);
    });
    expect(setPayload).toHaveBeenCalledTimes(1);
    expect(fnIdCheck).toHaveBeenCalledTimes(0);
  });
});