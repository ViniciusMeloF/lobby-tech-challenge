import { Box, Paper, Typography } from "@mui/material";

import type { IItem } from "@/@types/Redeem";

import { Radio } from "./Radio";

interface ICardItemProps {
  item: IItem;
  selected: boolean;
  onSelect: (gift: IItem) => void;
  disabled?: boolean;
}

export const CardItem = ({
  item,
  selected,
  disabled = false,
  onSelect,
}: ICardItemProps) => {
  return (
    <Paper
      variant="outlined"
      sx={(theme) => ({
        position: "relative",
        borderRadius: 2,
        border: `1px solid ${theme.palette.customGrey[200]}`,
        minWidth: "292px",
        height: "336px",
        overflow: "hidden",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: disabled ? "none" : theme.palette.lobby[200],
        },
      })}
      onClick={() => !disabled && onSelect(item)}
    >
      <Box position="absolute" top={8} right={8}>
        <Radio
          checked={selected}
          onChange={() => onSelect(item)}
          disabled={disabled}
        />
      </Box>

      <img
        src={item.image_url}
        alt={item.name}
        style={{ width: "100%", height: "261px", objectFit: "cover" }}
      />

      <Typography
        fontSize={16}
        color="black"
        fontWeight="600"
        textAlign="center"
        mt="20px"
      >
        {item.name}
      </Typography>
    </Paper>
  );
};
