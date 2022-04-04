import { createStore } from "vuex";
import { modulePublic } from "./public";
import { moduleComponent } from "./component";
import { moduleCompose } from "./compose";

const store = createStore({
    modules: {
        public: modulePublic,
        component: moduleComponent,
        compose: moduleCompose,
    },
});

export default store;
