const e=require("fire-fs"),r=require("fire-path"),n=require("esprima"),i=(require("estraverse"),require("escodegen")),t=require("convert-source-map"),o=require("merge-source-map"),u="undefined"!=typeof Editor?Editor.url("unpack://editor/share/quick-compile/plugins/__quick_compile__.js"):r.join(__dirname,"__quick_compile__.js"),s=e.readFileSync(u,"utf8");module.exports=function(u){let _=function(e,n,i){let t;return(t=u.transformPath?u.transformPath(e,n,i):r.relative(i.out,n)).replace(/\\/g,"/")},c=u.excludes||[];return c=c.map(e=>e.replace(/\\/g,"/")),{nodeModule:!0,transform(e,u){let{src:s,dst:c,ast:d,source:l}=e,p=`\n                (function() {\n                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';\n                    var __module = nodeEnv ? module : {exports:{}};\n                    var __filename = '${_(s,c,u)}';\n                    var __require = nodeEnv ? function (request) {\n                        return require(request);\n                    } : function (request) {\n                        return __quick_compile__.require(request, __filename);\n                    };\n                    function __define (exports, require, module) {\n                        if (!nodeEnv) {__quick_compile__.registerModule(__filename, module);}`;".json"===r.extname(s)&&(l="module.exports = "+l),d=d||n.parseScript(l,{loc:!0});let a=n.parseScript(p+"\n                    }\n                    if (nodeEnv) {\n                        __define(__module.exports, __require, __module);\n                    }\n                    else {\n                        __quick_compile__.registerModuleFunc(__filename, function () {\n                            __define(__module.exports, __require, __module);\n                        });\n                    }\n                })();",{loc:!0});a.body[0].expression.callee.body.body[4].body.body.splice(1,0,d);let m=i.generate(a,{sourceMap:s,sourceMapWithCode:!0,sourceContent:l}),f=t.fromSource(l),q=f&&f.toObject(),v=JSON.parse(m.map.toString()),g=o(q,v),y=t.fromObject(g).toComment();l=m.code+"\n"+y,e.ast=a,e.source=l},compileFinished(n,i){let t=n._scriptsCache,o=(t=t.filter(e=>-1===c.indexOf(e.src))).map(e=>{let r={};for(let n in e.deps)r[n]=t.findIndex(function(r){return r.src===e.deps[n]});return{mtime:n._mtimes[e.src],deps:r,path:_(e.src,e.dst,n)}}),u=n.entries.map(e=>_(e,n.getDstPath(e),n)),d=function(e,r){return`\n(function () {\nvar scripts = ${e};\nvar entries = ${r};\n\n${s}\n})();\n    `}(JSON.stringify(o),JSON.stringify(u));e.writeFileSync(r.join(n.out,"__quick_compile__.js"),d),i()}}};