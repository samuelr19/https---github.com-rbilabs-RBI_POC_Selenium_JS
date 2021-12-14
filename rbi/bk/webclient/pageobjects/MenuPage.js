const BasePage = require('../../../../base/basepage');
const by = require('selenium-webdriver').By;


class MenuPage extends BasePage
{
  constructor(session)
  {
    super(session);

    this.uiElements = {
        linkMenuItem: {
            name: "Menu Item",
            locator: by.xpath("//div[@data-testid='menu-tile-grid']/div/a")
        },
        linkBackToMainMenu:{
            name : "back to main menu link",
            locator: by.css("a[href='/menu']")
        },
        btnContinue: {
          name : "continue to add",
          locator : by.css("button[data-testid='menu-action-button'][aria-label='Continue']")

        },
        btnAdd: {
            name: "Add to cart Button",
            locator: by.css("button[data-testid='menu-action-button']")
        },
        weSuccessBanner:{
          name: "Success banner",
          locator: by.xpath("//div[@type='success']")
        },
        txtMenuheader:{
          name: "Menu header",
          locator: by.xpath("//h1[contains(text(),'Menu')]")
        }
    }
  }

  async goBackToMainMenu(){
    await this.click(this.uiElements.linkBackToMainMenu);
  }

  async selectMenuItem(item){
    var locator = {
    name: "Menu Item",
    locator: by.xpath("//div[@data-testid='menu-tile-grid']//span[contains(text(),'"+item+"')]")
    }
    await this.click(locator);
  }

  async selectItems(item){

    var locator = {
      name: "Menu Item",
      locator: by.xpath("//div[@data-testid='menu-tile-bk']//h2[contains(text(),'"+item+"')]")
      }

    for (var i=1; i <=3; i++){
      try {
      await this.waitForVisible(locator, 5000)
      await this.jsClick(locator);
      await new Promise(r => setTimeout(r, 2000));
      await this.waitForVisible(this.uiElements.linkMenuItem, 5000)
      var items = await this.getMultiple(this.uiElements.linkMenuItem);
      var itemCount = items.length;
      var randomItem = Math.floor(Math.random() * (itemCount - 0 + 1) + 0);
      var rItem = items[randomItem]
      await this.jsClickOnElement(rItem);
      await new Promise(r => setTimeout(r, 2000));
      await this.jsClick(this.uiElements.btnContinue);
      await new Promise(r => setTimeout(r, 2000));
      await this.jsClick(this.uiElements.btnAdd);
      // await new Promise(r => setTimeout(r, 2000));
      await this.waitForGone(this.uiElements.weSuccessBanner, 40000)
      // await this.click(this.uiElements.imgItemImage);
      } catch (error) {
        console.log("****"+error)
        await this.click(this.uiElements.linkBackToMainMenu)
      }
      
    }

  // async selectRandomItem(){
  //   var items = await this.getMultiple(this.uiElements.linkMenuItem);
  //   var itemCount = items.length;

  //   var randomItem = Math.floor(Math.random() * (itemCount - 0 + 1) + 0)
  //   await items[randomItem].click();

  //   if (this.verifyIsDisplayed(this.uiElements.btnAdd)){
  //     this.click(this.uiElements.btnAdd);
  //   }
  //   else{
  //     var subItems = await this.getMultiple(this.uiElements.linkMenuItem);
  //     var subItemCount = items.length;

  //   }
  }


}
module.exports = MenuPage; 
