// custom-react-notion-x.d.ts
declare module "react-notion-x" {
  import * as React from "react";

  export interface NotionRendererProps {
    recordMap: any;
    fullPage?: boolean;
    darkMode?: boolean;
    components?: any;
    hideBlockId?: string;
  }

  export class NotionRenderer extends React.Component<NotionRendererProps, any> {}
}

declare module "react-notion-x/build/third-party/collection" {
  import * as React from "react";
  export const Collection: React.ComponentType<any>;
  export const CollectionRow: React.ComponentType<any>;
}
