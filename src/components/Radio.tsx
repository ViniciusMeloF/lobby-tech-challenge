import { Box, Radio as MUIRadio, styled, type RadioProps } from "@mui/material";

export const Radio = styled((props: RadioProps) => (
  <MUIRadio
    disableRipple
    color="default"
    checkedIcon={
      <Box
        width={48}
        height={48}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        bgcolor={(theme) => theme.palette.selected.main}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </Box>
    }
    icon={
      <Box
        width={48}
        height={48}
        borderRadius="50%"
        border={(theme) => `1px solid ${theme.palette.customGrey[300]}`}
        bgcolor="#FFF"
      />
    }
    {...props}
  />
))({});
