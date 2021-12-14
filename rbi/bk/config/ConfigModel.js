const config_data = require('./config_data');

class ConfigModel
{
    get_env()
    {
        return config_data.env
    }

    get_country()
    {
        return config_data.country
    }

    get_language()
    {
        return config_data.langugae
    }

    get_redirect_password()
    {
        return config_data.redirectPassword
    }

    get_signin_url()
    {
        return config_data.signInUrl.replace("env", config_data.env)
    }

    get_landing_page_url()
    {
        return config_data.landingPageUrl.replace("env", config_data.env)
    }

    get_user_name()
    {
        return config_data.credentials[this.get_country()].username
    }

    get_password()
    {
        return config_data.credentials[this.get_country()].password
    }
}
module.exports = ConfigModel;
