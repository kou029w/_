use playwright::Playwright;

#[tokio::main]
async fn main() -> Result<(), playwright::Error> {
    let playwright = Playwright::initialize().await?;
    playwright.prepare()?;
    let chromium = playwright.chromium();
    let browser = chromium.launcher().launch().await?;
    let context = browser.context_builder().build().await?;
    let page = context.new_page().await?;
    page.goto_builder("https://example.com/").goto().await?;
    let s: String = page.eval("() => location.href").await?;
    println!("{}", s);
    page.click_builder("a").click().await?;
    let s: String = page.eval("() => location.href").await?;
    println!("{}", s);
    Ok(())
}
