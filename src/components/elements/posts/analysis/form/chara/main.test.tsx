import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ObjectId} from 'mongodb';

import {renderReact} from '../../../../../../../test/render/main';
import {typeInput} from '../../../../../../../test/utils/event';
import {
  AnalysisEditResponse,
  ApiResponseCode,
  CharaAnalysisEditPayload,
  SupportedLanguages,
  UnitType,
} from '../../../../../../api-def/api';
import {PostPath} from '../../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {makePostPath} from '../../../../../../utils/path/make';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../../shared/form/types';
import {AnalysisFormChara} from './main';


describe('Character analysis form', () => {
  let fnSendRequest: jest.Mock;
  const response: AnalysisEditResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    unitId: 10950101,
  };
  let formState: PostFormState<CharaAnalysisEditPayload>;
  let setFormState: jest.Mock;

  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'analysisIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
    formState = {
      isIdAvailable: true,
      isPreloaded: true,
      payload: {
        unitId: response.unitId,
        uid: new ObjectId().toHexString(),
        type: UnitType.CHARACTER,
        lang: SupportedLanguages.CHT,
        summary: 'sum',
        summonResult: 'smr',
        passives: 'psv',
        normalAttacks: 'nra',
        forceStrikes: 'fs',
        skills: [
          {
            name: 'S1',
            info: 'S1 info',
            rotations: 'S1 rotations',
            tips: 'S1 tips',
          },
        ],
        tipsBuilds: 'tb',
        videos: 'vid',
        keywords: 'kw',
        story: 'str',
        editNote: '',
      },
    };
    fnSendRequest = jest.fn().mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      unitId: 10950101,
    });
    setFormState = jest.fn().mockImplementation((newState: PostFormState<CharaAnalysisEditPayload>) => {
      formState = newState;
    });
  });

  it('edits', async () => {
    const {rerender} = renderReact(
      () => (
        <AnalysisFormChara
          formState={formState}
          setFormState={setFormState}
          fnSendRequest={fnSendRequest}
        />
      ),
      {user: {isAdmin: true}},
    );

    // region Change all input fields
    const summary = screen.getByText(formState.payload.summary, {selector: 'textarea'});
    typeInput(summary, 'summary', {clear: true, rerender});
    const summonResult = screen.getByText(formState.payload.summonResult, {selector: 'textarea'});
    typeInput(summonResult, 'summonResult', {clear: true, rerender});
    const passives = screen.getByText(formState.payload.passives, {selector: 'textarea'});
    typeInput(passives, 'passives', {clear: true, rerender});
    const normalAttacks = screen.getByText(formState.payload.normalAttacks, {selector: 'textarea'});
    typeInput(normalAttacks, 'normalAttacks', {clear: true, rerender});
    const forceStrikes = screen.getByText(formState.payload.forceStrikes, {selector: 'textarea'});
    typeInput(forceStrikes, 'forceStrikes', {clear: true, rerender});
    const tipsBuilds = screen.getByText(formState.payload.tipsBuilds, {selector: 'textarea'});
    typeInput(tipsBuilds, 'tipsBuilds', {clear: true, rerender});
    const videos = screen.getByText(formState.payload.videos, {selector: 'textarea'});
    typeInput(videos, 'videos', {clear: true, rerender});
    const keywords = screen.getByText(formState.payload.keywords, {selector: 'textarea'});
    typeInput(keywords, 'keywords', {clear: true, rerender});
    const story = screen.getByText(formState.payload.story, {selector: 'textarea'});
    typeInput(story, 'story', {clear: true, rerender});
    // endregion

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest).toHaveBeenCalledWith({
      uid: formState.payload.uid,
      unitId: 10950101,
      type: UnitType.CHARACTER,
      lang: SupportedLanguages.CHT,
      summary: 'summary',
      summonResult: 'summonResult',
      passives: 'passives',
      normalAttacks: 'normalAttacks',
      forceStrikes: 'forceStrikes',
      skills: formState.payload.skills,
      tipsBuilds: 'tipsBuilds',
      videos: 'videos',
      keywords: 'keywords',
      story: 'story',
      editNote: '',
    });
  });

  it('redirects after publish', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    const {rerender} = renderReact(
      () => (
        <AnalysisFormChara
          formState={formState}
          setFormState={setFormState}
          fnSendRequest={fnSendRequest}
        />
      ),
      {user: {isAdmin: true}},
    );

    const summary = screen.getByText(formState.payload.summary, {selector: 'textarea'});
    typeInput(summary, 'summary', {rerender});

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    const expectedPostPath = makePostPath(
      PostPath.ANALYSIS,
      {pid: formState.payload.unitId, lang: SupportedLanguages.EN},
    );
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith(expectedPostPath));
    expect(window.location.assign).not.toHaveBeenCalledTimes(2);
  });

  it('shows the error if an error occurred before submission', async () => {
    fnSendRequest.mockResolvedValueOnce({
      code: ApiResponseCode.FAILED_INSUFFICIENT_PERMISSION,
      success: false,
    });

    const {rerender} = renderReact(
      () => (
        <AnalysisFormChara
          formState={formState}
          setFormState={setFormState}
          fnSendRequest={fnSendRequest}
        />
      ),
      {user: {isAdmin: true}},
    );

    const summary = screen.getByText(formState.payload.summary, {selector: 'textarea'});
    typeInput(summary, 'summary', {rerender});

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText(new RegExp(ApiResponseCode[ApiResponseCode.FAILED_INSUFFICIENT_PERMISSION])))
        .toBeInTheDocument();
    });
  });

  it('transforms quick references in the payload', async () => {
    const originalText = 'Quest #Q3';
    const transformedText = `Quest [${translationEN.posts.quest.titleSelf} #3]` +
      `(${makePostPath(PostPath.QUEST, {pid: 3, lang: SupportedLanguages.EN})})`;

    formState.payload = {
      uid: formState.payload.uid,
      lang: formState.payload.lang,
      unitId: formState.payload.unitId,
      type: formState.payload.type,
      summary: originalText,
      summonResult: originalText,
      passives: originalText,
      normalAttacks: originalText,
      forceStrikes: originalText,
      skills: [{
        name: originalText,
        info: originalText,
        rotations: originalText,
        tips: originalText,
      }],
      tipsBuilds: originalText,
      videos: originalText,
      keywords: originalText,
      story: originalText,
      editNote: originalText,
    };

    renderReact(
      () => (
        <AnalysisFormChara
          formState={formState}
          setFormState={setFormState}
          fnSendRequest={fnSendRequest}
        />
      ),
      {user: {isAdmin: true}},
    );

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest).toHaveBeenCalledWith({
      uid: formState.payload.uid,
      unitId: 10950101,
      type: UnitType.CHARACTER,
      lang: SupportedLanguages.CHT,
      summary: transformedText,
      summonResult: transformedText,
      passives: transformedText,
      normalAttacks: transformedText,
      forceStrikes: transformedText,
      skills: [{
        name: originalText,
        info: transformedText,
        rotations: transformedText,
        tips: transformedText,
      }],
      tipsBuilds: transformedText,
      videos: transformedText,
      keywords: transformedText,
      story: transformedText,
      editNote: originalText,
    });
  });

  it('blocks access from non-admin user', async () => {
    renderReact(
      () => (
        <AnalysisFormChara
          formState={formState}
          setFormState={setFormState}
          fnSendRequest={fnSendRequest}
        />
      ),
      {user: {isAdmin: false}},
    );

    expect(screen.queryByText(translationEN.posts.manage.edit)).not.toBeInTheDocument();
    expect(screen.getByText(translationEN.meta.error['401'].description)).toBeInTheDocument();
  });
});
