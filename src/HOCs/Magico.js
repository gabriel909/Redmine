import React from "react";
import { Consumer } from "../Main";

export default HOCMagico = Component => props => (
    <Consumer>{
        ({ store, actions }) => (
            <Component {...props} store={store} actions={actions} />
        )}
    </Consumer>
);

