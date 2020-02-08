/// <reference types="next" />
/// <reference types="next/types/global" />
declare module "@mdx-js/react" {
  let MDXProvider: React.FC<{
    components: any;
    childlen?: ReactNode;
  }>;
}
