/********
START: Edited by adinplay
Please set the settings below before you load the adslib: https://api.adinplay.com/libs/aiptag/pub/TPZ/paper-io.com/tag.min.js
*********/

window.aiptag = window.aiptag || {cmd: []};
aiptag.cmd.display = aiptag.cmd.display || [];
aiptag.cmd.player = aiptag.cmd.player || [];

//CMP tool settings
aiptag.cmp = {
	show: true,
	position: "centered",  //centered, bottom
	button: true,
	buttonText: "Privacy settings",
	buttonPosition: "bottom-left" //bottom-left, bottom-right, top-left, top-right
}
/********
END: Edited by adinplay
*********/
	
!(function () {
    "use strict";
    function r(e, n) {
        if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function o(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            (o.enumerable = o.enumerable || !1), (o.configurable = !0), "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }
    function t(e, n, t) {
        return n && o(e.prototype, n), t && o(e, t), e;
    }
    function i(e) {
        return (i = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
              })(e);
    }
    function a(e, n) {
        return (a =
            Object.setPrototypeOf ||
            function (e, n) {
                return (e.__proto__ = n), e;
            })(e, n);
    }
    function s(e, n) {
        return !n || ("object" != typeof n && "function" != typeof n)
            ? (function (e) {
                  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return e;
              })(e)
            : n;
    }
    function n(o) {
        return function () {
            var e,
                n = i(o);
            if (
                (function () {
                    if ("undefined" != typeof Reflect && Reflect.construct && !Reflect.construct.sham) {
                        if ("function" == typeof Proxy) return 1;
                        try {
                            return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), 1;
                        } catch (e) {
                            return;
                        }
                    }
                })()
            ) {
                var t = i(this).constructor;
                e = Reflect.construct(n, arguments, t);
            } else e = n.apply(this, arguments);
            return s(this, e);
        };
    }
    function c() {}
    var d = !1,
        e = (function () {
            function o(e, n, t) {
                r(this, o), (this.onOpen = n || c), (this.onClose = t || c), (this.intervals = e || [0]), (this.currentInterval = 0), (this.last = Date.now()), (this.providers = []), this.clear();
            }
            return (
                t(o, [
                    {
                        key: "adblock",
                        value: function () {
                            return d;
                        },
                    },
                    {
                        key: "clear",
                        value: function () {
                            (this.current = -1), (this.started = !1), (this.chain = !1), (this.requested = !1), (this.rewarded = !1), (this.type = "");
                        },
                    },
                    {
                        key: "open",
                        value: function () {
                            console.log("ADS: manager.open"), (this.started = !0), console.log("ADS: manager.onOpen"), this.onOpen();
                        },
                    },
                    {
                        key: "end",
                        value: function () {
                            console.log("ADS: manager.end");
                            var e = this.rewarded;
                            this.clear(), console.log("ADS: manager.onClose"), this.onClose(e);
                        },
                    },
                    {
                        key: "close",
                        value: function (e, n) {
                            console.log("ADS: manager.close"),
                                this.providers[this.current]
                                    ? e === this.providers[this.current].provider
                                        ? this.requested
                                            ? !n && this.started
                                                ? ("preroll" === this.type && ((this.last = Date.now()), this.currentInterval < this.intervals.length - 1 && this.currentInterval++), this.end())
                                                : this.next()
                                            : console.log("ADS: no requested")
                                        : console.log("ADS: bad provider")
                                    : console.log("ADS: no current");
                        },
                    },
                    {
                        key: "next",
                        value: function () {
                            if ((console.log("ADS: manager.next"), this.current++, this.current >= this.providers.length)) this.end();
                            else {
                                var e = this.providers[this.current];
                                if (e.options[this.type]) {
                                    if (!e.ready) return (e.provider = e.provider()), (e.provider.manager = this), (e.ready = !0), void this.end();
                                    e.provider[this.type]() ? (this.requested = !0) : this.next();
                                } else this.next();
                            }
                        },
                    },
                    {
                        key: "addProvider",
                        value: function (e, n) {
                            var t = "function" != typeof e;
                            t && (e.manager = this), this.providers.push({ provider: e, options: n, ready: t });
                        },
                    },
                    {
                        key: "getProvider",
                        value: function (n) {
                            var e = this.providers.find(function (e) {
                                return e.ready && e.provider.name === n;
                            });
                            return e && e.provider;
                        },
                    },
                    {
                        key: "checktimeForAds",
                        value: function (e) {
                            var n = 0 < arguments.length && void 0 !== e ? e : 0,
                                t = Date.now() - this.last,
                                o = this.intervals[this.currentInterval],
                                r = o - n <= t;
                            return console.log("ADS: last: ".concat(t, ", interval: ").concat(o, ", show: ").concat(r)), r;
                        },
                    },
                    {
                        key: "show",
                        value: function () {
                            console.log("ADS: manager.show"), this.chain || (this.checktimeForAds() ? ((this.type = "preroll"), (this.chain = !0), this.next()) : (console.log("ADS: manager.onClose"), this.onClose()));
                        },
                    },
                    {
                        key: "checkRewarded",
                        value: function () {
                            var e = this.providers.find(function (e) {
                                return e.options.rewarded;
                            });
                            console.log("ADS: checkRewarded provider:", e);
                            var n = (e && e.provider.checkRewarded()) || Promise.reject();
                            return console.log("ADS: checkRewarded promise:", n), n;
                        },
                    },
                    {
                        key: "showRewarded",
                        value: function () {
                            console.log("ADS: manager.showRewarded"), this.chain || ((this.type = "rewarded"), (this.chain = !0), this.next());
                        },
                    },
                ]),
                o
            );
        })(),
        l = (function () {
            function n(e) {
                r(this, n), (this.name = e), (this.sdk = null), (this.manager = null), (this.onload = []);
            }
            return (
                t(n, [
                    { key: "preroll", value: function () {} },
                    { key: "rewarded", value: function () {} },
                    {
                        key: "checkRewarded",
                        value: function () {
                            return new Promise(function (e, n) {
                                setTimeout(e, 1);
                            });
                        },
                    },
                    {
                        key: "open",
                        value: function () {
                            this.manager && this.manager.open();
                        },
                    },
                    {
                        key: "close",
                        value: function (e) {
                            this.manager && this.manager.close(this, e);
                        },
                    },
                    {
                        key: "onRewarded",
                        value: function (e) {
                            this.manager && (this.manager.rewarded = e);
                        },
                    },
                ]),
                n
            );
        })(),
        u = (function () {
            !(function (e, n) {
                if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
                (e.prototype = Object.create(n && n.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })), n && a(e, n);
            })(o, l);
            var e = n(o);
            function o(n) {
                var t;
                return (
                    r(this, o),
                    ((t = e.call(this, "aip")).description = n.description),
                    (t.getElement = n.getElement || c),
                    (t.onOpen = n.onOpen || c),
                    (t.onClose = n.onClose || c),
                    (t.onError = n.onError || c),
                    (t.aiptag = null),
                    (t.player = null),
                    (function (e, n, t, o) {
                        if (!document.getElementById(e)) {
                            o && o();
                            var r = document.createElement("script");
                            (r.id = e),
                                (r.type = "text/javascript"),
                                (r.async = !0),
                                (r.src = n),
                                (r.onload = t),
                                (r.onerror = function () {
                                    d = !0;
                                });
                            var i = document.getElementsByTagName("script")[0];
                            i.parentNode.insertBefore(r, i);
                        }
                    })("aipsdk", n.url, function () {
                        var e = window.aiptag || {};
                        (window.aiptag = e),
                            ((t.aiptag = e).subid = n.subid || ""),
                            (e.gdprShowConsentTool = !0),
                            (e.cmd = e.cmd || []),
                            (e.cmd.display = e.cmd.display || []),
                            (e.cmd.player = e.cmd.player || []),
                            console.log("ADS: aip init"),
                            e.cmd.player.push(function () {
                                var e = document.documentElement.clientWidth,
                                    n = document.documentElement.clientHeight;
                                t.player = new aipPlayer({
                                    AD_WIDTH: e,
                                    AD_HEIGHT: n,
                                    AD_FULLSCREEN: !0,
                                    AD_CENTERPLAYER: !1,
                                    LOADING_TEXT: "loading advertisement",
                                    DESCRIPTION_URL: t.description,
                                    PREROLL_ELEM: function () {
                                        return console.log("ADS.AIP: PREROLL_ELEM"), t.getElement();
                                    },
                                    AIP_REWARDEDCOMPLETE: function (e) {
                                        console.log("ADS.AIP: AIP_REWARDEDCOMPLETE: " + e);
                                        var n = { success: "granted" === e, reason: e };
                                        t.onRewarded(n), "empty" === e && window.ga && ga("send", "event", "ads", "aipno_rewarded"), t.close(), t.onClose();
                                    },
                                    AIP_COMPLETE: function () {
                                        console.log("ADS.AIP: AIP_COMPLETE"), t.close(), t.onClose();
                                    },
                                    AIP_REMOVE: function () {
                                        console.log("ADS.AIP: AIP_REMOVE");
                                    },
                                    AIP_NOADS: function () {
                                        console.log("ADS.AIP: aip event noads"), t.close(!0), t.onError();
                                    },
                                });
                            }),
                            t.onload.forEach(function (e) {
                                return e();
                            }),
                            (t.onload = []);
                    }),
                    t
                );
            }
            return (
                t(o, [
                    {
                        key: "rewarded",
                        value: function () {
                            var e = this,
                                n = !!this.aiptag && !!this.player;
                            return (
                                n &&
                                    this.aiptag.cmd.player.push(function () {
                                        e.player.startRewardedAd();
                                    }),
                                n
                            );
                        },
                    },
                    {
                        key: "preroll",
                        value: function () {
                            var e = this,
                                n = !!this.aiptag && !!this.player;
                            return (
                                n &&
                                    (console.log("ADS: aip.show"),
                                    this.aiptag.cmd.player.push(function () {
                                        e.onOpen(), e.player.startPreRoll(), e.open();
                                    })),
                                n
                            );
                        },
                    },
                    {
                        key: "banner",
                        value: function (n, t) {
   			    aiptag.cmd.display.push(function() { aipDisplayTag.display('paper-io-com_336x280'); });
			    if( (window.innerHeight >= 780 ) && ( window.innerWidth >= 970 ) ) {
				    aiptag.cmd.display.push(function() { aipDisplayTag.display('paper-io-com_970x90'); });
		            }
                            var o = this;
                            this.aiptag && window.aipDisplayTag
                                ? this.aiptag.cmd.display.push(function () {
                                      var e = o.aiptag.subid;
                                      (o.aiptag.subid = t), window.aipDisplayTag.display(n), (o.aiptag.subid = e);
                                  })
                                : this.onload.push(function () {
                                      return o.banner(n, t);
                                  });
                        },
                    },
                ]),
                o
            );
        })();
    console.log("ADS: afg v. 1.35");
    var p = new e(
        [0, 12e4, 3e4],
        function () {
            var e = document.getElementById("adOverlay");
            e && ((e.style.display = "block"), (e.style.animation = "fadein 500ms"));
        },
        function (e) {
            console.log("ADS: game starts"), console.log("rewarded", e);
            var n = document.getElementById("adOverlay");
            n && (n.style.display = "none"),
                e
                    ? e.success
                        ? ((window.paper2.rewarded = !0), document.activeElement.blur(), document.body.focus(), window.game_starter())
                        : ((window.paper2.redraw = !0), (window.paper2.rewardedFail = e.reason), window.game_is_over_main())
                    : (document.activeElement.blur(), document.body.focus(), window.game_starter());
        }
    );
    (window.adblock = function () {
        return p.adblock();
    }),
        p.addProvider(
            new u({
                url: "//api.adinplay.com/libs/aiptag/pub/TPZ/paper-io.com/tag.min.js",
                description: "https://paper-io.com/info.php",
                getElement: function () {
                    return document.getElementById("aipstreamContainer");
                },
                onOpen: function () {},
                onClose: function () {},
                onError: function () {
                    return window.ga && window.ga("send", "event", "ads", "aipnoads");
                },
            }),
            { preroll: !0, rewarded: !1 }
        );
    function h(e) {
        var n = p.getProvider("aip"),
            t = window.game_mode || "";
        console.log("GM: " + t), n.banner(e, t);
    }
    function f() {
        var e = game_with_challenges ? 2 : 1,
            n = "";
        switch ((780 <= window.innerHeight && 970 <= window.innerWidth && (n = '<div style="position: absolute; bottom: 50px; left: 0px; right: 0px;"><center><div id="paper-io-com_970x90"></div></center></div>'), e)) {
            case 1:
            case 3:
                $("#bottom .a").html('<center><div id="paper-io-com_336x280"></div></center>' + n), h("paper-io-com_336x280"), n && h("paper-io-com_970x90");
                break;
            case 2:
                game_with_challenges
                    ? ($("#challenges_ads").html('<div id="paper-io-com_300x600"></div>'), h("paper-io-com_300x600"))
                    : ($("#bottom .a").html('<center><div id="paper-io-com_336x280"></div></center>' + n), h("paper-io-com_336x280"), n && h("paper-io-com_970x90"));
        }
    }
    $(document).ready(f),
        (window.afg_aftergame = function () {
            f();
        }),
        (window.checkRewarded = function () {
            (window.rewardedExist = !1),
                p.checkRewarded().then(function () {
                    (window.rewardedExist = !0), console.log("GD: preload true");
                });
        }),
        (window.afg_do = function () {
            $("#vdo").hide(), window.needRewarded ? (window.ga && ga("send", "event", "ads", "button_extralife"), p.showRewarded()) : p.show();
        });
})();