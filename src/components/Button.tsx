import { Button as MUIButton, styled, type ButtonProps } from "@mui/material";

const ButtonPrimary = styled(MUIButton)<ButtonProps>(({ theme }) => ({
  textTransform: "none",
  borderRadius: "9999px",
  backgroundColor: theme.palette.lobby[200],
  color: "#FFF",
  padding: "12px 20px",
  height: "43px",
  fontSize: "14px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: theme.palette.lobby[300],
  },
  "&.Mui-disabled": {
    backgroundColor: theme.palette.lobby[100],
    color: "#FFF",
  },
}));

const ButtonSecondary = styled(MUIButton)<ButtonProps>(({ theme }) => ({
  textTransform: "none",
  borderRadius: "9999px",
  backgroundColor: "#FFF",
  padding: "12px 20px",
  height: "43px",
  color: theme.palette.customGrey[400],
  border: `1px solid ${theme.palette.customGrey[400]}`,
  fontSize: "14px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: theme.palette.customGrey[100],
    borderColor: theme.palette.customGrey[400],
  },
}));

type ICustomButtonProps = ButtonProps & {
  variantType?: "primary" | "secondary";
};

export const Button = ({
  variantType = "primary",
  children,
  ...props
}: ICustomButtonProps) => {
  if (variantType === "secondary") {
    return <ButtonSecondary {...props}>{children}</ButtonSecondary>;
  }
  return <ButtonPrimary {...props}>{children}</ButtonPrimary>;
};
