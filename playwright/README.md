# Playwright

End-to-end testing setup using Playwright framework.

## Files

- `inner-text.test.ts` - Test specifications
- `playwright.config.ts` - Playwright configuration
- `test.html` - Test HTML file

## Usage

```bash
pnpm install
# Ubuntu 26.04 LTS
PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64 pnpm exec playwright install
# Others
pnpm exec playwright install
pnpm test
```

WebKit のコミットを追っていると互換性を高めるための修正進んでいるみたい
https://github.com/WebKit/WebKit/commits/main/Source/WebCore/editing/TextIterator.cpp
WPT: https://wpt.fyi/results/html/dom/elements/the-innertext-and-outertext-properties
Bugs: [289597 – (innerText) ☂️ `innerText` interop issues and related bugs](https://bugs.webkit.org/show_bug.cgi?id=289597)

一部のケースはパスするようになっていた
