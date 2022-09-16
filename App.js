import React from "react";
import Navigators from "./navigators/Navigator";
import { createStore, combineReducers } from "redux";
import Reducer from "./store/reducers/Reducer";
import { Provider } from "react-redux";

export default function App() {
  const rootReducer = combineReducers({
    reducer: Reducer,
  });
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <Navigators />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
