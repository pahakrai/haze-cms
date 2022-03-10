import React from 'react'

import { ToastProvider } from '../Lib/Toast'

import Router from './Router'
import Intl from './Intl'
import AntdLocaleProvider from './AntdLocaleProvider'
import ReduxProvider from './ReduxProvider'
import LoadingProvider from './LoadingProvider'
import ThemeProvider from './ThemeProvider'
import PersistorWrapper from './PersistorWrapper'
import Starter from './Starter'
import DocumentTitle from './DocumentTitle'
import DocumentFavicon from './DocumentFavicon'
import Metas from './Metas'
import GlobalStyle from './GlobalStyle'
import { QueryClientProvider, QueryClient } from 'react-query'

export const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <PersistorWrapper>
          <Intl>
            <AntdLocaleProvider>
              <Starter>
                <DocumentTitle title={'loading...'}>
                  <DocumentFavicon />
                  <Metas />
                  <ThemeProvider>
                    <ToastProvider>
                      <LoadingProvider />
                      <GlobalStyle />
                      <Router />
                    </ToastProvider>
                  </ThemeProvider>
                </DocumentTitle>
              </Starter>
            </AntdLocaleProvider>
          </Intl>
        </PersistorWrapper>
      </ReduxProvider>
    </QueryClientProvider>
  )
}

export default App
