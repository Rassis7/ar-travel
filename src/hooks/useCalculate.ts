import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export type Currency = "ARS" | "EUR" | "USD" | "BRL";
export type Rates = Record<Currency, number>;

type FetchCalculateResponse = {
  rates: Rates;
};

const ratesDefault = ["ARS", "EUR", "USD", "BRL"];

export const useCalculate = ({ currency }: { currency: Currency }) => {
  const [coins, setCoins] = useState<Rates | undefined>(undefined);

  const { data, isLoading } = useQuery<unknown, Error, Rates>({
    queryKey: [`calculate-${currency}`],
    queryFn: async () => {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${currency}`
      );
      const data = (await response.json()) as FetchCalculateResponse;
      const currencyReduced = Object.entries(data.rates)
        .filter(([currency, value]) =>
          ratesDefault.some((r) => r === currency) ? { currency, value } : null
        )
        .reduce((obj, [currency, value]) => {
          obj[currency] = value;
          return obj;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as any);

      return currencyReduced;
    },
    refetchInterval: 1000 * 60 * 60,
    refetchOnMount: true,
  });

  const handleCalculate = useCallback(
    ({ currency, valueBase }: { currency: Currency; valueBase: number }) => {
      let value = {};
      if (currency === "BRL") {
        value = {
          BRL: valueBase,
          USD: (data?.USD ?? 0) * valueBase,
          ARS: (data?.ARS ?? 0) * valueBase,
          EUR: (data?.EUR ?? 0) * valueBase,
        };
      }
      if (currency === "ARS") {
        value = {
          ARS: valueBase,
          USD: (data?.USD ?? 0) * valueBase,
          BRL: (data?.BRL ?? 0) * valueBase,
          EUR: (data?.EUR ?? 0) * valueBase,
        };
      }
      if (currency === "EUR") {
        value = {
          EUR: valueBase,
          USD: (data?.USD ?? 0) * valueBase,
          BRL: (data?.BRL ?? 0) * valueBase,
          ARS: (data?.ARS ?? 0) * valueBase,
        };
      }
      if (currency === "USD") {
        value = {
          USD: valueBase,
          EUR: (data?.EUR ?? 0) * valueBase,
          BRL: (data?.BRL ?? 0) * valueBase,
          ARS: (data?.ARS ?? 0) * valueBase,
        };
      }

      setCoins(value as Rates);
    },
    [data]
  );

  return {
    handleCalculate,
    isLoading,
    coins,
    setCoins,
  };
};
