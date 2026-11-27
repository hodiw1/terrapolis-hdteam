const URL = Java.type("java.net.URL");
const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const IOException = Java.type("java.io.IOException");
const Base64 = Java.type("java.util.Base64");
const String = Java.type("java.lang.String");

const Link = (function() {
    function Link(name, type) {
        this.name = name;
        this.type = type;

        if (this.type == "ely") {
            this.json = this.callHttpRequest("http://skinsystem.ely.by/textures/" + this.name).SKIN;
        } else if (this.type == "tl") {
            this.json = this.callHttpRequest("https://auth.tlauncher.org/skin/profile/texture/login/" + this.name).SKIN;
        } else if (this.type == "license") {
            this.json = this.callHttpRequest("https://api.mojang.com/users/profiles/minecraft/" + this.name);
            this.json = this.callHttpRequest("https://sessionserver.mojang.com/session/minecraft/profile/" + this.json.id);
            this.json = JSON.parse(new String(Base64.getDecoder().decode(this.json.properties[0].value))).textures.SKIN;
        } else {
            this.json = {
                url: "minecraft:textures/entity/steve.png",
                type: "fred"
            };
        }
    }

    Link.prototype.callHttpRequest = function(url) {
        let connection = new URL(url).openConnection();
        let inputStream = connection.getInputStream();

        try {
            let reader = new BufferedReader(new InputStreamReader(inputStream));
            let urlString = "";
            let current;

            while ((current = reader.readLine()) != null) {
                urlString += current;
            }
            
            reader.close();
            
            return urlString == "" ? {} : JSON.parse(urlString);
        } finally {
            if (inputStream) {
                inputStream.close();
            }
        }
    };

    Link.prototype.getType = function() {
        let metadata = this.json.metadata;
        let type;

        if (metadata === undefined) {
            type = "fred";
        } else {
            type = "alex";
        }
        return type;
    };

    Link.prototype.getLink = function() {
        let json = this.json;

        if (json) {
            return json.url;
        }
    };
    return Link;
}());

function getSkin(name, type) {
    return new Link(name, type);
}