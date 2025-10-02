import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";

import { Button } from "./Button";

interface IProductCardProps {
  id: string;
  name: string;
}

export const ProductCard = ({ id, name }: IProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="20px"
      border={(theme) => `1px solid ${theme.palette.customGrey[300]}`}
      padding="20px"
      marginBottom="10px"
      width="100%"
      borderRadius="10px"
    >
      <Typography variant="h6" color="black">
        {name}
      </Typography>

      <Button onClick={() => navigate(`/redeem/${id}`)}>Resgatar</Button>
    </Box>
  );
};
