import { Fragment } from "react";

import { Grid, Stack, Typography } from "@mui/material";

import { Button } from "@/components/Button";
import { CardItem } from "@/components/CardItem";
import { useRedeem } from "@/contexts/RedeemContext";

export const GiftChoiceStep = () => {
  const { nextStep, previousStep, redeem, selectedGift, setSelectedGift } =
    useRedeem();

  return (
    <>
      <Typography
        fontSize={20}
        fontWeight="600"
        color="black"
        textAlign="center"
        marginBottom="40px"
      >
        Escolha o seu presente! 🎁
      </Typography>

      <Grid container spacing={3}>
        {redeem.items.map((item) => {
          if (item.optional) {
            return (
              <Fragment key={item.customer_product_id}>
                <Grid size={{ lg: 4, md: 4, sm: 12 }}>
                  <CardItem
                    item={item}
                    selected={
                      selectedGift?.customer_product_id ===
                      item.customer_product_id
                    }
                    onSelect={setSelectedGift}
                  />
                </Grid>
              </Fragment>
            );
          }
        })}
      </Grid>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt="40px"
      >
        <Button variantType="secondary" onClick={previousStep}>
          Voltar
        </Button>
        <Button disabled={!selectedGift} onClick={nextStep}>
          Continuar
        </Button>
      </Stack>
    </>
  );
};
