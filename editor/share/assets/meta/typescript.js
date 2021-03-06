"use strict";
var e = require("fire-fs"),
    t = require("convert-source-map"),
    r = require("typescript");
module.exports = class extends(require("./javascript")) {
    static defaultType() {
        return "typescript"
    }
    static validate(e) {
        return !e.endsWith(".d.ts")
    }
    compile(o, i) {
        var s, a = "";
        try {
            a = e.readFileSync(o, {
                encoding: "utf-8"
            }), s = r.transpileModule(a, {
                compilerOptions: {
                    target: "ES5",
                    sourceMap: !0,
                    allowJS: !0,
                    experimentalDecorators: !0,
                    allowSyntheticDefaultImports: !0,
                    pretty: !0,
                    noEmitHelpers: !0,
                    noImplicitUseStrict: !0,
                    module: r.ModuleKind.CommonJS
                }
            })
        } catch (e) {
            return i(e)
        }
        let u = JSON.parse(s.sourceMapText);
        u.sourcesContent = [a], u.file = "", s.sourceMapObject = u, s.outputText = t.removeMapFileComments(s.outputText), i(null, s)
    }
};