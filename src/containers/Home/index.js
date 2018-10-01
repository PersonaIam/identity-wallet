/**
 * Created by vladtomsa on 26/09/2018
 */
import React from 'react';
import { translate } from 'react-i18next';

const Home = ({ t }) => {
  return (
    <div>
      <h1>{ t('Home') }</h1>
    </div>
  );
};

const withTranslate = translate('common')(Home);

export default withTranslate;
