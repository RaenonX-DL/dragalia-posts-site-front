import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useI18n} from '../../i18n/hook';

export const Error404 = () => {
  const {t} = useI18n();

  return (
    <Row>
      <Col className="text-center text-danger">
        <h3>{t((t) => t.meta.error['404'].description)}</h3>
      </Col>
    </Row>
  );
};