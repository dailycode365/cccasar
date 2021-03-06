"use strict";
require("lodash");
module.exports = class {
    constructor() {
        this._buildAssets = null, this._packedAssets = null
    }
    containsAsset(s, t) {
        var e = s in this._buildAssets;
        return !e && t && Editor.error(`The bulid not contains an asset with the given uuid "${s}".`), e
    }
    getAssetUuids() {
        return Object.keys(this._buildAssets)
    }
    getDependencies(s) {
        return this.containsAsset(s, !0) ? Editor.Utils.getDependsRecursively(this._buildAssets, s, "dependUuids") : []
    }
    getAssetType(s) {
        return this.containsAsset(s, !0),
            function (s) {
                var t = Editor.assetdb.assetInfoByUuid(s);
                if (!t) return cc.js._getClassId(cc.Texture2D, !1);
                var e = t.type,
                    i = Editor.assets[e];
                return i ? cc.js._getClassId(i, !1) : (Editor.error("Can not get asset type of " + s), cc.js._getClassId(cc.RawAsset, !1))
            }(s)
    }
    getNativeAssetPath(s) {
        if (!this.containsAsset(s, !0)) return "";
        var t = this._buildAssets[s];
        return "object" == typeof t && t.nativePath || ""
    }
};