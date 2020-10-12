import {
    Dispatch,
    Action,
    AnyAction,
    Reducer,
    Middleware,
    Store,
    createStore,
    StoreEnhancer,
    Unsubscribe,
} from "redux";
import {
    bindActionCreatorsRecursive,
    ActionCreatorsMapObjectRecursive,
} from "./bindActionCreatorsRecursive";

export interface AddReduxMiddleware<S = any, D extends Dispatch = Dispatch> {
    (middleware: Middleware<S, D>): void;
}

export interface RerefReact {
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
    setRerefReact: (rerefReact: RerefReact) => void;
    init: () => void;
}

const exportOnWindow = (obj: any) => {
    const keys = Object.keys(obj);
    for (let key of keys) {
        (window as any)[key] = obj[key];
    }
};

/**
 * Init a Reref application.
 */
export function createReref<
    S = any,
    A extends Action = AnyAction,
    StateExt = never,
    Ext = {},
    D extends Dispatch = Dispatch
>() {
    const values = {
        reducer: null as Reducer<S, A> | null,
        store: null as (Store<S & StateExt, A> & Ext) | null,
        middlewares: [] as Middleware<S, D>[],
        enhancer: null as StoreEnhancer<Ext, StateExt> | null,
        useDebug: false as boolean,
        unsubscribe: null as Unsubscribe | null,
        actionCreators: null as ActionCreatorsMapObjectRecursive<A> | null,
        rerefReact: null as RerefReact | null,
    };

    const useDebug: (use: boolean) => void = (use) => {
        values.useDebug = use;
    };

    const getStore: GetStore<S, A, StateExt, Ext> = () => {
        return values.store;
    };

    const addReduxMiddleware: AddReduxMiddleware<S, D> = (
        middleware: Middleware<S, D>
    ) => {
        values.middlewares.push(middleware);
    };

    const setReducer = (reducer: Reducer<S, A>) => {
        values.reducer = reducer;
    };

    const setActionCreators: (
        actionCreators: ActionCreatorsMapObjectRecursive<A>
    ) => void = (actionCreators) => {
        values.actionCreators = actionCreators;
    };

    const setEnhancer: (enhancer: StoreEnhancer<Ext, StateExt>) => void = (
        enhancer
    ) => {
        values.enhancer = enhancer;
    };

    const setRerefReact: (rerefReact: RerefReact) => void = (rerefReact) => {
        values.rerefReact = rerefReact;
    };

    const init = () => {
        const reducer: Reducer<S, A> = values.reducer as Reducer<S, A>;
        if (reducer === null) {
            throw new Error("reducer should not be null");
        }
        const { enhancer } = values;

        const store = createStore<S, A, Ext, StateExt>(
            reducer,
            enhancer ? enhancer : undefined
        );
        values.store = store;

        const dispatch: Dispatch<A> = <T extends A>(action: T) =>
            store.dispatch(action);
        const getState: () => S & StateExt = () => store.getState();

        if (values.useDebug) {
            exportOnWindow({ dispatch, getState });
            const actionCreators = values.actionCreators;
            if (actionCreators) {
                const action = bindActionCreatorsRecursive<A, A>(
                    actionCreators,
                    dispatch
                );
                exportOnWindow({ actionCreators, action });
            }
        }

        const unsubscribe = values.store.subscribe(() => {
            const state = getState();
            if (values.useDebug) {
                exportOnWindow({ state });
                console.log("state", state);
            }
        });
        values.unsubscribe = unsubscribe;
        const { rerefReact } = values;
        if (rerefReact) {
            rerefReact.init();
        }
    };

    const reref: Reref<S, A, StateExt, Ext, D> = {
        useDebug,
        getStore,
        addReduxMiddleware,
        setReducer,
        setActionCreators,
        setEnhancer,
        setRerefReact,
        init,
    };

    return reref;
}
