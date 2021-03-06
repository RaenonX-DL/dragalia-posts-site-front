import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {PAGE_ATK_SKILL_MAX_ENTRIES} from '../../../../const/config';
import {useI18n} from '../../../../i18n/hook';


type OverLengthWarningProps = {
  displayed: number,
  returned: number,
}

const OverLengthWarning = ({displayed, returned}: OverLengthWarningProps) => {
  const {t} = useI18n();

  return (
    <Alert variant="warning" className="rounded bg-black-32 p-2 mb-2">
      {t(
        (t) => t.message.warning.truncated,
        {
          displayed: displayed.toFixed(0),
          returned: returned.toFixed(0),
        },
      )}
    </Alert>
  );
};

export const overLengthWarningCheck = (entries: Array<any>) => {
  if (entries.length > PAGE_ATK_SKILL_MAX_ENTRIES) {
    const actualLength = entries.length;
    entries.splice(PAGE_ATK_SKILL_MAX_ENTRIES);
    return <OverLengthWarning displayed={PAGE_ATK_SKILL_MAX_ENTRIES} returned={actualLength} key="overLength"/>;
  }

  return null;
};
