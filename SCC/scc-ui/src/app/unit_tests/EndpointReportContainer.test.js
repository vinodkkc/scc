import i18n from "../../i18n/I18n";
import theme from "../../styles/theme";
import { MuiThemeProvider } from "@material-ui/core";
import { MemoryRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import { screen, render } from "@testing-library/react";
import EndpointReportContainer from "../containers/dashboard/EndpointReportContainer";
import AppRouter from "../containers/router/router";
import { mount } from 'enzyme';

describe('routes using memory router', () => {
    it('should show <EndpointReportContainer /> component for "/endpoint" route', () => {
        const component = mount(
            <MuiThemeProvider theme={theme}>
                <I18nextProvider i18n={i18n}>
                    <MemoryRouter initialEntries={["/endpoint"]}>
                        <AppRouter />
                    </MemoryRouter>
                </I18nextProvider>
            </MuiThemeProvider>
        );
        const endpointDashboardUrl = window._env_.REACT_APP_ENDPOINT_DASHBOARD_URL || process.env.REACT_APP_ENDPOINT_DASHBOARD_URL;
        expect(component.find(EndpointReportContainer)).toHaveLength(1)
        expect(component.find(EndpointReportContainer).find('iframe').exists()).toEqual(true);
        expect(component.find('iframe').props().src).toEqual(endpointDashboardUrl)
        expect(component.find('iframe').props().title).toEqual("Network")
    });
});
