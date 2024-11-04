import type { App } from 'vue';

function onPointerOver(this: Element) {
  this.classList.add('pointer-over');
}
function onPointerOut(this: Element) {
  this.classList.remove('pointer-over');
}
function onPointerDown(this: Element) {
  this.classList.add('pointer-down');
}
function onPointerUp(this: Element) {
  this.classList.remove('pointer-down');
}
function onPointerLeaveAndCancel(this: Element) {
  this.classList.remove('pointer-down');
  this.classList.remove('pointer-over');
}

function bindTap(el: Element) {
  el.classList.add('pointer-trigger');
  el.addEventListener('pointerover', onPointerOver);
  el.addEventListener('pointerout', onPointerOut);
  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointerup', onPointerUp);
  el.addEventListener('pointerleave', onPointerLeaveAndCancel);
  el.addEventListener('pointercancel', onPointerLeaveAndCancel);
}

function unbindTap(el: Element) {
  el.classList.remove('pointer-trigger');
  el.removeEventListener('pointerover', onPointerOver);
  el.removeEventListener('pointerout', onPointerOut);
  el.removeEventListener('pointerdown', onPointerDown);
  el.removeEventListener('pointerup', onPointerUp);
  el.removeEventListener('pointerleave', onPointerLeaveAndCancel);
  el.removeEventListener('pointercancel', onPointerLeaveAndCancel);
}

export const TapDirective = {
  mounted(el: Element) {
    bindTap(el);
  },
  beforeUnmount(el: Element) {
    unbindTap(el);
  },
};

export default {
  install(app: App) {
    app.directive('tap', TapDirective);
  },
};
