import { create } from 'zustand';

interface AppState {
  isAudioMuted: boolean;
  toggleAudio: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useStore = create<AppState>((set) => ({
  isAudioMuted: true,
  toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}));
