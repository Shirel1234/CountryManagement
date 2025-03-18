// tests/CountriesTable.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import CountriesTable from "../components/country/CountriesTable";
import { addCountry, deleteCountry } from "../services/countryService";
import { useNavigate } from "react-router-dom";
import { userAccessLevelState } from "../state/atoms";

vi.mock("../hooks/queries/useCountriesQuery", () => ({
  useFetchCountries: () => ({
    data: [
      {
        _id: "1",
        name: "Country 1",
        flag: "https://flag.url",
        population: 1000000,
        region: "Asia",
      },
      {
        _id: "2",
        name: "Country 2",
        flag: "https://flag.url",
        population: 2000000,
        region: "Europe",
      },
    ],
    isLoading: false,
  }),
}));

vi.mock("../services/countryService.ts", () => ({
  addCountry: vi.fn(),
  deleteCountry: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Creating a custom render function
const customRender = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();

  return render(
    <MemoryRouter initialEntries={["/home"]}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
      </RecoilRoot>
    </MemoryRouter>
  );
};

describe("CountriesTable", () => {
  it("renders the countries table", () => {
    customRender(<CountriesTable />);

    // Check that the table headers are rendered
    expect(screen.getByText("Country Name")).toBeInTheDocument();
    expect(screen.getByText("Flag")).toBeInTheDocument();
    expect(screen.getByText("Population")).toBeInTheDocument();
    expect(screen.getByText("Region")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    // Check that the country rows are rendered
    expect(screen.getByText("Country 1")).toBeInTheDocument();
    expect(screen.getByText("Country 2")).toBeInTheDocument();
  });

  it("opens the Add Country dialog when the add button is clicked", () => {
    const userAccessLevel = 3;

    customRender(
      <RecoilRoot
        initializeState={({ set }) =>
          set(userAccessLevelState, userAccessLevel)
        }
      >
        <CountriesTable />
      </RecoilRoot>
    );

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls the addCountry function when a new country is added", async () => {
    const userAccessLevel = 2;
    customRender(
      <RecoilRoot
        initializeState={({ set }) =>
          set(userAccessLevelState, userAccessLevel)
        }
      >
        <CountriesTable />
      </RecoilRoot>
    );

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    await waitFor(() => screen.getByRole("dialog"));

    const input = screen.getByLabelText(/country name/i, {
      selector: '[id="country-name"]',
    });
    fireEvent.change(input, { target: { value: "New Country" } });

    fireEvent.change(screen.getByLabelText(/flag url/i), {
      target: { value: "https://newflag.url" },
    });
    fireEvent.change(
      screen.getByLabelText(/population/i, { selector: '[id="population"]' }),
      {
        target: { value: 5000000 },
      }
    );
    fireEvent.change(
      screen.getByLabelText(/region/i, { selector: '[id="region"]' }),
      {
        target: { value: "Africa" },
      }
    );
    fireEvent.click(screen.getByTestId("add-country-button"));

    await waitFor(() =>{
      console.log("addCountry:", addCountry);
      expect(addCountry).toHaveBeenCalledWith({
        name: "New Country",
        flag: "https://newflag.url",
        population: 5000000,
        region: "Africa",
        cities: [],
      })
   } );

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("opens the delete confirmation dialog when the delete button is clicked", () => {
    const userAccessLevel = 4;
    customRender(
      <RecoilRoot
        initializeState={({ set }) =>
          set(userAccessLevelState, userAccessLevel)
        }
      >
        <CountriesTable />
      </RecoilRoot>
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls the deleteCountry function when the delete is confirmed", async () => {
    const userAccessLevel = 4;
    customRender(
      <RecoilRoot
        initializeState={({ set }) =>
          set(userAccessLevelState, userAccessLevel)
        }
      >
        <CountriesTable />
      </RecoilRoot>
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    fireEvent.click(screen.getByTestId("confirm-delete"));

    await waitFor(() => expect(deleteCountry).toHaveBeenCalled());
  });

  it("navigates to the edit page when the edit button is clicked", async () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    const userAccessLevel = 4;
    customRender(
      <RecoilRoot
        initializeState={({ set }) =>
          set(userAccessLevelState, userAccessLevel)
        }
      >
        <CountriesTable />
      </RecoilRoot>
    );
    await waitFor(() => {
      expect(screen.getAllByTestId("edit-button").length).toBeGreaterThan(0);
    });

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/edit-country/1");
    });
  });
});
