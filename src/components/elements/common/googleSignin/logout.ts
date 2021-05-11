import {useGoogleLogout as useGoogleLogoutDep} from 'react-google-login';

import {GOOGLE_CLIENT_ID} from '../../../../const/config';
import {CookiesControl} from '../../../../utils/cookies';
import {GoogleSignInProps} from './types';

export const useGoogleLogout = ({
  t,
  onFailed,
}: GoogleSignInProps) => useGoogleLogoutDep({
  clientId: GOOGLE_CLIENT_ID,
  onLogoutSuccess: () => {
    CookiesControl.removeGoogleUid();
    window.location.reload();
  },
  onFailure: () => {
    onFailed({
      show: true,
      title: t('google_signin.logout_failed'),
      message: t('google_signin.logout_unknown'),
    });
  },
});