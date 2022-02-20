import {ICategory} from 'src/modules/Category/interfaces';
import {Region} from 'src/modules/Region/interfaces';
import {TagRecommendation} from 'src/modules/TagRecommendation/interfaces';

interface MemberPreferencesWage {
  /**
   * prefered wage currency
   */
  currency: string;

  /**
   * minimum wage prefered
   */
  min: number;

  /**
   * maximum wage prefered
   */
  max: number;

  /**
   * prefered wage unit (daily/monthly/by project)
   */
  unit: string;
}

export interface MemberPreferences {
  /**
   * whether show the feedbacks
   */
  showAvgFeedback: boolean;

  /**
   * member prefered industry/category
   */
  categories: Array<ICategory | ICategory['_id']>;

  /**
   * member prefered region
   */
  locations: Array<Region | Region['_id']>;

  /**
   * member tags
   */
  tags: Array<string | TagRecommendation>;

  /**
   * member prefered employment type
   */
  employmentTyps: Array<string>;

  /**
   * wage-related preference
   */
  wage: MemberPreferencesWage;
}
