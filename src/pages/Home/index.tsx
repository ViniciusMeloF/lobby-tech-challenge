import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import type { ILoadState } from "@/@types/Global";
import type { IRedeem } from "@/@types/Redeem";
import { BASE_URL, BASIC_AUTH } from "@/api";
import logoImg from "@/assets/logo.png";
import { ErrorState } from "@/components/ErrorState";
import { ProductCard } from "@/components/ProductCard";

export const Home = () => {
  const [loadState, setLoadState] = useState<ILoadState>("idle");
  const [redeems, setRedeems] = useState<IRedeem[]>([]);

  const isLoading = loadState === "loading";
  const isError = loadState === "error";
  const isReady = loadState === "ready";

  const fetchRedeems = async () => {
    setLoadState("loading");

    const url = `${BASE_URL}`;

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
      setRedeems(data.redeem_pages);

      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  };

  useEffect(() => {
    fetchRedeems();
  }, []);

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
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src={logoImg}
          alt="Lobby Logo"
          width={189}
          style={{ marginBottom: "64px" }}
        />

        <Typography
          fontSize={20}
          color="black"
          fontWeight="700"
          textAlign="center"
          gutterBottom
        >
          Teste Técnico – Aplicação de Resgates
        </Typography>

        <Typography
          fontSize={16}
          color="customGrey.400"
          marginBottom="64px"
          textAlign="center"
        >
          Clique em um dos produtos abaixo para visualizar a página de resgate.
        </Typography>

        {isLoading && (
          <CircularProgress
            sx={(theme) => ({ color: theme.palette.lobby[200] })}
          />
        )}
        {isError && (
          <ErrorState
            hideLogo
            hideButton
            title="Oops! Ocorreu um erro ao buscar os produtos para o resgate."
          />
        )}

        {isReady &&
          redeems.map((item) => (
            <ProductCard key={item.id} id={item.id} name={item.title} />
          ))}
      </Box>
    </Container>
  );
};
