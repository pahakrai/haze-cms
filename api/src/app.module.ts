import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer
} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {GraphQLModule} from '@nestjs/graphql';
import {getConnectionToken, MongooseModule} from '@nestjs/mongoose';

import {MongodbHelper, PaginatePlugin, CursorPaginatePlugin} from 'src/core';

// middleware
import {ACMiddleware} from './modules/Ac/ac.middleware';
import {LocaleMiddleware} from './core/middlewares/locale.middleware';

// global guards
import {AppAuthGuard} from './core/guards';

// app controller
import {AppController} from './app.controller';

// modules
import {ACModule} from './modules/Ac/ac.module';
import {AddressModule} from './modules/Address/address.module';
import {AuthModule} from './modules/Auth/auth.module';
import {AutoNumberModule} from './modules/AutoNumber/autoNumber.module';
import {AutoNumberTemplateModule} from './modules/AutoNumberTemplate/autoNumberTemplate.module';
import {AWSModule} from './modules/Aws/aws.module';
import {CacheEngine} from './modules/Cache/interfaces';
import {CacheModule} from './modules/Cache/cache.module';
import {CategoryModule} from './modules/Category/category.module';
import {CheckoutModule} from './modules/Checkout/checkout.module';
// import {ClaimModule} from './modules/Claim/claim.module';
import {CouponModule} from './modules/Coupon/coupon.module';
import {CurrencyModule} from './modules/Currency/currency.module';
import {CustomerEnquiryModule} from './modules/CustomerEnquiry/customerEnquiry.module';
import {DataMappingModule} from './modules/DataMapping/dataMapping.module';
import {DashboardModule} from './modules/Dashboard/dashboard.module';
import {DeviceLocationLogModule} from './modules/DeviceLocationLog';
import {DeviceModule} from './modules/Device/device.module';
// eslint-disable-next-line max-len
import {EnquiryModule} from './modules/Enquiry/enquiry.module';
import {FeedbackModule} from './modules/Feedback/feedback.module';
import {FileMetaModule, BlobModule} from './modules/File';
import {FollowerModule} from './modules/Follower/follower.module';
import {IamModule} from './modules/Iam/iam.module';
import {InvoiceModule} from './modules/Invoice/invoice.module';
import {LanguageModule} from './modules/Language/language.module';
import {MailerModule} from './modules/Mailer/mailer.module';
import {MemberModule} from './modules/Member/member.module';
import {NotificationModule} from './modules/Notification/notification.module';
import {NotificationScheduleModule} from './modules/NotificationSchedule/notificationSchedule.module';
import {OrderLogModule} from './modules/Order/submodules/OrderLog/orderLog.module';
import {OrderModule} from './modules/Order/order.module';
import {PageBaseModule} from './modules/Page/page.module';
import {ParamModule} from './modules/Param/param.module';
import {PaymentMethodModule} from './modules/PaymentMethod/paymentMethod.module';
import {PaymentModule} from './modules/Payment/payment.module';
import {PhoneRegionModule} from './modules/PhoneRegion/phoneRegion.module';
import {PostBaseModule} from './modules/Post/post.module';
import {ProductModule} from './modules/Product/product.module';
// eslint-disable-next-line max-len
import {ProductTypeModule} from './modules/Product/submodules/ProductType/productType.module';
// eslint-disable-next-line max-len
import {ProductReviewModule} from './modules/Product/submodules/ProductReview/productReview.module';
import {ProductSkuModule} from './modules/Product/submodules/ProductSku/productSku.module';
import {ProductSpecModule} from './modules/Product/submodules/ProductSpec/productSpec.module';
import {ProductWatchModule} from './modules/Product/submodules/ProductWatch/productWatch.module';
import {ProviderModule} from './modules/Provider/provider.module';
import {PushNotificationModule} from './modules/PushNotification/pushNotification.module';
import {QuotationModule} from './modules/Quotation/quotation.module';
// eslint-disable-next-line max-len
import {SalesVolumeModule} from './modules/SalesVolume/salesVolume.module';
import {ServiceModule} from './modules/Service/service.module';
import {ShoppingCartModule} from './modules/ShoppingCart/shoppingCart.module';
import {SMSModule} from './modules/Sms/sms.module';
import {SubscriptionPlanModule} from './modules/SubscriptionPlan/subscriptionPlan.module';
import {SystemReportModule} from './modules/SystemReport/systemReport.module';
import {TagImageModule} from './modules/TagImage/tagImage.module';
import {TagModule} from './modules/Tag/tag.module';
import {TagRecommendationModule} from './modules/TagRecommendation/tagRecommendation.module';
import {ThemeModule} from './modules/Theme/theme.module';
import {UserCreditModule} from './modules/UserCredit/userCredit.module';
import {UserLevelModule} from './modules/UserLevel/userLevel.module';
import {UserModule} from './modules/User/user.module';
import {UserNotificationModule} from './modules/UserNotification';
import {UserProfileModule} from './modules/UserProfile/userProfile.module';
// eslint-disable-next-line max-len
import {WebMenuModule} from './modules/WebMenu/webMenu.module';
// eslint-disable-next-line max-len
import {WorkspaceAppModule} from './modules/Workspace/submodules/WorkspaceApp/workspaceApp.module';
import {WorkspaceModule} from './modules/Workspace/workspace.module';
// eslint-disable-next-line max-len
import {WorkspacePaymentMethodModule} from './modules/Workspace/submodules/WorkspacePaymentMethod/workspacePaymentMethod.module';
// eslint-disable-next-line max-len
import {WorkspacePhoneRegionModule} from './modules/Workspace/submodules/WorkspacePhoneRegion/workspacePhoneRegion.module';
// eslint-disable-next-line max-len
import {WorkspacePriceTypeModule} from './modules/Workspace/submodules/WorkspacePriceType/workspacePriceType.module';
// eslint-disable-next-line max-len
import {WorkspaceSubscriptionInvoiceModule} from './modules/Workspace/submodules/WorkspaceSubscriptionInvoice/workspaceSubscriptionInvoice.module';
// eslint-disable-next-line max-len
import {WorkspaceSubscriptionModule} from './modules/Workspace/submodules/WorkspaceSubscription/workspaceSubscription.module';
import {WorkspaceTypeModule} from './modules/WorkspaceType/workspaceType.module';
import {GraphQLModuleFactory} from './core/graphql/factory';

@Module({
  imports: [
    // MongoDB connection
    MongooseModule.forRoot(
      MongodbHelper.getConnectionString({
        hosts: [
          process.env.MONGODB_HOST0,
          process.env.MONGODB_HOST1,
          process.env.MONGODB_HOST2
        ],
        port: parseInt(process.env.MONGODB_PORT, 10),
        dbName: process.env.MONGODB_DBNAME,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        isSRV: process.env.MONGODB_HOST_SRV === 'true',
        isSSL: process.env.MONGODB_OPTION_SSL === 'true'
      }),
      {
        // useCreateIndex: true,
        // useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectionName: 'Database',
        connectionFactory: connection => {
          // global plugin for mongoose
          // https://docs.nestjs.com/techniques/mongodb#plugins
          connection.plugin(PaginatePlugin);
          connection.plugin(CursorPaginatePlugin);

          return connection;
        }
      }
    ),
    // GraphQL setup
    GraphQLModule.forRootAsync({
      inject: [getConnectionToken('Database')],
      useFactory: GraphQLModuleFactory
    }),
    // global modules
    CacheModule.forRoot({
      url: process.env.CACHE_ENGINE_URL,
      engine: process.env.CACHE_ENGINE as CacheEngine,
      username: process.env.CACHE_AUTH_USERNAME,
      password: process.env.CACHE_AUTH_PASSWORD
    }),
    IamModule.forRoot(process.env.CRYPTO_KEY),
    AWSModule.forRoot({
      blobEngine: process.env.BLOB_ENGINE,
      blobUsername: process.env.BLOB_USERNAME,
      blobUploadImageFolder: process.env.BLOB_UPLOAD_IMAGE_FOLDER,
      queueName: process.env.QUEUE_NAME,
      queueEnable: process.env.QUEUE_ENABLE === 'true',
      cloudwatchEnable: process.env.CLOUDWATCH_ENABLE === 'true'
    }),
    MailerModule.forRoot({
      apiURL: `${process.env.HOST_API}${
        process.env.HOST_API_USE_PORT === 'true'
          ? `:${process.env.APP_PORT}`
          : ''
      }`,
      queueEnabled: process.env.QUEUE_ENABLE === 'true'
    }),
    SMSModule.forRoot({
      smsProvider: process.env.SMS_PROVIDER,
      enable: process.env.SMS_ENABLE === 'true'
    }),
    // modules in src/moudles
    ACModule,
    AddressModule,
    AuthModule,
    AutoNumberModule,
    AutoNumberTemplateModule,
    BlobModule,
    CategoryModule,
    CheckoutModule,
    CouponModule,
    CurrencyModule,
    CustomerEnquiryModule,
    DataMappingModule,
    DashboardModule,
    DeviceLocationLogModule,
    DeviceModule,
    EnquiryModule,
    FeedbackModule,
    FileMetaModule,
    FollowerModule,
    InvoiceModule,
    LanguageModule,
    MemberModule,
    NotificationModule,
    NotificationScheduleModule,
    OrderLogModule,
    OrderModule,
    PageBaseModule,
    ParamModule,
    PaymentMethodModule,
    PaymentModule,
    PhoneRegionModule,
    PostBaseModule,
    ProductModule,
    ProductTypeModule,
    ProductReviewModule,
    ProductSkuModule,
    ProductSpecModule,
    ProductWatchModule,
    ProviderModule,
    PushNotificationModule,
    QuotationModule,
    SalesVolumeModule,
    ServiceModule,
    ShoppingCartModule,
    SubscriptionPlanModule,
    SystemReportModule,
    TagImageModule,
    TagModule,
    TagRecommendationModule,
    ThemeModule,
    UserCreditModule,
    UserLevelModule,
    UserModule,
    UserNotificationModule,
    UserProfileModule,
    WebMenuModule,
    WorkspaceAppModule,
    WorkspaceModule,
    WorkspacePaymentMethodModule,
    WorkspacePhoneRegionModule,
    WorkspacePriceTypeModule,
    WorkspaceSubscriptionInvoiceModule,
    WorkspaceSubscriptionModule,
    WorkspaceTypeModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LocaleMiddleware).forRoutes('');
    consumer.apply(ACMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    });
  }
}
