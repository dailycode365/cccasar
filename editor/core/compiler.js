require("async"), require("fire-path");
var e = {
    _runTask: function (r, o) {
        var n = null,
            i = !1,
            u = null;
        Editor.App.spawnWorker("app://editor/page/build/compile-worker", function (l, p) {
            i || (i = !0, p.once("closed", function () {
                l = null, o && o(n, u)
            })), l.send("app:compile-worker-start", r, (r, o, i) => {
                o && (n = n || o), u = u || i, l && l.nativeWin.isDestroyed() || l && !e.debugWorker && l.close()
            }, -1)
        }, e.debugWorker, !0)
    },
    debugWorker: !1
};
module.exports = e;