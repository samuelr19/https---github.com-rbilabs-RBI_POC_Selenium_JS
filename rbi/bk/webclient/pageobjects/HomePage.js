const BasePage = require('../../../../base/basepage');
const by = require('selenium-webdriver').By;

class HomePage extends BasePage
{
  constructor(session)
  {
    super(session);

    this.uiElements = {
        btnCart:{
            name: "Cart Button",
            locator: by.css("button[data-testid='cart-button-desktop']")
        },
        btnCheckOut:{
          name: "Cart Button",
          locator: by.css("button[data-testid='checkout-action-button']")
        },
        weCartLoadIcon:{
          name: "Cart loading Icon",
          locator: by.xpath("//*[@data-testid='cart-loading-graphic']")
        },
        optnRestaurants : {
          name : "restaurants link",
          locator: by.css("a[data-testid='Restaurants']")
        },
        linkStore : {
          name :  "store address",
          // unselected value : 'select a store' <-- use for validation
          locator: by.css("[data-testid='top-service-mode-wrapper']/div[2]/div[2]")
        },
        btnAccount : {
          name :"account details",
          locator: by.css('div[class*="hamburger-button"]')[0]
        }
        

    }
  }


  async goToCart(){
    await this.jsClick(this.uiElements.btnCart);
    await this.waitForGone(this.uiElements.weCartLoadIcon, 60000)
  }
  async checkout(){
    await this.goToCart()
    await this.jsClick(this.uiElements.btnCheckOut);
  }

  async clickOrder(){   
    await this.click(this.uiElements.linkOrder);
  }
  
  async gotoRestaurant()
    {
        await this.click(this.uiElements.optnRestaurants)    
    }
    
  async gotoAccount()
  {
    try{
    await this.click(this.uiElements.btnAccount)
  }catch(error){
    this.gotoAccount()}

  }


}
module.exports = HomePage; 
