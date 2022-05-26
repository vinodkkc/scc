import DashboardContainer from "../containers/dashboard/home/DashboardContainer";
import i18n from "../../i18n/I18n";
import theme from "../../styles/theme";
import { MuiThemeProvider } from "@material-ui/core";
import { MemoryRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import { screen, render } from "@testing-library/react";

describe("Route testing for TilesData ", () => {
    it('Network Detection tile should render to "/network" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Network Detection" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/network");
      expect(screen.getByText("Network Detection")).toBeInTheDocument();
    }),
    it('Red-Blue Team Workbench tile should render to "/redBlueTeam" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Red-Blue Team Workbench" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/redBlueTeam");
      expect(screen.getByText("Red-Blue Team Workbench")).toBeInTheDocument();
    }),
    it('Endpoint Report tile should render to "/endpoint" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Endpoint Report" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/endpoint");
      expect(screen.getByText("Endpoint Report")).toBeInTheDocument();
    }),
    it('Threat Intelligence tile should render to "/threatReport" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Threat Intelligence" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/threatReport");
      expect(screen.getByText("Threat Intelligence")).toBeInTheDocument();
    }),
    it('Threat Hunting tile should render to "/threatHunting" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Threat Hunting" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/threatHunting");
      expect(screen.getByText("Threat Hunting")).toBeInTheDocument();
    }),
    it('Risk Management tile should render to "/riskManagement" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Risk Management" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/riskManagement");
      expect(screen.getByText("Risk Management")).toBeInTheDocument();
    }),
    it('Ticketing tile should render to "/ticketing" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Ticketing" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/ticketing");
      expect(screen.getByText("Ticketing")).toBeInTheDocument();
    }),
    it('Discovery and Asset Management tile should render to "/discoveryAndAssetManagement" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Discovery and Asset Management" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/discoveryAndAssetManagement");
      expect(screen.getByText("Discovery and Asset Management")).toBeInTheDocument();
    }),
    it('Simulations tile should render to "/simulations" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Simulations" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/simulations");
      expect(screen.getByText("Simulations")).toBeInTheDocument();
    }),
    it('Policy Management tile should render to "/policyManagement" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Policy Management" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/policyManagement");
      expect(screen.getByText("Policy Management")).toBeInTheDocument();
    }),
    it('Incident Response tile should render to "/incidentResponse" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Incident Response" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/incidentResponse");
      expect(screen.getByText("Incident Response")).toBeInTheDocument();
    }),
    it('Network Detection tile should render to "/network" route', () => {
      render(
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <DashboardContainer />
            </MemoryRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      );
      const link = screen.getByRole("link", { name: "Network Detection" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/network");
      expect(screen.getByText("Network Detection")).toBeInTheDocument();
    });
});
