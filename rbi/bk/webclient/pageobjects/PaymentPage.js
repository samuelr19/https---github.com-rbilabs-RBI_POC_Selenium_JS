const BasePage = require('../../../../base/basepage');
const by = require('selenium-webdriver').By;

class PaymentPage extends BasePage
{
  constructor(session)
  {
    super(session);

    this.uiElements = {
        btnPlaceOrder: {
            name: "Place Order Button",
            locator: by.css("button[data-testid='place-order']")
        },
        wePaymentDetails: {
          name: "Place Order Button from payment page",
          locator: by.css("button[data-testid='continue-order']")
        },
        orderConfirm:{
          name : "order confirmation text",
          locator : by.xpath("//h2[contains(text(),'Enjoy your order')]")
        }
    }
  }
  async placeSecureOrder(){
    await this.verifyIsDisplayed(this.uiElements.btnPlaceOrder,4000)
    await this.click(this.uiElements.btnPlaceOrder);
  }

  async verifyPaymentDetailsDisplayed(){
    return this.click(this.uiElements.wePaymentDetails);
}

  async verifyOrderConfirm() {

    if(this.isVisible(this.uiElements.orderConfirm))
    {
     return true; 
    }
    else{
      return false;
    }

  }

}
module.exports = PaymentPage; 
//data-testid="order-preparation-confirmation"