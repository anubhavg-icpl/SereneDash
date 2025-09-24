import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface FocusState {
  focus: string;
  setFocus: (focus: string) => void;
}
export const useFocusStore = create<FocusState>()(
  persist(
    (set) => ({
      focus: '',
      setFocus: (focus) => set({ focus }),
    }),
    {
      name: 'serenedash-focus-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);