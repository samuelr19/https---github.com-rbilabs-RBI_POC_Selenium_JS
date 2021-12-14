const SeleniumUtils = require('../../../../utils/seleniumUtils');
const ConfigData = require('../../config/ConfigModel');
const TestData = require('../../testData/TestDataModel')
const LoginPage = require('../pageobjects/SignInPage');
const ServiceModePage = require("../pageobjects/ServiceModePage")
const HomePage = require("../pageobjects/HomePage")
const MenuPage = require("../pageobjects/MenuPage")
const CartPage = require("../pageobjects/CartPage")
const PaymentPage = require("../pageobjects/PaymentPage")
const {describe, expect, test,beforeAll,beforeEach,afterEachEach} = require('@jest/globals')

//const assert = require('assert');
//const log4js = require("log4js");


let loginPage;
let browserSession;
let configData;
let testData;
let serviceModePage;
let homePage;
let menuPage;
let cartPage;
let paymentPage;

beforeAll( async function() {
  configData = await new ConfigData();
  testData = await new TestData();
  browserSession = new SeleniumUtils();
});

describe('login', function(){
  
  beforeEach( async function()
  {
    await browserSession.createSession();
    loginPage =  await new LoginPage(browserSession);
    serviceModePage = await new ServiceModePage(browserSession);
    homePage = await new HomePage(browserSession);
    menuPage = await new MenuPage(browserSession);
    cartPage = await new CartPage(browserSession);
    paymentPage = await new PaymentPage(browserSession);
    await loginPage.Visit(configData.get_signin_url());
  });

  afterEach(async function()  {
    // await browserSession.closeDriver();
  });

  test('User is able to order the items from the selected store', async function ()  {
    //let a = await testData.get_address();
    
    await loginPage.login(configData.get_user_name());
    await homePage.gotoRestaurant();
    await serviceModePage.selectStore(address=testData.get_address(),store=testData.get_store());
    
    //await menuPage.selectItems(testData.get_main_menu_option());
    //await homePage.checkout();
    //await cartPage.clickContinueToPayment();
    //await paymentPage.verifyPaymentDetailsDisplayed()
    // await paymentPage.placeSecureOrder()
    // need explicit wait ~15Secs

    //expect(paymentPage.verifyOrderConfirm()).toBe(true);

    
  },150000);
})
