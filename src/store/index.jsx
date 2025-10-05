// src/store/index.js
import { create } from "zustand";

export const userInfo = create((set) => ({
  value: {},
  setUserInfo: (newUserInfo) => set({ value: newUserInfo }),
}));

export const loader = create((set) => ({
  index: false,
  openLoader: () => set({ index: true }),
  closeLoader: () => set({ index: false }),
}));
