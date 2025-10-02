import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

import logoImg from "@/assets/logo.png";

import { Button } from "./Button";

interface IErrorStateProps {
  title?: string;
  subtitle?: string;
  hideLogo?: boolean;
  hideButton?: boolean;
}

export const ErrorState = ({
  title,
  subtitle,
  hideLogo = false,
  hideButton = false,
}: IErrorStateProps) => {
  const navigate = useNavigate();

  return (
    <>
      {!hideLogo && (
        <img
          src={logoImg}
          alt="Lobby Logo"
          width={189}
          style={{ marginBottom: "64px" }}
        />
      )}

      <Typography
        fontSize={20}
        color="lobby.200"
        fontWeight="700"
        marginBottom="16px"
        textAlign="center"
      >
        {title ?? "Oops! Ocorreu um erro ao fazer o resgate."}
      </Typography>

      <Typography
        fontSize={16}
        color="customGrey.400"
        marginBottom="64px"
        textAlign="center"
      >
        {subtitle ?? "Tente novamente mais tarde."}
      </Typography>

      {!hideButton && (
        <Button onClick={() => navigate("/")}>
          Voltar para página inicial
        </Button>
      )}
    </>
  );
};
