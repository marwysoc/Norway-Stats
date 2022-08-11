import axios from "axios";

import { useMutation } from "@tanstack/react-query";

export const useSendDataMutation = () => {
  return useMutation((params: { data: any }) =>
    axios.post("https://data.ssb.no/api/v0/en/table/05963", params.data)
  );
};
