declare module 'pandasuite-bridge-react' {
  import React from 'react';

  interface Hooks {
    markers?: {
      getSnapshotDataHook?: () => any;
      setSnapshotDataHook?: (pandaData: any) => void;
    };
    actions?: {
      [key: string]: (...args: any[]) => void;
    };
    synchronization?: {
      [key: string]: (args: any) => void;
    };
    component?: {
      getScreenshotHook?: (resultCallback: (result: any) => void) => void;
      onLanguageChanged?: (args: any) => void;
    };
  }

  interface BridgeState {
    properties?: { [key: string]: any };
    markers?: any[];
    resources?: { [key: string]: any };
    triggeredMarker?: any;
  }

  interface UsePandaBridgeReturn extends BridgeState {
    setProperty: (key: string, value: any) => void;
    setProperties: (properties: { [key: string]: any }) => void;
    setResources: (resources: any[]) => void;
    addActions: (
      h: { [key: string]: (...args: any[]) => void },
      replace?: boolean,
    ) => void;
  }

  export function usePandaBridge(hooks?: Hooks): UsePandaBridgeReturn;

  export const PandaBridgeRoot: React.FC;

  interface WrapperBridgeProps {
    markers?: {
      getSnapshotDataHook?: () => any;
      setSnapshotDataHook?: (pandaData: any) => void;
    };
    actions?: {
      [key: string]: (...args: any[]) => void;
    };
    synchronization?: {
      [key: string]: (args: any) => void;
    };
    component?: {
      getScreenshotHook?: (resultCallback: (result: any) => void) => void;
      onLanguageChanged?: (args: any) => void;
    };
    children: (rest: UsePandaBridgeReturn) => React.ReactNode;
  }

  const WrapperBridge: React.FC<WrapperBridgeProps>;

  export default WrapperBridge;
}
