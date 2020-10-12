import { Action, AnyAction, Store } from "redux";
import { RerefReact } from "./reref";

export interface SetStore<
    S = any,
    A extends Action = AnyAction,
    StateExt = never,
    Ext = {}
> {
    (store: Store<S & StateExt, A> & Ext): void;
}

export interface RerefDom<
    S = any,
    A extends Action = AnyAction,
    StateExt = never,
    Ext = {}
> extends RerefReact {
    useDebug: (use: boolean) => void;
    setStore: SetStore<S, A, StateExt, Ext>;
    setRoot: (root: Element | DocumentFragment | null) => void;
    setReactRoot: (reactRoot: JSX.Element) => void;
    init: () => void;
}
