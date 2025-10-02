import { Box, Typography } from "@mui/material";

export const Copyright = () => {
  return (
    <Box mt="40px" textAlign="center">
      <Typography fontSize="14px" color="black">
        © 2025 · <strong>Vinicius Melo</strong> em parceria com a{" "}
        <strong>Lobby</strong>
      </Typography>
    </Box>
  );
};
