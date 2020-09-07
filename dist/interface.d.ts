declare type primitive = string | number | boolean | undefined | null;
declare type DeepReadonly<T> = T extends primitive ? T : DeepReadonlyObject<T>;
declare type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export interface IDomainEvent<P extends object = object, S extends object = object> {
    readonly id: string;
    readonly parent: string | null;
    readonly type: string;
    readonly params: DeepReadonly<P>;
    readonly errors: DeepReadonly<Error[]>;
    readonly createdAt: number;
    readonly initiatedAt: number | null;
    readonly executedAt: number | null;
    readonly completedAt: number | null;
    state: DeepReadonly<S>;
}
export declare type CreateDomainEventReturnType<T extends IDomainEvent> = Pick<T, keyof IDomainEvent>;
export declare type CreateDomainEventArgs<T extends IDomainEvent> = Pick<T, 'type' | 'params'>;
declare type PureActionReturnType = void | IDomainEvent[];
declare type ImpureActionReturnType = PureActionReturnType | Promise<PureActionReturnType>;
export interface IDomainHandler<T extends IDomainEvent> {
    initiate?: (event: T) => ImpureActionReturnType;
    execute?: (event: T, childEvents: IDomainEvent[]) => ImpureActionReturnType;
    complete?: (event: T, childEvents: IDomainEvent[]) => T['state'] | undefined;
}
export interface IDomainEventHooks {
    beforeInvoke?: <T extends IDomainEvent>(event: IDomainEvent) => void | Promise<void> | T | Promise<T>;
    afterInvoke?: (event: IDomainEvent) => void | Promise<void>;
    beforeInitiate?: <T extends IDomainEvent>(event: T) => void | Promise<void> | T | Promise<T>;
    afterInitiate?: <T extends IDomainEvent>(event: T) => void | Promise<void>;
    beforeExecute?: <T extends IDomainEvent>(event: T) => void | Promise<void> | T | Promise<T>;
    afterExecute?: <T extends IDomainEvent>(event: T) => void | Promise<void>;
    beforeComplete?: <T extends IDomainEvent>(event: T) => void | Promise<void> | T | Promise<T>;
    afterComplete?: <T extends IDomainEvent>(event: T) => void | Promise<void>;
}
export {};
