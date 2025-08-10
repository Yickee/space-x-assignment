import type { Crew } from "@/types/crew";
import type { Launch } from "@/types/launches";
import type { Payload } from "@/types/payload";
import type { Rocket } from "@/types/rocket";
import { create } from "zustand";

interface LaunchesState {
  dateRange: [Date | undefined, Date | undefined];
  setDateRange: (dateRange: [Date | undefined, Date | undefined]) => void;

  successFilter: "all" | "success" | "failed";
  setSuccessFilter: (value: "all" | "success" | "failed") => void;

  upcomingFilter: "all" | "upcoming" | "finished";
  setUpcomingFilter: (value: "all" | "upcoming" | "finished") => void;

  selectedLaunch: Launch | null;
  setSelectedLaunch: (launch: Launch | null) => void;

  launches: Launch[];
  setLaunches: (launches: Launch[]) => void;

  rocket: Rocket | null;
  setRocket: (rocket: Rocket | null) => void;

  payloads: Payload[];
  setPayloads: (payloads: Payload[]) => void;

  crew: Crew[];
  setCrew: (crew: Crew[]) => void;
}

export const useLaunchesStore = create<LaunchesState>(set => ({
  dateRange: [undefined, undefined],
  setDateRange: (dateRange) => set({ dateRange }),

  successFilter: "all",
  setSuccessFilter: (value) => set({ successFilter: value }),

  upcomingFilter: "all",
  setUpcomingFilter: (value) => set({ upcomingFilter: value }),

  selectedLaunch: null,
  setSelectedLaunch: (launch) => set({ selectedLaunch: launch }),

  launches: [],
  setLaunches: (launches) => set({ launches }),

  rocket: null,
  setRocket: (rocket) => set({ rocket }),

  payloads: [],
  setPayloads: (payloads) => set({ payloads }),

  crew: [],
  setCrew: (crew) => set({ crew }),
}));