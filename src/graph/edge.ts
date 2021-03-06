import {Disjunction} from '../setops';

import {AnyRuleSpec} from './types';

export interface Edge {
  from: string;
  to: string;
  routes: Disjunction<AnyRuleSpec>;
}
