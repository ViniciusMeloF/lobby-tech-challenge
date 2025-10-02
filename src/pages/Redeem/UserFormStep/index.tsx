import { useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router";

import { BASE_URL, BASIC_AUTH } from "@/api";
import { Button } from "@/components/Button";
import { useRedeem } from "@/contexts/RedeemContext";
import { BRAZILIAN_STATES } from "@/utils/constants";

import { SectionTitle } from "./internal/SectionTitle";

type IFormValues = {
  redeemer_name: string;
  redeemer_email: string;
  redeemer_document_number: string;
  redeemer_zipcode: string;
  redeemer_street: string;
  redeemer_number: string;
  redeemer_complement: string;
  redeemer_neighborhood: string;
  redeemer_city: string;
  redeemer_state: string;
  redeemer_country: string;
  redeemer_phone: string;
  extra_question_responses: {
    extra_question_id: number;
    answer: string;
  }[];
  items: {
    customer_product_id: string;
    size_name: string;
  }[];
};

export const UserFormStep = () => {
  const { id } = useParams();
  const { previousStep, nextStep, selectedGift, redeem } = useRedeem();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const hasSize = !!selectedGift?.sizes.length;
  const hasExtraQuestions = !!redeem.extra_questions.length;

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<IFormValues>({
    defaultValues: {
      redeemer_name: "",
      redeemer_email: "",
      redeemer_document_number: "",
      redeemer_zipcode: "",
      redeemer_street: "",
      redeemer_number: "",
      redeemer_complement: "",
      redeemer_neighborhood: "",
      redeemer_city: "",
      redeemer_state: "",
      redeemer_country: "",
      redeemer_phone: "",
      extra_question_responses: redeem.extra_questions.map((q) => ({
        extra_question_id: q.id,
        answer: "",
      })),
      items: [
        {
          customer_product_id: selectedGift?.customer_product_id,
          size_name: "",
        },
      ],
    },
  });

  const { fields: questionFields } = useFieldArray({
    control,
    name: "extra_question_responses",
  });

  const { fields: itemFields } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: IFormValues) => {
    const url = `${BASE_URL}/${id}/redeem`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Basic ${BASIC_AUTH}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();

        if (error?.error?.arg_errors) {
          Object.entries(error.error.arg_errors).forEach(
            ([field, messages]) => {
              setError(field as keyof IFormValues, {
                type: "server",
                message: Array.isArray(messages)
                  ? messages[0]
                  : String(messages),
              });
            }
          );
        }

        throw new Error(error?.error?.display_message || "Erro inesperado");
      }

      nextStep();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err?.message || "Falha no envio",
        severity: "error",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          fontSize={20}
          fontWeight="600"
          color="black"
          textAlign="center"
          marginBottom="40px"
        >
          Finalize o seu resgate
        </Typography>

        <Box marginBottom="40px">
          <SectionTitle title="Dados do destinatário" />

          <Grid container spacing="32px">
            <Grid size={{ xs: 12 }}>
              <Controller
                name="redeemer_name"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Nome completo"
                    variant="standard"
                    required
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="redeemer_document_number"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="CPF ou CNPJ"
                    variant="standard"
                    required
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="redeemer_email"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="E-mail"
                    type="email"
                    variant="standard"
                    required
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <Box marginBottom="40px">
          <SectionTitle title="Endereço de entrega" />

          <Grid container spacing="32px">
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="redeemer_zipcode"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="CEP"
                    variant="standard"
                    required
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="redeemer_street"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Rua"
                    variant="standard"
                    required
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="redeemer_number"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Número"
                    variant="standard"
                    required
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="redeemer_complement"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Complemento"
                    variant="standard"
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="redeemer_neighborhood"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Bairro"
                    variant="standard"
                    required
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="redeemer_city"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Cidade"
                    variant="standard"
                    required
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="redeemer_state"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Estado"
                    variant="standard"
                    select
                    required
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    {BRAZILIAN_STATES.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="redeemer_country"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="País"
                    variant="standard"
                    select
                    required
                    fullWidth
                    disabled={isSubmitting}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    <MenuItem value="BR">Brasil</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </Box>

        {hasSize && (
          <Box marginBottom="40px">
            <SectionTitle title="Tamanhos" />

            <Grid container spacing="32px">
              <Grid size={{ xs: 12, sm: 6 }}>
                {itemFields.map((item, index) => (
                  <Controller
                    key={item.id}
                    name={`items.${index}.size_name`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label={`Qual o seu tamanho (${selectedGift?.sizes_grid?.name})?`}
                        variant="standard"
                        select
                        fullWidth
                        disabled={isSubmitting}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      >
                        {selectedGift?.sizes.map((size) => (
                          <MenuItem key={size.id} value={size.name}>
                            {size.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                ))}
              </Grid>
            </Grid>
          </Box>
        )}

        {hasExtraQuestions && (
          <Box marginBottom="40px">
            <SectionTitle title="Perguntas Extras" />

            <Grid container spacing="32px">
              {questionFields.map((question, index) => (
                <Grid key={question.id} size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name={`extra_question_responses.${index}.answer`}
                    control={control}
                    render={({ field, fieldState }) => {
                      const question = redeem.extra_questions[index];

                      switch (question.answer_type) {
                        case "text":
                          return (
                            <TextField
                              {...field}
                              label={question.question}
                              variant="standard"
                              fullWidth
                              disabled={isSubmitting}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                          );

                        case "text_area":
                          return (
                            <TextField
                              {...field}
                              label={question.question}
                              variant="standard"
                              fullWidth
                              multiline
                              maxRows={2}
                              disabled={isSubmitting}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                          );

                        case "select_one":
                          return (
                            <TextField
                              {...field}
                              label={question.question}
                              variant="standard"
                              select
                              fullWidth
                              disabled={isSubmitting}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            >
                              {question.options?.map((opt, i) => (
                                <MenuItem key={i} value={opt}>
                                  {opt}
                                </MenuItem>
                              ))}
                            </TextField>
                          );

                        case "date":
                          return (
                            <TextField
                              {...field}
                              label={question.question}
                              type="date"
                              variant="standard"
                              fullWidth
                              disabled={isSubmitting}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              slotProps={{
                                inputLabel: {
                                  shrink: true,
                                },
                              }}
                            />
                          );

                        default:
                          return <></>;
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variantType="secondary"
            onClick={previousStep}
            disabled={isSubmitting}
          >
            Voltar
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <CircularProgress
                size={20}
                sx={(theme) => ({ color: theme.palette.lobby[200] })}
              />
            ) : (
              "Continuar"
            )}
          </Button>
        </Stack>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};
