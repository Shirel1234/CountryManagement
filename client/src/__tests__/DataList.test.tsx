import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useFetchCountries } from "../hooks/queries/useCountriesQuery";
import DataList from "../components/DataList";
import { showSuccessToast, showErrorToast } from "../components/utils/Toast";
import { vi } from "vitest";

// Mock the dependencies
vi.mock("../hooks/queries/useCountriesQuery", () => ({
  useFetchCountries: vi.fn(), 
}));
vi.mock("../components/Toast", () => ({
  showSuccessToast: vi.fn(),
  showErrorToast: vi.fn(),
}));
vi.mock("./CountriesTable");
const queryClient = new QueryClient();

const renderWithQueryClient = (component: React.ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
describe("DataList Component", () => {
  const mockUseFetchData = useFetchCountries as jest.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Loader when data is loading", () => {
    mockUseFetchData.mockReturnValue({
      isLoading: true,
      isError: false,
      isSuccess: false,
      error: null,
    });
    render(<DataList />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders error message when data fetch fails", () => {
    mockUseFetchData.mockReturnValue({
      isLoading: false,
      isError: true,
      isSuccess: false,
      error: new Error("Failed to load data"),
    });

    render(<DataList />);

    // Check that the error message is displayed when there's an error
    expect(screen.getByText(/Error: Failed to load data/)).toBeInTheDocument();
    expect(showErrorToast).toHaveBeenCalledWith("Failed to load data.");
  });

  it("renders CountriesTable when data is successfully fetched", () => {
    mockUseFetchData.mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      error: null,
    });

    renderWithQueryClient(
      <MemoryRouter>
        <DataList />
      </MemoryRouter>
    );

    // Check that the CountriesTable component is rendered when data is fetched successfully
    expect(screen.getByTestId("countries-table")).toBeInTheDocument();
    expect(showSuccessToast).toHaveBeenCalledWith("Data loaded successfully!");
  });

  it("does not show success or error toast when data is still loading", () => {
    mockUseFetchData.mockReturnValue({
      isLoading: true,
      isError: false,
      isSuccess: false,
      error: null,
    });

    render(<DataList />);

    // Wait for the loader to render
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(showSuccessToast).not.toHaveBeenCalled();
    expect(showErrorToast).not.toHaveBeenCalled();
  });

  it("calls the correct toast functions when data load succeeds or fails", async () => {
    // Simulate success scenario
    mockUseFetchData.mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      error: null,
    });
    renderWithQueryClient(
      <MemoryRouter>
        <DataList />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(showSuccessToast).toHaveBeenCalledWith("Data loaded successfully!")
    );

    // Simulate error scenario
    mockUseFetchData.mockReturnValue({
      isLoading: false,
      isError: true,
      isSuccess: false,
      error: new Error("Failed to load data"),
    });
    renderWithQueryClient(
      <MemoryRouter>
        <DataList />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(showErrorToast).toHaveBeenCalledWith("Failed to load data.")
    );
  });
});
