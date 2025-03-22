import { useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAsyncEffect } from './useAsyncEffect';
import { DanhMucEnums } from '@/constants/enums';
import { DanhMucBase, DanhMucConfig } from '@/service/API/category/types';
import { store } from '@/store';
// import {
//   getDanhMuc,
// } from '@/store/slices/danhMuc/services';
import { DanhMucState } from '@/store/slices/danhMuc/types';

export interface BaseDanhMucConfig extends Partial<DanhMucBase>, Partial<DanhMucConfig> {}

export function useDanhMuc(danhMucArr: DanhMucEnums[]) {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useAppDispatch();

  useAsyncEffect(async () => {
    try {
      await fetchDanhMuc();
    } catch (_) {
      //
    } finally {
      setIsFetched(true);
    }
  }, []);

  async function fetchDanhMuc() {
    for (const danhMuc of danhMucArr) {
      switch (danhMuc) {
        // case DanhMucEnums.ThanhPho:
        //   await dispatch(getDanhMucThanhPho());
        //   break;
        default:
          break;
      }
    }
  }

  if (!isFetched) return danhMucArr.map((_danhMucItem) => []);

  const state: DanhMucState = store.getState().danhMucManager;
  return danhMucArr.map((danhMucItem) => (state[danhMucItem]?.data as BaseDanhMucConfig[]) || []);
}
