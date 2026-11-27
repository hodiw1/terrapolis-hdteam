const Url = Java.type("java.net.URL");
const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const IOException = Java.type("java.io.IOException");

let Link = (function() {
    function Link(name, type) {
        this.name = name;
        this.type = type;

        if (this.type == "ely") {
            this.json = this.callHttpRequest("http://skinsystem.ely.by/textures/" + this.name);
        } else if (this.type == "tl") {
            this.json = this.callHttpRequest("https://auth.tlauncher.org/skin/profile/texture/login/" + this.name);
        } else {
            this.json = {url: "c.s:hnt_male/skins/kryystll.png"};
        }
    }
    Link.prototype.callHttpRequest = function(url) {
        let connection = new Url(url).openConnection();
        let inputStream = connection.getInputStream();

        try {
            let reader = new BufferedReader(new InputStreamReader(inputStream));
            let urlString = "";
            let current;

            while ((current = reader.readLine()) != null) {
                urlString += current;
            }
            return urlString == "" ? {} : JSON.parse(urlString).SKIN;
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