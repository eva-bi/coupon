var AUCFAN_SEARCH_PAGE = {
        set_submit_values: function() {},
        site_select_disabled: function(a, b) {
            1 > $("#form_speed_search").length && (1 == b ? (a.find("#disp_site_radio").css("display", "none"), a.find("#disp_site_checkbox").css("display", "block")) : (a.find("#disp_site_radio").css("display", "block"), a.find("#disp_site_checkbox").css("display", "none")))
        },
        warnning_message: function(a, b, c) {
            c = "show" == c ? "block" : "none";
            "select_mix" == b && a.find(".warning_message_site_mix").css("display", c)
        },
        disp_seller_form: function(a, b,
            c) {
            c = "show" == c ? "block" : "none";
            "disp_seller" == b && a.find(".disp_seller").css("display", c)
        },
        yahoo_search_param_area_toggle: function(a, b) {
            var c = "show" == b ? "block" : "none";
            a.find("#disp_seller_form").css("display", c);
            a.find("#itemstatus_area").css("display", c);
            a.find("#sellertype_area").css("display", c);
            a.find("#location_area").css("display", c)
        },
        show_site_icon_open: function(a, b) {
            var c = {
                sya: "1",
                sra: "1",
                smo: "1",
                sbi: "1",
                seb: "1",
                ssm: "1",
                sam: "1",
                syas: "1",
                srai: "1",
                stb: "1"
            };
            jQuery.each(b, function(a, b) {
                c[a] && 0 ==
                    b && $("#site_icon_open_" + a).hide()
            })
        },
        form_edit_ym12_clear: function(a) {},
        form_edit_ym12: function(a) {},
        form_edit: function(a, b) {
            for (var c = {
                    sya: "1",
                    sra: "1",
                    smo: "1",
                    sbi: "",
                    seb: "",
                    ssm: "1",
                    sam: "",
                    syas: "",
                    srai: "",
                    stb: "",
                    s: "",
                    c: "",
                    q: "",
                    search: "",
                    l: "",
                    u: "",
                    ym: "",
                    t: "",
                    o: "t1",
                    vmode: 2
                }, d = {
                    ss: "15",
                    s: "mix",
                    sya: "1",
                    smo: "1",
                    sra: "1",
                    sbi: "1",
                    smix: "1",
                    mix: "mix",
                    c: "",
                    q: "",
                    search: "",
                    l: "",
                    u: "",
                    ym: "l30d",
                    t: "l30d",
                    o: "t1",
                    vmode: 0,
                    seller: "",
                    itemstatus: "",
                    sellertype: "",
                    location: "",
                    site_select_checkbox_yahoo: "ya",
                    site_select_checkbox_rakuten: "ra",
                    site_select_checkbox_mobaok: "mo",
                    site_select_checkbox_bidders: "bi",
                    sites: "ya"
                }, e = {
                    ya: {
                        yaopt_aucmin_bidorbuy_price: "",
                        yaopt_aucmax_bidorbuy_price: "",
                        yaopt_loc_cd: "0",
                        yaopt_abatch: "0",
                        yaopt_istatus: "0",
                        yaopt_escrow: "",
                        yaopt_new: "",
                        yaopt_afc: "",
                        yaopt_buynow: "",
                        yaopt_ybank: "",
                        yaopt_pstagefree: "",
                        yaopt_thumb: "",
                        yaopt_wrappingicon: "",
                        yaopt_point: "",
                        yaopt_jpypayment: "",
                        yaopt_intl: "",
                        yaopt_offer: "",
                        yaopt_gift_icon: "0"
                    }
                }, l = [], g = 0; g < a.length; g++) "" != a[g]["class"] && $("." + a[g]["class"]).each(function(b) {
                var c =
                    a[g]["class"] + "_id_" + b;
                $(this).attr("id", c);
                l[b] = a[g];
                l[b].id = c;
                l[b]["class"] = ""
            });
            for (g = 0; g < l.length; g++) a.push(l[g]);
            for (g = 0; g < a.length; g++) {
                var k = {},
                    f = {};
                if ("" != a[g].site && e[a[g].site]) {
                    var f = e[a[g].site],
                        m;
                    for (m in f) k[m] = f[m]
                }
                f = "open" == a[g].type ? c : d;
                for (m in f) k[m] = f[m];
                for (m in b) {
                    if ("search" == m || "q" == m) f = "" + b[m], f = f.replace(/&amp;/g, "&"), f = f.replace(/&gt;/g, ">"), f = f.replace(/&lt;/g, "<"), f = f.replace(/&quot;/g, '"'), f = f.replace(/&#39;/g, "'"), f = f.replace(/&apos;/g, "'"), b[m] = f;
                    k[m] = b[m]
                }
                "" == k.vmode &&
                    (k.vmode = "0");
                "" != k.s && "mix" != k.s && (k.sites = k.s);
                var p = a[g].site,
                    h = $("#" + a[g].id);
                h.find("input:text , input:hidden").each(function() {
                    $(this).val(k[$(this).attr("name")])
                });
                h.find("input:radio").each(function() {
                    $(this).val() == k[$(this).attr("name")] ? $(this).attr("checked", !0) : $(this).attr("checked", !1)
                });
                h.find("input:checkbox").each(function() {
                    $(this).val() == k[$(this).attr("name")] ? $(this).attr("checked", !0) : $(this).attr("checked", !1)
                });
                h.find("select option").each(function() {
                    $(this).val() == k[$(this).parent().attr("name")] ?
                        $(this).attr("selected", !0) : $(this).attr("selected", !1)
                });
                "open" == a[g].type ? h.submit(function() {
                    var a = "",
                        b = "",
                        c = "",
                        d = "";
                    h.find("input:text[name='search'] , input:text[name='q'] , input:hidden[name='search'] , input:hidden[name='s']").each(function() {
                        "" != $(this).val() && (a += $(this).val())
                    });
                    h.find("input:radio[name='s']").each(function() {
                        1 == $(this).attr("checked") && (b = $(this).val())
                    });
                    h.find("select[name='s'] option").each(function() {
                        1 == $(this).attr("selected") && (b = $(this).val())
                    });
                    h.find("input:hidden[name='s']").val() &&
                        (c = h.find("input:hidden[name='s']").val());
                    h.find("input:hidden[name='ss']").val() && (c = h.find("input:hidden[name='ss']").val());
                    h.find("#site_select_check_box_list input:checkbox[class='site_select_check_box']").each(function() {
                        1 == $(this).attr("checked") && (d += "," + $(this).attr("name"))
                    });
                    if ("" == a) return alert("\u5fc5\u305a\u30ad\u30fc\u30ef\u30fc\u30c9\u3092\u5165\u529b\u304f\u3060\u3055\u3044 "), !1;
                    if (p) AUCFAN_SEARCH_PAGE.site_detail_option_form_submit(h, p);
                    else if ("" == b && "" == c && "" == d) return alert("\u30b5\u30a4\u30c8\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044 "), !1;
                    return !0
                }) : "past" == a[g].type && (h.find("#site_select_radio_mix").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), h.find("#site_select_radio_sites").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f = h.find("#disp_site_radio"), f.find("#site_select_radio_yahoo").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#site_select_radio_rakuten").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#site_select_radio_mobaok").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h,
                        this)
                }), f.find("#site_select_radio_bidders").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#speed_yahoo").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#speed_rakten").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#speed_mbok").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#speed_bidders").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#speed_mix").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h,
                        this)
                }), h.find("select[name='ym']").change(function() {
                    var a = $("#" + this.form.id),
                        b = "",
                        c = a.find("select[name='ym']"),
                        d = a.find("input[name='t']"),
                        e = a.find("input[name='ym']");
                    a.find("input:radio[name='s']").each(function() {
                        1 == $(this).attr("checked") && (b = $(this).val())
                    });
                    "" == b && (a.find("input:radio[name='mix']").each(function() {
                        1 == $(this).attr("checked") && (b = $(this).val())
                    }), b = a.find("input:hidden[name='s']").val());
                    if ("mix" == b) AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix", "show"), AUCFAN_SEARCH_PAGE.site_select_disabled(a, !0), AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide"), c.find("option").each(function() {
                        $(this).attr("selected", "l30d" == $(this).val() ? !0 : !1)
                    }), d.val(""), e.val("");
                    else {
                        AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix", "hide");
                        AUCFAN_SEARCH_PAGE.site_select_disabled(a, !1);
                        var g = "";
                        h.find(" input:radio[name='sites']").each(function() {
                            1 == $(this).attr("checked") && (g = $(this).val(), "ya" == g ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h,
                                "hide"))
                        });
                        (a = c.children(":selected").val()) ? (d.val(a), e.val(a)) : (d.val(""), e.val(""))
                    }
                }), h.find("input:radio[name='s']").each(function() {
                    "mix" == $(this).val() ? $(this).click(function(a) {
                        a = $("#" + this.form.id);
                        a.find(".site_select_checkbox input:checkbox").each(function() {
                            $(this).attr("checked", !0);
                            $(this).attr("disabled", !0)
                        });
                        a.find("select[name='ym'] option").each(function() {
                            "l30d" == $(this).val() ? $(this).attr("selected", !0) : $(this).attr("selected", !1)
                        });
                        AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix",
                            "show");
                        AUCFAN_SEARCH_PAGE.site_select_disabled(a, !0);
                        AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide")
                    }) : "" == $(this).val() && $(this).click(function(a) {
                        a = $("#" + this.form.id);
                        a.find(".site_select_checkbox input:checkbox").each(function() {
                            $(this).attr("disabled", !1)
                        });
                        AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix", "hide");
                        AUCFAN_SEARCH_PAGE.site_select_disabled(a, !1);
                        _site_id = $(this).val();
                        "ya" == _site_id ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h,
                            "hide")
                    })
                }), "mix" == k.s ? (AUCFAN_SEARCH_PAGE.warnning_message(h, "select_mix", "show"), AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide"), AUCFAN_SEARCH_PAGE.site_select_disabled(h, !0), h.find("input:radio[name='mix']").each(function() {
                    "mix" == $(this).val() ? ($(this).attr("checked", !0), AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)) : $(this).attr("checked", !1)
                })) : (AUCFAN_SEARCH_PAGE.warnning_message(h, "select_mix", "hide"), AUCFAN_SEARCH_PAGE.site_select_disabled(h, !1), "ya" == k.s ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h,
                    "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide"), h.find("input:radio[name='mix']").each(function() {
                    if ("mix" == $(this).val()) $(this).attr("checked", !1);
                    else {
                        $(this).attr("checked", !0);
                        AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this);
                        var a = "";
                        h.find(" input:radio[name='sites']").each(function() {
                            1 == $(this).attr("checked") && (a = $(this).val(), "ya" == a ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide"))
                        })
                    }
                })))
            }
        },
        form_searchbar_edit: function(a,
            b) {
            for (var c = {
                    sya: "",
                    sra: "",
                    smo: "",
                    sbi: "",
                    seb: "",
                    ssm: "",
                    sam: "",
                    syas: "",
                    srai: "",
                    stb: "",
                    s: "",
                    c: "",
                    q: "",
                    search: "",
                    l: "",
                    u: "",
                    ym: "",
                    t: "",
                    o: "t1",
                    vmode: 2
                }, d = {
                    ss: "15",
                    s: "mix",
                    sya: "1",
                    smo: "1",
                    sra: "1",
                    sbi: "1",
                    smix: "1",
                    mix: "mix",
                    c: "",
                    q: "",
                    search: "",
                    l: "",
                    u: "",
                    ym: "l30d",
                    t: "l30d",
                    o: "t1",
                    vmode: 0,
                    seller: "",
                    itemstatus: "",
                    sellertype: "",
                    location: "",
                    site_select_checkbox_yahoo: "ya",
                    site_select_checkbox_rakuten: "ra",
                    site_select_checkbox_mobaok: "mo",
                    site_select_checkbox_bidders: "bi",
                    sites: "ya"
                }, e = {
                    s: "",
                    syas: "",
                    srai: "",
                    sam: "",
                    c: "",
                    q: "",
                    l: "",
                    u: "",
                    o: "t1",
                    vmode: 2
                }, l = {
                    ya: {
                        yaopt_aucmin_bidorbuy_price: "",
                        yaopt_aucmax_bidorbuy_price: "",
                        yaopt_loc_cd: "0",
                        yaopt_abatch: "0",
                        yaopt_istatus: "0",
                        yaopt_escrow: "",
                        yaopt_new: "",
                        yaopt_afc: "",
                        yaopt_buynow: "",
                        yaopt_ybank: "",
                        yaopt_pstagefree: "",
                        yaopt_thumb: "",
                        yaopt_wrappingicon: "",
                        yaopt_point: "",
                        yaopt_jpypayment: "",
                        yaopt_intl: "",
                        yaopt_offer: "",
                        yaopt_gift_icon: "0"
                    }
                }, g = [], k = 0; k < a.length; k++) "" != a[k]["class"] && $("." + a[k]["class"]).each(function(b) {
                var c = a[k]["class"] + "_id_" + b;
                $(this).attr("id",
                    c);
                g[b] = a[k];
                g[b].id = c;
                g[b]["class"] = ""
            });
            for (k = 0; k < g.length; k++) a.push(g[k]);
            for (k = 0; k < a.length; k++) {
                var f = {},
                    m = {};
                if ("" != a[k].site && l[a[k].site]) {
                    var m = l[a[k].site],
                        p;
                    for (p in m) f[p] = m[p]
                }
                m = "shopping" == a[k].type ? e : "open" == a[k].type ? c : d;
                for (p in m) f[p] = m[p];
                for (p in b) {
                    if ("search" == p || "q" == p) m = "" + b[p], m = m.replace(/&amp;/g, "&"), m = m.replace(/&gt;/g, ">"), m = m.replace(/&lt;/g, "<"), m = m.replace(/&quot;/g, '"'), m = m.replace(/&#39;/g, "'"), m = m.replace(/&apos;/g, "'"), b[p] = m;
                    f[p] = b[p]
                }
                "" == f.vmode && (f.vmode = "0");
                "" != f.s && "mix" != f.s && (f.sites = f.s);
                var h = a[k].site,
                    n = $("#" + a[k].id);
                n.find("input:text , input:hidden").each(function() {
                    $(this).val(f[$(this).attr("name")])
                });
                n.find("input:radio").each(function() {
                    $(this).val() == f[$(this).attr("name")] ? $(this).attr("checked", !0) : $(this).attr("checked", !1)
                });
                n.find("input:checkbox").each(function() {
                    $(this).val() == f[$(this).attr("name")] ? $(this).attr("checked", !0) : $(this).attr("checked", !1)
                });
                n.find("select option").each(function() {
                    $(this).val() == f[$(this).parent().attr("name")] ?
                        $(this).attr("selected", !0) : $(this).attr("selected", !1)
                });
                "open" == a[k].type ? n.submit(function() {
                    var a = "",
                        b = "",
                        c = "",
                        d = "";
                    n.find("input:text[name='search'] , input:text[name='q'] , input:hidden[name='search'] , input:hidden[name='s']").each(function() {
                        "" != $(this).val() && (a += $(this).val())
                    });
                    n.find("input:radio[name='s']").each(function() {
                        1 == $(this).attr("checked") && (b = $(this).val())
                    });
                    n.find("select[name='s'] option").each(function() {
                        1 == $(this).attr("selected") && (b = $(this).val())
                    });
                    n.find("input:hidden[name='s']").val() &&
                        (c = n.find("input:hidden[name='s']").val());
                    n.find("input:hidden[name='ss']").val() && (c = n.find("input:hidden[name='ss']").val());
                    n.find("#site_select_check_box_list input:radio[class='site_select_check_box']").each(function() {
                        1 == $(this).attr("checked") && (d += "," + $(this).attr("name"))
                    });
                    if ("" == a) return alert("\u5fc5\u305a\u30ad\u30fc\u30ef\u30fc\u30c9\u3092\u5165\u529b\u304f\u3060\u3055\u3044 "), !1;
                    if (h) AUCFAN_SEARCH_PAGE.site_detail_option_form_submit(n, h);
                    else if ("" == b && "" == c && "" == d) return alert("\u30b5\u30a4\u30c8\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044 "), !1;
                    return !0
                }) : "shopping" == a[k].type ? n.submit(function() {
                    var a = "",
                        b = "",
                        c = "";
                    n.find("input:text[name='search'] , input:text[name='q'] , input:hidden[name='search'] , input:hidden[name='s']").each(function() {
                        "" != $(this).val() && (a += $(this).val())
                    });
                    n.find("input:hidden[name='s']").val() && (b = n.find("input:hidden[name='s']").val());
                    n.find(".site_check_box_shopping_sites input:checkbox[class='site_select_check_box']").each(function() {
                        1 == $(this).attr("checked") && (c += "," + $(this).attr("name"))
                    });
                    if ("" == a) return alert("\u5fc5\u305a\u30ad\u30fc\u30ef\u30fc\u30c9\u3092\u5165\u529b\u304f\u3060\u3055\u3044 "), !1;
                    if (h) AUCFAN_SEARCH_PAGE.site_detail_option_form_submit(n, h);
                    else if ("" == b && "" == c) return alert("\u30b5\u30a4\u30c8\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044 "), !1;
                    return !0
                }) : "past" == a[k].type && (n.find("#site_select_radio_mix").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n, this)
                }), n.find("#site_select_radio_sites").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n, this)
                }), m = n.find("#disp_site_radio"), m.find("#site_select_radio_yahoo").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n,
                        this)
                }), m.find("#site_select_radio_rakuten").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n, this)
                }), m.find("#site_select_radio_mobaok").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n, this)
                }), m.find("#site_select_radio_bidders").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n, this)
                }), m.find("#speed_yahoo").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n, this)
                }), m.find("#speed_rakten").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n,
                        this)
                }), m.find("#speed_mbok").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n, this)
                }), m.find("#speed_bidders").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n, this)
                }), m.find("#speed_mix").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n, this)
                }), n.find("select[name='ym']").change(function() {
                    var a = $("#" + this.form.id),
                        b = "",
                        c = a.find("select[name='ym']"),
                        d = a.find("input[name='t']"),
                        e = a.find("input[name='ym']");
                    a.find("input:radio[name='s']").each(function() {
                        1 ==
                            $(this).attr("checked") && (b = $(this).val())
                    });
                    "" == b && (a.find("input:radio[name='mix']").each(function() {
                        1 == $(this).attr("checked") && (b = $(this).val())
                    }), b = a.find("input:hidden[name='s']").val());
                    if ("mix" == b) AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix", "show"), AUCFAN_SEARCH_PAGE.site_select_disabled(a, !0), AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "hide"), c.find("option").each(function() {
                        $(this).attr("selected", "l30d" == $(this).val() ? !0 : !1)
                    }), d.val(""), e.val("");
                    else {
                        AUCFAN_SEARCH_PAGE.warnning_message(a,
                            "select_mix", "hide");
                        AUCFAN_SEARCH_PAGE.site_select_disabled(a, !1);
                        var h = "";
                        n.find(" input:radio[name='sites']").each(function() {
                            1 == $(this).attr("checked") && (h = $(this).val(), "ya" == h ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "hide"))
                        });
                        (a = c.children(":selected").val()) ? (d.val(a), e.val(a)) : (d.val(""), e.val(""))
                    }
                }), n.find("input:radio[name='s']").each(function() {
                    "mix" == $(this).val() ? $(this).click(function(a) {
                        a = $("#" + this.form.id);
                        a.find(".site_select_checkbox input:checkbox").each(function() {
                            $(this).attr("checked", !0);
                            $(this).attr("disabled", !0)
                        });
                        a.find("select[name='ym'] option").each(function() {
                            "l30d" == $(this).val() ? $(this).attr("selected", !0) : $(this).attr("selected", !1)
                        });
                        AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix", "show");
                        AUCFAN_SEARCH_PAGE.site_select_disabled(a, !0);
                        AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "hide")
                    }) : "" == $(this).val() && $(this).click(function(a) {
                        a = $("#" + this.form.id);
                        a.find(".site_select_checkbox input:checkbox").each(function() {
                            $(this).attr("disabled", !1)
                        });
                        AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix", "hide");
                        AUCFAN_SEARCH_PAGE.site_select_disabled(a, !1);
                        _site_id = $(this).val();
                        "ya" == _site_id ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "hide")
                    })
                }), "mix" == f.s ? (AUCFAN_SEARCH_PAGE.warnning_message(n, "select_mix", "show"), AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "hide"), AUCFAN_SEARCH_PAGE.site_select_disabled(n, !0), n.find("input:radio[name='mix']").each(function() {
                    "mix" ==
                    $(this).val() ? ($(this).attr("checked", !0), AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n, this)) : $(this).attr("checked", !1)
                })) : (AUCFAN_SEARCH_PAGE.warnning_message(n, "select_mix", "hide"), AUCFAN_SEARCH_PAGE.site_select_disabled(n, !1), "ya" == f.s ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "hide"), n.find("input:radio[name='mix']").each(function() {
                    if ("mix" == $(this).val()) $(this).attr("checked", !1);
                    else {
                        $(this).attr("checked", !0);
                        AUCFAN_SEARCH_PAGE.past_form_sites_chenged(n,
                            this);
                        var a = "";
                        n.find(" input:radio[name='sites']").each(function() {
                            1 == $(this).attr("checked") && (a = $(this).val(), "ya" == a ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(n, "hide"))
                        })
                    }
                })))
            }
        },
        top_category_tab_select: function(a, b) {
            var c = {};
            "radio" == b && $("#" + a.form.id + " input:radio[name='" + $(a).attr("name") + "']").each(function() {
                var a = $(this).val();
                c[a] = a
            });
            for (var d in c) d == $(a).val() ? $("#" + a.form.id + " .top_category_list_" + d).css("display",
                "block") : $("#" + a.form.id + " .top_category_list_" + d).css("display", "none")
        },
        add_bookmark: function(a, b, c, d) {
            if ("guest" == a) return 1 == confirm("マイブックマークのご利用にはオークファン会員登録が必要です。") && (window.location.href = "https://ssl.aucfan.com/member/login?rurl=" + escape(document.URL)), !1;
            var e = {
                    afbkmk_mthd: "add2",
                    ajax: !0
                },
                l = 0;
            d ? d.match(/^bkmk_(\d*)_(\w+)_(\d+)$/) && (l++, a = RegExp.$2,
                $("#bkmk_" + (RegExp.$1 + "_" + a + "_" + RegExp.$3) + " input:hidden").each(function() {
                    e[$(this).attr("name") + "_" + l] = jQuery.trim($(this).attr("value"))
                }), e["site_id_" + l] = a) : b && c && $(".bkmk_check_box").each(function(a) {
                if (1 == $(this).attr("checked") && $(this).attr("name").match(/^bkmk_(\d*)_(\w+)_(\d+)$/)) {
                    a = RegExp.$1;
                    var d = RegExp.$2,
                        f = a + "_" + d + "_" + RegExp.$3;
                    a != b || "mix" != c && c != d || (l++, $("#bkmk_" + f + " input:hidden").each(function() {
                            e[$(this).attr("name") + "_" + l] = jQuery.trim($(this).attr("value"))
                        }), e["site_id_" + l] =
                        d)
                }
            });
            1 > l ? alert("マイブックマークに追加する商品がチェックされていません。") : $.ajax({
                url: "/bookmark/add",
                xhrFields: {
                    withCredentials: true
                },
                type: "POST",
                timeout: 2E4,
                data: e,
                cache: !1,
                dataType: 'json',
                success: function(res) {
                    if (! res.result.status || res.result.status == 'failed') return false;
                    if (res.result.status == 'success') {
                        alert('マイブックマークに追加しました。');
                    }
                    if (res.result.status == 'already') {
                        alert('既にマイブックマークに登録済みです。');
                    }
                    if (res.result.status == 'countOver') {
                        alert('ブックマーク登録数が上限に達しています。マイページからブックマークの編集・削除をお願いします。');
                    }
                },
                error: function(res) {
                    alert('エラーが発生しました。再度やり直すかお問い合わせください。');
                }
            });
            return !1
        },
        add_bookmark_for_search: function(a, b, c, d) {
            if ("guest" == a) return 1 == confirm("マイブックマークのご利用にはオークファン会員登録が必要です。") && (window.location.href = "https://ssl.aucfan.com/member/login?rurl=" + escape(document.URL)), !1;
            var e={afbkmk_mthd:"add2",ajax:!0};
            d.match(/^bkmk_(\d*)_(\w+)_(\d+)$/);
            l=RegExp.$3;
            $("#"+d+" input:hidden").each(
                function(){
                    e[$(this).attr("name")+"_"+l]=jQuery.trim($(this).attr("value"))
                }
            );
            $.ajax({
                url:"/member/bookmark",
                type:"POST",
                timeout:2E4,
                dataType:"html",
                data:e,cache:!1,
                success:function(a){
                    alert(a)
                },error:function(a){
                }
            });
            return!1
        },
        horizontal_scroll: function(a, b, c) {
            c = parseInt(c);
            if (!(0 > c)) {
                var d = 0,
                    e = $("#outer_area_" + a),
                    l = $("#inner_area_" + a),
                    g = 0,
                    k = 0,
                    f = l.find(">li");
                f && (g = f.eq(0).outerWidth(!0) *
                    f.size());
                e = e.width() || 720;
                1 == isNaN(e) && (e = 720);
                0 >= isNaN(e) && (e = 720);
                if (!(e >= g)) {
                    var m = Math.abs(e - g);
                    if (!(0 >= m)) {
                        var p = "left" == b ? -1 : "right" == b ? 1 : 0;
                        if (0 != p) {
                            var h = parseInt(l.css("marginLeft").replace("px", ""));
                            b = Math.abs(h);
                            var n = 0; - 1 == p ? (f = g - b, 0 <= f && f > e && (n = f - e, n > c && (n = c), c = g - e - b - n, 10 >= c && (n += c))) : 1 == p && 0 <= b && (n = 10 > b ? b : b < c ? b : c);
                            if (!(0 > n)) {
                                var q = $("#horizontal_scroll_right_" + a),
                                    t = q.attr("disabled"),
                                    r = $("#horizontal_scroll_left_" + a),
                                    u = r.attr("disabled");
                                q.attr("disabled", !1);
                                r.attr("disabled", !1);
                                d =
                                    setInterval(function() {
                                        var a = n - k,
                                            b;
                                        b = a < n / 10 ? parseInt(.9 * a) : a < n / 5 ? parseInt(.85 * a) : parseInt(.7 * a);
                                        10 > b && (b = a);
                                        k += b;
                                        h += b * p;
                                        l.css("marginLeft", h + "px");
                                        k >= n && (a = t, b = u, a = 0 > h ? !1 : !0, b = Math.abs(h) >= m ? !0 : !1, q.attr("disabled", a), r.attr("disabled", b), clearInterval(d))
                                    }, 1)
                            }
                        }
                    }
                }
            }
        },
        throw_popup_form: function(a) {
            if (a.formVal)
                for (var b = 0; b < a.formVal.length; b++) {
                    var c = a.formVal[b];
                    "hidden" == c.type && $("#form_popup input:hidden[name='" + c.name + "']").val(c.val)
                }
            $("#form_popup input[name=s]").val("ya");
            $("#form_popup input[name=o]").val("t1");
            $("#form_popup input[name=vmode]").val("0");
            $("#form_popup").submit()
        },
        popup_form: function(a) {
            if (a.formVal)
                for (var b = 0; b < a.formVal.length; b++) {
                    var c = a.formVal[b];
                    "hidden" == c.type && $("#form_popup input:hidden[name='" + c.name + "']").val(c.val)
                }
            var d = 0;
            $("html,body,div,iframe,ul,object").each(function(a, b) {
                var c = b.style.zIndex;
                c && "auto" != c && d < c && (d = c)
            });
            var e = function() {
                var a = $(document).width(),
                    b = $(document).height(),
                    c = $(window).width(),
                    e = $(window).height(),
                    a = (a > c ? a : c) + "px",
                    b = (b > e ? b : e) + "px";
                $("#popup_background_area").css("width",
                    a).css("height", b).css("display", "block").css("z-index", d + 100)
            };
            e();
            $(window).resize(e);
            a = $(window).scrollTop() + 100;
            b = $(window).scrollLeft() + 100;
            $("#popup_form_area").css("top", a).css("left", b).css("display", "block").css("z-index", d + 150);
            $("#popup_form_area button[class='popup_form_area_close_button']").click(function() {
                $(window).unbind("resize", e);
                $("#popup_form_area").css("display", "none").css("z-index", 0);
                $("#popup_background_area").css("display", "none").css("z-index", 0)
            });
            return !1
        },
        throw_popup_past2years_search_form: function(a) {
            var b =
                "";
            if (a.formVal)
                for (var c = 0; c < a.formVal.length; c++)
                    if ("hidden" == a.formVal[c].type) {
                        var d = new Date,
                            b = d.getFullYear() - 2,
                            d = d.getMonth() + 1,
                            e = b + 2,
                            l = d - 1;
                        0 == l && (--e, l = 12);
                        b = "" + b + (10 > d ? "0" : "") + d + e + (10 > l ? "0" : "") + l
                    }
            $("#form_popup input[name=s]").val("ya");
            $("#form_popup input[name=o]").val("t1");
            $("#form_popup input[name=vmode]").val("0");
            $("#form_popup input[name=ym]").val(b);
            $("#form_popup").submit()
        },
        throw_popup_past3years_search_form: function(a) {
            var b = "";
            if (a.formVal)
                for (var c = 0; c < a.formVal.length; c++)
                    if ("hidden" ==
                        a.formVal[c].type) {
                        var d = new Date,
                            b = d.getFullYear() - 3,
                            d = d.getMonth() + 1,
                            e = b + 3,
                            l = d - 1;
                        0 == l && (--e, l = 12);
                        b = "" + b + (10 > d ? "0" : "") + d + e + (10 > l ? "0" : "") + l
                    }
            a = a.s || "ya";
            "mix" == a && (a = "ya");
            $("#form_popup input[name=s]").val(a);
            $("#form_popup input[name=o]").val("t1");
            $("#form_popup input[name=vmode]").val("0");
            $("#form_popup input[name=ym]").val(b);
            $("#form_popup").submit()
        },
        throw_past3years_search_form: function(a) {
            document.charset='euc-jp';
            var b = "",
                c = new Date,
                b = c.getFullYear() - 3,
                c = c.getMonth() + 1,
                d = b + 3,
                e = c - 1;
            0 == e && (--d, e = 12);
            b = "" + b + (10 > c ?
                "0" : "") + c + d + (10 > e ? "0" : "") + e;
            $("#" + a + " input[name=o]").val("t1");
            $("#" + a + " input[name=vmode]").val("0");
            $("#" + a + " input[name=ym]").val(b);
            $("#" + a).submit()
        },
        location_pastNmonths_search_form: function(a) {
            var b = "l30d";
            if (1 > a || null == a) a = 3;
            var c = new Date,
                b = new Date(c.getFullYear(), c.getMonth() - Number(1), 1);
            a = new Date(c.getFullYear(), c.getMonth() - Number(a), 1);
            b = b.getFullYear() + "" + ("0" + (b.getMonth() + 1)).slice(-2) + a.getFullYear() + "" + ("0" + (a.getMonth() + 1)).slice(-2);
            a = location.search;
            for (var c = !1, d = location.pathname.split("/"),
                    e = [], l = 0; l < d.length; l++)
                if ("" != d[l] && null != d[l]) {
                    var g = d[l].split("-");
                    "s" == g[0] ? "mix" == g[1] ? e.push("s-ya") : e.push("s-" + g[1]) : "t" == g[0] ? (e.push("t-" + b), c = !0) : e.push(d[l])
                }
            0 == c && e.push("t-" + b);
            location.href = "http://aucfan.com/" + e.join("/") + "/" + a
        },
        popup_past2years_search_form: function(a) {
            if (a.formVal)
                for (var b = 0; b < a.formVal.length; b++) {
                    var c = a.formVal[b];
                    if ("hidden" == c.type) {
                        var d = new Date,
                            e = d.getFullYear() - 2,
                            d = d.getMonth() + 1,
                            l = e + 2,
                            g = d - 1;
                        0 == g && (--l, g = 12);
                        e = "" + e + (10 > d ? "0" : "") + d + l + (10 > g ? "0" : "") + g;
                        $("#form_popup input:hidden[name='" +
                            c.name + "']").val(e)
                    }
                }
            var k = 0;
            $("html,body,div,iframe,ul,object").each(function(a, b) {
                var c = b.style.zIndex;
                c && "auto" != c && k < c && (k = c)
            });
            var f = function() {
                var a = $(document).width(),
                    b = $(document).height(),
                    c = $(window).width(),
                    d = $(window).height(),
                    a = (a > c ? a : c) + "px",
                    b = (b > d ? b : d) + "px";
                $("#popup_background_area").css("width", a).css("height", b).css("display", "block").css("z-index", k + 100)
            };
            f();
            $(window).resize(f);
            a = $(window).scrollTop() + 100;
            b = $(window).scrollLeft() + 100;
            $("#popup_form_area").css("top", a).css("left",
                b).css("display", "block").css("z-index", k + 150);
            $("#popup_form_area button[class='popup_form_area_close_button']").click(function() {
                $(window).unbind("resize", f);
                $("#popup_form_area").css("display", "none").css("z-index", 0);
                $("#popup_background_area").css("display", "none").css("z-index", 0)
            });
            return !1
        },
        list_open_close: function(a) {
            a = $("#" + a);
            "block" == a.css("display") ? a.css("display", "none") : a.css("display", "block")
        },
        site_detail_option_form_submit: function(a, b) {
            var c = [],
                d = new RegExp("^" + b + "opt_(.*)$", "");
            a.find("input:text , input:hidden").each(function() {
                "" != $(this).val() && -1 != $(this).attr("name").search(d) && c.push(escape(RegExp.$1) + "=" + escape($(this).val()))
            });
            a.find("input:radio").each(function() {
                $(this).attr("checked") && -1 != $(this).attr("name").search(d) && c.push(escape(RegExp.$1) + "=" + escape($(this).val()))
            });
            a.find("input:checkbox").each(function() {
                $(this).attr("checked") && -1 != $(this).attr("name").search(d) && c.push(escape(RegExp.$1) + "=" + escape($(this).val()))
            });
            a.find("select option").each(function() {
                $(this).parent("select").val() ==
                    $(this).val() && -1 != $(this).parent().attr("name").search(d) && c.push(escape(RegExp.$1) + "=" + escape($(this).val()))
            });
            a.find("input:hidden[name='" + b + "opt']").val(c.sort().join("&"));
            a.find("input:hidden[name='s']").val(b);
            a.find("input:hidden[name='ss']").val("");
            a.find("input:text[name='ss']").val("");
            return !0
        },
        site_checkbox_checked: function(a, b) {
            var c = $("#" + a + " .site_check_box_" + b + " input:checkbox"),
                d = c.size(),
                e = 0;
            c.each(function() {
                1 == $(this).attr("checked") && e++
            });
            c.attr("checked", d == e ? !1 : !0)
        },
        past_form_sites_chenged: function(a,
            b) {
            if ("mix" == $(b).attr("name"))
                if (a.find("input:hidden[name='s']").val($(b).val()), "mix" == $(b).val()) AUCFAN_SEARCH_PAGE.site_select_disabled(a, !0), AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix", "show"), AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(a, "hide"), $("#" + b.form.id + " select[name='ym'] option").each(function() {
                    "l30d" == $(this).val() ? $(this).attr("selected", !0) : $(this).attr("selected", !1)
                });
                else {
                    AUCFAN_SEARCH_PAGE.site_select_disabled(a, !1);
                    AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix",
                        "hide");
                    var c = "";
                    $("#" + b.form.id + " input:radio[name='sites']").each(function() {
                        1 == $(this).attr("checked") && (c = $(this).val(), "ya" == c ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(a, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(a, "hide"))
                    });
                    a.find("input:hidden[name='s']").val(c)
                } else "ya" == $(b).val() ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(a, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(a, "hide"), a.find("input:hidden[name='s']").val($(b).val())
        },
        set_event_ym_radio: function(a,
            b, c) {
            var d = $("#" + a);
            d.find("input:radio[name='ym']").each(function() {
                var a;
                "" == $(this).val() ? a = c : "l30d" == $(this).val() && (a = b);
                a && $(this).click(function() {
                    for (var b in a) d.find("input:hidden[name='" + b + "'],input:text[name='" + b + "']").each(function() {
                        $(this).attr("name") == b && $(this).val(a[b])
                    })
                })
            })
        },
        set_speed_search_btn_event: function(a, b, c, d, e, l) {
            a = $("#" + a);
            var g = a.find(" ." + d);
            g.css("display", "none");
            a.find(" ." + e).click(function() {
                var a = $(this.form);
                if ("premium" == l) return a.attr("action", "http://aucfan.com/speed_search_past_1"),
                    a = a.find("input[name='s']"), "" == a.val() ? a.val("ya") : "ya" != a.val() && "mo" != a.val() && "ra" != a.val() && "bi" != a.val() && "mix" != a.val() && a.val("ya"), !0;
                "otameshi" == l ? (a = confirm("\u30b9\u30d4\u30fc\u30c9\u691c\u7d22\u3092\u5229\u7528\u3059\u308b\u306b\u306f\u3001\u30d7\u30ec\u30df\u30a2\u30e0\u30b5\u30fc\u30d3\u30b9\u306e\u767b\u9332\u304c\u5fc5\u8981\u3067\u3059\u3002\u30d7\u30ec\u30df\u30a2\u30e0\u30b5\u30fc\u30d3\u30b9\u306e\u5229\u7528\u767b\u9332\u3092\u3057\u307e\u3059\u304b\uff1f\r\n\r\n\u65e2\u306b\u30aa\u30fc\u30af\u30d5\u30a1\u30f3\u30d7\u30ec\u30df\u30a2\u30e0ID\u3092\u304a\u6301\u3061\u306e\u65b9\u306f\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u4e0b\u3055\u3044\u3002"),
                    1 == a && (window.location.href = "https://ssl.aucfan.com/premium_member/regist/regist1")) : "guest" == l && (a = confirm("\u30b9\u30d4\u30fc\u30c9\u691c\u7d22\u3092\u5229\u7528\u3059\u308b\u306b\u306f\u3001\u30d7\u30ec\u30df\u30a2\u30e0\u30b5\u30fc\u30d3\u30b9\u306e\u767b\u9332\u304c\u5fc5\u8981\u3067\u3059\u3002\u30d7\u30ec\u30df\u30a2\u30e0\u30b5\u30fc\u30d3\u30b9\u306e\u5229\u7528\u767b\u9332\u3092\u3057\u307e\u3059\u304b\uff1f\r\n\r\n\u65e2\u306b\u30aa\u30fc\u30af\u30d5\u30a1\u30f3\u30d7\u30ec\u30df\u30a2\u30e0ID\u3092\u304a\u6301\u3061\u306e\u65b9\u306f\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u4e0b\u3055\u3044\u3002"),
                    1 == a && (window.location.href = "https://ssl.aucfan.com/premium_member/regist?LP=speed_search"));
                return !1
            });
            a.find("input:radio[name='ym']").each(function() {
                "l30d" == $(this).val() ? ($(this).click(function() {
                    g.css("display", "inline")
                }), 1 == $(this).attr("checked") && g.css("display", "inline")) : ($(this).click(function() {
                    g.css("display", "none")
                }), 1 == $(this).attr("checked") && g.css("display", "none"))
            })
        },
        set_ajax_search_result_success: function(a, b, c) {
            var d = 2;
            c && (d = c.vmode);
            d || (d = 2);
            var e, l, g, k, f, m = !1;
            if (1 <= a.indexOf("rakuten") &&
                (1 <= b.indexOf("amazon") || 1 <= b.indexOf("taobao"))) return !0;
            2 == d ? b.match(/id="inner_area_((\w+)_(\d*))"/) && (e = RegExp.$1, l = RegExp.$2, g = parseInt(RegExp.$3), m = !0) : b.match(/id="bkmk_bkmk_form_num_((\w+)_(\d*))"/) && (e = RegExp.$1, l = RegExp.$2, g = parseInt(RegExp.$3), m = !0);
            k = RegExp(e, "g");
            f = RegExp("bkmk_bkmk_form_num_" + l + "_", "g");
            ".ajax_amazon_search_result_area_s2" == a ? 1 == m && $(".ajax_amazon_search_result_area_s2").html(AUCFAN_SEARCH_PAGE.replace_affi(b, "aucfanrecommend-s2-22")) : $(a).each(function(c) {
                var d = b;
                if (1 ==
                    m) {
                    c = g + c + 1;
                    var e = "bkmk_" + c + "_" + l + "_",
                        d = d.replace(k, l + "_" + c, "g").replace(f, e, "g").replace(/bkmk_form_num/g, c);
                    ".ajax_amazon_search_result_area" == a && (d = AUCFAN_SEARCH_PAGE.ajax_amazon_search_result_area(d));
                    "" != d && $(this).html(d)
                }
            });
            if (".amazon_recommend_box_from_search_engine_3" == a) c = b, $(".amazon_recommend_box_from_search_engine_3").html(AUCFAN_SEARCH_PAGE.head_bar(c, "aucfanseach_hd-22"));
            else if (".ajax_yahoo_search_result_area" == a) c = b.split("pid=877495583").join("#####pid_area#####"), c = c.split("pid=881788464").join("#####pid_area#####"),
                $(".aucview_yahoo_recommend_box_from_search_engine.ajax_yahoo_search_result_area").html(c.split("#####pid_area#####").join("pid=881788464")), $(".ajax_yahoo_search_result_area:not(.aucview_yahoo_recommend_box_from_search_engine)").html(c.split("#####pid_area#####").join("pid=883536473"));
            else if (".rakuten_recommend_box_from_search_engine_2_renewal" == a) {
                c = b;
                if (-1 == c.indexOf("?pc=")) return !0;
                c = c.replace(/\?pc=/g, "_RTaucf10000002?pc=");
                $(".rakuten_recommend_box_from_search_engine_2_renewal").html(c)
            } else if (".rakuten_recommend_box_from_search_engine_3_renewal" ==
                a) c = AUCFAN_SEARCH_PAGE.ajax_aucview_rakuten(b), "" != c && (c = c.replace(/\?pc=/g, "_RTaucf10000004?pc="), $(".rakuten_recommend_box_from_search_engine_3_renewal").html(c));
            else if (".rakuten_recommend_box_from_search_engine_4_renewal" == a) {
                c = b.split("width: 7000px").join("width: 670px");
                if (-1 == c.indexOf("?pc=")) return !0;
                c = c.split('"width","7000px"').join('"width","670px"');
                "" != c && (c = c.replace(/\?pc=/g, "_RTaucf10000005?pc="), $(".rakuten_recommend_box_from_search_engine_4_renewal").html(c))
            } else /<li>/.test(b) &&
                (0 > a.search("taobao") && $(".side_outer_area").html(AUCFAN_SEARCH_PAGE.side_bar(b)), $(".amazon_recommend_box_from_search_engine").html(AUCFAN_SEARCH_PAGE.head_bar(b)), c = AUCFAN_SEARCH_PAGE.head_bar(b, "aucfanseach_hd-22"), "" != c && $(".amazon_recommend_box_from_search_engine_2").html(c)), /<li class=\"inner_item\">/.test(b) && 0 > a.search("taobao") && (c = AUCFAN_SEARCH_PAGE.head_bar_renewal(b, "aucfanseach_hd-22"), "" != c && $(".amazon_recommend_box_from_search_engine_2_renewal").html(c), c = AUCFAN_SEARCH_PAGE.ajax_amazon_search_result_area(b,
                    "aucfanside_rc-22", 1), "" != c && ($("#amazon_recommend_side_bar_items").html(c), $(".amazon_recommend_side_bar_bg").css("display", "none"))), ".aucview_ajax_amazon_search_result_area" == a && (c = b, d = AUCFAN_SEARCH_PAGE.ajax_aucview(c), "" != d && $(".aucview_ajax_amazon_search_result_area").html(d), c = AUCFAN_SEARCH_PAGE.ajax_aucview(c, "aucfanaucview_hd-22"), "" != c && ($(".aucview_amazon_recommend_box_from_search_engine").html(c), $(".aucview_top_ajax_amazon_search_result_area").html(c))), ".aucview_ajax_amazon_search_result_area_under_the_img" ==
                a ? (c = AUCFAN_SEARCH_PAGE.ajax_aucview(b, "aucfanaucview_underphoto-22"), "" != c && $(".aucview_ajax_amazon_search_result_area_under_the_img").html(c)) : ".aucview_ajax_rakuten_search_result_area" == a ? (d = AUCFAN_SEARCH_PAGE.ajax_aucview_rakuten(b), "" != d && $(".aucview_ajax_rakuten_search_result_area").html(d)) : ".aucview_ajax_yahoo_search_result_area" == a && $(".aucview_yahoo_recommend_box_from_search_engine").html(b.split("pid=877495583").join("pid=882108509"))
        },
        replace_affi: function(a, b) {
            return a.replace(/aucfanrecommend-22/ig,
                b)
        },
        side_bar: function(a) {
            a = a.replace(/[\n|\r]/g, "");
            a = a.match(/<li>(.*?)<\/li>/g);
            var b = a.length;
            5 < b && (b = 5);
            for (var c = '<h3><img src="/img/amazon_recommend_side_bar_ttl.gif"></h3><ul class="side_inner_area">', d = 0; d < b; d++) {
                var c = c + '<li class="side_inner_area_li"><span class="side_results-image catalog-image">',
                    e = a[d];
                e.match(/<a href\s*=\s*\"([^\"]*)/);
                var l = RegExp.$1.replace(/aucfanrecommend-22/ig, "aucfanside_rc-22");
                e.match(/<img src\s*=\s*\"([^\"]*)/g);
                var g = RegExp.$1,
                    g = g.split("http://x1.aucfan.com").join("");
                e.match(/<a [^<]*item_title[^>]*>(.*?)<\/a>/);
                var k = RegExp.$1,
                    f = "";
                null != e.match(/<span [^<]*icon_new[^>]*>(.*?)<\/span>/) && (f = RegExp.$1);
                var m = "";
                null != e.match(/<span [^<]*icon_used[^>]*>(.*?)<\/span>/) && (m = RegExp.$1);
                var f = f.replace(/aucfanrecommend-22/ig, "aucfanside_rc-22"),
                    c = c + ('<a href="' + l + '" target="_blank" rel="nofollow">'),
                    e = new Image,
                    p = 'height="90%"';
                e.width > e.height && (p = 'width="90%"');
                c += '<img src="' + g + '" ' + p + " /></a>";
                c += "</span>";
                c += '<ul class="side_result_price_area">';
                c += '<li class="results-price cat-price">';
                f && (c += '<span class="icon_new">' + f + "</span>");
                m && (c += '<br /><span class="price2 icon_used">' + m + "</span>");
                c += "</li></ul>";
                c += '<p><a class="item_title" href="' + l + '" target="_blank" rel="nofollow">' + k + "</a></p></li>"
            }
            return c + "</ul>\x3c!-- AMAZON RECOMMEND SIDE BAR END--\x3e"
        },
        side_bar_renewal: function(a) {
            a = a.replace(/[\n|\r]/g, "");
            a = a.match(/<li class=\"inner_item\">(.*?<\/li>.*?<\/li>.*?)<\/li>/g);
            var b = null != a ? a.length : 0,
                c = b;
            if (5 < b) c = 5;
            else if (1 > b) return "";
            for (var b = '<ul class="inner_area">', d = 0; d <
                c; d++) {
                var e = a[d];
                e.match(/<a href\s*=\s*\"([^\"]*)/);
                var l = RegExp.$1,
                    g = l.replace(/aucfanrecommend-22/ig, "aucfanside_rc-22"),
                    b = b + e.split(l).join(g)
            }
            return b + "</ul>"
        },
        head_bar: function(a, b) {
            a = a.replace(/[\n|\r]/g, "");
            if (null != a.match(/^<!DOCTYPE.*?/g)) return "";
            var c = a.match(/<li>(.*?)<\/li>/g),
                d = null != c ? c.length : 0,
                e = d;
            if (4 < e) e = 4;
            else if (1 > d) return "";
            d = '\x3c!-- AMAZON RECOMMEND HEAD START--\x3e<ul class="inner_area">';
            b || (b = "aucfanaucview_hd-22");
            for (var l = 0; l < e; l++) {
                var d = d + '<li class="inner_area_li"><span class="results-image catalog-image">',
                    g = c[l];
                g.match(/<a href\s*=\s*\"([^\"]*)/);
                var k = RegExp.$1.replace(/aucfan(aucview_rc|recommend)-22/ig, b);
                g.match(/<img src\s*=\s*\"([^\"]*)/g);
                var f = RegExp.$1,
                    f = f.split("http://x1.aucfan.com").join("");
                g.match(/<a [^<]*item_title[^>]*>(.*?)<\/a>/);
                var m = RegExp.$1,
                    p = "";
                null != g.match(/<span [^<]*icon_new[^>]*>(.*?)<\/span>/) && (p = RegExp.$1);
                var h = "";
                null != g.match(/<span [^<]*icon_used[^>]*>(.*?)<\/span>/) && (h = RegExp.$1);
                var p = p.replace(/aucfan(aucview_rc|recommend)-22/ig, b),
                    d = d + ('<a href="' + k + '" target="_blank" rel="nofollow">'),
                    g = new Image,
                    n = 'height="90%"';
                g.width > g.height && (n = 'width="90%"');
                d += '<img src="' + f + '" ' + n + " /></a>";
                d += "</span>";
                d += '<p><a class="item_title" href="' + k + '" target="_blank" rel="nofollow">' + m + "</a></p>";
                d = p ? d + ("<span>" + p + "</span>") : d + ("<span>" + h + "</span>");
                d += '<span class="sitename_amazon_jp"></span></li>'
            }
            return d + "</ul>\x3c!-- AMAZON RECOMMEND HEAD END--\x3e"
        },
        head_bar_renewal: function(a, b) {
            a = a.replace(/[\n|\r]/g, "");
            var c = a.match(/<li class=\"inner_item\">(.*?<\/li>.*?<\/li>.*?)<\/li>/g),
                d = null !=
                c ? c.length : 0,
                e = d;
            if (4 < d) e = 4;
            else if (1 > d) return "";
            for (var d = '<ul class="inner_area">', l = 0; l < e; l++) {
                var g = c[l];
                g.match(/<a href\s*=\s*\"([^\"]*)/);
                var k = RegExp.$1,
                    f = k.replace(/aucfan(aucview_rc|recommend)-22/ig, b),
                    d = d + g.split(k).join(f)
            }
            return d + "</ul>"
        },
        ajax_amazon_search_result_area: function(a, b, c) {
            a = a.replace(/[\n|\r]/g, "");
            var d = a.match(/<li class="inner_item">(.*?)<\/li>/g),
                e = null != d ? d.length : 0;
            if (0 == e) return "";
            null != c && (e = 5);
            a.match(/(<ul [^<]*>)(.*?)<\/ul>/);
            for (var l = null != c ? '<ul class="inner_area">' :
                    RegExp.$1, g = 0; g < e; g++) {
                var k = d[g];
                k.match(/<a href\s*=\s*\"([^\"]*)/);
                var f = RegExp.$1,
                    m = null != b ? f.replace(/aucfanrecommend-22/ig, b) : f,
                    m = null != b ? m.replace(/aucfanaucview_rc-22/ig, b) : m,
                    k = k.split(f).join(m);
                k.match(/<img src\s*=\s*\"([^\"]*)/g);
                var f = RegExp.$1.split("http://x1.aucfan.com").join(""),
                    k = k.split(RegExp.$1).join(f),
                    p = m = f = "",
                    h = k.match(/<span [^<]*icon_new[^>]*>(.*?)<\/span>/);
                null != h && (f = RegExp.$1, m = h[0], k = k.split(m).join(m.replace(/icon_new/i, "sitename_amazon_jp" + (null != c ? " display_price_only" :
                    ""))));
                h = k.match(/(<span [^<]*icon_used[^>]*>)(.*?)(<\/span>)/);
                null != h && (p = h[0], "" == f && (k = k.split(p).join(p.replace(/icon_used/i, "sitename_amazon_jp" + (null != c ? " display_price_only" : "")))));
                k = k.split(m).join("").split(p).join("");
                l += k;
                l += "</ul></li>"
            }
            l += "</ul>";
            null == c && (a.match(/(<div [^<]*>.*?)$/), l += RegExp.$1);
            return l
        },
        ajax_aucview: function(a, b) {
            a = a.replace(/[\n|\r]/g, "");
            var c = a.match(/<li>(.*?)<\/li>/g),
                d = null != c ? c.length : 0,
                e = '<ul id="inner_area_am" class="inner_area" tabindex="-1">';
            if (0 ==
                d) return "";
            for (var l = 0; l < d; l++) {
                var e = e + '<li><span class="results-image catalog-image">',
                    g = c[l];
                g.match(/<a href\s*=\s*\"([^\"]*)/);
                var k = b ? RegExp.$1.replace(/aucfanrecommend-22/ig, b) : RegExp.$1,
                    k = b ? k.replace(/aucfanaucview_rc-22/ig, b) : k;
                g.match(/<img src\s*=\s*\"([^\"]*)/g);
                var f = RegExp.$1,
                    f = f.split("http://x1.aucfan.com").join("");
                g.match(/<a [^<]*item_title[^>]*>(.*?)<\/a>/);
                var m = RegExp.$1,
                    p = "";
                null != g.match(/<span [^<]*icon_new[^>]*>(.*?)<\/span>/) && (p = RegExp.$1);
                g.match(/<span [^<]*icon_used[^>]*>(.*?)<\/span>/);
                e += '<a href="' + k + '" target="_blank" rel="nofollow">';
                e += '<img src="' + f + '" style="max-height:100px;max-width:118px;min-height:50px;min-width:50px;" /></a>';
                e += "</span>";
                e += "<dl>";
                e += '<dt style="padding-top: 26px;"><a class="item_title" href="' + k + '" target="_blank" rel="nofollow">' + m + "</a></dt>";
                p && (e += '<dd class="results-price cat-price"><span class="sitename_amazon_jp">' + p + "</span></dd>");
                e += "</dl></li>"
            }
            return e + "</ul>"
        },
        ajax_aucview_top: function(a, b) {
            a = a.replace(/[\n|\r]/g, "");
            var c = a.match(/<li>(.*?)<\/li>/g),
                d = null != c ? c.length : 0;
            4 < d && (d = 4);
            for (var e = '<ul id="top_inner_area_am" class="top_inner_area" tabindex="-1">', l = 0; l < d; l++) {
                var g = c[l];
                g.match(/<a href\s*=\s*\"([^\"]*)/);
                var k = b ? RegExp.$1.replace(/aucfanrecommend-22/ig, b) : RegExp.$1,
                    k = b ? k.replace(/aucfanaucview_rc-22/ig, b) : k;
                g.match(/<img src\s*=\s*\"([^\"]*)/g);
                var f = RegExp.$1,
                    f = f.split("http://x1.aucfan.com").join("");
                g.match(/<a [^<]*item_title[^>]*>(.*?)<\/a>/);
                var m = RegExp.$1,
                    p = "";
                null != g.match(/<span [^<]*icon_new[^>]*>(.*?)<\/span>/) && (p = RegExp.$1);
                g.match(/<span [^<]*icon_used[^>]*>(.*?)<\/span>/);
                e += "<li>";
                e += '<span class="top_results-image top_catalog-image">';
                e += '<a href="' + k + '" target="_blank" rel="nofollow">';
                e += '<img src="' + f + '" style="max-height:45px;max-width:45px;min-height:40px;min-width:40px;" />';
                e += "</a>";
                e += "</span>";
                e += "<dl>";
                e += '<dt style="padding-top: 26px;"><a class="item_title" href="' + k + '" target="_blank" rel="nofollow">' + m + "</a></dt>";
                p && (e += '<dd class="top_results-price top_cat-price">' + p + "</dd>");
                e += "</dl>";
                e += "</li>"
            }
            return e +
                "</ul>"
        },
        ajax_aucview_rakuten: function(a) {
            a = a.replace(/[\n|\r]/g, "");
            a = a.match(/<li>(.*?)<\/li>/g);
            var b = null != a ? a.length : 0,
                c = '<ul id="inner_area_rai" class="inner_area" tabindex="-1">';
            if (0 == b) return "";
            for (var d = 0; d < b; d++) {
                var e = a[d];
                e.match(/<a href\s*=\s*\"([^\"]*)/);
                var l = RegExp.$1;
                e.match(/<img src\s*=\s*\"([^\"]*)/g);
                var g = RegExp.$1,
                    g = g.split("http://x1.aucfan.com").join("");
                e.match(/<a\sclass="item_price"[^>]+>[\t|\s]+(.+)\u5186/g);
                var k = RegExp.$1 + "\u5186";
                e.match(/<a\sclass="item_title"[^>]+>([^<]+)<\/a>/g);
                e = RegExp.$1;
                c += "<li>";
                c += '<span class="results-image catalog-image"> ';
                c += '<a target="_blank" href="' + l + '"> ';
                c += '<img id="img_ra_1" src="' + g + '"> ';
                c += "</a> ";
                c += "</span> ";
                c += "<dl> ";
                c += "<dt> ";
                c += '<a target="_blank" href="' + l + '" class="item_title">' + e + "</a></dt> ";
                c += '<dd class="results-price sitename_rakuten_ichiba">';
                c += '<a target="_blank" href="' + l + '">' + k + "</a>";
                c += "</dd>";
                c += "</dl> ";
                c += "</li>"
            }
            return c + "</ul>"
        },
        amazon_top_seller: function(a, b, c) {
            $.ajax({
                url: b,
                type: "GET",
                timeout: 1E4,
                dataType: "html",
                cache: !1,
                beforeSend: function(b) {
                    $(a).find(".ajax_loading_image").css("display", "block");
                    $(a).find(".error-nomatch").css("display", "none")
                },
                error: function(b) {
                    $(a).find(".ajax_loading_image").css("display", "none");
                    $(a).find(".error-nomatch").css("display", "block")
                },
                success: function(b) {
                    $(a).find(".ajax_loading_image").css("display", "none");
                    $(a).find(".error-nomatch").css("display", "block");
                    AUCFAN_SEARCH_PAGE.set_ajax_search_result_success(a, b, c)
                }
            })
        },
        set_ajax_search_result: function(a, b, c) {
            $.ajax({
                url: b,
                type: "GET",
                timeout: 2E4,
                dataType: "html",
                cache: !1,
                beforeSend: function(b) {
                    $(a).find(".ajax_loading_image").css("display", "block");
                    $(a).find(".error-nomatch").css("display", "none")
                },
                error: function(b) {
                    $(a).find(".ajax_loading_image").css("display", "none");
                    $(a).find(".error-nomatch").css("display", "block")
                },
                success: function(b) {
                    $(a).find(".ajax_loading_image").css("display", "none");
                    $(a).find(".error-nomatch").css("display", "block");
                    AUCFAN_SEARCH_PAGE.set_ajax_search_result_success(a, b, c)
                }
            })
        },
        set_ajax_search_result_sidebar: function(a,
            b, c) {
            $.ajax({
                url: b,
                type: "GET",
                timeout: 2E4,
                dataType: "html",
                cache: !1,
                beforeSend: function(b) {
                    $(a).find(".ajax_loading_image").css("display", "block");
                    $(a).find(".error-nomatch").css("display", "none")
                },
                error: function(b) {
                    $(a).find(".ajax_loading_image").css("display", "none");
                    $(a).find(".error-nomatch").css("display", "block")
                },
                success: function(b) {
                    $(a).find(".ajax_loading_image").css("display", "none");
                    $(a).find(".error-nomatch").css("display", "none");
                    if (1 <= a.indexOf("rakuten") && (1 <= b.indexOf("amazon") || 1 <=
                            b.indexOf("taobao"))) return !0;
                    "aucview" == c && (b = b.replace(/\?pc=/g, "_RTaucf10000010?pc="));
                    $(a).html(b)
                }
            })
        },
        ajax_past_average_price: function(a, b) {
            $.ajax({
                url: b,
                type: "GET",
                timeout: 5E3,
                dataType: "json",
                cache: !1,
                success: function(a) {
                    for (var b in a) $("#past_average_price_ajax_" + b).html(a[b])
                }
            })
        },
        back_form_edit: function(a, b) {
            for (var c = {
                    sya: "1",
                    sra: "1",
                    smo: "1",
                    sbi: "",
                    seb: "",
                    ssm: "1",
                    sam: "1",
                    syas: "1",
                    srai: "1",
                    s: "",
                    c: "",
                    q: "",
                    search: "",
                    l: "",
                    u: "",
                    ym: "",
                    t: "",
                    o: "t1",
                    vmode: 2
                }, d = {
                    ss: "15",
                    s: "mix",
                    sya: "1",
                    smo: "1",
                    sra: "1",
                    sbi: "1",
                    smix: "1",
                    mix: "mix",
                    c: "",
                    q: "",
                    search: "",
                    l: "",
                    u: "",
                    ym: "l30d",
                    t: "l30d",
                    o: "t1",
                    vmode: 0,
                    site_select_checkbox_yahoo: "ya",
                    site_select_checkbox_rakuten: "ra",
                    site_select_checkbox_mobaok: "mo",
                    site_select_checkbox_bidders: "bi",
                    sites: "ya"
                }, e = {
                    ya: {
                        yaopt_aucmin_bidorbuy_price: "",
                        yaopt_aucmax_bidorbuy_price: "",
                        yaopt_loc_cd: "0",
                        yaopt_abatch: "0",
                        yaopt_istatus: "0",
                        yaopt_escrow: "",
                        yaopt_new: "",
                        yaopt_afc: "",
                        yaopt_buynow: "",
                        yaopt_ybank: "",
                        yaopt_pstagefree: "",
                        yaopt_thumb: "",
                        yaopt_wrappingicon: "",
                        yaopt_point: "",
                        yaopt_jpypayment: "",
                        yaopt_intl: "",
                        yaopt_offer: "",
                        yaopt_gift_icon: "0"
                    }
                }, l = [], g = 0; g < a.length; g++) "" != a[g]["class"] && $("." + a[g]["class"]).each(function(b) {
                var c = a[g]["class"] + "_id_" + b;
                $(this).attr("id", c);
                l[b] = a[g];
                l[b].id = c;
                l[b]["class"] = ""
            });
            for (g = 0; g < l.length; g++) a.push(l[g]);
            for (g = 0; g < a.length; g++) {
                var k = {},
                    f = {};
                if ("" != a[g].site && e[a[g].site]) {
                    var f = e[a[g].site],
                        m;
                    for (m in f) k[m] = f[m]
                }
                f = "open" == a[g].type ? c : d;
                for (m in f) k[m] = f[m];
                for (m in b) {
                    if ("search" == m || "q" == m) f = "" + b[m], f = f.replace(/&amp;/g, "&"),
                        f = f.replace(/&gt;/g, ">"), f = f.replace(/&lt;/g, "<"), f = f.replace(/&quot;/g, '"'), f = f.replace(/&#39;/g, "'"), f = f.replace(/&apos;/g, "'"), b[m] = f;
                    k[m] = b[m]
                }
                "" == k.vmode && (k.vmode = "0");
                "" != k.s && "mix" != k.s && (k.sites = k.s);
                $("#" + a[g].id).find("input:hidden").each(function() {
                    $(this).val(k[$(this).attr("name")])
                })
            }
        },
        form_save: function(a, b, c) {
            if ("premium" == c || "otameshi" == c) {
                c = a.action;
                var d = a.target;
                a.action = b;
                a.target = "_blank";
                a.submit();
                a.action = c;
                a.target = d
            } else 1 == confirm("\u691c\u7d22\u6761\u4ef6\u3092\u4fdd\u5b58\u3059\u308b\u306b\u306f\u3001\u30d7\u30ec\u30df\u30a2\u30e0\u30b5\u30fc\u30d3\u30b9\u306e\u767b\u9332\u304c\u5fc5\u8981\u3067\u3059\u3002\u30d7\u30ec\u30df\u30a2\u30e0\u30b5\u30fc\u30d3\u30b9\u306e\u5229\u7528\u767b\u9332\u3092\u3057\u307e\u3059\u304b\uff1f\r\n\r\n\u65e2\u306b\u30aa\u30fc\u30af\u30d5\u30a1\u30f3\u30d7\u30ec\u30df\u30a2\u30e0ID\u3092\u304a\u6301\u3061\u306e\u65b9\u306f\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u4e0b\u3055\u3044\u3002") &&
                (window.location.href = "http://aucfan.com/ad_cs?id=2324")
        },
        query_save: function(a, b) {
            if ("premium" == b || "otameshi" == b) document.getElementById(a).submit();
            else return 1 == confirm("\u691c\u7d22\u6761\u4ef6\u3092\u4fdd\u5b58\u3059\u308b\u306b\u306f\u3001\u30d7\u30ec\u30df\u30a2\u30e0\u30b5\u30fc\u30d3\u30b9\u306e\u767b\u9332\u304c\u5fc5\u8981\u3067\u3059\u3002\u30d7\u30ec\u30df\u30a2\u30e0\u30b5\u30fc\u30d3\u30b9\u306e\u5229\u7528\u767b\u9332\u3092\u3057\u307e\u3059\u304b\uff1f\r\n\r\n\u65e2\u306b\u30aa\u30fc\u30af\u30d5\u30a1\u30f3\u30d7\u30ec\u30df\u30a2\u30e0ID\u3092\u304a\u6301\u3061\u306e\u65b9\u306f\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u4e0b\u3055\u3044\u3002") &&
                (window.location.href = "http://aucfan.com/ad_cs?id=2324"), !1
        },
        query_save_list: function(a) {
            "premium" == a || "otameshi" == a ? window.open("http://plus.aucfan.com/qsave/") : 1 == confirm("\u691c\u7d22\u6761\u4ef6\u306e\u4fdd\u5b58\u6a5f\u80fd\u3092\u5229\u7528\u3059\u308b\u306b\u306f\u3001\u30d7\u30ec\u30df\u30a2\u30e0\u30b5\u30fc\u30d3\u30b9\u306e\u767b\u9332\u304c\u5fc5\u8981\u3067\u3059\u3002\u30d7\u30ec\u30df\u30a2\u30e0\u30b5\u30fc\u30d3\u30b9\u306e\u5229\u7528\u767b\u9332\u3092\u3057\u307e\u3059\u304b\uff1f\r\n\r\n\u65e2\u306b\u30aa\u30fc\u30af\u30d5\u30a1\u30f3\u30d7\u30ec\u30df\u30a2\u30e0ID\u3092\u304a\u6301\u3061\u306e\u65b9\u306f\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u4e0b\u3055\u3044\u3002") &&
                (window.location.href = "http://aucfan.com/ad_cs?id=2324");
            return !1
        },
        search_result_fix_error: function(a, b, c, d, e, l) {
            "am" == a && b && d && e ? ($(function() {
                    $("#" + e).html('<div class="amazon_recommend_box"><a class="anchor_area" href="http://www.amazon.co.jp/exec/obidos/external-search?tag=auctiontoukei-22&keyword=' + b + '&mode=blended" target="_blank" rel="nofollow">&gt;&gt; <strong>\u300c' + d + "\u300d</strong>\u3092\u30a2\u30de\u30be\u30f3\u3067\u63a2\u3059</a></div>")
                }), $(".side_outer_area").html('<table class="amazon_recommend_side_bar_bg"><tr><td valign="middle"><p><a class="anchor_area" href="http://www.amazon.co.jp/exec/obidos/external-search?tag=aucfanside_rc-22&keyword=' +
                    b + '&mode=blended" target="_blank" rel="nofollow">\u300c' + d + "\u300d<br />\u306e\u4eba\u6c17\u5546\u54c1\u3092\u63a2\u3059</a></p></td></tr></table>")) : "ra" == a && b && d && e ? $(function() {
                    $("#" + e).html('<div class="rakuten_recommend_box"><a class="anchor_area" href="http://pt.afl.rakuten.co.jp/c/0391a6aa.b4be3f1a/?url=' + escape("http://esearch.rakuten.co.jp/rms/sd/esearch/vc?f=A&g=0&sf=0&sitem=" + c + "&sv=13&v=2") + '" target="_blank" rel="nofollow">&gt;&gt; <strong>\u300c' + d + "\u300d</strong>\u3092\u697d\u5929\u30aa\u30fc\u30af\u30b7\u30e7\u30f3\u3067\u63a2\u3059</a></div>")
                }) :
                "rai" == a && b && d && e ? $(function() {
                    $("#" + e).html('<div class="rakuten_ichiba_recommend_box"><a class="anchor_area" href="http://pt.afl.rakuten.co.jp/c/0391a6aa.b4be3f1a/?url=' + encodeURI("http://search.rakuten.co.jp/search/mall/" + b + "/") + '" target="_blank" rel="nofollow">&gt;&gt; <strong>\u300c' + d + "\u300d</strong>\u3092\u697d\u5929\u5e02\u5834\u3067\u63a2\u3059</a></div>")
                }) : "yas" == a && b && d && e ? $(function() {
                    $("#" + e).html('<div class="yahoo_shopping_recommend_box"><a class="anchor_area" href="http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=2015148&pid=873491722&vc_url=' +
                        encodeURI("http://shopping.yahoo.co.jp/search?p=" + b + "&cspid=&first=1") + '" target="_blank" rel="nofollow">&gt;&gt; <strong>\u300c' + d + "\u300d</strong>\u3092Yahoo!\u30b7\u30e7\u30c3\u30d4\u30f3\u30b0\u3067\u63a2\u3059</a></div>")
                }) : "ya" == a && b && d && e ? $(function() {
                    $("#" + e).html('<div class="yahoo_recommend_box"><a class="anchor_area" href="http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=2015148&pid=877495583&vc_url=http://auctions.search.yahoo.co.jp/search?p=' + encodeURI(b) + '&auccat=2084008650" target="_blank" rel="nofollow">&gt;&gt; <strong>\u300c' +
                        d + "\u300d</strong>\u3092Yahoo!\u30aa\u30fc\u30af\u30b7\u30e7\u30f3\u3067\u63a2\u3059</a></div>")
                }) : "mo" == a && b && d && e ? $(function() {
                    $("#" + e).html('<div class="mbok_recommend_box"><a class="anchor_area" href="http://h.accesstrade.net/sp/cc?rk=0100c06u002g72&url=http%3A%2F%2Fwww.mbok.jp%2F_l%3Fq%3D' + encodeURI(l) + '" target="_blank" rel="nofollow">&gt;&gt; <strong>\u300c' + d + "\u300d</strong>\u3092\u30e2\u30d0\u30aa\u30af\u3067\u63a2\u3059</a></div>")
                }) : "sm" == a && b && d && e ? $(function() {
                    $("#" + e).html('<div class="sekaimon_recommend_box"><a class="anchor_area" href="http://www.sekaimon.com/ItemListReg.do?srch_keyword=' +
                        encodeURI(b) + '&srch_category_id=0&page_type=aucfan" target="_blank" rel="nofollow">&gt;&gt; <strong>\u300c' + d + "\u300d</strong>\u3092\u30bb\u30ab\u30a4\u30e2\u30f3\u3067\u63a2\u3059</a></div>")
                }) : "mix" == a && b && d && e && $(function() {
                    $("#" + e).html('<div class="amazon_recommend_box"><a class="anchor_area" href="http://www.amazon.co.jp/exec/obidos/external-search?tag=auctiontoukei-22&keyword=' + b + '&mode=blended" target="_blank" rel="nofollow">&gt;&gt; <strong>\u300c' + d + "\u300d</strong>\u3092\u30a2\u30de\u30be\u30f3\u3067\u63a2\u3059</a></div>");
                    $("#" + e).append('<div class="rakuten_ichiba_recommend_box"><a class="anchor_area" href="http://pt.afl.rakuten.co.jp/c/0391a6aa.b4be3f1a/?url=' + encodeURI("http://search.rakuten.co.jp/search/mall/" + b + "/") + '" target="_blank" rel="nofollow">&gt;&gt; <strong>\u300c' + d + "\u300d</strong>\u3092\u697d\u5929\u5e02\u5834\u3067\u63a2\u3059</a></div>");
                    $("#" + e).append('<div class="yahoo_shopping_recommend_box"><a class="anchor_area" href="http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=2015148&pid=873491722&vc_url=' +
                        encodeURI("http://shopping.yahoo.co.jp/search?p=" + b + "&cspid=&first=1") + '" target="_blank" rel="nofollow">&gt;&gt; <strong>\u300c' + d + "\u300d</strong>\u3092Yahoo!\u30b7\u30e7\u30c3\u30d4\u30f3\u30b0\u3067\u63a2\u3059</a></div>")
                })
        },
        aucview_post_link: function(a) {
            if (a) {
                var b = $("#aucview_post_link_form");
                b.attr("action", a);
                b.submit()
            }
            return !1
        },
        form_edit_box: function(a, b) {
            for (var c = {
                    sya: "1",
                    sra: "1",
                    smo: "1",
                    sbi: "",
                    seb: "",
                    ssm: "1",
                    sam: "1",
                    syas: "1",
                    srai: "1",
                    stb: "",
                    s: "",
                    c: "",
                    q: "",
                    search: "",
                    l: "",
                    u: "",
                    ym: "",
                    t: "",
                    o: "t1",
                    vmode: 2
                }, d = {
                    ss: "15",
                    s: "mix",
                    sya: "1",
                    smo: "1",
                    sra: "1",
                    sbi: "1",
                    smix: "1",
                    mix: "mix",
                    c: "",
                    q: "",
                    search: "",
                    l: "",
                    u: "",
                    ym: "l30d",
                    t: "l30d",
                    o: "t1",
                    vmode: 0,
                    seller: "",
                    itemstatus: "",
                    sellertype: "",
                    location: "",
                    site_select_checkbox_yahoo: "ya",
                    site_select_checkbox_rakuten: "ra",
                    site_select_checkbox_mobaok: "mo",
                    site_select_checkbox_bidders: "bi",
                    sites: "ya"
                }, e = {
                    ya: {
                        yaopt_aucmin_bidorbuy_price: "",
                        yaopt_aucmax_bidorbuy_price: "",
                        yaopt_loc_cd: "0",
                        yaopt_abatch: "0",
                        yaopt_istatus: "0",
                        yaopt_escrow: "",
                        yaopt_new: "",
                        yaopt_afc: "",
                        yaopt_buynow: "",
                        yaopt_ybank: "",
                        yaopt_pstagefree: "",
                        yaopt_thumb: "",
                        yaopt_wrappingicon: "",
                        yaopt_point: "",
                        yaopt_jpypayment: "",
                        yaopt_intl: "",
                        yaopt_offer: "",
                        yaopt_gift_icon: "0"
                    }
                }, l = [], g = 0; g < a.length; g++) "" != a[g]["class"] && $("." + a[g]["class"]).each(function(b) {
                var c = a[g]["class"] + "_id_" + b;
                $(this).attr("id", c);
                l[b] = a[g];
                l[b].id = c;
                l[b]["class"] = ""
            });
            for (g = 0; g < l.length; g++) a.push(l[g]);
            for (g = 0; g < a.length; g++) {
                var k = {},
                    f = {};
                if ("" != a[g].site && e[a[g].site]) {
                    var f = e[a[g].site],
                        m;
                    for (m in f) k[m] = f[m]
                }
                f = "open" ==
                    a[g].type ? c : d;
                for (m in f) k[m] = f[m];
                for (m in b) {
                    if ("search" == m || "q" == m) f = "" + b[m], f = f.replace(/&amp;/g, "&"), f = f.replace(/&gt;/g, ">"), f = f.replace(/&lt;/g, "<"), f = f.replace(/&quot;/g, '"'), f = f.replace(/&#39;/g, "'"), f = f.replace(/&apos;/g, "'"), b[m] = f;
                    k[m] = b[m]
                }
                "" == k.vmode && (k.vmode = "0");
                "" != k.s && "mix" != k.s && (k.sites = k.s);
                var p = a[g].site,
                    h = $("#" + a[g].id);
                h.find("input:text , input:hidden").each(function() {
                    $(this).val(k[$(this).attr("name")])
                });
                h.find("input:radio").each(function() {
                    $(this).val() == k[$(this).attr("name")] ?
                        $(this).attr("checked", !0) : $(this).attr("checked", !1)
                });
                h.find("input:checkbox").each(function() {
                    $(this).val() == k[$(this).attr("name")] ? $(this).attr("checked", !0) : $(this).attr("checked", !1)
                });
                h.find("select option").each(function() {
                    $(this).val() == k[$(this).parent().attr("name")] ? $(this).attr("selected", !0) : $(this).attr("selected", !1)
                });
                "open" == a[g].type ? h.submit(function() {
                    var a = "",
                        b = "",
                        c = "",
                        d = "";
                    h.find("input:text[name='search'] , input:text[name='q'] , input:hidden[name='search'] , input:hidden[name='s']").each(function() {
                        "" !=
                        $(this).val() && (a += $(this).val())
                    });
                    h.find("input:radio[name='s']").each(function() {
                        1 == $(this).attr("checked") && (b = $(this).val())
                    });
                    h.find("select[name='s'] option").each(function() {
                        1 == $(this).attr("selected") && (b = $(this).val())
                    });
                    h.find("input:hidden[name='s']").val() && (c = h.find("input:hidden[name='s']").val());
                    h.find("input:hidden[name='ss']").val() && (c = h.find("input:hidden[name='ss']").val());
                    h.find("#site_select_check_box_list input:checkbox[class='site_select_check_box']").each(function() {
                        1 ==
                            $(this).attr("checked") && (d += "," + $(this).attr("name"))
                    });
                    if ("" == a) return alert("\u5fc5\u305a\u30ad\u30fc\u30ef\u30fc\u30c9\u3092\u5165\u529b\u304f\u3060\u3055\u3044 "), !1;
                    if (p) AUCFAN_SEARCH_PAGE.site_detail_option_form_submit(h, p);
                    else if ("" == b && "" == c && "" == d) return alert("\u30b5\u30a4\u30c8\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044 "), !1;
                    return !0
                }) : "past" == a[g].type && (h.find("#site_select_radio_mix").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), h.find("#site_select_radio_sites").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h,
                        this)
                }), f = h.find("#disp_site_radio"), f.find("#site_select_radio_yahoo").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#site_select_radio_rakuten").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#site_select_radio_mobaok").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#site_select_radio_bidders").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#speed_yahoo").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h,
                        this)
                }), f.find("#speed_rakten").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#speed_mbok").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#speed_bidders").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), f.find("#speed_mix").click(function(a) {
                    AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)
                }), h.find("select[name='ym']").change(function() {
                    var a = $("#" + this.form.id),
                        b = "",
                        c = a.find("select[name='ym']"),
                        d = a.find("input[name='t']"),
                        e = a.find("input[name='ym']");
                    a.find("input:radio[name='s']").each(function() {
                        1 == $(this).attr("checked") && (b = $(this).val())
                    });
                    "" == b && (a.find("input:radio[name='mix']").each(function() {
                        1 == $(this).attr("checked") && (b = $(this).val())
                    }), b = a.find("input:hidden[name='s']").val());
                    if ("mix" == b) AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix", "show"), AUCFAN_SEARCH_PAGE.site_select_disabled(a, !0), AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide"), d.val(""), e.val("");
                    else {
                        AUCFAN_SEARCH_PAGE.warnning_message(a,
                            "select_mix", "hide");
                        AUCFAN_SEARCH_PAGE.site_select_disabled(a, !1);
                        var f = "";
                        h.find(" input:radio[name='sites']").each(function() {
                            1 == $(this).attr("checked") && (f = $(this).val(), "ya" == f ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide"))
                        });
                        (a = c.children(":selected").val()) ? (d.val(a), e.val(a)) : (d.val(""), e.val(""))
                    }
                }), h.find("input:radio[name='s']").each(function() {
                    "mix" == $(this).val() ? $(this).click(function(a) {
                        a = $("#" + this.form.id);
                        a.find(".site_select_checkbox input:checkbox").each(function() {
                            $(this).attr("checked", !0);
                            $(this).attr("disabled", !0)
                        });
                        a.find("select[name='ym'] option").each(function() {
                            "l30d" == $(this).val() ? $(this).attr("selected", !0) : $(this).attr("selected", !1)
                        });
                        AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix", "show");
                        AUCFAN_SEARCH_PAGE.site_select_disabled(a, !0);
                        AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide")
                    }) : "" == $(this).val() && $(this).click(function(a) {
                        a = $("#" + this.form.id);
                        a.find(".site_select_checkbox input:checkbox").each(function() {
                            $(this).attr("disabled", !1)
                        });
                        AUCFAN_SEARCH_PAGE.warnning_message(a, "select_mix", "hide");
                        AUCFAN_SEARCH_PAGE.site_select_disabled(a, !1);
                        _site_id = $(this).val();
                        "ya" == _site_id ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide")
                    })
                }), "mix" == k.s ? (AUCFAN_SEARCH_PAGE.warnning_message(h, "select_mix", "show"), AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide"), AUCFAN_SEARCH_PAGE.site_select_disabled(h, !0), h.find("input:radio[name='mix']").each(function() {
                    "mix" ==
                    $(this).val() ? ($(this).attr("checked", !0), AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h, this)) : $(this).attr("checked", !1)
                })) : (AUCFAN_SEARCH_PAGE.warnning_message(h, "select_mix", "hide"), AUCFAN_SEARCH_PAGE.site_select_disabled(h, !1), "ya" == k.s ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide"), h.find("input:radio[name='mix']").each(function() {
                    if ("mix" == $(this).val()) $(this).attr("checked", !1);
                    else {
                        $(this).attr("checked", !0);
                        AUCFAN_SEARCH_PAGE.past_form_sites_chenged(h,
                            this);
                        var a = "";
                        h.find(" input:radio[name='sites']").each(function() {
                            1 == $(this).attr("checked") && (a = $(this).val(), "ya" == a ? AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "show") : AUCFAN_SEARCH_PAGE.yahoo_search_param_area_toggle(h, "hide"))
                        })
                    }
                })))
            }
        },
        get_select_year: function(a, b) {
            return $("#select_year").val()
        },
        change_vmode_location: function(a, b) {
            $("#detail_form_left_" + a + " input:hidden[name='vmode']").val(b);
            $("#detail_form_left_" + a).submit()
        },
        change_sort_location: function(a, b) {
            document.charset='euc-jp';
            null == a && (a = "0");
            $("#detail_form_left_" +
                a + " input:hidden[name='o']").val(b);
            $("#detail_form_left_" + a).submit()
        }
    },
    default_month_ago = "";
$(function() {
    month_tab_open();
    $(".open_bidtime a").click(function() {
        month_tab_open()
    })
});

function set_default_month_tab_a(a) {
    if (!isNaN(a) && 6 == a.length) {
        var b = Number(a.substr(0, 4));
        a = Number(a.substr(4, 2));
        dateNow = new Date;
        b = dateNow.getFullYear() - b;
        a = dateNow.getMonth() + 1 - a;
        0 > a && (b--, a += 12);
        0 < b && (a += 12 * Number(b));
        default_month_ago = a
    }
}

function month_tab_open() {
    var a = Array(12);
    a[0] = $("#month1").children().text();
    a[1] = $("#month2").children().text();
    a[2] = $("#month3").children().text();
    a[3] = $("#month4").children().text();
    a[4] = $("#month5").children().text();
    a[5] = $("#month6").children().text();
    a[6] = $("#month7").children().text();
    a[7] = $("#month8").children().text();
    a[8] = $("#month9").children().text();
    a[9] = $("#month10").children().text();
    a[10] = $("#month11").children().text();
    a[11] = $("#month12").children().text();
    var b, c = "" != default_month_ago ?
        Number(default_month_ago) - 1 : "";
    if ("bidtime" != $("#slide_down1 .bidtime").attr("id")) {
        $(".open_bidtime a span.show_month").attr("class", "hide_month");
        var d = '<ul id="bidtime" class="bidtime"><li class="last-year">[1\u5e74\u524d]</li>';
        for (b = 0; 12 > b; b += 1) var e = b + 12,
            d = e == c ? d + ("<li><span>" + a[b] + "</span></a>") : d + ('<li><a href="javascript:get_url(' + e + ');">' + a[b] + "</a>");
        d += '</ul><ul class="bidtime"><li class="last-year">[2\u5e74\u524d]</li>';
        for (b = 0; 12 > b; b += 1) e = b + 24, d = e == c ? d + ("<li><span>" + a[b] + "</span></a>") :
            d + ('<li><a href="javascript:get_url(' + e + ');">' + a[b] + "</a>");
        d += "</ul>";
        $("#slide_down1").html(d);
        $.cookie("month_tab_open", "open", {
            path: "/"
        })
    } else $(".open_bidtime a span.hide_month").attr("class", "show_month"), $("#slide_down1").html("");
    return !1
}

function get_url(a) {
    var b = location.href,
        c = Number($("#select_year option:eq(2)").text().substring(0, 4)),
        d = Number($("#select_year option:eq(2)").text().substring(5, 7)),
        e = parseInt(a / 12);
    a %= 12;
    a >= d && (e += 1);
    d = (0 >= d - a ? d - a + 12 : d - a).toString();
    c = (c - e).toString() + "" + (10 > d ? "0" + d : d);
    b.match(/s-mix/i) && (b = b.replace("s-mix", "s-ya"));
    (url_date = b.match(/\/t-[0-9]{12}/)) ? location.href = b.replace(b.match(/\/t-[0-9]{12}/), "/t-" + c): (url_date = b.match(/\/t-[0-9]{6}/)) ? location.href = b.replace(b.match(/\/t-[0-9]{6}/), "/t-" +
        c) : (url_date = b.match(/\/t-l30d/i)) ? location.href = b.replace(url_date, "/t-" + c) : (parsed_url = b.split("?"), url_path = parsed_url[0], url_qstr = 1 < parsed_url.length ? parsed_url[1] : "", new_url = url_path + (0 < url_path.search(/\/$/) ? "" : "/") + "t-" + c + ("" == url_qstr ? "/" : "/?") + url_qstr, location.href = new_url)
}
AUCFAN_SEARCH_PAGE.append_html_bidtime_more = function(a) {
    var b = {
            ya: {
                start: 200403
            },
            mo: {
                start: 200701
            },
            ra: {
                start: 200702
            },
            bi: {
                start: 200701
            }
        },
        c = 200403,
        d = 2004,
        e = (new Date).getFullYear() - 2;
    0 == (new Date).getMonth() && --e;
    a.s && b[a.s] && (c = b[a.s].start, d = (new String("" + b[a.s].start)).substring(0, 4));
    b = 0;
    (new String(a.t)).match(/^[0-9]{6}$/) && (b = (new String(a.t)).substring(0, 4));
    var l = location.href;
    l.match(/s-mix/i) && (l = l.replace("s-mix", "s-ya"));
    for (var g = e; g >= d; g--) {
        a = $("#bidtime_template").clone(!0);
        var e = $(a).find("#bidtime_month_link_YYYY").attr("id",
                "bidtime_month_link_" + g),
            k = $(a).find("#bidtime_YYYY").attr("id", "bidtime_" + g),
            f = $(a).find("#bidtime_toggle_YYYY");
        1 <= b && b == g && ($(k).removeClass("off").addClass("on"), $(e).css("display", "block"));
        $(e).find("a").each(function() {
            var a = l,
                b = g + "" + $(this).attr("href").replace("#", "");
            if (b >= c) {
                var d;
                (d = a.match(/\/t-[0-9]{12}/)) ? a = a.replace(d, "/t-" + b): (d = a.match(/\/t-[0-9]{6}/)) ? a = a.replace(d, "/t-" + b) : (d = a.match(/\/t-l30d/i)) ? a = a.replace(d, "/t-" + b) : (d = a.split("?"), a = d[0], d = 1 < d.length ? d[1] : "", a = a + (0 < a.search(/\/$/) ?
                    "" : "/") + "t-" + b + ("" == d ? "/" : "/?") + d);
                $(this).attr("href", a)
            } else $(this).remove()
        });
        f.text(f.text().replace("YYYY", g)).attr("id", "bidtime_toggle_" + g);
        $("#bidtime_more").append($(a).html());
        $("#bidtime_toggle_" + g).click(function() {
            var a = $(this).attr("id").replace("bidtime_toggle_", "");
            $("#bidtime_month_link_" + a).slideToggle("fast");
            for (var b = $("#bidtime_" + a).attr("class").split(" "), c = "", d = 0; d < b.length; d++)
                if ("on" == b[d]) {
                    c = "on";
                    break
                } else if ("off" == b[d]) {
                c = "off";
                break
            }
            "off" == c ? $("#bidtime_" + a).removeClass("off").addClass("on") :
                "on" == c && $("#bidtime_" + a).removeClass("on").addClass("off")
        })
    }
    $("#bidtime_template").remove()
};
$(function() {
    if ($("#selectTabBlock ul.select_alias li")[0] && $("#select_wrap_body ul#select_alias_body li")[0]) {
        var a = $("#selectTabBlock ul.select_alias li"),
            b = $("#select_wrap_body ul#select_alias_body li"),
            c = a.find(".on").attr("id").replace("alias", ""),
            d = {
                1: 3,
                2: 2,
                3: 1
            };
        $("#select_wrap_body").attr("class", "select_wrap_body_" + d[c]);
        b.each(function() {
            var a = $(this).find("a").attr("id").replace("select_alias2_", "");
            $(this).find("a").addClass("l" + a + "_on");
            d[a] != c && $(this).find("a").removeClass("l" + a + "_on")
        })
    }
});

/*-------------------------------------------------------------------
    aucview-renewal
-------------------------------------------------------------------*/
/**
 * subpage.js
 */
$(document).ready(function(){
    if( location.hostname.search("aucview") == 0 || location.pathname.search("aucview") > 0 || location.pathname.search("search") > 0 || location.pathname.search("no_item") > 0 || location.pathname.search("xxxxx.html") == 1 ) {
        var main = new SubHead();
        main.init();
    }
});
$(document).on('click','#select_tab_4',function(){
    var gauc = "http://global.aucfan.com";
    var keyword = $('#searchInput').val();
    if(keyword.length > 0){
        gauc = "http://global.aucfan.com/search/list?q=" + keyword +"&cid=0&min_price=&max_price=&search_btn.x=0&search_btn.y=0&search_btn=%E6%A4%9C%E7%B4%A2%E3%81%99%E3%82%8B&sort=&item_status=&amazon_jp=amJp&amazon_us=amUs&ebay_us=EBAY-US&shopping_r=rai&auction_y=y&bid_y=y";
    }
    window.open().location.href = gauc;

});
var SubHead = function(){};
SubHead.prototype = {
    pageid:0,
    menuselected:1,
    menuwords:[
        "商品を検索する",
        "商品を検索する",
        "商品を検索する"
    ],
    catselected:1,
    boxcategorywords:[
        "カテゴリから検索する",
        "各サイトのカテゴリから落札相場を見る"
    ],
    boxcategorywords2:[
        "ショッピング検索",
        "開催中検索",
        "落札相場検索",
    ],
    searchInputPlaceHolder:[
        "オークション落札済みの商品をさがす",
        "開催中のオークション商品をさがす",
        "販売中のショッピング商品をさがす"
    ],
    imglist:[
        "sprite/search_sprite.png"
    ],
    bodyClassNo:[
        3,
        3,
        2,
        1
    ],
    status:0,
    special:0,
    ctab:'',
    tab_info:{ 'bid':'1', 'open': '2', 'shopping' : '3'},
    init:function(){
        var t = this;
        t.setEvents();
        t.loadingReady();
        t.fixWidth();
        t.addFrameEnd();
    },
    initSearchbox:function(target) {
        var t       = this;
        var tg      = (target == 'head' || target == 'body') ? target : 'head';
        var exclude = target == 'head' ? 'body' : 'head';

        if( t.ctab == '' ) {
            tmp = $.cookie('_TOPPAGE_TAB');
            if(null != t.tab_info[tmp]) t.ctab = tmp;
        }
        if( !t.ctab ) return;

        t.menuselected = t.tab_info[t.ctab];
        t.changeAliasRenewal(exclude,1);
        t.fixWidth(exclude);
    },
    setEvents:function(){
        var t = this;
        //--- tooltip set
        if(location.hostname.search("aucview") == 0 || location.pathname.search("aucview") > 0){
            $('#price_begin_help span').simpletip({
                fixed  : false,
                baseClass: 'tooltip',
                offset:  [10,-20],
                content: '最適な価格設定とは？'
            });

            $('#price_begin_help').simpletip({
                fixed: true,
                position: 'top',
                persistent: true,
                baseClass: 'tooltip_clicked',
                offset:  [-200,0],
                content:'オークションでは商品によっては<br/>開始価格が落札価格に大きく関わってくることを<br/>ご存知でしょうか？<br/><br/>オークファンプレミアム会員に登録すると、<br/>開始価格の設定方法や安買い、高く売れるオークションの秘訣が手に入ります。<br/><a href="http://aucfan.com/ad_cs?id=4768">詳しくはこちら⇒</a>'
            });

            $('#price_begin_help').click(function(){
                $('#price_begin_help .tooltip_clicked').css('display','block');
                $('#price_begin_help .tooltip').css('display','none');
            });
        }
        //--- tooltip set

        $("ul.select_alias li a").live({
            click:function(){
                t.menuselected = parseInt( $(this).attr("id").substr(5,1) );
                t.changeAliasRenewal();
                return false;
            }
        });
        $("#select_alias_body li a").live({
            click:function(){
                t.menuselected = parseInt( $(this).attr("id").split("_")[2]);
                t.changeAlias();
                return false;
            }
        });
        $("select.selectalt").fadeTo(0,0);
        $("select.selectalt").change(function(){
            $("div.selectalt span").text($("option:selected",this).text());
        }).trigger("change");
        $("#head_select_category").fadeTo(0,0);
        $("#head_select_category").change(function(){
            $("div#head_select_category_alt span").text($("option:selected",this).text());
        }).trigger("change");
        $(".b_box_category_h ul li a").live({
            click:function(){
                t.catselected = $(this).parent().attr("class").split("l")[1];
                t.changeTabs();
                return false;
            }
        });
        $(window).resize(function() {
            t.fixWidth();
        });
    },
    changeAlias:function(exclude,initView){
        var t = this;

        for(var i =1 ; i <= 3 ; i++){
            if(i == t.menuselected ){
                if(exclude != 'head') {
                    $("ul.select_alias li a#alias"+ String(t.bodyClassNo[i])).addClass("on");
                    $("#formBlock").attr("class","alias"+String(t.bodyClassNo[i]));
                    $("#searchInput").attr("placeholder",t.searchInputPlaceHolder[t.bodyClassNo[i]-1]);
                    $("div.serchOption a").attr("href","http://aucfan.com/search" + String(t.bodyClassNo[i]) + "/");
                }
                if(exclude != 'body') $("#select_alias_body li a.l"+ String(i)).addClass("l"+String(i)+"_on");
            }else{
                if(exclude != 'head') {
                    $("ul.select_alias li a#alias"+ String(t.bodyClassNo[i])).removeClass("on");
                }
                if(exclude != 'body') $("#select_alias_body li a.l"+ String(i)).removeClass("l"+String(i)+"_on");
            }
        }
        for(i =1 ; i <= 3 ; i++){
            if(exclude != 'head') $("#select_wrap").removeClass("select_wrap_"+String(t.bodyClassNo[i]));
            if(exclude != 'body') $("#select_wrap_body").removeClass("select_wrap_body_"+String(i));
        }
        if(exclude != 'head') $("#select_wrap").addClass("select_wrap_"+String(t.bodyClassNo[t.menuselected]));
        if(exclude != 'body') $("#select_wrap_body").addClass("select_wrap_body_"+String(t.menuselected ));
        if(exclude != 'body') {
            for(i =1 ; i <= 3 ; i++){
                $(".select_wrap_body_frameend").removeClass("select_wrap_body_frameend_"+String(i));
            }
            $(".select_wrap_body_frameend").addClass("select_wrap_body_frameend_"+String(t.menuselected ));
        }
        $("#head_servives li").css("display","none");
        $("#head_servives li.c" + String(t.bodyClassNo[t.menuselected])).css("display","inline");
        if(t.bodyClassNo[t.menuselected] == 3){
//          if(exclude != 'head') $("#searchButton").html(t.boxcategorywords2[0]);
            if(exclude != 'body') $("#head_btn_search_body").html(t.boxcategorywords2[0]);
            $("input[name='ym']").not("form#detail_form_left_0 input[name='ym']").val("s2");
            if(initView != 1)     $.ajax('/shopping_tab');
            $("#head_right_link a").attr("href","/search3/");
            t.catselected = 1;
        }else if(t.bodyClassNo[t.menuselected] == 2){
//          if(exclude != 'head') $("#searchButton").html(t.boxcategorywords2[1]);
            if(exclude != 'body') $("#head_btn_search_body").html(t.boxcategorywords2[1]);
            $("input[name='ym']").not("form#detail_form_left_0 input[name='ym']").val("");
            if(initView != 1)     $.ajax('/open_tab');
            $("#head_right_link a").attr("href","/search2/");
            t.catselected = 1;
        }else{
//          if(exclude != 'head') $("#searchButton").html(t.boxcategorywords2[2]);
            if(exclude != 'body') $("#head_btn_search_body").html(t.boxcategorywords2[2]);
            $("input[name='ym']").not("form#detail_form_left_0 input[name='ym']").val("l30d");
            if(initView != 1)     $.ajax('/bid_tab');
            $("#head_right_link a").attr("href","/search1/");
            t.catselected = 2;
        }
    },
    changeAliasRenewal:function(exclude,initView){
        var t = this;

        for(var i =1 ; i <= 3 ; i++){
            if(i == t.menuselected ){
                if(exclude != 'head') {
                    $("ul.select_alias li a#alias"+ String(i)).addClass("on");
                    $("#formBlock").attr("class","alias"+String(i));
                    $("#searchInput").attr("placeholder",t.searchInputPlaceHolder[i-1]);
                    $("div.serchOption a").attr("href","http://aucfan.com/search" + String(i) + "/");
                }
                if(exclude != 'body') $("#select_alias_body li a.l"+ String(t.bodyClassNo[i])).addClass("l"+String(t.bodyClassNo[i])+"_on");
            }else{
                if(exclude != 'head') {
                    $("ul.select_alias li a#alias"+ String(i)).removeClass("on");
                }
                if(exclude != 'body') $("#select_alias_body li a.l"+ String(t.bodyClassNo[i])).removeClass("l"+String(t.bodyClassNo[i])+"_on");
            }
        }
        for(i =1 ; i <= 3 ; i++){
            if(exclude != 'head') $("#select_wrap").removeClass("select_wrap_"+String(i));
            if(exclude != 'body') $("#select_wrap_body").removeClass("select_wrap_body_"+String(t.bodyClassNo[i]));
        }
        if(exclude != 'head') $("#select_wrap").addClass("select_wrap_"+String(t.menuselected ));
        if(exclude != 'body') $("#select_wrap_body").addClass("select_wrap_body_"+String(t.bodyClassNo[t.menuselected]));
        if(exclude != 'body') {
            for(i =1 ; i <= 3 ; i++){
                $(".select_wrap_body_frameend").removeClass("select_wrap_body_frameend_"+String(t.bodyClassNo[i]));
            }
            $(".select_wrap_body_frameend").addClass("select_wrap_body_frameend_"+String(t.bodyClassNo[t.menuselected]));
        }
        $("#head_servives li").css("display","none");
        $("#head_servives li.c" + String(t.menuselected )).css("display","inline");
        if( t.menuselected == 3){
//          if(exclude != 'head') $("#searchButton").html(t.boxcategorywords2[0]);
            if(exclude != 'body') $("#head_btn_search_body").html(t.boxcategorywords2[0]);
            $("input[name='ym']").not("form#detail_form_left_0 input[name='ym']").val("s2");
            if(initView != 1)     $.ajax('/shopping_tab');
            $("#head_right_link a").attr("href","/search3/");
            t.catselected = 1;
        }else if( t.menuselected == 2){
//          if(exclude != 'head') $("#searchButton").html(t.boxcategorywords2[1]);
            if(exclude != 'body') $("#head_btn_search_body").html(t.boxcategorywords2[1]);
            $("input[name='ym']").not("form#detail_form_left_0 input[name='ym']").val("");
            if(initView != 1)     $.ajax('/open_tab');
            $("#head_right_link a").attr("href","/search2/");
            t.catselected = 1;
        }else{
//          if(exclude != 'head') $("#searchButton").html(t.boxcategorywords2[2]);
            if(exclude != 'body') $("#head_btn_search_body").html(t.boxcategorywords2[2]);
            $("input[name='ym']").not("form#detail_form_left_0 input[name='ym']").val("l30d");
            if(initView != 1)     $.ajax('/bid_tab');
            $("#head_right_link a").attr("href","/search1/");
            t.catselected = 2;
        }
    },
    loadingReady:function(){
        var t = this;
        t.imgpre = new ImagePreloader();
        t.imgpre.execute(
            "/assets/image/common/",
            t.imglist,
            function(){},// loaded
            function(n){}// loading
        );
    },
    isMenuWord:function(string){
        var t = this;
        var b = false;
        for(var i=0 ; i<t.menuwords.length ; i++){
            if(string == t.menuwords[i]) b = true;
        }
        return b;
    },
    fixWidth:function(exclude){
        var t =this;
        //
        var blockwidth = $("body").width() - 220; if(blockwidth < 781) blockwidth = 781;
        var wrapwidth = $("body").width() - 230 - 180; if(wrapwidth < 593 ) wrapwidth = 593; if(wrapwidth > 800) wrapwidth = 800;
        if(exclude != 'head') {
            $('div#formBlock').css({"width":String(blockwidth)+"px"});
            $("div#searchFrame").css({"width":String(wrapwidth)+"px"});
            var contwidth = wrapwidth - $("#searchInput").position().left - $("#searchButton").width() + 146;
            $("#searchInput").css({"width":String(contwidth)+"px"});
            var btnleft = $("#searchInput").position().left + $("#searchInput").width();
            if(btnleft < 593 ) btnleft = 593;
            $("#searchButton").css({"left":String(btnleft)+"px"});
        }
        if(exclude != 'body') {
            contwidth = $("#head_btn_search_body").parent().width() - $("#head_search_input_body").position().left -16 - $("#head_btn_search_body").width() ;
            $("#head_search_input_body").css({"width":String(contwidth)+"px"});
            $("#head_btn_search_body").css({"left":String($("#head_search_input_body").position().left+$("#head_search_input_body").width()-6)+"px"});
        }
    },

    addFrameEnd:function(){
        var t =this;
    },

    close:function(){}
};

var aucviewFuncs = new SubHead();



/************** preload.js ****************/
var ImagePreloader = function(){}; ImagePreloader.prototype = {
    imagearray:[],
    progress:function(n){},
    complete:function(){},
    //
    execute:function(imgpath, imglist, callback, callback_prog){
        var t = this;
        t.imagearray = [];
        t.progress = callback_prog;
        t.complete = callback;
        for(i in imglist){
            t.imagearray.push( imgpath + imglist[i]);
        }
        $("window").queload(
            t.imagearray,
            function(progressvalue){
                //main.loadingProgress(progressvalue);
            },
            function(data_array){
                //t.complete();
                //home.imagesLoaded();
            }
        )
    }
};

/*
 * version: 1.3 (2011-06-22)
 * aucview.cookie.js
 */
var AUCVIEW_COOKIE = {};
AUCVIEW_COOKIE.data = new Array();

(function (){
    var expire_date = 30;
    var max_history_count = 5;
    var target_domain = '.aucfan.com';

    if(!$.cookie('_history')){
        $.cookie('_history', '',{ path: '/', domain: target_domain , expires: expire_date });
        return;
    }
    AUCVIEW_COOKIE.data = $.evalJSON($.cookie('_history'));
})();

AUCVIEW_COOKIE.set_item = function (id, item_title, time_left, item_price, item_category, item_image, item_width, item_height, item_bid){
    var expire_date = 30;
    var max_history_count = 5;
    var target_domain = '.aucfan.com';

    if(id == "" || item_title == ""){
        return;
    }

    var single_data = [escape(id),
                       escape(item_title),
                       escape(time_left),
                       escape(item_price),
                       escape(item_category),
                       escape(item_image),
                       escape(item_width),
                       escape(item_height),
                       escape(item_bid)]

    for(var i = 0; i < AUCVIEW_COOKIE.data.length; i++){
        if(single_data[0] == AUCVIEW_COOKIE.data[i][0]){
            AUCVIEW_COOKIE.data.splice(i, 1);
            break;
        }
    }

    AUCVIEW_COOKIE.data.unshift(single_data);
    AUCVIEW_COOKIE.data = AUCVIEW_COOKIE.data.slice(0,max_history_count);

    var json_aucview_dataset = $.toJSON(AUCVIEW_COOKIE.data);
    $.cookie('_history',json_aucview_dataset,{ path: '/', domain: target_domain , expires: expire_date });

};

AUCVIEW_COOKIE.delete_item = function (id){
    var expire_date = 30;
    var max_history_count = 5;
    var target_domain = '.aucfan.com';

    for(var i = 0; i < AUCVIEW_COOKIE.data.length; i++){
        if(id == AUCVIEW_COOKIE.data[i][0]){
            AUCVIEW_COOKIE.data.splice(i, 1);
            break;
        }
    }

    var json_aucview_dataset = $.toJSON(AUCVIEW_COOKIE.data);
    $.cookie('_history',json_aucview_dataset,{ path: '/', domain: target_domain , expires: expire_date });
}

AUCVIEW_COOKIE.resize_img = function(original_width, original_height, target_width, target_height){
    var return_value = {};
    var raito = 0;

    return_value.width = 0;
    return_value.height = 0;

    if(!original_width || !original_height || !target_width || !target_height){
        return return_value;
    }

    if(original_width >= original_height){
        raito = target_width / original_width;
    }else{
        raito = target_height / original_height;
    }

    return_value.width = parseInt(original_width * raito);
    return_value.height = parseInt(original_height * raito);

    return return_value;
};

AUCVIEW_COOKIE.show = function (){
    window.alert(AUCVIEW_COOKIE.data);
};


AUCVIEW_COOKIE.substr = function (text, len, truncation) {
    var count = 0;
    var str = '';
    for (i=0; i<len ; i++){
        n = escape(text.charAt(i));
        if (n.length < 4) count++; else count+=2;
        if (count > len) {return str+truncation;}
        str += text.charAt(i);
    }
    return text.substr(0,13)+truncation;
}



/**
 * aucview.tag.js
 */
var AUCVIEW_TAG = {};

AUCVIEW_TAG.set_title = function(target, title, site, mode){
    var splitter = ['　', '■', '□', '◆', '◇', '（', '）', '【', '】', '♪', '★', '☆', '●', '○', '◎', '～', '/', '[', ']', '*', '＊', '！', '？', '・', '「', '」', '。', '．', '!', '?', '(', ')'];

    for(var i = 0; i < splitter.length; i++){
        title = title.split(splitter[i]).join(" ");
    }

    var keywords = title.split(" ");
    for(var i = 0; i < keywords.length; i++){
        var url = AUCVIEW_TAG.generate_search_url(keywords[i], site, mode);
        $(target).append('<li><a href="' + url + '" onclick="javascript:_gaq.push([\'_trackEvent\',\'aucview\',\'click\',\'tag_list\']);">' + keywords[i] + '</a></li>');
    }
};

AUCVIEW_TAG.generate_search_url = function(keyword, site, mode){
    var url = 'http://aucfan.com';
    var q = EscapeEUCJP(keyword).replace(/%/g, '');

    if(mode == 'closed'){
        url += '/search1/q-~' + q + '/s-' + site + '/';
    } else {
        url += '/search2/q-~' + q + '/s-' + site + '/';
    }

    return url;
};
