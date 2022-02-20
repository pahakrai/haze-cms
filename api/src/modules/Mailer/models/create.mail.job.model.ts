import {Data} from 'ejs';

export class CreateMailJobModel {
  /**
   * mail receiver
   */
  to: string;

  /**
   * current user's workspace
   */
  workspace: string;

  /**
   * mail subject
   */
  subject: string;

  /**
   * template file of mail content
   */
  templateFile?: string;

  /**
   * template engine name e.g. hbs/ejs
   */
  teimplateEngine?: string;

  /**
   * data used with the mail template
   */
  data?: Data;

  /**
   * mail content in raw text
   */
  body?: string;
}
