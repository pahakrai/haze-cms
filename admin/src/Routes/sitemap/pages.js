import React from 'react'
import Common from '@golpasal/common'

import {
  AboutPage,
  ChangePassword,
  CalendarPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  LogoutPage,
  ResetPasswordPage,
  ResetPasswordTokenExpiredPage,
  SignUpConfirmExpiredPage,
  UserValidateStatusPage,
  ValidateUserByToken,
  VerifyCodePage,
  PostPage,
  PostFormPage,
  UserGroupFormPage,
  UserGroupPage,
  PolicyPage,
  PolicyFormPage,
  RegionPage,
  OrderFormPage,
  OrderPage,
  PageContentPage,
  PagePage,
  PageFormPage,
  PageSectionPage,
  PageSectionFormPage,
  NotificationSchedulePage,
  NotificationScheduleFormPage,
  UserNoticePage,
  PrivacyPolicyPage,
  SetPasswordPage,
  SendMailSuccessfullyPage,
  TagPage,
  TagFormPage,
  TagImageFormPage,
  CategoryPage,
  ProductFormPage,
  ProductPage,
  ProductImportPage,
  MyWorkspaceFormPage,
  WorkspacePage,
  WorkspaceFormPage,
  WorkspaceUserFormPage,
  WorkspaceContactFormPage,
  ProfilePage,
  ReportPage,
  ReportFormPage,
  SystemReportPage,
  ServicePage,
  ServiceFormPage,
  CouponFormPage,
  CouponPage,
  FileMetaPage,
  FileMetaFormPage,
  UserLevelPage,
  UserLevelFormPage,
  CourierPage,
  CourierFormPage,
  UserSchedulePermissionPage,
  MyWorkspacePaymentMethodFormPage,
  MyWorkspacePaymentMethodPage,
  SalesVolumeFormPage,
  SalesVolumePage,
  WorkspaceAppFormPage,
  WorkspaceAppPage,
  WorkspaceAppEditFormPage,
  WorkspaceAppCreateFormPage,
  CustomerEnquiryPage,
  WorkspaceSubscriptionPage,
  VerifyUserPage,
  SignUpPage,
  SignUpSendMailSuccessfullyPage,
  SignUpConfirmPage,
  ProductTypePage,
  ProductTypeFormPage,
  LoggedInOtherSessionPage,
  FeedbackPage
} from '../../Pages'
import { renderTypeUserPage } from '../../Pages/UserPage'
import {
  ErrorPage,
  PageNotFoundPage,
  UnauthorizedPage,
  ForbiddenPage
} from '../../Pages/Errors'

const { UserType, CategoryType } = Common.type

export default {
  HomePage,
  AboutPage,
  CalendarPage,
  UserNoticePage,
  PrivacyPolicyPage,
  OrderPage,
  ProfilePage,
  LoggedInOtherSessionPage,
  OrderFormPage,
  SendMailSuccessfullyPage,
  OrderFormEditPage: ({ match, ...props }) => (
    <OrderFormPage orderId={match.params.orderId} />
  ),
  PostPage,
  PostFormPage,
  PostFormEditPage: ({ match, ...props }) => (
    <PostFormPage postId={match.params.postId} />
  ),
  UserPage: renderTypeUserPage(UserType.USER),
  UserMemberPage: renderTypeUserPage(UserType.MEMBER),
  UserProviderPage: renderTypeUserPage(UserType.PROVIDER),
  UserSystemAdminPage: renderTypeUserPage(UserType.SYSTEM_ADMIN),
  UserGroupPage,
  UserGroupFormPage,
  UserGroupFormEditPage: ({ match, ...props }) => (
    <UserGroupFormPage userGroupId={match.params.userGroupId} />
  ),
  PolicyPage,
  PolicyFormPage: ({ match, ...props }) => (
    <PolicyFormPage policyId={match.params.policyId} />
  ),
  ProductFormPage: ({ match, ...props }) => (
    <ProductFormPage productId={match.params.productId} />
  ),
  ProductPage,
  ProductImportPage,
  RegionPage,
  PageFormPage,
  PageFormEditPage: ({ match, ...props }) => (
    <PageFormPage pageId={match.params.pageId} />
  ),
  PageContentEditPage: ({ match }) => (
    <PageContentPage pageId={match.params.pageId} />
  ),
  PageListPage: () => <PagePage isTemplate={false} />,
  PageTemplatesCreatePage: (props) => <PageFormPage isTemplate {...props} />,
  PageTemplatesEditPage: ({ match, ...props }) => (
    <PageFormPage isTemplate pageId={match.params.pageId} />
  ),
  PageTemplatesContentEditPage: ({ match }) => (
    <PageContentPage isTemplate pageId={match.params.pageId} />
  ),
  PageTemplatesPage: () => <PagePage isTemplate />,

  PageSectionCreatePage: (props) => (
    <PageSectionFormPage {...props} isSection isSeo={false} />
  ),
  PageSectionEditPage: ({ match, ...props }) => (
    <PageFormPage isSection isSeo={false} pageId={match.params.pageId} />
  ),
  PageSectionPage: () => <PageSectionPage isSection isSeo={false} />,
  PageSeoCreatePage: (props) => (
    <PageSectionFormPage {...props} isSeo isSection={false} />
  ),
  PageSeoEditPage: ({ match, ...props }) => (
    <PageFormPage isSeo isSection={false} pageId={match.params.pageId} />
  ),
  PageSeoPage: () => <PageSectionPage isSeo isSection={false} />,

  NotificationSchedulePage,
  NotificationScheduleFormPage,
  TagPage,
  TagFormPage: ({ match, ...props }) => (
    <TagFormPage text={match.params.text} />
  ),
  TagImageFormPage: ({ match, ...props }) => (
    <TagImageFormPage tagId={match.params._id} text={match.params.text} />
  ),
  NotificationScheduleFormEditPage: ({ match, location }) => (
    <NotificationScheduleFormPage id={match.params._id} />
  ),
  VerifyCodePage,
  LoginPage,
  ValidateUserByToken,
  UserValidateStatusPage,
  ResetPasswordTokenExpiredPage,
  SignUpConfirmExpiredPage,
  UnauthorizedPage,
  ForbiddenPage,
  ErrorPage,
  ChangePassword,
  ResetPasswordPage,
  ForgotPasswordPage,
  SignUpPage,
  SignUpSendMailSuccessfullyPage,
  SignUpConfirmPage,
  LogoutPage,
  PageNotFoundPage,
  VerifyUserPage,
  IndustryCategoryPage: ({ match, ...props }) => (
    <CategoryPage type={CategoryType.INDUSTRY} />
  ),
  SubjectCategoryPage: ({ match, ...props }) => (
    <CategoryPage type={CategoryType.SUBJECT} />
  ),
  MyWorkspaceFormPage,
  WorkspacePage,
  WorkspaceFormPage: ({ match, ...props }) => (
    <WorkspaceFormPage workspaceId={match.params.workspaceId} />
  ),
  WorkspaceEditFormPage: ({ match, ...props }) => (
    <WorkspaceFormPage workspaceId={match.params.workspaceId} />
  ),
  WorkspaceCreateContactFormPage: ({ match, ...props }) => (
    <WorkspaceContactFormPage workspaceId={match.params.workspaceId} />
  ),
  WorkspaceEditContactFormPage: ({ match, ...props }) => (
    <WorkspaceContactFormPage
      workspaceId={match.params.workspaceId}
      contactId={match.params.contactId}
    />
  ),
  WorkspaceUserFormPage: ({ match, ...props }) => (
    <WorkspaceUserFormPage workspaceCode={match.params.workspaceCode} />
  ),
  ReportPage,
  ReportFormPage: ({ match, ...props }) => (
    <ReportFormPage reportId={match.params.reportId} />
  ),
  SystemReportPage,
  ServicePage,
  ServiceFormPage: ({ match, ...props }) => (
    <ServiceFormPage serviceId={match.params.serviceId} />
  ),
  CouponPage,
  CouponFormPage: ({ match, ...props }) => (
    <CouponFormPage couponId={match.params.couponId} />
  ),
  FileMetaPage,
  FileMetaFormPage: ({ match, ...props }) => (
    <FileMetaFormPage fileMetaId={match.params.fileMetaId} />
  ),
  UserLevelPage,
  UserLevelFormPage: ({ match, ...props }) => (
    <UserLevelFormPage userLevelId={match.params.userLevelId} />
  ),
  SetPasswordPage,
  CourierPage,
  CourierFormPage,
  CourierEditFormPage: ({ match, ...props }) => (
    <CourierFormPage courierId={match.params.courierId} />
  ),
  UserSchedulePermissionPage,
  MyWorkspacePaymentMethodPage,
  MyWorkspacePaymentMethodFormPage,
  MyWorkspacePaymentMethodFormEditPage: ({ match, ...props }) => (
    <MyWorkspacePaymentMethodFormPage
      workspacePaymentMethodId={match.params.workspacePaymentMethodId}
    />
  ),
  SalesVolumePage,
  SalesVolumeFormPage,
  SalesVolumeFormEditPage: ({ match, ...props }) => (
    <SalesVolumeFormPage salesVolumeId={match.params.salesVolumeId} />
  ),
  WorkspaceAppPage,
  WorkspaceAppFormPage: ({ match, ...props }) => (
    <WorkspaceAppFormPage workspaceAppId={match.params.workspaceAppId} />
  ),
  WorkspaceAppEditFormPage: ({ match, ...props }) => (
    <WorkspaceAppEditFormPage editType={match.params.editType} />
  ),
  WorkspaceAppCreateFormPage,
  CustomerEnquiryPage,
  WorkspaceSubscriptionPage,
  ProductTypePage,
  ProductTypeFormPage,
  ProductTypeFormEditPage: ({ match, ...props }) => (
    <ProductTypeFormPage productTypeId={match.params.productTypeId} />
  ),
  FeedbackPage
}
