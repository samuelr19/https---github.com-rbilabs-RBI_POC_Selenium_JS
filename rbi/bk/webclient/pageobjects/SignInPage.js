const BasePage = require('../../../../base/basepage');
const by = require('selenium-webdriver').By;
const ConfigData = require('../../config/ConfigModel');
const GmailHelper = require("../../../../utils/gmailHelper")

let configData;
let gmailHelper;

class LoginPage extends BasePage
{
  constructor(session)
  {
    super(session);
    configData = new ConfigData();
    gmailHelper = new GmailHelper();


    this.uiElements = {
      tbEmail: {
        name: "User email address",
        locator: by.css("input[data-testid='signin-email-input']"),
      },
      tbOtp:{
        name : "OTP text box",
        locator: by.css("input[data-testid='OTP-code-input']")
      },
      btnLogin: {
        name: "Login button",
        locator: by.css("button[data-testid='signin-button']")
      },
      tbRedirectPassword:{
        name: "Landing Page Password",
        locator: by.name("password")
      },
      btnRedirectSubmit:{
        name: "Submit button on the TH landing page",
        locator: by.xpath("//button[text()='Submit']")
      },
      btnLanguageSelectinoApply:{
        name: "Language Selection apply button",
        locator: by.css("button[data-testid='action-button-apply-language-selection']")
      },
      weLanguageSelector:{
        name : "Langugae Selector Icon",
        locator: by.css("#tabpanel-1 p[data-testid='formatted-language']")
      },
      linkLogin:{
        name: "Login link on the Home Page",
        locator: by.css("button[data-testid='desktop-sign-in-link']")
      },
      weLearnMore:{
        name: "Learn more details",
        locator: by.css("*[data-testid='hero-sub-text']")
      },
      divOtpError:{
        name: "OTP error",
        locator: by.css("div[data-testid='OTP-code-input-message']")
      },
      weOtpLoadingIcon:{
        name: "OTP processing Icon",
        locator: by.css("div[aria-label='Verifying']")
      },
      linkOrder: {
        name: "Order link",
        locator: by.css("button[data-testid='cart-button-desktop']")
    }
    };
  }

  async login(username)
  {
    var email = configData.get_user_name();
    var password =  configData.get_password();

    await this.getAccessToSite()
    //await this.selectCountry()
    await this.enterText(this.uiElements.tbEmail, username);
    await this.click(this.uiElements.btnLogin);    
    await this.waitForVisible(this.uiElements.tbOtp);

    for (var i=0; i<3; i++){
      try {
        if (await this.isElementExists(this.uiElements.tbOtp, 5000) == true){
          var otp = await gmailHelper.getOtpFromGmail(email,password);
          await this.enterText(this.uiElements.tbOtp, otp);
          await this.waitForGone(this.uiElements.weOtpLoadingIcon, 15000);
        }
        if (await this.isElementExists(this.uiElements.linkOrder, 5000) == true){
          break;
        }
        await this.driver.navigate().refresh();
        
      } catch (error) {
        
      }
      
    }
  }

  async getAccessToSite()
  {
    if (this.verifyIsDisplayed(this.uiElements.tbRedirectPassword)){
      await this.enterText(this.uiElements.tbRedirectPassword, configData.get_redirect_password());
      await this.click(this.uiElements.btnRedirectSubmit);
    }
  }

  async selectCountry()
  {
      await this.waitForVisible(this.uiElements.btnLanguageSelectinoApply,60000)
      // select country
      if (configData.get_country() != "us")
      {
        let country_locator = {name:"Country", locator: by.xpath("//input[@data-testid='dialog-button-"+configData.get_language() +"-"+ configData.get_country() + "']")}
        await this.jsClick(country_locator);
        await this.click(this.uiElements.btnLanguageSelectinoApply);
        await this.getAccessToSite()
        await this.clickSignIn();
      }
      else{
        await this.click(this.uiElements.btnLanguageSelectinoApply);
      }
  }

  async clickSignIn()
  {
    await this.waitForVisible(this.uiElements.weLearnMore,10000)
    await this.jsClick(this.uiElements.linkLogin)
  }
}

module.exports = LoginPage; 
