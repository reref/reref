import {
    Dispatch,
    Action,
    AnyAction,
    Reducer,
    Middleware,
    Store,
    StoreEnhancer,
} from "redux";
import { ActionCreatorsMapObjectRecursive } from "../bindActionCreatorsRecursive";

export interface AddReduxMiddleware<S = any, D extends Dispatch = Dispatch> {
    (middleware: Middleware<S, D>): void;
}

export interface SetStore<
    S = any,
    A extends Action = AnyAction,
    StateExt = never,
    Ext = {}
> {
    (store: Store<S & StateExt, A> & Ext): void;
}

export interface RerefReact<
    S = any,
    A extends Action = AnyAction,
    StateExt = never,
    Ext = {}
> {
    setStore: SetStore<S, A, StateExt, Ext>;
    init: () => void;
}

export interface GetStore<
    S = any,
    A extends Action = AnyAction,
    StateExt = never,
    Ext = {}
> {
    (): (Store<S & StateExt, A> & Ext) | null;
}

export interface Reref<
    S = any,
    A extends Action = AnyAction,
    StateExt = never,
    Ext = {},
    D extends Dispatch = Dispatch
> {
    useDebug: (use: boolean) => void;
    getStore: GetStore<S, A, StateExt, Ext>;
    addReduxMiddleware: AddReduxMiddleware<S, D>;
    setReducer: (reducer: Reducer<S, A>) => void;
    setActionCreators: (
        actionCreators: ActionCreatorsMapObjectRecursive<A>
    ) => void;
    setEnhancer: (enhancer: StoreEnhancer<Ext, StateExt>) => void;
    setRerefReact: (rerefReact: RerefReact<S, A, StateExt, Ext>) => void;
    init: () => void;
}
