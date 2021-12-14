const BasePage = require('../../../../base/basepage');
const by = require('selenium-webdriver').By;
const ConfigData = require('../../config/ConfigModel');
let configData;


class ServiceModePage extends BasePage
{
  constructor(session)
  {
    super(session);
    configData = new ConfigData();

    this.uiElements = {
        pickup : {},
        delivery : {},
        txtAddress: {
            name: "Address text box",
            locator: by.css("input#downshift-0-input")
        },
        clearTxtaddress : {},
        weAvailbleStores : {
          name: "Available stores",
          locator: by.xpath("//div[@id='tabpanel-0']//button[@aria-label='Open Accordion']")
        },
        weStoreSuggestion:{
          name: "store suggestion",
          locator: by.xpath("//li[@id='downshift-0-item-0']") 
          //button[data-testid='prediction-0']
        },        
        weOrderFromStore : {
            name: "Order Icon Under Selected Shop",
            locator: by.css("button[data-testid='store-action-button']")
        }
        
    }
  }

  //enter address : 4441 Collins Avenue, Miami Beach, FL, USA -> accept
  //not using 
  async enterAddress(address){
    await this.click(this.uiElements.txtAddress);
    await this.enterText(this.uiElements.txtAddress, address);
    await new Promise(r => setTimeout(r, 5000));
    await this.click(this.uiElements.weStoreSuggestion);
  }

  async selectStore(address, store){
    await this.click(this.uiElements.txtAddress);
    await this.enterText(this.uiElements.txtAddress, address);
    await new Promise(r => setTimeout(r, 5000));
    var weStoreSuggest ={
      name: "store suggestion" ,
      locator : by.xpath("//li[@id='downshift-0-item-0']//*[contains(@text,'"+store+"')]")
    }
    await this.waitForVisible(this.uiElements.weStoreSuggestion, 30000)
    await this.click(this.uiElements.weStoreSuggestion);
    
    // await this.enterAddress(address)
    
    
    var storeLocator = 
    {
      name: "store",
      locator:by.xpath("//*[contains(text(),'"+store+"')]/ancestor::div[contains(@class,'sc-fz')]//button[@aria-label='Open Accordion']")
      // by.xpath("//div[@id='tabpanel-0']/div/div[1]//span[contains(text(),'4441 Collins Ave')]") 
                
    }
    var items = await this.getMultiple(storeLocator)
    await this.click(items[0])
    await this.click(this.uiElements.weOrderFromStore)
    //console.log("Selected store")
  }
}
module.exports = ServiceModePage; 
