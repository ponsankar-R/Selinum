window.MODULES=[
{t:`Selenium Introduction`,s:`What Selenium is, its components, and how it compares with other tools.`,
an:[`<b>The story used in every module:</b> <b>Selly</b>, a robot courier, delivers parcels inside <b>Selenium Mall</b>. The mall is your <b>website</b>, each shop is a <b>web element</b>, and Selly is <b>Selenium</b>.`,`Before Selly, human couriers (manual testers) walked the mall for every delivery, every day. Selly walks it the same way a human does, but faster, and never gets tired.`],
why:[`<b>What:</b> Selenium is an open-source suite that controls a real browser from code, using the W3C WebDriver protocol.`,`<b>Why:</b> a project releases every sprint, and a manual regression of 500 test cases takes days. Automated Selenium tests run on Chrome, Firefox and Edge in CI after every commit and report failures in minutes.`],
pts:[`<b>Selenium IDE:</b> browser extension to record and play back; good for quick prototypes, not for large frameworks.`,`<b>Selenium WebDriver:</b> the core API (Java, Python, C#, JS, Ruby) that talks to a browser driver. This is what the course uses.`,`<b>Selenium Grid:</b> runs tests in parallel on many machines and browsers (hub and nodes, or standalone).`,`<b>Selenium RC:</b> the old server-based tool, deprecated and replaced by WebDriver.`,`<b>Vs other tools:</b> Cypress is JavaScript only and runs inside the browser; Playwright is fast with built-in auto-wait; UFT is paid and uses VBScript; Appium automates mobile apps using the WebDriver protocol. Selenium wins on language choice, browser coverage and ecosystem; you bring your own test runner (TestNG/JUnit) and reporting.`,`<b>Selenium 4:</b> relative locators, new window/tab API, Chrome DevTools/BiDi support, and Selenium Manager that downloads drivers for you.`],
code:[`// Architecture in one line
// Test script (Java) -> Selenium client library -> browser driver -> real browser`],
tips:[`Selenium automates <b>web browsers only</b>. Desktop apps, captchas, barcodes and OTP are out of scope.`,`Commonly asked: difference between Selenium 3 and 4, and what Grid is for.`]},

{t:`Selenium Setup`,s:`JARs or Maven dependency, browser drivers, and IDE configuration.`,
an:[`Unboxing Selly. The <b>body</b> is the Selenium library (JARs). To enter each mall brand she needs the right <b>key card</b>: the <b>browser driver</b> for Chrome, Firefox or Edge. The <b>IDE</b> is her workshop where you program her.`],
why:[`<b>Why:</b> code cannot control a browser alone. The driver is a small program that translates Selenium commands into browser actions. A shared, Maven-based setup means every team member and the CI server get identical versions with one command.`],
pts:[`Install <b>JDK 11 or 17</b>, an IDE (IntelliJ IDEA or Eclipse) and a browser.`,`Create a <b>Maven project</b> and add <code>selenium-java</code> plus <code>testng</code> in <code>pom.xml</code>. Maven downloads all transitive JARs.`,`Without Maven: download the Selenium Java zip, then add all JARs through <i>Build Path &gt; Add External JARs</i>.`,`<b>Drivers:</b> chromedriver, geckodriver, msedgedriver. Since Selenium 4.6, <b>Selenium Manager</b> finds or downloads the matching driver automatically. Older code used <code>System.setProperty("webdriver.chrome.driver","path")</code>.`,`Driver version must match the browser version, otherwise you get <code>SessionNotCreatedException</code>.`],
code:[`<dependencies>
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.25.0</version> <!-- use the latest 4.x -->
  </dependency>
  <dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.10.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>`],
tips:[`Never commit driver binaries to Git; rely on Selenium Manager or WebDriverManager.`,`Check the Java version (<code>java -version</code>) when the IDE shows compile errors.`]},

{t:`WebDriver Basics`,s:`Launching a browser, navigation commands and browser commands.`,
an:[`Selly walks to the mall <b>entrance</b> (<code>get</code>), steps back or forward through corridors (<code>back/forward</code>), reads the <b>mall notice board</b> (<code>getTitle</code>), and finally leaves: closing one door (<code>close</code>) or switching off the whole mall visit (<code>quit</code>).`],
why:[`<b>What:</b> <code>WebDriver</code> is an interface; <code>ChromeDriver</code>, <code>FirefoxDriver</code> and <code>EdgeDriver</code> implement it. <b>Why:</b> coding to the interface lets you switch browsers by changing one line, which is how cross-browser testing is done in real projects.`],
pts:[`<code>WebDriver driver = new ChromeDriver();</code> opens a fresh browser session.`,`<b>Navigation:</b> <code>driver.get(url)</code> waits for page load; <code>navigate().to(url)</code>, <code>back()</code>, <code>forward()</code>, <code>refresh()</code> keep history.`,`<b>Browser commands:</b> <code>getTitle()</code>, <code>getCurrentUrl()</code>, <code>getPageSource()</code>, <code>getWindowHandle()</code>.`,`<b>Window:</b> <code>manage().window().maximize()</code>, <code>minimize()</code>, <code>fullscreen()</code>, <code>setSize(new Dimension(w,h))</code>.`,`<b>close()</b> closes the current window; <b>quit()</b> closes all windows and ends the session.`],
code:[`WebDriver driver = new ChromeDriver();
driver.manage().window().maximize();
driver.get("https://example.com/login");
System.out.println(driver.getTitle());
System.out.println(driver.getCurrentUrl());
driver.navigate().to("https://example.com/cart");
driver.navigate().back();
driver.navigate().refresh();
driver.quit();`],
tips:[`Always call <code>quit()</code> in <code>@AfterMethod</code>/<code>finally</code>; otherwise orphan browser processes pile up on CI.`,`Interview: <code>get()</code> vs <code>navigate().to()</code> (same result; navigate keeps history and offers back/forward).`]},

{t:`Locators in Selenium`,s:`ID, Name, ClassName, TagName, LinkText, PartialLinkText, XPath, CSS Selector.`,
an:[`Every shop in the mall needs an <b>address</b> so Selly can find it. <b>ID</b> = unique shop licence number. <b>Name</b> = shop name. <b>ClassName</b> = category sign (all "Cafe" shops). <b>TagName</b> = type of unit. <b>LinkText</b> = text on the signboard. <b>XPath</b> and <b>CSS</b> = detailed directions.`],
why:[`<b>What:</b> a locator tells Selenium which element on the DOM to act on. <b>Why:</b> every test step (type here, click there) starts with finding the right element; unstable locators are the number one reason automation suites break.`],
pts:[`<code>By.id("email")</code>: fastest and best when unique.`,`<code>By.name("q")</code>, <code>By.className("btn")</code> (single class only, no spaces), <code>By.tagName("a")</code>.`,`<code>By.linkText("Sign in")</code> and <code>By.partialLinkText("Sign")</code> work only on <code>&lt;a&gt;</code> tags.`,`<code>By.xpath(...)</code> and <code>By.cssSelector(...)</code> handle everything else.`,`<b>Priority:</b> id &gt; name &gt; CSS &gt; XPath &gt; others.`,`<code>findElement</code> returns the first match or throws <code>NoSuchElementException</code>; <code>findElements</code> returns a list (empty if none, no exception).`,`<b>Selenium 4 relative locators:</b> <code>with(By.tagName("input")).below(label)</code>, also <code>above, toLeftOf, toRightOf, near</code>.`],
code:[`WebElement email = driver.findElement(By.id("email"));
List<WebElement> links = driver.findElements(By.tagName("a"));
System.out.println("Links: " + links.size());
driver.findElement(By.linkText("Forgot password?")).click();
driver.findElement(By.cssSelector("input[name='q']")).sendKeys("shoes");`],
tips:[`Use <code>findElements().size()==0</code> to check that something is absent.`,`Do not use auto-generated absolute XPath from the browser; it breaks with any layout change.`]},

{t:`XPath & CSS`,s:`Absolute vs relative XPath, axes, dynamic XPath, CSS selectors.`,
an:[`<b>Absolute XPath</b> = directions from the main gate: "1st floor, 2nd lane, 3rd shop"; one new shop and Selly gets lost. <b>Relative XPath</b> = "the shop next to the Cafe". <b>Axes</b> = family-tree directions (parent, sibling, child). <b>Dynamic XPath</b> = shop room numbers change every week, so Selly looks for the signboard text instead. <b>CSS</b> is the short-hand version.`],
why:[`<b>Why:</b> real pages often lack IDs, or generate random ones like <code>btn_83921</code>. XPath and CSS let you describe an element by its attributes, text or position relative to stable neighbours.`],
pts:[`<b>Absolute:</b> <code>/html/body/div[2]/form/input</code>. Fragile. <b>Relative:</b> <code>//input[@id='email']</code>.`,`<b>Functions:</b> <code>contains(@class,'btn')</code>, <code>starts-with(@id,'user_')</code>, <code>text()='Login'</code>, <code>normalize-space()</code>; combine with <code>and</code>/<code>or</code>; index with <code>[1]</code>, <code>[last()]</code>.`,`<b>Axes:</b> <code>parent::</code>, <code>child::</code>, <code>ancestor::</code>, <code>descendant::</code>, <code>following-sibling::</code>, <code>preceding-sibling::</code>, <code>following::</code>.`,`<b>Dynamic XPath:</b> <code>//input[starts-with(@id,'user_')]</code> or build it in Java with a variable: <code>"//a[text()='"+name+"']"</code>.`,`<b>CSS:</b> <code>#id</code>, <code>.class</code>, <code>tag.class</code>, <code>[attr='v']</code>, <code>[attr^='st']</code> (starts), <code>[attr$='nd']</code> (ends), <code>[attr*='mid']</code> (contains), <code>parent &gt; child</code>, <code>ancestor descendant</code>, <code>li:nth-child(2)</code>.`,`CSS cannot select by text and cannot go up to a parent; XPath can.`],
code:[`// XPath
By.xpath("//button[normalize-space()='Add to cart']");
By.xpath("//td[text()='Phone']/following-sibling::td/button");
By.xpath("//label[text()='Email']/parent::div//input");
By.xpath("//input[starts-with(@id,'user_') and @type='text']");
// CSS
By.cssSelector("form#login input[type='password']");
By.cssSelector("ul.menu > li:nth-child(3) a");
By.cssSelector("a[href*='checkout']");`],
tips:[`Test locators in DevTools Console: <code>$x("//...")</code> for XPath and <code>$$("css")</code> for CSS.`,`Interview: XPath <code>//</code> vs <code>/</code>; <code>contains()</code> vs <code>starts-with()</code>; which is faster, CSS or XPath (CSS slightly, rarely matters).`]},

{t:`WebElement Actions`,s:`click(), sendKeys(), clear(), getText(), getAttribute() and friends.`,
an:[`Once Selly finds a shop she needs <b>hands and eyes</b>: press the doorbell (<code>click</code>), fill the delivery form (<code>sendKeys</code>), erase a wrong entry (<code>clear</code>), read the sign (<code>getText</code>), and read a small hidden tag on the door (<code>getAttribute</code>).`],
why:[`<b>What:</b> methods of the <code>WebElement</code> interface that simulate a user. <b>Why:</b> a login, search or checkout test is nothing but a sequence of these actions followed by reading results to assert them.`],
pts:[`<code>click()</code>, <code>submit()</code> (only inside a form).`,`<code>sendKeys("text")</code> types; <code>sendKeys(Keys.ENTER)</code> presses keys; on <code>&lt;input type=file&gt;</code> it uploads a file path.`,`<code>clear()</code> empties a field.`,`<code>getText()</code> returns <b>visible</b> text only. <code>getAttribute("value")</code> returns what is typed in an input. Newer versions also offer <code>getDomProperty()</code>.`,`<b>State checks:</b> <code>isDisplayed()</code>, <code>isEnabled()</code>, <code>isSelected()</code>; also <code>getTagName()</code>, <code>getCssValue("color")</code>, <code>getSize()</code>, <code>getLocation()</code>.`],
code:[`WebElement user = driver.findElement(By.id("username"));
user.clear();
user.sendKeys("selly@mall.com");
String typed = user.getAttribute("value");
WebElement btn = driver.findElement(By.id("login"));
if (btn.isDisplayed() && btn.isEnabled()) btn.click();
String msg = driver.findElement(By.cssSelector(".toast")).getText();
// upload
driver.findElement(By.id("file")).sendKeys("C:\\data\\invoice.pdf");`],
tips:[`<code>getText()</code> on a text box is empty; use <code>getAttribute("value")</code>.`,`Hidden elements return an empty <code>getText()</code>.`]},

{t:`Handling Web Elements`,s:`Buttons, text boxes, checkboxes, radio buttons and links in practice.`,
an:[`Each counter in the mall works differently: a <b>button</b> is a doorbell, a <b>text box</b> is a form line, a <b>checkbox</b> is a tick-list where many can be ticked, a <b>radio button</b> is a one-token choice box where picking one cancels the others.`],
why:[`<b>Why:</b> forms in real apps (registration, booking, checkout) mix all these controls. Knowing each one's behaviour prevents wrong clicks such as un-ticking a box you wanted ticked.`],
pts:[`<b>Text box:</b> <code>clear()</code> then <code>sendKeys()</code>.`,`<b>Checkbox:</b> check <code>isSelected()</code> before clicking, since a click toggles.`,`<b>Radio:</b> clicking selects it; clicking again does not deselect.`,`<b>Link or button:</b> <code>click()</code>. If it opens a new page, wait or assert the URL/title afterwards.`,`<b>Many similar elements:</b> use <code>findElements</code> and loop.`,`<b>Disabled elements</b> throw <code>ElementNotInteractableException</code>; check <code>isEnabled()</code>.`],
code:[`WebElement terms = driver.findElement(By.id("terms"));
if (!terms.isSelected()) terms.click();

List<WebElement> radios = driver.findElements(By.name("gender"));
for (WebElement r : radios)
  if (r.getAttribute("value").equals("female")) { r.click(); break; }

// tick all checkboxes
for (WebElement c : driver.findElements(By.cssSelector("input[type='checkbox']")))
  if (!c.isSelected()) c.click();`],
tips:[`Click the visible <code>&lt;label&gt;</code> when the real checkbox is hidden by custom styling.`,`Assert state after an action: <code>Assert.assertTrue(terms.isSelected())</code>.`]},

{t:`Dropdown Handling`,s:`Select class methods, single vs multi-select dropdowns.`,
an:[`A <b>vending machine</b> in the mall. Selly can choose by the <b>label</b> printed on the button, by its <b>code</b>, or by <b>position</b>. A <b>multi-select</b> is a combo tray where she can pick several items and remove some later.`],
why:[`<b>Why:</b> country, state, date and category fields are dropdowns. The <code>Select</code> class gives reliable, readable methods instead of clicking and guessing.`],
pts:[`Works only on real <code>&lt;select&gt;</code> tags: <code>new Select(element)</code>.`,`<b>Choose:</b> <code>selectByVisibleText</code>, <code>selectByValue</code>, <code>selectByIndex</code>.`,`<b>Read:</b> <code>getOptions()</code>, <code>getFirstSelectedOption()</code>, <code>getAllSelectedOptions()</code>, <code>isMultiple()</code>.`,`<b>Multi-select only:</b> <code>deselectAll()</code>, <code>deselectByVisibleText/Value/Index</code>. On a single select these throw <code>UnsupportedOperationException</code>.`,`<b>Custom dropdowns</b> (div/ul/li) are not <code>&lt;select&gt;</code>: click to open, then click the matching <code>li</code> found by text.`],
code:[`Select country = new Select(driver.findElement(By.id("country")));
country.selectByVisibleText("India");
country.selectByValue("IN");
country.selectByIndex(2);
for (WebElement o : country.getOptions()) System.out.println(o.getText());
System.out.println(country.getFirstSelectedOption().getText());

Select skills = new Select(driver.findElement(By.id("skills")));
if (skills.isMultiple()) { skills.selectByIndex(0); skills.selectByIndex(2); skills.deselectAll(); }

// custom dropdown
driver.findElement(By.id("city")).click();
driver.findElement(By.xpath("//ul[@id='list']/li[text()='Chennai']")).click();`],
tips:[`<code>NoSuchElementException</code> from <code>selectByVisibleText</code> usually means extra spaces or case mismatch in the text.`,`Interview: validate dropdown options are sorted by copying <code>getOptions()</code> texts into a list and comparing with a sorted copy.`]},

{t:`Wait Mechanisms`,s:`Implicit wait, explicit wait and fluent wait.`,
an:[`Shops open slowly. Selly could <b>wait N minutes at every door</b> (implicit), <b>wait for this particular shop to open</b> (explicit), or <b>check every 500 ms and ignore "not ready yet" notices</b> (fluent).`],
why:[`<b>What:</b> waits synchronise your script with the page. <b>Why:</b> modern pages load data via AJAX; Selenium is faster than the page, so without waits tests fail randomly (flaky tests), which wastes team time and destroys trust in automation.`],
pts:[`<b>Implicit:</b> set once; applies to every <code>findElement</code>; polls the DOM until the element exists or time runs out. Does not wait for clickability or text.`,`<b>Explicit:</b> <code>WebDriverWait</code> plus <code>ExpectedConditions</code>: <code>visibilityOfElementLocated</code>, <code>elementToBeClickable</code>, <code>presenceOfElementLocated</code>, <code>titleContains</code>, <code>alertIsPresent</code>, <code>invisibilityOfElementLocated</code>.`,`<b>Fluent:</b> an explicit wait with custom <code>pollingEvery</code> and <code>ignoring(Exception)</code>.`,`<b>Page load timeout:</b> <code>manage().timeouts().pageLoadTimeout(...)</code>.`,`<b>Avoid</b> <code>Thread.sleep()</code>: it always waits the full time.`,`Do not mix implicit and explicit waits; the combined timeout becomes unpredictable.`],
code:[`driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
WebElement pay = wait.until(ExpectedConditions.elementToBeClickable(By.id("pay")));
pay.click();

Wait<WebDriver> fluent = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class);
WebElement msg = fluent.until(d -> d.findElement(By.id("done")));`],
tips:[`Interview favourite: implicit vs explicit vs fluent. Answer: scope (global vs per element), conditions supported, and polling control.`,`<code>TimeoutException</code> means the condition never became true; check the locator or the condition.`]},

{t:`Alerts, Frames, Windows`,s:`JavaScript alerts, frame handling and window handles.`,
an:[`An <b>announcement speaker</b> blocks everything until Selly responds (alert). Some shops are <b>shops inside shops</b> (frames); she must step inside before she can see its items. Sometimes a click opens a <b>new mall branch</b> (new window or tab) and she must say which branch she is working in.`],
why:[`<b>Why:</b> payment gateways, ads, rich-text editors and "open in new tab" links all appear in real apps. Selenium only sees one context at a time, so without switching you get <code>NoSuchElementException</code> for elements that are plainly on screen.`],
pts:[`<b>Alert:</b> <code>driver.switchTo().alert()</code> gives <code>accept()</code>, <code>dismiss()</code>, <code>getText()</code>, <code>sendKeys()</code> (prompt). Types: simple, confirm, prompt. HTML popups are normal elements, not alerts.`,`<b>Frames:</b> <code>switchTo().frame(index | "nameOrId" | WebElement)</code>; <code>parentFrame()</code> goes up one level; <code>defaultContent()</code> returns to the page. For nested frames switch step by step.`,`<b>Windows:</b> <code>getWindowHandle()</code> is the current one; <code>getWindowHandles()</code> returns a <code>Set&lt;String&gt;</code>; <code>switchTo().window(handle)</code> moves.`,`<b>Selenium 4:</b> <code>switchTo().newWindow(WindowType.TAB)</code>.`],
code:[`// Alert
driver.findElement(By.id("delete")).click();
Alert a = new WebDriverWait(driver, Duration.ofSeconds(5)).until(ExpectedConditions.alertIsPresent());
System.out.println(a.getText());
a.accept();

// Frame
driver.switchTo().frame("payFrame");
driver.findElement(By.id("card")).sendKeys("4111111111111111");
driver.switchTo().defaultContent();

// Windows
String parent = driver.getWindowHandle();
driver.findElement(By.linkText("Terms")).click();
for (String h : driver.getWindowHandles())
  if (!h.equals(parent)) { driver.switchTo().window(h); break; }
driver.close();
driver.switchTo().window(parent);`],
tips:[`Always switch back to the parent window after <code>close()</code>; otherwise <code>NoSuchWindowException</code>.`,`<code>UnhandledAlertException</code> appears when an alert is open and you try another command.`]},

{t:`Advanced User Interactions`,s:`Actions class, mouse and keyboard events, drag and drop.`,
an:[`Some deliveries need <b>complex moves</b>: hover over a display so a drawer slides out (mouse hover), double-tap a button, right-click a menu, drag a trolley to the loading bay (drag and drop), or hold Shift while pressing keys.`],
why:[`<b>What:</b> the <code>Actions</code> class builds a chain of low-level input events. <b>Why:</b> menus that open on hover, sliders, canvas boards, kanban drag-and-drop and keyboard shortcuts cannot be done with plain <code>click()</code>.`],
pts:[`Create: <code>Actions act = new Actions(driver);</code> then chain and finish with <code>.build().perform()</code> (or just <code>.perform()</code>).`,`<b>Mouse:</b> <code>moveToElement</code>, <code>click</code>, <code>doubleClick</code>, <code>contextClick</code>, <code>clickAndHold</code>, <code>release</code>, <code>dragAndDrop(src,target)</code>, <code>dragAndDropBy(el,x,y)</code>, <code>moveByOffset</code>.`,`<b>Keyboard:</b> <code>sendKeys</code>, <code>keyDown(Keys.SHIFT)</code>, <code>keyUp(...)</code>; Ctrl+A / Ctrl+C using <code>Keys.CONTROL</code>.`,`<b>Selenium 4:</b> <code>scrollToElement</code>, <code>scrollByAmount</code>.`],
code:[`Actions act = new Actions(driver);
act.moveToElement(driver.findElement(By.id("menu"))).perform();
driver.findElement(By.linkText("Sub item")).click();

act.doubleClick(driver.findElement(By.id("dbl"))).perform();
act.contextClick(driver.findElement(By.id("area"))).perform();

WebElement src = driver.findElement(By.id("drag"));
WebElement dst = driver.findElement(By.id("drop"));
act.dragAndDrop(src, dst).perform();
// fallback if dragAndDrop fails
act.clickAndHold(src).moveToElement(dst).release().perform();

act.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL).perform();`],
tips:[`Forgetting <code>perform()</code> is the classic bug: nothing happens.`,`HTML5 drag-and-drop sometimes needs JavaScript; see the next module.`]},

{t:`JavaScriptExecutor`,s:`Scroll, click via JS, handling hidden elements.`,
an:[`When the normal route is blocked (a banner covers the door, or the shop is hidden), Selly uses the <b>staff-only service lift</b>: she talks directly to the mall's control panel (the browser's JavaScript engine) and says "scroll there" or "press that button for me".`],
why:[`<b>Why:</b> some actions have no Selenium method, or the element is covered or hidden (<code>ElementClickInterceptedException</code>, read-only date pickers, lazy-loaded pages). JS lets you work around them, mostly as a last resort.`],
pts:[`Cast: <code>JavascriptExecutor js = (JavascriptExecutor) driver;</code>.`,`<code>js.executeScript("script", args)</code>; elements are passed as <code>arguments[0]</code>; the return value is available.`,`<b>Scroll:</b> <code>window.scrollBy(0,500)</code>, <code>window.scrollTo(0,document.body.scrollHeight)</code>, <code>arguments[0].scrollIntoView(true)</code>.`,`<b>Click:</b> <code>arguments[0].click()</code> ignores overlays.`,`<b>Set value:</b> <code>arguments[0].value='2025-01-31'</code> for read-only date inputs.`,`Also: read <code>document.title</code>, <code>document.readyState</code>, highlight elements by changing <code>style.border</code>.`],
code:[`JavascriptExecutor js = (JavascriptExecutor) driver;
WebElement footer = driver.findElement(By.id("footer"));
js.executeScript("arguments[0].scrollIntoView(true);", footer);
js.executeScript("window.scrollTo(0, document.body.scrollHeight)");

WebElement hidden = driver.findElement(By.id("hiddenBtn"));
js.executeScript("arguments[0].click();", hidden);

WebElement date = driver.findElement(By.id("dob"));
js.executeScript("arguments[0].value='1995-08-15';", date);

String state = (String) js.executeScript("return document.readyState");`],
tips:[`JS click bypasses real-user checks, so it can hide genuine UI bugs. Prefer normal <code>click()</code> first.`,`Interview: when would you use JavascriptExecutor? Hidden/covered elements, scrolling, setting values, and page info.`]},

{t:`Handling Web Tables`,s:`Static and dynamic tables, row and column traversal.`,
an:[`The mall's <b>notice board</b> lists every shop in rows and columns. Selly reads it by rows (one shop), by columns (all prices), or finds one shop by name and reads the cell next to it. If the board grows during the day, that is a <b>dynamic table</b>.`],
why:[`<b>Why:</b> orders, users, invoices and reports are shown in tables. Tests must verify counts, totals, sorting and row-specific actions such as "click Edit on the row where Name is Ravi".`],
pts:[`Structure: <code>table &gt; thead/tbody &gt; tr &gt; th/td</code>.`,`<b>Static:</b> fixed XPath such as <code>//table[@id='t']/tbody/tr[2]/td[3]</code>.`,`<b>Dynamic:</b> count rows with <code>findElements(By.xpath("//table[@id='t']//tr"))</code> and loop; never hard-code the row count.`,`<b>Find by content:</b> <code>//td[text()='Ravi']/following-sibling::td[2]</code> or <code>//tr[td[text()='Ravi']]//button</code>.`,`<b>Columns:</b> <code>//table[@id='t']//tr/td[3]</code> gives every value of column 3.`,`<b>Pagination:</b> loop until the Next button is disabled or absent.`],
code:[`List<WebElement> rows = driver.findElements(By.xpath("//table[@id='cart']/tbody/tr"));
double total = 0;
for (int i = 1; i <= rows.size(); i++) {
  String name  = driver.findElement(By.xpath("//table[@id='cart']/tbody/tr["+i+"]/td[1]")).getText();
  String price = driver.findElement(By.xpath("//table[@id='cart']/tbody/tr["+i+"]/td[3]")).getText();
  total += Double.parseDouble(price.replace("$","").trim());
}
System.out.println("Total = " + total);

// action on a specific row
driver.findElement(By.xpath("//tr[td[text()='Ravi']]//button[text()='Edit']")).click();`],
tips:[`Real-world: sum the column and assert it equals the displayed total; handle <code>NumberFormatException</code> on empty cells.`,`Re-find elements inside the loop if the table refreshes, to avoid <code>StaleElementReferenceException</code>.`]}
];
