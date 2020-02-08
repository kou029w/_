/// <reference types="next" />
/// <reference types="next/types/global" />
declare module "@mdx-js/react" {
  const MDXContext: React.Context<any>;
  const MDXProvider: React.FC<{
    components: any;
    childlen?: ReactNode;
  }>;
}
