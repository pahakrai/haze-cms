export interface SMSModuleOption {
  // enable SMS service or not
  enable: boolean;

  // enable controller endpoint [POST] sms/send
  enableController?: boolean;

  // SMS provider (later maybe not twilio)
  smsProvider: string;
}
