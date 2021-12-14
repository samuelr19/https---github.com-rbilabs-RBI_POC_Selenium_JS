const config = require('../run-config/run-config');
const webdriver = require('selenium-webdriver');
const until = webdriver.until;
const actions = require('selenium-webdriver').ActionChains;
const {assert, expect} = require('@jest/globals')

// const expect = require('chai').expect;
// const { assert } = require('chai');
// const Report = require('../utils/reportWrapper');



class BasePage{
  constructor(session) {
    this.session = session;
    this.explicitWaitMS = config.timeouts.defaultTimeout;
    this.driver = session.driver;
  }

  async Visit(url) {
    try{
      if ( !url ) {
        throw new Error( `URL is required to visit the ${ this.name }` );
      }
      await this.driver.get(url);
      return this;
    }catch(e){
      assert.fail(`Visit() failed on [${url}]\n` + e);
    }
  }

  async get(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementLocated(uiElement.locator),
      timeoutMs)
      .catch(async (error) => {
        if (~error.message.indexOf("StaleElementReferenceError")) {
          return await this.driver.findElement(uiElement.locator);
        } else {
          console.log(`get() failed on [${uiElement.name}]`);
          throw error;
        }
      });
  }

  async getMultiple(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementsLocated(uiElement.locator),
      timeoutMs)
      .catch(async (error) => {
        if (~error.message.indexOf("StaleElementReferenceError")) {
          return await this.driver.findElements(uiElement.locator);
        } else {
          console.log(`getMultiple() failed on [${uiElement.name}]`);
          throw error;
        }
      });
  }

  async isElementExists(uiElement, timeoutMs=null){
    try {
      var elements = await this.getMultiple(uiElement, timeoutMs)
      if (elements.length > 0){
        return true;
      }
      else{
        return false;
      }
    } 
    catch (error) {
      return false;
    }
  }

  async waitForAlert(timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.alertIsPresent(),
      timeoutMs);
  }

  async scrollToElement(uiElement){
    var ele = await this.driver.findElement(uiElement.locator);
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", ele);
  }

  async jsClick(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    var ele = await this.driver.wait(until.elementLocated(uiElement.locator), timeoutMs)
    await this.driver.executeScript("arguments[0].click();", ele);
  }

  async jsClickOnElement(uiElement){
    await this.driver.executeScript("arguments[0].click();", uiElement);
  }

  async moveAndClick(uiElement){
    var ele = await this.driver.findElement(uiElement.locator);
    let action = await new actions(this.driver);
    await action.move_to_element(ele).click(ele).perform()
  }

  async waitForFrame(frame, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.ableToSwitchToFrame(frame),
      timeoutMs);
  }

  async getText(uiElement, timeoutMs=null){
    let el = await this.waitForVisible(uiElement, timeoutMs);
    return await el.getText();
  }

  async getAttribute(uiElement, attrib, timeoutMs=null){
    let el = await this.waitForVisible(uiElement, timeoutMs);
    return await el.getAttribute(attrib);
  }

  async fireEvent(eventName, uiElement){
    var scriptCode = '';
    if(eventName === 'onmouseover'){
      scriptCode = `if(document.createEvent){
        var evObj = document.createEvent('MouseEvents');
        evObj.initEvent('mouseover', true, false); 
        arguments[0].dispatchEvent(evObj);
      } else if(document.createEventObject) { 
        arguments[0].fireEvent('onmouseover');
      }`;
    }else if(eventName === 'onclick'){
      scriptCode = `arguments[0].click();`;
    }

    var ele = await this.get(uiElement);
    await this.driver.executeScript(scriptCode, ele);
  }

  async hoverOn(uiElement){
    await this.fireEvent('onmouseover', uiElement);  
  }

  async waitForVisible(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementIsVisible(
      await this.get(uiElement)),
    timeoutMs);
  }

  async waitForPresence(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementLocated(
      await this.get(uiElement)),
    timeoutMs);
  }

  async waitForGone(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    await this.driver.wait(() => {
      return this.driver.findElements(uiElement.locator)
        .then(function(found) {
          return found.length === 0;
        });
    }, timeoutMs, `waitForGone() failed on [${uiElement.name}]`);
  }

  async waitForEnabled(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementIsEnabled(
      await this.get(uiElement)),timeoutMs);
  }

  async waitForDisabled(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementIsDisabled(
      await this.get(uiElement)),timeoutMs);
  }

  async waitForSelected(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementIsSelected(
      await this.get(uiElement)),timeoutMs);
  }

  async waitForNotSelected(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementIsNotSelected(
      await this.get(uiElement)),timeoutMs);
  }

  async waitForElementTextContains(uiElement, text, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementTextContains(
      await this.get(uiElement), text),timeoutMs);
  }

  async waitForElementTextIs(uiElement, text, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementTextIs(
      await this.get(uiElement), text),timeoutMs);
  }

  async waitForElementTextMatches(uiElement, regex, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.elementTextMatches(
      await this.get(uiElement), regex),timeoutMs);
  }

  async waitForStalenessOf(uiElement, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.stalenessOf(
      await this.get(uiElement)),timeoutMs);
  }

  async waitForTitleContains(text, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.titleContains(text),timeoutMs);
  }

  async waitForTitleIs(text, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.titleIs(text),timeoutMs);
  }

  async waitForTitleMatches(regex, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.titleMatches(regex),timeoutMs);
  }

  async waitForUrlContains(text, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.titleContains(text),timeoutMs);
  }

  async waitForUrlIs(text, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.urlIs(text),timeoutMs);
  }

  async waitForUrlMatches(regex, timeoutMs=null){
    timeoutMs = timeoutMs || config.timeouts.visibilityTimeout;
    return await this.driver.wait(until.urlMatches(regex),timeoutMs);
  }

  async click(uiElement){
    // Report.addStep(`Click on [${uiElement.name}]`, async() => {
    let el = await this.get(uiElement);
    return await el.click()
      .catch(async (error) => {
        if (~error.message.indexOf("StaleElementReferenceError")) {
          el = await this.get(uiElement);
          return await el.click();
        } else {
          console.log(`click() failed on [${uiElement.name}]`);
          throw error;
        }
      });
    // })
  }

  async clickIfVisible(uiElement){
    if (await this.isVisible(uiElement))
      return await this.click(uiElement);
  }

  async enterText(uiElement, text){
    await this.clearText(uiElement);
    return await this.sendKeys(uiElement, text);
  }

  async enterTextIfBlank(uiElement, text){
    if (await this.get(uiElement).getAttribute("value")
      .length < 1) return await this.enterText(uiElement, text);
  }

  async clearText(uiElement){
    let el = await this.get(uiElement);
    return await el.clear()
      .catch(async (error) => {
        if (~error.message.indexOf("StaleElementReferenceError")) {
          el = await this.get(uiElement);
          return await el.clear();
        } else {
          console.log(`clearText() failed on [${uiElement.name}]`);
          throw error;
        }
      });
  }

  async sendKeys(uiElement, text){
    // Report.addStep(`Send keys [${uiElement.name}] - [${text}]`, async() => {
    let el = await this.get(uiElement);
    return await el.sendKeys(text)
      .catch(async (error) => {
        if (~error.message.indexOf("StaleElementReferenceError")) {
          el = await this.get(uiElement);
          return await el.sendKeys(uiElement, text);
        } else {
          console.log(`sendKeys() failed on [${uiElement.name}]-[${text}]`);
          throw error;
        }
      });
    // });
  }

  async enterTextAndHitEnter(uiElement, text){
    let el = await this.clearText(uiElement);
    await el.sendKeys(text);
    return await el.sendKeys(webdriver.Key.ENTER);
  }

  async clearData(uiElement){
    let el = await this.get(uiElement);
    el.sendKeys(webdriver.Key.CONTROL,"a")
    el.sendKeys(webdriver.Key.BACK_SPACE)
  }



  async isVisible(uiElement,timeoutMs=null){
    let el = await this.waitForVisible(uiElement,timeoutMs);
    var result = await el.isDisplayed();
    return await result
  }

  async isEnabled(uiElement){
    let el = await this.waitForEnabled(uiElement)
    return await el.isEnabled();
  }

  async isSelected(uiElement){
    await this.waitForSelected(uiElement)
    return el.isSelected();
  }

  consoleErrors() {
    return this.driver.manage().logs().get( 'browser' ).then( ( logs ) => {
      return map( logs, ( log ) => log.message );
    } );
  }

  //Verify - Assert functions

  async verifyIsDisplayed(uiElement, timeoutMs=null) {
    // await Report.addStep(`Verifying if element [${uiElement.name}] is visible`, async() => {
    expect(await this.isVisible(uiElement, timeoutMs))
      .to.equal(true);
    // })
  }

}


module.exports = BasePage;
