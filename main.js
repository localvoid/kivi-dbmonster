(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var INTERVAL = 0;
var DATABASE_COUNT = 100;

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');

var app = require('./app');
var Store = require('./store');
var Cache = require('./cache');
var Main = require('./component/main');

document.addEventListener('DOMContentLoaded', function() {
  kivi.init(new Scheduler());

  app.store = new Store(DATABASE_COUNT);
  app.cache = new Cache();

  setInterval(function() {
    kivi.action(function() {
      app.store.update();
    });
  }, INTERVAL);

  kivi.nextFrame().write(function() {
    kivi.vdom.injectComponent(kivi.vdom.createComponent(Main), document.body);
  });
});
},{"./app":7,"./cache":8,"./component/main":10,"./store":12,"kivi":4,"kivi/lib/scheduler":5}],2:[function(require,module,exports){
'use strict';

var ENV = require('./env');

function DNode(data) {
  if (data == null) {
    this.dirty = true;
    this.rev = -1;
    this.data = null;
  } else {
    this.dirty = false;
    this.rev = ENV.scheduler.dataClock;
    this.data = data;
  }
  this.data = data;
  this.deps = null;
  this.subs = null;
  this.invalidated = null;
  this.ctx = null;
}

DNode.create = function(data) {
  if (data === void 0) data = null;
  return new DNode(data);
};

DNode.prototype.reset = function() {
  var deps = this.deps;
  if (deps != null) {
    for (var i = 0; i < deps.length; i++) {
      var dSubs = deps[i].subs;
      dSubs[dSubs.indexOf(this)] = dSubs[dSubs.length - 1];
      dSubs.pop();
    }
  }

  this.deps = null;
};

DNode.prototype.sub = function(target) {
  if (this.deps == null) {
    this.deps = [];
  }
  this.deps.push(target);

  if (target.subs == null) {
    target.subs = [];
  }
  target.subs.push(this);
};

DNode.prototype.update = function(dirty) {
  if (dirty) this.rev = ENV.scheduler.dataClock;
  this.dirty = false;
};

DNode.prototype.commit = function() {
  this.rev = ENV.scheduler.dataClock;

  var subs = this.subs;
  if (subs != null) {
    for (var i = 0; i < subs.length; i++) {
      _invalidate(subs[i]);
    }
  }
};

function _invalidate(node) {
  if (!node.dirty) {
    node.dirty = true;

    if (node.invalidated != null) {
      node.invalidated.call(node.ctx, node);
    }

    var subs = node.subs;
    if (subs != null) {
      for (var i = 0; i < subs.length; i++) {
        _invalidate(subs[i]);
      }
    }

    node.deps = null;
    node.subs = null;
  }
}

module.exports = DNode;

},{"./env":3}],3:[function(require,module,exports){
'use strict';

var ENV = {
  scheduler: null
};

module.exports = ENV;

},{}],4:[function(require,module,exports){
'use strict';

var ENV = require('./env');
var DNode = require('./dnode');
var vdom = require('./vdom');

function init(scheduler) {
  ENV.scheduler = scheduler;
}

function nextFrame() {
  return ENV.scheduler.nextFrame();
}

function scheduleMicrotask(cb) {
  ENV.scheduler.scheduleMicrotask(cb);
}

function action(cb) {
  ENV.scheduler.action(cb);
}

module.exports = {
  ENV: ENV,
  DNode: DNode,
  vdom: vdom,
  init: init,
  nextFrame: nextFrame,
  scheduleMicrotask: scheduleMicrotask,
  action: action
};

},{"./dnode":2,"./env":3,"./vdom":6}],5:[function(require,module,exports){
'use strict';

function _MutationObserverScheduler(cb) {
  this._observer = new window.MutationObserver(cb);
  this._node = document.createTextNode('');
  this._observer.observe(this._node, {characterData: true});
}

_MutationObserverScheduler.prototype.requestNextTick = function() {
  this._toggle ^= 1;
  this._node.data = this._toggle;
};

var F_WRITE_PRIO = 4;
var F_WRITE = 8;
var F_READ = 16;
var F_AFTER = 32;
var F_WRITE_ANY = F_WRITE | F_WRITE_PRIO;

function Frame() {
  this.flags = 0|0;
  this.writeTaskGroups = [];
  this.writeTasks = null;
  this.readTasks = null;
  this.afterTasks = null;
}

Frame.prototype.write = function(cb, priority) {
  var group;

  if (priority === void 0) priority = -1;

  if (priority === -1) {
    this.flags |= F_WRITE;
    if (this.writeTasks == null) {
      this.writeTasks = [];
    }
    this.writeTasks.push(cb);
  } else {
    this.flags |= F_WRITE_PRIO;
    while (priority >= this.writeTaskGroups.length) {
      this.writeTaskGroups.push(null);
    }

    group = this.writeTaskGroups[priority];
    if (group == null) {
      group = this.writeTaskGroups[priority] = [];
    }

    group.push(cb);
  }
};

Frame.prototype.read = function(cb) {
  this.flags |= F_READ;
  if (this.readTasks == null) {
    this.readTasks = [];
  }
  this.readTasks.push(cb);
};

Frame.prototype.after = function(cb) {
  this.flags |= F_AFTER;
  if (this.afterTasks == null) {
    this.afterTasks = [];
  }
  this.afterTasks.push(cb);
};

var S_RUNNING = 1;
var S_MICROTASK_PENDING = 2;
var S_FRAMETASK_PENDING = 4;

function Scheduler() {
  this.flags = 0|0;
  this.dataClock = 0;
  this.clock = -1;

  this._actions = null;

  this._microtasks = null;
  this._currentFrame = new Frame();
  this._nextFrame = new Frame();

  var self = this;

  this._microtaskScheduler = new _MutationObserverScheduler(function() {
    self.flags &= ~S_MICROTASK_PENDING;
    self.flags |= S_RUNNING;
    self.clock++;

    var tasks = self._microtasks;
    if (tasks != null) {
      self._microtasks = null;

      for (var i = 0; i < tasks.length; i++) {
        tasks[i]();
      }
    }

    self.dataClock++;
    self.performActions();
    self.flags &= ~S_RUNNING;
  });

  this._handleAnimationFrame = function() {
    var frame;
    var groups;
    var group;
    var task;
    var i, j;

    self.flags &= ~S_FRAMETASK_PENDING;
    self.flags |= S_RUNNING;
    self.clock++;

    frame = self._nextFrame;
    self._nextFrame = self._currentFrame;
    self._currentFrame = frame;

    do {
      while ((frame.flags & F_WRITE_ANY) !== 0) {
        if ((frame.flags & F_WRITE_PRIO) !== 0) {
          frame.flags &= ~F_WRITE_PRIO;
          groups = frame.writeTaskGroups;

          for (i = 0; i < groups.length; i++) {
            group = groups[i];
            if (group != null) {
              groups[i] = null;
              for (j = 0; j < group.length; j++) {
                task = group[j];
                task();
              }
            }
          }
        }

        if ((frame.flags & F_WRITE) !== 0) {
          frame.flags &= ~F_WRITE;
          group = frame.writeTasks;
          for (i = 0; i < group.length; i++) {
            task = group[i];
            task();
          }
        }
      }

      while ((frame.flags & F_READ) !== 0) {
        frame.flags &= ~F_READ;
        group = frame.readTasks;
        frame.readTasks = null;

        for (i = 0; i < group.length; i++) {
          task = group[i];
          task();
        }
      }
    } while ((frame.flags & F_WRITE_ANY) !== 0);

    while ((frame.flags & F_AFTER) !== 0) {
      frame.flags &= ~F_AFTER;

      group = frame.afterTasks;
      for (i = 0; i < group.length; i++) {
        task = group[i];
        task();
      }
    }

    self.dataClock++;
    self.performActions();
    self.flags &= ~S_RUNNING;
  };
};

Scheduler.prototype.currentFrame = function() {
  return this._currentFrame;
};

Scheduler.prototype.nextFrame = function() {
  if ((this.flags & S_FRAMETASK_PENDING) === 0) {
    this.flags |= S_FRAMETASK_PENDING;
    window.requestAnimationFrame(this._handleAnimationFrame);
  }
  return this._nextFrame;
};

Scheduler.prototype.scheduleMicrotask = function(cb) {
  if ((this.flags & S_MICROTASK_PENDING) === 0) {
    this.flags |= S_MICROTASK_PENDING;
    this._microtaskScheduler.requestNextTick();
  }

  if (this._microtasks == null) {
    this._microtasks = [];
  }

  this._microtasks.push(cb);
};

Scheduler.prototype.action = function(cb) {
  if ((this.flags & S_MICROTASK_PENDING) === 0) {
    this.flags |= S_MICROTASK_PENDING;
    this._microtaskScheduler.requestNextTick();
  }

  if (this._actions == null) {
    this._actions = [];
  }

  this._actions.push(cb);
};

Scheduler.prototype.performActions = function() {
  while (this._actions != null) {
    var actions = this._actions;
    this._actions = null;
    for (var i = 0; i < actions.length; i++) {
      actions[i]();
    }
  }
};

module.exports = Scheduler;

},{}],6:[function(require,module,exports){
'use strict';

var DNode = require('./dnode');
var ENV = require('./env');

var V_TEXT = 1;
var V_ELEMENT = 2;
var V_CUSTOM_ELEMENT = 4;
var V_COMPONENT = 8;
var V_ROOT = 16;
var V_SVG = 64;

/**
 * Virtual Node.
 *
 * @param flags Flags.
 * @param key Key that should be unique among its siblings. If the key
 *   is null, it means that the key is implicit.
 * @param tag When the VNode is Element tag represents its tagName,
 *   and when VNode is a Component it is a ComponentFactory.
 * @param data
 * @constructor
 */
function VNode(flags, key, tag, data) {
  this.flags = flags;
  this.key = key;
  this.tag = tag;
  this.data = data;
  this.type = null;
  this.attrs = null;
  this.style = null;
  this.classes = null;
  this.children = null;
  this.ref = null;
  this.cref = null;
}

VNode.TEXT = V_TEXT;
VNode.ELEMENT = V_ELEMENT;
VNode.CUSTOM_ELEMENT = V_CUSTOM_ELEMENT;
VNode.COMPONENT = V_COMPONENT;
VNode.ROOT = V_ROOT;

function text(content) {
  return new VNode(V_TEXT, null, null, content);
};

function $text(key, content) {
  return new VNode(V_TEXT, key, null, content);
};

function element(tag) {
  return new VNode(V_ELEMENT, null, tag, null);
};

function $element(key, tag) {
  return new VNode(V_ELEMENT, key, tag, null);
};

function customElement(tag, data) {
  if (data === void 0) data = null;
  return new VNode(V_CUSTOM_ELEMENT, null, tag, data);
};

function $customElement(key, tag, data) {
  if (data === void 0) data = null;
  return new VNode(V_ELEMENT, key, tag, data);
};

function svg(tag) {
  return new VNode(V_ELEMENT | V_SVG, null, tag, null);
};

function $svg(key, tag) {
  return new VNode(V_ELEMENT | V_SVG, key, tag, null);
};

function component(descriptor, data) {
  if (data === void 0) data = null;
  return new VNode(V_COMPONENT, null, descriptor, data);
};

function $component(key, descriptor, data) {
  if (data === void 0) data = null;
  return new VNode(V_COMPONENT, key, descriptor, data);
};

function root() {
  return new VNode(V_ROOT, null, null, null);
};

/**
 * Checks if two VNodes have the same type and they can be updated.
 */
function sameType(a, b) {
  return (a.flags === b.flags && a.tag === b.tag);
}

/**
 * Create internal state of the VNode.
 */
function create(node, context) {
  var flags = node.flags;

  if ((flags & V_TEXT) !== 0) {
    node.ref = document.createTextNode(node.data);
  } else if ((flags & V_ELEMENT) !== 0) {
    if ((flags & V_SVG) === 0) {
      node.ref = document.createElement(node.tag);
    } else {
      node.ref = document.createElementNS('http://www.w3.org/2000/svg', node.tag);
    }
  } else if ((flags & V_CUSTOM_ELEMENT) !== 0) {
    node.ref = createElement(node.tag, node.data);
  } else if ((flags & V_COMPONENT) !== 0) {
    var component = createComponent(node.tag, node.data, context);
    node.ref = component.element;
    node.cref = component;
  }
};

/**
 * Render internal representation of the VNode.
 */
function render(node, context) {
  var i, il;
  var key;
  var flags = node.flags;

  if ((flags & (V_ELEMENT | V_CUSTOM_ELEMENT | V_COMPONENT | V_ROOT)) !== 0) {
    var ref = node.ref;
    var nodeType = node.type;
    var nodeAttrs = node.attrs;
    var nodeStyle = node.style;
    var nodeClasses = node.classes;
    var nodeChildren = node.children;

    if (nodeType != null) {
      ref.classList.add(nodeType);
    }

    if (nodeAttrs != null) {
      for (key in nodeAttrs) {
        ref.setAttribute(key, nodeAttrs[key]);
      }
    }

    if (nodeStyle != null) {
      var style = ref.style;

      for (key in nodeStyle) {
        style.setProperty(key, nodeStyle[key]);
      }
    }

    if (nodeClasses != null) {
      var classList = ref.classList;

      for (i = 0, il = nodeClasses.length; i < il; i++) {
        classList.add(nodeClasses[i]);
      }
    }

    if (nodeChildren != null) {
      for (i = 0, il = nodeChildren.length; i < il; i++) {
        insertChild(node, nodeChildren[i], null, context);
      }
    }

    if ((flags & V_COMPONENT) !== 0) {
      node.cref.update();
    }
  }
};

/**
 * Update VNode. When VNode a is updated with VNode b, VNode a should
 * be considered as destroyed, and any access to it is an undefined
 * behaviour.
 *
 * @param {!VNode} a Old VNode
 * @param {!VNode} b New VNode
 * @param {Context} context
 */
function update(a, b, context) {
  var ref = a.ref;
  var flags = a.flags;
  b.ref = ref;

  if ((flags & V_TEXT) !== 0) {
    if (a.data != b.data) {
      a.ref.nodeValue = b.data; // nodeValue
    }

  } else if ((flags & (V_ELEMENT | V_CUSTOM_ELEMENT | V_COMPONENT | V_ROOT)) !== 0) {
    // No need to update type class, because it should be immutable.

    if (a.attrs !== b.attrs) {
      updateAttrs(a.attrs, b.attrs, ref.attributes);
    }
    if (a.style !== b.style) {
      updateStyle(a.style, b.style, ref.style);
    }
    if (a.classes !== b.classes) {
      updateClasses(a.classes, b.classes, ref.classList);
    }
    if (a.children !== b.children) {
      updateChildren(a, a.children, b.children, context);
    }

    if ((flags & V_CUSTOM_ELEMENT) !== 0) {
      var descriptor = b.tag;
      if ((descriptor.flags & E_UPDATE_HOOK) !== 0) {
        descriptor.update.call(ref, a.data, b.data);
      }
    } else if ((flags & V_COMPONENT) !== 0) {
      var component = b.cref = a.cref;
      var state = component.state;

      component.updateProps(b.data);
      component.update();
    }
  }
};

/**
 * Update HTMLElement attributes.
 *
 * @param a Old attributes.
 * @param b New attributes.
 * @param attributes
 */
function updateAttrs(a, b, attributes) {
  var key;
  var aValue;
  var bValue;

  if (a != null) {
    if (b == null) {
      // b is empty, remove all attributes from a.
      for (key in a) {
        attributes.removeNamedItem(key);
      }
    } else {
      // Remove and update attributes.
      for (key in a) {
        bValue = b[key];
        if (bValue === void 0) {
          attributes.removeNamedItem(key);
        } else {
          aValue = a[key];
          if (aValue !== bValue) {
            attributes.setNamedItem(key, bValue);
          }
        }
      }

      // Insert new attributes.
      for (key in b) {
        aValue = a[key];
        if (aValue === void 0) {
          attributes.setNamedItem(key, aValue);
        }
      }
    }
  } else if (b != null) {
    // a is empty, insert all attributes from b.
    for (key in b) {
      attributes.setNamedItem(key, b[key]);
    }
  }
}

/**
 * Update HTMLElement styles.
 *
 * @param {Object.<string,string>} a Old style.
 * @param {Object.<string,string>} b New style.
 * @param {CSSStyleDeclaration} style
 */
function updateStyle(a, b, style) {
  var key;
  var value;

  if (a != null) {
    if (b == null) {
      // b is empty, remove all styles from a.
      for (key in a) {
        style.removeProperty(key);
      }
    } else {
      // Remove and update styles.
      for (key in a) {
        value = b[key];
        if (value === void 0) {
          style.removeProperty(key);
        } else {
          style.setProperty(key, value);
        }
      }

      // Insert new styles.
      for (key in b) {
        value = a[key];
        if (value === void 0) {
          style.setProperty(key, b[key]);
        }
      }
    }
  } else if (b != null) {
    // a is empty, insert all styles from b.
    for (key in b) {
      style.setProperty(key, b[key]);
    }
  }
}

/**
 * Update HTMLElement classes.
 *
 * @param {Array.<string>} a Old classes.
 * @param {Array.<string>} b New classes.
 * @param {DOMTokenList} classList
 */
function updateClasses(a, b, classList) {
  var i;
  var key;
  var aItem;
  var bItem;
  var aLength = a.length;
  var bLength = b.length;
  var visited;
  var removed;
  var bIndex;

  if (a != null && aLength > 0) {
    if (b == null || bLength === 0) {
      // b is empty, remove all classes from a.
      for (i = 0; i < aLength; i++) {
        classList.remove(a[i]);
      }
    } else {
      // When lists a and b are small, we are using naive O(M*N) algorithm
      // to find differences.
      if (aLength * bLength <= 16) {
        visited = new Array(bLength);

        for (i = 0; i < aLength; i++) {
          aItem = a[i];
          removed = true;

          for (i = 0; i < bLength; i++) {
            bItem = b[i];

            if (aItem === bItem) {
              removed = false;
              visited[i] = true;
              break;
            }
          }

          if (removed) {
            classList.remove(aItem);
          }
        }

        for (i = 0; i < bLength; i++) {
          if (visited[i] != true) {
            classList.add(b[i]);
          }
        }
      } else {
        bIndex = {};

        for (i = 0; i < bLength; i++) {
          bItem = b[i];
          bIndex[bItem] = false;
        }

        for (i = 0; i < aLength; i++) {
          aItem = a[i];
          if (aItem === void 0) {
            classList.remove(aItem);
          } else {
            bIndex[aItem] = true;
          }
        }

        for (i = 0; i < bLength; i++) {
          bItem = b[i];
          if (bIndex[bItem] === false) {
            classList.add(key);
          }
        }
      }
    }
  } else if (b != null && b.length > 0) {
    // a is empty, insert all classes from b.
    for (i = 0; i < b.length; i++) {
      classList.add(b[i]);
    }
  }
}

/**
 * Insert VNode.
 *
 * @param {VNode} parent Parent node.
 * @param {VNode} node Node to insert.
 * @param {HTMLElement} b Reference to the next html element.
 * @param {Context} context Current context.
 */
function insertChild(parent, node, nextRef, context) {
  if (((parent.flags & V_COMPONENT) === 0) ||
      ((parent.cref.flags & C_INSERT_HOOK) === 0)) {
    create(node, context);
    parent.ref.insertBefore(node.ref, nextRef);
    render(node, context);
  } else {
    parent.cref.descriptor.insert.call(parent.cref, node, nextRef, context);
  }
}

/**
 * Move VNode.
 *
 * @param {VNode} parent Parent node.
 * @param {VNode} node Node to move.
 * @param {HTMLElement} b Reference to the next html element.
 * @param {Context} context Current context.
 */
function moveChild(parent, node, nextRef, context) {
  if (((parent.flags & V_COMPONENT) === 0) ||
      ((parent.cref.flags & C_MOVE_HOOK) === 0)) {
    parent.ref.insertBefore(node.ref, nextRef);
  } else {
    parent.cref.descriptor.move.call(parent.cref, node, nextRef, context);
  }
}

/**
 * Remove VNode.
 *
 * @param {VNode} parent Parent node.
 * @param {VNode} node Node to remove.
 * @param {Context} context Current context.
 */
function removeChild(parent, node, context) {
  if (((parent.flags & V_COMPONENT) === 0) ||
      ((parent.cref.flags & C_REMOVE_HOOK) === 0)) {
    parent.ref.removeChild(node.ref);
  } else {
    parent.cref.descriptor.remove.call(parent.cref, node, context);
  }
}

/**
 * Update childrens [a] and [b] in the [parent].
 *
 * If one of the childrens has `null` `key`, it will run update
 * algorithm for childrens with implicit keys, otherwise it will run
 * update algorithm for childrens with explicit keys.
 *
 * Mixing childrens with explicit and implicit keys in one children
 * list will result in undefined behaviour. In development mode it
 * will be checked for this conditions and if it is detected that
 * there are childrens with implicit and explicit keys, it will result
 * in runtime error.
 *
 * @param {VNode} parent Childrens parent.
 * @param {Array.<VNode>} a Old children list.
 * @param {Array.<VNode>} b New children list.
 * @param {Context} context Current context.
 */
function updateChildren(parent, a, b, context) {
  var aNode;
  var bNode;
  var i;
  var unchangedPosition;

  if (a != null && a.length !== 0) {
    if (b == null || b.length === 0) {
      // b is empty, remove all children from a.
      for (i = 0; i < a.length; i++) {
        removeChild(parent, a[i], context);
      }
    } else {
      if (a.length === 1 && b.length === 1) {
        // Fast path when a and b have only one child.
        aNode = a[0];
        bNode = b[0];

        // Implicit key with same type or explicit key with same key.
        if ((aNode.key == null && sameType(aNode, bNode)) ||
            (aNode.key != null && aNode.key === bNode.key)) {
          update(aNode, bNode, context);
        } else {
          removeChild(parent, aNode, context);
          insertChild(parent, bNode, null, context);
        }
      } else if (a.length === 1) {
        // Fast path when a have 1 child.
        aNode = a[0];
        if (aNode.key == null) {
          updateImplicitChildren(parent, a, b, context);
        } else {
          unchangedPosition = -1;
          for (i = 0; i < b.length; i++) {
            bNode = b[i];
            if (aNode.key === bNode.key) {
              unchangedPosition = i;
              break;
            } else {
              insertChild(parent, bNode, aNode.ref, context);
            }
          }
          if (unchangedPosition !== -1) {
            for (i = unchangedPosition + 1; i < b.length; i++) {
              insertChild(parent, b[i], null, context);
            }
            update(aNode, b[unchangedPosition], context);
          } else {
            removeChild(parent, aNode, context);
          }
        }
      } else if (b.length === 1) {
        // Fast path when b have 1 child.
        bNode = b[0];
        if (bNode.key == null) {
          updateImplicitChildren(parent, a, b, context);
        } else {
          unchangedPosition = -1;
          for (i = 0; i < a.length; i++) {
            aNode = a[i];
            if (aNode.key === bNode.key) {
              unchangedPosition = i;
              break;
            } else {
              removeChild(parent, aNode, context);
            }
          }
          if (unchangedPosition !== -1) {
            for (i = unchangedPosition + 1; i < a.length; i++) {
              removeChild(parent, a[i], context);
            }
            update(a[unchangedPosition], bNode, context);
          } else {
            insertChild(parent, bNode, null, context);
          }
        }
      } else {
        // a and b have more than 1 child.
        if (a[0].key == null) {
          updateImplicitChildren(parent, a, b, context);
        } else {
          updateExplicitChildren(parent, a, b, context);
        }
      }
    }
  } else if (b != null && b.length > 0) {
    // a is empty, insert all children from b
    for (i = 0; i < b.length; i++) {
      insertChild(parent, b[i], null, context);
    }
  }
}

/**
 * Update childrens with implicit keys `a` and `b` in the `parent`.
 *
 * Any heuristics that is used in this algorithm is an undefined
 * behaviour, and external dependencies should not relay on the
 * knowledge about this algorithm, because it can be changed in any
 * time.
 *
 * @param {VNode} parent Childrens parent.
 * @param {Array.<VNode>} a Old children list.
 * @param {Array.<VNode>} b New children list.
 * @param {Context} context Current context.
 */
function updateImplicitChildren(parent, a, b, context) {
  var aStart = 0;
  var bStart = 0;
  var aEnd = a.length - 1;
  var bEnd = b.length - 1;
  var aNode;
  var bNode;
  var nextPos;
  var next;

  // Update nodes with the same type at the beginning.
  while (aStart <= aEnd && bStart <= bEnd) {
    aNode = a[aStart];
    bNode = b[bStart];

    if (!sameType(aNode, bNode)) {
      break;
    }

    aStart++;
    bStart++;

    update(aNode, bNode, context);
  }

  // Update nodes with the same type at the end.
  while (aStart <= aEnd && bStart <= bEnd) {
    aNode = a[aEnd];
    bNode = b[bEnd];

    if (!sameType(aNode, bNode)) {
      break;
    }

    aEnd--;
    bEnd--;

    update(aNode, bNode, context);
  }

  // Iterate through the remaining nodes and if they have the same
  // type, then update, otherwise just remove the old node and insert
  // the new one.
  while (aStart <= aEnd && bStart <= bEnd) {
    aNode = a[aStart++];
    bNode = b[bStart++];
    if (sameType(aNode, bNode)) {
      update(aNode, bNode, context);
    } else {
      insertChild(parent, bNode, aNode.ref, context);
      removeChild(parent, aNode, context);
    }
  }

  // All nodes from a are updated, insert the rest from b.
  while (aStart <= aEnd) {
    removeChild(parent, a[aStart++], context);
  }

  nextPos = bEnd + 1;
  next = nextPos < b.length ? b[nextPos].ref : null;

  // All nodes from b are updated, remove the rest from a.
  while (bStart <= bEnd) {
    insertChild(parent, b[bStart++], next, context);
  }
}

/**
 * Update childrens with explicit keys [a] and [b] in the [parent].
 *
 * @param {VNode} parent Childrens parent.
 * @param {Array.<VNode>} a Old children list.
 * @param {Array.<VNode>} b New children list.
 * @param {Context} context Current context.
 */
function updateExplicitChildren(parent, a, b, context) {
  var aStart = 0;
  var bStart = 0;
  var aEnd = a.length - 1;
  var bEnd = b.length - 1;
  var aStartNode = a[aStart];
  var bStartNode = b[bStart];
  var aEndNode = a[aEnd];
  var bEndNode = b[bEnd];
  var i;
  var j;
  var stop = false;
  var nextPos;
  var next;
  var aNode;
  var bNode;
  var lastTarget;
  var pos;
  var node;

  // Algorithm that works on simple cases with basic list
  // transformations.
  //
  // It tries to reduce the diff problem by simultaneously iterating
  // from the beginning and the end of both lists, if keys are the
  // same, they're updated, if node is moved from the beginnin to the
  // end of the current cursor positions or vice versa it just
  // performs move operation and continues to reduce the diff problem.
  outer: do {
    stop = true;

    // Update nodes with the same key at the beginning.
    while (aStartNode.key === bStartNode.key) {
      update(aStartNode, bStartNode, context);
      aStart++;
      bStart++;
      if (aStart > aEnd || bStart > bEnd) {
        break outer;
      }
      aStartNode = a[aStart];
      bStartNode = b[bStart];
      stop = false;
    }

    // Update nodes with the same key at the end.
    while (aEndNode.key === bEndNode.key) {
      update(aEndNode, bEndNode, context);
      aEnd--;
      bEnd--;
      if (aStart > aEnd || bStart > bEnd) {
        break outer;
      }
      aEndNode = a[aEnd];
      bEndNode = b[bEnd];
      stop = false;
    }

    // Move nodes from left to right.
    while (aStartNode.key === bEndNode.key) {
      update(aStartNode, bEndNode, context);
      nextPos = bEnd + 1;
      next = nextPos < b.length ? b[nextPos].ref : null;
      moveChild(parent, bEndNode, next, context);
      aStart++;
      bEnd--;
      if (aStart > aEnd || bStart > bEnd) {
        break outer;
      }
      aStartNode = a[aStart];
      bEndNode = b[bEnd];
      stop = false;
    }

    // Move nodes from right to end.
    while (aEndNode.key === bStartNode.key) {
      update(aEndNode, bStartNode, context);
      moveChild(parent, aEndNode, a[aStart].ref, context);
      aEnd--;
      bStart++;
      if (aStart > aEnd || bStart > bEnd) {
        break outer;
      }
      aEndNode = a[aEnd];
      bStartNode = b[bStart];
      stop = false;
    }
  } while (!stop && aStart <= aEnd && bStart <= bEnd);

  if (aStart > aEnd) {
    // All nodes from a are updated, insert the rest from b.
    nextPos = bEnd + 1;
    next = nextPos < b.length ? b[nextPos].ref : null;
    while (bStart <= bEnd) {
      insertChild(parent, b[bStart++], next, context);
    }
  } else if (bStart > bEnd) {
    // All nodes from b are updated, remove the rest from a.
    while (aStart <= aEnd) {
      removeChild(parent, a[aStart++], context);
    }
  } else {
    // Perform more complex update algorithm on the remaining nodes.
    //
    // We start by marking all nodes from b as inserted, then we try
    // to find all removed nodes and simultaneously perform updates on
    // the nodes that exists in both lists and replacing "inserted"
    // marks with the position of the node from the list b in list a.
    // Then we just need to perform slightly modified LIS algorith,
    // that ignores "inserted" marks and find common subsequence and
    // move all nodes that doesn't belong to this subsequence, or
    // insert if they have "inserted" mark.
    var aLength = aEnd - aStart + 1;
    var bLength = bEnd - bStart + 1;
    var sources = new Array(bLength);

    // Mark all nodes as inserted.
    for (i = 0; i < bLength; i++) {
      sources[i] = -1;
    }

    var moved = false;
    var removeOffset = 0;

    // When lists a and b are small, we are using naive O(M*N) algorithm
    // to find removed children.
    if (aLength * bLength <= 16) {
      for (i = aStart; i <= aEnd; i++) {
        var removed = true;
        aNode = a[i];
        for (j = bStart; j <= bEnd; j++) {
          bNode = b[j];
          if (aNode.key === bNode.key) {
            sources[j - bStart] = i;

            if (lastTarget > j) {
              moved = true;
            } else {
              lastTarget = j;
            }
            update(aNode, bNode, context);
            removed = false;
            break;
          }
        }
        if (removed) {
          removeChild(parent, aNode, context);
          removeOffset++;
        }
      }
    } else {
      var keyIndex = {};

      for (i = bStart; i <= bEnd; i++) {
        node = b[i];
        keyIndex[node.key] = i;
      }

      for (i = aStart; i <= aEnd; i++) {
        aNode = a[i];
        j = keyIndex[aNode.key];

        if (j != null) {
          bNode = b[j];
          sources[j - bStart] = i;
          if (lastTarget > j) {
            moved = true;
          } else {
            lastTarget = j;
          }
          update(aNode, bNode, context);
        } else {
          removeChild(parent, aNode, context);
          removeOffset++;
        }
      }
    }

    if (moved) {
      var seq = _lis(sources);
      // All modifications are performed from the right to left, so we
      // can use insertBefore method and use reference to the html
      // element from the next VNode. All Nodes from the right side
      // should always be in the correct state.
      j = seq.length - 1;
      for (i = bLength - 1; i >= 0; i--) {
        if (sources[i] === -1) {
          pos = i + bStart;
          node = b[pos];
          nextPos = pos + 1;
          next = nextPos < b.length ? b[nextPos].ref : null;
          insertChild(parent, node, next, context);
        } else {
          if (j < 0 || i != seq[j]) {
            pos = i + bStart;
            node = a[sources[i]];
            nextPos = pos + 1;
            next = nextPos < b.length ? b[nextPos].ref : null;
            moveChild(parent, node, next, context);
          } else {
            j--;
          }
        }
      }
    } else if (aLength - removeOffset != bLength) {
      for (i = bLength - 1; i >= 0; i--) {
        if (sources[i] === -1) {
          pos = i + bStart;
          node = b[pos];
          nextPos = pos + 1;
          next = nextPos < b.length ? b[nextPos].ref : null;
          insertChild(parent, node, next, context);
        }
      }
    }
  }
}

/**
 * Slightly modified Longest Increased Subsequence algorithm, it
 * ignores items that have -1 value. They're representing new items.
 *
 * This algorithm is used to find minimum number of move operations
 * when updating childrens with explicit keys.
 *
 * http://en.wikipedia.org/wiki/Longest_increasing_subsequence
 *
 * @param {Array.<number>} a
 * @return {Array.<number>}
 */
function _lis(a) {
  var p = a.slice(0);
  var result = [0];
  var i, il;
  var j;
  var u;
  var v;
  var c;

  for (i = 0, il = a.length; i < il; i++) {
    if (a[i] === -1) {
      continue;
    }

    j = result[result.length - 1];
    if (a[j] < a[i]) {
      p[i] = j;
      result.push(i);
      continue;
    }

    u = 0;
    v = result.length - 1;

    while (u < v) {
      c = ((u + v) / 2) | 0;
      if (a[result[c]] < a[i]) {
        u = c + 1;
      } else {
        v = c;
      }
    }

    if (a[i] < a[result[u]]) {
      if (u > 0) {
        p[i] = result[u - 1];
      }
      result[u] = i;
    }
  }

  u = result.length;
  v = result[u - 1];

  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }

  return result;
}

/**
 * Custom Elements
 */
var E_INIT_HOOK = 4;
var E_UPDATE_HOOK = 8;

function declareElement(spec) {
  var flags = 0;
  var tag = spec.tag;
  var init = spec.init;
  var update = spec.update;

  if (tag === void 0) tag = 'div';

  if (init === void 0) init = null;
  else flags |= E_INIT_HOOK;

  if (update === void 0) update = null;
  else flags |= E_UPDATE_HOOK;

  return {
    flags: flags,
    tag: tag,
    init: init,
    update: update
  };
}

function createElement(descriptor, data) {
  var e = document.createElement(descriptor.tag);
  if ((descriptor.flags & E_INIT_HOOK) !== 0) {
    descriptor.init.call(e, data);
  }
  return e;
}

function updateElement(element, descriptor, oldData, newData) {
  if ((descriptor.flags & E_UPDATE_HOOK) !== 0) {
    descriptor.update.call(element, oldData, newData);
  }
}

/**
 * Components
 */
var C_DIRTY = 1;
var C_STATEFUL = 2;
var C_DOM_ATTACHED = 4;
var C_RENDERED = 8;
var C_MOUNTED = 16;
var C_UPDATE_PROPS_HOOK = 128;
var C_UPDATE_STATE_HOOK = 256;
var C_INIT_HOOK = 512;
var C_BUILD_HOOK = 1024;
var C_ATTACHED_HOOK = 2048;
var C_DETACHED_HOOK = 4096;
var C_DOM_ATTACHED_HOOK = 8192;
var C_DOM_DETACHED_HOOK = 16384;
var C_UPDATE_HOOK = 65536;
var C_INSERT_HOOK = 262144;
var C_MOVE_HOOK = 524288;
var C_REMOVE_HOOK = 1048576;

/**
 * Component.
 *
 * @param {!Object} descriptor Component descriptor object.
 * @param {!Component} parent Parent component.
 * @param {Object} data Component data.
 * @final
 * @constructor
 * @struct
 */
function Component(descriptor, parent, props) {
  var flags = descriptor.flags;

  /**
   * Component flags.
   * @type {number}
   */
  this.flags = flags | C_DIRTY;

  /**
   * ComponentDescriptor.
   * @type {!Object}
   */
  this.descriptor = descriptor;

  /**
   * Depth relative to other Components.
   * @type {number}
   */
  this.depth = parent == null ? 0 : parent.depth + 1;

  /**
   * Parent Component.
   * @type {Component}
   */
  this.parent = parent;

  this.props = props;

  /**
   * Component State.
   * @type {!DNode}
   */
  if ((flags & C_UPDATE_STATE_HOOK) === 0) {
    this.state = null;
  } else {
    this.state = DNode.create();
    this.state.invalidated = this.invalidate;
    this.state.ctx = this;
  }

  this.rev = -1;

  /**
   * Root node in the Components virtual tree.
   * @type {VNode}
   */
  this.root = null;

  /**
   * Reference to the Html Element.
   * @type {HTMLElement}
   */
  this.element = document.createElement(descriptor.tag);

  /**
   * updateLater bound method.
   * @type {function(this:!Component)}
   */
  this._update = null;

  if ((flags & C_INIT_HOOK) !== 0) {
    descriptor.init.call(this);
  }
}

/**
 * Create Component Descriptor Object
 * @nosideeffects
 * @param {!Object} decl Component declaration
 * @return {!Object}
 */
function declareComponent(spec) {
  var flags = 0|0;
  var tag = spec.tag;
  var updateProps = spec.updateProps;
  var updateState = spec.updateState;
  var init = spec.init;
  var build = spec.build;
  var attached = spec.attached;
  var detached = spec.detached;
  var domAttached = spec.domAttached;
  var domDetached = spec.domDetached;
  var update = spec.update;
  var insert = spec.insert;
  var move = spec.move;
  var remove = spec.remove;

  if (tag === void 0) tag = 'div';

  if (updateProps === void 0) updateProps = null;
  else flags |= C_UPDATE_PROPS_HOOK;

  if (updateState === void 0) updateState = null;
  else flags |= C_STATEFUL | C_UPDATE_STATE_HOOK;

  if (init === void 0) init = null;
  else flags |= C_INIT_HOOK;

  if (build === void 0) build = null;
  else flags |= C_BUILD_HOOK;

  if (attached === void 0) attached = null;
  else flags |= C_ATTACHED_HOOK;

  if (detached === void 0) detached = null;
  else flags |= C_DETACHED_HOOK;

  if (domAttached === void 0) domAttached = null;
  else flags |= C_DOM_ATTACHED_HOOK;

  if (domDetached === void 0) domDetached = null;
  else flags |= C_DOM_DETACHED_HOOK;

  if (update === void 0) update = null;
  else flags |= C_UPDATE_HOOK;

  if (insert === void 0) insert = null;
  else flags |= C_INSERT_HOOK;

  if (move === void 0) move = null;
  else flags |= C_MOVE_HOOK;

  if (remove === void 0) remove = null;
  else flags |= C_REMOVE_HOOK;

  return {
    flags: flags,
    updateProps: updateProps,
    updateState: updateState,
    init: init,
    build: build,
    attached: attached,
    detached: detached,
    domAttached: domAttached,
    domDetached: domDetached,
    update: update,
    insert: insert,
    move: move,
    remove: remove,
    tag: tag
  };
};

function createComponent(descriptor, props, ctx) {
  return new Component(descriptor, ctx, props);
};

Component.prototype.domAttach = function() {};
Component.prototype.domDetach = function() {};
Component.prototype.attach = function() {};
Component.prototype.detach = function() {};

Component.prototype.updateProps = function(props) {
  if ((this.flags & C_UPDATE_PROPS_HOOK) !== 0) {
    if (this.descriptor.updateProps.call(this, props)) {
      this.flags |= C_DIRTY;
    }
  } else {
    // TODO: shallow equal check by default
    this.props = props;
    this.flags |= C_DIRTY;
  }
};

Component.prototype.update = function() {
  var flags = this.flags;

  if ((flags & C_DIRTY) !== 0) {
    var descriptor = this.descriptor;

    if ((flags & C_UPDATE_HOOK) === 0) {
      if ((flags & C_UPDATE_STATE_HOOK) !== 0) {
        descriptor.updateState.call(this);
        if (this.rev < this.state.rev) {
          this.updateView(descriptor.build.call(this));
        }
      } else {
        this.updateView(descriptor.build.call(this));
      }
      this.flags &= ~C_DIRTY;
    } else {
      descriptor.update.call(this);
    }
    this.rev = ENV.scheduler.clock;
  }
};

Component.prototype.updateView = function(newRoot) {
  var root = this.root;

  if (root == null) {
    newRoot.ref = this.element;
    newRoot.cref = this;
    render(newRoot, this);
  } else {
    update(root, newRoot, this);
  }
  this.root = newRoot;
};

Component.prototype.invalidate = function() {
  if ((this.flags & C_DIRTY) === 0) {
    this.flags |= C_DIRTY;
    if (this._update == null) {
      this._update = this.update.bind(this);
    }

    ENV.scheduler.nextFrame().write(this._update, this.depth);
  }
};

Component.prototype.dispose = function() {
  if ((this.flags & C_STATEFUL) !== 0) {
    this.state.dispose();
  }
};

function injectComponent(component, parent) {
  parent.appendChild(component.element);
  component.attach();
  component.domAttach();
  component.update();
};

module.exports = {
  VNode: VNode,
  Component: Component,
  declareElement: declareElement,
  declareComponent: declareComponent,
  create: create,
  render: render,
  update: update,
  createComponent: createComponent,
  t: text,
  $t: $text,
  e: element,
  $e: $element,
  d: customElement,
  $d: $customElement,
  s: svg,
  $s: $svg,
  c: component,
  $c: $component,
  r: root,
  injectComponent: injectComponent
};

},{"./dnode":2,"./env":3}],7:[function(require,module,exports){
'use strict';

var app = {
  store: null,
  cache: null
};

module.exports = app;

},{}],8:[function(require,module,exports){
'use strict';

var kivi = require('kivi');
var DNode = kivi.DNode;

var app = require('./app');

var DatabaseCache = function() {
  this._queries = {};
};

DatabaseCache.prototype.getTopFiveQueries = function(id) {
  var qs = this._queries[id];
  if (qs === void 0) {
    qs = DNode.create();
    this._queries[id] = qs;
  }

  if (qs.dirty) {
    var db = app.store.get(id);
    qs.sub(db);

    var queries = db.data.queries.slice();
    queries.sort(function(a, b) {
      return a.elapsed - b.elapsed;
    });
    queries = queries.slice(0, 5);
    while (queries.length < 5) {
      queries.push({
        canvas_action: null,
        canvas_context_id: null,
        canvas_controller: null,
        canvas_hostname: null,
        canvas_job_tag: null,
        canvas_pid: null,
        elapsed: 0,
        query: '',
        waiting: 0
      });
    }

    qs.data = queries;
    qs.update(true);
  }

  return qs;
};

module.exports = DatabaseCache;

},{"./app":7,"kivi":4}],9:[function(require,module,exports){
'use strict';

var kivi = require('kivi');
var vdom = kivi.vdom;

var app = require('../app');
var Popover = require('./popover');

function _formatElapsed(v) {
  if (!v) return '';

  var str = parseFloat(v).toFixed(2);

  if (v > 60) {
    var minutes = Math.floor(v / 60);
    var comps = (value % 60).toFixed(2).split('.');
    var seconds = comps[0].lpad('0', 2);
    var ms = comps[1];
    str = minutes + ":" + seconds + "." + ms;
  }

  return str;
}

var _IMPORTANT_CLASS = ['label-important'];
var _WARNING_CLASS = ['label-warning'];
var _SUCCESS_CLASS = ['label-success'];

var Entry = vdom.declareComponent({
  tag: 'tr',

  updateState: function() {
    var queries = app.cache.getTopFiveQueries(this.props.db.data.id);
    this.state.sub(queries);
    this.state.data = {
      topFiveQueries: queries.data
    };
    this.state.update(true);
  },

  build: function() {
    var db = this.props.db.data;
    var topFiveQueries = this.state.data.topFiveQueries;

    var name = vdom.e('td');
    name.type = 'dbname';
    name.children = [vdom.t(db.name)];

    var count = db.queries.length;

    var qcSpan = vdom.e('span');
    qcSpan.type = 'label';
    qcSpan.children = [vdom.t(count)];
    if (count >= 20) {
      qcSpan.classes = _IMPORTANT_CLASS;
    } else if (count >= 10) {
      qcSpan.classes = _WARNING_CLASS;
    } else {
      qcSpan.classes = _SUCCESS_CLASS;
    }

    var qc = vdom.e('td');
    qc.type = 'query-count';
    qc.children = [qcSpan];

    var children = [name, qc];

    for (var i = 0; i < 5; i++) {
      var q = topFiveQueries[i];
      var elapsed = q.elapsed;
      var text = vdom.t(_formatElapsed(elapsed));
      var popover = vdom.c(Popover, {query: q.query});

      var col = vdom.e('td');
      col.type = 'Query';
      col.classes = ['elapsed'];
      if (elapsed >= 10.0) {
        col.classes.push('warn_long');
      } else if (elapsed >= 1.0) {
        col.classes.push('warn');
      } else {
        col.classes.push('short');
      }
      col.children = [text, popover];
      children.push(col);
    }

    var root = vdom.r();
    root.children = children;
    return root;
  }
});

module.exports = Entry;
},{"../app":7,"./popover":11,"kivi":4}],10:[function(require,module,exports){
'use strict';

var kivi = require('kivi');
var vdom = kivi.vdom;

var app = require('../app');
var Entry = require('./entry');

var _ROOT_CLASSES = ['table', 'table-striped', 'latest-data'];

var Main = vdom.declareComponent({
  tag: 'table',

  updateState: function() {
    var dbs = app.store.getAll();
    this.state.sub(dbs);
    this.state.data = dbs.data;
    this.state.update(true);
  },

  build: function() {
    var dbs = this.state.data;

    var rows = [];
    for (var i = 0; i < dbs.length; i++) {
      var db = dbs[i];
      rows.push(vdom.$c(db.data.id, Entry, {db: db}));
    }

    var tbody = vdom.e('tbody');
    tbody.children = rows;

    var root = vdom.r();
    root.classes = _ROOT_CLASSES;
    root.children = [tbody];

    return root;
  }
});

module.exports = Main;

},{"../app":7,"./entry":9,"kivi":4}],11:[function(require,module,exports){
'use strict';

var kivi = require('kivi');
var vdom = kivi.vdom;

var _ROOT_CLASSES = ['popover', 'left'];

var Popover = vdom.declareComponent({
  build: function() {
    var content = vdom.e('div');
    content.type = 'popover-content';
    content.children = [vdom.t(this.props.query)];

    var arrow = vdom.e('div');
    arrow.type = 'arrow';

    var root = vdom.r();
    root.classes = _ROOT_CLASSES;
    root.children = [content, arrow];

    return root;
  }
});

module.exports = Popover;

},{"kivi":4}],12:[function(require,module,exports){
'use strict';

var kivi = require('kivi');
var DNode = kivi.DNode;

var _nextId = 0;

function DatabaseStore(n) {
  var dbs = [];

  for (var i = 0; i < n; i++) {
    dbs.push(DNode.create({
      id: _nextId++,
      name: 'cluster' + i,
      queries: null
    }));
    dbs.push(DNode.create({
      id: _nextId++,
      name: 'cluster' + i + 'slave',
      queries: null
    }));
  }

  this._dbs = DNode.create(dbs);
  this.update();
}

DatabaseStore.prototype.getAll = function() {
  return this._dbs;
};

DatabaseStore.prototype.get = function(id) {
  return this._dbs.data[id];
};

DatabaseStore.prototype.update = function() {
  var dbs = this._dbs.data;

  for (var i = 0; i < dbs.length; i++) {
    var db = dbs[i];

    var queries = [];

    var r = Math.floor((Math.random() * 10) + 1);
    for (var j = 0; j < r; j++) {
      var q = {
        canvas_action: null,
        canvas_context_id: null,
        canvas_controller: null,
        canvas_hostname: null,
        canvas_job_tag: null,
        canvas_pid: null,
        elapsed: Math.random() * 15,
        query: 'SELECT blah FROM something',
        waiting: Math.random() < 0.5
      };

      if (Math.random() < 0.2) {
        q.query = '<IDLE> in transaction';
      }

      if (Math.random() < 0.1) {
        q.query = 'vacuum';
      }

      queries.push(q);
    }
    db.data.queries = queries;
    db.commit();
  }
};

module.exports = DatabaseStore;
},{"kivi":4}]},{},[1])


//# sourceMappingURL=main.js.map