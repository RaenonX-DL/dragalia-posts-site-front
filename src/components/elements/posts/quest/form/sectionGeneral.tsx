import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {QuestPostPayload} from '../../../../../api-def/api/post/quest/payload';
import {useTranslation} from '../../../../../i18n/utils';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from '../../shared/form/types';

export const FormGeneralInfo = <P extends QuestPostPayload>({formState, setPayload}: PostFormDataProps<P>) => {
  const {t} = useTranslation();

  const {payload} = formState;

  return (
    <Row>
      <Col className="pr-2" lg={6}>
        <h5>{t('posts.quest.general')}</h5>
        <MarkdownInput
          onChanged={(e) => setPayload('general', e.target.value)}
          rows={5} value={payload.general}
          required
        />
      </Col>
      <Col className="pl-2" lg={6}>
        <h5>{t('posts.quest.video')}</h5>
        <MarkdownInput
          onChanged={(e) => setPayload('video', e.target.value)}
          rows={5} value={payload.video}
        />
      </Col>
    </Row>
  );
};