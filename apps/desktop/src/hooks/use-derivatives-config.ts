import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { actions } from "@/features/derivative-config-slice";

export const useDerivativesConfig = () => {
  const derivativeConfig = useSelector(
    (state: RootState) => state.present.derivativeConfig
  );
  const dispatch = useDispatch();

  return {
    ...actions,
    ...derivativeConfig,
    dispatch,
  };
};
