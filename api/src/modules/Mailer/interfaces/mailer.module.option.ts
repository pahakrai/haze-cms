export interface MailerModuleOption {
  // use queue to send mail job
  queueEnabled: boolean;

  // url for queue callback
  apiURL?: string;
}
