import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {CharaExAbilityDataEntry, ConditionEnumMap, DepotPaths} from '../../../../../api-def/resources';
import {PostPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makePostPath} from '../../../../../utils/path/make';
import {ImageWithOverlay} from '../../../common/image';
import {NextLink} from '../../../common/link';
import {ExAbility} from './exUnit';


type ExAbilityEntryProps = {
  entry: CharaExAbilityDataEntry
  conditionEnums: ConditionEnumMap,
}

export const ExAbilityEntry = ({entry, conditionEnums}: ExAbilityEntryProps) => {
  const {t, lang} = useI18n();

  const charaName = entry.chara.name[lang];
  const charaIconURL = DepotPaths.getCharaIconURL(entry.chara.iconName);

  return (
    <div className="rounded bg-black-32 p-2 mb-2">
      <Row noGutters className="align-items-center">
        <Col xs="auto">
          <ImageWithOverlay src={charaIconURL} text={charaName} style={{height: '3rem'}}/>
        </Col>
        <Col className="text-center">
          <span style={{fontSize: '1.1rem'}}>
            <NextLink href={makePostPath(PostPath.ANALYSIS, {pid: entry.chara.id, lang})}>
              {charaName}
            </NextLink>
          </span>
        </Col>
      </Row>
      <hr className="m-1"/>
      <Row noGutters>
        <Col>
          <ExAbility
            effectUnits={entry.ex}
            name={t((t) => t.game.ex.name.exAbility)}
            description={t((t) => t.game.ex.desc.exAbility)}
            conditionEnums={conditionEnums}
            isEx
          />
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <ExAbility
            effectUnits={entry.chainedEx}
            name={t((t) => t.game.ex.name.chainedExAbility)}
            description={t((t) => t.game.ex.desc.chainedExAbility)}
            conditionEnums={conditionEnums}
          />
        </Col>
      </Row>
    </div>
  );
};
