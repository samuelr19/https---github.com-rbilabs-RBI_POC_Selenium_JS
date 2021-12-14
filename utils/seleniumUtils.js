const config = require('../run-config/run-config')
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

class SeleniumUtils{
  constructor(){
    this.driver = null;
    this.openBrowsers = {};
  }

  async createSession(name=null) {
    name = name || config.browser;
    if(name === "chrome"){
      let chromeCapabilities = webdriver.Capabilities.chrome();
      let chromeOptions = { 'args': ['--disable-infobars'] };
      chromeCapabilities.set('chromeOptions', chromeOptions);
      chromeCapabilities.setPageLoadStrategy('none');
      const pref = new webdriver.logging.Preferences();
      pref.setLevel( 'browser', webdriver.logging.Level.SEVERE );
      this.driver = await new webdriver.Builder().forBrowser(name).withCapabilities(chromeCapabilities)
        .setLoggingPrefs(pref).build();
      this.openBrowsers["main"] = await this.driver.getWindowHandle();
      this.driver.manage().window().maximize()
      return await this.driver;
    }
  }

  async closeDriver(){
    await this.driver.quit();
  }

  async openNewTab(name, url){
    await this.driver.switchTo().newWindow('tab');
    this.openBrowsers[name] = await this.driver.getWindowHandle();
    await this.driver.get(url);
  }

  async openNewWindow(name, url){
    await this.driver.switchTo().newWindow('window');
    this.openBrowsers[name] = await this.driver.getWindowHandle();
    await this.driver.get(url);
  }

  async switchTo(name){
    await this.driver.switchTo().window(this.openBrowsers[name]);
  }

  async switchToDefaultContent(){
    await this.driver.switchTo().defaultContent();
  }

  async switchToFrame(frameElement){
    await this.driver.switchTo().frame(frameElement);
  }

  async screenshot(){
    return await this.driver.takeScreenshot();
  }

  async saveScreenshot(file){
    this.screenshot().then(img => {
      require('fs').writeFile(file, img, 'base64',function(err) {
        console.log(err);
      })
    })
  }

  async close(){
    this.driver.close();
  }

  async quit(){
    this.driver.quit();
  }

}

module.exports = SeleniumUtils;
