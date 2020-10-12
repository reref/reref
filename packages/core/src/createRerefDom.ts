import { Action, AnyAction, Store } from "redux";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RerefReact } from "./createReref";

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

export function createRerefDom<
    S = any,
    A extends Action = AnyAction,
    StateExt = never,
    Ext = {}
>() {
    const values = {
        useDebug: false as boolean,
        store: null as (Store<S & StateExt, A> & Ext) | null,
        root: null as Element | DocumentFragment | null,
        reactRoot: null as JSX.Element | null,
    };

    const useDebug = (use: boolean) => {
        values.useDebug = use;
    };
    const setStore = (store: Store<S & StateExt, A> & Ext) => {
        values.store = store;
    };
    const setRoot = (root: Element | DocumentFragment | null) => {
        values.root = root;
    };
    const setReactRoot = (reactRoot: JSX.Element) => {
        values.reactRoot = reactRoot;
    };

    const init = () => {
        let root = values.root;
        if (!root) {
            root = document.body.children[0];
        }
        if (!values.store) {
            throw new Error("store should not be null");
        }
        const store: Store<any, Action<any>> = values.store as any;
        const reactRoot = values.reactRoot;

        ReactDOM.render(
            React.createElement(
                Provider,
                { store },
                React.createElement(React.StrictMode, {}, reactRoot)
            ),
            root
        );
    };

    const rerefDom: RerefDom<S, A, StateExt, Ext> = {
        useDebug,
        setStore,
        setRoot,
        setReactRoot,
        init,
    };
    return rerefDom;
}
