import { Action, AnyAction, Reducer } from "redux";

export type SubReducers<S = any, A extends Action = AnyAction> = {
    [name: string]: Reducer<S, A>;
};

export interface CreateReducerParam<S = any, A extends Action = AnyAction> {
    onAllAction: Reducer<S, A>;
    onNoAction: Reducer<S, A>;
    onStateChanged: Reducer<S, A>;
}

export interface CreateReducer<S = any, A extends Action = AnyAction> {
    (
        initialState: S,
        subReducers: SubReducers<S, A>,
        params: CreateReducerParam<S, A>
    ): Reducer<S, A>;
}
