if (+function ($) {
        "use strict";
        function transitionEnd() {
            var el = document.createElement("bootstrap"), transEndEventNames = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var name in transEndEventNames)if (void 0 !== el.style[name])return {end: transEndEventNames[name]};
            return !1
        }

        $.fn.emulateTransitionEnd = function (duration) {
            var called = !1, $el = this;
            $(this).one("bsTransitionEnd", function () {
                called = !0
            });
            var callback = function () {
                called || $($el).trigger($.support.transition.end)
            };
            return setTimeout(callback, duration), this
        }, $(function () {
            $.support.transition = transitionEnd(), $.support.transition && ($.event.special.bsTransitionEnd = {
                bindType: $.support.transition.end,
                delegateType: $.support.transition.end,
                handle: function (e) {
                    return $(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
                }
            })
        })
    }(jQuery), +function ($) {
        "use strict";
        function getTargetFromTrigger($trigger) {
            var href, target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
            return $(target)
        }

        function Plugin(option) {
            return this.each(function () {
                var $this = $(this), data = $this.data("bs.collapse"), options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
                !data && options.toggle && /show|hide/.test(option) && (options.toggle = !1), data || $this.data("bs.collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]()
            })
        }

        var Collapse = function (element, options) {
            this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],[data-toggle="collapse"][data-target="#' + element.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
        };
        Collapse.VERSION = "3.3.6", Collapse.TRANSITION_DURATION = 350, Collapse.DEFAULTS = {toggle: !0}, Collapse.prototype.dimension = function () {
            var hasWidth = this.$element.hasClass("width");
            return hasWidth ? "width" : "height"
        }, Collapse.prototype.show = function () {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var activesData, actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                if (!(actives && actives.length && (activesData = actives.data("bs.collapse"), activesData && activesData.transitioning))) {
                    var startEvent = $.Event("show.bs.collapse");
                    if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                        actives && actives.length && (Plugin.call(actives, "hide"), activesData || actives.data("bs.collapse", null));
                        var dimension = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                        var complete = function () {
                            this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                        };
                        if (!$.support.transition)return complete.call(this);
                        var scrollSize = $.camelCase(["scroll", dimension].join("-"));
                        this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
                    }
                }
            }
        }, Collapse.prototype.hide = function () {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var startEvent = $.Event("hide.bs.collapse");
                if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                    var dimension = this.dimension();
                    this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                    var complete = function () {
                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                    };
                    return $.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION) : complete.call(this)
                }
            }
        }, Collapse.prototype.toggle = function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, Collapse.prototype.getParent = function () {
            return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
                var $element = $(element);
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
            }, this)).end()
        }, Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
            var isOpen = $element.hasClass("in");
            $element.attr("aria-expanded", isOpen), $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen)
        };
        var old = $.fn.collapse;
        $.fn.collapse = Plugin, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function () {
            return $.fn.collapse = old, this
        }, $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (e) {
            var $this = $(this);
            $this.attr("data-target") || e.preventDefault();
            var $target = getTargetFromTrigger($this), data = $target.data("bs.collapse"), option = data ? "toggle" : $this.data();
            Plugin.call($target, option)
        })
    }(jQuery), "undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");
+function (a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")
}(jQuery), +function (a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b)if (void 0 !== a.style[c])return {end: b[c]};
        return !1
    }

    a.fn.emulateTransitionEnd = function (b) {
        var c = !1, d = this;
        a(this).one("bsTransitionEnd", function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function (b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var c = a(this), e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }

    var c = '[data-dismiss="alert"]', d = function (b) {
        a(b).on("click", c, this.close)
    };
    d.VERSION = "3.3.6", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }

        var e = a(this), f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }

    var c = function (b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.6", c.DEFAULTS = {loadingText: "loading..."}, c.prototype.setState = function (b) {
        var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function () {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b), g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }

    var c = function (b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function (a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function (a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function (a, b) {
        var c = this.getItemIndex(b), d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap)return b;
        var e = "prev" == a ? -1 : 1, f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function (a) {
        var b = this, c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function (b, d) {
        var e = this.$element.find(".item.active"), f = d || this.getItemForDirection(b, e), g = this.interval, h = "next" == b ? "left" : "right", i = this;
        if (f.hasClass("active"))return this.sliding = !1;
        var j = f[0], k = a.Event("slide.bs.carousel", {relatedTarget: j, direction: h});
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {relatedTarget: j, direction: h});
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = d, this
    };
    var e = function (c) {
        var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()), h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function () {
            var c = a(this), e = c.data("bs.collapse"), f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }

    var d = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.6", d.TRANSITION_DURATION = 350, d.DEFAULTS = {toggle: !0}, d.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition)return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function () {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e), g = f.data("bs.collapse"), h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function () {
            var d = a(this), e = b(d), f = {relatedTarget: this};
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function d(b) {
        return this.each(function () {
            var c = a(this), d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }

    var e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function (b) {
        a(b).on("click.bs.dropdown", this.toggle)
    };
    g.VERSION = "3.3.6", g.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e), g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {relatedTarget: this};
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented())return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
            }
            return !1
        }
    }, g.prototype.keydown = function (c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d), g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which)return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a", i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), +function (a) {
    "use strict";
    function b(b, d) {
        return this.each(function () {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }

    var c = function (b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function (b) {
        var d = this, e = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            d.$element.one("mouseup.dismiss.bs.modal", function (b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {relatedTarget: b});
            e ? d.$dialog.one("bsTransitionEnd", function () {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function () {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function (b) {
        var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b)return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function () {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function () {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    }, c.prototype.checkScrollbar = function () {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
        var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), g = f.data("bs.modal") ? "toggle" : a.extend({remote: !/#/.test(e) && e}, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }

    var c = function (a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, c.prototype.init = function (b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector)throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g)this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function () {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function () {
        for (var a in this.inState)if (this.inState[a])return !0;
        return !1
    }, c.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide())
    }, c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d)return;
            var e = this, f = this.tip(), g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement, i = /\s?auto?\s?/i, j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(), l = f[0].offsetWidth, m = f[0].offsetHeight;
            if (j) {
                var n = h, o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function () {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function (a) {
                d.css({top: Math.round(a.top), left: Math.round(a.left)})
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c), m = l ? 2 * k.left - e + i : 2 * k.top - f + j, n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function (b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }

        var e = this, f = a(this.$tip), g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function () {
        return this.getTitle()
    }, c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var c = b[0], d = "BODY" == c.tagName, e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {width: e.right - e.left, height: e.bottom - e.top}));
        var f = d ? {
            top: 0,
            left: 0
        } : b.offset(), g = {scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()}, h = d ? {
            width: a(window).width(),
            height: a(window).height()
        } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = {top: 0, left: 0};
        if (!this.$viewport)return e;
        var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
        } else {
            var j = b.left - f, k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function () {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function (a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function () {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length))throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function () {
        this.enabled = !0
    }, c.prototype.disable = function () {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function (b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function () {
        var a = this;
        clearTimeout(this.timeout), this.hide(function () {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = d, this
    }
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }

    var c = function (a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip)throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.6", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
        return a.fn.popover = d, this
    }
}(jQuery), +function (a) {
    "use strict";
    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }

    b.VERSION = "3.3.6", b.DEFAULTS = {offset: 10}, b.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function () {
        var b = this, c = "offset", d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var b = a(this), e = b.data("target") || b.attr("href"), f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function () {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(), d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d)return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0])return this.activeTarget = null, this.clear();
        for (a = e.length; a--;)g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function () {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"), f = a.Event("hide.bs.tab", {relatedTarget: b[0]}), g = a.Event("show.bs.tab", {relatedTarget: e[0]});
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
                    e.trigger({type: "hidden.bs.tab", relatedTarget: b[0]}), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function (b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }

        var g = d.find("> .active"), h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
        return a.fn.tab = d, this
    };
    var e = function (c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.6", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function (a, b, c, d) {
        var e = this.$target.scrollTop(), f = this.$element.offset(), g = this.$target.height();
        if (null != c && "top" == this.affixed)return c > e ? "top" : !1;
        if ("bottom" == this.affixed)return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed, i = h ? e : f.top, j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
    }, c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset)return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(), b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(), d = this.options.offset, e = d.top, f = d.bottom, g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""), j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented())return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({top: g - b - f})
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
        return a.fn.affix = d, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var c = a(this), d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery), !function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function (a) {
    a.extend(a.fn, {
        validate: function (b) {
            if (!this.length)return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function (b) {
                c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0)
            }), this.on("submit.validate", function (b) {
                function d() {
                    var d, e;
                    return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0
                }

                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        }, valid: function () {
            var b, c, d;
            return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function () {
                b = c.element(this) && b, d = d.concat(c.errorList)
            }), c.errorList = d), b
        }, rules: function (b, c) {
            var d, e, f, g, h, i, j = this[0];
            if (b)switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                case"add":
                    a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                    break;
                case"remove":
                    return c ? (i = {}, a.each(c.split(/\s/), function (b, c) {
                        i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required")
                    }), i) : (delete e[j.name], f)
            }
            return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({required: h}, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {remote: h})), g
        }
    }), a.extend(a.expr[":"], {
        blank: function (b) {
            return !a.trim("" + a(b).val())
        }, filled: function (b) {
            return !!a.trim("" + a(b).val())
        }, unchecked: function (b) {
            return !a(b).prop("checked")
        }
    }), a.validator = function (b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function (b, c) {
        return 1 === arguments.length ? function () {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c)
        } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
                return c
            })
        }), b)
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (a) {
                this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
            },
            onfocusout: function (a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
            },
            onkeyup: function (b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b === this.lastElement) && this.element(b)
            },
            onclick: function (a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function (b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            },
            unhighlight: function (b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        },
        setDefaults: function (b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function b(b) {
                    var c = a.data(this.form, "validator"), d = "on" + b.type.replace(/^validate/, ""), e = c.settings;
                    e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b)
                }

                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.groups = {};
                a.each(this.settings.groups, function (b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function (a, c) {
                        d[c] = b
                    })
                }), c = this.settings.rules, a.each(c, function (b, d) {
                    c[b] = a.validator.normalizeRule(d)
                }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            }, form: function () {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            }, checkForm: function () {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++)this.check(b[a]);
                return this.valid()
            }, element: function (b) {
                var c = this.clean(b), d = this.validationTargetFor(c), e = !0;
                return this.lastElement = d, void 0 === d ? delete this.invalid[c.name] : (this.prepareElement(d), this.currentElements = a(d), e = this.check(d) !== !1, e ? delete this.invalid[d.name] : this.invalid[d.name] = !0), a(b).attr("aria-invalid", !e), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e
            }, showErrors: function (b) {
                if (b) {
                    a.extend(this.errorMap, b), this.errorList = [];
                    for (var c in b)this.errorList.push({message: b[c], element: this.findByName(c)[0]});
                    this.successList = a.grep(this.successList, function (a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            }, resetForm: function () {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors();
                var b, c = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                if (this.settings.unhighlight)for (b = 0; c[b]; b++)this.settings.unhighlight.call(this, c[b], this.settings.errorClass, ""); else c.removeClass(this.settings.errorClass)
            }, numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            }, objectLength: function (a) {
                var b, c = 0;
                for (b in a)c++;
                return c
            }, hideErrors: function () {
                this.hideThese(this.toHide)
            }, hideThese: function (a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide()
            }, valid: function () {
                return 0 === this.size()
            }, size: function () {
                return this.errorList.length
            }, focusInvalid: function () {
                if (this.settings.focusInvalid)try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (b) {
                }
            }, findLastActive: function () {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function (a) {
                        return a.element.name === b.name
                    }).length && b
            }, elements: function () {
                var b = this, c = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                    return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0)
                })
            }, clean: function (b) {
                return a(b)[0]
            }, errors: function () {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            }, reset: function () {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([])
            }, prepareForm: function () {
                this.reset(), this.toHide = this.errors().add(this.containers)
            }, prepareElement: function (a) {
                this.reset(), this.toHide = this.errorsFor(a)
            }, elementValue: function (b) {
                var c, d = a(b), e = b.type;
                return "radio" === e || "checkbox" === e ? this.findByName(b.name).filter(":checked").val() : "number" === e && "undefined" != typeof b.validity ? b.validity.badInput ? !1 : d.val() : (c = d.val(), "string" == typeof c ? c.replace(/\r/g, "") : c)
            }, check: function (b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f = a(b).rules(), g = a.map(f, function (a, b) {
                    return b
                }).length, h = !1, i = this.elementValue(b);
                for (d in f) {
                    e = {method: d, parameters: f[d]};
                    try {
                        if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                            h = !0;
                            continue
                        }
                        if (h = !1, "pending" === c)return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c)return this.formatAndAdd(b, e), !1
                    } catch (j) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j
                    }
                }
                return h ? void 0 : (this.objectLength(f) && this.successList.push(b), !0)
            }, customDataMessage: function (b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
            }, customMessage: function (a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            }, findDefined: function () {
                for (var a = 0; a < arguments.length; a++)if (void 0 !== arguments[a])return arguments[a]
            }, defaultMessage: function (b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
            }, formatAndAdd: function (b, c) {
                var d = this.defaultMessage(b, c.method), e = /\$?\{(\d+)\}/g;
                "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({
                    message: d,
                    element: b,
                    method: c.method
                }), this.errorMap[b.name] = d, this.submitted[b.name] = d
            }, addWrapper: function (a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
            }, defaultShowErrors: function () {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++)c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)for (a = 0; this.successList[a]; a++)this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)for (a = 0, b = this.validElements(); b[a]; a++)this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            }, validElements: function () {
                return this.currentElements.not(this.invalidElements())
            }, invalidElements: function () {
                return a(this.errorList).map(function () {
                    return this.element
                })
            }, showLabel: function (b, c) {
                var d, e, f, g = this.errorsFor(b), h = this.idOrName(b), i = a(b).attr("aria-describedby");
                g.length ? (g.removeClass(this.settings.validClass).addClass(this.settings.errorClass), g.html(c)) : (g = a("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(c || ""), d = g, this.settings.wrapper && (d = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), g.is("label") ? g.attr("for", h) : 0 === g.parents("label[for='" + h + "']").length && (f = g.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1"), i ? i.match(new RegExp("\\b" + f + "\\b")) || (i += " " + f) : i = f, a(b).attr("aria-describedby", i), e = this.groups[b.name], e && a.each(this.groups, function (b, c) {
                    c === e && a("[name='" + b + "']", this.currentForm).attr("aria-describedby", g.attr("id"))
                }))), !c && this.settings.success && (g.text(""), "string" == typeof this.settings.success ? g.addClass(this.settings.success) : this.settings.success(g, b)), this.toShow = this.toShow.add(g)
            }, errorsFor: function (b) {
                var c = this.idOrName(b), d = a(b).attr("aria-describedby"), e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + d.replace(/\s+/g, ", #")), this.errors().filter(e)
            }, idOrName: function (a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            }, validationTargetFor: function (b) {
                return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0]
            }, checkable: function (a) {
                return /radio|checkbox/i.test(a.type)
            }, findByName: function (b) {
                return a(this.currentForm).find("[name='" + b + "']")
            }, getLength: function (b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case"select":
                        return a("option:selected", c).length;
                    case"input":
                        if (this.checkable(c))return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            }, depend: function (a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
            }, dependTypes: {
                "boolean": function (a) {
                    return a
                }, string: function (b, c) {
                    return !!a(b, c.form).length
                }, "function": function (a, b) {
                    return a(b)
                }
            }, optional: function (b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            }, startRequest: function (a) {
                this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
            }, stopRequest: function (b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            }, previousValue: function (b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(b, "remote")
                    })
            }, destroy: function () {
                this.resetForm(), a(this.currentForm).off(".validate").removeData("validator")
            }
        },
        classRuleSettings: {
            required: {required: !0},
            email: {email: !0},
            url: {url: !0},
            date: {date: !0},
            dateISO: {dateISO: !0},
            number: {number: !0},
            digits: {digits: !0},
            creditcard: {creditcard: !0}
        },
        addClassRules: function (b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function (b) {
            var c = {}, d = a(b).attr("class");
            return d && a.each(d.split(" "), function () {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            }), c
        },
        normalizeAttributeRule: function (a, b, c, d) {
            /min|max/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0)
        },
        attributeRules: function (b) {
            var c, d, e = {}, f = a(b), g = b.getAttribute("type");
            for (c in a.validator.methods)"required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        },
        dataRules: function (b) {
            var c, d, e = {}, f = a(b), g = b.getAttribute("type");
            for (c in a.validator.methods)d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
            return e
        },
        staticRules: function (b) {
            var c = {}, d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function (b, c) {
            return a.each(b, function (d, e) {
                if (e === !1)return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case"string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case"function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 !== e.param ? e.param : !0 : delete b[d]
                }
            }), a.each(b, function (d, e) {
                b[d] = a.isFunction(e) ? e(c) : e
            }), a.each(["minlength", "maxlength"], function () {
                b[this] && (b[this] = Number(b[this]))
            }), a.each(["rangelength", "range"], function () {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        },
        normalizeRule: function (b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function () {
                    c[this] = !0
                }), b = c
            }
            return b
        },
        addMethod: function (b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        },
        methods: {
            required: function (b, c, d) {
                if (!this.depend(d, c))return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0
            }, email: function (a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
            }, url: function (a, b) {
                return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a)
            }, date: function (a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
            }, dateISO: function (a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
            }, number: function (a, b) {
                return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            }, digits: function (a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            }, creditcard: function (a, b) {
                if (this.optional(b))return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(a))return !1;
                var c, d, e = 0, f = 0, g = !1;
                if (a = a.replace(/\D/g, ""), a.length < 13 || a.length > 19)return !1;
                for (c = a.length - 1; c >= 0; c--)d = a.charAt(c), f = parseInt(d, 10), g && (f *= 2) > 9 && (f -= 9), e += f, g = !g;
                return e % 10 === 0
            }, minlength: function (b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d
            }, maxlength: function (b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || d >= e
            }, rangelength: function (b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d[0] && e <= d[1]
            }, min: function (a, b, c) {
                return this.optional(b) || a >= c
            }, max: function (a, b, c) {
                return this.optional(b) || c >= a
            }, range: function (a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            }, equalTo: function (b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.off(".validate-equalTo").on("blur.validate-equalTo", function () {
                    a(c).valid()
                }), b === e.val()
            }, remote: function (b, c, d) {
                if (this.optional(c))return "dependency-mismatch";
                var e, f, g = this.previousValue(c);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), g.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = g.message, d = "string" == typeof d && {url: d} || d, g.old === b ? g.valid : (g.old = b, e = this, this.startRequest(c), f = {}, f[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: f,
                    context: e.currentForm,
                    success: function (d) {
                        var f, h, i, j = d === !0 || "true" === d;
                        e.settings.messages[c.name].remote = g.originalMessage, j ? (i = e.formSubmitted, e.prepareElement(c), e.formSubmitted = i, e.successList.push(c), delete e.invalid[c.name], e.showErrors()) : (f = {}, h = d || e.defaultMessage(c, "remote"), f[c.name] = g.message = a.isFunction(h) ? h(b) : h, e.invalid[c.name] = !0, e.showErrors(f)), g.valid = j, e.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    });
    var b, c = {};
    a.ajaxPrefilter ? a.ajaxPrefilter(function (a, b, d) {
        var e = a.port;
        "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
    }) : (b = a.ajax, a.ajax = function (d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode, f = ("port" in d ? d : a.ajaxSettings).port;
        return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
    })
}), $.extend($.validator.messages, {
    required: "Ce champ est obligatoire.",
    remote: "Veuillez corriger ce champ.",
    email: "Veuillez fournir une adresse électronique valide.",
    url: "Veuillez fournir une adresse URL valide.",
    date: "Veuillez fournir une date valide.",
    dateISO: "Veuillez fournir une date valide (ISO).",
    number: "Veuillez fournir un numéro valide.",
    digits: "Veuillez fournir seulement des chiffres.",
    creditcard: "Veuillez fournir un numéro de carte de crédit valide.",
    equalTo: "Veuillez fournir encore la même valeur.",
    extension: "Veuillez fournir une valeur avec une extension valide.",
    maxlength: $.validator.format("Veuillez fournir au plus {0} caractères."),
    minlength: $.validator.format("Veuillez fournir au moins {0} caractères."),
    rangelength: $.validator.format("Veuillez fournir une valeur qui contient entre {0} et {1} caractères."),
    range: $.validator.format("Veuillez fournir une valeur entre {0} et {1}."),
    max: $.validator.format("Veuillez fournir une valeur inférieure ou égale à {0}."),
    min: $.validator.format("Veuillez fournir une valeur supérieure ou égale à {0}."),
    maxWords: $.validator.format("Veuillez fournir au plus {0} mots."),
    minWords: $.validator.format("Veuillez fournir au moins {0} mots."),
    rangeWords: $.validator.format("Veuillez fournir entre {0} et {1} mots."),
    letterswithbasicpunc: "Veuillez fournir seulement des lettres et des signes de ponctuation.",
    alphanumeric: "Veuillez fournir seulement des lettres, nombres, espaces et soulignages.",
    lettersonly: "Veuillez fournir seulement des lettres.",
    nowhitespace: "Veuillez ne pas inscrire d'espaces blancs.",
    ziprange: "Veuillez fournir un code postal entre 902xx-xxxx et 905-xx-xxxx.",
    integer: "Veuillez fournir un nombre non décimal qui est positif ou négatif.",
    vinUS: "Veuillez fournir un numéro d'identification du véhicule (VIN).",
    dateITA: "Veuillez fournir une date valide.",
    time: "Veuillez fournir une heure valide entre 00:00 et 23:59.",
    phoneUS: "Veuillez fournir un numéro de téléphone valide.",
    phoneUK: "Veuillez fournir un numéro de téléphone valide.",
    mobileUK: "Veuillez fournir un numéro de téléphone mobile valide.",
    strippedminlength: $.validator.format("Veuillez fournir au moins {0} caractères."),
    email2: "Veuillez fournir une adresse électronique valide.",
    url2: "Veuillez fournir une adresse URL valide.",
    creditcardtypes: "Veuillez fournir un numéro de carte de crédit valide.",
    ipv4: "Veuillez fournir une adresse IP v4 valide.",
    ipv6: "Veuillez fournir une adresse IP v6 valide.",
    require_from_group: "Veuillez fournir au moins {0} de ces champs.",
    nifES: "Veuillez fournir un numéro NIF valide.",
    nieES: "Veuillez fournir un numéro NIE valide.",
    cifES: "Veuillez fournir un numéro CIF valide.",
    postalCodeCA: "Veuillez fournir un code postal valide."
}), function () {
    function l(a, c) {
        var b = a.split("."), d = k;
        !(b[0] in d) && d.execScript && d.execScript("var " + b[0]);
        for (var e; b.length && (e = b.shift());)b.length || void 0 === c ? d = d[e] ? d[e] : d[e] = {} : d[e] = c
    }

    function q(a, c) {
        this.c = {}, this.a = [];
        var b = arguments.length;
        if (b > 1) {
            if (b % 2)throw Error("Uneven number of arguments");
            for (var d = 0; b > d; d += 2)this.set(arguments[d], arguments[d + 1])
        } else if (a) {
            var e;
            if (a instanceof q)for (r(a), d = a.a.concat(), r(a), e = [], b = 0; b < a.a.length; b++)e.push(a.c[a.a[b]]); else {
                var b = [], g = 0;
                for (d in a)b[g++] = d;
                d = b, b = [], g = 0;
                for (e in a)b[g++] = a[e];
                e = b
            }
            for (b = 0; b < d.length; b++)this.set(d[b], e[b])
        }
    }

    function r(a) {
        if (a.f != a.a.length) {
            for (var c = 0, b = 0; c < a.a.length;) {
                var d = a.a[c];
                t(a.c, d) && (a.a[b++] = d), c++
            }
            a.a.length = b
        }
        if (a.f != a.a.length) {
            for (var e = {}, b = c = 0; c < a.a.length;)d = a.a[c], t(e, d) || (a.a[b++] = d, e[d] = 1), c++;
            a.a.length = b
        }
    }

    function t(a, c) {
        return Object.prototype.hasOwnProperty.call(a, c)
    }

    function y() {
        return k.navigator ? k.navigator.userAgent : null
    }

    function K(a, c) {
        this.b = a || {e: "", prefix: "", host: "", scheme: ""}, this.h(c || {})
    }

    function L(a, c, b, d) {
        var e, g = RegExp(/\[\]$/);
        if (b instanceof Array)n(b, function (b, e) {
            g.test(c) ? d(c, b) : L(a, c + "[" + ("object" == typeof b ? e : "") + "]", b, d)
        }); else if ("object" == typeof b)for (e in b)L(a, c + "[" + e + "]", b[e], d); else d(c, b)
    }

    var i, f = !1, k = this, m = Array.prototype, n = m.forEach ? function (a, c, b) {
        m.forEach.call(a, c, b)
    } : function (a, c, b) {
        for (var d = a.length, e = "string" == typeof a ? a.split("") : a, g = 0; d > g; g++)g in e && c.call(b, e[g], g, a)
    };
    q.prototype.f = 0, q.prototype.p = 0, q.prototype.get = function (a, c) {
        return t(this.c, a) ? this.c[a] : c
    }, q.prototype.set = function (a, c) {
        t(this.c, a) || (this.f++, this.a.push(a), this.p++), this.c[a] = c
    };
    var u, v, w, x;
    x = w = v = u = f;
    var C;
    if (C = y()) {
        var D = k.navigator;
        u = 0 == C.indexOf("Opera"), v = !u && -1 != C.indexOf("MSIE"), w = !u && -1 != C.indexOf("WebKit"), x = !u && !w && "Gecko" == D.product
    }
    var I, E = v, F = x, G = w;
    if (u && k.opera) {
        var J = k.opera.version;
        "function" == typeof J && J()
    } else F ? I = /rv\:([^\);]+)(\)|;)/ : E ? I = /MSIE\s+([^\);]+)(\)|;)/ : G && (I = /WebKit\/(\S+)/), I && I.exec(y());
    K.g = function () {
        return K.j ? K.j : K.j = new K
    }, i = K.prototype, i.h = function (a) {
        this.d = new q(a)
    }, i.o = function () {
        return this.d
    }, i.k = function (a) {
        this.b.e = a
    }, i.n = function () {
        return this.b.e
    }, i.l = function (a) {
        this.b.prefix = a
    }, i.i = function (a) {
        var c = this.b.prefix + a;
        if (t(this.d.c, c))a = c; else if (!t(this.d.c, a))throw Error('The route "' + a + '" does not exist.');
        return this.d.get(a)
    }, i.m = function (a, c, b) {
        var z, d = this.i(a), e = c || {}, g = {};
        for (z in e)g[z] = e[z];
        var h = "", s = !0, j = "";
        n(d.tokens, function (b) {
            if ("text" === b[0])h = b[1] + h, s = f; else {
                if ("variable" !== b[0])throw Error('The token type "' + b[0] + '" is not supported.');
                var c = b[3] in d.defaults;
                if (f === s || !c || b[3] in e && e[b[3]] != d.defaults[b[3]]) {
                    if (b[3] in e) {
                        var c = e[b[3]], p = b[3];
                        p in g && delete g[p]
                    } else {
                        if (!c) {
                            if (s)return;
                            throw Error('The route "' + a + '" requires the parameter "' + b[3] + '".')
                        }
                        c = d.defaults[b[3]]
                    }
                    (!0 !== c && f !== c && "" !== c || !s) && (p = encodeURIComponent(c).replace(/%2F/g, "/"), "null" === p && null === c && (p = ""), h = b[1] + p + h), s = f
                } else c && (b = b[3], b in g && delete g[b])
            }
        }), "" === h && (h = "/"), n(d.hosttokens, function (a) {
            var b;
            if ("text" === a[0])j = a[1] + j; else if ("variable" === a[0]) {
                if (a[3] in e) {
                    b = e[a[3]];
                    var c = a[3];
                    c in g && delete g[c]
                } else a[3] in d.defaults && (b = d.defaults[a[3]]);
                j = a[1] + b + j
            }
        }), h = this.b.e + h, "_scheme" in d.requirements && this.b.scheme != d.requirements._scheme ? h = d.requirements._scheme + "://" + (j || this.b.host) + h : j && this.b.host !== j ? h = this.b.scheme + "://" + j + h : !0 === b && (h = this.b.scheme + "://" + this.b.host + h);
        var A, c = 0;
        for (A in g)c++;
        if (c > 0) {
            var B, H = [];
            A = function (a, b) {
                b = "function" == typeof b ? b() : b, H.push(encodeURIComponent(a) + "=" + encodeURIComponent(null === b ? "" : b))
            };
            for (B in g)L(this, B, g[B], A);
            h = h + "?" + H.join("&").replace(/%20/g, "+")
        }
        return h
    }, l("fos.Router", K), l("fos.Router.setData", function (a) {
        var c = K.g();
        c.k(a.base_url), c.h(a.routes), "prefix" in a && c.l(a.prefix), c.b.host = a.host, c.b.scheme = a.scheme
    }), K.getInstance = K.g, K.prototype.setRoutes = K.prototype.h, K.prototype.getRoutes = K.prototype.o, K.prototype.setBaseUrl = K.prototype.k, K.prototype.getBaseUrl = K.prototype.n, K.prototype.generate = K.prototype.m, K.prototype.setPrefix = K.prototype.l, K.prototype.getRoute = K.prototype.i, window.Routing = K.g()
}(), fos.Router.setData({
    base_url: "",
    routes: {
        restaurants_list: {
            tokens: [["text", "/restaurants/list"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        event_list: {tokens: [["text", "/evenement/liste"]], defaults: [], requirements: [], hosttokens: []},
        event_reserve: {
            tokens: [["variable", "/", "[^/]++", "id"], ["text", "/event/reserve"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        event_applicant_vote: {tokens: [["text", "/evenement/vote"]], defaults: [], requirements: [], hosttokens: []},
        event_reserve_process: {
            tokens: [["variable", "/", "[^/]++", "places"], ["variable", "/", "[^/]++", "id"], ["text", "/evenement/processus-de-reservation"]],
            defaults: {places: 1},
            requirements: {_method: "POST"},
            hosttokens: []
        },
        event_reserve_cancel: {
            tokens: [["variable", "/", "[^/]++", "id"], ["text", "/evenement/annuler-reservation"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        event_photo_items: {
            tokens: [["variable", "/", "[^/]++", "id"], ["text", "/evenement/photos"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        member_search: {tokens: [["text", "/utilisateur/recherche"]], defaults: [], requirements: [], hosttokens: []},
        member_search_id: {
            tokens: [["text", "/utilisateur/recherche-id"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        modal_simple: {
            tokens: [["variable", "/", "[^/]++", "template"], ["text", "/modal/basic"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        modal_login: {tokens: [["text", "/modal/login"]], defaults: [], requirements: [], hosttokens: []},
        modal_contact: {tokens: [["text", "/modal/contact"]], defaults: [], requirements: [], hosttokens: []},
        modal_contact_company: {
            tokens: [["text", "/modal/contact-company"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        modal_resetting_request: {
            tokens: [["text", "/modal/resetting_request"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        modal_reservation_confirmed: {
            tokens: [["variable", "/", "[^/]++", "id"], ["text", "/modal/reservation-confirmed"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        recipe_list: {tokens: [["text", "/my-recipes"]], defaults: [], requirements: [], hosttokens: []},
        recipe_add: {tokens: [["text", "/my-recipes/add"]], defaults: [], requirements: [], hosttokens: []},
        restaurants_name_list: {
            tokens: [["text", "/restaurants/name/list"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        restaurant_owner_admin_edit_capacity: {
            tokens: [["variable", "/", "[^/]++", "event"], ["text", "/restaurateur/edit-capacity"]],
            defaults: [],
            requirements: {_method: "POST"},
            hosttokens: []
        },
        restaurant_owner_admin_applicants_list: {
            tokens: [["variable", "/", "[^/]++", "event"], ["text", "/restaurateur/applicants/list"]],
            defaults: [],
            requirements: {_method: "POST"},
            hosttokens: []
        },
        restaurant_owner_admin_reservations_list: {
            tokens: [["variable", "/", "[^/]++", "event"], ["text", "/restaurateur/reservations/list"]],
            defaults: [],
            requirements: {_method: "POST"},
            hosttokens: []
        },
        restaurant_owner_admin_applicants_save: {
            tokens: [["variable", "/", "[^/]++", "event"], ["text", "/restaurateur/applicants/save"]],
            defaults: [],
            requirements: {_method: "POST"},
            hosttokens: []
        },
        restaurant_owner_admin_event_close: {
            tokens: [["variable", "/", "[^/]++", "event"], ["text", "/restaurateur/event/close"]],
            defaults: [],
            requirements: {_method: "POST"},
            hosttokens: []
        },
        restaurant_owner_admin_event_new: {
            tokens: [["text", "/restaurateur/event/create"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        restaurant_owner_admin_reservations_cancel: {
            tokens: [["variable", "/", "[^/]++", "event"], ["text", "/restaurateur/reservations/cancel"]],
            defaults: [],
            requirements: {_method: "POST"},
            hosttokens: []
        },
        restaurant_owner_restaurant_edit: {
            tokens: [["text", "/restaurateur/restaurant/edit"]],
            defaults: [],
            requirements: [],
            hosttokens: []
        },
        xaben_blog_homepage: {
            tokens: [["variable", "/", "\\d+", "page"], ["text", "/blog"]],
            defaults: {page: 1},
            requirements: {page: "\\d+"},
            hosttokens: []
        }
    },
    prefix: "",
    host: "localhost",
    scheme: "http"
}), function (global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : global.moment = factory()
}(this, function () {
    "use strict";
    function utils_hooks__hooks() {
        return hookCallback.apply(null, arguments)
    }

    function setHookCallback(callback) {
        hookCallback = callback
    }

    function isArray(input) {
        return "[object Array]" === Object.prototype.toString.call(input)
    }

    function isDate(input) {
        return input instanceof Date || "[object Date]" === Object.prototype.toString.call(input)
    }

    function map(arr, fn) {
        var i, res = [];
        for (i = 0; i < arr.length; ++i)res.push(fn(arr[i], i));
        return res
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }

    function extend(a, b) {
        for (var i in b)hasOwnProp(b, i) && (a[i] = b[i]);
        return hasOwnProp(b, "toString") && (a.toString = b.toString), hasOwnProp(b, "valueOf") && (a.valueOf = b.valueOf), a
    }

    function create_utc__createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, !0).utc()
    }

    function defaultParsingFlags() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }

    function getParsingFlags(m) {
        return null == m._pf && (m._pf = defaultParsingFlags()), m._pf
    }

    function valid__isValid(m) {
        if (null == m._isValid) {
            var flags = getParsingFlags(m);
            m._isValid = !(isNaN(m._d.getTime()) || !(flags.overflow < 0) || flags.empty || flags.invalidMonth || flags.invalidWeekday || flags.nullInput || flags.invalidFormat || flags.userInvalidated), m._strict && (m._isValid = m._isValid && 0 === flags.charsLeftOver && 0 === flags.unusedTokens.length && void 0 === flags.bigHour)
        }
        return m._isValid
    }

    function valid__createInvalid(flags) {
        var m = create_utc__createUTC(NaN);
        return null != flags ? extend(getParsingFlags(m), flags) : getParsingFlags(m).userInvalidated = !0, m
    }

    function copyConfig(to, from) {
        var i, prop, val;
        if ("undefined" != typeof from._isAMomentObject && (to._isAMomentObject = from._isAMomentObject), "undefined" != typeof from._i && (to._i = from._i), "undefined" != typeof from._f && (to._f = from._f), "undefined" != typeof from._l && (to._l = from._l), "undefined" != typeof from._strict && (to._strict = from._strict), "undefined" != typeof from._tzm && (to._tzm = from._tzm), "undefined" != typeof from._isUTC && (to._isUTC = from._isUTC), "undefined" != typeof from._offset && (to._offset = from._offset), "undefined" != typeof from._pf && (to._pf = getParsingFlags(from)), "undefined" != typeof from._locale && (to._locale = from._locale), momentProperties.length > 0)for (i in momentProperties)prop = momentProperties[i], val = from[prop], "undefined" != typeof val && (to[prop] = val);
        return to
    }

    function Moment(config) {
        copyConfig(this, config), this._d = new Date(null != config._d ? config._d.getTime() : NaN), updateInProgress === !1 && (updateInProgress = !0, utils_hooks__hooks.updateOffset(this), updateInProgress = !1)
    }

    function isMoment(obj) {
        return obj instanceof Moment || null != obj && null != obj._isAMomentObject
    }

    function absFloor(number) {
        return 0 > number ? Math.ceil(number) : Math.floor(number)
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        return 0 !== coercedNumber && isFinite(coercedNumber) && (value = absFloor(coercedNumber)), value
    }

    function compareArrays(array1, array2, dontConvert) {
        var i, len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0;
        for (i = 0; len > i; i++)(dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) && diffs++;
        return diffs + lengthDiff
    }

    function Locale() {
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key
    }

    function chooseLocale(names) {
        for (var j, next, locale, split, i = 0; i < names.length;) {
            for (split = normalizeLocale(names[i]).split("-"), j = split.length, next = normalizeLocale(names[i + 1]), next = next ? next.split("-") : null; j > 0;) {
                if (locale = loadLocale(split.slice(0, j).join("-")))return locale;
                if (next && next.length >= j && compareArrays(split, next, !0) >= j - 1)break;
                j--
            }
            i++
        }
        return null
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && "undefined" != typeof module && module && module.exports)try {
            oldLocale = globalLocale._abbr, require("./locale/" + name), locale_locales__getSetGlobalLocale(oldLocale)
        } catch (e) {
        }
        return locales[name]
    }

    function locale_locales__getSetGlobalLocale(key, values) {
        var data;
        return key && (data = "undefined" == typeof values ? locale_locales__getLocale(key) : defineLocale(key, values), data && (globalLocale = data)), globalLocale._abbr
    }

    function defineLocale(name, values) {
        return null !== values ? (values.abbr = name, locales[name] = locales[name] || new Locale, locales[name].set(values), locale_locales__getSetGlobalLocale(name), locales[name]) : (delete locales[name], null)
    }

    function locale_locales__getLocale(key) {
        var locale;
        if (key && key._locale && key._locale._abbr && (key = key._locale._abbr), !key)return globalLocale;
        if (!isArray(key)) {
            if (locale = loadLocale(key))return locale;
            key = [key]
        }
        return chooseLocale(key)
    }

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit
    }

    function normalizeUnits(units) {
        return "string" == typeof units ? aliases[units] || aliases[units.toLowerCase()] : void 0
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedProp, prop, normalizedInput = {};
        for (prop in inputObject)hasOwnProp(inputObject, prop) && (normalizedProp = normalizeUnits(prop), normalizedProp && (normalizedInput[normalizedProp] = inputObject[prop]));
        return normalizedInput
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            return null != value ? (get_set__set(this, unit, value), utils_hooks__hooks.updateOffset(this, keepTime), this) : get_set__get(this, unit)
        }
    }

    function get_set__get(mom, unit) {
        return mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]()
    }

    function get_set__set(mom, unit, value) {
        return mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value)
    }

    function getSet(units, value) {
        var unit;
        if ("object" == typeof units)for (unit in units)this.set(unit, units[unit]); else if (units = normalizeUnits(units), "function" == typeof this[units])return this[units](value);
        return this
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign = number >= 0;
        return (sign ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber
    }

    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        "string" == typeof callback && (func = function () {
            return this[callback]()
        }), token && (formatTokenFunctions[token] = func), padded && (formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2])
        }), ordinal && (formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token)
        })
    }

    function removeFormattingTokens(input) {
        return input.match(/\[[\s\S]/) ? input.replace(/^\[|\]$/g, "") : input.replace(/\\/g, "")
    }

    function makeFormatFunction(format) {
        var i, length, array = format.match(formattingTokens);
        for (i = 0, length = array.length; length > i; i++)formatTokenFunctions[array[i]] ? array[i] = formatTokenFunctions[array[i]] : array[i] = removeFormattingTokens(array[i]);
        return function (mom) {
            var output = "";
            for (i = 0; length > i; i++)output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            return output
        }
    }

    function formatMoment(m, format) {
        return m.isValid() ? (format = expandFormat(format, m.localeData()), formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format), formatFunctions[format](m)) : m.localeData().invalidDate()
    }

    function expandFormat(format, locale) {
        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input
        }

        var i = 5;
        for (localFormattingTokens.lastIndex = 0; i >= 0 && localFormattingTokens.test(format);)format = format.replace(localFormattingTokens, replaceLongDateFormatTokens), localFormattingTokens.lastIndex = 0, i -= 1;
        return format
    }

    function isFunction(sth) {
        return "function" == typeof sth && "[object Function]" === Object.prototype.toString.call(sth)
    }

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict) {
            return isStrict && strictRegex ? strictRegex : regex
        }
    }

    function getParseRegexForToken(token, config) {
        return hasOwnProp(regexes, token) ? regexes[token](config._strict, config._locale) : new RegExp(unescapeFormat(token))
    }

    function unescapeFormat(s) {
        return s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function addParseToken(token, callback) {
        var i, func = callback;
        for ("string" == typeof token && (token = [token]), "number" == typeof callback && (func = function (input, array) {
            array[callback] = toInt(input)
        }), i = 0; i < token.length; i++)tokens[token[i]] = func
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {}, callback(input, config._w, config, token)
        })
    }

    function addTimeToArrayFromToken(token, input, config) {
        null != input && hasOwnProp(tokens, token) && tokens[token](input, config._a, config, token)
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    }

    function localeMonths(m) {
        return this._months[m.month()]
    }

    function localeMonthsShort(m) {
        return this._monthsShort[m.month()]
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; 12 > i; i++) {
            if (mom = create_utc__createUTC([2e3, i]), strict && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i")), strict || this._monthsParse[i] || (regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, ""), this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")), strict && "MMMM" === format && this._longMonthsParse[i].test(monthName))return i;
            if (strict && "MMM" === format && this._shortMonthsParse[i].test(monthName))return i;
            if (!strict && this._monthsParse[i].test(monthName))return i
        }
    }

    function setMonth(mom, value) {
        var dayOfMonth;
        return "string" == typeof value && (value = mom.localeData().monthsParse(value), "number" != typeof value) ? mom : (dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value)), mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth), mom)
    }

    function getSetMonth(value) {
        return null != value ? (setMonth(this, value), utils_hooks__hooks.updateOffset(this, !0), this) : get_set__get(this, "Month")
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month())
    }

    function checkOverflow(m) {
        var overflow, a = m._a;
        return a && -2 === getParsingFlags(m).overflow && (overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || 24 === a[HOUR] && (0 !== a[MINUTE] || 0 !== a[SECOND] || 0 !== a[MILLISECOND]) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1, getParsingFlags(m)._overflowDayOfYear && (YEAR > overflow || overflow > DATE) && (overflow = DATE), getParsingFlags(m).overflow = overflow), m
    }

    function warn(msg) {
        utils_hooks__hooks.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + msg)
    }

    function deprecate(msg, fn) {
        var firstTime = !0;
        return extend(function () {
            return firstTime && (warn(msg + "\n" + (new Error).stack), firstTime = !1), fn.apply(this, arguments)
        }, fn)
    }

    function deprecateSimple(name, msg) {
        deprecations[name] || (warn(msg), deprecations[name] = !0)
    }

    function configFromISO(config) {
        var i, l, string = config._i, match = from_string__isoRegex.exec(string);
        if (match) {
            for (getParsingFlags(config).iso = !0, i = 0, l = isoDates.length; l > i; i++)if (isoDates[i][1].exec(string)) {
                config._f = isoDates[i][0];
                break
            }
            for (i = 0, l = isoTimes.length; l > i; i++)if (isoTimes[i][1].exec(string)) {
                config._f += (match[6] || " ") + isoTimes[i][0];
                break
            }
            string.match(matchOffset) && (config._f += "Z"), configFromStringAndFormat(config)
        } else config._isValid = !1
    }

    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        return null !== matched ? void(config._d = new Date(+matched[1])) : (configFromISO(config), void(config._isValid === !1 && (delete config._isValid, utils_hooks__hooks.createFromInputFallback(config))))
    }

    function createDate(y, m, d, h, M, s, ms) {
        var date = new Date(y, m, d, h, M, s, ms);
        return 1970 > y && date.setFullYear(y), date
    }

    function createUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        return 1970 > y && date.setUTCFullYear(y), date
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365
    }

    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
    }

    function getIsLeapYear() {
        return isLeapYear(this.year())
    }

    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var adjustedMoment, end = firstDayOfWeekOfYear - firstDayOfWeek, daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();
        return daysToDayOfWeek > end && (daysToDayOfWeek -= 7), end - 7 > daysToDayOfWeek && (daysToDayOfWeek += 7), adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, "d"), {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        }
    }

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week
    }

    function localeFirstDayOfWeek() {
        return this._week.dow
    }

    function localeFirstDayOfYear() {
        return this._week.doy
    }

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return null == input ? week : this.add(7 * (input - week), "d")
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return null == input ? week : this.add(7 * (input - week), "d")
    }

    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var dayOfYear, week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay();
        return firstDayOfWeek > d && (d += 7), weekday = null != weekday ? 1 * weekday : firstDayOfWeek, dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday, {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
        }
    }

    function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == input ? dayOfYear : this.add(input - dayOfYear, "d")
    }

    function defaults(a, b, c) {
        return null != a ? a : null != b ? b : c
    }

    function currentDateArray(config) {
        var now = new Date;
        return config._useUTC ? [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()] : [now.getFullYear(), now.getMonth(), now.getDate()]
    }

    function configFromArray(config) {
        var i, date, currentDate, yearToUse, input = [];
        if (!config._d) {
            for (currentDate = currentDateArray(config), config._w && null == config._a[DATE] && null == config._a[MONTH] && dayOfYearFromWeekInfo(config), config._dayOfYear && (yearToUse = defaults(config._a[YEAR], currentDate[YEAR]), config._dayOfYear > daysInYear(yearToUse) && (getParsingFlags(config)._overflowDayOfYear = !0), date = createUTCDate(yearToUse, 0, config._dayOfYear), config._a[MONTH] = date.getUTCMonth(), config._a[DATE] = date.getUTCDate()), i = 0; 3 > i && null == config._a[i]; ++i)config._a[i] = input[i] = currentDate[i];
            for (; 7 > i; i++)config._a[i] = input[i] = null == config._a[i] ? 2 === i ? 1 : 0 : config._a[i];
            24 === config._a[HOUR] && 0 === config._a[MINUTE] && 0 === config._a[SECOND] && 0 === config._a[MILLISECOND] && (config._nextDay = !0, config._a[HOUR] = 0), config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input), null != config._tzm && config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm), config._nextDay && (config._a[HOUR] = 24)
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;
        w = config._w, null != w.GG || null != w.W || null != w.E ? (dow = 1, doy = 4, weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year), week = defaults(w.W, 1), weekday = defaults(w.E, 1)) : (dow = config._locale._week.dow, doy = config._locale._week.doy, weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year), week = defaults(w.w, 1), null != w.d ? (weekday = w.d, dow > weekday && ++week) : weekday = null != w.e ? w.e + dow : dow), temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow), config._a[YEAR] = temp.year, config._dayOfYear = temp.dayOfYear
    }

    function configFromStringAndFormat(config) {
        if (config._f === utils_hooks__hooks.ISO_8601)return void configFromISO(config);
        config._a = [], getParsingFlags(config).empty = !0;
        var i, parsedInput, tokens, token, skipped, string = "" + config._i, stringLength = string.length, totalParsedInputLength = 0;
        for (tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [], i = 0; i < tokens.length; i++)token = tokens[i], parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0], parsedInput && (skipped = string.substr(0, string.indexOf(parsedInput)), skipped.length > 0 && getParsingFlags(config).unusedInput.push(skipped), string = string.slice(string.indexOf(parsedInput) + parsedInput.length), totalParsedInputLength += parsedInput.length), formatTokenFunctions[token] ? (parsedInput ? getParsingFlags(config).empty = !1 : getParsingFlags(config).unusedTokens.push(token), addTimeToArrayFromToken(token, parsedInput, config)) : config._strict && !parsedInput && getParsingFlags(config).unusedTokens.push(token);
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength, string.length > 0 && getParsingFlags(config).unusedInput.push(string), getParsingFlags(config).bigHour === !0 && config._a[HOUR] <= 12 && config._a[HOUR] > 0 && (getParsingFlags(config).bigHour = void 0), config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem), configFromArray(config), checkOverflow(config)
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        return null == meridiem ? hour : null != locale.meridiemHour ? locale.meridiemHour(hour, meridiem) : null != locale.isPM ? (isPm = locale.isPM(meridiem), isPm && 12 > hour && (hour += 12), isPm || 12 !== hour || (hour = 0), hour) : hour
    }

    function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;
        if (0 === config._f.length)return getParsingFlags(config).invalidFormat = !0, void(config._d = new Date(NaN));
        for (i = 0; i < config._f.length; i++)currentScore = 0, tempConfig = copyConfig({}, config), null != config._useUTC && (tempConfig._useUTC = config._useUTC), tempConfig._f = config._f[i], configFromStringAndFormat(tempConfig), valid__isValid(tempConfig) && (currentScore += getParsingFlags(tempConfig).charsLeftOver, currentScore += 10 * getParsingFlags(tempConfig).unusedTokens.length, getParsingFlags(tempConfig).score = currentScore, (null == scoreToBeat || scoreToBeat > currentScore) && (scoreToBeat = currentScore, bestMoment = tempConfig));
        extend(config, bestMoment || tempConfig)
    }

    function configFromObject(config) {
        if (!config._d) {
            var i = normalizeObjectUnits(config._i);
            config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], configFromArray(config)
        }
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        return res._nextDay && (res.add(1, "d"), res._nextDay = void 0), res
    }

    function prepareConfig(config) {
        var input = config._i, format = config._f;
        return config._locale = config._locale || locale_locales__getLocale(config._l), null === input || void 0 === format && "" === input ? valid__createInvalid({nullInput: !0}) : ("string" == typeof input && (config._i = input = config._locale.preparse(input)), isMoment(input) ? new Moment(checkOverflow(input)) : (isArray(format) ? configFromStringAndArray(config) : format ? configFromStringAndFormat(config) : isDate(input) ? config._d = input : configFromInput(config), config))
    }

    function configFromInput(config) {
        var input = config._i;
        void 0 === input ? config._d = new Date : isDate(input) ? config._d = new Date(+input) : "string" == typeof input ? configFromString(config) : isArray(input) ? (config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10)
        }), configFromArray(config)) : "object" == typeof input ? configFromObject(config) : "number" == typeof input ? config._d = new Date(input) : utils_hooks__hooks.createFromInputFallback(config)
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};
        return "boolean" == typeof locale && (strict = locale, locale = void 0), c._isAMomentObject = !0, c._useUTC = c._isUTC = isUTC, c._l = locale, c._i = input, c._f = format, c._strict = strict, createFromConfig(c)
    }

    function local__createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, !1)
    }

    function pickBy(fn, moments) {
        var res, i;
        if (1 === moments.length && isArray(moments[0]) && (moments = moments[0]), !moments.length)return local__createLocal();
        for (res = moments[0], i = 1; i < moments.length; ++i)moments[i].isValid() && !moments[i][fn](res) || (res = moments[i]);
        return res
    }

    function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args)
    }

    function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args)
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
        this._milliseconds = +milliseconds + 1e3 * seconds + 6e4 * minutes + 36e5 * hours, this._days = +days + 7 * weeks, this._months = +months + 3 * quarters + 12 * years, this._data = {}, this._locale = locale_locales__getLocale(), this._bubble()
    }

    function isDuration(obj) {
        return obj instanceof Duration
    }

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(), sign = "+";
            return 0 > offset && (offset = -offset, sign = "-"), sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2)
        })
    }

    function offsetFromString(string) {
        var matches = (string || "").match(matchOffset) || [], chunk = matches[matches.length - 1] || [], parts = (chunk + "").match(chunkOffset) || ["-", 0, 0], minutes = +(60 * parts[1]) + toInt(parts[2]);
        return "+" === parts[0] ? minutes : -minutes
    }

    function cloneWithOffset(input, model) {
        var res, diff;
        return model._isUTC ? (res = model.clone(), diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - +res, res._d.setTime(+res._d + diff), utils_hooks__hooks.updateOffset(res, !1), res) : local__createLocal(input).local()
    }

    function getDateOffset(m) {
        return 15 * -Math.round(m._d.getTimezoneOffset() / 15)
    }

    function getSetOffset(input, keepLocalTime) {
        var localAdjust, offset = this._offset || 0;
        return null != input ? ("string" == typeof input && (input = offsetFromString(input)), Math.abs(input) < 16 && (input = 60 * input), !this._isUTC && keepLocalTime && (localAdjust = getDateOffset(this)), this._offset = input, this._isUTC = !0, null != localAdjust && this.add(localAdjust, "m"), offset !== input && (!keepLocalTime || this._changeInProgress ? add_subtract__addSubtract(this, create__createDuration(input - offset, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, utils_hooks__hooks.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? offset : getDateOffset(this)
    }

    function getSetZone(input, keepLocalTime) {
        return null != input ? ("string" != typeof input && (input = -input), this.utcOffset(input, keepLocalTime), this) : -this.utcOffset()
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime)
    }

    function setOffsetToLocal(keepLocalTime) {
        return this._isUTC && (this.utcOffset(0, keepLocalTime), this._isUTC = !1, keepLocalTime && this.subtract(getDateOffset(this), "m")), this
    }

    function setOffsetToParsedOffset() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(offsetFromString(this._i)), this
    }

    function hasAlignedHourOffset(input) {
        return input = input ? local__createLocal(input).utcOffset() : 0, (this.utcOffset() - input) % 60 === 0
    }

    function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }

    function isDaylightSavingTimeShifted() {
        if ("undefined" != typeof this._isDSTShifted)return this._isDSTShifted;
        var c = {};
        if (copyConfig(c, this), c = prepareConfig(c), c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    }

    function isLocal() {
        return !this._isUTC
    }

    function isUtcOffset() {
        return this._isUTC
    }

    function isUtc() {
        return this._isUTC && 0 === this._offset
    }

    function create__createDuration(input, key) {
        var sign, ret, diffRes, duration = input, match = null;
        return isDuration(input) ? duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
        } : "number" == typeof input ? (duration = {}, key ? duration[key] = input : duration.milliseconds = input) : (match = aspNetRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1, duration = {
            y: 0,
            d: toInt(match[DATE]) * sign,
            h: toInt(match[HOUR]) * sign,
            m: toInt(match[MINUTE]) * sign,
            s: toInt(match[SECOND]) * sign,
            ms: toInt(match[MILLISECOND]) * sign
        }) : (match = create__isoRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1, duration = {
            y: parseIso(match[2], sign),
            M: parseIso(match[3], sign),
            d: parseIso(match[4], sign),
            h: parseIso(match[5], sign),
            m: parseIso(match[6], sign),
            s: parseIso(match[7], sign),
            w: parseIso(match[8], sign)
        }) : null == duration ? duration = {} : "object" == typeof duration && ("from" in duration || "to" in duration) && (diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to)), duration = {}, duration.ms = diffRes.milliseconds, duration.M = diffRes.months), ret = new Duration(duration), isDuration(input) && hasOwnProp(input, "_locale") && (ret._locale = input._locale), ret
    }

    function parseIso(inp, sign) {
        var res = inp && parseFloat(inp.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};
        return res.months = other.month() - base.month() + 12 * (other.year() - base.year()), base.clone().add(res.months, "M").isAfter(other) && --res.months, res.milliseconds = +other - +base.clone().add(res.months, "M"), res
    }

    function momentsDifference(base, other) {
        var res;
        return other = cloneWithOffset(other, base), base.isBefore(other) ? res = positiveMomentsDifference(base, other) : (res = positiveMomentsDifference(other, base), res.milliseconds = -res.milliseconds, res.months = -res.months), res
    }

    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            return null === period || isNaN(+period) || (deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period)."), tmp = val, val = period, period = tmp), val = "string" == typeof val ? +val : val, dur = create__createDuration(val, period), add_subtract__addSubtract(this, dur, direction), this
        }
    }

    function add_subtract__addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds, days = duration._days, months = duration._months;
        updateOffset = null == updateOffset ? !0 : updateOffset, milliseconds && mom._d.setTime(+mom._d + milliseconds * isAdding), days && get_set__set(mom, "Date", get_set__get(mom, "Date") + days * isAdding), months && setMonth(mom, get_set__get(mom, "Month") + months * isAdding), updateOffset && utils_hooks__hooks.updateOffset(mom, days || months)
    }

    function moment_calendar__calendar(time, formats) {
        var now = time || local__createLocal(), sod = cloneWithOffset(now, this).startOf("day"), diff = this.diff(sod, "days", !0), format = -6 > diff ? "sameElse" : -1 > diff ? "lastWeek" : 0 > diff ? "lastDay" : 1 > diff ? "sameDay" : 2 > diff ? "nextDay" : 7 > diff ? "nextWeek" : "sameElse";
        return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)))
    }

    function clone() {
        return new Moment(this)
    }

    function isAfter(input, units) {
        var inputMs;
        return units = normalizeUnits("undefined" != typeof units ? units : "millisecond"), "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), +this > +input) : (inputMs = isMoment(input) ? +input : +local__createLocal(input), inputMs < +this.clone().startOf(units))
    }

    function isBefore(input, units) {
        var inputMs;
        return units = normalizeUnits("undefined" != typeof units ? units : "millisecond"), "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), +input > +this) : (inputMs = isMoment(input) ? +input : +local__createLocal(input), +this.clone().endOf(units) < inputMs)
    }

    function isBetween(from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units)
    }

    function isSame(input, units) {
        var inputMs;
        return units = normalizeUnits(units || "millisecond"), "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), +this === +input) : (inputMs = +local__createLocal(input), +this.clone().startOf(units) <= inputMs && inputMs <= +this.clone().endOf(units))
    }

    function diff(input, units, asFloat) {
        var delta, output, that = cloneWithOffset(input, this), zoneDelta = 6e4 * (that.utcOffset() - this.utcOffset());
        return units = normalizeUnits(units), "year" === units || "month" === units || "quarter" === units ? (output = monthDiff(this, that), "quarter" === units ? output /= 3 : "year" === units && (output /= 12)) : (delta = this - that, output = "second" === units ? delta / 1e3 : "minute" === units ? delta / 6e4 : "hour" === units ? delta / 36e5 : "day" === units ? (delta - zoneDelta) / 864e5 : "week" === units ? (delta - zoneDelta) / 6048e5 : delta), asFloat ? output : absFloor(output)
    }

    function monthDiff(a, b) {
        var anchor2, adjust, wholeMonthDiff = 12 * (b.year() - a.year()) + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months");
        return 0 > b - anchor ? (anchor2 = a.clone().add(wholeMonthDiff - 1, "months"), adjust = (b - anchor) / (anchor - anchor2)) : (anchor2 = a.clone().add(wholeMonthDiff + 1, "months"), adjust = (b - anchor) / (anchor2 - anchor)), -(wholeMonthDiff + adjust)
    }

    function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function moment_format__toISOString() {
        var m = this.clone().utc();
        return 0 < m.year() && m.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }

    function format(inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output)
    }

    function from(time, withoutSuffix) {
        return this.isValid() ? create__createDuration({
            to: this,
            from: time
        }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate()
    }

    function fromNow(withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix)
    }

    function to(time, withoutSuffix) {
        return this.isValid() ? create__createDuration({
            from: this,
            to: time
        }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate()
    }

    function toNow(withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix)
    }

    function locale(key) {
        var newLocaleData;
        return void 0 === key ? this._locale._abbr : (newLocaleData = locale_locales__getLocale(key), null != newLocaleData && (this._locale = newLocaleData), this)
    }

    function localeData() {
        return this._locale
    }

    function startOf(units) {
        switch (units = normalizeUnits(units)) {
            case"year":
                this.month(0);
            case"quarter":
            case"month":
                this.date(1);
            case"week":
            case"isoWeek":
            case"day":
                this.hours(0);
            case"hour":
                this.minutes(0);
            case"minute":
                this.seconds(0);
            case"second":
                this.milliseconds(0)
        }
        return "week" === units && this.weekday(0), "isoWeek" === units && this.isoWeekday(1), "quarter" === units && this.month(3 * Math.floor(this.month() / 3)), this
    }

    function endOf(units) {
        return units = normalizeUnits(units), void 0 === units || "millisecond" === units ? this : this.startOf(units).add(1, "isoWeek" === units ? "week" : units).subtract(1, "ms")
    }

    function to_type__valueOf() {
        return +this._d - 6e4 * (this._offset || 0)
    }

    function unix() {
        return Math.floor(+this / 1e3)
    }

    function toDate() {
        return this._offset ? new Date(+this) : this._d
    }

    function toArray() {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()]
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        }
    }

    function moment_valid__isValid() {
        return valid__isValid(this)
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this))
    }

    function invalidAt() {
        return getParsingFlags(this).overflow
    }

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter)
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week
    }

    function getSetWeekYear(input) {
        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return null == input ? year : this.add(input - year, "y")
    }

    function getSetISOWeekYear(input) {
        var year = weekOfYear(this, 1, 4).year;
        return null == input ? year : this.add(input - year, "y")
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4)
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy)
    }

    function getSetQuarter(input) {
        return null == input ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (input - 1) + this.month() % 3)
    }

    function parseWeekday(input, locale) {
        return "string" != typeof input ? input : isNaN(input) ? (input = locale.weekdaysParse(input), "number" == typeof input ? input : null) : parseInt(input, 10)
    }

    function localeWeekdays(m) {
        return this._weekdays[m.day()]
    }

    function localeWeekdaysShort(m) {
        return this._weekdaysShort[m.day()]
    }

    function localeWeekdaysMin(m) {
        return this._weekdaysMin[m.day()]
    }

    function localeWeekdaysParse(weekdayName) {
        var i, mom, regex;
        for (this._weekdaysParse = this._weekdaysParse || [], i = 0; 7 > i; i++)if (this._weekdaysParse[i] || (mom = local__createLocal([2e3, 1]).day(i), regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, ""), this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")), this._weekdaysParse[i].test(weekdayName))return i
    }

    function getSetDayOfWeek(input) {
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != input ? (input = parseWeekday(input, this.localeData()), this.add(input - day, "d")) : day
    }

    function getSetLocaleDayOfWeek(input) {
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == input ? weekday : this.add(input - weekday, "d")
    }

    function getSetISODayOfWeek(input) {
        return null == input ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7)
    }

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase)
        })
    }

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse
    }

    function localeIsPM(input) {
        return "p" === (input + "").toLowerCase().charAt(0)
    }

    function localeMeridiem(hours, minutes, isLower) {
        return hours > 11 ? isLower ? "pm" : "PM" : isLower ? "am" : "AM"
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(1e3 * ("0." + input))
    }

    function getZoneAbbr() {
        return this._isUTC ? "UTC" : ""
    }

    function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }

    function moment__createUnix(input) {
        return local__createLocal(1e3 * input)
    }

    function moment__createInZone() {
        return local__createLocal.apply(null, arguments).parseZone()
    }

    function locale_calendar__calendar(key, mom, now) {
        var output = this._calendar[key];
        return "function" == typeof output ? output.call(mom, now) : output
    }

    function longDateFormat(key) {
        var format = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        return format || !formatUpper ? format : (this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1)
        }), this._longDateFormat[key])
    }

    function invalidDate() {
        return this._invalidDate
    }

    function ordinal(number) {
        return this._ordinal.replace("%d", number)
    }

    function preParsePostFormat(string) {
        return string
    }

    function relative__relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return "function" == typeof output ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number)
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? "future" : "past"];
        return "function" == typeof format ? format(output) : format.replace(/%s/i, output)
    }

    function locale_set__set(config) {
        var prop, i;
        for (i in config)prop = config[i], "function" == typeof prop ? this[i] = prop : this["_" + i] = prop;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }

    function lists__get(format, index, field, setter) {
        var locale = locale_locales__getLocale(), utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format)
    }

    function list(format, index, field, count, setter) {
        if ("number" == typeof format && (index = format, format = void 0), format = format || "", null != index)return lists__get(format, index, field, setter);
        var i, out = [];
        for (i = 0; count > i; i++)out[i] = lists__get(format, i, field, setter);
        return out
    }

    function lists__listMonths(format, index) {
        return list(format, index, "months", 12, "month")
    }

    function lists__listMonthsShort(format, index) {
        return list(format, index, "monthsShort", 12, "month")
    }

    function lists__listWeekdays(format, index) {
        return list(format, index, "weekdays", 7, "day")
    }

    function lists__listWeekdaysShort(format, index) {
        return list(format, index, "weekdaysShort", 7, "day")
    }

    function lists__listWeekdaysMin(format, index) {
        return list(format, index, "weekdaysMin", 7, "day")
    }

    function duration_abs__abs() {
        var data = this._data;
        return this._milliseconds = mathAbs(this._milliseconds), this._days = mathAbs(this._days), this._months = mathAbs(this._months), data.milliseconds = mathAbs(data.milliseconds), data.seconds = mathAbs(data.seconds), data.minutes = mathAbs(data.minutes), data.hours = mathAbs(data.hours), data.months = mathAbs(data.months), data.years = mathAbs(data.years), this
    }

    function duration_add_subtract__addSubtract(duration, input, value, direction) {
        var other = create__createDuration(input, value);
        return duration._milliseconds += direction * other._milliseconds, duration._days += direction * other._days, duration._months += direction * other._months, duration._bubble()
    }

    function duration_add_subtract__add(input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1)
    }

    function duration_add_subtract__subtract(input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1)
    }

    function absCeil(number) {
        return 0 > number ? Math.floor(number) : Math.ceil(number)
    }

    function bubble() {
        var seconds, minutes, hours, years, monthsFromDays, milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data;
        return milliseconds >= 0 && days >= 0 && months >= 0 || 0 >= milliseconds && 0 >= days && 0 >= months || (milliseconds += 864e5 * absCeil(monthsToDays(months) + days), days = 0, months = 0), data.milliseconds = milliseconds % 1e3, seconds = absFloor(milliseconds / 1e3), data.seconds = seconds % 60, minutes = absFloor(seconds / 60), data.minutes = minutes % 60, hours = absFloor(minutes / 60), data.hours = hours % 24, days += absFloor(hours / 24), monthsFromDays = absFloor(daysToMonths(days)), months += monthsFromDays, days -= absCeil(monthsToDays(monthsFromDays)), years = absFloor(months / 12), months %= 12, data.days = days, data.months = months, data.years = years, this
    }

    function daysToMonths(days) {
        return 4800 * days / 146097
    }

    function monthsToDays(months) {
        return 146097 * months / 4800
    }

    function as(units) {
        var days, months, milliseconds = this._milliseconds;
        if (units = normalizeUnits(units), "month" === units || "year" === units)return days = this._days + milliseconds / 864e5, months = this._months + daysToMonths(days), "month" === units ? months : months / 12;
        switch (days = this._days + Math.round(monthsToDays(this._months)), units) {
            case"week":
                return days / 7 + milliseconds / 6048e5;
            case"day":
                return days + milliseconds / 864e5;
            case"hour":
                return 24 * days + milliseconds / 36e5;
            case"minute":
                return 1440 * days + milliseconds / 6e4;
            case"second":
                return 86400 * days + milliseconds / 1e3;
            case"millisecond":
                return Math.floor(864e5 * days) + milliseconds;
            default:
                throw new Error("Unknown unit " + units)
        }
    }

    function duration_as__valueOf() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12)
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias)
        }
    }

    function duration_get__get(units) {
        return units = normalizeUnits(units), this[units + "s"]()
    }

    function makeGetter(name) {
        return function () {
            return this._data[name]
        }
    }

    function weeks() {
        return absFloor(this.days() / 7)
    }

    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture)
    }

    function duration_humanize__relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs(), seconds = round(duration.as("s")), minutes = round(duration.as("m")), hours = round(duration.as("h")), days = round(duration.as("d")), months = round(duration.as("M")), years = round(duration.as("y")), a = seconds < thresholds.s && ["s", seconds] || 1 === minutes && ["m"] || minutes < thresholds.m && ["mm", minutes] || 1 === hours && ["h"] || hours < thresholds.h && ["hh", hours] || 1 === days && ["d"] || days < thresholds.d && ["dd", days] || 1 === months && ["M"] || months < thresholds.M && ["MM", months] || 1 === years && ["y"] || ["yy", years];
        return a[2] = withoutSuffix, a[3] = +posNegDuration > 0, a[4] = locale, substituteTimeAgo.apply(null, a)
    }

    function duration_humanize__getSetRelativeTimeThreshold(threshold, limit) {
        return void 0 === thresholds[threshold] ? !1 : void 0 === limit ? thresholds[threshold] : (thresholds[threshold] = limit, !0)
    }

    function humanize(withSuffix) {
        var locale = this.localeData(), output = duration_humanize__relativeTime(this, !withSuffix, locale);
        return withSuffix && (output = locale.pastFuture(+this, output)), locale.postformat(output)
    }

    function iso_string__toISOString() {
        var minutes, hours, years, seconds = iso_string__abs(this._milliseconds) / 1e3, days = iso_string__abs(this._days), months = iso_string__abs(this._months);
        minutes = absFloor(seconds / 60), hours = absFloor(minutes / 60), seconds %= 60, minutes %= 60, years = absFloor(months / 12), months %= 12;
        var Y = years, M = months, D = days, h = hours, m = minutes, s = seconds, total = this.asSeconds();
        return total ? (0 > total ? "-" : "") + "P" + (Y ? Y + "Y" : "") + (M ? M + "M" : "") + (D ? D + "D" : "") + (h || m || s ? "T" : "") + (h ? h + "H" : "") + (m ? m + "M" : "") + (s ? s + "S" : "") : "P0D"
    }

    var hookCallback, globalLocale, momentProperties = utils_hooks__hooks.momentProperties = [], updateInProgress = !1, locales = {}, aliases = {}, formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {}, match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, regexes = {}, tokens = {}, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6;
    addFormatToken("M", ["MM", 2], "Mo", function () {
        return this.month() + 1
    }), addFormatToken("MMM", 0, 0, function (format) {
        return this.localeData().monthsShort(this, format)
    }), addFormatToken("MMMM", 0, 0, function (format) {
        return this.localeData().months(this, format)
    }), addUnitAlias("month", "M"), addRegexToken("M", match1to2), addRegexToken("MM", match1to2, match2), addRegexToken("MMM", matchWord), addRegexToken("MMMM", matchWord), addParseToken(["M", "MM"], function (input, array) {
        array[MONTH] = toInt(input) - 1
    }), addParseToken(["MMM", "MMMM"], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        null != month ? array[MONTH] = month : getParsingFlags(config).invalidMonth = input
    });
    var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), deprecations = {};
    utils_hooks__hooks.suppressDeprecationWarnings = !1;
    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, isoDates = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], isoTimes = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
    utils_hooks__hooks.createFromInputFallback = deprecate("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (config) {
        config._d = new Date(config._i + (config._useUTC ? " UTC" : ""))
    }), addFormatToken(0, ["YY", 2], 0, function () {
        return this.year() % 100
    }), addFormatToken(0, ["YYYY", 4], 0, "year"), addFormatToken(0, ["YYYYY", 5], 0, "year"), addFormatToken(0, ["YYYYYY", 6, !0], 0, "year"), addUnitAlias("year", "y"), addRegexToken("Y", matchSigned), addRegexToken("YY", match1to2, match2), addRegexToken("YYYY", match1to4, match4), addRegexToken("YYYYY", match1to6, match6), addRegexToken("YYYYYY", match1to6, match6), addParseToken(["YYYYY", "YYYYYY"], YEAR), addParseToken("YYYY", function (input, array) {
        array[YEAR] = 2 === input.length ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input)
    }), addParseToken("YY", function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input)
    }), utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3)
    };
    var getSetYear = makeGetSet("FullYear", !1);
    addFormatToken("w", ["ww", 2], "wo", "week"), addFormatToken("W", ["WW", 2], "Wo", "isoWeek"), addUnitAlias("week", "w"), addUnitAlias("isoWeek", "W"), addRegexToken("w", match1to2), addRegexToken("ww", match1to2, match2), addRegexToken("W", match1to2), addRegexToken("WW", match1to2, match2), addWeekParseToken(["w", "ww", "W", "WW"], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input)
    });
    var defaultLocaleWeek = {dow: 0, doy: 6};
    addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), addUnitAlias("dayOfYear", "DDD"), addRegexToken("DDD", match1to3), addRegexToken("DDDD", match3), addParseToken(["DDD", "DDDD"], function (input, array, config) {
        config._dayOfYear = toInt(input)
    }), utils_hooks__hooks.ISO_8601 = function () {
    };
    var prototypeMin = deprecate("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
        var other = local__createLocal.apply(null, arguments);
        return this > other ? this : other
    }), prototypeMax = deprecate("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
        var other = local__createLocal.apply(null, arguments);
        return other > this ? this : other
    });
    offset("Z", ":"), offset("ZZ", ""), addRegexToken("Z", matchOffset), addRegexToken("ZZ", matchOffset), addParseToken(["Z", "ZZ"], function (input, array, config) {
        config._useUTC = !0, config._tzm = offsetFromString(input)
    });
    var chunkOffset = /([\+\-]|\d\d)/gi;
    utils_hooks__hooks.updateOffset = function () {
    };
    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    create__createDuration.fn = Duration.prototype;
    var add_subtract__add = createAdder(1, "add"), add_subtract__subtract = createAdder(-1, "subtract");
    utils_hooks__hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (key) {
        return void 0 === key ? this.localeData() : this.locale(key)
    });
    addFormatToken(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100
    }), addFormatToken(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100
    }), addWeekYearFormatToken("gggg", "weekYear"), addWeekYearFormatToken("ggggg", "weekYear"), addWeekYearFormatToken("GGGG", "isoWeekYear"), addWeekYearFormatToken("GGGGG", "isoWeekYear"), addUnitAlias("weekYear", "gg"), addUnitAlias("isoWeekYear", "GG"), addRegexToken("G", matchSigned), addRegexToken("g", matchSigned), addRegexToken("GG", match1to2, match2), addRegexToken("gg", match1to2, match2), addRegexToken("GGGG", match1to4, match4), addRegexToken("gggg", match1to4, match4), addRegexToken("GGGGG", match1to6, match6), addRegexToken("ggggg", match1to6, match6), addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input)
    }), addWeekParseToken(["gg", "GG"], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input)
    }), addFormatToken("Q", 0, 0, "quarter"), addUnitAlias("quarter", "Q"), addRegexToken("Q", match1), addParseToken("Q", function (input, array) {
        array[MONTH] = 3 * (toInt(input) - 1)
    }), addFormatToken("D", ["DD", 2], "Do", "date"), addUnitAlias("date", "D"), addRegexToken("D", match1to2), addRegexToken("DD", match1to2, match2), addRegexToken("Do", function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient
    }), addParseToken(["D", "DD"], DATE), addParseToken("Do", function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10)
    });
    var getSetDayOfMonth = makeGetSet("Date", !0);
    addFormatToken("d", 0, "do", "day"), addFormatToken("dd", 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format)
    }), addFormatToken("ddd", 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format)
    }), addFormatToken("dddd", 0, 0, function (format) {
        return this.localeData().weekdays(this, format)
    }), addFormatToken("e", 0, 0, "weekday"), addFormatToken("E", 0, 0, "isoWeekday"), addUnitAlias("day", "d"), addUnitAlias("weekday", "e"), addUnitAlias("isoWeekday", "E"), addRegexToken("d", match1to2), addRegexToken("e", match1to2), addRegexToken("E", match1to2), addRegexToken("dd", matchWord), addRegexToken("ddd", matchWord), addRegexToken("dddd", matchWord), addWeekParseToken(["dd", "ddd", "dddd"], function (input, week, config) {
        var weekday = config._locale.weekdaysParse(input);
        null != weekday ? week.d = weekday : getParsingFlags(config).invalidWeekday = input
    }), addWeekParseToken(["d", "e", "E"], function (input, week, config, token) {
        week[token] = toInt(input)
    });
    var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    addFormatToken("H", ["HH", 2], 0, "hour"), addFormatToken("h", ["hh", 2], 0, function () {
        return this.hours() % 12 || 12
    }), meridiem("a", !0), meridiem("A", !1), addUnitAlias("hour", "h"), addRegexToken("a", matchMeridiem), addRegexToken("A", matchMeridiem), addRegexToken("H", match1to2), addRegexToken("h", match1to2), addRegexToken("HH", match1to2, match2), addRegexToken("hh", match1to2, match2), addParseToken(["H", "HH"], HOUR), addParseToken(["a", "A"], function (input, array, config) {
        config._isPm = config._locale.isPM(input), config._meridiem = input
    }), addParseToken(["h", "hh"], function (input, array, config) {
        array[HOUR] = toInt(input), getParsingFlags(config).bigHour = !0
    });
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", !0);
    addFormatToken("m", ["mm", 2], 0, "minute"), addUnitAlias("minute", "m"), addRegexToken("m", match1to2), addRegexToken("mm", match1to2, match2), addParseToken(["m", "mm"], MINUTE);
    var getSetMinute = makeGetSet("Minutes", !1);
    addFormatToken("s", ["ss", 2], 0, "second"), addUnitAlias("second", "s"), addRegexToken("s", match1to2), addRegexToken("ss", match1to2, match2), addParseToken(["s", "ss"], SECOND);
    var getSetSecond = makeGetSet("Seconds", !1);
    addFormatToken("S", 0, 0, function () {
        return ~~(this.millisecond() / 100)
    }), addFormatToken(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10)
    }), addFormatToken(0, ["SSS", 3], 0, "millisecond"), addFormatToken(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond()
    }), addFormatToken(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond()
    }), addFormatToken(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond()
    }), addFormatToken(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond()
    }), addFormatToken(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond()
    }), addFormatToken(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond()
    }), addUnitAlias("millisecond", "ms"), addRegexToken("S", match1to3, match1), addRegexToken("SS", match1to3, match2), addRegexToken("SSS", match1to3, match3);
    var token;
    for (token = "SSSS"; token.length <= 9; token += "S")addRegexToken(token, matchUnsigned);
    for (token = "S"; token.length <= 9; token += "S")addParseToken(token, parseMs);
    var getSetMillisecond = makeGetSet("Milliseconds", !1);
    addFormatToken("z", 0, 0, "zoneAbbr"), addFormatToken("zz", 0, 0, "zoneName");
    var momentPrototype__proto = Moment.prototype;
    momentPrototype__proto.add = add_subtract__add, momentPrototype__proto.calendar = moment_calendar__calendar, momentPrototype__proto.clone = clone, momentPrototype__proto.diff = diff, momentPrototype__proto.endOf = endOf, momentPrototype__proto.format = format, momentPrototype__proto.from = from, momentPrototype__proto.fromNow = fromNow, momentPrototype__proto.to = to, momentPrototype__proto.toNow = toNow, momentPrototype__proto.get = getSet, momentPrototype__proto.invalidAt = invalidAt, momentPrototype__proto.isAfter = isAfter, momentPrototype__proto.isBefore = isBefore, momentPrototype__proto.isBetween = isBetween, momentPrototype__proto.isSame = isSame, momentPrototype__proto.isValid = moment_valid__isValid, momentPrototype__proto.lang = lang, momentPrototype__proto.locale = locale, momentPrototype__proto.localeData = localeData, momentPrototype__proto.max = prototypeMax, momentPrototype__proto.min = prototypeMin, momentPrototype__proto.parsingFlags = parsingFlags, momentPrototype__proto.set = getSet, momentPrototype__proto.startOf = startOf, momentPrototype__proto.subtract = add_subtract__subtract, momentPrototype__proto.toArray = toArray, momentPrototype__proto.toObject = toObject, momentPrototype__proto.toDate = toDate, momentPrototype__proto.toISOString = moment_format__toISOString, momentPrototype__proto.toJSON = moment_format__toISOString, momentPrototype__proto.toString = toString, momentPrototype__proto.unix = unix, momentPrototype__proto.valueOf = to_type__valueOf, momentPrototype__proto.year = getSetYear, momentPrototype__proto.isLeapYear = getIsLeapYear, momentPrototype__proto.weekYear = getSetWeekYear, momentPrototype__proto.isoWeekYear = getSetISOWeekYear, momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter, momentPrototype__proto.month = getSetMonth, momentPrototype__proto.daysInMonth = getDaysInMonth, momentPrototype__proto.week = momentPrototype__proto.weeks = getSetWeek, momentPrototype__proto.isoWeek = momentPrototype__proto.isoWeeks = getSetISOWeek, momentPrototype__proto.weeksInYear = getWeeksInYear, momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear, momentPrototype__proto.date = getSetDayOfMonth, momentPrototype__proto.day = momentPrototype__proto.days = getSetDayOfWeek, momentPrototype__proto.weekday = getSetLocaleDayOfWeek, momentPrototype__proto.isoWeekday = getSetISODayOfWeek, momentPrototype__proto.dayOfYear = getSetDayOfYear, momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour, momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute, momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond, momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond, momentPrototype__proto.utcOffset = getSetOffset, momentPrototype__proto.utc = setOffsetToUTC, momentPrototype__proto.local = setOffsetToLocal, momentPrototype__proto.parseZone = setOffsetToParsedOffset, momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset, momentPrototype__proto.isDST = isDaylightSavingTime, momentPrototype__proto.isDSTShifted = isDaylightSavingTimeShifted, momentPrototype__proto.isLocal = isLocal, momentPrototype__proto.isUtcOffset = isUtcOffset, momentPrototype__proto.isUtc = isUtc, momentPrototype__proto.isUTC = isUtc, momentPrototype__proto.zoneAbbr = getZoneAbbr, momentPrototype__proto.zoneName = getZoneName, momentPrototype__proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth), momentPrototype__proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth), momentPrototype__proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear), momentPrototype__proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", getSetZone);
    var momentPrototype = momentPrototype__proto, defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }, defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }, defaultInvalidDate = "Invalid date", defaultOrdinal = "%d", defaultOrdinalParse = /\d{1,2}/, defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }, prototype__proto = Locale.prototype;
    prototype__proto._calendar = defaultCalendar, prototype__proto.calendar = locale_calendar__calendar,
        prototype__proto._longDateFormat = defaultLongDateFormat, prototype__proto.longDateFormat = longDateFormat, prototype__proto._invalidDate = defaultInvalidDate, prototype__proto.invalidDate = invalidDate, prototype__proto._ordinal = defaultOrdinal, prototype__proto.ordinal = ordinal, prototype__proto._ordinalParse = defaultOrdinalParse, prototype__proto.preparse = preParsePostFormat, prototype__proto.postformat = preParsePostFormat, prototype__proto._relativeTime = defaultRelativeTime, prototype__proto.relativeTime = relative__relativeTime, prototype__proto.pastFuture = pastFuture, prototype__proto.set = locale_set__set, prototype__proto.months = localeMonths, prototype__proto._months = defaultLocaleMonths, prototype__proto.monthsShort = localeMonthsShort, prototype__proto._monthsShort = defaultLocaleMonthsShort, prototype__proto.monthsParse = localeMonthsParse, prototype__proto.week = localeWeek, prototype__proto._week = defaultLocaleWeek, prototype__proto.firstDayOfYear = localeFirstDayOfYear, prototype__proto.firstDayOfWeek = localeFirstDayOfWeek, prototype__proto.weekdays = localeWeekdays, prototype__proto._weekdays = defaultLocaleWeekdays, prototype__proto.weekdaysMin = localeWeekdaysMin, prototype__proto._weekdaysMin = defaultLocaleWeekdaysMin, prototype__proto.weekdaysShort = localeWeekdaysShort, prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort, prototype__proto.weekdaysParse = localeWeekdaysParse, prototype__proto.isPM = localeIsPM, prototype__proto._meridiemParse = defaultLocaleMeridiemParse, prototype__proto.meridiem = localeMeridiem, locale_locales__getSetGlobalLocale("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10, output = 1 === toInt(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return number + output
        }
    }), utils_hooks__hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", locale_locales__getSetGlobalLocale), utils_hooks__hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", locale_locales__getLocale);
    var mathAbs = Math.abs, asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asYears = makeAs("y"), milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years"), round = Math.round, thresholds = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, iso_string__abs = Math.abs, duration_prototype__proto = Duration.prototype;
    duration_prototype__proto.abs = duration_abs__abs, duration_prototype__proto.add = duration_add_subtract__add, duration_prototype__proto.subtract = duration_add_subtract__subtract, duration_prototype__proto.as = as, duration_prototype__proto.asMilliseconds = asMilliseconds, duration_prototype__proto.asSeconds = asSeconds, duration_prototype__proto.asMinutes = asMinutes, duration_prototype__proto.asHours = asHours, duration_prototype__proto.asDays = asDays, duration_prototype__proto.asWeeks = asWeeks, duration_prototype__proto.asMonths = asMonths, duration_prototype__proto.asYears = asYears, duration_prototype__proto.valueOf = duration_as__valueOf, duration_prototype__proto._bubble = bubble, duration_prototype__proto.get = duration_get__get, duration_prototype__proto.milliseconds = milliseconds, duration_prototype__proto.seconds = seconds, duration_prototype__proto.minutes = minutes, duration_prototype__proto.hours = hours, duration_prototype__proto.days = days, duration_prototype__proto.weeks = weeks, duration_prototype__proto.months = months, duration_prototype__proto.years = years, duration_prototype__proto.humanize = humanize, duration_prototype__proto.toISOString = iso_string__toISOString, duration_prototype__proto.toString = iso_string__toISOString, duration_prototype__proto.toJSON = iso_string__toISOString, duration_prototype__proto.locale = locale, duration_prototype__proto.localeData = localeData, duration_prototype__proto.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", iso_string__toISOString), duration_prototype__proto.lang = lang, addFormatToken("X", 0, 0, "unix"), addFormatToken("x", 0, 0, "valueOf"), addRegexToken("x", matchSigned), addRegexToken("X", matchTimestamp), addParseToken("X", function (input, array, config) {
        config._d = new Date(1e3 * parseFloat(input, 10))
    }), addParseToken("x", function (input, array, config) {
        config._d = new Date(toInt(input))
    }), utils_hooks__hooks.version = "2.10.6", setHookCallback(local__createLocal), utils_hooks__hooks.fn = momentPrototype, utils_hooks__hooks.min = min, utils_hooks__hooks.max = max, utils_hooks__hooks.utc = create_utc__createUTC, utils_hooks__hooks.unix = moment__createUnix, utils_hooks__hooks.months = lists__listMonths, utils_hooks__hooks.isDate = isDate, utils_hooks__hooks.locale = locale_locales__getSetGlobalLocale, utils_hooks__hooks.invalid = valid__createInvalid, utils_hooks__hooks.duration = create__createDuration, utils_hooks__hooks.isMoment = isMoment, utils_hooks__hooks.weekdays = lists__listWeekdays, utils_hooks__hooks.parseZone = moment__createInZone, utils_hooks__hooks.localeData = locale_locales__getLocale, utils_hooks__hooks.isDuration = isDuration, utils_hooks__hooks.monthsShort = lists__listMonthsShort, utils_hooks__hooks.weekdaysMin = lists__listWeekdaysMin, utils_hooks__hooks.defineLocale = defineLocale, utils_hooks__hooks.weekdaysShort = lists__listWeekdaysShort, utils_hooks__hooks.normalizeUnits = normalizeUnits, utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    var _moment = utils_hooks__hooks;
    return _moment
}), function (global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? factory(require("../moment")) : "function" == typeof define && define.amd ? define(["moment"], factory) : factory(global.moment)
}(this, function (moment) {
    "use strict";
    var fr = moment.defineLocale("fr", {
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: "[Demain à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[Hier à] LT",
            lastWeek: "dddd [dernier à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        ordinalParse: /\d{1,2}(er|)/,
        ordinal: function (number) {
            return number + (1 === number ? "er" : "")
        },
        week: {dow: 1, doy: 4}
    });
    return fr
}), function (factory) {
    "use strict";
    if ("function" == typeof define && define.amd)define(["jquery", "moment"], factory); else if ("object" == typeof exports)factory(require("jquery"), require("moment")); else {
        if ("undefined" == typeof jQuery)throw"bootstrap-datetimepicker requires jQuery to be loaded first";
        if ("undefined" == typeof moment)throw"bootstrap-datetimepicker requires Moment.js to be loaded first";
        factory(jQuery, moment)
    }
}(function ($, moment) {
    "use strict";
    if (!moment)throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");
    var dateTimePicker = function (element, options) {
        var date, viewDate, input, use24Hours, actualFormat, parseFormats, currentViewMode, picker = {}, unset = !0, component = !1, widget = !1, minViewModeNumber = 0, datePickerModes = [{
            clsName: "days",
            navFnc: "M",
            navStep: 1
        }, {clsName: "months", navFnc: "y", navStep: 1}, {
            clsName: "years",
            navFnc: "y",
            navStep: 10
        }, {
            clsName: "decades",
            navFnc: "y",
            navStep: 100
        }], viewModes = ["days", "months", "years", "decades"], verticalModes = ["top", "bottom", "auto"], horizontalModes = ["left", "right", "auto"], toolbarPlacements = ["default", "top", "bottom"], keyMap = {
            up: 38,
            38: "up",
            down: 40,
            40: "down",
            left: 37,
            37: "left",
            right: 39,
            39: "right",
            tab: 9,
            9: "tab",
            escape: 27,
            27: "escape",
            enter: 13,
            13: "enter",
            pageUp: 33,
            33: "pageUp",
            pageDown: 34,
            34: "pageDown",
            shift: 16,
            16: "shift",
            control: 17,
            17: "control",
            space: 32,
            32: "space",
            t: 84,
            84: "t",
            "delete": 46,
            46: "delete"
        }, keyState = {}, getMoment = function (d) {
            var returnMoment, currentZoneOffset, incomingZoneOffset, timeZoneIndicator, dateWithTimeZoneInfo, tzEnabled = !1;
            return void 0 !== moment.tz && void 0 !== options.timeZone && null !== options.timeZone && "" !== options.timeZone && (tzEnabled = !0), void 0 === d || null === d ? returnMoment = tzEnabled ? moment().tz(options.timeZone).startOf("d") : moment().startOf("d") : tzEnabled ? (currentZoneOffset = moment().tz(options.timeZone).utcOffset(), incomingZoneOffset = moment(d, parseFormats, options.useStrict).utcOffset(), incomingZoneOffset !== currentZoneOffset ? (timeZoneIndicator = moment().tz(options.timeZone).format("Z"), dateWithTimeZoneInfo = moment(d, parseFormats, options.useStrict).format("YYYY-MM-DD[T]HH:mm:ss") + timeZoneIndicator, returnMoment = moment(dateWithTimeZoneInfo, parseFormats, options.useStrict).tz(options.timeZone)) : returnMoment = moment(d, parseFormats, options.useStrict).tz(options.timeZone)) : returnMoment = moment(d, parseFormats, options.useStrict), returnMoment
        }, isEnabled = function (granularity) {
            if ("string" != typeof granularity || granularity.length > 1)throw new TypeError("isEnabled expects a single character string parameter");
            switch (granularity) {
                case"y":
                    return -1 !== actualFormat.indexOf("Y");
                case"M":
                    return -1 !== actualFormat.indexOf("M");
                case"d":
                    return -1 !== actualFormat.toLowerCase().indexOf("d");
                case"h":
                case"H":
                    return -1 !== actualFormat.toLowerCase().indexOf("h");
                case"m":
                    return -1 !== actualFormat.indexOf("m");
                case"s":
                    return -1 !== actualFormat.indexOf("s");
                default:
                    return !1
            }
        }, hasTime = function () {
            return isEnabled("h") || isEnabled("m") || isEnabled("s")
        }, hasDate = function () {
            return isEnabled("y") || isEnabled("M") || isEnabled("d")
        }, getDatePickerTemplate = function () {
            var headTemplate = $("<thead>").append($("<tr>").append($("<th>").addClass("prev").attr("data-action", "previous").append($("<span>").addClass(options.icons.previous))).append($("<th>").addClass("picker-switch").attr("data-action", "pickerSwitch").attr("colspan", options.calendarWeeks ? "6" : "5")).append($("<th>").addClass("next").attr("data-action", "next").append($("<span>").addClass(options.icons.next)))), contTemplate = $("<tbody>").append($("<tr>").append($("<td>").attr("colspan", options.calendarWeeks ? "8" : "7")));
            return [$("<div>").addClass("datepicker-days").append($("<table>").addClass("table-condensed").append(headTemplate).append($("<tbody>"))), $("<div>").addClass("datepicker-months").append($("<table>").addClass("table-condensed").append(headTemplate.clone()).append(contTemplate.clone())), $("<div>").addClass("datepicker-years").append($("<table>").addClass("table-condensed").append(headTemplate.clone()).append(contTemplate.clone())), $("<div>").addClass("datepicker-decades").append($("<table>").addClass("table-condensed").append(headTemplate.clone()).append(contTemplate.clone()))]
        }, getTimePickerMainTemplate = function () {
            var topRow = $("<tr>"), middleRow = $("<tr>"), bottomRow = $("<tr>");
            return isEnabled("h") && (topRow.append($("<td>").append($("<a>").attr({
                href: "#",
                tabindex: "-1",
                title: options.tooltips.incrementHour
            }).addClass("btn").attr("data-action", "incrementHours").append($("<span>").addClass(options.icons.up)))), middleRow.append($("<td>").append($("<span>").addClass("timepicker-hour").attr({
                "data-time-component": "hours",
                title: options.tooltips.pickHour
            }).attr("data-action", "showHours"))), bottomRow.append($("<td>").append($("<a>").attr({
                href: "#",
                tabindex: "-1",
                title: options.tooltips.decrementHour
            }).addClass("btn").attr("data-action", "decrementHours").append($("<span>").addClass(options.icons.down))))), isEnabled("m") && (isEnabled("h") && (topRow.append($("<td>").addClass("separator")), middleRow.append($("<td>").addClass("separator").html(":")), bottomRow.append($("<td>").addClass("separator"))), topRow.append($("<td>").append($("<a>").attr({
                href: "#",
                tabindex: "-1",
                title: options.tooltips.incrementMinute
            }).addClass("btn").attr("data-action", "incrementMinutes").append($("<span>").addClass(options.icons.up)))), middleRow.append($("<td>").append($("<span>").addClass("timepicker-minute").attr({
                "data-time-component": "minutes",
                title: options.tooltips.pickMinute
            }).attr("data-action", "showMinutes"))), bottomRow.append($("<td>").append($("<a>").attr({
                href: "#",
                tabindex: "-1",
                title: options.tooltips.decrementMinute
            }).addClass("btn").attr("data-action", "decrementMinutes").append($("<span>").addClass(options.icons.down))))), isEnabled("s") && (isEnabled("m") && (topRow.append($("<td>").addClass("separator")), middleRow.append($("<td>").addClass("separator").html(":")), bottomRow.append($("<td>").addClass("separator"))), topRow.append($("<td>").append($("<a>").attr({
                href: "#",
                tabindex: "-1",
                title: options.tooltips.incrementSecond
            }).addClass("btn").attr("data-action", "incrementSeconds").append($("<span>").addClass(options.icons.up)))), middleRow.append($("<td>").append($("<span>").addClass("timepicker-second").attr({
                "data-time-component": "seconds",
                title: options.tooltips.pickSecond
            }).attr("data-action", "showSeconds"))), bottomRow.append($("<td>").append($("<a>").attr({
                href: "#",
                tabindex: "-1",
                title: options.tooltips.decrementSecond
            }).addClass("btn").attr("data-action", "decrementSeconds").append($("<span>").addClass(options.icons.down))))), use24Hours || (topRow.append($("<td>").addClass("separator")), middleRow.append($("<td>").append($("<button>").addClass("btn btn-primary").attr({
                "data-action": "togglePeriod",
                tabindex: "-1",
                title: options.tooltips.togglePeriod
            }))), bottomRow.append($("<td>").addClass("separator"))), $("<div>").addClass("timepicker-picker").append($("<table>").addClass("table-condensed").append([topRow, middleRow, bottomRow]))
        }, getTimePickerTemplate = function () {
            var hoursView = $("<div>").addClass("timepicker-hours").append($("<table>").addClass("table-condensed")), minutesView = $("<div>").addClass("timepicker-minutes").append($("<table>").addClass("table-condensed")), secondsView = $("<div>").addClass("timepicker-seconds").append($("<table>").addClass("table-condensed")), ret = [getTimePickerMainTemplate()];
            return isEnabled("h") && ret.push(hoursView), isEnabled("m") && ret.push(minutesView), isEnabled("s") && ret.push(secondsView), ret
        }, getToolbar = function () {
            var row = [];
            return options.showTodayButton && row.push($("<td>").append($("<a>").attr({
                "data-action": "today",
                title: options.tooltips.today
            }).append($("<span>").addClass(options.icons.today)))), !options.sideBySide && hasDate() && hasTime() && row.push($("<td>").append($("<a>").attr({
                "data-action": "togglePicker",
                title: options.tooltips.selectTime
            }).append($("<span>").addClass(options.icons.time)))), options.showClear && row.push($("<td>").append($("<a>").attr({
                "data-action": "clear",
                title: options.tooltips.clear
            }).append($("<span>").addClass(options.icons.clear)))), options.showClose && row.push($("<td>").append($("<a>").attr({
                "data-action": "close",
                title: options.tooltips.close
            }).append($("<span>").addClass(options.icons.close)))), $("<table>").addClass("table-condensed").append($("<tbody>").append($("<tr>").append(row)))
        }, getTemplate = function () {
            var template = $("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"), dateView = $("<div>").addClass("datepicker").append(getDatePickerTemplate()), timeView = $("<div>").addClass("timepicker").append(getTimePickerTemplate()), content = $("<ul>").addClass("list-unstyled"), toolbar = $("<li>").addClass("picker-switch" + (options.collapse ? " accordion-toggle" : "")).append(getToolbar());
            return options.inline && template.removeClass("dropdown-menu"), use24Hours && template.addClass("usetwentyfour"), isEnabled("s") && !use24Hours && template.addClass("wider"), options.sideBySide && hasDate() && hasTime() ? (template.addClass("timepicker-sbs"), "top" === options.toolbarPlacement && template.append(toolbar), template.append($("<div>").addClass("row").append(dateView.addClass("col-md-6")).append(timeView.addClass("col-md-6"))), "bottom" === options.toolbarPlacement && template.append(toolbar), template) : ("top" === options.toolbarPlacement && content.append(toolbar), hasDate() && content.append($("<li>").addClass(options.collapse && hasTime() ? "collapse in" : "").append(dateView)), "default" === options.toolbarPlacement && content.append(toolbar), hasTime() && content.append($("<li>").addClass(options.collapse && hasDate() ? "collapse" : "").append(timeView)), "bottom" === options.toolbarPlacement && content.append(toolbar), template.append(content))
        }, dataToOptions = function () {
            var eData, dataOptions = {};
            return eData = element.is("input") || options.inline ? element.data() : element.find("input").data(), eData.dateOptions && eData.dateOptions instanceof Object && (dataOptions = $.extend(!0, dataOptions, eData.dateOptions)), $.each(options, function (key) {
                var attributeName = "date" + key.charAt(0).toUpperCase() + key.slice(1);
                void 0 !== eData[attributeName] && (dataOptions[key] = eData[attributeName])
            }), dataOptions
        }, place = function () {
            var parent, position = (component || element).position(), offset = (component || element).offset(), vertical = options.widgetPositioning.vertical, horizontal = options.widgetPositioning.horizontal;
            if (options.widgetParent)parent = options.widgetParent.append(widget); else if (element.is("input"))parent = element.after(widget).parent(); else {
                if (options.inline)return void(parent = element.append(widget));
                parent = element, element.children().first().after(widget)
            }
            if ("auto" === vertical && (vertical = offset.top + 1.5 * widget.height() >= $(window).height() + $(window).scrollTop() && widget.height() + element.outerHeight() < offset.top ? "top" : "bottom"), "auto" === horizontal && (horizontal = parent.width() < offset.left + widget.outerWidth() / 2 && offset.left + widget.outerWidth() > $(window).width() ? "right" : "left"), "top" === vertical ? widget.addClass("top").removeClass("bottom") : widget.addClass("bottom").removeClass("top"), "right" === horizontal ? widget.addClass("pull-right") : widget.removeClass("pull-right"), "relative" !== parent.css("position") && (parent = parent.parents().filter(function () {
                    return "relative" === $(this).css("position")
                }).first()), 0 === parent.length)throw new Error("datetimepicker component should be placed within a relative positioned container");
            widget.css({
                top: "top" === vertical ? "auto" : position.top + element.outerHeight(),
                bottom: "top" === vertical ? position.top + element.outerHeight() : "auto",
                left: "left" === horizontal ? parent === element ? 0 : position.left : "auto",
                right: "left" === horizontal ? "auto" : parent.outerWidth() - element.outerWidth() - (parent === element ? 0 : position.left)
            })
        }, notifyEvent = function (e) {
            "dp.change" === e.type && (e.date && e.date.isSame(e.oldDate) || !e.date && !e.oldDate) || element.trigger(e)
        }, viewUpdate = function (e) {
            "y" === e && (e = "YYYY"), notifyEvent({type: "dp.update", change: e, viewDate: viewDate.clone()})
        }, showMode = function (dir) {
            widget && (dir && (currentViewMode = Math.max(minViewModeNumber, Math.min(3, currentViewMode + dir))), widget.find(".datepicker > div").hide().filter(".datepicker-" + datePickerModes[currentViewMode].clsName).show())
        }, fillDow = function () {
            var row = $("<tr>"), currentDate = viewDate.clone().startOf("w").startOf("d");
            for (options.calendarWeeks === !0 && row.append($("<th>").addClass("cw").text("#")); currentDate.isBefore(viewDate.clone().endOf("w"));)row.append($("<th>").addClass("dow").text(currentDate.format("dd"))), currentDate.add(1, "d");
            widget.find(".datepicker-days thead").append(row)
        }, isInDisabledDates = function (testDate) {
            return options.disabledDates[testDate.format("YYYY-MM-DD")] === !0
        }, isInEnabledDates = function (testDate) {
            return options.enabledDates[testDate.format("YYYY-MM-DD")] === !0
        }, isInDisabledHours = function (testDate) {
            return options.disabledHours[testDate.format("H")] === !0
        }, isInEnabledHours = function (testDate) {
            return options.enabledHours[testDate.format("H")] === !0
        }, isValid = function (targetMoment, granularity) {
            if (!targetMoment.isValid())return !1;
            if (options.disabledDates && "d" === granularity && isInDisabledDates(targetMoment))return !1;
            if (options.enabledDates && "d" === granularity && !isInEnabledDates(targetMoment))return !1;
            if (options.minDate && targetMoment.isBefore(options.minDate, granularity))return !1;
            if (options.maxDate && targetMoment.isAfter(options.maxDate, granularity))return !1;
            if (options.daysOfWeekDisabled && "d" === granularity && -1 !== options.daysOfWeekDisabled.indexOf(targetMoment.day()))return !1;
            if (options.disabledHours && ("h" === granularity || "m" === granularity || "s" === granularity) && isInDisabledHours(targetMoment))return !1;
            if (options.enabledHours && ("h" === granularity || "m" === granularity || "s" === granularity) && !isInEnabledHours(targetMoment))return !1;
            if (options.disabledTimeIntervals && ("h" === granularity || "m" === granularity || "s" === granularity)) {
                var found = !1;
                if ($.each(options.disabledTimeIntervals, function () {
                        return targetMoment.isBetween(this[0], this[1]) ? (found = !0, !1) : void 0
                    }), found)return !1
            }
            return !0
        }, fillMonths = function () {
            for (var spans = [], monthsShort = viewDate.clone().startOf("y").startOf("d"); monthsShort.isSame(viewDate, "y");)spans.push($("<span>").attr("data-action", "selectMonth").addClass("month").text(monthsShort.format("MMM"))), monthsShort.add(1, "M");
            widget.find(".datepicker-months td").empty().append(spans)
        }, updateMonths = function () {
            var monthsView = widget.find(".datepicker-months"), monthsViewHeader = monthsView.find("th"), months = monthsView.find("tbody").find("span");
            monthsViewHeader.eq(0).find("span").attr("title", options.tooltips.prevYear), monthsViewHeader.eq(1).attr("title", options.tooltips.selectYear), monthsViewHeader.eq(2).find("span").attr("title", options.tooltips.nextYear), monthsView.find(".disabled").removeClass("disabled"), isValid(viewDate.clone().subtract(1, "y"), "y") || monthsViewHeader.eq(0).addClass("disabled"), monthsViewHeader.eq(1).text(viewDate.year()), isValid(viewDate.clone().add(1, "y"), "y") || monthsViewHeader.eq(2).addClass("disabled"), months.removeClass("active"), date.isSame(viewDate, "y") && !unset && months.eq(date.month()).addClass("active"), months.each(function (index) {
                isValid(viewDate.clone().month(index), "M") || $(this).addClass("disabled")
            })
        }, updateYears = function () {
            var yearsView = widget.find(".datepicker-years"), yearsViewHeader = yearsView.find("th"), startYear = viewDate.clone().subtract(5, "y"), endYear = viewDate.clone().add(6, "y"), html = "";
            for (yearsViewHeader.eq(0).find("span").attr("title", options.tooltips.prevDecade), yearsViewHeader.eq(1).attr("title", options.tooltips.selectDecade), yearsViewHeader.eq(2).find("span").attr("title", options.tooltips.nextDecade), yearsView.find(".disabled").removeClass("disabled"), options.minDate && options.minDate.isAfter(startYear, "y") && yearsViewHeader.eq(0).addClass("disabled"), yearsViewHeader.eq(1).text(startYear.year() + "-" + endYear.year()), options.maxDate && options.maxDate.isBefore(endYear, "y") && yearsViewHeader.eq(2).addClass("disabled"); !startYear.isAfter(endYear, "y");)html += '<span data-action="selectYear" class="year' + (startYear.isSame(date, "y") && !unset ? " active" : "") + (isValid(startYear, "y") ? "" : " disabled") + '">' + startYear.year() + "</span>", startYear.add(1, "y");
            yearsView.find("td").html(html)
        }, updateDecades = function () {
            var decadesView = widget.find(".datepicker-decades"), decadesViewHeader = decadesView.find("th"), startDecade = moment({y: viewDate.year() - viewDate.year() % 100 - 1}), endDecade = startDecade.clone().add(100, "y"), startedAt = startDecade.clone(), html = "";
            for (decadesViewHeader.eq(0).find("span").attr("title", options.tooltips.prevCentury), decadesViewHeader.eq(2).find("span").attr("title", options.tooltips.nextCentury), decadesView.find(".disabled").removeClass("disabled"), (startDecade.isSame(moment({y: 1900})) || options.minDate && options.minDate.isAfter(startDecade, "y")) && decadesViewHeader.eq(0).addClass("disabled"), decadesViewHeader.eq(1).text(startDecade.year() + "-" + endDecade.year()), (startDecade.isSame(moment({y: 2e3})) || options.maxDate && options.maxDate.isBefore(endDecade, "y")) && decadesViewHeader.eq(2).addClass("disabled"); !startDecade.isAfter(endDecade, "y");)html += '<span data-action="selectDecade" class="decade' + (startDecade.isSame(date, "y") ? " active" : "") + (isValid(startDecade, "y") ? "" : " disabled") + '" data-selection="' + (startDecade.year() + 6) + '">' + (startDecade.year() + 1) + " - " + (startDecade.year() + 12) + "</span>", startDecade.add(12, "y");
            html += "<span></span><span></span><span></span>", decadesView.find("td").html(html), decadesViewHeader.eq(1).text(startedAt.year() + 1 + "-" + startDecade.year())
        }, fillDate = function () {
            var currentDate, row, clsName, i, daysView = widget.find(".datepicker-days"), daysViewHeader = daysView.find("th"), html = [];
            if (hasDate()) {
                for (daysViewHeader.eq(0).find("span").attr("title", options.tooltips.prevMonth), daysViewHeader.eq(1).attr("title", options.tooltips.selectMonth), daysViewHeader.eq(2).find("span").attr("title", options.tooltips.nextMonth), daysView.find(".disabled").removeClass("disabled"), daysViewHeader.eq(1).text(viewDate.format(options.dayViewHeaderFormat)), isValid(viewDate.clone().subtract(1, "M"), "M") || daysViewHeader.eq(0).addClass("disabled"), isValid(viewDate.clone().add(1, "M"), "M") || daysViewHeader.eq(2).addClass("disabled"), currentDate = viewDate.clone().startOf("M").startOf("w").startOf("d"), i = 0; 42 > i; i++)0 === currentDate.weekday() && (row = $("<tr>"), options.calendarWeeks && row.append('<td class="cw">' + currentDate.week() + "</td>"), html.push(row)), clsName = "", currentDate.isBefore(viewDate, "M") && (clsName += " old"), currentDate.isAfter(viewDate, "M") && (clsName += " new"), currentDate.isSame(date, "d") && !unset && (clsName += " active"), isValid(currentDate, "d") || (clsName += " disabled"), currentDate.isSame(getMoment(), "d") && (clsName += " today"), 0 !== currentDate.day() && 6 !== currentDate.day() || (clsName += " weekend"), row.append('<td data-action="selectDay" data-day="' + currentDate.format("L") + '" class="day' + clsName + '">' + currentDate.date() + "</td>"), currentDate.add(1, "d");
                daysView.find("tbody").empty().append(html), updateMonths(), updateYears(), updateDecades()
            }
        }, fillHours = function () {
            var table = widget.find(".timepicker-hours table"), currentHour = viewDate.clone().startOf("d"), html = [], row = $("<tr>");
            for (viewDate.hour() > 11 && !use24Hours && currentHour.hour(12); currentHour.isSame(viewDate, "d") && (use24Hours || viewDate.hour() < 12 && currentHour.hour() < 12 || viewDate.hour() > 11);)currentHour.hour() % 4 === 0 && (row = $("<tr>"), html.push(row)), row.append('<td data-action="selectHour" class="hour' + (isValid(currentHour, "h") ? "" : " disabled") + '">' + currentHour.format(use24Hours ? "HH" : "hh") + "</td>"), currentHour.add(1, "h");
            table.empty().append(html)
        }, fillMinutes = function () {
            for (var table = widget.find(".timepicker-minutes table"), currentMinute = viewDate.clone().startOf("h"), html = [], row = $("<tr>"), step = 1 === options.stepping ? 5 : options.stepping; viewDate.isSame(currentMinute, "h");)currentMinute.minute() % (4 * step) === 0 && (row = $("<tr>"), html.push(row)), row.append('<td data-action="selectMinute" class="minute' + (isValid(currentMinute, "m") ? "" : " disabled") + '">' + currentMinute.format("mm") + "</td>"), currentMinute.add(step, "m");
            table.empty().append(html)
        }, fillSeconds = function () {
            for (var table = widget.find(".timepicker-seconds table"), currentSecond = viewDate.clone().startOf("m"), html = [], row = $("<tr>"); viewDate.isSame(currentSecond, "m");)currentSecond.second() % 20 === 0 && (row = $("<tr>"), html.push(row)), row.append('<td data-action="selectSecond" class="second' + (isValid(currentSecond, "s") ? "" : " disabled") + '">' + currentSecond.format("ss") + "</td>"), currentSecond.add(5, "s");
            table.empty().append(html)
        }, fillTime = function () {
            var toggle, newDate, timeComponents = widget.find(".timepicker span[data-time-component]");
            use24Hours || (toggle = widget.find(".timepicker [data-action=togglePeriod]"), newDate = date.clone().add(date.hours() >= 12 ? -12 : 12, "h"), toggle.text(date.format("A")), isValid(newDate, "h") ? toggle.removeClass("disabled") : toggle.addClass("disabled")), timeComponents.filter("[data-time-component=hours]").text(date.format(use24Hours ? "HH" : "hh")), timeComponents.filter("[data-time-component=minutes]").text(date.format("mm")), timeComponents.filter("[data-time-component=seconds]").text(date.format("ss")), fillHours(), fillMinutes(), fillSeconds()
        }, update = function () {
            widget && (fillDate(), fillTime())
        }, setValue = function (targetMoment) {
            var oldDate = unset ? null : date;
            return targetMoment ? (targetMoment = targetMoment.clone().locale(options.locale), 1 !== options.stepping && targetMoment.minutes(Math.round(targetMoment.minutes() / options.stepping) * options.stepping % 60).seconds(0), void(isValid(targetMoment) ? (date = targetMoment, viewDate = date.clone(), input.val(date.format(actualFormat)), element.data("date", date.format(actualFormat)), unset = !1, update(), notifyEvent({
                type: "dp.change",
                date: date.clone(),
                oldDate: oldDate
            })) : (options.keepInvalid || input.val(unset ? "" : date.format(actualFormat)), notifyEvent({
                type: "dp.error",
                date: targetMoment
            })))) : (unset = !0, input.val(""), element.data("date", ""), notifyEvent({
                type: "dp.change",
                date: !1,
                oldDate: oldDate
            }), void update())
        }, hide = function () {
            var transitioning = !1;
            return widget ? (widget.find(".collapse").each(function () {
                var collapseData = $(this).data("collapse");
                return collapseData && collapseData.transitioning ? (transitioning = !0, !1) : !0
            }), transitioning ? picker : (component && component.hasClass("btn") && component.toggleClass("active"), widget.hide(), $(window).off("resize", place), widget.off("click", "[data-action]"), widget.off("mousedown", !1), widget.remove(), widget = !1, notifyEvent({
                type: "dp.hide",
                date: date.clone()
            }), input.blur(), picker)) : picker
        }, clear = function () {
            setValue(null)
        }, actions = {
            next: function () {
                var navFnc = datePickerModes[currentViewMode].navFnc;
                viewDate.add(datePickerModes[currentViewMode].navStep, navFnc), fillDate(), viewUpdate(navFnc)
            }, previous: function () {
                var navFnc = datePickerModes[currentViewMode].navFnc;
                viewDate.subtract(datePickerModes[currentViewMode].navStep, navFnc), fillDate(), viewUpdate(navFnc)
            }, pickerSwitch: function () {
                showMode(1)
            }, selectMonth: function (e) {
                var month = $(e.target).closest("tbody").find("span").index($(e.target));
                viewDate.month(month), currentViewMode === minViewModeNumber ? (setValue(date.clone().year(viewDate.year()).month(viewDate.month())), options.inline || hide()) : (showMode(-1), fillDate()), viewUpdate("M")
            }, selectYear: function (e) {
                var year = parseInt($(e.target).text(), 10) || 0;
                viewDate.year(year), currentViewMode === minViewModeNumber ? (setValue(date.clone().year(viewDate.year())), options.inline || hide()) : (showMode(-1), fillDate()), viewUpdate("YYYY")
            }, selectDecade: function (e) {
                var year = parseInt($(e.target).data("selection"), 10) || 0;
                viewDate.year(year), currentViewMode === minViewModeNumber ? (setValue(date.clone().year(viewDate.year())), options.inline || hide()) : (showMode(-1), fillDate()), viewUpdate("YYYY")
            }, selectDay: function (e) {
                var day = viewDate.clone();
                $(e.target).is(".old") && day.subtract(1, "M"), $(e.target).is(".new") && day.add(1, "M"), setValue(day.date(parseInt($(e.target).text(), 10))), hasTime() || options.keepOpen || options.inline || hide()
            }, incrementHours: function () {
                var newDate = date.clone().add(1, "h");
                isValid(newDate, "h") && setValue(newDate)
            }, incrementMinutes: function () {
                var newDate = date.clone().add(options.stepping, "m");
                isValid(newDate, "m") && setValue(newDate)
            }, incrementSeconds: function () {
                var newDate = date.clone().add(1, "s");
                isValid(newDate, "s") && setValue(newDate)
            }, decrementHours: function () {
                var newDate = date.clone().subtract(1, "h");
                isValid(newDate, "h") && setValue(newDate)
            }, decrementMinutes: function () {
                var newDate = date.clone().subtract(options.stepping, "m");
                isValid(newDate, "m") && setValue(newDate)
            }, decrementSeconds: function () {
                var newDate = date.clone().subtract(1, "s");
                isValid(newDate, "s") && setValue(newDate)
            }, togglePeriod: function () {
                setValue(date.clone().add(date.hours() >= 12 ? -12 : 12, "h"))
            }, togglePicker: function (e) {
                var collapseData, $this = $(e.target), $parent = $this.closest("ul"), expanded = $parent.find(".in"), closed = $parent.find(".collapse:not(.in)");
                if (expanded && expanded.length) {
                    if (collapseData = expanded.data("collapse"), collapseData && collapseData.transitioning)return;
                    expanded.collapse ? (expanded.collapse("hide"), closed.collapse("show")) : (expanded.removeClass("in"), closed.addClass("in")), $this.is("span") ? $this.toggleClass(options.icons.time + " " + options.icons.date) : $this.find("span").toggleClass(options.icons.time + " " + options.icons.date)
                }
            }, showPicker: function () {
                widget.find(".timepicker > div:not(.timepicker-picker)").hide(), widget.find(".timepicker .timepicker-picker").show()
            }, showHours: function () {
                widget.find(".timepicker .timepicker-picker").hide(), widget.find(".timepicker .timepicker-hours").show()
            }, showMinutes: function () {
                widget.find(".timepicker .timepicker-picker").hide(), widget.find(".timepicker .timepicker-minutes").show()
            }, showSeconds: function () {
                widget.find(".timepicker .timepicker-picker").hide(),
                    widget.find(".timepicker .timepicker-seconds").show()
            }, selectHour: function (e) {
                var hour = parseInt($(e.target).text(), 10);
                use24Hours || (date.hours() >= 12 ? 12 !== hour && (hour += 12) : 12 === hour && (hour = 0)), setValue(date.clone().hours(hour)), actions.showPicker.call(picker)
            }, selectMinute: function (e) {
                setValue(date.clone().minutes(parseInt($(e.target).text(), 10))), actions.showPicker.call(picker)
            }, selectSecond: function (e) {
                setValue(date.clone().seconds(parseInt($(e.target).text(), 10))), actions.showPicker.call(picker)
            }, clear: clear, today: function () {
                var todaysDate = getMoment();
                isValid(todaysDate, "d") && setValue(todaysDate)
            }, close: hide
        }, doAction = function (e) {
            return $(e.currentTarget).is(".disabled") ? !1 : (actions[$(e.currentTarget).data("action")].apply(picker, arguments), !1)
        }, show = function () {
            var currentMoment, useCurrentGranularity = {
                year: function (m) {
                    return m.month(0).date(1).hours(0).seconds(0).minutes(0)
                }, month: function (m) {
                    return m.date(1).hours(0).seconds(0).minutes(0)
                }, day: function (m) {
                    return m.hours(0).seconds(0).minutes(0)
                }, hour: function (m) {
                    return m.seconds(0).minutes(0)
                }, minute: function (m) {
                    return m.seconds(0)
                }
            };
            return input.prop("disabled") || !options.ignoreReadonly && input.prop("readonly") || widget ? picker : (void 0 !== input.val() && 0 !== input.val().trim().length ? setValue(parseInputDate(input.val().trim())) : options.useCurrent && unset && (input.is("input") && 0 === input.val().trim().length || options.inline) && (currentMoment = getMoment(), "string" == typeof options.useCurrent && (currentMoment = useCurrentGranularity[options.useCurrent](currentMoment)), setValue(currentMoment)), widget = getTemplate(), fillDow(), fillMonths(), widget.find(".timepicker-hours").hide(), widget.find(".timepicker-minutes").hide(), widget.find(".timepicker-seconds").hide(), update(), showMode(), $(window).on("resize", place), widget.on("click", "[data-action]", doAction), widget.on("mousedown", !1), component && component.hasClass("btn") && component.toggleClass("active"), widget.show(), place(), options.focusOnShow && !input.is(":focus") && input.focus(), notifyEvent({type: "dp.show"}), picker)
        }, toggle = function () {
            return widget ? hide() : show()
        }, parseInputDate = function (inputDate) {
            return inputDate = void 0 === options.parseInputDate ? moment.isMoment(inputDate) || inputDate instanceof Date ? moment(inputDate) : getMoment(inputDate) : options.parseInputDate(inputDate), inputDate.locale(options.locale), inputDate
        }, keydown = function (e) {
            var index, index2, keyBindKeys, allModifiersPressed, handler = null, pressedKeys = [], pressedModifiers = {}, currentKey = e.which, pressed = "p";
            keyState[currentKey] = pressed;
            for (index in keyState)keyState.hasOwnProperty(index) && keyState[index] === pressed && (pressedKeys.push(index), parseInt(index, 10) !== currentKey && (pressedModifiers[index] = !0));
            for (index in options.keyBinds)if (options.keyBinds.hasOwnProperty(index) && "function" == typeof options.keyBinds[index] && (keyBindKeys = index.split(" "), keyBindKeys.length === pressedKeys.length && keyMap[currentKey] === keyBindKeys[keyBindKeys.length - 1])) {
                for (allModifiersPressed = !0, index2 = keyBindKeys.length - 2; index2 >= 0; index2--)if (!(keyMap[keyBindKeys[index2]] in pressedModifiers)) {
                    allModifiersPressed = !1;
                    break
                }
                if (allModifiersPressed) {
                    handler = options.keyBinds[index];
                    break
                }
            }
            handler && (handler.call(picker, widget), e.stopPropagation(), e.preventDefault())
        }, keyup = function (e) {
            keyState[e.which] = "r", e.stopPropagation(), e.preventDefault()
        }, change = function (e) {
            var val = $(e.target).val().trim(), parsedDate = val ? parseInputDate(val) : null;
            return setValue(parsedDate), e.stopImmediatePropagation(), !1
        }, attachDatePickerElementEvents = function () {
            input.on({
                change: change,
                blur: options.debug ? "" : hide,
                keydown: keydown,
                keyup: keyup,
                focus: options.allowInputToggle ? show : ""
            }), element.is("input") ? input.on({focus: show}) : component && (component.on("click", toggle), component.on("mousedown", !1))
        }, detachDatePickerElementEvents = function () {
            input.off({
                change: change,
                blur: blur,
                keydown: keydown,
                keyup: keyup,
                focus: options.allowInputToggle ? hide : ""
            }), element.is("input") ? input.off({focus: show}) : component && (component.off("click", toggle), component.off("mousedown", !1))
        }, indexGivenDates = function (givenDatesArray) {
            var givenDatesIndexed = {};
            return $.each(givenDatesArray, function () {
                var dDate = parseInputDate(this);
                dDate.isValid() && (givenDatesIndexed[dDate.format("YYYY-MM-DD")] = !0)
            }), Object.keys(givenDatesIndexed).length ? givenDatesIndexed : !1
        }, indexGivenHours = function (givenHoursArray) {
            var givenHoursIndexed = {};
            return $.each(givenHoursArray, function () {
                givenHoursIndexed[this] = !0
            }), Object.keys(givenHoursIndexed).length ? givenHoursIndexed : !1
        }, initFormatting = function () {
            var format = options.format || "L LT";
            actualFormat = format.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput) {
                var newinput = date.localeData().longDateFormat(formatInput) || formatInput;
                return newinput.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput2) {
                    return date.localeData().longDateFormat(formatInput2) || formatInput2
                })
            }), parseFormats = options.extraFormats ? options.extraFormats.slice() : [], parseFormats.indexOf(format) < 0 && parseFormats.indexOf(actualFormat) < 0 && parseFormats.push(actualFormat), use24Hours = actualFormat.toLowerCase().indexOf("a") < 1 && actualFormat.replace(/\[.*?\]/g, "").indexOf("h") < 1, isEnabled("y") && (minViewModeNumber = 2), isEnabled("M") && (minViewModeNumber = 1), isEnabled("d") && (minViewModeNumber = 0), currentViewMode = Math.max(minViewModeNumber, currentViewMode), unset || setValue(date)
        };
        if (picker.destroy = function () {
                hide(), detachDatePickerElementEvents(), element.removeData("DateTimePicker"), element.removeData("date")
            }, picker.toggle = toggle, picker.show = show, picker.hide = hide, picker.disable = function () {
                return hide(), component && component.hasClass("btn") && component.addClass("disabled"), input.prop("disabled", !0), picker
            }, picker.enable = function () {
                return component && component.hasClass("btn") && component.removeClass("disabled"), input.prop("disabled", !1), picker
            }, picker.ignoreReadonly = function (ignoreReadonly) {
                if (0 === arguments.length)return options.ignoreReadonly;
                if ("boolean" != typeof ignoreReadonly)throw new TypeError("ignoreReadonly () expects a boolean parameter");
                return options.ignoreReadonly = ignoreReadonly, picker
            }, picker.options = function (newOptions) {
                if (0 === arguments.length)return $.extend(!0, {}, options);
                if (!(newOptions instanceof Object))throw new TypeError("options() options parameter should be an object");
                return $.extend(!0, options, newOptions), $.each(options, function (key, value) {
                    if (void 0 === picker[key])throw new TypeError("option " + key + " is not recognized!");
                    picker[key](value)
                }), picker
            }, picker.date = function (newDate) {
                if (0 === arguments.length)return unset ? null : date.clone();
                if (!(null === newDate || "string" == typeof newDate || moment.isMoment(newDate) || newDate instanceof Date))throw new TypeError("date() parameter must be one of [null, string, moment or Date]");
                return setValue(null === newDate ? null : parseInputDate(newDate)), picker
            }, picker.format = function (newFormat) {
                if (0 === arguments.length)return options.format;
                if ("string" != typeof newFormat && ("boolean" != typeof newFormat || newFormat !== !1))throw new TypeError("format() expects a sting or boolean:false parameter " + newFormat);
                return options.format = newFormat, actualFormat && initFormatting(), picker
            }, picker.timeZone = function (newZone) {
                return 0 === arguments.length ? options.timeZone : (options.timeZone = newZone, picker)
            }, picker.dayViewHeaderFormat = function (newFormat) {
                if (0 === arguments.length)return options.dayViewHeaderFormat;
                if ("string" != typeof newFormat)throw new TypeError("dayViewHeaderFormat() expects a string parameter");
                return options.dayViewHeaderFormat = newFormat, picker
            }, picker.extraFormats = function (formats) {
                if (0 === arguments.length)return options.extraFormats;
                if (formats !== !1 && !(formats instanceof Array))throw new TypeError("extraFormats() expects an array or false parameter");
                return options.extraFormats = formats, parseFormats && initFormatting(), picker
            }, picker.disabledDates = function (dates) {
                if (0 === arguments.length)return options.disabledDates ? $.extend({}, options.disabledDates) : options.disabledDates;
                if (!dates)return options.disabledDates = !1, update(), picker;
                if (!(dates instanceof Array))throw new TypeError("disabledDates() expects an array parameter");
                return options.disabledDates = indexGivenDates(dates), options.enabledDates = !1, update(), picker
            }, picker.enabledDates = function (dates) {
                if (0 === arguments.length)return options.enabledDates ? $.extend({}, options.enabledDates) : options.enabledDates;
                if (!dates)return options.enabledDates = !1, update(), picker;
                if (!(dates instanceof Array))throw new TypeError("enabledDates() expects an array parameter");
                return options.enabledDates = indexGivenDates(dates), options.disabledDates = !1, update(), picker
            }, picker.daysOfWeekDisabled = function (daysOfWeekDisabled) {
                if (0 === arguments.length)return options.daysOfWeekDisabled.splice(0);
                if ("boolean" == typeof daysOfWeekDisabled && !daysOfWeekDisabled)return options.daysOfWeekDisabled = !1, update(), picker;
                if (!(daysOfWeekDisabled instanceof Array))throw new TypeError("daysOfWeekDisabled() expects an array parameter");
                if (options.daysOfWeekDisabled = daysOfWeekDisabled.reduce(function (previousValue, currentValue) {
                        return currentValue = parseInt(currentValue, 10), currentValue > 6 || 0 > currentValue || isNaN(currentValue) ? previousValue : (-1 === previousValue.indexOf(currentValue) && previousValue.push(currentValue), previousValue)
                    }, []).sort(), options.useCurrent && !options.keepInvalid) {
                    for (var tries = 0; !isValid(date, "d");) {
                        if (date.add(1, "d"), 7 === tries)throw"Tried 7 times to find a valid date";
                        tries++
                    }
                    setValue(date)
                }
                return update(), picker
            }, picker.maxDate = function (maxDate) {
                if (0 === arguments.length)return options.maxDate ? options.maxDate.clone() : options.maxDate;
                if ("boolean" == typeof maxDate && maxDate === !1)return options.maxDate = !1, update(), picker;
                "string" == typeof maxDate && ("now" !== maxDate && "moment" !== maxDate || (maxDate = getMoment()));
                var parsedDate = parseInputDate(maxDate);
                if (!parsedDate.isValid())throw new TypeError("maxDate() Could not parse date parameter: " + maxDate);
                if (options.minDate && parsedDate.isBefore(options.minDate))throw new TypeError("maxDate() date parameter is before options.minDate: " + parsedDate.format(actualFormat));
                return options.maxDate = parsedDate, options.useCurrent && !options.keepInvalid && date.isAfter(maxDate) && setValue(options.maxDate), viewDate.isAfter(parsedDate) && (viewDate = parsedDate.clone().subtract(options.stepping, "m")), update(), picker
            }, picker.minDate = function (minDate) {
                if (0 === arguments.length)return options.minDate ? options.minDate.clone() : options.minDate;
                if ("boolean" == typeof minDate && minDate === !1)return options.minDate = !1, update(), picker;
                "string" == typeof minDate && ("now" !== minDate && "moment" !== minDate || (minDate = getMoment()));
                var parsedDate = parseInputDate(minDate);
                if (!parsedDate.isValid())throw new TypeError("minDate() Could not parse date parameter: " + minDate);
                if (options.maxDate && parsedDate.isAfter(options.maxDate))throw new TypeError("minDate() date parameter is after options.maxDate: " + parsedDate.format(actualFormat));
                return options.minDate = parsedDate, options.useCurrent && !options.keepInvalid && date.isBefore(minDate) && setValue(options.minDate), viewDate.isBefore(parsedDate) && (viewDate = parsedDate.clone().add(options.stepping, "m")), update(), picker
            }, picker.defaultDate = function (defaultDate) {
                if (0 === arguments.length)return options.defaultDate ? options.defaultDate.clone() : options.defaultDate;
                if (!defaultDate)return options.defaultDate = !1, picker;
                "string" == typeof defaultDate && ("now" !== defaultDate && "moment" !== defaultDate || (defaultDate = getMoment()));
                var parsedDate = parseInputDate(defaultDate);
                if (!parsedDate.isValid())throw new TypeError("defaultDate() Could not parse date parameter: " + defaultDate);
                if (!isValid(parsedDate))throw new TypeError("defaultDate() date passed is invalid according to component setup validations");
                return options.defaultDate = parsedDate, (options.defaultDate && options.inline || "" === input.val().trim()) && setValue(options.defaultDate), picker
            }, picker.locale = function (locale) {
                if (0 === arguments.length)return options.locale;
                if (!moment.localeData(locale))throw new TypeError("locale() locale " + locale + " is not loaded from moment locales!");
                return options.locale = locale, date.locale(options.locale), viewDate.locale(options.locale), actualFormat && initFormatting(), widget && (hide(), show()), picker
            }, picker.stepping = function (stepping) {
                return 0 === arguments.length ? options.stepping : (stepping = parseInt(stepping, 10), (isNaN(stepping) || 1 > stepping) && (stepping = 1), options.stepping = stepping, picker)
            }, picker.useCurrent = function (useCurrent) {
                var useCurrentOptions = ["year", "month", "day", "hour", "minute"];
                if (0 === arguments.length)return options.useCurrent;
                if ("boolean" != typeof useCurrent && "string" != typeof useCurrent)throw new TypeError("useCurrent() expects a boolean or string parameter");
                if ("string" == typeof useCurrent && -1 === useCurrentOptions.indexOf(useCurrent.toLowerCase()))throw new TypeError("useCurrent() expects a string parameter of " + useCurrentOptions.join(", "));
                return options.useCurrent = useCurrent, picker
            }, picker.collapse = function (collapse) {
                if (0 === arguments.length)return options.collapse;
                if ("boolean" != typeof collapse)throw new TypeError("collapse() expects a boolean parameter");
                return options.collapse === collapse ? picker : (options.collapse = collapse, widget && (hide(), show()), picker)
            }, picker.icons = function (icons) {
                if (0 === arguments.length)return $.extend({}, options.icons);
                if (!(icons instanceof Object))throw new TypeError("icons() expects parameter to be an Object");
                return $.extend(options.icons, icons), widget && (hide(), show()), picker
            }, picker.tooltips = function (tooltips) {
                if (0 === arguments.length)return $.extend({}, options.tooltips);
                if (!(tooltips instanceof Object))throw new TypeError("tooltips() expects parameter to be an Object");
                return $.extend(options.tooltips, tooltips), widget && (hide(), show()), picker
            }, picker.useStrict = function (useStrict) {
                if (0 === arguments.length)return options.useStrict;
                if ("boolean" != typeof useStrict)throw new TypeError("useStrict() expects a boolean parameter");
                return options.useStrict = useStrict, picker
            }, picker.sideBySide = function (sideBySide) {
                if (0 === arguments.length)return options.sideBySide;
                if ("boolean" != typeof sideBySide)throw new TypeError("sideBySide() expects a boolean parameter");
                return options.sideBySide = sideBySide, widget && (hide(), show()), picker
            }, picker.viewMode = function (viewMode) {
                if (0 === arguments.length)return options.viewMode;
                if ("string" != typeof viewMode)throw new TypeError("viewMode() expects a string parameter");
                if (-1 === viewModes.indexOf(viewMode))throw new TypeError("viewMode() parameter must be one of (" + viewModes.join(", ") + ") value");
                return options.viewMode = viewMode, currentViewMode = Math.max(viewModes.indexOf(viewMode), minViewModeNumber), showMode(), picker
            }, picker.toolbarPlacement = function (toolbarPlacement) {
                if (0 === arguments.length)return options.toolbarPlacement;
                if ("string" != typeof toolbarPlacement)throw new TypeError("toolbarPlacement() expects a string parameter");
                if (-1 === toolbarPlacements.indexOf(toolbarPlacement))throw new TypeError("toolbarPlacement() parameter must be one of (" + toolbarPlacements.join(", ") + ") value");
                return options.toolbarPlacement = toolbarPlacement, widget && (hide(), show()), picker
            }, picker.widgetPositioning = function (widgetPositioning) {
                if (0 === arguments.length)return $.extend({}, options.widgetPositioning);
                if ("[object Object]" !== {}.toString.call(widgetPositioning))throw new TypeError("widgetPositioning() expects an object variable");
                if (widgetPositioning.horizontal) {
                    if ("string" != typeof widgetPositioning.horizontal)throw new TypeError("widgetPositioning() horizontal variable must be a string");
                    if (widgetPositioning.horizontal = widgetPositioning.horizontal.toLowerCase(), -1 === horizontalModes.indexOf(widgetPositioning.horizontal))throw new TypeError("widgetPositioning() expects horizontal parameter to be one of (" + horizontalModes.join(", ") + ")");
                    options.widgetPositioning.horizontal = widgetPositioning.horizontal
                }
                if (widgetPositioning.vertical) {
                    if ("string" != typeof widgetPositioning.vertical)throw new TypeError("widgetPositioning() vertical variable must be a string");
                    if (widgetPositioning.vertical = widgetPositioning.vertical.toLowerCase(), -1 === verticalModes.indexOf(widgetPositioning.vertical))throw new TypeError("widgetPositioning() expects vertical parameter to be one of (" + verticalModes.join(", ") + ")");
                    options.widgetPositioning.vertical = widgetPositioning.vertical
                }
                return update(), picker
            }, picker.calendarWeeks = function (calendarWeeks) {
                if (0 === arguments.length)return options.calendarWeeks;
                if ("boolean" != typeof calendarWeeks)throw new TypeError("calendarWeeks() expects parameter to be a boolean value");
                return options.calendarWeeks = calendarWeeks, update(), picker
            }, picker.showTodayButton = function (showTodayButton) {
                if (0 === arguments.length)return options.showTodayButton;
                if ("boolean" != typeof showTodayButton)throw new TypeError("showTodayButton() expects a boolean parameter");
                return options.showTodayButton = showTodayButton, widget && (hide(), show()), picker
            }, picker.showClear = function (showClear) {
                if (0 === arguments.length)return options.showClear;
                if ("boolean" != typeof showClear)throw new TypeError("showClear() expects a boolean parameter");
                return options.showClear = showClear, widget && (hide(), show()), picker
            }, picker.widgetParent = function (widgetParent) {
                if (0 === arguments.length)return options.widgetParent;
                if ("string" == typeof widgetParent && (widgetParent = $(widgetParent)), null !== widgetParent && "string" != typeof widgetParent && !(widgetParent instanceof $))throw new TypeError("widgetParent() expects a string or a jQuery object parameter");
                return options.widgetParent = widgetParent, widget && (hide(), show()), picker
            }, picker.keepOpen = function (keepOpen) {
                if (0 === arguments.length)return options.keepOpen;
                if ("boolean" != typeof keepOpen)throw new TypeError("keepOpen() expects a boolean parameter");
                return options.keepOpen = keepOpen, picker
            }, picker.focusOnShow = function (focusOnShow) {
                if (0 === arguments.length)return options.focusOnShow;
                if ("boolean" != typeof focusOnShow)throw new TypeError("focusOnShow() expects a boolean parameter");
                return options.focusOnShow = focusOnShow, picker
            }, picker.inline = function (inline) {
                if (0 === arguments.length)return options.inline;
                if ("boolean" != typeof inline)throw new TypeError("inline() expects a boolean parameter");
                return options.inline = inline, picker
            }, picker.clear = function () {
                return clear(), picker
            }, picker.keyBinds = function (keyBinds) {
                return options.keyBinds = keyBinds, picker
            }, picker.getMoment = function (d) {
                return getMoment(d)
            }, picker.debug = function (debug) {
                if ("boolean" != typeof debug)throw new TypeError("debug() expects a boolean parameter");
                return options.debug = debug, picker
            }, picker.allowInputToggle = function (allowInputToggle) {
                if (0 === arguments.length)return options.allowInputToggle;
                if ("boolean" != typeof allowInputToggle)throw new TypeError("allowInputToggle() expects a boolean parameter");
                return options.allowInputToggle = allowInputToggle, picker
            }, picker.showClose = function (showClose) {
                if (0 === arguments.length)return options.showClose;
                if ("boolean" != typeof showClose)throw new TypeError("showClose() expects a boolean parameter");
                return options.showClose = showClose, picker
            }, picker.keepInvalid = function (keepInvalid) {
                if (0 === arguments.length)return options.keepInvalid;
                if ("boolean" != typeof keepInvalid)throw new TypeError("keepInvalid() expects a boolean parameter");
                return options.keepInvalid = keepInvalid, picker
            }, picker.datepickerInput = function (datepickerInput) {
                if (0 === arguments.length)return options.datepickerInput;
                if ("string" != typeof datepickerInput)throw new TypeError("datepickerInput() expects a string parameter");
                return options.datepickerInput = datepickerInput, picker
            }, picker.parseInputDate = function (parseInputDate) {
                if (0 === arguments.length)return options.parseInputDate;
                if ("function" != typeof parseInputDate)throw new TypeError("parseInputDate() sholud be as function");
                return options.parseInputDate = parseInputDate, picker
            }, picker.disabledTimeIntervals = function (disabledTimeIntervals) {
                if (0 === arguments.length)return options.disabledTimeIntervals ? $.extend({}, options.disabledTimeIntervals) : options.disabledTimeIntervals;
                if (!disabledTimeIntervals)return options.disabledTimeIntervals = !1, update(), picker;
                if (!(disabledTimeIntervals instanceof Array))throw new TypeError("disabledTimeIntervals() expects an array parameter");
                return options.disabledTimeIntervals = disabledTimeIntervals, update(), picker
            }, picker.disabledHours = function (hours) {
                if (0 === arguments.length)return options.disabledHours ? $.extend({}, options.disabledHours) : options.disabledHours;
                if (!hours)return options.disabledHours = !1, update(), picker;
                if (!(hours instanceof Array))throw new TypeError("disabledHours() expects an array parameter");
                if (options.disabledHours = indexGivenHours(hours), options.enabledHours = !1, options.useCurrent && !options.keepInvalid) {
                    for (var tries = 0; !isValid(date, "h");) {
                        if (date.add(1, "h"), 24 === tries)throw"Tried 24 times to find a valid date";
                        tries++
                    }
                    setValue(date)
                }
                return update(), picker
            }, picker.enabledHours = function (hours) {
                if (0 === arguments.length)return options.enabledHours ? $.extend({}, options.enabledHours) : options.enabledHours;
                if (!hours)return options.enabledHours = !1, update(), picker;
                if (!(hours instanceof Array))throw new TypeError("enabledHours() expects an array parameter");
                if (options.enabledHours = indexGivenHours(hours), options.disabledHours = !1, options.useCurrent && !options.keepInvalid) {
                    for (var tries = 0; !isValid(date, "h");) {
                        if (date.add(1, "h"), 24 === tries)throw"Tried 24 times to find a valid date";
                        tries++
                    }
                    setValue(date)
                }
                return update(), picker
            }, picker.viewDate = function (newDate) {
                if (0 === arguments.length)return viewDate.clone();
                if (!newDate)return viewDate = date.clone(), picker;
                if (!("string" == typeof newDate || moment.isMoment(newDate) || newDate instanceof Date))throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");
                return viewDate = parseInputDate(newDate), viewUpdate(), picker
            }, element.is("input"))input = element; else if (input = element.find(options.datepickerInput), 0 === input.size())input = element.find("input"); else if (!input.is("input"))throw new Error('CSS class "' + options.datepickerInput + '" cannot be applied to non input element');
        if (element.hasClass("input-group") && (component = 0 === element.find(".datepickerbutton").size() ? element.find(".input-group-addon") : element.find(".datepickerbutton")), !options.inline && !input.is("input"))throw new Error("Could not initialize DateTimePicker without an input element");
        return date = getMoment(), viewDate = date.clone(), $.extend(!0, options, dataToOptions()), picker.options(options), initFormatting(), attachDatePickerElementEvents(), input.prop("disabled") && picker.disable(), input.is("input") && 0 !== input.val().trim().length ? setValue(parseInputDate(input.val().trim())) : options.defaultDate && void 0 === input.attr("placeholder") && setValue(options.defaultDate), options.inline && show(), picker
    };
    $.fn.datetimepicker = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.data("DateTimePicker") || (options = $.extend(!0, {}, $.fn.datetimepicker.defaults, options), $this.data("DateTimePicker", dateTimePicker($this, options)))
        })
    }, $.fn.datetimepicker.defaults = {
        timeZone: "Etc/UTC",
        format: !1,
        dayViewHeaderFormat: "MMMM YYYY",
        extraFormats: !1,
        stepping: 1,
        minDate: !1,
        maxDate: !1,
        useCurrent: !0,
        collapse: !0,
        locale: moment.locale(),
        defaultDate: !1,
        disabledDates: !1,
        enabledDates: !1,
        icons: {
            time: "glyphicon glyphicon-time",
            date: "glyphicon glyphicon-calendar",
            up: "glyphicon glyphicon-chevron-up",
            down: "glyphicon glyphicon-chevron-down",
            previous: "glyphicon glyphicon-chevron-left",
            next: "glyphicon glyphicon-chevron-right",
            today: "glyphicon glyphicon-screenshot",
            clear: "glyphicon glyphicon-trash",
            close: "glyphicon glyphicon-remove"
        },
        tooltips: {
            today: "Go to today",
            clear: "Clear selection",
            close: "Close the picker",
            selectMonth: "Select Month",
            prevMonth: "Previous Month",
            nextMonth: "Next Month",
            selectYear: "Select Year",
            prevYear: "Previous Year",
            nextYear: "Next Year",
            selectDecade: "Select Decade",
            prevDecade: "Previous Decade",
            nextDecade: "Next Decade",
            prevCentury: "Previous Century",
            nextCentury: "Next Century",
            pickHour: "Pick Hour",
            incrementHour: "Increment Hour",
            decrementHour: "Decrement Hour",
            pickMinute: "Pick Minute",
            incrementMinute: "Increment Minute",
            decrementMinute: "Decrement Minute",
            pickSecond: "Pick Second",
            incrementSecond: "Increment Second",
            decrementSecond: "Decrement Second",
            togglePeriod: "Toggle Period",
            selectTime: "Select Time"
        },
        useStrict: !1,
        sideBySide: !1,
        daysOfWeekDisabled: !1,
        calendarWeeks: !1,
        viewMode: "days",
        toolbarPlacement: "default",
        showTodayButton: !1,
        showClear: !1,
        showClose: !1,
        widgetPositioning: {horizontal: "auto", vertical: "auto"},
        widgetParent: null,
        ignoreReadonly: !1,
        keepOpen: !1,
        focusOnShow: !0,
        inline: !1,
        keepInvalid: !1,
        datepickerInput: ".datepickerinput",
        keyBinds: {
            up: function (widget) {
                if (widget) {
                    var d = this.date() || this.getMoment();
                    widget.find(".datepicker").is(":visible") ? this.date(d.clone().subtract(7, "d")) : this.date(d.clone().add(this.stepping(), "m"))
                }
            }, down: function (widget) {
                if (!widget)return void this.show();
                var d = this.date() || this.getMoment();
                widget.find(".datepicker").is(":visible") ? this.date(d.clone().add(7, "d")) : this.date(d.clone().subtract(this.stepping(), "m"))
            }, "control up": function (widget) {
                if (widget) {
                    var d = this.date() || this.getMoment();
                    widget.find(".datepicker").is(":visible") ? this.date(d.clone().subtract(1, "y")) : this.date(d.clone().add(1, "h"))
                }
            }, "control down": function (widget) {
                if (widget) {
                    var d = this.date() || this.getMoment();
                    widget.find(".datepicker").is(":visible") ? this.date(d.clone().add(1, "y")) : this.date(d.clone().subtract(1, "h"))
                }
            }, left: function (widget) {
                if (widget) {
                    var d = this.date() || this.getMoment();
                    widget.find(".datepicker").is(":visible") && this.date(d.clone().subtract(1, "d"))
                }
            }, right: function (widget) {
                if (widget) {
                    var d = this.date() || this.getMoment();
                    widget.find(".datepicker").is(":visible") && this.date(d.clone().add(1, "d"))
                }
            }, pageUp: function (widget) {
                if (widget) {
                    var d = this.date() || this.getMoment();
                    widget.find(".datepicker").is(":visible") && this.date(d.clone().subtract(1, "M"))
                }
            }, pageDown: function (widget) {
                if (widget) {
                    var d = this.date() || this.getMoment();
                    widget.find(".datepicker").is(":visible") && this.date(d.clone().add(1, "M"))
                }
            }, enter: function () {
                this.hide()
            }, escape: function () {
                this.hide()
            }, "control space": function (widget) {
                widget.find(".timepicker").is(":visible") && widget.find('.btn[data-action="togglePeriod"]').click()
            }, t: function () {
                this.date(this.getMoment())
            }, "delete": function () {
                this.clear()
            }
        },
        debug: !1,
        allowInputToggle: !1,
        disabledTimeIntervals: !1,
        disabledHours: !1,
        enabledHours: !1,
        viewDate: !1
    }
}), function (factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory(jQuery)
}(function ($) {
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        return "area" === nodeName ? (map = element.parentNode, mapName = map.name, element.href && mapName && "map" === map.nodeName.toLowerCase() ? (img = $("img[usemap='#" + mapName + "']")[0], !!img && visible(img)) : !1) : (/^(input|select|textarea|button|object)$/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element)
    }

    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
                return "hidden" === $.css(this, "visibility")
            }).length
    }

    $.ui = $.ui || {}, $.extend($.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), $.fn.extend({
        scrollParent: function (includeHidden) {
            var position = this.css("position"), excludeStaticParent = "absolute" === position, overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/, scrollParent = this.parents().filter(function () {
                var parent = $(this);
                return excludeStaticParent && "static" === parent.css("position") ? !1 : overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"))
            }).eq(0);
            return "fixed" !== position && scrollParent.length ? scrollParent : $(this[0].ownerDocument || document)
        }, uniqueId: function () {
            var uuid = 0;
            return function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++uuid)
                })
            }
        }(), removeUniqueId: function () {
            return this.each(function () {
                /^ui-id-\d+$/.test(this.id) && $(this).removeAttr("id")
            })
        }
    }), $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
            return function (elem) {
                return !!$.data(elem, dataName)
            }
        }) : function (elem, i, match) {
            return !!$.data(elem, match[3])
        }, focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")))
        }, tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex"), isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
        }
    }), $("<a>").outerWidth(1).jquery || $.each(["Width", "Height"], function (i, name) {
        function reduce(elem, size, border, margin) {
            return $.each(side, function () {
                size -= parseFloat($.css(elem, "padding" + this)) || 0, border && (size -= parseFloat($.css(elem, "border" + this + "Width")) || 0), margin && (size -= parseFloat($.css(elem, "margin" + this)) || 0)
            }), size
        }

        var side = "Width" === name ? ["Left", "Right"] : ["Top", "Bottom"], type = name.toLowerCase(), orig = {
            innerWidth: $.fn.innerWidth,
            innerHeight: $.fn.innerHeight,
            outerWidth: $.fn.outerWidth,
            outerHeight: $.fn.outerHeight
        };
        $.fn["inner" + name] = function (size) {
            return void 0 === size ? orig["inner" + name].call(this) : this.each(function () {
                $(this).css(type, reduce(this, size) + "px")
            })
        }, $.fn["outer" + name] = function (size, margin) {
            return "number" != typeof size ? orig["outer" + name].call(this, size) : this.each(function () {
                $(this).css(type, reduce(this, size, !0, margin) + "px")
            })
        }
    }), $.fn.addBack || ($.fn.addBack = function (selector) {
        return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
    }), $("<a>").data("a-b", "a").removeData("a-b").data("a-b") && ($.fn.removeData = function (removeData) {
        return function (key) {
            return arguments.length ? removeData.call(this, $.camelCase(key)) : removeData.call(this)
        }
    }($.fn.removeData)), $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), $.fn.extend({
        focus: function (orig) {
            return function (delay, fn) {
                return "number" == typeof delay ? this.each(function () {
                    var elem = this;
                    setTimeout(function () {
                        $(elem).focus(), fn && fn.call(elem)
                    }, delay)
                }) : orig.apply(this, arguments)
            }
        }($.fn.focus), disableSelection: function () {
            var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.bind(eventType + ".ui-disableSelection", function (event) {
                    event.preventDefault()
                })
            }
        }(), enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }, zIndex: function (zIndex) {
            if (void 0 !== zIndex)return this.css("zIndex", zIndex);
            if (this.length)for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document;) {
                if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), !isNaN(value) && 0 !== value))return value;
                elem = elem.parent()
            }
            return 0
        }
    }), $.ui.plugin = {
        add: function (module, option, set) {
            var i, proto = $.ui[module].prototype;
            for (i in set)proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([option, set[i]])
        }, call: function (instance, name, args, allowDisconnected) {
            var i, set = instance.plugins[name];
            if (set && (allowDisconnected || instance.element[0].parentNode && 11 !== instance.element[0].parentNode.nodeType))for (i = 0; i < set.length; i++)instance.options[set[i][0]] && set[i][1].apply(instance.element, args)
        }
    }
}), function (factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory(jQuery)
}(function ($) {
    var widget_uuid = 0, widget_slice = Array.prototype.slice;
    return $.cleanData = function (orig) {
        return function (elems) {
            var events, elem, i;
            for (i = 0; null != (elem = elems[i]); i++)try {
                events = $._data(elem, "events"), events && events.remove && $(elem).triggerHandler("remove")
            } catch (e) {
            }
            orig(elems)
        }
    }($.cleanData), $.widget = function (name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {}, namespace = name.split(".")[0];
        return name = name.split(".")[1], fullName = namespace + "-" + name, prototype || (prototype = base, base = $.Widget), $.expr[":"][fullName.toLowerCase()] = function (elem) {
            return !!$.data(elem, fullName)
        }, $[namespace] = $[namespace] || {}, existingConstructor = $[namespace][name], constructor = $[namespace][name] = function (options, element) {
            return this._createWidget ? void(arguments.length && this._createWidget(options, element)) : new constructor(options, element)
        }, $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        }), basePrototype = new base,
            basePrototype.options = $.widget.extend({}, basePrototype.options), $.each(prototype, function (prop, value) {
            return $.isFunction(value) ? void(proxiedPrototype[prop] = function () {
                var _super = function () {
                    return base.prototype[prop].apply(this, arguments)
                }, _superApply = function (args) {
                    return base.prototype[prop].apply(this, args)
                };
                return function () {
                    var returnValue, __super = this._super, __superApply = this._superApply;
                    return this._super = _super, this._superApply = _superApply, returnValue = value.apply(this, arguments), this._super = __super, this._superApply = __superApply, returnValue
                }
            }()) : void(proxiedPrototype[prop] = value)
        }), constructor.prototype = $.widget.extend(basePrototype, {widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name}, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        }), existingConstructor ? ($.each(existingConstructor._childConstructors, function (i, child) {
            var childPrototype = child.prototype;
            $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto)
        }), delete existingConstructor._childConstructors) : base._childConstructors.push(constructor), $.widget.bridge(name, constructor), constructor
    }, $.widget.extend = function (target) {
        for (var key, value, input = widget_slice.call(arguments, 1), inputIndex = 0, inputLength = input.length; inputLength > inputIndex; inputIndex++)for (key in input[inputIndex])value = input[inputIndex][key], input[inputIndex].hasOwnProperty(key) && void 0 !== value && ($.isPlainObject(value) ? target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value) : target[key] = value);
        return target
    }, $.widget.bridge = function (name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function (options) {
            var isMethodCall = "string" == typeof options, args = widget_slice.call(arguments, 1), returnValue = this;
            return isMethodCall ? this.each(function () {
                var methodValue, instance = $.data(this, fullName);
                return "instance" === options ? (returnValue = instance, !1) : instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? (methodValue = instance[options].apply(instance, args), methodValue !== instance && void 0 !== methodValue ? (returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue, !1) : void 0) : $.error("no such method '" + options + "' for " + name + " widget instance") : $.error("cannot call methods on " + name + " prior to initialization; attempted to call method '" + options + "'")
            }) : (args.length && (options = $.widget.extend.apply(null, [options].concat(args))), this.each(function () {
                var instance = $.data(this, fullName);
                instance ? (instance.option(options || {}), instance._init && instance._init()) : $.data(this, fullName, new object(options, this))
            })), returnValue
        }
    }, $.Widget = function () {
    }, $.Widget._childConstructors = [], $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {disabled: !1, create: null},
        _createWidget: function (options, element) {
            element = $(element || this.defaultElement || this)[0], this.element = $(element), this.uuid = widget_uuid++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = $(), this.hoverable = $(), this.focusable = $(), element !== this && ($.data(element, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (event) {
                    event.target === element && this.destroy()
                }
            }), this.document = $(element.style ? element.ownerDocument : element.document || element), this.window = $(this.document[0].defaultView || this.document[0].parentWindow)), this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: $.noop,
        widget: function () {
            return this.element
        },
        option: function (key, value) {
            var parts, curOption, i, options = key;
            if (0 === arguments.length)return $.widget.extend({}, this.options);
            if ("string" == typeof key)if (options = {}, parts = key.split("."), key = parts.shift(), parts.length) {
                for (curOption = options[key] = $.widget.extend({}, this.options[key]), i = 0; i < parts.length - 1; i++)curOption[parts[i]] = curOption[parts[i]] || {}, curOption = curOption[parts[i]];
                if (key = parts.pop(), 1 === arguments.length)return void 0 === curOption[key] ? null : curOption[key];
                curOption[key] = value
            } else {
                if (1 === arguments.length)return void 0 === this.options[key] ? null : this.options[key];
                options[key] = value
            }
            return this._setOptions(options), this
        },
        _setOptions: function (options) {
            var key;
            for (key in options)this._setOption(key, options[key]);
            return this
        },
        _setOption: function (key, value) {
            return this.options[key] = value, "disabled" === key && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!value), value && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function () {
            return this._setOptions({disabled: !1})
        },
        disable: function () {
            return this._setOptions({disabled: !0})
        },
        _on: function (suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            "boolean" != typeof suppressDisabledCheck && (handlers = element, element = suppressDisabledCheck, suppressDisabledCheck = !1), handlers ? (element = delegateElement = $(element), this.bindings = this.bindings.add(element)) : (handlers = element, element = this.element, delegateElement = this.widget()), $.each(handlers, function (event, handler) {
                function handlerProxy() {
                    return suppressDisabledCheck || instance.options.disabled !== !0 && !$(this).hasClass("ui-state-disabled") ? ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments) : void 0
                }

                "string" != typeof handler && (handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++);
                var match = event.match(/^([\w:-]*)\s*(.*)$/), eventName = match[1] + instance.eventNamespace, selector = match[2];
                selector ? delegateElement.delegate(selector, eventName, handlerProxy) : element.bind(eventName, handlerProxy)
            })
        },
        _off: function (element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, element.unbind(eventName).undelegate(eventName), this.bindings = $(this.bindings.not(element).get()), this.focusable = $(this.focusable.not(element).get()), this.hoverable = $(this.hoverable.not(element).get())
        },
        _delay: function (handler, delay) {
            function handlerProxy() {
                return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments)
            }

            var instance = this;
            return setTimeout(handlerProxy, delay || 0)
        },
        _hoverable: function (element) {
            this.hoverable = this.hoverable.add(element), this._on(element, {
                mouseenter: function (event) {
                    $(event.currentTarget).addClass("ui-state-hover")
                }, mouseleave: function (event) {
                    $(event.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (element) {
            this.focusable = this.focusable.add(element), this._on(element, {
                focusin: function (event) {
                    $(event.currentTarget).addClass("ui-state-focus")
                }, focusout: function (event) {
                    $(event.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (type, event, data) {
            var prop, orig, callback = this.options[type];
            if (data = data || {}, event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(), event.target = this.element[0], orig = event.originalEvent)for (prop in orig)prop in event || (event[prop] = orig[prop]);
            return this.element.trigger(event, data), !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === !1 || event.isDefaultPrevented())
        }
    }, $.each({show: "fadeIn", hide: "fadeOut"}, function (method, defaultEffect) {
        $.Widget.prototype["_" + method] = function (element, options, callback) {
            "string" == typeof options && (options = {effect: options});
            var hasOptions, effectName = options ? options === !0 || "number" == typeof options ? defaultEffect : options.effect || defaultEffect : method;
            options = options || {}, "number" == typeof options && (options = {duration: options}), hasOptions = !$.isEmptyObject(options), options.complete = callback, options.delay && element.delay(options.delay), hasOptions && $.effects && $.effects.effect[effectName] ? element[method](options) : effectName !== method && element[effectName] ? element[effectName](options.duration, options.easing, callback) : element.queue(function (next) {
                $(this)[method](), callback && callback.call(element[0]), next()
            })
        }
    }), $.widget
}), function (factory) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget", "./button"], factory) : factory(jQuery)
}(function ($) {
    function spinner_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments), this._refresh(), previous !== this.element.val() && this._trigger("change")
        }
    }

    return $.widget("ui.spinner", {
        version: "1.11.4",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n"},
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function () {
            var options = {}, element = this.element;
            return $.each(["min", "max", "step"], function (i, option) {
                var value = element.attr(option);
                void 0 !== value && value.length && (options[option] = value)
            }), options
        },
        _events: {
            keydown: function (event) {
                this._start(event) && this._keydown(event) && event.preventDefault()
            }, keyup: "_stop", focus: function () {
                this.previous = this.element.val()
            }, blur: function (event) {
                return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", event)))
            }, mousewheel: function (event, delta) {
                if (delta) {
                    if (!this.spinning && !this._start(event))return !1;
                    this._spin((delta > 0 ? 1 : -1) * this.options.step, event), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () {
                        this.spinning && this._stop(event)
                    }, 100), event.preventDefault()
                }
            }, "mousedown .ui-spinner-button": function (event) {
                function checkFocus() {
                    var isActive = this.element[0] === this.document[0].activeElement;
                    isActive || (this.element.focus(), this.previous = previous, this._delay(function () {
                        this.previous = previous
                    }))
                }

                var previous;
                previous = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), event.preventDefault(), checkFocus.call(this), this.cancelBlur = !0, this._delay(function () {
                    delete this.cancelBlur, checkFocus.call(this)
                }), this._start(event) !== !1 && this._repeat(null, $(event.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, event)
            }, "mouseup .ui-spinner-button": "_stop", "mouseenter .ui-spinner-button": function (event) {
                return $(event.currentTarget).hasClass("ui-state-active") ? this._start(event) === !1 ? !1 : void this._repeat(null, $(event.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, event) : void 0
            }, "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function () {
            var uiSpinner = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"), this.buttons = uiSpinner.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * uiSpinner.height()) && uiSpinner.height() > 0 && uiSpinner.height(uiSpinner.height()), this.options.disabled && this.disable()
        },
        _keydown: function (event) {
            var options = this.options, keyCode = $.ui.keyCode;
            switch (event.keyCode) {
                case keyCode.UP:
                    return this._repeat(null, 1, event), !0;
                case keyCode.DOWN:
                    return this._repeat(null, -1, event), !0;
                case keyCode.PAGE_UP:
                    return this._repeat(null, options.page, event), !0;
                case keyCode.PAGE_DOWN:
                    return this._repeat(null, -options.page, event), !0
            }
            return !1
        },
        _uiSpinnerHtml: function () {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function () {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
        },
        _start: function (event) {
            return this.spinning || this._trigger("start", event) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
        },
        _repeat: function (i, steps, event) {
            i = i || 500, clearTimeout(this.timer), this.timer = this._delay(function () {
                this._repeat(40, steps, event)
            }, i), this._spin(steps * this.options.step, event)
        },
        _spin: function (step, event) {
            var value = this.value() || 0;
            this.counter || (this.counter = 1), value = this._adjustValue(value + step * this._increment(this.counter)), this.spinning && this._trigger("spin", event, {value: value}) === !1 || (this._value(value), this.counter++)
        },
        _increment: function (i) {
            var incremental = this.options.incremental;
            return incremental ? $.isFunction(incremental) ? incremental(i) : Math.floor(i * i * i / 5e4 - i * i / 500 + 17 * i / 200 + 1) : 1
        },
        _precision: function () {
            var precision = this._precisionOf(this.options.step);
            return null !== this.options.min && (precision = Math.max(precision, this._precisionOf(this.options.min))), precision
        },
        _precisionOf: function (num) {
            var str = num.toString(), decimal = str.indexOf(".");
            return -1 === decimal ? 0 : str.length - decimal - 1
        },
        _adjustValue: function (value) {
            var base, aboveMin, options = this.options;
            return base = null !== options.min ? options.min : 0, aboveMin = value - base, aboveMin = Math.round(aboveMin / options.step) * options.step, value = base + aboveMin, value = parseFloat(value.toFixed(this._precision())), null !== options.max && value > options.max ? options.max : null !== options.min && value < options.min ? options.min : value
        },
        _stop: function (event) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", event))
        },
        _setOption: function (key, value) {
            if ("culture" === key || "numberFormat" === key) {
                var prevValue = this._parse(this.element.val());
                return this.options[key] = value, void this.element.val(this._format(prevValue))
            }
            "max" !== key && "min" !== key && "step" !== key || "string" == typeof value && (value = this._parse(value)), "icons" === key && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(value.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(value.down)), this._super(key, value), "disabled" === key && (this.widget().toggleClass("ui-state-disabled", !!value), this.element.prop("disabled", !!value), this.buttons.button(value ? "disable" : "enable"))
        },
        _setOptions: spinner_modifier(function (options) {
            this._super(options)
        }),
        _parse: function (val) {
            return "string" == typeof val && "" !== val && (val = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(val, 10, this.options.culture) : +val), "" === val || isNaN(val) ? null : val
        },
        _format: function (value) {
            return "" === value ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(value, this.options.numberFormat, this.options.culture) : value
        },
        _refresh: function () {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        isValid: function () {
            var value = this.value();
            return null === value ? !1 : value === this._adjustValue(value)
        },
        _value: function (value, allowAny) {
            var parsed;
            "" !== value && (parsed = this._parse(value), null !== parsed && (allowAny || (parsed = this._adjustValue(parsed)), value = this._format(parsed))), this.element.val(value), this._refresh()
        },
        _destroy: function () {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
        },
        stepUp: spinner_modifier(function (steps) {
            this._stepUp(steps)
        }),
        _stepUp: function (steps) {
            this._start() && (this._spin((steps || 1) * this.options.step), this._stop())
        },
        stepDown: spinner_modifier(function (steps) {
            this._stepDown(steps)
        }),
        _stepDown: function (steps) {
            this._start() && (this._spin((steps || 1) * -this.options.step), this._stop())
        },
        pageUp: spinner_modifier(function (pages) {
            this._stepUp((pages || 1) * this.options.page)
        }),
        pageDown: spinner_modifier(function (pages) {
            this._stepDown((pages || 1) * this.options.page)
        }),
        value: function (newVal) {
            return arguments.length ? void spinner_modifier(this._value).call(this, newVal) : this._parse(this.element.val())
        },
        widget: function () {
            return this.uiSpinner
        }
    })
}), function (factory) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget"], factory) : factory(jQuery)
}(function ($) {
    var lastActive, baseClasses = "ui-button ui-widget ui-state-default ui-corner-all", typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", formResetHandler = function () {
        var form = $(this);
        setTimeout(function () {
            form.find(":ui-button").button("refresh")
        }, 1)
    }, radioGroup = function (radio) {
        var name = radio.name, form = radio.form, radios = $([]);
        return name && (name = name.replace(/'/g, "\\'"), radios = form ? $(form).find("[name='" + name + "'][type=radio]") : $("[name='" + name + "'][type=radio]", radio.ownerDocument).filter(function () {
            return !this.form
        })), radios
    };
    return $.widget("ui.button", {
        version: "1.11.4",
        defaultElement: "<button>",
        options: {disabled: null, text: !0, label: null, icons: {primary: null, secondary: null}},
        _create: function () {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, formResetHandler), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var that = this, options = this.options, toggleButton = "checkbox" === this.type || "radio" === this.type, activeClass = toggleButton ? "" : "ui-state-active";
            null === options.label && (options.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                options.disabled || this === lastActive && $(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function () {
                options.disabled || $(this).removeClass(activeClass)
            }).bind("click" + this.eventNamespace, function (event) {
                options.disabled && (event.preventDefault(), event.stopImmediatePropagation())
            }), this._on({
                focus: function () {
                    this.buttonElement.addClass("ui-state-focus")
                }, blur: function () {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            }), toggleButton && this.element.bind("change" + this.eventNamespace, function () {
                that.refresh()
            }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                return options.disabled ? !1 : void 0
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                if (options.disabled)return !1;
                $(this).addClass("ui-state-active"), that.buttonElement.attr("aria-pressed", "true");
                var radio = that.element[0];
                radioGroup(radio).not(radio).map(function () {
                    return $(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                return options.disabled ? !1 : ($(this).addClass("ui-state-active"), lastActive = this, void that.document.one("mouseup", function () {
                    lastActive = null
                }))
            }).bind("mouseup" + this.eventNamespace, function () {
                return options.disabled ? !1 : void $(this).removeClass("ui-state-active")
            }).bind("keydown" + this.eventNamespace, function (event) {
                return options.disabled ? !1 : void(event.keyCode !== $.ui.keyCode.SPACE && event.keyCode !== $.ui.keyCode.ENTER || $(this).addClass("ui-state-active"))
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
                $(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function (event) {
                event.keyCode === $.ui.keyCode.SPACE && $(this).click()
            })), this._setOption("disabled", options.disabled), this._resetButton()
        },
        _determineButtonType: function () {
            var ancestor, labelSelector, checked;
            this.element.is("[type=checkbox]") ? this.type = "checkbox" : this.element.is("[type=radio]") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button", "checkbox" === this.type || "radio" === this.type ? (ancestor = this.element.parents().last(), labelSelector = "label[for='" + this.element.attr("id") + "']", this.buttonElement = ancestor.find(labelSelector), this.buttonElement.length || (ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings(), this.buttonElement = ancestor.filter(labelSelector), this.buttonElement.length || (this.buttonElement = ancestor.find(labelSelector))), this.element.addClass("ui-helper-hidden-accessible"), checked = this.element.is(":checked"), checked && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", checked)) : this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(baseClasses + " ui-state-active " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function (key, value) {
            return this._super(key, value), "disabled" === key ? (this.widget().toggleClass("ui-state-disabled", !!value), this.element.prop("disabled", !!value), void(value && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")))) : void this._resetButton()
        },
        refresh: function () {
            var isDisabled = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            isDisabled !== this.options.disabled && this._setOption("disabled", isDisabled), "radio" === this.type ? radioGroup(this.element[0]).each(function () {
                $(this).is(":checked") ? $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : $(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function () {
            if ("input" === this.type)return void(this.options.label && this.element.val(this.options.label));
            var buttonElement = this.buttonElement.removeClass(typeClasses), buttonText = $("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(), icons = this.options.icons, multipleIcons = icons.primary && icons.secondary, buttonClasses = [];
            icons.primary || icons.secondary ? (this.options.text && buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" : icons.primary ? "-primary" : "-secondary")), icons.primary && buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>"), icons.secondary && buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>"), this.options.text || (buttonClasses.push(multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || buttonElement.attr("title", $.trim(buttonText)))) : buttonClasses.push("ui-button-text-only"), buttonElement.addClass(buttonClasses.join(" "))
        }
    }), $.widget("ui.buttonset", {
        version: "1.11.4",
        options: {items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (key, value) {
            "disabled" === key && this.buttons.button("option", key, value), this._super(key, value)
        },
        refresh: function () {
            var rtl = "rtl" === this.element.css("direction"), allButtons = this.element.find(this.options.items), existingButtons = allButtons.filter(":ui-button");
            allButtons.not(":ui-button").button(), existingButtons.button("refresh"), this.buttons = allButtons.map(function () {
                return $(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(rtl ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function () {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
                return $(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    }), $.ui.button
}), function () {
    for (var i, e = 500, t = 15, n = 0, r = document.getElementsByTagName("a"), s = 0; s < r.length; s++)i = void 0 === r[s].attributes.href ? null : r[s].attributes.href.nodeValue.toString(), null !== i && i.length > 1 && "#" == i.substr(0, 1) && (r[s].onclick = function () {
        var r, i = this.attributes.href.nodeValue.toString();
        if (r = document.getElementById(i.substr(1)))for (var s = e / t, a = u(), f = (o(r) - a - n) / s, l = 1; s >= l; l++)!function () {
            var e = f * l;
            setTimeout(function () {
                window.scrollTo(0, e + a)
            }, t * l)
        }();
        return !1
    });
    var o = function (e) {
        for (var t = 0; void 0 != e.offsetParent && null != e.offsetParent;)t += e.offsetTop + (null != e.clientTop ? e.clientTop : 0), e = e.offsetParent;
        return t
    }, u = function () {
        return document.documentElement.scrollTop + document.body.scrollTop
    }
}(), function (g) {
    "function" == typeof define && define.amd ? define(["jquery"], g(jQuery, document, window, navigator)) : g(jQuery, document, window, navigator)
}(function (g, r, h, t, v) {
    var u = 0, p = function () {
        var a = t.userAgent, b = /msie\s\d+/i;
        return 0 < a.search(b) && (a = b.exec(a).toString(), a = a.split(" ")[1], 9 > a) ? (g("html").addClass("lt-ie9"), !0) : !1
    }();
    Function.prototype.bind || (Function.prototype.bind = function (a) {
        var b = this, d = [].slice;
        if ("function" != typeof b)throw new TypeError;
        var c = d.call(arguments, 1), e = function () {
            if (this instanceof e) {
                var f = function () {
                };
                f.prototype = b.prototype;
                var f = new f, l = b.apply(f, c.concat(d.call(arguments)));
                return Object(l) === l ? l : f
            }
            return b.apply(a, c.concat(d.call(arguments)))
        };
        return e
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
        var d;
        if (null == this)throw new TypeError('"this" is null or not defined');
        var c = Object(this), e = c.length >>> 0;
        if (0 === e)return -1;
        if (d = +b || 0, 1 / 0 === Math.abs(d) && (d = 0), d >= e)return -1;
        for (d = Math.max(d >= 0 ? d : e - Math.abs(d), 0); e > d;) {
            if (d in c && c[d] === a)return d;
            d++
        }
        return -1
    });
    var q = function (a, b, d) {
        this.VERSION = "2.1.3", this.input = a, this.plugin_count = d, this.old_to = this.old_from = this.update_tm = this.calc_count = this.current_plugin = 0, this.raf_id = this.old_min_interval = null, this.is_update = this.is_key = this.no_diapason = this.force_redraw = this.dragging = !1, this.is_start = !0, this.is_click = this.is_resize = this.is_active = this.is_finish = !1, this.$cache = {
            win: g(h),
            body: g(r.body),
            input: g(a),
            cont: null,
            rs: null,
            min: null,
            max: null,
            from: null,
            to: null,
            single: null,
            bar: null,
            line: null,
            s_single: null,
            s_from: null,
            s_to: null,
            shad_single: null,
            shad_from: null,
            shad_to: null,
            edge: null,
            grid: null,
            grid_labels: []
        }, this.coords = {
            x_gap: 0,
            x_pointer: 0,
            w_rs: 0,
            w_rs_old: 0,
            w_handle: 0,
            p_gap: 0,
            p_gap_left: 0,
            p_gap_right: 0,
            p_step: 0,
            p_pointer: 0,
            p_handle: 0,
            p_single_fake: 0,
            p_single_real: 0,
            p_from_fake: 0,
            p_from_real: 0,
            p_to_fake: 0,
            p_to_real: 0,
            p_bar_x: 0,
            p_bar_w: 0,
            grid_gap: 0,
            big_num: 0,
            big: [],
            big_w: [],
            big_p: [],
            big_x: []
        }, this.labels = {
            w_min: 0,
            w_max: 0,
            w_from: 0,
            w_to: 0,
            w_single: 0,
            p_min: 0,
            p_max: 0,
            p_from_fake: 0,
            p_from_left: 0,
            p_to_fake: 0,
            p_to_left: 0,
            p_single_fake: 0,
            p_single_left: 0
        };
        var c = this.$cache.input;
        a = c.prop("value");
        var e;
        d = {
            type: "single",
            min: 10,
            max: 100,
            from: null,
            to: null,
            step: 1,
            min_interval: 0,
            max_interval: 0,
            drag_interval: !1,
            values: [],
            p_values: [],
            from_fixed: !1,
            from_min: null,
            from_max: null,
            from_shadow: !1,
            to_fixed: !1,
            to_min: null,
            to_max: null,
            to_shadow: !1,
            prettify_enabled: !0,
            prettify_separator: " ",
            prettify: null,
            force_edges: !1,
            keyboard: !1,
            keyboard_step: 5,
            grid: !1,
            grid_margin: !0,
            grid_num: 4,
            grid_snap: !1,
            hide_min_max: !1,
            hide_from_to: !1,
            prefix: "",
            postfix: "",
            max_postfix: "",
            decorate_both: !0,
            values_separator: " — ",
            input_values_separator: ";",
            disable: !1,
            onStart: null,
            onChange: null,
            onFinish: null,
            onUpdate: null
        }, c = {
            type: c.data("type"),
            min: c.data("min"),
            max: c.data("max"),
            from: c.data("from"),
            to: c.data("to"),
            step: c.data("step"),
            min_interval: c.data("minInterval"),
            max_interval: c.data("maxInterval"),
            drag_interval: c.data("dragInterval"),
            values: c.data("values"),
            from_fixed: c.data("fromFixed"),
            from_min: c.data("fromMin"),
            from_max: c.data("fromMax"),
            from_shadow: c.data("fromShadow"),
            to_fixed: c.data("toFixed"),
            to_min: c.data("toMin"),
            to_max: c.data("toMax"),
            to_shadow: c.data("toShadow"),
            prettify_enabled: c.data("prettifyEnabled"),
            prettify_separator: c.data("prettifySeparator"),
            force_edges: c.data("forceEdges"),
            keyboard: c.data("keyboard"),
            keyboard_step: c.data("keyboardStep"),
            grid: c.data("grid"),
            grid_margin: c.data("gridMargin"),
            grid_num: c.data("gridNum"),
            grid_snap: c.data("gridSnap"),
            hide_min_max: c.data("hideMinMax"),
            hide_from_to: c.data("hideFromTo"),
            prefix: c.data("prefix"),
            postfix: c.data("postfix"),
            max_postfix: c.data("maxPostfix"),
            decorate_both: c.data("decorateBoth"),
            values_separator: c.data("valuesSeparator"),
            input_values_separator: c.data("inputValuesSeparator"),
            disable: c.data("disable")
        }, c.values = c.values && c.values.split(",");
        for (e in c)c.hasOwnProperty(e) && (c[e] || 0 === c[e] || delete c[e]);
        a && (a = a.split(c.input_values_separator || b.input_values_separator || ";"), a[0] && a[0] == +a[0] && (a[0] = +a[0]), a[1] && a[1] == +a[1] && (a[1] = +a[1]), b && b.values && b.values.length ? (d.from = a[0] && b.values.indexOf(a[0]), d.to = a[1] && b.values.indexOf(a[1])) : (d.from = a[0] && +a[0], d.to = a[1] && +a[1])), g.extend(d, b), g.extend(d, c), this.options = d, this.validate(), this.result = {
            input: this.$cache.input,
            slider: null,
            min: this.options.min,
            max: this.options.max,
            from: this.options.from,
            from_percent: 0,
            from_value: null,
            to: this.options.to,
            to_percent: 0,
            to_value: null
        }, this.init()
    };
    q.prototype = {
        init: function (a) {
            this.no_diapason = !1, this.coords.p_step = this.convertToPercent(this.options.step, !0), this.target = "base", this.toggleInput(), this.append(), this.setMinMax(), a ? (this.force_redraw = !0, this.calc(!0), this.callOnUpdate()) : (this.force_redraw = !0, this.calc(!0), this.callOnStart()), this.updateScene()
        }, append: function () {
            this.$cache.input.before('<span class="irs js-irs-' + this.plugin_count + '"></span>'), this.$cache.input.prop("readonly", !0), this.$cache.cont = this.$cache.input.prev(), this.result.slider = this.$cache.cont, this.$cache.cont.html('<span class="irs"><span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span>'), this.$cache.rs = this.$cache.cont.find(".irs"), this.$cache.min = this.$cache.cont.find(".irs-min"), this.$cache.max = this.$cache.cont.find(".irs-max"), this.$cache.from = this.$cache.cont.find(".irs-from"), this.$cache.to = this.$cache.cont.find(".irs-to"), this.$cache.single = this.$cache.cont.find(".irs-single"), this.$cache.bar = this.$cache.cont.find(".irs-bar"), this.$cache.line = this.$cache.cont.find(".irs-line"), this.$cache.grid = this.$cache.cont.find(".irs-grid"), "single" === this.options.type ? (this.$cache.cont.append('<span class="irs-bar-edge"></span><span class="irs-shadow shadow-single"></span><span class="irs-slider single"></span>'), this.$cache.edge = this.$cache.cont.find(".irs-bar-edge"), this.$cache.s_single = this.$cache.cont.find(".single"), this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.shad_single = this.$cache.cont.find(".shadow-single")) : (this.$cache.cont.append('<span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span>'), this.$cache.s_from = this.$cache.cont.find(".from"), this.$cache.s_to = this.$cache.cont.find(".to"), this.$cache.shad_from = this.$cache.cont.find(".shadow-from"), this.$cache.shad_to = this.$cache.cont.find(".shadow-to"), this.setTopHandler()), this.options.hide_from_to && (this.$cache.from[0].style.display = "none", this.$cache.to[0].style.display = "none", this.$cache.single[0].style.display = "none"), this.appendGrid(), this.options.disable ? (this.appendDisableMask(), this.$cache.input[0].disabled = !0) : (this.$cache.cont.removeClass("irs-disabled"),
                this.$cache.input[0].disabled = !1, this.bindEvents()), this.options.drag_interval && (this.$cache.bar[0].style.cursor = "ew-resize")
        }, setTopHandler: function () {
            var a = this.options.max, b = this.options.to;
            this.options.from > this.options.min && b === a ? this.$cache.s_from.addClass("type_last") : a > b && this.$cache.s_to.addClass("type_last")
        }, changeLevel: function (a) {
            switch (a) {
                case"single":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
                    break;
                case"from":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake), this.$cache.s_from.addClass("state_hover"), this.$cache.s_from.addClass("type_last"), this.$cache.s_to.removeClass("type_last");
                    break;
                case"to":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake), this.$cache.s_to.addClass("state_hover"), this.$cache.s_to.addClass("type_last"), this.$cache.s_from.removeClass("type_last");
                    break;
                case"both":
                    this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake), this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer), this.$cache.s_to.removeClass("type_last"), this.$cache.s_from.removeClass("type_last")
            }
        }, appendDisableMask: function () {
            this.$cache.cont.append('<span class="irs-disable-mask"></span>'), this.$cache.cont.addClass("irs-disabled")
        }, remove: function () {
            this.$cache.cont.remove(), this.$cache.cont = null, this.$cache.line.off("keydown.irs_" + this.plugin_count), this.$cache.body.off("touchmove.irs_" + this.plugin_count), this.$cache.body.off("mousemove.irs_" + this.plugin_count), this.$cache.win.off("touchend.irs_" + this.plugin_count), this.$cache.win.off("mouseup.irs_" + this.plugin_count), p && (this.$cache.body.off("mouseup.irs_" + this.plugin_count), this.$cache.body.off("mouseleave.irs_" + this.plugin_count)), this.$cache.grid_labels = [], this.coords.big = [], this.coords.big_w = [], this.coords.big_p = [], this.coords.big_x = [], cancelAnimationFrame(this.raf_id)
        }, bindEvents: function () {
            this.no_diapason || (this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this)), this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this)), this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.options.drag_interval && "double" === this.options.type ? (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"))) : (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))), "single" === this.options.type ? (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))), this.options.keyboard && this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard")), p && (this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this))))
        }, pointerMove: function (a) {
            this.dragging && (this.coords.x_pointer = (a.pageX || a.originalEvent.touches && a.originalEvent.touches[0].pageX) - this.coords.x_gap, this.calc())
        }, pointerUp: function (a) {
            this.current_plugin === this.plugin_count && this.is_active && (this.is_active = !1, this.$cache.cont.find(".state_hover").removeClass("state_hover"), this.force_redraw = !0, p && g("*").prop("unselectable", !1), this.updateScene(), this.restoreOriginalMinInterval(), (g.contains(this.$cache.cont[0], a.target) || this.dragging) && (this.is_finish = !0, this.callOnFinish()), this.dragging = !1)
        }, pointerDown: function (a, b) {
            b.preventDefault();
            var d = b.pageX || b.originalEvent.touches && b.originalEvent.touches[0].pageX;
            2 !== b.button && ("both" === a && this.setTempMinInterval(), a || (a = this.target), this.current_plugin = this.plugin_count, this.target = a, this.dragging = this.is_active = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = d - this.coords.x_gap, this.calcPointerPercent(), this.changeLevel(a), p && g("*").prop("unselectable", !0), this.$cache.line.trigger("focus"), this.updateScene())
        }, pointerClick: function (a, b) {
            b.preventDefault();
            var d = b.pageX || b.originalEvent.touches && b.originalEvent.touches[0].pageX;
            2 !== b.button && (this.current_plugin = this.plugin_count, this.target = a, this.is_click = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = +(d - this.coords.x_gap).toFixed(), this.force_redraw = !0, this.calc(), this.$cache.line.trigger("focus"))
        }, key: function (a, b) {
            if (!(this.current_plugin !== this.plugin_count || b.altKey || b.ctrlKey || b.shiftKey || b.metaKey)) {
                switch (b.which) {
                    case 83:
                    case 65:
                    case 40:
                    case 37:
                        b.preventDefault(), this.moveByKey(!1);
                        break;
                    case 87:
                    case 68:
                    case 38:
                    case 39:
                        b.preventDefault(), this.moveByKey(!0)
                }
                return !0
            }
        }, moveByKey: function (a) {
            var b = this.coords.p_pointer, b = a ? b + this.options.keyboard_step : b - this.options.keyboard_step;
            this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * b), this.is_key = !0, this.calc()
        }, setMinMax: function () {
            this.options && (this.options.hide_min_max ? (this.$cache.min[0].style.display = "none", this.$cache.max[0].style.display = "none") : (this.options.values.length ? (this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])), this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]))) : (this.$cache.min.html(this.decorate(this._prettify(this.options.min), this.options.min)), this.$cache.max.html(this.decorate(this._prettify(this.options.max), this.options.max))), this.labels.w_min = this.$cache.min.outerWidth(!1), this.labels.w_max = this.$cache.max.outerWidth(!1)))
        }, setTempMinInterval: function () {
            var a = this.result.to - this.result.from;
            null === this.old_min_interval && (this.old_min_interval = this.options.min_interval), this.options.min_interval = a
        }, restoreOriginalMinInterval: function () {
            null !== this.old_min_interval && (this.options.min_interval = this.old_min_interval, this.old_min_interval = null)
        }, calc: function (a) {
            if (this.options && (this.calc_count++, (10 === this.calc_count || a) && (this.calc_count = 0, this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.calcHandlePercent()), this.coords.w_rs)) {
                switch (this.calcPointerPercent(), a = this.getHandleX(), "click" === this.target && (this.coords.p_gap = this.coords.p_handle / 2, a = this.getHandleX(), this.target = this.options.drag_interval ? "both_one" : this.chooseHandle(a)), this.target) {
                    case"base":
                        var b = (this.options.max - this.options.min) / 100;
                        a = (this.result.from - this.options.min) / b, b = (this.result.to - this.options.min) / b, this.coords.p_single_real = this.toFixed(a), this.coords.p_from_real = this.toFixed(a), this.coords.p_to_real = this.toFixed(b), this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real), this.target = null;
                        break;
                    case"single":
                        if (this.options.from_fixed)break;
                        this.coords.p_single_real = this.convertToRealPercent(a), this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real), this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max), this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                        break;
                    case"from":
                        if (this.options.from_fixed)break;
                        this.coords.p_from_real = this.convertToRealPercent(a), this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real), this.coords.p_from_real > this.coords.p_to_real && (this.coords.p_from_real = this.coords.p_to_real), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                        break;
                    case"to":
                        if (this.options.to_fixed)break;
                        this.coords.p_to_real = this.convertToRealPercent(a), this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real), this.coords.p_to_real < this.coords.p_from_real && (this.coords.p_to_real = this.coords.p_from_real), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                        break;
                    case"both":
                        if (this.options.from_fixed || this.options.to_fixed)break;
                        a = this.toFixed(a + .1 * this.coords.p_handle), this.coords.p_from_real = this.convertToRealPercent(a) - this.coords.p_gap_left, this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_real = this.convertToRealPercent(a) + this.coords.p_gap_right, this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                        break;
                    case"both_one":
                        if (!this.options.from_fixed && !this.options.to_fixed) {
                            var d = this.convertToRealPercent(a);
                            a = this.result.to_percent - this.result.from_percent;
                            var c = a / 2, b = d - c, d = d + c;
                            0 > b && (b = 0, d = b + a), d > 100 && (d = 100, b = d - a), this.coords.p_from_real = this.calcWithStep(b), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_real = this.calcWithStep(d), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real)
                        }
                }
                "single" === this.options.type ? (this.coords.p_bar_x = this.coords.p_handle / 2, this.coords.p_bar_w = this.coords.p_single_fake, this.result.from_percent = this.coords.p_single_real, this.result.from = this.convertToValue(this.coords.p_single_real), this.options.values.length && (this.result.from_value = this.options.values[this.result.from])) : (this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + this.coords.p_handle / 2), this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake), this.result.from_percent = this.coords.p_from_real, this.result.from = this.convertToValue(this.coords.p_from_real), this.result.to_percent = this.coords.p_to_real, this.result.to = this.convertToValue(this.coords.p_to_real), this.options.values.length && (this.result.from_value = this.options.values[this.result.from], this.result.to_value = this.options.values[this.result.to])), this.calcMinMax(), this.calcLabels()
            }
        }, calcPointerPercent: function () {
            this.coords.w_rs ? (0 > this.coords.x_pointer || isNaN(this.coords.x_pointer) ? this.coords.x_pointer = 0 : this.coords.x_pointer > this.coords.w_rs && (this.coords.x_pointer = this.coords.w_rs), this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100)) : this.coords.p_pointer = 0
        }, convertToRealPercent: function (a) {
            return a / (100 - this.coords.p_handle) * 100
        }, convertToFakePercent: function (a) {
            return a / 100 * (100 - this.coords.p_handle)
        }, getHandleX: function () {
            var a = 100 - this.coords.p_handle, b = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
            return 0 > b ? b = 0 : b > a && (b = a), b
        }, calcHandlePercent: function () {
            this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100)
        }, chooseHandle: function (a) {
            return "single" === this.options.type ? "single" : a >= this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2 ? this.options.to_fixed ? "from" : "to" : this.options.from_fixed ? "to" : "from"
        }, calcMinMax: function () {
            this.coords.w_rs && (this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100, this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100)
        }, calcLabels: function () {
            this.coords.w_rs && !this.options.hide_from_to && ("single" === this.options.type ? (this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = this.coords.p_single_fake + this.coords.p_handle / 2 - this.labels.p_single_fake / 2) : (this.labels.w_from = this.$cache.from.outerWidth(!1), this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100, this.labels.p_from_left = this.coords.p_from_fake + this.coords.p_handle / 2 - this.labels.p_from_fake / 2, this.labels.p_from_left = this.toFixed(this.labels.p_from_left), this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake), this.labels.w_to = this.$cache.to.outerWidth(!1), this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100, this.labels.p_to_left = this.coords.p_to_fake + this.coords.p_handle / 2 - this.labels.p_to_fake / 2, this.labels.p_to_left = this.toFixed(this.labels.p_to_left), this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake), this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2 - this.labels.p_single_fake / 2, this.labels.p_single_left = this.toFixed(this.labels.p_single_left)), this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake))
        }, updateScene: function () {
            this.raf_id && (cancelAnimationFrame(this.raf_id), this.raf_id = null), clearTimeout(this.update_tm), this.update_tm = null, this.options && (this.drawHandles(), this.is_active ? this.raf_id = requestAnimationFrame(this.updateScene.bind(this)) : this.update_tm = setTimeout(this.updateScene.bind(this), 300))
        }, drawHandles: function () {
            this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_rs && (this.coords.w_rs !== this.coords.w_rs_old && (this.target = "base", this.is_resize = !0), (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) && (this.setMinMax(), this.calc(!0), this.drawLabels(), this.options.grid && (this.calcGridMargin(), this.calcGridLabels()), this.force_redraw = !0, this.coords.w_rs_old = this.coords.w_rs, this.drawShadow()), this.coords.w_rs && (this.dragging || this.force_redraw || this.is_key) && ((this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) && (this.drawLabels(), this.$cache.bar[0].style.left = this.coords.p_bar_x + "%", this.$cache.bar[0].style.width = this.coords.p_bar_w + "%", "single" === this.options.type ? (this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%", this.$cache.single[0].style.left = this.labels.p_single_left + "%", this.options.values.length ? this.$cache.input.prop("value", this.result.from_value) : this.$cache.input.prop("value", this.result.from), this.$cache.input.data("from", this.result.from)) : (this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%", this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%", (this.old_from !== this.result.from || this.force_redraw) && (this.$cache.from[0].style.left = this.labels.p_from_left + "%"), (this.old_to !== this.result.to || this.force_redraw) && (this.$cache.to[0].style.left = this.labels.p_to_left + "%"), this.$cache.single[0].style.left = this.labels.p_single_left + "%", this.options.values.length ? this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value) : this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to), this.$cache.input.data("from", this.result.from), this.$cache.input.data("to", this.result.to)), this.old_from === this.result.from && this.old_to === this.result.to || this.is_start || this.$cache.input.trigger("change"), this.old_from = this.result.from, this.old_to = this.result.to, this.is_resize || this.is_update || this.is_start || this.is_finish || this.callOnChange(), (this.is_key || this.is_click) && (this.is_click = this.is_key = !1, this.callOnFinish()), this.is_finish = this.is_resize = this.is_update = !1), this.force_redraw = this.is_click = this.is_key = this.is_start = !1))
        }, drawLabels: function () {
            if (this.options) {
                var d, a = this.options.values.length, b = this.options.p_values;
                if (!this.options.hide_from_to)if ("single" === this.options.type)a = a ? this.decorate(b[this.result.from]) : this.decorate(this._prettify(this.result.from), this.result.from), this.$cache.single.html(a), this.calcLabels(), this.$cache.min[0].style.visibility = this.labels.p_single_left < this.labels.p_min + 1 ? "hidden" : "visible", this.$cache.max[0].style.visibility = this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1 ? "hidden" : "visible"; else {
                    a ? (this.options.decorate_both ? (a = this.decorate(b[this.result.from]), a += this.options.values_separator, a += this.decorate(b[this.result.to])) : a = this.decorate(b[this.result.from] + this.options.values_separator + b[this.result.to]), d = this.decorate(b[this.result.from]), b = this.decorate(b[this.result.to])) : (this.options.decorate_both ? (a = this.decorate(this._prettify(this.result.from), this.result.from), a += this.options.values_separator, a += this.decorate(this._prettify(this.result.to), this.result.to)) : a = this.decorate(this._prettify(this.result.from) + this.options.values_separator + this._prettify(this.result.to), this.result.to), d = this.decorate(this._prettify(this.result.from), this.result.from), b = this.decorate(this._prettify(this.result.to), this.result.to)), this.$cache.single.html(a), this.$cache.from.html(d), this.$cache.to.html(b), this.calcLabels(), b = Math.min(this.labels.p_single_left, this.labels.p_from_left), a = this.labels.p_single_left + this.labels.p_single_fake, d = this.labels.p_to_left + this.labels.p_to_fake;
                    var c = Math.max(a, d);
                    this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left ? (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", this.result.from === this.result.to ? ("from" === this.target ? this.$cache.from[0].style.visibility = "visible" : "to" === this.target && (this.$cache.to[0].style.visibility = "visible"), this.$cache.single[0].style.visibility = "hidden", c = d) : (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", c = Math.max(a, d))) : (this.$cache.from[0].style.visibility = "visible", this.$cache.to[0].style.visibility = "visible", this.$cache.single[0].style.visibility = "hidden"), this.$cache.min[0].style.visibility = b < this.labels.p_min + 1 ? "hidden" : "visible", this.$cache.max[0].style.visibility = c > 100 - this.labels.p_max - 1 ? "hidden" : "visible"
                }
            }
        }, drawShadow: function () {
            var a = this.options, b = this.$cache, d = "number" == typeof a.from_min && !isNaN(a.from_min), c = "number" == typeof a.from_max && !isNaN(a.from_max), e = "number" == typeof a.to_min && !isNaN(a.to_min), f = "number" == typeof a.to_max && !isNaN(a.to_max);
            "single" === a.type ? a.from_shadow && (d || c) ? (d = this.convertToPercent(d ? a.from_min : a.min), c = this.convertToPercent(c ? a.from_max : a.max) - d, d = this.toFixed(d - this.coords.p_handle / 100 * d), c = this.toFixed(c - this.coords.p_handle / 100 * c), d += this.coords.p_handle / 2, b.shad_single[0].style.display = "block", b.shad_single[0].style.left = d + "%", b.shad_single[0].style.width = c + "%") : b.shad_single[0].style.display = "none" : (a.from_shadow && (d || c) ? (d = this.convertToPercent(d ? a.from_min : a.min), c = this.convertToPercent(c ? a.from_max : a.max) - d, d = this.toFixed(d - this.coords.p_handle / 100 * d), c = this.toFixed(c - this.coords.p_handle / 100 * c), d += this.coords.p_handle / 2, b.shad_from[0].style.display = "block", b.shad_from[0].style.left = d + "%", b.shad_from[0].style.width = c + "%") : b.shad_from[0].style.display = "none", a.to_shadow && (e || f) ? (e = this.convertToPercent(e ? a.to_min : a.min), a = this.convertToPercent(f ? a.to_max : a.max) - e, e = this.toFixed(e - this.coords.p_handle / 100 * e), a = this.toFixed(a - this.coords.p_handle / 100 * a), e += this.coords.p_handle / 2, b.shad_to[0].style.display = "block", b.shad_to[0].style.left = e + "%", b.shad_to[0].style.width = a + "%") : b.shad_to[0].style.display = "none")
        }, callOnStart: function () {
            this.options.onStart && "function" == typeof this.options.onStart && this.options.onStart(this.result)
        }, callOnChange: function () {
            this.options.onChange && "function" == typeof this.options.onChange && this.options.onChange(this.result)
        }, callOnFinish: function () {
            this.options.onFinish && "function" == typeof this.options.onFinish && this.options.onFinish(this.result)
        }, callOnUpdate: function () {
            this.options.onUpdate && "function" == typeof this.options.onUpdate && this.options.onUpdate(this.result)
        }, toggleInput: function () {
            this.$cache.input.toggleClass("irs-hidden-input")
        }, convertToPercent: function (a, b) {
            var d = this.options.max - this.options.min;
            return d ? this.toFixed((b ? a : a - this.options.min) / (d / 100)) : (this.no_diapason = !0, 0)
        }, convertToValue: function (a) {
            var f, l, b = this.options.min, d = this.options.max, c = b.toString().split(".")[1], e = d.toString().split(".")[1], g = 0, k = 0;
            return 0 === a ? this.options.min : 100 === a ? this.options.max : (c && (g = f = c.length), e && (g = l = e.length), f && l && (g = f >= l ? f : l), 0 > b && (k = Math.abs(b), b = +(b + k).toFixed(g), d = +(d + k).toFixed(g)), a = (d - b) / 100 * a + b, (b = this.options.step.toString().split(".")[1]) ? a = +a.toFixed(b.length) : (a /= this.options.step, a *= this.options.step, a = +a.toFixed(0)), k && (a -= k), k = b ? +a.toFixed(b.length) : this.toFixed(a), k < this.options.min ? k = this.options.min : k > this.options.max && (k = this.options.max), k)
        }, calcWithStep: function (a) {
            var b = Math.round(a / this.coords.p_step) * this.coords.p_step;
            return b > 100 && (b = 100), 100 === a && (b = 100), this.toFixed(b)
        }, checkMinInterval: function (a, b, d) {
            var c = this.options;
            return c.min_interval ? (a = this.convertToValue(a), b = this.convertToValue(b), "from" === d ? b - a < c.min_interval && (a = b - c.min_interval) : a - b < c.min_interval && (a = b + c.min_interval), this.convertToPercent(a)) : a
        }, checkMaxInterval: function (a, b, d) {
            var c = this.options;
            return c.max_interval ? (a = this.convertToValue(a), b = this.convertToValue(b), "from" === d ? b - a > c.max_interval && (a = b - c.max_interval) : a - b > c.max_interval && (a = b + c.max_interval), this.convertToPercent(a)) : a
        }, checkDiapason: function (a, b, d) {
            a = this.convertToValue(a);
            var c = this.options;
            return "number" != typeof b && (b = c.min), "number" != typeof d && (d = c.max), b > a && (a = b), a > d && (a = d), this.convertToPercent(a)
        }, toFixed: function (a) {
            return a = a.toFixed(9), +a
        }, _prettify: function (a) {
            return this.options.prettify_enabled ? this.options.prettify && "function" == typeof this.options.prettify ? this.options.prettify(a) : this.prettify(a) : a
        }, prettify: function (a) {
            return a.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator)
        }, checkEdges: function (a, b) {
            return this.options.force_edges ? (0 > a ? a = 0 : a > 100 - b && (a = 100 - b), this.toFixed(a)) : this.toFixed(a)
        }, validate: function () {
            var e, f, a = this.options, b = this.result, d = a.values, c = d.length;
            if ("string" == typeof a.min && (a.min = +a.min), "string" == typeof a.max && (a.max = +a.max), "string" == typeof a.from && (a.from = +a.from), "string" == typeof a.to && (a.to = +a.to), "string" == typeof a.step && (a.step = +a.step), "string" == typeof a.from_min && (a.from_min = +a.from_min), "string" == typeof a.from_max && (a.from_max = +a.from_max), "string" == typeof a.to_min && (a.to_min = +a.to_min), "string" == typeof a.to_max && (a.to_max = +a.to_max), "string" == typeof a.keyboard_step && (a.keyboard_step = +a.keyboard_step), "string" == typeof a.grid_num && (a.grid_num = +a.grid_num), a.max < a.min && (a.max = a.min), c)for (a.p_values = [], a.min = 0, a.max = c - 1, a.step = 1, a.grid_num = a.max, a.grid_snap = !0, f = 0; c > f; f++)e = +d[f], isNaN(e) ? e = d[f] : (d[f] = e, e = this._prettify(e)), a.p_values.push(e);
            ("number" != typeof a.from || isNaN(a.from)) && (a.from = a.min), ("number" != typeof a.to || isNaN(a.from)) && (a.to = a.max), "single" === a.type ? (a.from < a.min && (a.from = a.min), a.from > a.max && (a.from = a.max)) : ((a.from < a.min || a.from > a.max) && (a.from = a.min), (a.to > a.max || a.to < a.min) && (a.to = a.max), a.from > a.to && (a.from = a.to)), ("number" != typeof a.step || isNaN(a.step) || !a.step || 0 > a.step) && (a.step = 1), ("number" != typeof a.keyboard_step || isNaN(a.keyboard_step) || !a.keyboard_step || 0 > a.keyboard_step) && (a.keyboard_step = 5), "number" == typeof a.from_min && a.from < a.from_min && (a.from = a.from_min), "number" == typeof a.from_max && a.from > a.from_max && (a.from = a.from_max), "number" == typeof a.to_min && a.to < a.to_min && (a.to = a.to_min), "number" == typeof a.to_max && a.from > a.to_max && (a.to = a.to_max), b && (b.min !== a.min && (b.min = a.min), b.max !== a.max && (b.max = a.max), (b.from < b.min || b.from > b.max) && (b.from = a.from), (b.to < b.min || b.to > b.max) && (b.to = a.to)), ("number" != typeof a.min_interval || isNaN(a.min_interval) || !a.min_interval || 0 > a.min_interval) && (a.min_interval = 0), ("number" != typeof a.max_interval || isNaN(a.max_interval) || !a.max_interval || 0 > a.max_interval) && (a.max_interval = 0), a.min_interval && a.min_interval > a.max - a.min && (a.min_interval = a.max - a.min), a.max_interval && a.max_interval > a.max - a.min && (a.max_interval = a.max - a.min)
        }, decorate: function (a, b) {
            var d = "", c = this.options;
            return c.prefix && (d += c.prefix), d += a, c.max_postfix && (c.values.length && a === c.p_values[c.max] ? (d += c.max_postfix, c.postfix && (d += " ")) : b === c.max && (d += c.max_postfix, c.postfix && (d += " "))), c.postfix && (d += c.postfix), d
        }, updateFrom: function () {
            this.result.from = this.options.from, this.result.from_percent = this.convertToPercent(this.result.from), this.options.values && (this.result.from_value = this.options.values[this.result.from])
        }, updateTo: function () {
            this.result.to = this.options.to, this.result.to_percent = this.convertToPercent(this.result.to), this.options.values && (this.result.to_value = this.options.values[this.result.to])
        }, updateResult: function () {
            this.result.min = this.options.min, this.result.max = this.options.max, this.updateFrom(), this.updateTo()
        }, appendGrid: function () {
            if (this.options.grid) {
                var b, d, a = this.options;
                b = a.max - a.min;
                var h, k, c = a.grid_num, e = 0, f = 0, g = 4, m = 0, n = "";
                for (this.calcGridMargin(), a.grid_snap ? (c = b / a.step, e = this.toFixed(a.step / (b / 100))) : e = this.toFixed(100 / c), c > 4 && (g = 3), c > 7 && (g = 2), c > 14 && (g = 1), c > 28 && (g = 0), b = 0; c + 1 > b; b++) {
                    for (h = g, f = this.toFixed(e * b), f > 100 && (f = 100, h -= 2, 0 > h && (h = 0)), this.coords.big[b] = f, k = (f - e * (b - 1)) / (h + 1), d = 1; h >= d && 0 !== f; d++)m = this.toFixed(f - k * d), n += '<span class="irs-grid-pol small" style="left: ' + m + '%"></span>';
                    n += '<span class="irs-grid-pol" style="left: ' + f + '%"></span>', m = this.convertToValue(f), m = a.values.length ? a.p_values[m] : this._prettify(m), n += '<span class="irs-grid-text js-grid-text-' + b + '" style="left: ' + f + '%">' + m + "</span>"
                }
                this.coords.big_num = Math.ceil(c + 1), this.$cache.cont.addClass("irs-with-grid"), this.$cache.grid.html(n), this.cacheGridLabels()
            }
        }, cacheGridLabels: function () {
            var a, b, d = this.coords.big_num;
            for (b = 0; d > b; b++)a = this.$cache.grid.find(".js-grid-text-" + b), this.$cache.grid_labels.push(a);
            this.calcGridLabels()
        }, calcGridLabels: function () {
            var a, b;
            b = [];
            var d = [], c = this.coords.big_num;
            for (a = 0; c > a; a++)this.coords.big_w[a] = this.$cache.grid_labels[a].outerWidth(!1), this.coords.big_p[a] = this.toFixed(this.coords.big_w[a] / this.coords.w_rs * 100), this.coords.big_x[a] = this.toFixed(this.coords.big_p[a] / 2), b[a] = this.toFixed(this.coords.big[a] - this.coords.big_x[a]), d[a] = this.toFixed(b[a] + this.coords.big_p[a]);
            for (this.options.force_edges && (b[0] < -this.coords.grid_gap && (b[0] = -this.coords.grid_gap, d[0] = this.toFixed(b[0] + this.coords.big_p[0]), this.coords.big_x[0] = this.coords.grid_gap), d[c - 1] > 100 + this.coords.grid_gap && (d[c - 1] = 100 + this.coords.grid_gap, b[c - 1] = this.toFixed(d[c - 1] - this.coords.big_p[c - 1]), this.coords.big_x[c - 1] = this.toFixed(this.coords.big_p[c - 1] - this.coords.grid_gap))), this.calcGridCollision(2, b, d), this.calcGridCollision(4, b, d), a = 0; c > a; a++)b = this.$cache.grid_labels[a][0], b.style.marginLeft = -this.coords.big_x[a] + "%"
        }, calcGridCollision: function (a, b, d) {
            var c, e, f, g = this.coords.big_num;
            for (c = 0; g > c && (e = c + a / 2, !(e >= g)); c += a)f = this.$cache.grid_labels[e][0], f.style.visibility = d[c] <= b[e] ? "visible" : "hidden"
        }, calcGridMargin: function () {
            this.options.grid_margin && (this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_rs && (this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100), this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - .1), this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%", this.$cache.grid[0].style.left = this.coords.grid_gap + "%"))
        }, update: function (a) {
            this.input && (this.is_update = !0, this.options.from = this.result.from, this.options.to = this.result.to, this.options = g.extend(this.options, a), this.validate(), this.updateResult(a), this.toggleInput(), this.remove(), this.init(!0))
        }, reset: function () {
            this.input && (this.updateResult(), this.update())
        }, destroy: function () {
            this.input && (this.toggleInput(), this.$cache.input.prop("readonly", !1), g.data(this.input, "ionRangeSlider", null), this.remove(), this.options = this.input = null)
        }
    }, g.fn.ionRangeSlider = function (a) {
        return this.each(function () {
            g.data(this, "ionRangeSlider") || g.data(this, "ionRangeSlider", new q(this, a, u++))
        })
    }, function () {
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], d = 0; d < b.length && !h.requestAnimationFrame; ++d)h.requestAnimationFrame = h[b[d] + "RequestAnimationFrame"], h.cancelAnimationFrame = h[b[d] + "CancelAnimationFrame"] || h[b[d] + "CancelRequestAnimationFrame"];
        h.requestAnimationFrame || (h.requestAnimationFrame = function (b, d) {
            var f = (new Date).getTime(), g = Math.max(0, 16 - (f - a)), p = h.setTimeout(function () {
                b(f + g)
            }, g);
            return a = f + g, p
        }), h.cancelAnimationFrame || (h.cancelAnimationFrame = function (a) {
            clearTimeout(a)
        })
    }()
}), function (b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery || Zepto)
}(function (b) {
    var y = function (a, c, d) {
        a = b(a);
        var l, g = this, k = a.val();
        c = "function" == typeof c ? c(a.val(), void 0, a, d) : c;
        var e = {
            invalid: [], getCaret: function () {
                try {
                    var q, b = 0, e = a.get(0), f = document.selection, c = e.selectionStart;
                    return f && -1 === navigator.appVersion.indexOf("MSIE 10") ? (q = f.createRange(),
                        q.moveStart("character", a.is("input") ? -a.val().length : -a.text().length), b = q.text.length) : (c || "0" === c) && (b = c), b
                } catch (d) {
                }
            }, setCaret: function (q) {
                try {
                    if (a.is(":focus")) {
                        var b, c = a.get(0);
                        c.setSelectionRange ? c.setSelectionRange(q, q) : c.createTextRange && (b = c.createTextRange(), b.collapse(!0), b.moveEnd("character", q), b.moveStart("character", q), b.select())
                    }
                } catch (f) {
                }
            }, events: function () {
                a.on("input.mask keyup.mask", e.behaviour).on("paste.mask drop.mask", function () {
                    setTimeout(function () {
                        a.keydown().keyup()
                    }, 100)
                }).on("change.mask", function () {
                    a.data("changed", !0)
                }).on("blur.mask", function () {
                    k === a.val() || a.data("changed") || a.triggerHandler("change"), a.data("changed", !1)
                }).on("blur.mask", function () {
                    k = a.val()
                }).on("focus.mask", function (a) {
                    !0 === d.selectOnFocus && b(a.target).select()
                }).on("focusout.mask", function () {
                    d.clearIfNotMatch && !l.test(e.val()) && e.val("")
                })
            }, getRegexMask: function () {
                for (var b, e, f, d, a = [], h = 0; h < c.length; h++)(b = g.translation[c.charAt(h)]) ? (e = b.pattern.toString().replace(/.{1}$|^.{1}/g, ""), f = b.optional, (b = b.recursive) ? (a.push(c.charAt(h)), d = {
                    digit: c.charAt(h),
                    pattern: e
                }) : a.push(f || b ? e + "?" : e)) : a.push(c.charAt(h).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                return a = a.join(""), d && (a = a.replace(new RegExp("(" + d.digit + "(.*" + d.digit + ")?)"), "($1)?").replace(new RegExp(d.digit, "g"), d.pattern)), new RegExp(a)
            }, destroyEvents: function () {
                a.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))
            }, val: function (b) {
                var c = a.is("input") ? "val" : "text";
                return 0 < arguments.length ? (a[c]() !== b && a[c](b), c = a) : c = a[c](), c
            }, getMCharsBeforeCount: function (a, b) {
                for (var e = 0, f = 0, d = c.length; d > f && a > f; f++)g.translation[c.charAt(f)] || (a = b ? a + 1 : a, e++);
                return e
            }, caretPos: function (a, b, d, f) {
                return g.translation[c.charAt(Math.min(a - 1, c.length - 1))] ? Math.min(a + d - b - f, d) : e.caretPos(a + 1, b, d, f)
            }, behaviour: function (a) {
                a = a || window.event, e.invalid = [];
                var c = a.keyCode || a.which;
                if (-1 === b.inArray(c, g.byPassKeys)) {
                    var d = e.getCaret(), f = e.val().length, n = f > d, h = e.getMasked(), k = h.length, m = e.getMCharsBeforeCount(k - 1) - e.getMCharsBeforeCount(f - 1);
                    return e.val(h), !n || 65 === c && a.ctrlKey || (8 !== c && 46 !== c && (d = e.caretPos(d, f, k, m)), e.setCaret(d)), e.callbacks(a)
                }
            }, getMasked: function (a) {
                var t, w, b = [], k = e.val(), f = 0, n = c.length, h = 0, l = k.length, m = 1, p = "push", u = -1;
                for (d.reverse ? (p = "unshift", m = -1, t = 0, f = n - 1, h = l - 1, w = function () {
                    return f > -1 && h > -1
                }) : (t = n - 1, w = function () {
                    return n > f && l > h
                }); w();) {
                    var x = c.charAt(f), v = k.charAt(h), r = g.translation[x];
                    r ? (v.match(r.pattern) ? (b[p](v), r.recursive && (-1 === u ? u = f : f === t && (f = u - m), t === u && (f -= m)), f += m) : r.optional ? (f += m, h -= m) : r.fallback ? (b[p](r.fallback), f += m, h -= m) : e.invalid.push({
                        p: h,
                        v: v,
                        e: r.pattern
                    }), h += m) : (a || b[p](x), v === x && (h += m), f += m)
                }
                return a = c.charAt(t), n !== l + 1 || g.translation[a] || b.push(a), b.join("")
            }, callbacks: function (b) {
                var g = e.val(), l = g !== k, f = [g, b, a, d], n = function (a, b, c) {
                    "function" == typeof d[a] && b && d[a].apply(this, c)
                };
                n("onChange", !0 === l, f), n("onKeyPress", !0 === l, f), n("onComplete", g.length === c.length, f), n("onInvalid", 0 < e.invalid.length, [g, b, a, e.invalid, d])
            }
        };
        g.mask = c, g.options = d, g.remove = function () {
            var b = e.getCaret();
            return e.destroyEvents(), e.val(g.getCleanVal()), e.setCaret(b - e.getMCharsBeforeCount(b)), a
        }, g.getCleanVal = function () {
            return e.getMasked(!0)
        }, g.init = function (c) {
            c = c || !1, d = d || {}, g.byPassKeys = b.jMaskGlobals.byPassKeys, g.translation = b.jMaskGlobals.translation, g.translation = b.extend({}, g.translation, d.translation), g = b.extend(!0, {}, g, d), l = e.getRegexMask(), !1 === c ? (d.placeholder && a.attr("placeholder", d.placeholder), b("input").length && !1 == "oninput" in b("input")[0] && "on" === a.attr("autocomplete") && a.attr("autocomplete", "off"), e.destroyEvents(), e.events(), c = e.getCaret(), e.val(e.getMasked()), e.setCaret(c + e.getMCharsBeforeCount(c, !0))) : (e.events(), e.val(e.getMasked()))
        }, g.init(!a.is("input"))
    };
    b.maskWatchers = {};
    var A = function () {
        var a = b(this), c = {}, d = a.attr("data-mask");
        return a.attr("data-mask-reverse") && (c.reverse = !0), a.attr("data-mask-clearifnotmatch") && (c.clearIfNotMatch = !0), "true" === a.attr("data-mask-selectonfocus") && (c.selectOnFocus = !0), z(a, d, c) ? a.data("mask", new y(this, d, c)) : void 0
    }, z = function (a, c, d) {
        d = d || {};
        var g = b(a).data("mask"), k = JSON.stringify;
        a = b(a).val() || b(a).text();
        try {
            return "function" == typeof c && (c = c(a)), "object" != typeof g || k(g.options) !== k(d) || g.mask !== c
        } catch (l) {
        }
    };
    b.fn.mask = function (a, c) {
        c = c || {};
        var d = this.selector, g = b.jMaskGlobals, k = b.jMaskGlobals.watchInterval, l = function () {
            return z(this, a, c) ? b(this).data("mask", new y(this, a, c)) : void 0
        };
        return b(this).each(l), d && "" !== d && g.watchInputs && (clearInterval(b.maskWatchers[d]), b.maskWatchers[d] = setInterval(function () {
            b(document).find(d).each(l)
        }, k)), this
    }, b.fn.unmask = function () {
        return clearInterval(b.maskWatchers[this.selector]), delete b.maskWatchers[this.selector], this.each(function () {
            var a = b(this).data("mask");
            a && a.remove().removeData("mask")
        })
    }, b.fn.cleanVal = function () {
        return this.data("mask").getCleanVal()
    }, b.applyDataMask = function (a) {
        a = a || b.jMaskGlobals.maskElements, (a instanceof b ? a : b(a)).filter(b.jMaskGlobals.dataMaskAttr).each(A)
    };
    var p = {
        maskElements: "input,td,span,div",
        dataMaskAttr: "*[data-mask]",
        dataMask: !0,
        watchInterval: 300,
        watchInputs: !0,
        watchDataMask: !1,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            0: {pattern: /\d/},
            9: {pattern: /\d/, optional: !0},
            "#": {pattern: /\d/, recursive: !0},
            A: {pattern: /[a-zA-Z0-9]/},
            S: {pattern: /[a-zA-Z]/}
        }
    };
    b.jMaskGlobals = b.jMaskGlobals || {}, p = b.jMaskGlobals = b.extend(!0, {}, p, b.jMaskGlobals), p.dataMask && b.applyDataMask(), setInterval(function () {
        b.jMaskGlobals.watchDataMask && b.applyDataMask()
    }, p.watchInterval)
}), !function (e) {
    "use strict";
    var t = function (e, i, a) {
        var o, r, n = document.createElement("img");
        if (n.onerror = i, n.onload = function () {
                !r || a && a.noRevoke || t.revokeObjectURL(r), i && i(t.scale(n, a))
            }, t.isInstanceOf("Blob", e) || t.isInstanceOf("File", e))o = r = t.createObjectURL(e), n._type = e.type; else {
            if ("string" != typeof e)return !1;
            o = e, a && a.crossOrigin && (n.crossOrigin = a.crossOrigin)
        }
        return o ? (n.src = o, n) : t.readFile(e, function (e) {
            var t = e.target;
            t && t.result ? n.src = t.result : i && i(e)
        })
    }, i = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
    t.isInstanceOf = function (e, t) {
        return Object.prototype.toString.call(t) === "[object " + e + "]"
    }, t.transformCoordinates = function () {
    }, t.getTransformedOptions = function (e, t) {
        var i, a, o, r, n = t.aspectRatio;
        if (!n)return t;
        i = {};
        for (a in t)t.hasOwnProperty(a) && (i[a] = t[a]);
        return i.crop = !0, o = e.naturalWidth || e.width, r = e.naturalHeight || e.height, o / r > n ? (i.maxWidth = r * n, i.maxHeight = r) : (i.maxWidth = o, i.maxHeight = o / n), i
    }, t.renderImageToCanvas = function (e, t, i, a, o, r, n, s, l, d) {
        return e.getContext("2d").drawImage(t, i, a, o, r, n, s, l, d), e
    }, t.hasCanvasOption = function (e) {
        return e.canvas || e.crop || !!e.aspectRatio
    }, t.scale = function (e, i) {
        function a() {
            var e = Math.max((s || y) / y, (l || v) / v);
            e > 1 && (y *= e, v *= e)
        }

        function o() {
            var e = Math.min((r || y) / y, (n || v) / v);
            1 > e && (y *= e, v *= e)
        }

        i = i || {};
        var r, n, s, l, d, u, c, g, f, h, m, p = document.createElement("canvas"), S = e.getContext || t.hasCanvasOption(i) && p.getContext, b = e.naturalWidth || e.width, x = e.naturalHeight || e.height, y = b, v = x;
        if (S && (i = t.getTransformedOptions(e, i), c = i.left || 0, g = i.top || 0, i.sourceWidth ? (d = i.sourceWidth, void 0 !== i.right && void 0 === i.left && (c = b - d - i.right)) : d = b - c - (i.right || 0), i.sourceHeight ? (u = i.sourceHeight, void 0 !== i.bottom && void 0 === i.top && (g = x - u - i.bottom)) : u = x - g - (i.bottom || 0), y = d, v = u), r = i.maxWidth, n = i.maxHeight, s = i.minWidth, l = i.minHeight, S && r && n && i.crop ? (y = r, v = n, m = d / u - r / n, 0 > m ? (u = n * d / r, void 0 === i.top && void 0 === i.bottom && (g = (x - u) / 2)) : m > 0 && (d = r * u / n, void 0 === i.left && void 0 === i.right && (c = (b - d) / 2))) : ((i.contain || i.cover) && (s = r = r || s, l = n = n || l), i.cover ? (o(), a()) : (a(), o())), S) {
            if (f = i.pixelRatio, f > 1 && (p.style.width = y + "px", p.style.height = v + "px", y *= f, v *= f, p.getContext("2d").scale(f, f)), h = i.downsamplingRatio, h > 0 && 1 > h && d > y && u > v)for (; d * h > y;)p.width = d * h, p.height = u * h, t.renderImageToCanvas(p, e, c, g, d, u, 0, 0, p.width, p.height), d = p.width, u = p.height, e = document.createElement("canvas"), e.width = d, e.height = u, t.renderImageToCanvas(e, p, 0, 0, d, u, 0, 0, d, u);
            return p.width = y, p.height = v, t.transformCoordinates(p, i), t.renderImageToCanvas(p, e, c, g, d, u, 0, 0, y, v)
        }
        return e.width = y, e.height = v, e
    }, t.createObjectURL = function (e) {
        return i ? i.createObjectURL(e) : !1
    }, t.revokeObjectURL = function (e) {
        return i ? i.revokeObjectURL(e) : !1
    }, t.readFile = function (e, t, i) {
        if (window.FileReader) {
            var a = new FileReader;
            if (a.onload = a.onerror = t, i = i || "readAsDataURL", a[i])return a[i](e), a
        }
        return !1
    }, "function" == typeof define && define.amd ? define(function () {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : e.loadImage = t
}(window), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image"], e) : e("object" == typeof module && module.exports ? require("./load-image") : window.loadImage)
}(function (e) {
    "use strict";
    var t = e.hasCanvasOption, i = e.transformCoordinates, a = e.getTransformedOptions;
    e.hasCanvasOption = function (i) {
        return !!i.orientation || t.call(e, i)
    }, e.transformCoordinates = function (t, a) {
        i.call(e, t, a);
        var o = t.getContext("2d"), r = t.width, n = t.height, s = t.style.width, l = t.style.height, d = a.orientation;
        if (d && !(d > 8))switch (d > 4 && (t.width = n, t.height = r, t.style.width = l, t.style.height = s), d) {
            case 2:
                o.translate(r, 0), o.scale(-1, 1);
                break;
            case 3:
                o.translate(r, n), o.rotate(Math.PI);
                break;
            case 4:
                o.translate(0, n), o.scale(1, -1);
                break;
            case 5:
                o.rotate(.5 * Math.PI), o.scale(1, -1);
                break;
            case 6:
                o.rotate(.5 * Math.PI), o.translate(0, -n);
                break;
            case 7:
                o.rotate(.5 * Math.PI), o.translate(r, -n), o.scale(-1, 1);
                break;
            case 8:
                o.rotate(-.5 * Math.PI), o.translate(-r, 0)
        }
    }, e.getTransformedOptions = function (t, i) {
        var o, r, n = a.call(e, t, i), s = n.orientation;
        if (!s || s > 8 || 1 === s)return n;
        o = {};
        for (r in n)n.hasOwnProperty(r) && (o[r] = n[r]);
        switch (n.orientation) {
            case 2:
                o.left = n.right, o.right = n.left;
                break;
            case 3:
                o.left = n.right, o.top = n.bottom, o.right = n.left, o.bottom = n.top;
                break;
            case 4:
                o.top = n.bottom, o.bottom = n.top;
                break;
            case 5:
                o.left = n.top, o.top = n.left, o.right = n.bottom, o.bottom = n.right;
                break;
            case 6:
                o.left = n.top, o.top = n.right, o.right = n.bottom, o.bottom = n.left;
                break;
            case 7:
                o.left = n.bottom, o.top = n.right, o.right = n.top, o.bottom = n.left;
                break;
            case 8:
                o.left = n.bottom, o.top = n.left, o.right = n.top, o.bottom = n.right
        }
        return n.orientation > 4 && (o.maxWidth = n.maxHeight, o.maxHeight = n.maxWidth, o.minWidth = n.minHeight, o.minHeight = n.minWidth, o.sourceWidth = n.sourceHeight, o.sourceHeight = n.sourceWidth), o
    }
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image"], e) : e("object" == typeof module && module.exports ? require("./load-image") : window.loadImage)
}(function (e) {
    "use strict";
    var t = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
    e.blobSlice = t && function () {
            var e = this.slice || this.webkitSlice || this.mozSlice;
            return e.apply(this, arguments)
        }, e.metaDataParsers = {jpeg: {65505: []}}, e.parseMetaData = function (t, i, a) {
        a = a || {};
        var o = this, r = a.maxMetaDataSize || 262144, n = {}, s = !(window.DataView && t && t.size >= 12 && "image/jpeg" === t.type && e.blobSlice);
        (s || !e.readFile(e.blobSlice.call(t, 0, r), function (t) {
            if (t.target.error)return console.log(t.target.error), void i(n);
            var r, s, l, d, u = t.target.result, c = new DataView(u), g = 2, f = c.byteLength - 4, h = g;
            if (65496 === c.getUint16(0)) {
                for (; f > g && (r = c.getUint16(g), r >= 65504 && 65519 >= r || 65534 === r);) {
                    if (s = c.getUint16(g + 2) + 2, g + s > c.byteLength) {
                        console.log("Invalid meta data: Invalid segment size.");
                        break
                    }
                    if (l = e.metaDataParsers.jpeg[r])for (d = 0; d < l.length; d += 1)l[d].call(o, c, g, s, n, a);
                    g += s, h = g
                }
                !a.disableImageHead && h > 6 && (u.slice ? n.imageHead = u.slice(0, h) : n.imageHead = new Uint8Array(u).subarray(0, h))
            } else console.log("Invalid JPEG file: Missing JPEG marker.");
            i(n)
        }, "readAsArrayBuffer")) && i(n)
    }
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-meta")) : e(window.loadImage)
}(function (e) {
    "use strict";
    e.ExifMap = function () {
        return this
    }, e.ExifMap.prototype.map = {Orientation: 274}, e.ExifMap.prototype.get = function (e) {
        return this[e] || this[this.map[e]]
    }, e.getExifThumbnail = function (e, t, i) {
        var a, o, r;
        if (!i || t + i > e.byteLength)return void console.log("Invalid Exif data: Invalid thumbnail data.");
        for (a = [], o = 0; i > o; o += 1)r = e.getUint8(t + o), a.push((16 > r ? "0" : "") + r.toString(16));
        return "data:image/jpeg,%" + a.join("%")
    }, e.exifTagTypes = {
        1: {
            getValue: function (e, t) {
                return e.getUint8(t)
            }, size: 1
        }, 2: {
            getValue: function (e, t) {
                return String.fromCharCode(e.getUint8(t))
            }, size: 1, ascii: !0
        }, 3: {
            getValue: function (e, t, i) {
                return e.getUint16(t, i)
            }, size: 2
        }, 4: {
            getValue: function (e, t, i) {
                return e.getUint32(t, i)
            }, size: 4
        }, 5: {
            getValue: function (e, t, i) {
                return e.getUint32(t, i) / e.getUint32(t + 4, i)
            }, size: 8
        }, 9: {
            getValue: function (e, t, i) {
                return e.getInt32(t, i)
            }, size: 4
        }, 10: {
            getValue: function (e, t, i) {
                return e.getInt32(t, i) / e.getInt32(t + 4, i)
            }, size: 8
        }
    }, e.exifTagTypes[7] = e.exifTagTypes[1], e.getExifValue = function (t, i, a, o, r, n) {
        var s, l, d, u, c, g, f = e.exifTagTypes[o];
        if (!f)return void console.log("Invalid Exif data: Invalid tag type.");
        if (s = f.size * r, l = s > 4 ? i + t.getUint32(a + 8, n) : a + 8, l + s > t.byteLength)return void console.log("Invalid Exif data: Invalid data offset.");
        if (1 === r)return f.getValue(t, l, n);
        for (d = [], u = 0; r > u; u += 1)d[u] = f.getValue(t, l + u * f.size, n);
        if (f.ascii) {
            for (c = "", u = 0; u < d.length && (g = d[u], "\x00" !== g); u += 1)c += g;
            return c
        }
        return d
    }, e.parseExifTag = function (t, i, a, o, r) {
        var n = t.getUint16(a, o);
        r.exif[n] = e.getExifValue(t, i, a, t.getUint16(a + 2, o), t.getUint32(a + 4, o), o)
    }, e.parseExifTags = function (e, t, i, a, o) {
        var r, n, s;
        if (i + 6 > e.byteLength)return void console.log("Invalid Exif data: Invalid directory offset.");
        if (r = e.getUint16(i, a), n = i + 2 + 12 * r, n + 4 > e.byteLength)return void console.log("Invalid Exif data: Invalid directory size.");
        for (s = 0; r > s; s += 1)this.parseExifTag(e, t, i + 2 + 12 * s, a, o);
        return e.getUint32(n, a)
    }, e.parseExifData = function (t, i, a, o, r) {
        if (!r.disableExif) {
            var n, s, l, d = i + 10;
            if (1165519206 === t.getUint32(i + 4)) {
                if (d + 8 > t.byteLength)return void console.log("Invalid Exif data: Invalid segment size.");
                if (0 !== t.getUint16(i + 8))return void console.log("Invalid Exif data: Missing byte alignment offset.");
                switch (t.getUint16(d)) {
                    case 18761:
                        n = !0;
                        break;
                    case 19789:
                        n = !1;
                        break;
                    default:
                        return void console.log("Invalid Exif data: Invalid byte alignment marker.")
                }
                if (42 !== t.getUint16(d + 2, n))return void console.log("Invalid Exif data: Missing TIFF marker.");
                s = t.getUint32(d + 4, n), o.exif = new e.ExifMap, s = e.parseExifTags(t, d, d + s, n, o), s && !r.disableExifThumbnail && (l = {exif: {}}, s = e.parseExifTags(t, d, d + s, n, l), l.exif[513] && (o.exif.Thumbnail = e.getExifThumbnail(t, d + l.exif[513], l.exif[514]))), o.exif[34665] && !r.disableExifSub && e.parseExifTags(t, d, d + o.exif[34665], n, o), o.exif[34853] && !r.disableExifGps && e.parseExifTags(t, d, d + o.exif[34853], n, o)
            }
        }
    }, e.metaDataParsers.jpeg[65505].push(e.parseExifData)
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-exif"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-exif")) : e(window.loadImage)
}(function (e) {
    "use strict";
    e.ExifMap.prototype.tags = {
        256: "ImageWidth",
        257: "ImageHeight",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer",
        40965: "InteroperabilityIFDPointer",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright",
        36864: "ExifVersion",
        40960: "FlashpixVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        42240: "Gamma",
        37121: "ComponentsConfiguration",
        37122: "CompressedBitsPerPixel",
        37500: "MakerNote",
        37510: "UserComment",
        40964: "RelatedSoundFile",
        36867: "DateTimeOriginal",
        36868: "DateTimeDigitized",
        37520: "SubSecTime",
        37521: "SubSecTimeOriginal",
        37522: "SubSecTimeDigitized",
        33434: "ExposureTime",
        33437: "FNumber",
        34850: "ExposureProgram",
        34852: "SpectralSensitivity",
        34855: "PhotographicSensitivity",
        34856: "OECF",
        34864: "SensitivityType",
        34865: "StandardOutputSensitivity",
        34866: "RecommendedExposureIndex",
        34867: "ISOSpeed",
        34868: "ISOSpeedLatitudeyyy",
        34869: "ISOSpeedLatitudezzz",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37379: "BrightnessValue",
        37380: "ExposureBias",
        37381: "MaxApertureValue",
        37382: "SubjectDistance",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37396: "SubjectArea",
        37386: "FocalLength",
        41483: "FlashEnergy",
        41484: "SpatialFrequencyResponse",
        41486: "FocalPlaneXResolution",
        41487: "FocalPlaneYResolution",
        41488: "FocalPlaneResolutionUnit",
        41492: "SubjectLocation",
        41493: "ExposureIndex",
        41495: "SensingMethod",
        41728: "FileSource",
        41729: "SceneType",
        41730: "CFAPattern",
        41985: "CustomRendered",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41988: "DigitalZoomRatio",
        41989: "FocalLengthIn35mmFilm",
        41990: "SceneCaptureType",
        41991: "GainControl",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness",
        41995: "DeviceSettingDescription",
        41996: "SubjectDistanceRange",
        42016: "ImageUniqueID",
        42032: "CameraOwnerName",
        42033: "BodySerialNumber",
        42034: "LensSpecification",
        42035: "LensMake",
        42036: "LensModel",
        42037: "LensSerialNumber",
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude",
        5: "GPSAltitudeRef",
        6: "GPSAltitude",
        7: "GPSTimeStamp",
        8: "GPSSatellites",
        9: "GPSStatus",
        10: "GPSMeasureMode",
        11: "GPSDOP",
        12: "GPSSpeedRef",
        13: "GPSSpeed",
        14: "GPSTrackRef",
        15: "GPSTrack",
        16: "GPSImgDirectionRef",
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: "GPSDestLatitudeRef",
        20: "GPSDestLatitude",
        21: "GPSDestLongitudeRef",
        22: "GPSDestLongitude",
        23: "GPSDestBearingRef",
        24: "GPSDestBearing",
        25: "GPSDestDistanceRef",
        26: "GPSDestDistance",
        27: "GPSProcessingMethod",
        28: "GPSAreaInformation",
        29: "GPSDateStamp",
        30: "GPSDifferential",
        31: "GPSHPositioningError"
    }, e.ExifMap.prototype.stringValues = {
        ExposureProgram: {
            0: "Undefined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0: "Flash did not fire",
            1: "Flash fired",
            5: "Strobe return light not detected",
            7: "Strobe return light detected",
            9: "Flash fired, compulsory flash mode",
            13: "Flash fired, compulsory flash mode, return light not detected",
            15: "Flash fired, compulsory flash mode, return light detected",
            16: "Flash did not fire, compulsory flash mode",
            24: "Flash did not fire, auto mode",
            25: "Flash fired, auto mode",
            29: "Flash fired, auto mode, return light not detected",
            31: "Flash fired, auto mode, return light detected",
            32: "No flash function",
            65: "Flash fired, red-eye reduction mode",
            69: "Flash fired, red-eye reduction mode, return light not detected",
            71: "Flash fired, red-eye reduction mode, return light detected",
            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89: "Flash fired, auto mode, red-eye reduction mode",
            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1: "Undefined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
        },
        SceneCaptureType: {0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene"},
        SceneType: {1: "Directly photographed"},
        CustomRendered: {0: "Normal process", 1: "Custom process"},
        WhiteBalance: {0: "Auto white balance", 1: "Manual white balance"},
        GainControl: {0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down"},
        Contrast: {0: "Normal", 1: "Soft", 2: "Hard"},
        Saturation: {0: "Normal", 1: "Low saturation", 2: "High saturation"},
        Sharpness: {0: "Normal", 1: "Soft", 2: "Hard"},
        SubjectDistanceRange: {0: "Unknown", 1: "Macro", 2: "Close view", 3: "Distant view"},
        FileSource: {3: "DSC"},
        ComponentsConfiguration: {0: "", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B"},
        Orientation: {
            1: "top-left",
            2: "top-right",
            3: "bottom-right",
            4: "bottom-left",
            5: "left-top",
            6: "right-top",
            7: "right-bottom",
            8: "left-bottom"
        }
    }, e.ExifMap.prototype.getText = function (e) {
        var t = this.get(e);
        switch (e) {
            case"LightSource":
            case"Flash":
            case"MeteringMode":
            case"ExposureProgram":
            case"SensingMethod":
            case"SceneCaptureType":
            case"SceneType":
            case"CustomRendered":
            case"WhiteBalance":
            case"GainControl":
            case"Contrast":
            case"Saturation":
            case"Sharpness":
            case"SubjectDistanceRange":
            case"FileSource":
            case"Orientation":
                return this.stringValues[e][t];
            case"ExifVersion":
            case"FlashpixVersion":
                return String.fromCharCode(t[0], t[1], t[2], t[3]);
            case"ComponentsConfiguration":
                return this.stringValues[e][t[0]] + this.stringValues[e][t[1]] + this.stringValues[e][t[2]] + this.stringValues[e][t[3]];
            case"GPSVersionID":
                return t[0] + "." + t[1] + "." + t[2] + "." + t[3]
        }
        return String(t)
    }, function (e) {
        var t, i = e.tags, a = e.map;
        for (t in i)i.hasOwnProperty(t) && (a[i[t]] = t)
    }(e.ExifMap.prototype), e.ExifMap.prototype.getAll = function () {
        var e, t, i = {};
        for (e in this)this.hasOwnProperty(e) && (t = this.tags[e], t && (i[t] = this.getText(t)));
        return i
    }
}), function (factory) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], factory) : factory(jQuery)
}(function ($) {
    function datepicker_getZindex(elem) {
        for (var position, value; elem.length && elem[0] !== document;) {
            if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), !isNaN(value) && 0 !== value))return value;
            elem = elem.parent()
        }
        return 0
    }

    function Datepicker() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, $.extend(this._defaults, this.regional[""]), this.regional.en = $.extend(!0, {}, this.regional[""]), this.regional["en-US"] = $.extend(!0, {}, this.regional.en), this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function datepicker_bindHover(dpDiv) {
        var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return dpDiv.delegate(selector, "mouseout", function () {
            $(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover")
        }).delegate(selector, "mouseover", datepicker_handleMouseover)
    }

    function datepicker_handleMouseover() {
        $.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), $(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"))
    }

    function datepicker_extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props)null == props[name] && (target[name] = props[name]);
        return target
    }

    $.extend($.ui, {datepicker: {version: "1.11.4"}});
    var datepicker_instActive;
    return $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (settings) {
            return datepicker_extendRemove(this._defaults, settings || {}), this
        },
        _attachDatepicker: function (target, settings) {
            var nodeName, inline, inst;
            nodeName = target.nodeName.toLowerCase(), inline = "div" === nodeName || "span" === nodeName, target.id || (this.uuid += 1, target.id = "dp" + this.uuid), inst = this._newInst($(target), inline), inst.settings = $.extend({}, settings || {}), "input" === nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },
        _newInst: function (target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: inline ? datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function (target, inst) {
            var input = $(target);
            inst.append = $([]), inst.trigger = $([]), input.hasClass(this.markerClassName) || (this._attachments(input, inst), input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(inst), $.data(target, "datepicker", inst), inst.settings.disabled && this._disableDatepicker(target))
        },
        _attachments: function (input, inst) {
            var showOn, buttonText, buttonImage, appendText = this._get(inst, "appendText"), isRTL = this._get(inst, "isRTL");
            inst.append && inst.append.remove(), appendText && (inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>"), input[isRTL ? "before" : "after"](inst.append)), input.unbind("focus", this._showDatepicker), inst.trigger && inst.trigger.remove(), showOn = this._get(inst, "showOn"), "focus" !== showOn && "both" !== showOn || input.focus(this._showDatepicker), "button" !== showOn && "both" !== showOn || (buttonText = this._get(inst, "buttonText"), buttonImage = this._get(inst, "buttonImage"), inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                src: buttonImage,
                alt: buttonText,
                title: buttonText
            }) : $("<button type='button'></button>").addClass(this._triggerClass).html(buttonImage ? $("<img/>").attr({
                src: buttonImage,
                alt: buttonText,
                title: buttonText
            }) : buttonText)), input[isRTL ? "before" : "after"](inst.trigger), inst.trigger.click(function () {
                return $.datepicker._datepickerShowing && $.datepicker._lastInput === input[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(input[0])) : $.datepicker._showDatepicker(input[0]), !1
            }))
        },
        _autoSize: function (inst) {
            if (this._get(inst, "autoSize") && !inst.inline) {
                var findMax, max, maxI, i, date = new Date(2009, 11, 20), dateFormat = this._get(inst, "dateFormat");
                dateFormat.match(/[DM]/) && (findMax = function (names) {
                    for (max = 0, maxI = 0, i = 0; i < names.length; i++)names[i].length > max && (max = names[i].length, maxI = i);
                    return maxI
                }, date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))), date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay())), inst.input.attr("size", this._formatDate(inst, date).length)
            }
        },
        _inlineDatepicker: function (target, inst) {
            var divSpan = $(target);
            divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv), $.data(target, "datepicker", inst), this._setDate(inst, this._getDefaultDate(inst), !0), this._updateDatepicker(inst), this._updateAlternate(inst), inst.settings.disabled && this._disableDatepicker(target), inst.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (input, date, onSelect, settings, pos) {
            var id, browserWidth, browserHeight, scrollX, scrollY, inst = this._dialogInst;
            return inst || (this.uuid += 1, id = "dp" + this.uuid, this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), inst = this._dialogInst = this._newInst(this._dialogInput, !1), inst.settings = {}, $.data(this._dialogInput[0], "datepicker", inst)), datepicker_extendRemove(inst.settings, settings || {}), date = date && date.constructor === Date ? this._formatDate(inst, date) : date, this._dialogInput.val(date), this._pos = pos ? pos.length ? pos : [pos.pageX, pos.pageY] : null, this._pos || (browserWidth = document.documentElement.clientWidth, browserHeight = document.documentElement.clientHeight, scrollX = document.documentElement.scrollLeft || document.body.scrollLeft, scrollY = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), inst.settings.onSelect = onSelect, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], "datepicker", inst), this
        },
        _destroyDatepicker: function (target) {
            var nodeName, $target = $(target), inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), $.removeData(target, "datepicker"), "input" === nodeName ? (inst.append.remove(), inst.trigger.remove(), $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" !== nodeName && "span" !== nodeName || $target.removeClass(this.markerClassName).empty(), datepicker_instActive === inst && (datepicker_instActive = null))
        },
        _enableDatepicker: function (target) {
            var nodeName, inline, $target = $(target), inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), "input" === nodeName ? (target.disabled = !1, inst.trigger.filter("button").each(function () {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : "div" !== nodeName && "span" !== nodeName || (inline = $target.children("." + this._inlineClass), inline.children().removeClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return value === target ? null : value
            }))
        },
        _disableDatepicker: function (target) {
            var nodeName, inline, $target = $(target), inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), "input" === nodeName ? (target.disabled = !0, inst.trigger.filter("button").each(function () {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : "div" !== nodeName && "span" !== nodeName || (inline = $target.children("." + this._inlineClass), inline.children().addClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
                this._disabledInputs = $.map(this._disabledInputs, function (value) {
                    return value === target ? null : value
                }), this._disabledInputs[this._disabledInputs.length] = target)
        },
        _isDisabledDatepicker: function (target) {
            if (!target)return !1;
            for (var i = 0; i < this._disabledInputs.length; i++)if (this._disabledInputs[i] === target)return !0;
            return !1
        },
        _getInst: function (target) {
            try {
                return $.data(target, "datepicker")
            } catch (err) {
                throw"Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (target, name, value) {
            var settings, date, minDate, maxDate, inst = this._getInst(target);
            return 2 === arguments.length && "string" == typeof name ? "defaults" === name ? $.extend({}, $.datepicker._defaults) : inst ? "all" === name ? $.extend({}, inst.settings) : this._get(inst, name) : null : (settings = name || {}, "string" == typeof name && (settings = {}, settings[name] = value), void(inst && (this._curInst === inst && this._hideDatepicker(), date = this._getDateDatepicker(target, !0), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), datepicker_extendRemove(inst.settings, settings), null !== minDate && void 0 !== settings.dateFormat && void 0 === settings.minDate && (inst.settings.minDate = this._formatDate(inst, minDate)), null !== maxDate && void 0 !== settings.dateFormat && void 0 === settings.maxDate && (inst.settings.maxDate = this._formatDate(inst, maxDate)), "disabled" in settings && (settings.disabled ? this._disableDatepicker(target) : this._enableDatepicker(target)), this._attachments($(target), inst), this._autoSize(inst), this._setDate(inst, date), this._updateAlternate(inst), this._updateDatepicker(inst))))
        },
        _changeDatepicker: function (target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function (target) {
            var inst = this._getInst(target);
            inst && this._updateDatepicker(inst)
        },
        _setDateDatepicker: function (target, date) {
            var inst = this._getInst(target);
            inst && (this._setDate(inst, date), this._updateDatepicker(inst), this._updateAlternate(inst))
        },
        _getDateDatepicker: function (target, noDefault) {
            var inst = this._getInst(target);
            return inst && !inst.inline && this._setDateFromField(inst, noDefault), inst ? this._getDate(inst) : null
        },
        _doKeyDown: function (event) {
            var onSelect, dateStr, sel, inst = $.datepicker._getInst(event.target), handled = !0, isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            if (inst._keyEvent = !0, $.datepicker._datepickerShowing)switch (event.keyCode) {
                case 9:
                    $.datepicker._hideDatepicker(), handled = !1;
                    break;
                case 13:
                    return sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv), sel[0] && $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]), onSelect = $.datepicker._get(inst, "onSelect"), onSelect ? (dateStr = $.datepicker._formatDate(inst), onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst])) : $.datepicker._hideDatepicker(), !1;
                case 27:
                    $.datepicker._hideDatepicker();
                    break;
                case 33:
                    $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 34:
                    $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 35:
                    (event.ctrlKey || event.metaKey) && $.datepicker._clearDate(event.target), handled = event.ctrlKey || event.metaKey;
                    break;
                case 36:
                    (event.ctrlKey || event.metaKey) && $.datepicker._gotoToday(event.target), handled = event.ctrlKey || event.metaKey;
                    break;
                case 37:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? 1 : -1, "D"), handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 38:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, -7, "D"), handled = event.ctrlKey || event.metaKey;
                    break;
                case 39:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? -1 : 1, "D"), handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 40:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, 7, "D"), handled = event.ctrlKey || event.metaKey;
                    break;
                default:
                    handled = !1
            } else 36 === event.keyCode && event.ctrlKey ? $.datepicker._showDatepicker(this) : handled = !1;
            handled && (event.preventDefault(), event.stopPropagation())
        },
        _doKeyPress: function (event) {
            var chars, chr, inst = $.datepicker._getInst(event.target);
            return $.datepicker._get(inst, "constrainInput") ? (chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")), chr = String.fromCharCode(null == event.charCode ? event.keyCode : event.charCode), event.ctrlKey || event.metaKey || " " > chr || !chars || chars.indexOf(chr) > -1) : void 0
        },
        _doKeyUp: function (event) {
            var date, inst = $.datepicker._getInst(event.target);
            if (inst.input.val() !== inst.lastVal)try {
                date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst)), date && ($.datepicker._setDateFromField(inst), $.datepicker._updateAlternate(inst), $.datepicker._updateDatepicker(inst))
            } catch (err) {
            }
            return !0
        },
        _showDatepicker: function (input) {
            if (input = input.target || input, "input" !== input.nodeName.toLowerCase() && (input = $("input", input.parentNode)[0]), !$.datepicker._isDisabledDatepicker(input) && $.datepicker._lastInput !== input) {
                var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
                inst = $.datepicker._getInst(input), $.datepicker._curInst && $.datepicker._curInst !== inst && ($.datepicker._curInst.dpDiv.stop(!0, !0), inst && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0])), beforeShow = $.datepicker._get(inst, "beforeShow"), beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {}, beforeShowSettings !== !1 && (datepicker_extendRemove(inst.settings, beforeShowSettings), inst.lastVal = null, $.datepicker._lastInput = input, $.datepicker._setDateFromField(inst), $.datepicker._inDialog && (input.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(input), $.datepicker._pos[1] += input.offsetHeight), isFixed = !1, $(input).parents().each(function () {
                    return isFixed |= "fixed" === $(this).css("position"), !isFixed
                }), offset = {
                    left: $.datepicker._pos[0],
                    top: $.datepicker._pos[1]
                }, $.datepicker._pos = null, inst.dpDiv.empty(), inst.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), $.datepicker._updateDatepicker(inst), offset = $.datepicker._checkOffset(inst, offset, isFixed), inst.dpDiv.css({
                    position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
                    display: "none",
                    left: offset.left + "px",
                    top: offset.top + "px"
                }), inst.inline || (showAnim = $.datepicker._get(inst, "showAnim"), duration = $.datepicker._get(inst, "duration"), inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects.effect[showAnim] ? inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration) : inst.dpDiv[showAnim || "show"](showAnim ? duration : null), $.datepicker._shouldFocusInput(inst) && inst.input.focus(), $.datepicker._curInst = inst))
            }
        },
        _updateDatepicker: function (inst) {
            this.maxRows = 4, datepicker_instActive = inst, inst.dpDiv.empty().append(this._generateHTML(inst)), this._attachHandlers(inst);
            var origyearshtml, numMonths = this._getNumberOfMonths(inst), cols = numMonths[1], width = 17, activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");
            activeCell.length > 0 && datepicker_handleMouseover.apply(activeCell.get(0)), inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), cols > 1 && inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em"), inst.dpDiv[(1 !== numMonths[0] || 1 !== numMonths[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst) && inst.input.focus(), inst.yearshtml && (origyearshtml = inst.yearshtml, setTimeout(function () {
                origyearshtml === inst.yearshtml && inst.yearshtml && inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml), origyearshtml = inst.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function (inst) {
            return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus")
        },
        _checkOffset: function (inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth(), dpHeight = inst.dpDiv.outerHeight(), inputWidth = inst.input ? inst.input.outerWidth() : 0, inputHeight = inst.input ? inst.input.outerHeight() : 0, viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()), viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
            return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0, offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0, offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0, offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0), offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0), offset
        },
        _findPos: function (obj) {
            for (var position, inst = this._getInst(obj), isRTL = this._get(inst, "isRTL"); obj && ("hidden" === obj.type || 1 !== obj.nodeType || $.expr.filters.hidden(obj));)obj = obj[isRTL ? "previousSibling" : "nextSibling"];
            return position = $(obj).offset(), [position.left, position.top]
        },
        _hideDatepicker: function (input) {
            var showAnim, duration, postProcess, onClose, inst = this._curInst;
            !inst || input && inst !== $.data(input, "datepicker") || this._datepickerShowing && (showAnim = this._get(inst, "showAnim"), duration = this._get(inst, "duration"), postProcess = function () {
                $.datepicker._tidyDialog(inst)
            }, $.effects && ($.effects.effect[showAnim] || $.effects[showAnim]) ? inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) : inst.dpDiv["slideDown" === showAnim ? "slideUp" : "fadeIn" === showAnim ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess), showAnim || postProcess(), this._datepickerShowing = !1, onClose = this._get(inst, "onClose"), onClose && onClose.apply(inst.input ? inst.input[0] : null, [inst.input ? inst.input.val() : "", inst]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function (inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (event) {
            if ($.datepicker._curInst) {
                var $target = $(event.target), inst = $.datepicker._getInst($target[0]);
                ($target[0].id === $.datepicker._mainDivId || 0 !== $target.parents("#" + $.datepicker._mainDivId).length || $target.hasClass($.datepicker.markerClassName) || $target.closest("." + $.datepicker._triggerClass).length || !$.datepicker._datepickerShowing || $.datepicker._inDialog && $.blockUI) && (!$target.hasClass($.datepicker.markerClassName) || $.datepicker._curInst === inst) || $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (id, offset, period) {
            var target = $(id), inst = this._getInst(target[0]);
            this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" === period ? this._get(inst, "showCurrentAtPos") : 0), period), this._updateDatepicker(inst))
        },
        _gotoToday: function (id) {
            var date, target = $(id), inst = this._getInst(target[0]);
            this._get(inst, "gotoCurrent") && inst.currentDay ? (inst.selectedDay = inst.currentDay, inst.drawMonth = inst.selectedMonth = inst.currentMonth, inst.drawYear = inst.selectedYear = inst.currentYear) : (date = new Date, inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear()), this._notifyChange(inst), this._adjustDate(target)
        },
        _selectMonthYear: function (id, select, period) {
            var target = $(id), inst = this._getInst(target[0]);
            inst["selected" + ("M" === period ? "Month" : "Year")] = inst["draw" + ("M" === period ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10), this._notifyChange(inst), this._adjustDate(target)
        },
        _selectDay: function (id, month, year, td) {
            var inst, target = $(id);
            $(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0]) || (inst = this._getInst(target[0]), inst.selectedDay = inst.currentDay = $("a", td).html(), inst.selectedMonth = inst.currentMonth = month, inst.selectedYear = inst.currentYear = year, this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear)))
        },
        _clearDate: function (id) {
            var target = $(id);
            this._selectDate(target, "")
        },
        _selectDate: function (id, dateStr) {
            var onSelect, target = $(id), inst = this._getInst(target[0]);
            dateStr = null != dateStr ? dateStr : this._formatDate(inst), inst.input && inst.input.val(dateStr), this._updateAlternate(inst), onSelect = this._get(inst, "onSelect"), onSelect ? onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]) : inst.input && inst.input.trigger("change"), inst.inline ? this._updateDatepicker(inst) : (this._hideDatepicker(), this._lastInput = inst.input[0], "object" != typeof inst.input[0] && inst.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (inst) {
            var altFormat, date, dateStr, altField = this._get(inst, "altField");
            altField && (altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"), date = this._getDate(inst), dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst)), $(altField).each(function () {
                $(this).val(dateStr)
            }))
        },
        noWeekends: function (date) {
            var day = date.getDay();
            return [day > 0 && 6 > day, ""]
        },
        iso8601Week: function (date) {
            var time, checkDate = new Date(date.getTime());
            return checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)), time = checkDate.getTime(), checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1
        },
        parseDate: function (format, value, settings) {
            if (null == format || null == value)throw"Invalid arguments";
            if (value = "object" == typeof value ? value.toString() : value + "", "" === value)return null;
            var iFormat, dim, extra, date, iValue = 0, shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff, shortYearCutoff = "string" != typeof shortYearCutoffTemp ? shortYearCutoffTemp : (new Date).getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10), dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = !1, lookAhead = function (match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                return matches && iFormat++, matches
            }, getNumber = function (match) {
                var isDoubled = lookAhead(match), size = "@" === match ? 14 : "!" === match ? 20 : "y" === match && isDoubled ? 4 : "o" === match ? 3 : 2, minSize = "y" === match ? size : 1, digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
                if (!num)throw"Missing number at position " + iValue;
                return iValue += num[0].length, parseInt(num[0], 10)
            }, getName = function (match, shortNames, longNames) {
                var index = -1, names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
                    return [[k, v]]
                }).sort(function (a, b) {
                    return -(a[1].length - b[1].length)
                });
                if ($.each(names, function (i, pair) {
                        var name = pair[1];
                        return value.substr(iValue, name.length).toLowerCase() === name.toLowerCase() ? (index = pair[0], iValue += name.length, !1) : void 0
                    }), -1 !== index)return index + 1;
                throw"Unknown name at position " + iValue
            }, checkLiteral = function () {
                if (value.charAt(iValue) !== format.charAt(iFormat))throw"Unexpected literal at position " + iValue;
                iValue++
            };
            for (iFormat = 0; iFormat < format.length; iFormat++)if (literal)"'" !== format.charAt(iFormat) || lookAhead("'") ? checkLiteral() : literal = !1; else switch (format.charAt(iFormat)) {
                case"d":
                    day = getNumber("d");
                    break;
                case"D":
                    getName("D", dayNamesShort, dayNames);
                    break;
                case"o":
                    doy = getNumber("o");
                    break;
                case"m":
                    month = getNumber("m");
                    break;
                case"M":
                    month = getName("M", monthNamesShort, monthNames);
                    break;
                case"y":
                    year = getNumber("y");
                    break;
                case"@":
                    date = new Date(getNumber("@")), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
                    break;
                case"!":
                    date = new Date((getNumber("!") - this._ticksTo1970) / 1e4), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
                    break;
                case"'":
                    lookAhead("'") ? checkLiteral() : literal = !0;
                    break;
                default:
                    checkLiteral()
            }
            if (iValue < value.length && (extra = value.substr(iValue), !/^\s+/.test(extra)))throw"Extra/unparsed characters found in date: " + extra;
            if (-1 === year ? year = (new Date).getFullYear() : 100 > year && (year += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (shortYearCutoff >= year ? 0 : -100)), doy > -1)for (month = 1, day = doy; ;) {
                if (dim = this._getDaysInMonth(year, month - 1), dim >= day)break;
                month++, day -= dim
            }
            if (date = this._daylightSavingAdjust(new Date(year, month - 1, day)), date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day)throw"Invalid date";
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function (format, date, settings) {
            if (!date)return "";
            var iFormat, dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, lookAhead = function (match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                return matches && iFormat++, matches
            }, formatNumber = function (match, value, len) {
                var num = "" + value;
                if (lookAhead(match))for (; num.length < len;)num = "0" + num;
                return num
            }, formatName = function (match, value, shortNames, longNames) {
                return lookAhead(match) ? longNames[value] : shortNames[value]
            }, output = "", literal = !1;
            if (date)for (iFormat = 0; iFormat < format.length; iFormat++)if (literal)"'" !== format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) : literal = !1; else switch (format.charAt(iFormat)) {
                case"d":
                    output += formatNumber("d", date.getDate(), 2);
                    break;
                case"D":
                    output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                    break;
                case"o":
                    output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                    break;
                case"m":
                    output += formatNumber("m", date.getMonth() + 1, 2);
                    break;
                case"M":
                    output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                    break;
                case"y":
                    output += lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100;
                    break;
                case"@":
                    output += date.getTime();
                    break;
                case"!":
                    output += 1e4 * date.getTime() + this._ticksTo1970;
                    break;
                case"'":
                    lookAhead("'") ? output += "'" : literal = !0;
                    break;
                default:
                    output += format.charAt(iFormat)
            }
            return output
        },
        _possibleChars: function (format) {
            var iFormat, chars = "", literal = !1, lookAhead = function (match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                return matches && iFormat++, matches
            };
            for (iFormat = 0; iFormat < format.length; iFormat++)if (literal)"'" !== format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) : literal = !1; else switch (format.charAt(iFormat)) {
                case"d":
                case"m":
                case"y":
                case"@":
                    chars += "0123456789";
                    break;
                case"D":
                case"M":
                    return null;
                case"'":
                    lookAhead("'") ? chars += "'" : literal = !0;
                    break;
                default:
                    chars += format.charAt(iFormat)
            }
            return chars
        },
        _get: function (inst, name) {
            return void 0 !== inst.settings[name] ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function (inst, noDefault) {
            if (inst.input.val() !== inst.lastVal) {
                var dateFormat = this._get(inst, "dateFormat"), dates = inst.lastVal = inst.input ? inst.input.val() : null, defaultDate = this._getDefaultDate(inst), date = defaultDate, settings = this._getFormatConfig(inst);
                try {
                    date = this.parseDate(dateFormat, dates, settings) || defaultDate
                } catch (event) {
                    dates = noDefault ? "" : dates
                }
                inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear(), inst.currentDay = dates ? date.getDate() : 0, inst.currentMonth = dates ? date.getMonth() : 0, inst.currentYear = dates ? date.getFullYear() : 0, this._adjustInstDate(inst)
            }
        },
        _getDefaultDate: function (inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date))
        },
        _determineDate: function (inst, date, defaultDate) {
            var offsetNumeric = function (offset) {
                var date = new Date;
                return date.setDate(date.getDate() + offset), date
            }, offsetString = function (offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
                } catch (e) {
                }
                for (var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date, year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches;) {
                    switch (matches[2] || "d") {
                        case"d":
                        case"D":
                            day += parseInt(matches[1], 10);
                            break;
                        case"w":
                        case"W":
                            day += 7 * parseInt(matches[1], 10);
                            break;
                        case"m":
                        case"M":
                            month += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break;
                        case"y":
                        case"Y":
                            year += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month))
                    }
                    matches = pattern.exec(offset)
                }
                return new Date(year, month, day)
            }, newDate = null == date || "" === date ? defaultDate : "string" == typeof date ? offsetString(date) : "number" == typeof date ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
            return newDate = newDate && "Invalid Date" === newDate.toString() ? defaultDate : newDate, newDate && (newDate.setHours(0), newDate.setMinutes(0), newDate.setSeconds(0), newDate.setMilliseconds(0)), this._daylightSavingAdjust(newDate)
        },
        _daylightSavingAdjust: function (date) {
            return date ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0), date) : null
        },
        _setDate: function (inst, date, noChange) {
            var clear = !date, origMonth = inst.selectedMonth, origYear = inst.selectedYear, newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date));
            inst.selectedDay = inst.currentDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(), inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(), origMonth === inst.selectedMonth && origYear === inst.selectedYear || noChange || this._notifyChange(inst), this._adjustInstDate(inst), inst.input && inst.input.val(clear ? "" : this._formatDate(inst))
        },
        _getDate: function (inst) {
            var startDate = !inst.currentYear || inst.input && "" === inst.input.val() ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
            return startDate
        },
        _attachHandlers: function (inst) {
            var stepMonths = this._get(inst, "stepMonths"), id = "#" + inst.id.replace(/\\\\/g, "\\");
            inst.dpDiv.find("[data-handler]").map(function () {
                var handler = {
                    prev: function () {
                        $.datepicker._adjustDate(id, -stepMonths, "M")
                    }, next: function () {
                        $.datepicker._adjustDate(id, +stepMonths, "M")
                    }, hide: function () {
                        $.datepicker._hideDatepicker()
                    }, today: function () {
                        $.datepicker._gotoToday(id)
                    }, selectDay: function () {
                        return $.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    }, selectMonth: function () {
                        return $.datepicker._selectMonthYear(id, this, "M"), !1
                    }, selectYear: function () {
                        return $.datepicker._selectMonthYear(id, this, "Y"), !1
                    }
                };
                $(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (inst) {
            var maxDraw, prevText, prev, nextText, next, currentText, gotoDate, controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, tempDate = new Date, today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), isRTL = this._get(inst, "isRTL"), showButtonPanel = this._get(inst, "showButtonPanel"), hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"), navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"), numMonths = this._getNumberOfMonths(inst), showCurrentAtPos = this._get(inst, "showCurrentAtPos"), stepMonths = this._get(inst, "stepMonths"), isMultiMonth = 1 !== numMonths[0] || 1 !== numMonths[1], currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay) : new Date(9999, 9, 9)), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), drawMonth = inst.drawMonth - showCurrentAtPos, drawYear = inst.drawYear;
            if (0 > drawMonth && (drawMonth += 12, drawYear--), maxDate)for (maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate())), maxDraw = minDate && minDate > maxDraw ? minDate : maxDraw; this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw;)drawMonth--, 0 > drawMonth && (drawMonth = 11, drawYear--);
            for (inst.drawMonth = drawMonth, inst.drawYear = drawYear, prevText = this._get(inst, "prevText"), prevText = navigationAsDateFormat ? this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)) : prevText, prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>", nextText = this._get(inst, "nextText"), nextText = navigationAsDateFormat ? this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)) : nextText, next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>", currentText = this._get(inst, "currentText"), gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today, currentText = navigationAsDateFormat ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) : currentText, controls = inst.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>", buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "", firstDay = parseInt(this._get(inst, "firstDay"), 10), firstDay = isNaN(firstDay) ? 0 : firstDay, showWeek = this._get(inst, "showWeek"), dayNames = this._get(inst, "dayNames"), dayNamesMin = this._get(inst, "dayNamesMin"), monthNames = this._get(inst, "monthNames"), monthNamesShort = this._get(inst, "monthNamesShort"), beforeShowDay = this._get(inst, "beforeShowDay"), showOtherMonths = this._get(inst, "showOtherMonths"), selectOtherMonths = this._get(inst, "selectOtherMonths"), defaultDate = this._getDefaultDate(inst), html = "", row = 0; row < numMonths[0]; row++) {
                for (group = "", this.maxRows = 4, col = 0; col < numMonths[1]; col++) {
                    if (selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay)), cornerClass = " ui-corner-all", calender = "", isMultiMonth) {
                        if (calender += "<div class='ui-datepicker-group", numMonths[1] > 1)switch (col) {
                            case 0:
                                calender += " ui-datepicker-group-first", cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                break;
                            case numMonths[1] - 1:
                                calender += " ui-datepicker-group-last", cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                break;
                            default:
                                calender += " ui-datepicker-group-middle", cornerClass = ""
                        }
                        calender += "'>"
                    }
                    for (calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && 0 === row ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && 0 === row ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + "</div><table class='ui-datepicker-calendar'><thead><tr>", thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "", dow = 0; 7 > dow; dow++)day = (dow + firstDay) % 7, thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
                    for (calender += thead + "</tr></thead><tbody>", daysInMonth = this._getDaysInMonth(drawYear, drawMonth), drawYear === inst.selectedYear && drawMonth === inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)), leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7, curRows = Math.ceil((leadDays + daysInMonth) / 7), numRows = isMultiMonth && this.maxRows > curRows ? this.maxRows : curRows, this.maxRows = numRows, printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays)), dRow = 0; numRows > dRow; dRow++) {
                        for (calender += "<tr>", tbody = showWeek ? "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>" : "", dow = 0; 7 > dow; dow++)daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [!0, ""], otherMonth = printDate.getMonth() !== drawMonth, unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && minDate > printDate || maxDate && printDate > maxDate, tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + (printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + (otherMonth && !showOtherMonths || !daySettings[2] ? "" : " title='" + daySettings[2].replace(/'/g, "&#39;") + "'") + (unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + "' href='#'>" + printDate.getDate() + "</a>") + "</td>", printDate.setDate(printDate.getDate() + 1), printDate = this._daylightSavingAdjust(printDate);
                        calender += tbody + "</tr>"
                    }
                    drawMonth++, drawMonth > 11 && (drawMonth = 0, drawYear++), calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), group += calender
                }
                html += group
            }
            return html += buttonPanel, inst._keyEvent = !1, html
        },
        _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear, changeMonth = this._get(inst, "changeMonth"), changeYear = this._get(inst, "changeYear"), showMonthAfterYear = this._get(inst, "showMonthAfterYear"), html = "<div class='ui-datepicker-title'>", monthHtml = "";
            if (secondary || !changeMonth)monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>"; else {
                for (inMinYear = minDate && minDate.getFullYear() === drawYear, inMaxYear = maxDate && maxDate.getFullYear() === drawYear, monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", month = 0; 12 > month; month++)(!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>");
                monthHtml += "</select>"
            }
            if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" : "&#xa0;")), !inst.yearshtml)if (inst.yearshtml = "", secondary || !changeYear)html += "<span class='ui-datepicker-year'>" + drawYear + "</span>"; else {
                for (years = this._get(inst, "yearRange").split(":"), thisYear = (new Date).getFullYear(), determineYear = function (value) {
                    var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
                    return isNaN(year) ? thisYear : year
                }, year = determineYear(years[0]), endYear = Math.max(year, determineYear(years[1] || "")), year = minDate ? Math.max(year, minDate.getFullYear()) : year, endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear, inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; endYear >= year; year++)inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
                inst.yearshtml += "</select>", html += inst.yearshtml, inst.yearshtml = null
            }
            return html += this._get(inst, "yearSuffix"), showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" : "&#xa0;") + monthHtml), html += "</div>"
        },
        _adjustInstDate: function (inst, offset, period) {
            var year = inst.drawYear + ("Y" === period ? offset : 0), month = inst.drawMonth + ("M" === period ? offset : 0), day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" === period ? offset : 0), date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear(), "M" !== period && "Y" !== period || this._notifyChange(inst)
        },
        _restrictMinMax: function (inst, date) {
            var minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), newDate = minDate && minDate > date ? minDate : date;
            return maxDate && newDate > maxDate ? maxDate : newDate
        },
        _notifyChange: function (inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            onChange && onChange.apply(inst.input ? inst.input[0] : null, [inst.selectedYear, inst.selectedMonth + 1, inst])
        },
        _getNumberOfMonths: function (inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return null == numMonths ? [1, 1] : "number" == typeof numMonths ? [1, numMonths] : numMonths
        },
        _getMinMaxDate: function (inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
        },
        _getDaysInMonth: function (year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate()
        },
        _getFirstDayOfMonth: function (year, month) {
            return new Date(year, month, 1).getDay()
        },
        _canAdjustMonth: function (inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst), date = this._daylightSavingAdjust(new Date(curYear, curMonth + (0 > offset ? offset : numMonths[0] * numMonths[1]), 1));
            return 0 > offset && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())), this._isInRange(inst, date)
        },
        _isInRange: function (inst, date) {
            var yearSplit, currentYear, minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), minYear = null, maxYear = null, years = this._get(inst, "yearRange");
            return years && (yearSplit = years.split(":"), currentYear = (new Date).getFullYear(), minYear = parseInt(yearSplit[0], 10), maxYear = parseInt(yearSplit[1], 10), yearSplit[0].match(/[+\-].*/) && (minYear += currentYear), yearSplit[1].match(/[+\-].*/) && (maxYear += currentYear)), (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear)
        },
        _getFormatConfig: function (inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            return shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : (new Date).getFullYear() % 100 + parseInt(shortYearCutoff, 10), {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function (inst, day, month, year) {
            day || (inst.currentDay = inst.selectedDay, inst.currentMonth = inst.selectedMonth, inst.currentYear = inst.selectedYear);
            var date = day ? "object" == typeof day ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    }), $.fn.datepicker = function (options) {
        if (!this.length)return this;
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick), $.datepicker.initialized = !0), 0 === $("#" + $.datepicker._mainDivId).length && $("body").append($.datepicker.dpDiv);
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof options || "isDisabled" !== options && "getDate" !== options && "widget" !== options ? "option" === options && 2 === arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs)) : this.each(function () {
            "string" == typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        }) : $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
    }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.11.4", $.datepicker
}), function (factory) {
    "function" == typeof define && define.amd ? define(["../datepicker"], factory) : factory(jQuery.datepicker)
}(function (datepicker) {
    return datepicker.regional.fr = {
        closeText: "Fermer",
        prevText: "Précédent",
        nextText: "Suivant",
        currentText: "Aujourd'hui",
        monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        monthNamesShort: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
        dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
        dayNamesShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
        dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
        weekHeader: "Sem.",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }, datepicker.setDefaults(datepicker.regional.fr), datepicker.regional.fr
});