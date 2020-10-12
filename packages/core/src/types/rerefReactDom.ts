import { Action, AnyAction } from "redux";
import { RerefReact } from "./reref";

export interface RerefDom<
    S = any,
    A extends Action = AnyAction,
    StateExt = never,
    Ext = {}
> extends RerefReact<S, A, StateExt, Ext> {
    useDebug: (use: boolean) => void;
    setRoot: (root: Element | DocumentFragment | null) => void;
    setReactRoot: (reactRoot: JSX.Element) => void;
}
