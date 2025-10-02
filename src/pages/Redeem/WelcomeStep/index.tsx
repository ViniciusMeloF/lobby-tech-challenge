import { Box, CircularProgress, Typography } from "@mui/material";

import { Button } from "@/components/Button";
import { useRedeem } from "@/contexts/RedeemContext";

export const WelcomeStep = () => {
  const { loadState, redeem, nextStep } = useRedeem();

  const isLoading = loadState === "loading";

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <img src={redeem.logo_url} alt={redeem.title} width={189} />

          <Box marginY="40px">
            <Typography
              fontSize={40}
              color="black"
              fontWeight="600"
              marginBottom="20px"
              textAlign="center"
            >
              {redeem.title}
            </Typography>

            <Typography
              fontSize={20}
              color="customGrey.400"
              textAlign="center"
              gutterBottom
            >
              {redeem.welcome_title}
            </Typography>

            <Typography fontSize={20} color="customGrey.400" textAlign="center">
              {redeem.welcome_phrase}
            </Typography>
          </Box>

          <Button onClick={nextStep}>Começar!</Button>
        </>
      )}
    </Box>
  );
};
