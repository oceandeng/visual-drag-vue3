import { createStore } from "vuex";
import { modulePublic } from "./public";
import { moduleComponent } from "./component";
import { moduleCompose } from "./compose";
import { moduleSnapshot } from "./snapshot";
import { moduleContextmenu } from "./contextmenu";
import { moduleCopy } from "./copy";
import { moduleLock } from "./lock";
import { moduleLayer } from "./layer";
import { moduleAnimation } from "./animation";
import { moduleEvent } from "./event";

const store = createStore({
    modules: {
        public: modulePublic,
        component: moduleComponent,
        compose: moduleCompose,
        snapshot: moduleSnapshot,
        contextmenu: moduleContextmenu,
        copy: moduleCopy,
        lock: moduleLock,
        layer: moduleLayer,
        animation: moduleAnimation,
        event: moduleEvent,
    },
});

export default store;
