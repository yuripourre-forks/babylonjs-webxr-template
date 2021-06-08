import { Engine, WebXRSessionManager } from '@babylonjs/core';
import App from './App';

const XR_REQUIRED = false;

window.addEventListener('DOMContentLoaded', async () => {
  if (!Engine.isSupported()) {
    const div = <HTMLDivElement>document.getElementById('errorMessage');
    div.innerHTML = 'Your browser does not support WebGL';
    div.className = '';
    return;
  }

  const canvas = <HTMLCanvasElement>document.getElementById('root');
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
  });

  const supported = await WebXRSessionManager.IsSessionSupportedAsync('immersive-vr');
  if (!supported && XR_REQUIRED) {
    const div = <HTMLDivElement>document.getElementById('errorMessage');
    div.innerHTML = 'Failed to create virtual reality scene';
    div.className = '';
    return;
  }

  engine.enableOfflineSupport = false;

  window.addEventListener('resize', () => {
    engine.resize();
  });

  engine.resize();

  const app = new App(engine, canvas);

  const ret = await app.createScene();
  if (!ret) {
    const div = <HTMLDivElement>document.getElementById('errorMessage');
    div.innerHTML = app.error;
    div.className = '';
    return;
  }

  app.run();
});
