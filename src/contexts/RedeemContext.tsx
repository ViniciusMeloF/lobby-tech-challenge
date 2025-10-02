/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import type { ILoadState } from "@/@types/Global";
import type { IItem, IRedeem, IRedeemStep } from "@/@types/Redeem";
import { BASE_URL, BASIC_AUTH } from "@/api";
import { useSteps } from "@/hooks/useSteps";
import { ORDER, STEPS } from "@/utils/constants";

interface IRedeemProviderProps {
  children: React.ReactNode;
}

interface IRedeemContext {
  step: IRedeemStep;
  nextStep: VoidFunction;
  previousStep: VoidFunction;
  loadState: ILoadState;
  redeem: IRedeem;
  selectedGift: IItem | null;
  setSelectedGift: React.Dispatch<React.SetStateAction<IItem | null>>;
}

const RedeemContext = createContext<IRedeemContext>({} as IRedeemContext);

const RedeemProvider = ({ children }: IRedeemProviderProps) => {
  const { id } = useParams();
  const { step, nextStep, previousStep } = useSteps<IRedeemStep>({
    initialStep: STEPS.WELCOME,
    stepOrder: ORDER,
  });

  const [loadState, setLoadState] = useState<ILoadState>("idle");
  const [redeem, setRedeem] = useState<IRedeem>({} as IRedeem);

  const [selectedGift, setSelectedGift] = useState<IItem | null>(null);

  const fetchRedeem = async () => {
    setLoadState("loading");

    const url = `${BASE_URL}/${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${BASIC_AUTH}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setRedeem(data);

      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  };

  useEffect(() => {
    fetchRedeem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RedeemContext
      value={{
        step,
        nextStep,
        previousStep,
        loadState,
        redeem,
        selectedGift,
        setSelectedGift,
      }}
    >
      {children}
    </RedeemContext>
  );
};

const useRedeem = () => {
  const context = useContext(RedeemContext);

  if (!context) {
    throw new Error("useRedeem must be used within a RedeemProvider");
  }

  return context;
};

export { RedeemProvider, useRedeem };
