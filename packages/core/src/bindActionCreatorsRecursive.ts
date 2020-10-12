import {
    Dispatch,
    AnyAction,
    ActionCreator,
    ActionCreatorsMapObject,
} from "redux";

function bindActionCreator<A extends AnyAction = AnyAction>(
    actionCreator: ActionCreator<A>,
    dispatch: Dispatch
) {
    let boundActionCreator = (...args: any[]) =>
        dispatch(actionCreator(...args));
    Reflect.defineProperty(boundActionCreator, "name", {
        writable: true,
        value: actionCreator.name,
    });
    return boundActionCreator;
}

/**
 * Turns recursively an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param actionCreator An object whose values are action
 * creator functions or other object with such values recursively. 
 * One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 * 
 * @param dispatch The `dispatch` function available on your Redux
 * store.
 * 
 * @returns The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */

export default function bindActionCreatorsRecursive<
    A,
    C extends ActionCreator<A>
>(actionCreator: C, dispatch: Dispatch): C;

export default function bindActionCreatorsRecursive<
    A extends ActionCreator<any>,
    B extends ActionCreator<any>
>(actionCreator: A, dispatch: Dispatch): B;

export default function bindActionCreatorsRecursive<
    A,
    M extends ActionCreatorsMapObject<A>
>(actionCreators: M, dispatch: Dispatch): M;
export default function bindActionCreatorsRecursive<
    M extends ActionCreatorsMapObject,
    N extends ActionCreatorsMapObject
>(actionCreators: M, dispatch: Dispatch): N;

export default function bindActionCreatorsRecursive(
    actionCreators: ActionCreator<any> | ActionCreatorsMapObject,
    dispatch: Dispatch
) {
    if (typeof actionCreators === "function") {
        return bindActionCreator(actionCreators, dispatch);
    }

    if (typeof actionCreators !== "object" || actionCreators === null) {
        throw new Error(
            `bindActionCreators expected an object or a function, instead received ${
                actionCreators === null ? "null" : typeof actionCreators
            }. ` +
                `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
        );
    }

    const boundActionCreators: ActionCreatorsMapObject<AnyAction> = {};
    for (const key of Object.keys(actionCreators)) {
        const actionCreator = actionCreators[key];
        if (
            ["function", "object"].indexOf(typeof actionCreator) >= 0 &&
            actionCreator
        ) {
            boundActionCreators[key] = bindActionCreatorsRecursive(
                actionCreator,
                dispatch
            );
        }
    }
    return boundActionCreators;
}
