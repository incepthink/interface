import { RequestedTokens, tokenSet } from 'cypress/support/helpers/token.helper';

import assets from '../../../../fixtures/assets.json';
import constants from '../../../../fixtures/constans.json';
import { skipState } from '../../../../support/steps/common';
import { configEnvWithTenderlyMainnetFork } from '../../../../support/steps/configuration.steps';
import {
  borrow,
  changeBorrowType,
  repay,
  supply,
  withdraw,
} from '../../../../support/steps/main.steps';
import { dashboardAssetValuesVerification } from '../../../../support/steps/verification.steps';

const tokensToRequest: RequestedTokens = {
  aETHEthereumV2: 0.5,
};

const testData = {
  depositETH: {
    asset: assets.aaveMarket.ETH,
    amount: 0.5,
    hasApproval: true,
  },
  testCases: {
    deposit: {
      asset: assets.aaveMarket.USDC,
      amount: 50,
      hasApproval: false,
    },
    borrow: [
      {
        asset: assets.aaveMarket.USDC,
        amount: 50,
        apyType: constants.borrowAPYType.variable,
        hasApproval: true,
      },
      {
        asset: assets.aaveMarket.USDC,
        amount: 50,
        apyType: constants.borrowAPYType.stable,
        hasApproval: true,
      },
    ],
    changeBorrowType: [
      {
        asset: assets.aaveMarket.USDC,
        apyType: constants.borrowAPYType.stable,
        newAPY: constants.borrowAPYType.variable,
        hasApproval: true,
      },
      {
        asset: assets.aaveMarket.USDC,
        apyType: constants.borrowAPYType.variable,
        newAPY: constants.borrowAPYType.stable,
        hasApproval: true,
      },
    ],
    repay: [
      {
        asset: assets.aaveMarket.USDC,
        apyType: constants.apyType.stable,
        amount: 10,
        hasApproval: true,
        repayOption: constants.repayType.default,
      },
      // Swap unstable
      // {
      //   asset: assets.aaveMarket.USDC,
      //   apyType: constants.apyType.stable,
      //   amount: 10,
      //   hasApproval: false,
      //   repayOption: constants.repayType.collateral,
      // },
    ],
    withdraw: {
      asset: assets.aaveMarket.USDC,
      isCollateral: true,
      amount: 10,
      hasApproval: true,
    },
  },
  verifications: {
    finalDashboard: [
      {
        type: constants.dashboardTypes.deposit,
        assetName: assets.aaveMarket.USDC.shortName,
        wrapped: assets.aaveMarket.USDC.wrapped,
        amount: 40,
        collateralType: constants.collateralType.isCollateral,
        isCollateral: true,
      },
      {
        type: constants.dashboardTypes.borrow,
        assetName: assets.aaveMarket.USDC.shortName,
        wrapped: assets.aaveMarket.USDC.wrapped,
        amount: 90,
        apyType: constants.borrowAPYType.stable,
      },
    ],
  },
};

//due asset frozen
describe.skip('USDC INTEGRATION SPEC, AAVE V2 MARKET', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyMainnetFork({ tokens: tokenSet(tokensToRequest) });
  testData.testCases.borrow.forEach((borrowCase) => {
    borrow(borrowCase, skipTestState, true);
  });
  testData.testCases.changeBorrowType.forEach((changeAPRCase) => {
    changeBorrowType(changeAPRCase, skipTestState, true);
  });
  supply(testData.testCases.deposit, skipTestState, true);
  testData.testCases.repay.forEach((repayCase) => {
    repay(repayCase, skipTestState, false);
  });
  withdraw(testData.testCases.withdraw, skipTestState, false);
  dashboardAssetValuesVerification(testData.verifications.finalDashboard, skipTestState);
});
