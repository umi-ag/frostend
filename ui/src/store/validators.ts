import { suiClient } from "src/config/sui";
import useSWR, { preload } from 'swr';


const fetchSuiSystemState = async () => {
  const suiSystemState = await suiClient().getLatestSuiSystemState();
  return suiSystemState;
}

preload('suiSystemState', fetchSuiSystemState);

// export const useSuiSystemState = create<{
//   suiSystemState: SuiSystemStateSummary | null;
//   fetch: () => void;
// }>((set) => ({
//   suiSystemState: null,
//   fetch: async () => {
//     const suiSystemState = await suiClient().getLatestSuiSystemState();
//     set({ suiSystemState });
//   },
// }));

export const useSuiSystemState = () => useSWR(
  'suiSystemState',
  fetchSuiSystemState,
  {
    refreshInterval: 600_000, // 10 minutes
    revalidateOnFocus: false,
  },
);
