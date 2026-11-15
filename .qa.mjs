export default async function run(page) {
  const r = {};
  r.title = await page.title();
  r.cards = await page.locator(".card").count();
  r.cats = await page.locator(".cat").count();
  r.stats = await page.locator(".hero-stats b").count();
  r.team = await page.locator(".member").count();
  // test filter
  await page.locator(".cat", { hasText: "Education" }).click();
  r.filtered = await page.locator(".card").count();
  await page.locator(".cat", { hasText: "All" }).click();
  // child page
  await page.locator('a.card[href="products/bharatham.html"]').click();
  await page.waitForLoadState("load");
  r.childUrl = page.url().split("/").pop();
  r.childH1 = await page.locator("h1").innerText();
  r.childStatus = (await page.locator(".status").count()) > 0;
  return r;
}
