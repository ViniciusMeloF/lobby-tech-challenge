import { Typography } from "@mui/material";

interface ISectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: ISectionTitleProps) => {
  return (
    <Typography
      fontSize={16}
      fontWeight="600"
      color="black"
      marginBottom="32px"
    >
      {title}
    </Typography>
  );
};
