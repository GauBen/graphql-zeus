import { Ops, ScalarCoders } from '@/TreeToTS/functions/new/mocks';
import { ScalarDefinition } from '@/TreeToTS/functions/new/types';

export type AllTypesPropsType = {
  [x: string]:
    | undefined
    | `scalar.${string}`
    | 'enum'
    | {
        [x: string]:
          | undefined
          | string
          | {
              [x: string]: string | undefined;
            };
      };
};

export type ReturnTypesType = {
  [x: string]:
    | {
        [x: string]: string | undefined;
      }
    | `scalar.${string}`
    | undefined;
};
export type InputValueType = {
  [x: string]: undefined | boolean | string | number | [any, undefined | boolean | InputValueType] | InputValueType;
};
export type VType =
  | undefined
  | boolean
  | string
  | number
  | [any, undefined | boolean | InputValueType]
  | InputValueType;

export type PlainType = boolean | number | string | null | undefined;
export type ZeusArgsType =
  | PlainType
  | {
      [x: string]: ZeusArgsType;
    }
  | Array<ZeusArgsType>;

export type Operations = Record<string, string>;

export type VariableDefinition = {
  [x: string]: unknown;
};

export const SEPARATOR = '|';

export type fetchOptions = Parameters<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (...args: infer R) => WebSocket ? R : never;
export type chainOptions = [fetchOptions[0], fetchOptions[1] & { websocket?: websocketOptions }] | [fetchOptions[0]];
export type FetchFunction = (query: string, variables?: Record<string, unknown>) => Promise<any>;
export type SubscriptionFunction = (query: string) => any;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;

export type OperationOptions = {
  operationName?: string;
};

export type ScalarCoder = Record<string, (s: unknown) => string>;

import { GraphQLError, type GraphQLErrorOptions } from 'graphql'; // keep

export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{ message: string } & GraphQLErrorOptions>;
}

export class ZeusError extends Error implements GraphQLResponse {
  name = 'ZeusError';
  public readonly data: Record<string, any> | undefined;
  public readonly errors: GraphQLError[] = [];
  constructor(public readonly response: GraphQLResponse) {
    super(
      response.errors && response.errors.length > 0
        ? `${response.errors.length} GraphQL error${response.errors.length > 1 ? 's' : ''}`
        : 'the response does not contain any errors',
    );
    if (response.errors && response.errors.length > 0) {
      this.errors = response.errors.map(({ message, ...options }) => new GraphQLError(message, options));
    }
  }
  toJSON() {
    return this.response;
  }
}

// TODO: remove in v6
export { ZeusError as GraphQLError };

export type GenericOperation<O> = O extends keyof typeof Ops ? typeof Ops[O] : never;
export type ThunderGraphQLOptions<SCLR extends ScalarDefinition> = {
  scalars?: SCLR | ScalarCoders;
};
