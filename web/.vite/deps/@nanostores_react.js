import {
  listenKeys
} from "./chunk-CSY3BRXG.js";
import {
  require_react
} from "./chunk-WQJA6ET6.js";
import {
  __toESM
} from "./chunk-5WRI5ZAA.js";

// node_modules/.pnpm/@nanostores+react@0.7.2_nanostores@0.10.3_react@18.3.1/node_modules/@nanostores/react/index.js
var import_react = __toESM(require_react());
function useStore(store, opts = {}) {
  let subscribe = (0, import_react.useCallback)(
    (onChange) => opts.keys ? listenKeys(store, opts.keys, onChange) : store.listen(onChange),
    [opts.keys, store]
  );
  let get = store.get.bind(store);
  return (0, import_react.useSyncExternalStore)(subscribe, get, get);
}
export {
  useStore
};
//# sourceMappingURL=@nanostores_react.js.map
