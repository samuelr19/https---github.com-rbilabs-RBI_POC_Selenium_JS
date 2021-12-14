const testData = require("./test_data.json")
const ConfigData = require("../config/ConfigModel")
let configData;
let country;
class TestDataModelTH{

    constructor(){
        configData = new ConfigData();
        country = configData.get_country()
    }

    

    get_address(){
        return testData.test_data.address[country];
    }
    get_store(){
        return testData.test_data.store[country];
    }
    get_main_menu_option(){
        return testData.test_data.main_menu_option;
    }
}
module.exports = TestDataModelTH;