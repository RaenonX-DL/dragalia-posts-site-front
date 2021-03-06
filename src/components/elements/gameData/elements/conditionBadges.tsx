import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {ConditionEnumMap} from '../../../../api-def/resources';
import {useI18n} from '../../../../i18n/hook';


export type ConditionBadgeProps = {
  conditionCodes: Array<number>,
  conditionEnums: ConditionEnumMap,
}

export const getConditionBadges = ({conditionCodes, conditionEnums}: ConditionBadgeProps) => {
  const {lang} = useI18n();

  return conditionCodes.map((conditionCode, idx: number) => {
    const conditionEnum = conditionEnums[String(conditionCode)];

    return (
      <Badge key={idx} variant={conditionEnum?.colorTheme}>{conditionEnum?.trans[lang]}</Badge>
    );
  });
};

export const ConditionBadges = ({conditionCodes, conditionEnums}: ConditionBadgeProps) => {
  return (
    <Row>
      <Col>
        {
          getConditionBadges({conditionCodes, conditionEnums}).map((badge, idx: number) => {
            return (
              <React.Fragment key={idx}>
                {idx > 0 && ' '}{badge}
              </React.Fragment>
            );
          })
        }
      </Col>
    </Row>
  );
};
