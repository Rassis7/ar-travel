import { useState } from "react";
import { Currency, useCalculate } from "./hooks/useCalculate";

export const Calculator = () => {
  const [currency, setCurrency] = useState<Currency>("ARS");
  const [valueBase, setValueBase] = useState<number>(0);
  const { coins, handleCalculate, isLoading, setCoins } = useCalculate({
    currency,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSetCurrency = (e: any) => {
    setCurrency(e.target.value as Currency);
    setCoins(undefined);
  };

  return (
    <main className="flex centered flex-col gap-4 w-screen h-screen">
      <h1 className="text-4xl font-semibold text-zinc-500">
        Conversor de moedas
      </h1>

      <div className="flex flex-col centered w-[80vw]">
        <label className="text-xl text-zinc-500">Valor a converter</label>
        <input
          type="number"
          onChange={(e) => setValueBase(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div className="flex flex-col centered w-[80vw]">
        <label className="text-xl text-zinc-500">Valor a converter</label>
        <select
          onChange={handleSetCurrency}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="BRL">Real</option>
          <option value="USD">Dolar</option>
          <option value="EUR">Euro</option>
          <option value="ARS" selected>
            Peso
          </option>
        </select>
      </div>

      <button
        className="bg-purple-700 text-white rounded-md p-2 w-[80vw]"
        onClick={() => handleCalculate({ currency, valueBase })}
      >
        {isLoading ? "Processando..." : "Calcular"}
      </button>

      <hr />

      <div className="flex flex-col centered">
        <p className="text-2xl text-zinc-600">EURO:</p>
        <p className="text-xl text-zinc-500">
          {coins?.EUR
            ? Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(coins?.EUR)
            : 0}
        </p>
      </div>

      <div className="flex flex-col centered">
        <p className="text-2xl text-zinc-600">DOLAR:</p>
        <p className="text-xl text-zinc-500">
          {coins?.USD
            ? Intl.NumberFormat("en-HOSSDDG", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              }).format(coins?.USD)
            : 0}
        </p>
      </div>
      <div className="flex flex-col centered">
        <p className="text-2xl text-zinc-600">REAL:</p>
        <p className="text-xl text-zinc-500">
          {coins?.BRL
            ? Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(coins?.BRL)
            : 0}
        </p>
      </div>
      <div className="flex flex-col centered">
        <p className="text-2xl text-zinc-600">PESO:</p>
        <p className="text-xl text-zinc-500">
          {coins?.ARS
            ? Intl.NumberFormat("en-HOSSDDG", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              }).format(coins?.ARS)
            : 0}
        </p>
      </div>
    </main>
  );
};
