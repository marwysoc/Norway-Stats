import React from "react";

import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import { FormValues } from "../";
import { PropertyForm } from "../components";

interface Props {}

export const PageForm = ({}: Props) => {
  const methods = useForm<FormValues>();
  const { handleSubmit } = methods;

  const navigate = useNavigate();
  const onClickGoLibrary = () => navigate("/lib");

  return (
    <Box
      sx={{
        marginTop: "64px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormProvider {...methods}>
        <PropertyForm />
      </FormProvider>

      <Button
        sx={{
          width: "50%",
          marginTop: 1,
          marginBottom: 1,
        }}
        variant={"contained"}
        color={"secondary"}
        onClick={onClickGoLibrary}
      >
        Go to library
      </Button>
    </Box>
  );
};

export default PageForm;
