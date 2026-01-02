import React from 'react';
import { useBankConnection } from './hooks/useBankConnection';
import { ConnectBankWidget } from './view/ConnectBankWidget';
import { ConnectBankView } from './view/ConnectBankView';


const ConnectBankFeature = () => {
  const bank = useBankConnection();

  if (bank.showWidget && bank.widgetToken) {
    return <ConnectBankWidget {...bank} />;
  }

  return <ConnectBankView {...bank} />;
};

export default ConnectBankFeature;
