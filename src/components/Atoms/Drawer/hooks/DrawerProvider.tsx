import { MutableRefObject, ReactNode, createContext, useContext, useMemo, useRef, useState } from 'react';

const DrawerContext = createContext({});

export type DrawerProviderType<T> = {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  drawerStorage?: T;
  clearDrawerStorage: () => void;
  updateDrawerStorage: (value: UpdateDrawerStorage<T>) => void;
  documentEditorRef: MutableRefObject<Nullable<{ onSave: () => Promise<void> }>>;
};

type UpdateDrawerStorage<S> = S | ((prevDrawerStorage?: S) => S);

export function useDrawerProvider<T>(): DrawerProviderType<T> {
  const DrawerProvider = useContext(DrawerContext) as DrawerProviderType<T>;
  if (DrawerProvider === undefined) {
    throw new Error('useDrawerProvider must be used within DrawerContext.Provider');
  }
  return DrawerProvider;
}

export function DrawerProvider<T>({ children }: { children: ReactNode }) {
  const [drawerStorage, setDrawerStorage] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);

  const documentEditorRef = useRef(null);

  function clearDrawerStorage() {
    setDrawerStorage(undefined);
  }

  function updateDrawerStorage(value: UpdateDrawerStorage<T>) {
    setDrawerStorage(value);
  }

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  const value: DrawerProviderType<T> = useMemo(
    () => ({
      loading,
      startLoading,
      stopLoading,
      drawerStorage,
      clearDrawerStorage,
      updateDrawerStorage,
      documentEditorRef
    }),
    [loading, startLoading, stopLoading, drawerStorage, clearDrawerStorage, updateDrawerStorage, documentEditorRef]
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}
