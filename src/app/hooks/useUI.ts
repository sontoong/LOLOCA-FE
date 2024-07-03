import { useAppSelector } from "../redux/hook";

export function useUI() {
  const state = useAppSelector((state) => state.ui);
  return {
    state,
  };
}
