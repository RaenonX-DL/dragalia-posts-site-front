import React, {ReactNode} from 'react';

import {Col} from 'react-bootstrap';

import {getBadgesBuffCount} from './badgesBuffCount';
import {getBadgesBuffZone} from './badgesBuffZone';
import {getBadgesCrisisMod} from './badgesCrisisMod';
import {getBadgesDispel} from './badgesDispel';
import {SectionProps} from './props';


export const SectionBadges = ({atkSkillEntry}: SectionProps) => {
  let badges: Array<ReactNode> = [];

  badges = badges.concat(getBadgesBuffCount(atkSkillEntry));
  badges = badges.concat(getBadgesBuffZone(atkSkillEntry));
  badges = badges.concat(getBadgesDispel(atkSkillEntry));
  badges = badges.concat(getBadgesCrisisMod(atkSkillEntry));

  // -- Early terminate if no special badge
  if (badges.length === 0) {
    return <></>;
  }

  return (
    <Col lg className="text-left text-lg-right my-auto">
      {
        badges
          .map((badge: ReactNode, index: number) => (
            <React.Fragment key={index}>
              {index > 0 && ' '}
              {badge}
            </React.Fragment>
          ))
      }
    </Col>
  );
};
