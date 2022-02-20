import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import ContentWrapper from './ContentWrapper';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import ErrorBoundary from './ErrorBoundary';

export default ({
  children,
  sitemap,
  breadcrumb = <Breadcrumb sitemap={sitemap} />
}) => (
  <ErrorBoundary>
    <LayoutWrapper>
      <Sidebar sitemap={sitemap} />
      <ContentWrapper>
        <Header />
        <Content id="main-view">
          {breadcrumb}
          {children}
        </Content>
        <Footer />
      </ContentWrapper>
    </LayoutWrapper>
  </ErrorBoundary>
);
