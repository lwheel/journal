// node_modules/.pnpm/nanostores@0.10.3/node_modules/nanostores/clean-stores/index.js
var clean = Symbol("clean");

// node_modules/.pnpm/nanostores@0.10.3/node_modules/nanostores/atom/index.js
var listenerQueue = [];
var atom = (initialValue, level) => {
  let listeners = [];
  let $atom = {
    get() {
      if (!$atom.lc) {
        $atom.listen(() => {
        })();
      }
      return $atom.value;
    },
    l: level || 0,
    lc: 0,
    listen(listener, listenerLevel) {
      $atom.lc = listeners.push(listener, listenerLevel || $atom.l) / 2;
      return () => {
        let index = listeners.indexOf(listener);
        if (~index) {
          listeners.splice(index, 2);
          if (!--$atom.lc) $atom.off();
        }
      };
    },
    notify(oldValue, changedKey) {
      let runListenerQueue = !listenerQueue.length;
      for (let i = 0; i < listeners.length; i += 2) {
        listenerQueue.push(
          listeners[i],
          listeners[i + 1],
          $atom.value,
          oldValue,
          changedKey
        );
      }
      if (runListenerQueue) {
        for (let i = 0; i < listenerQueue.length; i += 5) {
          let skip;
          for (let j = i + 1; !skip && (j += 5) < listenerQueue.length; ) {
            if (listenerQueue[j] < listenerQueue[i + 1]) {
              skip = listenerQueue.push(
                listenerQueue[i],
                listenerQueue[i + 1],
                listenerQueue[i + 2],
                listenerQueue[i + 3],
                listenerQueue[i + 4]
              );
            }
          }
          if (!skip) {
            listenerQueue[i](
              listenerQueue[i + 2],
              listenerQueue[i + 3],
              listenerQueue[i + 4]
            );
          }
        }
        listenerQueue.length = 0;
      }
    },
    /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */
    off() {
    },
    set(newValue) {
      let oldValue = $atom.value;
      if (oldValue !== newValue) {
        $atom.value = newValue;
        $atom.notify(oldValue);
      }
    },
    subscribe(listener, listenerLevel) {
      let unbind = $atom.listen(listener, listenerLevel);
      listener($atom.value);
      return unbind;
    },
    value: initialValue
  };
  if (true) {
    $atom[clean] = () => {
      listeners = [];
      $atom.lc = 0;
      $atom.off();
    };
  }
  return $atom;
};

// node_modules/.pnpm/nanostores@0.10.3/node_modules/nanostores/lifecycle/index.js
var MOUNT = 5;
var UNMOUNT = 6;
var REVERT_MUTATION = 10;
var on = (object, listener, eventKey, mutateStore) => {
  object.events = object.events || {};
  if (!object.events[eventKey + REVERT_MUTATION]) {
    object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps) => {
      object.events[eventKey].reduceRight((event, l) => (l(event), event), {
        shared: {},
        ...eventProps
      });
    });
  }
  object.events[eventKey] = object.events[eventKey] || [];
  object.events[eventKey].push(listener);
  return () => {
    let currentListeners = object.events[eventKey];
    let index = currentListeners.indexOf(listener);
    currentListeners.splice(index, 1);
    if (!currentListeners.length) {
      delete object.events[eventKey];
      object.events[eventKey + REVERT_MUTATION]();
      delete object.events[eventKey + REVERT_MUTATION];
    }
  };
};
var STORE_UNMOUNT_DELAY = 1e3;
var onMount = ($store, initialize) => {
  let listener = (payload) => {
    let destroy = initialize(payload);
    if (destroy) $store.events[UNMOUNT].push(destroy);
  };
  return on($store, listener, MOUNT, (runListeners) => {
    let originListen = $store.listen;
    $store.listen = (...args) => {
      if (!$store.lc && !$store.active) {
        $store.active = true;
        runListeners();
      }
      return originListen(...args);
    };
    let originOff = $store.off;
    $store.events[UNMOUNT] = [];
    $store.off = () => {
      originOff();
      setTimeout(() => {
        if ($store.active && !$store.lc) {
          $store.active = false;
          for (let destroy of $store.events[UNMOUNT]) destroy();
          $store.events[UNMOUNT] = [];
        }
      }, STORE_UNMOUNT_DELAY);
    };
    if (true) {
      let originClean = $store[clean];
      $store[clean] = () => {
        for (let destroy of $store.events[UNMOUNT]) destroy();
        $store.events[UNMOUNT] = [];
        $store.active = false;
        originClean();
      };
    }
    return () => {
      $store.listen = originListen;
      $store.off = originOff;
    };
  });
};

// node_modules/.pnpm/nanostores@0.10.3/node_modules/nanostores/listen-keys/index.js
function listenKeys($store, keys, listener) {
  let keysSet = /* @__PURE__ */ new Set([...keys, void 0]);
  return $store.listen((value, oldValue, changed) => {
    if (keysSet.has(changed)) {
      listener(value, oldValue, changed);
    }
  });
}

export {
  atom,
  onMount,
  listenKeys
};
//# sourceMappingURL=chunk-CSY3BRXG.js.map
