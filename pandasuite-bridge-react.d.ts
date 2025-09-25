declare module 'pandasuite-bridge-react' {
  import * as React from 'react';

  export interface Resource {
    id: string;
    path?: string;
    srcsets?: Record<string, string> | undefined;
    local: boolean;
    data?: unknown;
  }

  export type ResourcesMap = Record<string, Resource>;

  export interface Hooks {
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

  export interface BridgeState {
    properties?: { [key: string]: any };
    markers?: any[];
    resources?: ResourcesMap;
    triggeredMarker?: any;
  }

  export interface UsePandaBridgeReturn extends BridgeState {
    setProperty: (key: string, value: any) => void;
    setProperties: (properties: { [key: string]: any }) => void;
    setResources: (resources: any[]) => void;
    addActions: (
      handlers: { [key: string]: (...args: any[]) => void },
      replace?: boolean,
    ) => void;
  }

  export function usePandaBridge(hooks?: Hooks): UsePandaBridgeReturn;

  export const PandaBridgeRoot: React.FC<React.PropsWithChildren<unknown>>;

  export interface WrapperBridgeProps {
    markers?: Hooks['markers'];
    actions?: Hooks['actions'];
    synchronization?: Hooks['synchronization'];
    component?: Hooks['component'];
    children: (rest: UsePandaBridgeReturn) => React.ReactNode;
  }

  export const WrapperBridge: React.FC<WrapperBridgeProps>;

  export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    primary?: boolean;
  }
  export const Button: React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  >;

  export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    type?: 'info' | 'success' | 'warning' | 'danger';
  }
  export const Alert: React.ForwardRefExoticComponent<
    AlertProps & React.RefAttributes<HTMLDivElement>
  >;

  export interface CheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
  }
  export const Checkbox: React.ForwardRefExoticComponent<
    CheckboxProps & React.RefAttributes<HTMLInputElement>
  >;

  export interface DropdownProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {}
  export const Dropdown: React.ForwardRefExoticComponent<
    DropdownProps & React.RefAttributes<HTMLSelectElement>
  >;

  export interface DropdownItemProps
    extends React.OptionHTMLAttributes<HTMLOptionElement> {}
  export const DropdownItem: React.ForwardRefExoticComponent<
    DropdownItemProps & React.RefAttributes<HTMLOptionElement>
  >;

  export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}
  export const Input: React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  >;

  export interface TabProps {
    eventKey: string | number;
    title: React.ReactNode;
    children?: React.ReactNode;
  }
  export const Tab: React.FC<TabProps>;

  export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    activeKey?: string | number;
    onTabChange?: (eventKey: string | number | undefined) => void;
    children: React.ReactNode;
  }
  export const Tabs: React.FC<TabsProps>;

  export { WrapperBridge as default };
}
