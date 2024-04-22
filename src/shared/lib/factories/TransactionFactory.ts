import { ICoin } from "entities/Coin/model/types/coin";
import { ITransactionCreate } from "entities/Transaction/model/types/types";
import { IBuyCoinFields } from "features/BuyCoin/ui/BuyCoin/BuyCoin";
import { COMMISION } from "../consts";
import { getAmountWithCommision } from "../utils";

export class TransactionFactory {
  static createTransaction(data: IBuyCoinFields, coinData: ICoin, userId: string) {
    const transaction: ITransactionCreate = {
      date: new Date(),
      status: 'ok',
      usdSum: getAmountWithCommision(Number(data.priceFrom), COMMISION),
      coinSum: +data.priceTo,
      coinName: coinData.name,
      coinSymbol: coinData.symbol,
      type: 'exchange',
      userId,
    };

    return transaction;
  }
}
