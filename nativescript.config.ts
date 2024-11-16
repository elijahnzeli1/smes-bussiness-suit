import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.smebusinesssuite',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    codeCache: true
  },
  cssParser: 'rework'
} as NativeScriptConfig;