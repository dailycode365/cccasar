"use strict";require("async"),require("../lib/network");const e=require("../lib/event");exports.data={language:Editor.lang,type:"category",id:-1,download:!1,package:!1,pay:!1},exports.components={"tools-bar":require("./tools-bar"),"nav-header":require("./nav-header"),"category-slider-list":require("./category-slider-list"),"package-home":require("./package-home"),"package-list":require("./package-list"),"package-item":require("./package-item"),download:require("./download"),package:require("./package"),"pay-popup":require("./pay-popup")},exports.methods={_onClearClick(){this.download=!1,this.package=!1}},exports.watch={},exports.ready=function(){e.$on("jump-category",e=>{this.type="category",this.id=e}),e.$on("jump-package",e=>{this.type="package",this.id=e}),e.$on("download-changed",e=>{this.download=!!e}),e.$on("package-changed",e=>{this.package=!!e}),e.$on("pay-changed",e=>{this.pay=!!e})};