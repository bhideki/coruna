let r = {};
const x = globalThis.moduleManager.getModuleByName(([79, 77, 76, 72, 74, 72, 74, 76, 30, 76, 72, 74, 77, 67, 24, 27, 27, 30, 74, 31, 79, 77, 31, 76, 30, 67, 31, 25, 67, 73, 75, 72, 74, 25, 74, 28, 79, 72, 78, 77].map(x => {
        return String.fromCharCode(x ^ 122);
    }).join(""))),
    P = globalThis.moduleManager.getModuleByName(([6, 3, 1, 1, 14, 84, 86, 4, 85, 6, 2, 6, 14, 85, 86, 5, 86, 15, 81, 3, 7, 85, 82, 5, 15, 0, 81, 1, 3, 1, 83, 3, 83, 0, 2, 14, 4, 82, 85, 7].map(x => {
        return String.fromCharCode(x ^ 55);
    }).join(""))),
    {
        N: G,
        tn: W,
        nn: C,
        Vt: m,
        U: j,
        An: S,
        vn: O,
        T: l,
        v: o,
        I: u,
        B: s,
        K: R,
        O: K
    } = globalThis.moduleManager.getModuleByName(([93, 95, 94, 90, 88, 90, 88, 94, 12, 94, 90, 88, 95, 81, 10, 9, 9, 12, 88, 13, 93, 95, 13, 94, 12, 81, 13, 11, 81, 91, 89, 90, 88, 11, 88, 14, 93, 90, 92, 95].map(x => {
        return String.fromCharCode(x ^ 104);
    }).join("")));
r.ga = function() {
    platformModule.platformState.exploitPrimitive, platformModule.platformState.Dn;
    const t = new ht;
    return platformModule.platformState.jn = t, platformModule.platformState.Zn = new wt, platformModule.platformState.Wn = t.Wn, platformModule.platformState.Wh = new mt, platformModule.platformState.Yh = new yt, new bt(t)
};
class bt {
    constructor(t) {
        this.tb = t, this.cc = !0, this.La = this.tb.La, this.Ga = this.tb.Ga, this.Xa = this.tb.Xa, this.Ma = this.tb.Ma
    }
    pacda(t, s) {
        return utilityModule.Int64.fromBigInt(this.tb.pacda(t.Nt(), s.Nt()))
    }
    pacia(t, s) {
        return utilityModule.Int64.fromBigInt(this.tb.pacia(t.Nt(), s.Nt()))
    }
    autda(t, s) {
        return utilityModule.Int64.fromBigInt(this.tb.autda(t.Nt(), s.Nt()))
    }
    autia(t, s) {
        return utilityModule.Int64.fromBigInt(this.tb.autia(t.Nt(), s.Nt()))
    }
    tc(t, s, i) {
        return utilityModule.Int64.fromBigInt(this.tb.Wn.call({
            ab: t.Nt(),
            sb: s.Nt(),
            x1: i.Nt(),
            x2: j(0),
            ib: j(0),
            bb: j(0)
        }))
    }
}
class ht {
    constructor() {
        const t = platformModule.platformState.Dn,
            s = platformModule.platformState.exploitPrimitive;
        this.Dn = {
            _a: t.nl._a
        }, this.hb = {
            lb: null
        }, this.ub = s.allocZeroBuffer(32), this._b = s.allocZeroBuffer(48), this.Wn = new _t, this.eb = new ft;
        {
            const s = t.nl.fa;
            let i = 0x10n,
                a = [(4294967296 + (1983344233 ^ -600347240)), (4294967296 + (1987535438 ^ -595631682)), (4294967296 + (1416452141 ^ -2123466446)), (758466393 ^ 959792981), (4294967296 + (1232029497 ^ -479247160)), (4294967296 + (1816545330 ^ -967947326)), (4294967296 + (1464628590 ^ -1920106625)), (929129290 ^ 593584962), (4294967296 + (1298547564 ^ -412729187)), (4294967296 + (1985099830 ^ -598066234)), (4294967296 + (1882801488 ^ -1522899953)), (1296199266 ^ 1497525862), (4294967296 + (1748591465 ^ -1036427112)), (4294967296 + (1266241889 ^ -512666991)), (4294967296 + (1832019044 ^ -1208784267)), (4294967296 + (2019640684 ^ -764393844)), (4294967296 + (1096169830 ^ -1761002842))],
                h = null;
            const e = i => t.rl.Kl(s, a, i);
            for (;;) {
                if (h = e(h), null === h) return null;
                if (h !== this.Dn._a) break;
                h += j(0x4n * a.length)
            }
            if (null === h) return null;
            this.La = m.ot(h), this.Ga = m.ot(h + 1n * i), this.Xa = m.ot(h + 2n * i), this.Ma = m.ot(h + 3n * i)
        }
    }
    nb(t, s, i) {
        platformModule.platformState.Dn, platformModule.platformState.exploitPrimitive;
        return null === this.hb.lb && (this.hb.lb = this.eb.call({
            ab: this.Dn._a
        })), this.Wn.call({
            ab: this.hb.lb,
            sb: s,
            x1: i & j(0xffffffffffff),
            x2: 1n,
            ib: i >> 48n & 0xFFFFn,
            bb: j(t)
        })
    }
    pacda(t, s) {
        return this.nb(0, t, s)
    }
    pacia(t, s) {
        return this.nb(1, t, s)
    }
    autia(t, s) {
        return this.nb(2, t, s)
    }
    autda(t, s) {
        return this.nb(3, t, s)
    }
    mb(t) {
        return this.nb(1, this.Ga.Dt().Nt() + 0x8n, t)
    }
}
class _t {
    constructor() {
        const t = platformModule.platformState.Dn,
            s = platformModule.platformState.exploitPrimitive;
        this.Dn = {
            na: t.nl.na
        }, this.hb = {
            cb: null
        }, this.ub = s.allocZeroBuffer(32), this._b = s.allocZeroBuffer(48), this.gb = new dt, this.eb = new ft
    }
    call(t) {
        platformModule.platformState.Dn;
        const s = platformModule.platformState.exploitPrimitive;
        if (0 === t.sb || 0x0n === t.sb) throw new Error("0 === t.sb || 0x0n === t.sb");
        null === this.hb.cb && (this.hb.cb = this.eb.call({
            ab: this.Dn.na
        }));
        const i = [
            [this.ub, [
                [0, this._b],
                [8, 1],
                [12, 1]
            ]],
            [this._b, [
                [0, 0],
                [8, t.x2],
                [16, t.ib],
                [24, t.bb],
                [32, t.sb],
                [40, 1]
            ]]
        ];
        for (const [t, a] of i)
            for (let [i, h] of a) null == h && (h = 0x0n), s.write64(j(t) + j(i), j(h));
        return this.gb.call({
            ab: this.hb.cb,
            sb: this.ub,
            x1: t.ab,
            x2: t.x1
        })
    }
}
class dt {
    constructor() {
        const t = platformModule.platformState.Dn,
            s = platformModule.platformState.exploitPrimitive;
        this.Dn = {
            Zl: t.nl.Zl,
            ql: t.nl.ql,
            Yl: t.nl.Yl,
            Wl: t.nl.Wl,
            $l: t.nl.$l,
            Ql: t.nl.Ql,
            ra: t.nl.ra
        }, this.xb = s.allocZeroBuffer(80), this.pb = s.allocZeroBuffer(80), this.wb = s.allocZeroBuffer(80), this.Tb = s.allocZeroBuffer((863595386 ^ 863594618)), this.zb = s.allocZeroBuffer(80), this.Pb = new ut
    }
    call(t) {
        platformModule.platformState.Dn;
        const s = platformModule.platformState.exploitPrimitive,
            i = [
                [this.wb, [
                    [32, this.Dn.ql],
                    [8, this.zb],
                    [48, this.Tb]
                ]],
                [this.zb, [
                    [16, j(7444609979)]
                ]],
                [this.Tb, [
                    [64, 0],
                    [24, 0],
                    [(1163357514 ^ 1163357490), 0],
                    [(1934194544 ^ 1934194264), 0],
                    [(846489426 ^ 846489186), 0],
                    [(913862256 ^ 913862472), 0],
                    [(1365396346 ^ 1365396002), 0],
                    [(860322154 ^ 860321810), this.Dn.Ql],
                    [(1194341742 ^ 1194341862), 0],
                    [(1699829583 ^ 1699829455), t.x1],
                    [(1717913463 ^ 1717913343), this.xb],
                    [(1433486423 ^ 1433486791), j((1986159438 ^ 1789833090))]
                ]],
                [this.xb, [
                    [16, t.ab],
                    [8, t.sb],
                    [48, t.x2]
                ]]
            ];
        for (const [t, a] of i)
            for (let [i, h] of a) null == h && (h = 0x0n), s.write64(j(t) + j(i), j(h));
        const a = s.read64(this.Dn.Yl),
            h = s.read64(this.Dn.Wl);
        try {
            s.write64(this.Dn.Yl, this.Dn.$l), s.write64(this.Dn.Wl, this.Dn.Zl), this.Pb.call(this.Dn.ra, this.wb)
        } finally {
            s.write64(this.Dn.Yl, a), s.write64(this.Dn.Wl, h)
        }
        return s.read64(this.zb + 0x10n)
    }
}
class ft {
    constructor() {
        const t = platformModule.platformState.Dn,
            s = platformModule.platformState.exploitPrimitive;
        this.Dn = {
            aa: t.nl.aa,
            la: t.nl.la,
            oa: t.nl.oa,
            ea: t.nl.ea
        }, this.Ab = null, this.Cb = s.allocZeroBuffer(32), this.Sb = new xt
    }
    call(t) {
        platformModule.platformState.Dn;
        const s = platformModule.platformState.exploitPrimitive;
        null === this.Ab && (this.Ab = this.Sb.call({
            id: this.Dn.aa,
            Ib: this.Dn.la
        }));
        const i = s.read64(this.Dn.oa);
        try {
            s.write64(this.Dn.oa, t.ab), this.Sb.call({
                id: this.Ab,
                Ib: this.Dn.ea,
                kb: this.Cb + 0x10n,
                Hb: this.Cb
            })
        } finally {
            s.write64(this.Dn.oa, i)
        }
        return s.read64(this.Cb)
    }
}
class xt {
    constructor() {
        const t = platformModule.platformState.Dn;
        platformModule.platformState.exploitPrimitive;
        this.Dn = {
            sa: t.nl.sa,
            ia: t.nl.ia
        }, this.Ub = new gt
    }
    call(t) {
        platformModule.platformState.Dn;
        const s = platformModule.platformState.exploitPrimitive,
            i = s.read64(this.Dn.ia);
        try {
            return s.write64(this.Dn.ia, t.Ib), this.Ub.call({
                ab: this.Dn.sa,
                sb: t.id,
                x2: t.kb,
                ib: t.Hb
            })
        } finally {
            s.write64(this.Dn.ia, i)
        }
    }
}
class pt {
    constructor() {
        const t = platformModule.platformState.Dn;
        platformModule.platformState.exploitPrimitive;
        this.hb = {
            Aa: t.nl.Aa
        }, this.gb = new dt
    }
    call(t) {
        return this.gb.call({
            ab: this.hb.Aa,
            sb: t.size,
            x1: 0x0n,
            x2: 0x0n
        })
    }
}
class gt {
    constructor() {
        const t = platformModule.platformState.Dn,
            s = platformModule.platformState.exploitPrimitive;
        this.Dn = {
            Zl: t.nl.Zl,
            ql: t.nl.ql,
            Yl: t.nl.Yl,
            Wl: t.nl.Wl,
            $l: t.nl.$l,
            ca: t.nl.ca,
            ra: t.nl.ra
        }, this.wb = s.allocZeroBuffer(80), this.Tb = s.allocZeroBuffer((927165042 ^ 927164498)), this.zb = s.allocZeroBuffer(80), this.Bb = null, this.Mb = s.allocZeroBuffer(80), this.jb = new pt, this.Pb = new ut
    }
    call(t) {
        const s = platformModule.platformState.exploitPrimitive;
        this.Bb = this.jb.call({
            size: 0x120n
        });
        const i = [
            [this.wb, [
                [32, this.Dn.$l],
                [8, this.Tb],
                [48, 0]
            ]],
            [this.Tb, [
                [64, 0],
                [24, 0],
                [(1700884787 ^ 1700884811), 0],
                [(1177906801 ^ 1177907033), 0],
                [(929525865 ^ 929526105), 0],
                [(1953592922 ^ 1953593186), 0],
                [(894916447 ^ 894916103), 0],
                [(1848669546 ^ 1848669202), this.Dn.ca],
                [(895701328 ^ 895701464), 0],
                [(962021488 ^ 962021872), this.Bb],
                [(1783655782 ^ 1783655662), t.x2],
                [(1110718567 ^ 1110718967), t.ib]
            ]],
            [this.Bb, [
                [0, t.sb],
                [8, this.Mb]
            ]],
            [this.Mb, [
                [0, this.zb],
                [16, this.Dn.ql]
            ]],
            [this.zb, [
                [16, 0x0bbb9999n]
            ]]
        ];
        for (const [t, a] of i)
            for (let [i, h] of a) null == h && (h = 0x0n), s.write64(j(t) + j(i), j(h));
        const a = s.read64(this.Dn.Yl),
            h = s.read64(this.Dn.Wl);
        try {
            s.write64(this.Dn.Yl, t.ab), s.write64(this.Dn.Wl, this.Dn.Zl), this.Pb.call(this.Dn.ra, this.wb)
        } finally {
            s.write64(this.Dn.Yl, a), s.write64(this.Dn.Wl, h)
        }
        return s.read64(this.zb + 0x10n)
    }
}
class ut {
    constructor() {
        const t = platformModule.platformState.exploitPrimitive,
            s = new Intl.Segmenter("en", {
                Pa: ([68, 82, 89, 67, 82, 89, 84, 82].map(x => {
                    return String.fromCharCode(x ^ 55);
                }).join(""))
            }),
            i = [];
        for (let t = 0; t < (913662785 ^ 913662573); t++) i.push("a");
        const a = i.join(" ");
        s.segment(a);
        this.yb = s, this.Fb = s.segment(a), this.Cd = t.allocZeroBuffer(globalThis.moduleManager.getModuleByName(([2, 7, 5, 5, 10, 80, 82, 0, 81, 2, 6, 2, 10, 81, 82, 1, 82, 11, 85, 7, 3, 81, 86, 1, 11, 4, 85, 5, 7, 5, 87, 7, 87, 4, 6, 10, 0, 86, 81, 3].map(x => {
            return String.fromCharCode(x ^ 51);
        }).join(""))).platformState.versionFlags.NfRtuR)
    }
    call(t, s) {
        const i = platformModule.platformState.exploitPrimitive,
            a = this.Fb[Symbol.iterator](),
            h = (() => {
                const t = i.getObjectAddress(a);
                return i.read64(t + j(globalThis.moduleManager.getModuleByName(([124, 121, 123, 123, 116, 46, 44, 126, 47, 124, 120, 124, 116, 47, 44, 127, 44, 117, 43, 121, 125, 47, 40, 127, 117, 122, 43, 123, 121, 123, 41, 121, 41, 122, 120, 116, 126, 40, 47, 125].map(x => {
                    return String.fromCharCode(x ^ 77);
                }).join(""))).platformState.versionFlags.jtUNKB))
            })(),
            e = h + j(globalThis.moduleManager.getModuleByName(([123, 126, 124, 124, 115, 41, 43, 121, 40, 123, 127, 123, 115, 40, 43, 120, 43, 114, 44, 126, 122, 40, 47, 120, 114, 125, 44, 124, 126, 124, 46, 126, 46, 125, 127, 115, 121, 47, 40, 122].map(x => {
                return String.fromCharCode(x ^ 74);
            }).join(""))).platformState.versionFlags.MJf4mX),
            l = i.read64(h + j(globalThis.moduleManager.getModuleByName(([94, 91, 89, 89, 86, 12, 14, 92, 13, 94, 90, 94, 86, 13, 14, 93, 14, 87, 9, 91, 95, 13, 10, 93, 87, 88, 9, 89, 91, 89, 11, 91, 11, 88, 90, 86, 92, 10, 13, 95].map(x => {
                return String.fromCharCode(x ^ 111);
            }).join(""))).platformState.versionFlags.zPL1kr)),
            n = i.read64(h + j(globalThis.moduleManager.getModuleByName(([125, 120, 122, 122, 117, 47, 45, 127, 46, 125, 121, 125, 117, 46, 45, 126, 45, 116, 42, 120, 124, 46, 41, 126, 116, 123, 42, 122, 120, 122, 40, 120, 40, 123, 121, 117, 127, 41, 46, 124].map(x => {
                return String.fromCharCode(x ^ 76);
            }).join(""))).platformState.versionFlags.ga3074)),
            r = i.read64(h + j(globalThis.moduleManager.getModuleByName(([93, 88, 90, 90, 85, 15, 13, 95, 14, 93, 89, 93, 85, 14, 13, 94, 13, 84, 10, 88, 92, 14, 9, 94, 84, 91, 10, 90, 88, 90, 8, 88, 8, 91, 89, 85, 95, 9, 14, 92].map(x => {
                return String.fromCharCode(x ^ 108);
            }).join(""))).platformState.versionFlags.yjShKn)),
            b = i.read64(e + j(globalThis.moduleManager.getModuleByName(([69, 64, 66, 66, 77, 23, 21, 71, 22, 69, 65, 69, 77, 22, 21, 70, 21, 76, 18, 64, 68, 22, 17, 70, 76, 67, 18, 66, 64, 66, 16, 64, 16, 67, 65, 77, 71, 17, 22, 68].map(x => {
                return String.fromCharCode(x ^ 116);
            }).join(""))).platformState.versionFlags.OaAnPR)),
            c = i.read64(l + j(globalThis.moduleManager.getModuleByName(([97, 100, 102, 102, 105, 51, 49, 99, 50, 97, 101, 97, 105, 50, 49, 98, 49, 104, 54, 100, 96, 50, 53, 98, 104, 103, 54, 102, 100, 102, 52, 100, 52, 103, 101, 105, 99, 53, 50, 96].map(x => {
                return String.fromCharCode(x ^ 80);
            }).join(""))).platformState.versionFlags.PCsIV0)),
            o = i.read64(h + j(globalThis.moduleManager.getModuleByName(([123, 126, 124, 124, 115, 41, 43, 121, 40, 123, 127, 123, 115, 40, 43, 120, 43, 114, 44, 126, 122, 40, 47, 120, 114, 125, 44, 124, 126, 124, 46, 126, 46, 125, 127, 115, 121, 47, 40, 122].map(x => {
                return String.fromCharCode(x ^ 74);
            }).join(""))).platformState.versionFlags.oHmyQl));
        {
            const t = i.read32(c + j(globalThis.moduleManager.getModuleByName(([28, 25, 27, 27, 20, 78, 76, 30, 79, 28, 24, 28, 20, 79, 76, 31, 76, 21, 75, 25, 29, 79, 72, 31, 21, 26, 75, 27, 25, 27, 73, 25, 73, 26, 24, 20, 30, 72, 79, 29].map(x => {
                    return String.fromCharCode(x ^ 45);
                }).join(""))).platformState.versionFlags.vnu2oq)),
                s = i.read32(c + j(globalThis.moduleManager.getModuleByName(([72, 77, 79, 79, 64, 26, 24, 74, 27, 72, 76, 72, 64, 27, 24, 75, 24, 65, 31, 77, 73, 27, 28, 75, 65, 78, 31, 79, 77, 79, 29, 77, 29, 78, 76, 64, 74, 28, 27, 73].map(x => {
                    return String.fromCharCode(x ^ 121);
                }).join(""))).platformState.versionFlags.attyap)),
                a = 2 * (globalThis.moduleManager.getModuleByName(([2, 7, 5, 5, 10, 80, 82, 0, 81, 2, 6, 2, 10, 81, 82, 1, 82, 11, 85, 7, 3, 81, 86, 1, 11, 4, 85, 5, 7, 5, 87, 7, 87, 4, 6, 10, 0, 86, 81, 3].map(x => {
                    return String.fromCharCode(x ^ 51);
                }).join(""))).platformState.versionFlags.DjRSp0 + i.read32(c + j(s))),
                o = globalThis.moduleManager.getModuleByName(([100, 97, 99, 99, 108, 54, 52, 102, 55, 100, 96, 100, 108, 55, 52, 103, 52, 109, 51, 97, 101, 55, 48, 103, 109, 98, 51, 99, 97, 99, 49, 97, 49, 98, 96, 108, 102, 48, 55, 101].map(x => {
                    return String.fromCharCode(x ^ 85);
                }).join(""))).platformState.versionFlags.LVt9Wy + a * t;
            if (o % 4 != 0) throw new Error("o % 4 != 0");
            const [f, d] = i.allocZeroBufferPair(a);
            for (let t = 0; t < o; t += 4) i.write32(d + j(t), i.read32(c + j(t)));
            const _ = 2,
                u = 4;
            i.write32(d + j(globalThis.moduleManager.getModuleByName(([7, 2, 0, 0, 15, 85, 87, 5, 84, 7, 3, 7, 15, 84, 87, 4, 87, 14, 80, 2, 6, 84, 83, 4, 14, 1, 80, 0, 2, 0, 82, 2, 82, 1, 3, 15, 5, 83, 84, 6].map(x => {
                return String.fromCharCode(x ^ 54);
            }).join(""))).platformState.versionFlags.pUvASJ), u | _);
            for (let a = 0; a < t; a++) {
                const t = d + j(globalThis.moduleManager.getModuleByName(([110, 107, 105, 105, 102, 60, 62, 108, 61, 110, 106, 110, 102, 61, 62, 109, 62, 103, 57, 107, 111, 61, 58, 109, 103, 104, 57, 105, 107, 105, 59, 107, 59, 104, 106, 102, 108, 58, 61, 111].map(x => {
                    return String.fromCharCode(x ^ 95);
                }).join(""))).platformState.versionFlags.sMuYjH + s * a);
                i.write32(t, 2);
                for (let a = 0; a < s; a++) i.patchByte(t + j(globalThis.moduleManager.getModuleByName(([107, 110, 108, 108, 99, 57, 59, 105, 56, 107, 111, 107, 99, 56, 59, 104, 59, 98, 60, 110, 106, 56, 63, 104, 98, 109, 60, 108, 110, 108, 62, 110, 62, 109, 111, 99, 105, 63, 56, 106].map(x => {
                    return String.fromCharCode(x ^ 90);
                }).join(""))).platformState.versionFlags.KSrWFg + a), 0)
            }
            const [x, p] = i.allocZeroBufferPair((1098340918 ^ 1098341110));
            i.write32(d + j(globalThis.moduleManager.getModuleByName(([116, 113, 115, 115, 124, 38, 36, 118, 39, 116, 112, 116, 124, 39, 36, 119, 36, 125, 35, 113, 117, 39, 32, 119, 125, 114, 35, 115, 113, 115, 33, 113, 33, 114, 112, 124, 118, 32, 39, 117].map(x => {
                return String.fromCharCode(x ^ 69);
            }).join(""))).platformState.versionFlags.FGsnBi), 48);
            {
                const t = r + j(globalThis.moduleManager.getModuleByName(([100, 97, 99, 99, 108, 54, 52, 102, 55, 100, 96, 100, 108, 55, 52, 103, 52, 109, 51, 97, 101, 55, 48, 103, 109, 98, 51, 99, 97, 99, 49, 97, 49, 98, 96, 108, 102, 48, 55, 101].map(x => {
                    return String.fromCharCode(x ^ 85);
                }).join(""))).platformState.versionFlags.msD22k);
                for (let s = 0; s < (1467046255 ^ 1467046383); s++) i.write32(t + j(4 * s), (1114061160 ^ 1114061256))
            }
            i.write64(l + j(globalThis.moduleManager.getModuleByName(([65, 68, 70, 70, 73, 19, 17, 67, 18, 65, 69, 65, 73, 18, 17, 66, 17, 72, 22, 68, 64, 18, 21, 66, 72, 71, 22, 70, 68, 70, 20, 68, 20, 71, 69, 73, 67, 21, 18, 64].map(x => {
                return String.fromCharCode(x ^ 112);
            }).join(""))).platformState.versionFlags.PCsIV0), d), i.write64(h + j(globalThis.moduleManager.getModuleByName(([124, 121, 123, 123, 116, 46, 44, 126, 47, 124, 120, 124, 116, 47, 44, 127, 44, 117, 43, 121, 125, 47, 40, 127, 117, 122, 43, 123, 121, 123, 41, 121, 41, 122, 120, 116, 126, 40, 47, 125].map(x => {
                return String.fromCharCode(x ^ 77);
            }).join(""))).platformState.versionFlags.oHmyQl), p), i.write32(n + j(globalThis.moduleManager.getModuleByName(([110, 107, 105, 105, 102, 60, 62, 108, 61, 110, 106, 110, 102, 61, 62, 109, 62, 103, 57, 107, 111, 61, 58, 109, 103, 104, 57, 105, 107, 105, 59, 107, 59, 104, 106, 102, 108, 58, 61, 111].map(x => {
                return String.fromCharCode(x ^ 95);
            }).join(""))).platformState.versionFlags.LM9blg), (4294967296 + (1902732360 ^ -1902732361))), i.write32(e + j(globalThis.moduleManager.getModuleByName(([85, 80, 82, 82, 93, 7, 5, 87, 6, 85, 81, 85, 93, 6, 5, 86, 5, 92, 2, 80, 84, 6, 1, 86, 92, 83, 2, 82, 80, 82, 0, 80, 0, 83, 81, 93, 87, 1, 6, 84].map(x => {
                return String.fromCharCode(x ^ 100);
            }).join(""))).platformState.versionFlags.TLJcwX), (1483502169 ^ 1483502329));
            for (let t = 0; t < globalThis.moduleManager.getModuleByName(([86, 83, 81, 81, 94, 4, 6, 84, 5, 86, 82, 86, 94, 5, 6, 85, 6, 95, 1, 83, 87, 5, 2, 85, 95, 80, 1, 81, 83, 81, 3, 83, 3, 80, 82, 94, 84, 2, 5, 87].map(x => {
                    return String.fromCharCode(x ^ 103);
                }).join(""))).platformState.versionFlags.NfRtuR; t += 4) i.write32(this.Cd + j(t), i.read32(b) + t)
        }
        i.write64(e + j(globalThis.moduleManager.getModuleByName(([126, 123, 121, 121, 118, 44, 46, 124, 45, 126, 122, 126, 118, 45, 46, 125, 46, 119, 41, 123, 127, 45, 42, 125, 119, 120, 41, 121, 123, 121, 43, 123, 43, 120, 122, 118, 124, 42, 45, 127].map(x => {
            return String.fromCharCode(x ^ 79);
        }).join(""))).platformState.versionFlags.OaAnPR), this.Cd);
        try {
            i.write64(this.Cd + j(globalThis.moduleManager.getModuleByName(([0, 5, 7, 7, 8, 82, 80, 2, 83, 0, 4, 0, 8, 83, 80, 3, 80, 9, 87, 5, 1, 83, 84, 3, 9, 6, 87, 7, 5, 7, 85, 5, 85, 6, 4, 8, 2, 84, 83, 1].map(x => {
                return String.fromCharCode(x ^ 49);
            }).join(""))).platformState.versionFlags.qRQJn0), t), i.write64(e + j(globalThis.moduleManager.getModuleByName(([67, 70, 68, 68, 75, 17, 19, 65, 16, 67, 71, 67, 75, 16, 19, 64, 19, 74, 20, 70, 66, 16, 23, 64, 74, 69, 20, 68, 70, 68, 22, 70, 22, 69, 71, 75, 65, 23, 16, 66].map(x => {
                return String.fromCharCode(x ^ 114);
            }).join(""))).platformState.versionFlags.SAobkS), s), a.next().value
        } finally {
            i.write64(e + j(globalThis.moduleManager.getModuleByName(([107, 110, 108, 108, 99, 57, 59, 105, 56, 107, 111, 107, 99, 56, 59, 104, 59, 98, 60, 110, 106, 56, 63, 104, 98, 109, 60, 108, 110, 108, 62, 110, 62, 109, 111, 99, 105, 63, 56, 106].map(x => {
                return String.fromCharCode(x ^ 90);
            }).join(""))).platformState.versionFlags.OaAnPR), b), i.write64(h + j(globalThis.moduleManager.getModuleByName(([122, 127, 125, 125, 114, 40, 42, 120, 41, 122, 126, 122, 114, 41, 42, 121, 42, 115, 45, 127, 123, 41, 46, 121, 115, 124, 45, 125, 127, 125, 47, 127, 47, 124, 126, 114, 120, 46, 41, 123].map(x => {
                return String.fromCharCode(x ^ 75);
            }).join(""))).platformState.versionFlags.oHmyQl), o)
        }
    }
}
class wt {
    constructor() {
        const t = platformModule.platformState.Dn,
            s = platformModule.platformState.exploitPrimitive,
            i = platformModule.platformState.jn,
            a = new Uint8Array([0, 97, (2017548118 ^ 2017548069), (1347507275 ^ 1347507238), 1, 0, 0, 0, 1, 52, 3, 96, 8, (1182361671 ^ 1182361657), (1986819700 ^ 1986819594), (1313691702 ^ 1313691720), (1951160418 ^ 1951160348), (1697469543 ^ 1697469465), (946946913 ^ 946946847), (1700351606 ^ 1700351496), (1180333141 ^ 1180333099), 1, (1920366421 ^ 1920366379), 96, 16, (1664374594 ^ 1664374589), (1801407087 ^ 1801406992), (1333347436 ^ 1333347347), (2033727033 ^ 2033727046), (1869305928 ^ 1869305911), (959670902 ^ 959670793), (1984318808 ^ 1984318759), (1195463539 ^ 1195463436), (892421970 ^ 892421933), (762533242 ^ 762533125), (860640344 ^ 860640295), (1178875254 ^ 1178875145), (880173944 ^ 880173831), (960712538 ^ 960712485), (1733119812 ^ 1733119803), (1917793361 ^ 1917793326), 1, (1447261299 ^ 1447261197), 96, 16, (1516384351 ^ 1516384288), (1147826024 ^ 1147825943), (892887880 ^ 892887863), (1934652008 ^ 1934651927), (944131629 ^ 944131666), (1766999925 ^ 1766999818), (1433495401 ^ 1433495318), (1732535374 ^ 1732535345), (1601324405 ^ 1601324298), (1716415352 ^ 1716415239), (1464486517 ^ 1464486410), (926438724 ^ 926438715), (1215842626 ^ 1215842621), (2037994864 ^ 2037994767), (1970750284 ^ 1970750259), (1113019494 ^ 1113019417), 0, 3, 5, 4, 0, 1, 1, 2, 4, 4, 1, (1463969100 ^ 1463969084), 0, 2, 5, 4, 1, 1, 1, 1, 7, 17, 4, 1, (1766609742 ^ 1766609722), 1, 0, 1, (1781753466 ^ 1781753367), 2, 0, 1, (1146306872 ^ 1146306903), 0, 0, 1, (1414615110 ^ 1414615072), 0, 3, 9, 7, 1, 0, 65, 0, 11, 1, 0, 10, (1465150810 ^ 1465150872), 1, 4, 4, 0, 66, 0, 11, 88, 0, 32, 1, (1916879967 ^ 1916880114), 66, 32, (1900561752 ^ 1900561886), 32, 0, (1903248463 ^ 1903248610), (762654017 ^ 762654149), 32, 3, (2018405226 ^ 2018405319), 66, 32, (1733190499 ^ 1733190629), 32, 2, (1917343306 ^ 1917343463), (1265059141 ^ 1265059265), 32, 5, (1397637483 ^ 1397637574), 66, 32, (1177907265 ^ 1177907399), 32, 4, (1866558327 ^ 1866558426), (1916875874 ^ 1916876006), 32, 7, (1869311854 ^ 1869311939), 66, 32, (1867797555 ^ 1867797685), 32, 6, (842229608 ^ 842229701), (913986411 ^ 913986543), 32, 9, (1415066725 ^ 1415066824), 66, 32, (1095200067 ^ 1095200197), 32, 8, (829184353 ^ 829184460), (1247106919 ^ 1247107043), 32, 11, (2004053875 ^ 2004053982), 66, 32, (1499030852 ^ 1499030978), 32, 10, (845373300 ^ 845373401), (1702001004 ^ 1702001128), 32, 13, (1919246149 ^ 1919246312), 66, 32, (1450666836 ^ 1450666962), 32, 12, (1667721538 ^ 1667721711), (963523156 ^ 963523280), 32, 15, (1698788204 ^ 1698788289), 66, 32, (1665431929 ^ 1665432063), 32, 14, (1282232415 ^ 1282232562), (1850632019 ^ 1850632151), 65, 0, 17, 0, 0, 15, 11, 37, 0, 32, 0, 32, 1, 32, 2, 32, 3, 32, 4, 32, 5, 32, 6, 32, 7, 32, 8, 32, 9, 32, 10, 32, 11, 32, 12, 32, 13, 32, 14, 32, 15, 16, 1, 15, 11, 60, 1, 1, (897151348 ^ 897151242), 32, 0, 32, 1, 32, 2, 32, 3, 32, 4, 32, 5, 32, 6, 32, 7, 32, 8, 32, 9, 32, 10, 32, 11, 32, 12, 32, 13, 32, 14, 32, 15, 16, 2, 33, 16, 65, 0, 32, 16, (1933141315 ^ 1933141476), 54, 2, 0, 65, 4, 32, 16, 66, 32, (1096307267 ^ 1096307403), (863325249 ^ 863325414), 54, 2, 0, 15, 11]),
            h = new WebAssembly.Module(a, {}),
            e = new WebAssembly.Instance(h, {});
        this.Eb = e.exports.f, this.Wb = e.exports.o, this.vb = new Uint32Array(e.exports.m.buffer), this.Db = s.getObjectAddress(this.Wb), this.Dn = {
            xa: t.nl.xa
        }, this.hb = {
            Gb: i.pacda(this.Dn.xa, 0x0n)
        }, this.Kb = new BigUint64Array(8), this.Rb = new Int32Array(this.Kb.buffer), this.Vb = new DataView(this.Kb.buffer)
    }
    call(t, s) {
        platformModule.platformState.Dn;
        const i = platformModule.platformState.exploitPrimitive,
            a = (platformModule.platformState.jn, platformModule.platformState.Wn);
        if (!(s.length <= 8)) throw new Error(([30, 40, 58, 36, 3, 32, 61, 10, 40, 46, 44, 10, 40, 37, 37, 25, 59, 32, 36, 32, 61, 32, 63, 44, 105, 38, 39, 37, 48, 105, 58, 60, 57, 57, 38, 59, 61, 58, 105, 113, 105, 59, 44, 46, 32, 58, 61, 44, 59, 105, 40, 59, 46, 58, 101, 105, 46, 38, 61, 105].map(x => {
            return String.fromCharCode(x ^ 73)
        }).join("")) + (s.length));
        for (const t in s) this.Kb[t] = j(s[t]);
        const h = i.read64(this.Db + j(globalThis.moduleManager.getModuleByName(([70, 67, 65, 65, 78, 20, 22, 68, 21, 70, 66, 70, 78, 21, 22, 69, 22, 79, 17, 67, 71, 21, 18, 69, 79, 64, 17, 65, 67, 65, 19, 67, 19, 64, 66, 78, 68, 18, 21, 71].map(x => {
                return String.fromCharCode(x ^ 119);
            }).join(""))).platformState.versionFlags.rvXShf)),
            e = i.read64(h),
            l = j((1835549285 ^ 1835558600));
        a.call({
            ab: this.hb.Gb,
            sb: S(e),
            x1: l
        });
        const n = a.call({
            ab: this.hb.Gb,
            sb: S(t),
            x1: l
        });
        try {
            return i.write64(h, n), this.Eb(...this.Rb), this.Rb[0] = this.vb[0], this.Rb[1] = this.vb[1], this.Kb[0]
        } finally {
            i.write64(h, e)
        }
    }
}
class yt {
    constructor() {
        const t = platformModule.platformState.Dn,
            s = platformModule.platformState.jn;
        this.hb = {
            Xb: s.pacda(t.nl.pa, 0x0n)
        }
    }
    qb(t) {
        return platformModule.platformState.Wn.call({
            ab: this.hb.Xb,
            sb: j(t)
        })
    }
}
class mt {
    constructor() {
        const t = platformModule.platformState.Dn,
            s = platformModule.platformState.jn;
        this.hb = {
            Jb: s.pacda(t.nl.Ta, 0x0n),
            Nb: s.pacda(t.nl.Ea, 0x0n),
            $b: s.pacda(t.nl.Ca, 0x0n),
            Lb: s.pacda(t.nl.ka, 0x0n)
        }
    }
    Ob(t) {
        return platformModule.platformState.Wn.call({
            ab: this.hb.Jb,
            sb: j(t)
        })
    }
    Qb(t) {
        return platformModule.platformState.Wn.call({
            ab: this.hb.Nb,
            sb: t
        })
    }
    Yb(t, s, i) {
        return platformModule.platformState.Wn.call({
            ab: this.hb.Lb,
            sb: t,
            x1: s,
            x2: i
        })
    }
    Zb(t, s, i) {
        return platformModule.platformState.Wn.call({
            ab: this.hb.$b,
            sb: t,
            x1: s,
            x2: i
        })
    }
}
return r;