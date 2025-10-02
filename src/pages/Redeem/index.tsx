import { Box, CircularProgress, Container } from "@mui/material";
import type React from "react";

import type { IRedeemStep } from "@/@types/Redeem";
import { Copyright } from "@/components/Copyright";
import { ErrorState } from "@/components/ErrorState";
import { useRedeem } from "@/contexts/RedeemContext";

import { ConfirmationStep } from "./ConfirmationStep";
import { GiftChoiceStep } from "./GiftChoiceStep";
import { UserFormStep } from "./UserFormStep";
import { WelcomeStep } from "./WelcomeStep";

const stepComponents: Record<IRedeemStep, React.ReactElement> = {
  WELCOME: <WelcomeStep />,
  "GIFT-CHOICE": <GiftChoiceStep />,
  "USER-FORM": <UserFormStep />,
  CONFIRMATION: <ConfirmationStep />,
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
};

export const Redeem = () => {
  const { step, loadState, redeem } = useRedeem();

  const isLoading = loadState === "loading";
  const isError = loadState === "error";
  const isReady = loadState === "ready";
  const isActive = redeem?.status === "ACTIVE";

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1000px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: 4,
      }}
    >
      {!isReady && (
        <Wrapper>
          {isLoading && (
            <CircularProgress
              sx={(theme) => ({ color: theme.palette.lobby[200] })}
            />
          )}

          {isError && <ErrorState />}
        </Wrapper>
      )}

      {isReady && isActive && stepComponents[step]}
      {isReady && !isActive && (
        <Wrapper>
          <ErrorState
            title="Oops! Este produto está indisponivel para resgate."
            subtitle="Entre em contato com o suporte."
          />
        </Wrapper>
      )}

      <Copyright />
    </Container>
  );
};
