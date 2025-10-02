import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";

import logoImg from "@/assets/logo.png";
import notFoundImg from "@/assets/not-found.png";
import { Button } from "@/components/Button";

export const NotFound = () => {
  const navigate = useNavigate();

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

        <img
          src={notFoundImg}
          alt="Not Found Image"
          width={500}
          style={{ marginBottom: "20px" }}
        />

        <Typography
          fontSize={20}
          color="lobby.200"
          fontWeight="700"
          marginBottom="16px"
          textAlign="center"
        >
          Oops! Página não encontrada.
        </Typography>

        <Typography
          fontSize={16}
          color="customGrey.400"
          marginBottom="64px"
          textAlign="center"
        >
          Parece que você explorou demais, e acabou se perdendo.
        </Typography>

        <Button onClick={() => navigate("/")}>
          Voltar para página inicial
        </Button>
      </Box>
    </Container>
  );
};
