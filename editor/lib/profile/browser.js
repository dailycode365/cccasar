"use strict";
const o = require("../../../share/default-settings");
Editor.Profile.register("global", Editor.App.home), Editor.log("Load ~/.CocosCreator/settings.json"), Editor.App._profile = Editor.Profile.load("profile://global/settings.json", o);