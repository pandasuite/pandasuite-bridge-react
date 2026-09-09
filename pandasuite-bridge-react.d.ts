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

  /**
   * An action handler.
   *
   * With a `pandasuite-bridge` that implements correlated responses: when the
   * runtime calls an action whose result something consumes, the value the
   * handler returns — a value or a promise — is sent back as that action's
   * result; returning nothing acknowledges without a value, and throwing or
   * rejecting fails it. The library carries the correlation, so a handler never
   * sees the response key and never answers by hand, and registering two
   * handlers for the same action leaves the answer to the first one.
   *
   * With an earlier `pandasuite-bridge` — the peer range still admits one — a
   * returned value is discarded, as it always was.
   */
  export type ActionHandler = (...args: any[]) => any;

  export interface Hooks {
    markers?: {
      getSnapshotDataHook?: () => any;
      setSnapshotDataHook?: (pandaData: any) => void;
    };
    actions?: {
      [key: string]: ActionHandler;
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
    /**
     * Register action handlers imperatively. Without `replace`, a handler for a
     * name that already has one is **appended**, and the answer to an action
     * whose result is consumed goes to the handler registered first — the
     * earlier one, or the one from the `actions` hook map. Pass `replace` when
     * the new handler is meant to supersede it.
     */
    addActions: (
      handlers: { [key: string]: ActionHandler },
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
