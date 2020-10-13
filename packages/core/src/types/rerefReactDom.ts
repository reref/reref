import { Action, AnyAction } from "redux";
import { RerefReact } from "./reref";

export type RerefReactDom<
    S = any,
    A extends Action = AnyAction,
    StateExt = never,
    Ext = {}
> = RerefReact<S, A, StateExt, Ext> & {
    setRoot: (root: Element | DocumentFragment | null) => void;
    setReactRootGenerator: (reactRootGenerator: () => JSX.Element) => void;
};
