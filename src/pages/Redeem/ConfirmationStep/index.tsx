import { Box, Typography } from "@mui/material";

import logoImg from "@/assets/logo.png";

export const ConfirmationStep = () => {
  return (
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
        style={{ marginBottom: "40px" }}
      />

      <Typography
        fontSize={40}
        color="black"
        fontWeight="600"
        marginBottom="20px"
      >
        Presente resgatado! 🎉🥳
      </Typography>

      <Typography fontSize={20} color="customGrey.400" textAlign="center" gutterBottom>
        Seu pedido está em andamento!
      </Typography>

      <Typography fontSize={20} color="customGrey.400" textAlign="center" gutterBottom>
        E não se preocupe, as alterações de status do envio chegam todas em seu
        e-mail!
      </Typography>
    </Box>
  );
};
