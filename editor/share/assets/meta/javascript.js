"use strict";
var t = require("fire-fs"),
    e = require("readline"),
    i = require("fire-path"),
    s = require("async"),
    r = require("babel-core"),
    a = require("convert-source-map"),
    o = require("./precompile-script"),
    n = 92160;

function u(e) {
    if (-1 !== i.basename(e).lastIndexOf(".min.")) return !0;
    var s = t.statSync(e);
    return s && s.size >= n
}

function l(e) {
    var s = i.basename(e),
        r = t.statSync(e);
    return 0 === Editor.Dialog.messageBox({
        type: "question",
        buttons: [Editor.T("MESSAGE.yes"), Editor.T("MESSAGE.no")],
        title: Editor.T("MESSAGE.assets.plugin_title"),
        message: Editor.T("MESSAGE.assets.plugin_message", {
            fileName: s
        }),
        detail: Editor.T("MESSAGE.assets.plugin_detail", {
            fileSize: function (t) {
                if (0 === t) return "0 B";
                var e = Math.floor(Math.log(t) / Math.log(1024));
                return (t / Math.pow(1024, e)).toPrecision(3) + " " + ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][e]
            }(r.size)
        }),
        defaultId: 0,
        cancelId: 1,
        noLink: !0
    })
}
class c extends Editor.metas.asset {
    constructor(t) {
        super(t), this.isPlugin = null, this.loadPluginInWeb = !0, this.loadPluginInNative = !0, this.loadPluginInEditor = !1
    }
    static defaultType() {
        return "javascript"
    }
    static version() {
        return "1.0.5"
    }
    getImportedPaths() {
        var t = this._assetdb._uuidToImportPathNoExt(this.uuid);
        return [t + ".js", t + ".js.map"]
    }
    dests() {
        if (null === this.isPlugin) {
            var t = this._assetdb.uuidToFspath(this.uuid);
            this.isPlugin = u(t)
        }
        return this.isPlugin ? [] : this.getImportedPaths()
    }
    compile(e, i) {
        var s;
        try {
            var o = t.readFileSync(e, {
                    encoding: "utf-8"
                }),
                n = !!a.fromSource(o);
            s = r.transform(o, {
                ast: !1,
                highlightCode: !1,
                sourceMaps: !0,
                inputSourceMap: n,
                compact: !1,
                filename: e,
                presets: ["env"],
                plugins: ["transform-decorators-legacy", "transform-class-properties", "add-module-exports"]
            })
        } catch (t) {
            return i(t)
        }
        i(null, {
            outputText: s.code,
            sourceMapObject: s.map
        })
    }
    _importToLibrary(t, e) {
        s.waterfall([e => {
            this.compile(t, function (t, i) {
                t && (t.code = "ESCRIPTIMPORT", t.stack = "Compile error: " + t.stack), e(t, i)
            })
        }, o.compile.bind(null, this.uuid, t), (t, e) => {
            this._assetdb.saveAssetToLibrary(this.uuid, t.outputText, ".js"), this._assetdb.saveAssetToLibrary(this.uuid, JSON.stringify(t.sourceMapObject), ".js.map"), e(null)
        }], e)
    }
    checkGlobalVariables(i, s) {
        var r = /^var\s+\S+/,
            a = e.createInterface({
                input: t.createReadStream(i)
            });
        a.on("line", t => {
            r.test(t) && Editor.info(Editor.T("MESSAGE.assets.js_global_var_1_4", {
                property: Editor.T("INSPECTOR.javascript.loadPluginInEditor"),
                path: i,
                line: t.trim()
            }))
        }), a.on("close", s)
    }
    import(t, e) {
        if (null === this.isPlugin && (this.isPlugin = !1, u(t) && (this.isPlugin = l(t))), this.isPlugin) {
            if (!this.loadPluginInEditor) return e();
            this.checkGlobalVariables(t, e)
        } else this._importToLibrary(t, e)
    }
    export (e, i, s) {
        i ? t.writeFile(e, i, s) : s && s()
    }
}!1, module.exports = c;