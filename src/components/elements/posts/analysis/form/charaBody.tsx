import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {CharaAnalysisPayload, CharacterSkill} from '../../../../../api-def/api/post/analysis/payload';
import {useTranslation} from '../../../../../i18n/utils';
import {generateNewCharaSkill} from '../../../../../utils/services/api/utils';
import {MarkdownInput} from '../../../markdown/input';
import {ArrayDataForm} from '../../shared/form/array';
import {PostFormDataProps, PostFormState} from '../../shared/form/types';
import {AnalysisSkillInput} from './charaSkill';

type CharaAnalysisFormProps<P extends CharaAnalysisPayload> = PostFormDataProps<P> & {
  setState: (newState: PostFormState<P>) => void,
}


export const CharaAnalysisForm = <P extends CharaAnalysisPayload>({
  formState,
  setPayload,
  setState,
}: CharaAnalysisFormProps<P>) => {
  const {t} = useTranslation();

  const {payload} = formState;

  const setSkills = (skills: Array<CharacterSkill>) => {
    setState({
      ...formState,
      payload: {
        ...payload,
        skills,
      },
    });
  };

  return (
    <>
      <Row>
        <Col>
          <h5>{t('posts.analysis.force_strike')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('forceStrikes', e.target.value)}
            rows={5} value={payload.forceStrikes}
          />
        </Col>
      </Row>
      <hr/>
      <ArrayDataForm
        payload={payload}
        minLength={2}
        getArray={(payload) => payload.skills}
        setArray={setSkills}
        updateElementValue={(element, key, value) => element[key] = value}
        generateNewElement={generateNewCharaSkill}
        renderEntries={(skill, onChange) => (
          <div className="mt-2">
            <AnalysisSkillInput
              name={skill.name}
              info={skill.info}
              rotations={skill.rotations}
              tips={skill.tips}
              onNameChanged={onChange('name')}
              onInfoChanged={onChange('info')}
              onRotationsChanged={onChange('rotations')}
              onTipsChanged={onChange('tips')}
              required={['info']}
            />
          </div>
        )}
      />
      <hr/>
      <Row>
        <Col>
          <h5>{t('posts.analysis.tips_builds')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('tipsBuilds', e.target.value)}
            rows={10} value={payload.tipsBuilds} required
          />
        </Col>
      </Row>
      <div className="mb-3"/>
    </>
  );
};