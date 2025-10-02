import type { IRedeemStep } from "@/@types/Redeem";

export const STEPS: Record<IRedeemStep, IRedeemStep> = {
  WELCOME: "WELCOME",
  "GIFT-CHOICE": "GIFT-CHOICE",
  "USER-FORM": "USER-FORM",
  CONFIRMATION: "CONFIRMATION",
};

export const ORDER: IRedeemStep[] = [
  "WELCOME",
  "GIFT-CHOICE",
  "USER-FORM",
  "CONFIRMATION",
];

export const BRAZILIAN_STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];
