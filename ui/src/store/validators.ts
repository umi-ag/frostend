import { suiClient } from "src/config/sui";
import useSWR from 'swr';

export const fetchSuiSystemState = async () => {
  const suiSystemState = await suiClient().getLatestSuiSystemState();
  return suiSystemState;
}

export const useSuiSystemState = () => useSWR(
  'suiSystemState',
  fetchSuiSystemState,
  {
    refreshInterval: 600_000, // 10 minutes
    revalidateOnFocus: false,
  },
);
