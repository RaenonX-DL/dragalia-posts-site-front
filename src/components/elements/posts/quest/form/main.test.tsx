import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ObjectId} from 'mongodb';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {
  ApiResponseCode,
  QuestPostEditPayload,
  QuestPostEditResponse,
  SupportedLanguageNames,
  SupportedLanguages,
} from '../../../../../api-def/api';
import {PostPath} from '../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {makePostPath} from '../../../../../utils/path/make';
import {PostFormState} from '../../shared/form/types';
import {QuestPostForm, QuestPostWriteResponse} from './main';


describe('Main quest form', () => {
  let fnSendRequest: jest.Mock<Promise<QuestPostWriteResponse>, [QuestPostEditPayload]>;
  const response: QuestPostEditResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    seqId: 1,
  };
  let formState: PostFormState<QuestPostEditPayload>;
  let setFormState: jest.Mock;

  beforeEach(() => {
    formState = {
      isIdAvailable: true,
      isPreloaded: true,
      payload: {
        seqId: response.seqId,
        uid: 'googleUid',
        lang: SupportedLanguages.CHT,
        title: 'ttl',
        general: 'gen',
        video: 'vid',
        positional: [
          {
            position: 'pos',
            rotations: 'rot',
            builds: 'bld',
            tips: 'tps',
          },
        ],
        addendum: 'adm',
        editNote: 'edn',
      },
    };
    fnSendRequest = jest.fn().mockImplementation(async () => response);
    setFormState = jest.fn().mockImplementation((newState: PostFormState<QuestPostEditPayload>) => {
      formState = newState;
    });
  });

  it('loads the data correctly', async () => {
    const {container} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const payload = formState.payload;

    expect(screen.getByDisplayValue(payload.seqId)).toBeInTheDocument();
    expect(container).toHaveTextContent(SupportedLanguageNames[payload.lang]);
    expect(screen.getByDisplayValue(payload.title)).toBeInTheDocument();
    expect(container).toHaveTextContent(payload.general);
    expect(container).toHaveTextContent(payload.video);
    expect(container).toHaveTextContent(payload.positional[0].position);
    expect(container).toHaveTextContent(payload.positional[0].rotations);
    expect(container).toHaveTextContent(payload.positional[0].builds);
    expect(container).toHaveTextContent(payload.positional[0].tips);
    expect(container).toHaveTextContent(payload.addendum);
  });

  it('can change title', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const titleField = screen.getByDisplayValue(formState.payload.title);
    typeInput(titleField, 'Title', {clear: true, rerender});

    expect(screen.getByDisplayValue('Title')).toBeInTheDocument();
  });

  it('can change general info', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const generalInfoField = screen.getByText(formState.payload.general, {selector: 'textarea'});
    typeInput(generalInfoField, 'General', {clear: true, rerender});

    expect(screen.getByText('General', {selector: 'textarea'})).toBeInTheDocument();
  });

  it('can change video section', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const videoField = screen.getByText(formState.payload.video, {selector: 'textarea'});
    typeInput(videoField, 'Video', {clear: true, rerender});

    expect(screen.getByText('Video', {selector: 'textarea'})).toBeInTheDocument();
  });

  it('can change positional info', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const posField = screen.getByDisplayValue(formState.payload.positional[0].position);
    typeInput(posField, 'Position', {clear: true, rerender});
    expect(screen.getByDisplayValue('Position')).toBeInTheDocument();

    const tipsField = screen.getByText(formState.payload.positional[0].tips, {selector: 'textarea'});
    typeInput(tipsField, 'Tips', {clear: true, rerender});
    expect(screen.getByText('Tips', {selector: 'textarea'})).toBeInTheDocument();

    const buildField = screen.getByText(formState.payload.positional[0].builds, {selector: 'textarea'});
    typeInput(buildField, 'Builds', {clear: true, rerender});
    expect(screen.getByText('Builds', {selector: 'textarea'})).toBeInTheDocument();

    const rotationsField = screen.getByText(formState.payload.positional[0].rotations, {selector: 'textarea'});
    typeInput(rotationsField, 'Rotations', {clear: true, rerender});
    expect(screen.getByText('Rotations', {selector: 'textarea'})).toBeInTheDocument();
  });

  it('can add positional info', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const addButton = screen.getByText(translationEN.misc.add);
    userEvent.click(addButton);
    rerender();

    expect(screen.getAllByText(translationEN.posts.quest.builds, {selector: 'label'}).length).toBe(2);
  });

  it('can remove positional info if > 1', async () => {
    const newFormState = {...formState};

    newFormState.payload.positional = [
      {
        position: 'pos',
        rotations: 'rot',
        builds: 'bld',
        tips: 'tps',
      },
      {
        position: 'pos2',
        rotations: 'rot2',
        builds: 'bld2',
        tips: 'tps2',
      },
    ];

    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const removeButton = screen.getByText(translationEN.misc.remove);
    userEvent.click(removeButton);
    rerender();

    expect(screen.getAllByText(translationEN.posts.quest.builds, {selector: 'label'}).length).toBe(1);
  });

  it('cannot remove positional info if < 1', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const removeButton = screen.getByText(translationEN.misc.remove);
    userEvent.click(removeButton);
    rerender();

    expect(screen.getAllByText(translationEN.posts.quest.builds, {selector: 'label'}).length).toBe(1);
  });

  it('can change addendum', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const addendumField = screen.getByText(formState.payload.addendum, {selector: 'textarea'});
    typeInput(addendumField, 'Addendum', {clear: true, rerender});

    expect(screen.getByText('Addendum', {selector: 'textarea'})).toBeInTheDocument();
  });

  it('submits correct payload after edit', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    const {rerender} = renderReact(
      () => (
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {
        user: {
          id: new ObjectId(),
        },
      },
    );

    const generalInfoField = screen.getByText(formState.payload.general, {selector: 'textarea'});
    typeInput(generalInfoField, 'General', {clear: true, rerender});

    const videoField = screen.getByText(formState.payload.video, {selector: 'textarea'});
    typeInput(videoField, 'Video', {clear: true, rerender});

    const posField = screen.getByDisplayValue(formState.payload.positional[0].position);
    typeInput(posField, 'Position', {clear: true, rerender});

    const tipsField = screen.getByText(formState.payload.positional[0].tips, {selector: 'textarea'});
    typeInput(tipsField, 'Tips', {clear: true, rerender});

    const buildField = screen.getByText(formState.payload.positional[0].builds, {selector: 'textarea'});
    typeInput(buildField, 'Builds', {clear: true, rerender});

    const rotationsField = screen.getByText(formState.payload.positional[0].rotations, {selector: 'textarea'});
    typeInput(rotationsField, 'Rotations', {clear: true, rerender});

    const addendumField = screen.getByText(formState.payload.addendum, {selector: 'textarea'});
    typeInput(addendumField, 'Addendum', {clear: true, rerender});

    const submitButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(submitButton);
    rerender();

    expect(fnSendRequest).toHaveBeenCalledTimes(1);
    expect(fnSendRequest).toHaveBeenCalledWith({
      ...formState.payload,
      general: 'General',
      video: 'Video',
      positional: [
        {
          position: 'Position',
          tips: 'Tips',
          builds: 'Builds',
          rotations: 'Rotations',
        },
      ],
      addendum: 'Addendum',
    });
  });

  it('redirects to correct location on submit', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};
    const {rerender} = renderReact(
      () => (
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {
        user: {
          id: new ObjectId(),
        },
      },
    );

    const submitButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(submitButton);
    rerender();

    expect(fnSendRequest).toHaveBeenCalledTimes(1);

    const expectedPostPath = makePostPath(
      PostPath.QUEST,
      {pid: response.seqId, lang: SupportedLanguages.EN},
    );
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith(expectedPostPath));
    expect(window.location.assign).not.toHaveBeenCalledTimes(2);
  });
});
