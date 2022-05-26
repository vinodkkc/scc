import React from 'react';
import { mount } from 'enzyme';
import AppRouter from './router';
import { MemoryRouter } from 'react-router'
import {I18nextProvider} from 'react-i18next'
import i18n from '../../../i18n/I18n'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../../../styles/theme'
import NetworkReportContainer from '../dashboard/NetworkReportContainer';

describe('routes using memory router', () => {
  
    it('should show <NetworkReportContainer /> component for "/network" route', () => {
        const component = mount(
          <MuiThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <MemoryRouter initialEntries={["/network"]}>
                <AppRouter />
              </MemoryRouter>
            </I18nextProvider>
          </MuiThemeProvider> 
        );
        const networkDashboardUrl = window._env_.REACT_APP_NETWORK_DASHBOARD_URL || process.env.REACT_APP_NETWORK_DASHBOARD_URL;
        expect(component.find(NetworkReportContainer)).toHaveLength(1)
        expect(component.find(NetworkReportContainer).find('iframe').exists()).toEqual(true);
        expect(component.find(NetworkReportContainer).find('iframe').props().src).toEqual(networkDashboardUrl);
    });
});