import * as t from 'io-ts';
import DRange from 'drange/types';
import { Dimension } from '../setops';

///////////////////////////////////////////////////////////////////////////////
//
// ---
//
///////////////////////////////////////////////////////////////////////////////
// createEnum() from https://github.com/gcanti/io-ts/issues/67
// tslint:disable-next-line:no-any
const createEnum = <E>(e: any, name: string): t.Type<E> => {
  // tslint:disable-next-line:no-any
  const keys: any = {};
  Object.keys(e).forEach(k => {
    keys[e[k]] = null;
  });
  // tslint:disable-next-line:no-any
  return t.keyof(keys, name) as any;
};

export enum ActionType {
  ALLOW = 'allow',
  DENY = 'deny',
}

// tslint:disable-next-line:variable-name
const ActionTypeType = createEnum<ActionType>(ActionType, 'ActionType');

const ruleSpecType = t.intersection([
  t.type({
    action: ActionTypeType,
    priority: t.number
  }),
  t.partial({
    sourceIp: t.string,
    sourePort: t.string,
    destIp: t.string,
    destPort: t.string,
    protocol: t.string
  })
]);

export type RuleSpec = t.TypeOf<typeof ruleSpecType>;

const ruleSpecSetType = t.type({
  rules: t.array(ruleSpecType)
});

export type RuleSpecSet = t.TypeOf<typeof ruleSpecSetType>;

export interface Rule {
  action: ActionType,
  priority: number,
  sourceIp?: DRange,
  sourcePort?: DRange,
  destIp?: DRange,
  destPort?: DRange,
  protocol?: DRange
}

export interface RuleDimensions {
  sourceIp: Dimension,
  sourcePort: Dimension,
  destIp: Dimension,
  destPort: Dimension,
  protocol: Dimension,
}
