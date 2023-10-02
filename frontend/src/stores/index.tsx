import {
  FC,
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
} from "react";
import { AppStore } from "./AppStore";

export const StoreContext = createContext<AppStore>({} as AppStore);

export interface Props {
  store: AppStore;
}

export const StoreProvider: FC<PropsWithChildren<Props>> = ({
  store,
  children,
}): ReactElement => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStores = (): AppStore => useContext(StoreContext);
