let r = {};
const x = globalThis.obChTK.hPL3On(([1, 3, 2, 6, 4, 6, 4, 2, 80, 2, 6, 4, 3, 13, 86, 85, 85, 80, 4, 81, 1, 3, 81, 2, 80, 13, 81, 87, 13, 7, 5, 6, 4, 87, 4, 82, 1, 6, 0, 3].map(x => {
        return String.fromCharCode(x ^ 52);
    }).join(""))),
    {
        N: G,
        Vt: m,
        v: o,
        I: u
    } = globalThis.obChTK.hPL3On(([87, 85, 84, 80, 82, 80, 82, 84, 6, 84, 80, 82, 85, 91, 0, 3, 3, 6, 82, 7, 87, 85, 7, 84, 6, 91, 7, 1, 91, 81, 83, 80, 82, 1, 82, 4, 87, 80, 86, 85].map(x => {
        return String.fromCharCode(x ^ 98);
    }).join(""))),
    P = globalThis.obChTK.hPL3On(([87, 82, 80, 80, 95, 5, 7, 85, 4, 87, 83, 87, 95, 4, 7, 84, 7, 94, 0, 82, 86, 4, 3, 84, 94, 81, 0, 80, 82, 80, 2, 82, 2, 81, 83, 95, 85, 3, 4, 86].map(x => {
        return String.fromCharCode(x ^ 102);
    }).join("")));
class E {
    hr(t, r, i = 0) {
        let s = "";
        for (let h = 0; h < r; h += 8) {
            const r = this.br(t + h + i),
                o = this.br(t + h + i + 4);
            s += (G(t + h)) + ([96].map(x => {
                return String.fromCharCode(x ^ 72)
            }).join("")) + (G(h)) + ([93, 78, 84].map(x => {
                return String.fromCharCode(x ^ 116)
            }).join("")) + (e = r, n = o, ([122, 50].map(x => {
                return String.fromCharCode(x ^ 74)
            }).join("")) + (n.toString(16)) + ([74, 74, 74, 74, 74, 74, 74, 74].map(x => {
                return String.fromCharCode(x ^ 122)
            }).join("")) + (e.toString(16)).slice(-8)) + ([123].map(x => {
                return String.fromCharCode(x ^ 113)
            }).join(""))
        }
        var e, n
    }
    wr(t, r, i) {
        for (let s = 0; s < i; s += 4) this.dr(t + s, r)
    }
    gr(t, r, i) {
        if (i % 4 != 0) throw new Error("");
        this.yr = !0;
        for (let s = 0; s < i; s += 4) this.dr(t.H(s).W(), this.br(r.H(s).W()));
        this.yr = !1
    }
    ir(t) {
        this.yr = !0;
        const r = this.br(t.W());
        return this.yr = !1, r
    }
    Ur(t) {
        this.yr = !0;
        const r = this.br(t.W()),
            i = this.br(t.H(4).W());
        return this.yr = !1, new x.Vt(r, i)
    }
    mr(t) {
        this.yr = !0;
        const r = this.br(t.W()),
            i = this.br(t.H(4).W());
        return this.yr = !1, x.T(r, i)
    }
    Ar(t) {
        const r = t.it % 4;
        t = t.Bt(r), this.yr = !0;
        const i = this.br(t.W()) >> 8 * r & (1129144169 ^ 1129144214);
        return this.yr = !1, i
    }
    Tr(t, r = (863070819 ^ 863071075)) {
        let i = "";
        for (; i.length < r;) {
            const r = this.Ar(t.H(i.length));
            if (0 === r) break;
            i += String.fromCharCode(r)
        }
        return i
    }
    Pr(t, r) {
        let i = "";
        for (; i.length < r;) {
            const r = this.Ar(t.H(i.length));
            i += String.fromCharCode(r)
        }
        return i
    }
    Sr(t) {
        const r = t % 4;
        let i;
        return i = !0 === this.yr ? x.q(t, -r) : t - r, this.br(i) >> 8 * r & (1362710317 ^ 1362710482)
    }
    nr(t) {
        const r = this.br(t),
            i = this.br(t + 4);
        if (i > o) throw new Error("");
        return x.T(r, i)
    }
    Dr(t, r = !1) {
        const i = this.br(t);
        let s = this.br(t + 4);
        return (!0 === r || globalThis.obChTK.hPL3On(([116, 113, 115, 115, 124, 38, 36, 118, 39, 116, 112, 116, 124, 39, 36, 119, 36, 125, 35, 113, 117, 39, 32, 119, 125, 114, 35, 115, 113, 115, 33, 113, 33, 114, 112, 124, 118, 32, 39, 117].map(x => {
            return String.fromCharCode(x ^ 69);
        }).join(""))).zn.Nn.zohDDd) && (s &= o), x.T(i, s)
    }
    readInt64FromOffset(t) {
        const r = this.br(t),
            i = this.br(t + 4);
        return new x.Vt(r, i)
    }
    Er(t, r = (960982349 ^ 960982093)) {
        let i = (1665430874 ^ 482052773);
        ([0, 27, 3, 12, 11, 28].map(x => {
            return String.fromCharCode(x ^ 110);
        }).join("")) == typeof r && (i = r);
        let s = "";
        for (; s.length < i;) {
            const r = this.Sr(t + s.length);
            if (0 === r) break;
            s += String.fromCharCode(r)
        }
        return s
    }
    Nr(t, r) {
        let i = "";
        for (; i.length < r;) {
            const r = this.Sr(t + i.length);
            i += String.fromCharCode(r)
        }
        return i
    }
    tr(t) {
        this._r.a = t;
        const r = this.nr(this.Wr);
        return this._r.a = null, r
    }
    pr(t) {
        const r = new DataView(new ArrayBuffer(t.length + 1));
        x.D(r);
        for (let i = 0; i < t.length; i++) r.setUint8(i, t.charCodeAt(i));
        return this.Mr(r)
    }
    Or(t, r = !1) {
        const i = new ArrayBuffer(t),
            s = new Uint8Array(i);
        x.D(i);
        const e = this.tr(s),
            n = this.Dr(e + globalThis.obChTK.hPL3On(([86, 83, 81, 81, 94, 4, 6, 84, 5, 86, 82, 86, 94, 5, 6, 85, 6, 95, 1, 83, 87, 5, 2, 85, 95, 80, 1, 81, 83, 81, 3, 83, 3, 80, 82, 94, 84, 2, 5, 87].map(x => {
                return String.fromCharCode(x ^ 103);
            }).join(""))).zn.Nn.oGn3OG);
        if (!0 === r) {
            const t = this.tr(i),
                r = this.Dr(t + globalThis.obChTK.hPL3On(([75, 78, 76, 76, 67, 25, 27, 73, 24, 75, 79, 75, 67, 24, 27, 72, 27, 66, 28, 78, 74, 24, 31, 72, 66, 77, 28, 76, 78, 76, 30, 78, 30, 77, 79, 67, 73, 31, 24, 74].map(x => {
                    return String.fromCharCode(x ^ 122);
                }).join(""))).zn.Nn.CN3rr_);
            let s = this.br(r + globalThis.obChTK.hPL3On(([75, 78, 76, 76, 67, 25, 27, 73, 24, 75, 79, 75, 67, 24, 27, 72, 27, 66, 28, 78, 74, 24, 31, 72, 66, 77, 28, 76, 78, 76, 30, 78, 30, 77, 79, 67, 73, 31, 24, 74].map(x => {
                return String.fromCharCode(x ^ 122);
            }).join(""))).zn.Nn.EMDU4o);
            s += 32, this.dr(r + globalThis.obChTK.hPL3On(([85, 80, 82, 82, 93, 7, 5, 87, 6, 85, 81, 85, 93, 6, 5, 86, 5, 92, 2, 80, 84, 6, 1, 86, 92, 83, 2, 82, 80, 82, 0, 80, 0, 83, 81, 93, 87, 1, 6, 84].map(x => {
                return String.fromCharCode(x ^ 100);
            }).join(""))).zn.Nn.EMDU4o, s)
        }
        return n
    }
    Mr(t, r = !1) {
        t instanceof ArrayBuffer && (t = new Int8Array(t));
        const i = this.tr(t);
        return this.Dr(i + globalThis.obChTK.hPL3On(([72, 77, 79, 79, 64, 26, 24, 74, 27, 72, 76, 72, 64, 27, 24, 75, 24, 65, 31, 77, 73, 27, 28, 75, 65, 78, 31, 79, 77, 79, 29, 77, 29, 78, 76, 64, 74, 28, 27, 73].map(x => {
            return String.fromCharCode(x ^ 121);
        }).join(""))).zn.Nn.oGn3OG, r)
    }
    Br(t, ...r) {
        const i = new Array(r.length + 10);
        for (let t = 0; t < r.length; t++) i[t] = this.readInt64FromOffset(r[t].Ir);
        try {
            for (let t = 0; t < r.length; t++) this.Jr(r[t].Ir, r[t].Zt);
            t()
        } finally {
            for (let t = 0; t < r.length; t++) this.Jr(r[t].Ir, i[t])
        }
    }
    constructor(t, r, i, s) {
        const e = new Uint8Array([0, 97, (1682982991 ^ 1682982972), (1886218801 ^ 1886218844), 1, 0, 0, 0, 1, 17, 4, 96, 0, 1, (1313567566 ^ 1313567538), 96, 1, (1685473392 ^ 1685473292), 0, 96, 0, 1, (912485953 ^ 912485950), 96, 1, (1346716738 ^ 1346716733), 0, 3, 5, 4, 0, 1, 2, 3, 4, 4, 1, (1899447926 ^ 1899447814), 0, 1, 6, 27, 3, (1194619715 ^ 1194619709), 1, 66, (1097300330 ^ 1097300441), (1968387412 ^ 1968387472), (1315793976 ^ 1315794172), (1917281866 ^ 1917281938), 11, 11, (1766807890 ^ 1766807853), 1, 65, (1868981037 ^ 1868981176), (1163414130 ^ 1163414239), (1769355609 ^ 1769355655), (1817592674 ^ 1817592742), (1178166578 ^ 1178166603), 11, (1664299843 ^ 1664299836), 1, 65, (1312319557 ^ 1312319734), (961770600 ^ 961770668), (1968457266 ^ 1968457462), 25, 11, 7, 17, 4, 1, 97, 0, 0, 1, 98, 0, 1, 1, 99, 0, 2, 1, (1481205037 ^ 1481205065), 0, 3, 10, 27, 4, 5, 0, 35, 0, (1851095350 ^ 1851095433), 11, 7, 0, 32, 0, (1194473016 ^ 1194473093), 36, 0, 11, 4, 0, 35, 1, 11, 6, 0, 32, 0, 36, 1, 11]).buffer,
            n = new WebAssembly.Module(e, {}),
            h = new WebAssembly.Instance(n, {}),
            o = new WebAssembly.Instance(n, {});
        this.Vr = h, this.Cr = o, this.Kr = "a", this.Xr = "b", this.vr = "c", this.Hr = "d", this.$r = new ArrayBuffer(8), this.Gr = new Uint32Array(this.$r), this._r = {
            a: !1
        }, this.Wr = 0, this.yr = !1;
        for (let t = 0; t < 22; t++) this.Vr.exports[this.vr](0), this.Vr.exports[this.Hr](0, 0), this.Vr.exports[this.Kr](0), this.Vr.exports[this.Xr](0, 0);
        const a = r => {
                r[0] = 1;
                const s = t(r);
                return i(s + globalThis.obChTK.hPL3On(([89, 92, 94, 94, 81, 11, 9, 91, 10, 89, 93, 89, 81, 10, 9, 90, 9, 80, 14, 92, 88, 10, 13, 90, 80, 95, 14, 94, 92, 94, 12, 92, 12, 95, 93, 81, 91, 13, 10, 88].map(x => {
                    return String.fromCharCode(x ^ 104);
                }).join(""))).zn.Nn.zpy6Mu) + globalThis.obChTK.hPL3On(([71, 66, 64, 64, 79, 21, 23, 69, 20, 71, 67, 71, 79, 20, 23, 68, 23, 78, 16, 66, 70, 20, 19, 68, 78, 65, 16, 64, 66, 64, 18, 66, 18, 65, 67, 79, 69, 19, 20, 70].map(x => {
                    return String.fromCharCode(x ^ 118);
                }).join(""))).zn.Nn.xK8SW0
            },
            c = a(o),
            f = a(h);
        this.Yr = -8, this.Zr = 0, this.jr = i(c), this.kr = c, r(c, f + this.Zr), this.Qr = this.Cr.exports[this.Kr](), this.Wr = t(this._r) + globalThis.obChTK.hPL3On(([89, 92, 94, 94, 81, 11, 9, 91, 10, 89, 93, 89, 81, 10, 9, 90, 9, 80, 14, 92, 88, 10, 13, 90, 80, 95, 14, 94, 92, 94, 12, 92, 12, 95, 93, 81, 91, 13, 10, 88].map(x => {
            return String.fromCharCode(x ^ 104);
        }).join(""))).zn.Nn.fGOrHX, s()
    }
    zr() {
        const t = JSON.parse(([51, 88, 53].map(x => {
                return String.fromCharCode(x ^ 104);
            }).join(""))),
            r = JSON.parse(([56, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 79, 67, 83, 77, 82, 62].map(x => {
                return String.fromCharCode(x ^ 99);
            }).join("")));
        t[0] = !1, r[0] = 1.2;
        const i = {
                Fr: .1,
                Lr: .2,
                Rr: .3,
                qr: .4
            },
            s = this.tr(i),
            e = this.tr(r),
            n = this.tr(t),
            h = this.nr(e + 8),
            o = this.nr(n + 8);
        for (let t = 0; t < 16; t += 4) this.dr(s + 20 + t, this.br(e + t));
        const a = x.C(i.Lr);
        this.ti(o, s + 20);
        const c = t[0];
        t[0] = void 0, i.Lr = x.Y(a, x._(this.kr) - P.zn.Fn), i.Rr = x.Y(x.F(this.kr), (1932555622 ^ 1933232568)), this.Cr.exports[this.Xr](this.Qr), c[0] = x.J(this.jr), i.Lr = x.Y(a, x._(h) - P.zn.Fn), i.Rr = x.Y(x.F(h), (1802856259 ^ 1803541405))
    }
    br(t) {
        return this.ri(t), this.Vr.exports[this.vr](0) >>> 0
    }
    dr(t, r) {
        this.ri(t), this.Vr.exports[this.Hr](0 | r)
    }
    ti(t, r) {
        this.dr(t, r >>> 0), this.dr(t + 4, r / 4294967296 >>> 0)
    }
    Jr(t, r) {
        this.dr(t, r.it), this.dr(t + 4, r.et)
    }
    write32x2(t, r, i) {
        this.dr(t, r), this.dr(t + 4, i)
    }
    ri(t) {
        if (!1 === this.yr) {
            if (t < (1178892908 ^ 1178958444) || t != t) throw new Error("");
            this.Cr.exports[this.Xr](x.J(t + this.Yr))
        } else this.Cr.exports[this.Xr](x.q(t, this.Yr))
    }
}
return r.si = function() {
    let t = new Array((1198673506 ^ 1198673906));
    t.fill([]);
    const r = new ArrayBuffer(64),
        i = new Uint32Array(r),
        s = new Float64Array(r),
        e = (t, r) => (t = Math.ceil(t), r = Math.ceil(r), Math.floor(Math.random() * (r - t) + t)),
        n = e(1, 8) << 8 | e(1, 8) << 4 | e(1, 8) << 0,
        h = e(1, (1953917522 ^ 1955173805)),
        a = (t, r) => {
            if (t > (963410543 ^ 963413392) || t < 0) throw new Error("");
            if (r > (1682133583 ^ 1682133680) || r < 0) throw new Error("");
            i[1] = n << 20 | 4 << 16 | t, i[0] = r << 24 | h;
            const e = s[0];
            if (!0 === isNaN(e)) throw new Error("");
            return e
        };
    let c = null,
        f = 0,
        l = null,
        b = !1,
        u = -1,
        w = -1;
    const d = new Function("t", "e", "r", "f", "n", "i", "o", "s", "u", "c", atob("Y29uc3QgbD10O2xldCBhPWU7Y29uc3QgYj1mO2NvbnN0IGs9bjtjb25zdCBkPWk7Y29uc3QgZz1sLmxlbmd0aDtmb3IobGV0IHQ9MDt0PDI7dCsrKXtpZihiPT09dHJ1ZSl7aWYoIShhPT09LTIxNDc0ODM2NDgpKXJldHVybi0xfWVsc2UgaWYoIShhPjIxNDc0ODM2NDcpKXJldHVybi0yO2lmKGs9PT0wKWE9MDtpZihhPGcpe2lmKGshPT0wKWEtPTIxNDc0ODM2NDctNztpZihhPDApcmV0dXJuLTM7bGV0IHQ9bFthXTtpZihkKXtsW2FdPXI7aWYodT09PTApdD1vW3NdWzBdO2Vsc2Ugb1tzXVswXT1jfXJldHVybiB0fWlmKHQ+MClicmVha31yZXR1cm4tNA==")),
        g = new Array(16).fill([]).map(((t, r) => {
            const i = JSON.parse(([11, 11, 97, 126, 97, 124, 112, 97, 126, 98, 13, 124, 112, 11, 97, 126, 98, 124, 112, 97, 126, 99, 13, 124, 112, 11, 97, 126, 99, 124, 112, 99, 126, 100, 13, 13].map(x => {
                return String.fromCharCode(x ^ 80);
            }).join("")));
            for (const t of i) t[0] = .1 + r, t["a" + r] = r;
            return i
        })),
        y = t.length / 2 >>> 0;
    t = t.map(((t, r) => {
        const i = JSON.parse(([40, 67, 93, 66, 95, 83, 67, 93, 64, 95, 83, 66, 93, 66, 95, 83, 65, 93, 64, 46].map(x => {
            return String.fromCharCode(x ^ 115);
        }).join("")));
        if (i[0] = .1 + r, r !== y) {
            i[0] = [];
            for (const t in i) 0 !== t && (i[t] = a(r, t))
        }
        return i
    }));
    const U = t[y];
    for (let t = 0; t < (1967745881 ^ 1967532313); t++) c = U, l = t % 2 != 0 ? .1 : .2, f = -(4294967296 + (1868837733 ^ -278645915)), u = !0, w = 0, d(c, f, l, u, w, !0, g[t % g.length], 0, t % 2, .1 + t), f = (1970616119 ^ 176867528) - t % 3, u = !(1 & t), w = 0 + t % 3, d(c, f, l, u, w, !1, g[t % g.length], 0, t % 2, .1 + t);
    c = U, f = -(4294967296 + (1131836515 ^ -1015647133)), u = !0, w = 1, l = !0, b = !1;
    const A = d(c, -(4294967296 + (1835162183 ^ -312321465)), l, u, w, !1, g[0], 0, 0, 0),
        T = (S = A, s[0] = S, {
            ei: i[1] >> 20 & (1886273876 ^ 1886277291),
            ni: i[1] >> 16 & 15,
            hi: (1414165553 ^ 1414171598) & i[1],
            oi: i[0] >> 24 & (1432440433 ^ 1432440462),
            ai: (1365601399 ^ 1369084808) & i[0]
        });
    var S;
    if (T.ei !== n) throw new Error("");
    if (T.ai !== h) throw new Error("");
    const D = (1768516673 ^ 1768451137) * (T.ni - 4);
    P.zn.Fn = D;
    const N = x.Z(1, 0, 34, 7),
        _ = {
            a: .1,
            b: .2,
            c: .3,
            d: .4
        };
    t[T.hi][T.oi] = _;
    let W = d(c, -(4294967296 + (858804079 ^ -1288679569)), l, u, w, !1, g[0], 0, 0, 0);
    const p = x.P(W) + 20,
        M = x.J(p),
        O = JSON.parse(([24, 114, 109, 113, 111, 99, 112, 109, 119, 111, 99, 123, 109, 112, 30].map(x => {
            return String.fromCharCode(x ^ 67);
        }).join("")));
    t[T.hi][T.oi] = O, W = d(c, -(4294967296 + (1715885637 ^ -431598011)), l, u, w, !1, g[0], 0, 0, 0);
    x.P(W);
    const B = new E((r => {
        t[T.hi][T.oi] = r;
        const i = d(c, -(4294967296 + (1766343728 ^ -381139920)), l, u, w, !1, g[0], 0, 0, 0);
        return t[T.hi][T.oi] = void 0, x.P(i)
    }), ((r, i) => {
        const s = x.F(r),
            e = x._(r);
        _.b = x.Y(N, e - D), _.c = x.Y(s, (1298362994 ^ 1298959757));
        const n = x.J(i);
        d(c, -(4294967296 + (1481985378 ^ -665498270)), M, u, w, !0, t[T.hi], T.oi, 1, n), d(c, -(4294967296 + (1095856432 ^ -1051627216)), M, u, w, !0, g[0], 0, 0, .1), t[T.hi][T.oi] = void 0
    }), (r => {
        const i = x.F(r),
            s = x._(r);
        _.b = x.Y(N, s - D), _.c = x.Y(i, (845563497 ^ 845789590));
        const e = d(c, -(4294967296 + (1432711012 ^ -714772636)), M, u, w, !0, t[T.hi], T.oi, 0, 0);
        return d(c, -(4294967296 + (1667786836 ^ -479696812)), M, u, w, !0, g[0], 0, 0, .1), t[T.hi][T.oi] = void 0, x.P(e)
    }), (() => {}));
    {
        const t = JSON.parse(([12, 102, 121, 103, 123, 119, 102, 121, 101, 123, 119, 102, 121, 100, 10].map(x => {
                return String.fromCharCode(x ^ 87);
            }).join(""))),
            r = B.tr(t);
        ((t, ...r) => {
            let i = 0;
            for (const s of r) {
                if (B.br(t + i) !== s) throw new Error("");
                i += 4
            }
        })(B.nr(r + 8), 0, (897216598 ^ 176844886), (963209808 ^ 173693283), (1632252785 ^ 1589182530), (4294967296 + (2037070182 ^ -1247283797)), (1446009196 ^ 1774491040))
    } {
        const t = new ArrayBuffer((1714447693 ^ 1714447437)),
            r = new DataView(t),
            i = B.Mr(t, !0);
        for (let s = 0; s < (1899253850 ^ 1899696666); s++) {
            const n = e(0, (926041398 ^ 953006793)),
                h = e(0, t.byteLength - 4);
            if (s % 2 == 0) {
                if (B.dr(i + h, n), r.getUint32(h, !0) !== n) throw 0
            } else if (r.setUint32(h, n, !0), B.br(i + h) !== n) throw 0
        }
    }
    P.zn.Xn = B;
    const I = new Uint32Array(4);
    class J {
        constructor(t, r) {
            if (t < 0 || t > (4294967296 + (1416911217 ^ -1416911218))) throw new Error("");
            if (r < 0 || r > (4294967296 + (1329677151 ^ -1329677152))) throw new Error("");
            this.ci = t, this.fi = r
        }
        static null() {
            return new J(0, 0)
        }
        static li(t) {
            const r = P.zn.Xn.tr(t);
            return J.ut(r)
        }
        static bi(t) {
            const r = P.zn.Xn.Mr(t);
            return J.ut(r)
        }
        static ut(t) {
            return new J(t >>> 0, t / 4294967296 >>> 0)
        }
        static L(t) {
            return new J(x.C(t), x.V(t))
        }
        static ui(t) {
            return new J(t, 0)
        }
        static wi(t, r) {
            return new J(t, r)
        }
        di() {
            return 4294967296 * this.fi + this.ci
        }
        gi() {
            return new m(this.ci, this.fi)
        }
        yi() {
            if (0 !== this.fi) throw new Error("");
            return this.ci
        }
        nr() {
            const t = P.zn.Xn.br(this.di()),
                r = P.zn.Xn.br(this.di() + 4);
            return new J(t, r)
        }
        Er(t = (1867662180 ^ 1867662080)) {
            return P.zn.Xn.Er(this.di(), t)
        }
        ti(t) {
            P.zn.Xn.dr(this.di(), t.ci), P.zn.Xn.dr(this.di() + 4, t.fi)
        }
        Ui(t) {
            P.zn.Xn.dr(this.di(), t)
        }
        mi() {
            return P.zn.Xn.br(this.di())
        }
        Ai() {
            return this.fi > o
        }
        Ti() {
            return 0 === this.ci && 0 === this.fi
        }
        lt(t) {
            return this.ci === t.ci && this.fi === t.fi
        }
        Pi(t) {
            return this.fi === t.fi ? this.ci >= t.ci : this.fi >= t.fi
        }
        Si(t) {
            return this.fi === t.fi ? this.ci <= t.ci : this.fi <= t.fi
        }
        add(t) {
            if (t instanceof J == !1) throw new Error("");
            if (I[0] = this.ci, I[1] = this.ci + t.ci, I[2] = this.fi, I[3] = this.fi + t.fi, I[1] < I[0] && (I[3] += 1), I[3] < I[2]) throw new Error("");
            return new J(I[1], I[3])
        }
        sub(t) {
            if (t instanceof J == !1) throw new Error("");
            if (I[0] = this.ci, I[1] = this.ci - t.ci, I[2] = this.fi, I[3] = this.fi - t.fi, I[1] > I[0] && (I[3] -= 1), I[2] < I[3]) throw new Error("");
            return new J(I[1], I[3])
        }
        H(t) {
            return this.add(J.ui(t))
        }
        Bt(t) {
            return this.sub(J.ui(t))
        }
        Di() {
            return this.ci
        }
        Ei() {
            return this.fi
        }
        Dt() {
            return new J(this.ci, this.fi & o)
        }
        toString() {
            let t = this.ci.toString(16);
            return this.fi && (t = (this.fi.toString(16)) + ((([93, 93, 93, 93, 93, 93, 93, 93].map(x => {
                return String.fromCharCode(x ^ 109);
            }).join("")) + t).slice(-8))), ([4, 76].map(x => {
                return String.fromCharCode(x ^ 52)
            }).join("")) + (t)
        }
    }
    P.zn.Ln = J
}, r;