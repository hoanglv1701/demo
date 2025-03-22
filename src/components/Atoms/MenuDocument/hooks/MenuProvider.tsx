import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useTransition
} from 'react';
import { cloneDeep } from 'lodash';
import { DocumentData } from '@/components/Business/DanhSachBieuMau/BieuMauHandler/components/BieuMauContainer/types';

const MenuContext = createContext({});

export type UpdateDocumentParams = {
  key?: string;
  label?: string;
  data?: any;
  additionalData?: any;
};

export type MenuProviderType = {
  key?: string;
  label?: string;
  documentData?: DocumentData;
  isLoadPending: boolean;
  menuStorage: any;
  getFooterInfo: any;
  setFooterInfo: (info: any) => void;
  updateDocument: (key?: string, label?: string, data?: any, additionalData?: any) => void;
  updateMenuStorage: (additionalData?: any) => void;
  collapse: boolean;
  setCollapse: Dispatch<SetStateAction<boolean>>;
};

export function useMenuProvider() {
  const menuProvider = useContext(MenuContext);
  if (menuProvider === undefined) {
    throw new Error('useMenuProvider must be used within MenuContext.Provider');
  }
  return menuProvider as MenuProviderType;
}

export function MenuProvider({ children }: { children: ReactNode }) {
  const [key, setKey] = useState<string | undefined>(undefined);
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [documentData, setDocumentData] = useState<any>(undefined);
  const [menuStorage, setMenuStorage] = useState<any>(); //saving any data
  const [collapse, setCollapse] = useState(false);

  const [isPending, startTransition] = useTransition();

  const footerInfo = useRef<any>(null);
  const updateDocument = (key?: string, label?: string, data?: any, additionalData?: any) => {
    setKey(key);
    setLabel(label);

    startTransition(() => {
      setDocumentData(cloneDeep(data));
      // setDirty(false);
      additionalData && setMenuStorage(additionalData);
    });
  };

  const updateMenuStorage = (additionalData?: any) => {
    additionalData && setMenuStorage(additionalData);
  };

  const getFooterInfo = () => {
    return footerInfo.current;
  };

  const setFooterInfo = (info: any) => {
    footerInfo.current = info;
  };

  const value: MenuProviderType = useMemo(
    () => ({
      key,
      label,
      documentData,
      menuStorage,
      updateDocument,
      updateMenuStorage,
      isLoadPending: isPending,
      getFooterInfo,
      setFooterInfo,
      collapse,
      setCollapse
    }),
    [
      key,
      label,
      documentData,
      getFooterInfo,
      setFooterInfo,
      menuStorage,
      updateDocument,
      updateMenuStorage,
      isPending,
      collapse,
      setCollapse
    ]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
