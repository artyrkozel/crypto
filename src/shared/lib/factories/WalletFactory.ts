import { ICoin } from "@/entities/Coin/model/types/coin";
import { IWallet, IWalletCurrency } from "@/entities/Wallet/model/types";

export class WalletFactory {
  static getWalletUpdate(walletCurrencyUpdate: IWalletCurrency[], oldWalletData: IWallet): IWallet {
    /* eslint-disable */
    const totalValueUpdate = walletCurrencyUpdate.reduce(
      (acc, el) => (acc += el.value),
      0,
    );

    const walletUpdateData: IWallet = {
      ...oldWalletData,
      currencies: walletCurrencyUpdate,
      totalValue: totalValueUpdate,
    };
    return walletUpdateData;
  }

  static getNewCurrency(currentCoin: ICoin, newValue: number) {
    const newCurrency: IWalletCurrency = {
      name: currentCoin.name,
      value: newValue,
      iconUrl: currentCoin.iconUrl,
      symbol: currentCoin.symbol,
    };

    return newCurrency;
  }
}
