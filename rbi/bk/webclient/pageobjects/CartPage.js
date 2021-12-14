const BasePage = require('../../../../base/basepage');
const by = require('selenium-webdriver').By;

class CartPage extends BasePage
{
  constructor(session)
  {
    super(session);

    this.uiElements = {
        btnRemoveConfirmOkay: {
            name: "Remove confirm button",
            locator: by.css("button[data-testid='dialog-confirm-btn']")
        },
        btnRemoveItem: {
            name: "Remove Item Link",
            locator: by.css("button[data-testid='remove-button']")
        },
        btnContinue:{
          name: "Continue to payment link",
            locator: by.css("a[href='/cart/payment']")
        },
        rbnDineIn:{
          name: "Dine in radio button",
          locator: by.id("service-mode-EAT_IN")
        },
        wePickUpTimeSelectorDiv:{
          name: "Pick up time selector DIV",
          locator: by.css("[data-testid='pickup-time-selector']")
        },
        weSkipUpgrade:{
          name : 'skip free rewards upsize dialog',
          locator : by.xpath("//button[contains(text(),'No thanks')]")
        },
        offersSection:{
          name : 'offers display layout during checkout',
          locator : by.css("div.modal-upsizestyled__Container-ahppsk-2")
        }


    }
  }

  async removeItem(){
    var items = await this.getMultiple(this.uiElements.btnRemoveItem);
    await this.jsClickOnElement(items[0]);
    await this.waitForVisible(this.uiElements.btnRemoveConfirmOkay,5000)
    await this.click(this.uiElements.btnRemoveConfirmOkay);
    console.log("removed item")
  }
  async skipOffers(){
    await this.click(this.uiElements.weSkipUpgrade)
  }
  async clickContinueToPayment(){

    if(this.isElementExists(this.uiElements.offersSection))
    {
      await this.skipOffers()
    }

    await this.click(this.uiElements.btnContinue);
  }

  async selectDineIn(){
    await this.jsClick(this.uiElements.rbnDineIn, 15000);
  }

  async verifyDineInOptionsDisplayed(){
    return await this.isElementExists(this.uiElements.wePickUpTimeSelectorDiv);
  }
}
module.exports = CartPage; 
