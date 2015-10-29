configureFacebook = function(config) {
    // first, remove configuration entry in case service is already configured
    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });

   ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: config.clientId,
        secret: config.secret
    });
};

// set the settings object with meteor --settings private/localhost.json
var facebookConfig = Meteor.settings.facebook;
if(facebookConfig) {
    console.log('Got settings for Facebook. API Key:', facebookConfig.clientId)
    configureFacebook(facebookConfig);
}

var googleAPIKey = Meteor.settings.public.googleAPIKey;
if(googleAPIKey) {
    console.log('Got settings for Google. API Key:', googleAPIKey)
}

Meteor.startup(function(){
    if (Version.find().count() > 0){
        Version.remove({});
    }
    Version.insert(JSON.parse(Assets.getText("version.json")));
})
