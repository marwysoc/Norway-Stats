import React from "react";

import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import { useSendDataMutation } from "../../../api/send-data";
import { Input } from "../../../components/UI";
import { houses, quarters, years } from "../../../consts";
import { usePricesStore } from "../../../store/prices-store";
import { DescribeText, InputDescriber } from "./";
import { makeQuery } from "./utils/makeQuery";

interface Props {}

export const PropertyForm = ({ ...restProps }: Props) => {
  const sendData = useSendDataMutation();
  const pricesStore = usePricesStore();

  const navigate = useNavigate();

  const VALUE_REQUIRED_ERROR = "This Value is required";

  const isLoading = sendData.isLoading;

  const methods = useFormContext();
  const {
    register,
    formState: { errors },
  } = methods;

  const registerStartYear = register("startYear", {
    required: {
      value: true,
      message: VALUE_REQUIRED_ERROR,
    },
  });

  const registerStartQuarter = register("startQuarter", {
    required: {
      value: true,
      message: VALUE_REQUIRED_ERROR,
    },
  });

  const registerEndYear = register("endYear", {
    required: {
      value: true,
      message: VALUE_REQUIRED_ERROR,
    },
  });

  const registerEndQuarter = register("endQuarter", {
    required: {
      value: true,
      message: VALUE_REQUIRED_ERROR,
    },
  });

  const registerHouseType = register("houseType", {
    required: {
      value: true,
      message: VALUE_REQUIRED_ERROR,
    },
  });

  const onSubmit = methods.handleSubmit(async (values) => {
    const start: string = `${values.startYear}K${values.startQuarter}`;
    const end: string = `${values.endYear}K${values.endQuarter}`;

    const { query } = makeQuery(start, end, values.houseType);

    try {
      const apiData = await sendData.mutateAsync({
        data: query,
      });
      pricesStore.setGraphData({
        prices: apiData.data.values,
        labels: query.query[3].selection.values,
      });

      const houseType =
        apiData.data.dimension.Boligtype.category.label[values.houseType];

      navigate(`/${start}-${end}/${houseType}`);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Box
      sx={{
        margin: "10px",
        display: "block",
        width: "50%",
      }}
      {...restProps}
    >
      <DescribeText
        primaryTxt={"Welcome to Norawy Stats"}
        secondaryTxt={"Select range to get statistics"}
      />
      <form onSubmit={onSubmit}>
        <InputDescriber describerTxt={"Start quarter"} />
        <Input label={"Start year"} options={years} {...registerStartYear} />
        <Input
          label={"Start quarter"}
          options={quarters}
          {...registerStartQuarter}
        />
        <InputDescriber describerTxt={"End quarter"} />
        <Input label={"End year"} options={years} {...registerEndYear} />
        <Input label={"End quarter"} options={quarters} />
        <InputDescriber describerTxt={"House Type"} />
        <Input label={"House type"} options={houses} {...registerHouseType} />
        <Button
          variant={"contained"}
          color={"primary"}
          type={"submit"}
          sx={{
            width: "100%",
            marginTop: 2,
            marginBottom: 1,
          }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default PropertyForm;
