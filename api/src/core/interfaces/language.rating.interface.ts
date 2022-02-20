import {Language} from '../../modules/Language/interfaces';

export interface LanguageRating {
  /**
   * language
   */
  language: Language | Language['_id'];

  /**
   * proficiency of that language
   */
  rating: number;
}
