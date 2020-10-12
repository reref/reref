import { Action, AnyAction, Store } from "redux";
import { createElement, StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { RerefDom } from "./types/rerefReactDom";

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

        render(
            createElement(
                Provider,
                { store },
                createElement(StrictMode, {}, reactRoot)
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
