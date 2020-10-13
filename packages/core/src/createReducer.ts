import { Action, AnyAction, Reducer } from "redux";
import { CreateReducerParam, SubReducers } from "./types/createReducerTypes";

export default function createReducer<S = any, A extends Action = AnyAction>(
    initialState: S,
    subReducers: SubReducers<S, A>,
    params: CreateReducerParam<S, A>
): Reducer<S, A> {
    const onAllAction = params ? params.onAllAction : null;
    const onNoAction = params ? params.onNoAction : null;
    const onStateChanged = params ? params.onStateChanged : null;

    return (state: S | undefined, action: A) => {
        let stateChanged = false;
        if (!state) {
            state = initialState;
            stateChanged = true;
        }
        const subReducer = subReducers[action.type];
        if (subReducer) {
            state = subReducer(state, action);
            stateChanged = true;
        } else if (onNoAction) {
            state = onNoAction(state, action);
            stateChanged = true;
        }
        if (onAllAction) {
            state = onAllAction(state, action);
            stateChanged = true;
        }
        if (stateChanged && onStateChanged) {
            state = onStateChanged(state, action);
        }
        return state;
    };
}
