import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LaunchesPage from "../src/pages/launches/index";
import "@testing-library/jest-dom";
import { useLaunches } from "@/hooks/useLaunches";
import { mockLaunches } from "./mocks/mockLaunches";
import type { Launch } from "../src/types/launches";
import type { UseQueryResult } from "@tanstack/react-query";

vi.mock("@/hooks/useLaunches", () => ({
  useLaunches: vi.fn(),
}));

vi.mock("./../src/state/useLaunchesStore", () => ({
  useLaunchesStore: vi.fn((selector) =>
    selector({
      launches: mockLaunches,
      setLaunches: vi.fn(),
      selectedLaunch: null,
      setSelectedLaunch: vi.fn(),
      dateRange: [null, null],
      successFilter: "all",
      upcomingFilter: "all",
      setDateRange: vi.fn(),
      setSuccessFilter: vi.fn(),
      setUpcomingFilter: vi.fn(),
      setRocket: vi.fn(),
      setPayloads: vi.fn(),
      setCrew: vi.fn(),
    })
  ),
}));

describe("LaunchesPage", () => {
  it("renders loading state when data is being fetched", () => {
    const mockedUseLaunches = vi.mocked(useLaunches);
    mockedUseLaunches.mockReturnValue({
      // @ts-expect-error data is null in loading state for this test
      data: null,
      isLoading: true,
      error: null,
    });

    render(<LaunchesPage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state when there is an error fetching data", () => {
    const mockedUseLaunches = vi.mocked(useLaunches);
    mockedUseLaunches.mockReturnValue({
      // @ts-expect-error data is null in error state for this test
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch launches"),
    });

    render(<LaunchesPage />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("renders no launches found warning when fetched successfully, but no launches match filters", () => {
    const mockedUseLaunches = vi.mocked(useLaunches);
    mockedUseLaunches.mockReturnValue({
      data: [] as Launch[],
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Launch[], Error>);

    render(<LaunchesPage />);

    expect(screen.getByText(/no launches found/i)).toBeInTheDocument();
  });

  it("renders launches when data is fetched successfully", () => {
    const mockedUseLaunches = vi.mocked(useLaunches);
    mockedUseLaunches.mockReturnValue({
      data: mockLaunches,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Launch[], Error>);

    render(<LaunchesPage />);

    expect(
      screen.getByText(new RegExp(mockLaunches[0].name, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockLaunches[1].name, "i"))
    ).toBeInTheDocument();
  });
});
