let r = {};
const x = globalThis.moduleManager.getModuleByName([113, 115, 114, 118, 116, 118, 116, 114, 32, 114, 118, 116, 115, 125, 38, 37, 37, 32, 116, 33, 113, 115, 33, 114, 32, 125, 33, 39, 125, 119, 117, 118, 116, 39, 116, 34, 113, 118, 112, 115].map((x) => {
    return String.fromCharCode(x ^ 68);
  }).join("")),
  P = globalThis.moduleManager.getModuleByName([88, 93, 95, 95, 80, 10, 8, 90, 11, 88, 92, 88, 80, 11, 8, 91, 8, 81, 15, 93, 89, 11, 12, 91, 81, 94, 15, 95, 93, 95, 13, 93, 13, 94, 92, 80, 90, 12, 11, 89].map((x) => {
    return String.fromCharCode(x ^ 105);
  }).join("")),
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
  } = globalThis.moduleManager.getModuleByName([93, 95, 94, 90, 88, 90, 88, 94, 12, 94, 90, 88, 95, 81, 10, 9, 9, 12, 88, 13, 93, 95, 13, 94, 12, 81, 13, 11, 81, 91, 89, 90, 88, 11, 88, 14, 93, 90, 92, 95].map((x) => {
    return String.fromCharCode(x ^ 104);
  }).join(""));
r.ga = function () {
  P.platformState.exploitPrimitive, P.platformState.Dn;
  const t = new ht();
  return new bt(t);
};
class bt {
  constructor(t) {
    this.tb = t, this.cc = !0, this.La = this.tb.La, this.Ga = this.tb.Ga, this.Xa = this.tb.Xa, this.Ma = this.tb.Ma;
  }
  pacda(t, a) {
    return x.Int64.fromBigInt(this.tb.pacda(t.Nt(), a.Nt()));
  }
  pacia(t, a) {
    return x.Int64.fromBigInt(this.tb.pacia(t.Nt(), a.Nt()));
  }
  autda(t, a) {
    return x.Int64.fromBigInt(this.tb.autda(t.Nt(), a.Nt()));
  }
  autia(t, a) {
    return x.Int64.fromBigInt(this.tb.autia(t.Nt(), a.Nt()));
  }
  tc(t, a, s) {
    return x.Int64.fromBigInt(this.tb.Wn.call({
      ab: t.Nt(),
      sb: a.Nt(),
      x1: s.Nt(),
      x2: j(0),
      ib: j(0),
      bb: j(0)
    }));
  }
}
class ht {
  constructor() {
    const t = P.platformState.Dn;
    P.platformState.exploitPrimitive;
    this.Dn = {
      _a: t.nl._a
    }, this.Wn = new _t(), this.eb = new ft(), this.hb = {
      lb: this.eb.call({
        ab: this.Dn._a
      })
    };
    {
      const a = t.nl.fa;
      let s = 0x10n,
        i = [4294967296 + (1450143794 ^ -59804733), 4294967296 + (1899192132 ^ -616866636), 4294967296 + (910970458 ^ -481333435), 1967346791 ^ 1631802475, 4294967296 + (1098472013 ^ -344368708), 4294967296 + (1294807873 ^ -416993103), 4294967296 + (2021087605 ^ -1565109404), 1145260849 ^ 1346587449, 4294967296 + (1600931170 ^ -177453421), 4294967296 + (1635151411 ^ -880906813), 4294967296 + (1432839029 ^ -2140913110), 963209802 ^ 761883214, 4294967296 + (1898786936 ^ -617794679), 4294967296 + (861296482 ^ -1721871214), 4294967296 + (829114421 ^ -341162460), 4294967296 + (929134714 ^ -1653572710), 4294967296 + (1682923826 ^ -1307548942)],
        b = null;
      const e = (s) => t.rl.Kl(a, i, s);
      for (;;) {
        if (b = e(b), null === b) return null;
        if (b !== this.Dn._a) break;
        b += j(0x4n * i.length);
      }
      if (null === b) return null;
      this.La = m.ot(b), this.Ga = m.ot(b + 1n * s), this.Xa = m.ot(b + 2n * s), this.Ma = m.ot(b + 3n * s);
    }
  }
  nb(t, a, s) {
    P.platformState.Dn, P.platformState.exploitPrimitive;
    return this.Wn.call({
      ab: this.hb.lb,
      sb: a,
      x1: s & j(0xffffffffffff),
      x2: 1n,
      ib: s >> 48n & 0xFFFFn,
      bb: j(t)
    });
  }
  pacda(t, a) {
    return this.nb(0, t, a);
  }
  pacia(t, a) {
    return this.nb(1, t, a);
  }
  autia(t, a) {
    return this.nb(2, t, a);
  }
  autda(t, a) {
    return this.nb(3, t, a);
  }
}
class ft {
  constructor() {
    const t = P.platformState.Dn,
      a = P.platformState.exploitPrimitive;
    this.ob = new Tt(), this.hb = {
      cb: this.ob.rb([8, 29, 28, 56, 17, 3, 24, 35, 19, 17, 30, 54, 5, 28, 28].map((x) => {
        return String.fromCharCode(x ^ 112);
      }).join("")),
      $l: t.nl.$l,
      fb: this.ob.rb([57, 60, 40, 15, 20, 54, 21, 21, 10, 53, 24, 9, 31, 8, 12, 31, 8, 57, 8, 31, 27, 14, 31, 45, 19, 14, 18, 50, 27, 20, 30, 22, 31, 8].map((x) => {
        return String.fromCharCode(x ^ 122);
      }).join("")),
      Zl: t.nl.Zl
    };
    const s = S(this.hb.fb),
      i = t.rl.Ml(s, 911422819 ^ 911422947);
    if (4 !== i.length) throw new Error("4 !== i.length");
    this.Dn = {
      qa: i[1],
      $a: i[2]
    }, this.ub = a.allocZeroBuffer(32), this._b = a.allocZeroBuffer(48), this.Tb = a.allocZeroBuffer(1666085986 ^ 1666086754), this.gb = new dt();
  }
  call(t) {
    let a = 0;
    P.platformState.Dn;
    const s = P.platformState.exploitPrimitive,
      i = [
      [this.ub, [
      [0, this._b],
      [8, 1],
      [12, 1]]],

      [this._b, [
      [0, 0],
      [8, 0],
      [16, 0],
      [24, 0],
      [32, this.Tb],
      [40, 1]]],

      [this.Tb, [
      [64, 0],
      [24, 0],
      [1110455119 ^ 1110455095, 0],
      [846681714 ^ 846681946, 0],
      [1431400566 ^ 1431400774, 0],
      [1752527982 ^ 1752528214, 0],
      [1632580978 ^ 1632580650, 0],
      [1145787187 ^ 1145786955, this.hb.fb],
      [1347252793 ^ 1347252913, 0],
      [910898992 ^ 910898864, 0],
      [1883468367 ^ 1883468743, 0],
      [1731751514 ^ 1731751882, 0]]]];


    for (const [t, a] of i)
    for (let [i, b] of a) null == b && (b = 0x0n), s.write64(j(t) + j(i), j(b));
    const b = s.read64(this.Dn.qa),
      e = s.read64(this.Dn.$a);
    try {
      s.write64(this.Dn.qa, S(this.hb.Zl)), s.write64(this.Dn.$a, t.ab);
      const i = this.gb.call({
        ab: this.hb.cb,
        sb: this.ub,
        x1: this.hb.$l,
        x2: 0x0n
      });
      a = s.read64(i + 0x90n);
    } finally {
      s.write64(this.Dn.qa, b), s.write64(this.Dn.$a, e);
    }
    return a;
  }
}
class dt {
  constructor() {
    const t = P.platformState.Dn,
      a = P.platformState.exploitPrimitive;
    this.Dn = {
      Zl: t.nl.Zl,
      ql: t.nl.ql,
      Yl: t.nl.Yl,
      Wl: t.nl.Wl,
      $l: t.nl.$l,
      Ql: t.nl.Ql,
      ra: t.nl.ra
    }, this.xb = a.allocZeroBuffer(80), this.pb = a.allocZeroBuffer(80), this.wb = a.allocZeroBuffer(80), this.Tb = a.allocZeroBuffer(1095919665 ^ 1095920433), this.zb = a.allocZeroBuffer(80), this.Pb = new ut();
  }
  call(t) {
    P.platformState.Dn;
    const a = P.platformState.exploitPrimitive,
      s = [
      [this.wb, [
      [32, this.Dn.ql],
      [8, this.zb],
      [48, this.Tb]]],

      [this.zb, [
      [16, j(7444609979)]]],

      [this.Tb, [
      [64, 0],
      [24, 0],
      [1634037332 ^ 1634037292, 0],
      [861419615 ^ 861419895, 0],
      [1333423928 ^ 1333423624, 0],
      [1416380756 ^ 1416380524, 0],
      [1416902487 ^ 1416902159, 0],
      [1869759335 ^ 1869759007, this.Dn.Ql],
      [2020692851 ^ 2020692987, 0],
      [812332889 ^ 812332761, t.x1],
      [1430803795 ^ 1430803675, this.xb],
      [1180129626 ^ 1180129482, j(1733506371 ^ 2074081679)]]],

      [this.xb, [
      [16, t.ab],
      [8, t.sb],
      [48, t.x2]]]];


    for (const [t, i] of s)
    for (let [s, b] of i) null == b && (b = 0x0n), a.write64(j(t) + j(s), j(b));
    const i = a.read64(this.Dn.Yl),
      b = a.read64(this.Dn.Wl);
    try {
      a.write64(this.Dn.Yl, this.Dn.$l), a.write64(this.Dn.Wl, this.Dn.Zl), this.Pb.call(this.Dn.ra, this.wb);
    } finally {
      a.write64(this.Dn.Yl, i), a.write64(this.Dn.Wl, b);
    }
    return a.read64(this.zb + 0x10n);
  }
}
class ut {
  constructor() {
    const t = P.platformState.exploitPrimitive,
      a = new Intl.Segmenter("en", {
        Pa: [61, 43, 32, 58, 43, 32, 45, 43].map((x) => {
          return String.fromCharCode(x ^ 78);
        }).join("")
      }),
      s = [];
    for (let t = 0; t < (1366587205 ^ 1366586985); t++) s.push("a");
    const i = s.join(" ");
    a.segment(i);
    this.yb = a, this.Fb = a.segment(i), this.Cd = t.allocZeroBuffer(globalThis.moduleManager.getModuleByName([4, 1, 3, 3, 12, 86, 84, 6, 87, 4, 0, 4, 12, 87, 84, 7, 84, 13, 83, 1, 5, 87, 80, 7, 13, 2, 83, 3, 1, 3, 81, 1, 81, 2, 0, 12, 6, 80, 87, 5].map((x) => {
      return String.fromCharCode(x ^ 53);
    }).join("")).platformState.versionFlags.NfRtuR);
  }
  call(t, a) {
    const s = P.platformState.exploitPrimitive,
      i = this.Fb[Symbol.iterator](),
      b = (() => {
        const t = s.getObjectAddress(i);
        return s.read64(t + j(globalThis.moduleManager.getModuleByName([124, 121, 123, 123, 116, 46, 44, 126, 47, 124, 120, 124, 116, 47, 44, 127, 44, 117, 43, 121, 125, 47, 40, 127, 117, 122, 43, 123, 121, 123, 41, 121, 41, 122, 120, 116, 126, 40, 47, 125].map((x) => {
          return String.fromCharCode(x ^ 77);
        }).join("")).platformState.versionFlags.jtUNKB));
      })(),
      e = b + j(globalThis.moduleManager.getModuleByName([112, 117, 119, 119, 120, 34, 32, 114, 35, 112, 116, 112, 120, 35, 32, 115, 32, 121, 39, 117, 113, 35, 36, 115, 121, 118, 39, 119, 117, 119, 37, 117, 37, 118, 116, 120, 114, 36, 35, 113].map((x) => {
        return String.fromCharCode(x ^ 65);
      }).join("")).platformState.versionFlags.MJf4mX),
      h = s.read64(b + j(globalThis.moduleManager.getModuleByName([103, 98, 96, 96, 111, 53, 55, 101, 52, 103, 99, 103, 111, 52, 55, 100, 55, 110, 48, 98, 102, 52, 51, 100, 110, 97, 48, 96, 98, 96, 50, 98, 50, 97, 99, 111, 101, 51, 52, 102].map((x) => {
        return String.fromCharCode(x ^ 86);
      }).join("")).platformState.versionFlags.zPL1kr)),
      l = s.read64(b + j(globalThis.moduleManager.getModuleByName([118, 115, 113, 113, 126, 36, 38, 116, 37, 118, 114, 118, 126, 37, 38, 117, 38, 127, 33, 115, 119, 37, 34, 117, 127, 112, 33, 113, 115, 113, 35, 115, 35, 112, 114, 126, 116, 34, 37, 119].map((x) => {
        return String.fromCharCode(x ^ 71);
      }).join("")).platformState.versionFlags.ga3074)),
      n = s.read64(b + j(globalThis.moduleManager.getModuleByName([75, 78, 76, 76, 67, 25, 27, 73, 24, 75, 79, 75, 67, 24, 27, 72, 27, 66, 28, 78, 74, 24, 31, 72, 66, 77, 28, 76, 78, 76, 30, 78, 30, 77, 79, 67, 73, 31, 24, 74].map((x) => {
        return String.fromCharCode(x ^ 122);
      }).join("")).platformState.versionFlags.yjShKn)),
      o = s.read64(e + j(globalThis.moduleManager.getModuleByName([86, 83, 81, 81, 94, 4, 6, 84, 5, 86, 82, 86, 94, 5, 6, 85, 6, 95, 1, 83, 87, 5, 2, 85, 95, 80, 1, 81, 83, 81, 3, 83, 3, 80, 82, 94, 84, 2, 5, 87].map((x) => {
        return String.fromCharCode(x ^ 103);
      }).join("")).platformState.versionFlags.OaAnPR)),
      c = s.read64(h + j(globalThis.moduleManager.getModuleByName([126, 123, 121, 121, 118, 44, 46, 124, 45, 126, 122, 126, 118, 45, 46, 125, 46, 119, 41, 123, 127, 45, 42, 125, 119, 120, 41, 121, 123, 121, 43, 123, 43, 120, 122, 118, 124, 42, 45, 127].map((x) => {
        return String.fromCharCode(x ^ 79);
      }).join("")).platformState.versionFlags.PCsIV0)),
      r = s.read64(b + j(globalThis.moduleManager.getModuleByName([102, 99, 97, 97, 110, 52, 54, 100, 53, 102, 98, 102, 110, 53, 54, 101, 54, 111, 49, 99, 103, 53, 50, 101, 111, 96, 49, 97, 99, 97, 51, 99, 51, 96, 98, 110, 100, 50, 53, 103].map((x) => {
        return String.fromCharCode(x ^ 87);
      }).join("")).platformState.versionFlags.oHmyQl));
    {
      const t = s.read32(c + j(globalThis.moduleManager.getModuleByName([91, 94, 92, 92, 83, 9, 11, 89, 8, 91, 95, 91, 83, 8, 11, 88, 11, 82, 12, 94, 90, 8, 15, 88, 82, 93, 12, 92, 94, 92, 14, 94, 14, 93, 95, 83, 89, 15, 8, 90].map((x) => {
          return String.fromCharCode(x ^ 106);
        }).join("")).platformState.versionFlags.vnu2oq)),
        a = s.read32(c + j(globalThis.moduleManager.getModuleByName([127, 122, 120, 120, 119, 45, 47, 125, 44, 127, 123, 127, 119, 44, 47, 124, 47, 118, 40, 122, 126, 44, 43, 124, 118, 121, 40, 120, 122, 120, 42, 122, 42, 121, 123, 119, 125, 43, 44, 126].map((x) => {
          return String.fromCharCode(x ^ 78);
        }).join("")).platformState.versionFlags.attyap)),
        i = 2 * (globalThis.moduleManager.getModuleByName([123, 126, 124, 124, 115, 41, 43, 121, 40, 123, 127, 123, 115, 40, 43, 120, 43, 114, 44, 126, 122, 40, 47, 120, 114, 125, 44, 124, 126, 124, 46, 126, 46, 125, 127, 115, 121, 47, 40, 122].map((x) => {
          return String.fromCharCode(x ^ 74);
        }).join("")).platformState.versionFlags.DjRSp0 + s.read32(c + j(a))),
        r = globalThis.moduleManager.getModuleByName([97, 100, 102, 102, 105, 51, 49, 99, 50, 97, 101, 97, 105, 50, 49, 98, 49, 104, 54, 100, 96, 50, 53, 98, 104, 103, 54, 102, 100, 102, 52, 100, 52, 103, 101, 105, 99, 53, 50, 96].map((x) => {
          return String.fromCharCode(x ^ 80);
        }).join("")).platformState.versionFlags.LVt9Wy + i * t;
      if (r % 4 != 0) throw new Error("r % 4 != 0");
      const [f, d] = s.allocZeroBufferPair(i);
      for (let t = 0; t < r; t += 4) s.write32(d + j(t), s.read32(c + j(t)));
      const u = 2,
        _ = 4;
      s.write32(d + j(globalThis.moduleManager.getModuleByName([93, 88, 90, 90, 85, 15, 13, 95, 14, 93, 89, 93, 85, 14, 13, 94, 13, 84, 10, 88, 92, 14, 9, 94, 84, 91, 10, 90, 88, 90, 8, 88, 8, 91, 89, 85, 95, 9, 14, 92].map((x) => {
        return String.fromCharCode(x ^ 108);
      }).join("")).platformState.versionFlags.pUvASJ), _ | u);
      for (let i = 0; i < t; i++) {
        const t = d + j(globalThis.moduleManager.getModuleByName([71, 66, 64, 64, 79, 21, 23, 69, 20, 71, 67, 71, 79, 20, 23, 68, 23, 78, 16, 66, 70, 20, 19, 68, 78, 65, 16, 64, 66, 64, 18, 66, 18, 65, 67, 79, 69, 19, 20, 70].map((x) => {
          return String.fromCharCode(x ^ 118);
        }).join("")).platformState.versionFlags.sMuYjH + a * i);
        s.write32(t, 2);
        for (let i = 0; i < a; i++) s.patchByte(t + j(globalThis.moduleManager.getModuleByName([89, 92, 94, 94, 81, 11, 9, 91, 10, 89, 93, 89, 81, 10, 9, 90, 9, 80, 14, 92, 88, 10, 13, 90, 80, 95, 14, 94, 92, 94, 12, 92, 12, 95, 93, 81, 91, 13, 10, 88].map((x) => {
          return String.fromCharCode(x ^ 104);
        }).join("")).platformState.versionFlags.KSrWFg + i), 0);
      }
      const [T, g] = s.allocZeroBufferPair(963658290 ^ 963658482);
      s.write32(d + j(globalThis.moduleManager.getModuleByName([86, 83, 81, 81, 94, 4, 6, 84, 5, 86, 82, 86, 94, 5, 6, 85, 6, 95, 1, 83, 87, 5, 2, 85, 95, 80, 1, 81, 83, 81, 3, 83, 3, 80, 82, 94, 84, 2, 5, 87].map((x) => {
        return String.fromCharCode(x ^ 103);
      }).join("")).platformState.versionFlags.FGsnBi), 48);
      {
        const t = n + j(globalThis.moduleManager.getModuleByName([110, 107, 105, 105, 102, 60, 62, 108, 61, 110, 106, 110, 102, 61, 62, 109, 62, 103, 57, 107, 111, 61, 58, 109, 103, 104, 57, 105, 107, 105, 59, 107, 59, 104, 106, 102, 108, 58, 61, 111].map((x) => {
          return String.fromCharCode(x ^ 95);
        }).join("")).platformState.versionFlags.msD22k);
        for (let a = 0; a < (2037665391 ^ 2037665519); a++) s.write32(t + j(4 * a), 1985627949 ^ 1985628045);
      }
      s.write64(h + j(globalThis.moduleManager.getModuleByName([114, 119, 117, 117, 122, 32, 34, 112, 33, 114, 118, 114, 122, 33, 34, 113, 34, 123, 37, 119, 115, 33, 38, 113, 123, 116, 37, 117, 119, 117, 39, 119, 39, 116, 118, 122, 112, 38, 33, 115].map((x) => {
        return String.fromCharCode(x ^ 67);
      }).join("")).platformState.versionFlags.PCsIV0), d), s.write64(b + j(globalThis.moduleManager.getModuleByName([3, 6, 4, 4, 11, 81, 83, 1, 80, 3, 7, 3, 11, 80, 83, 0, 83, 10, 84, 6, 2, 80, 87, 0, 10, 5, 84, 4, 6, 4, 86, 6, 86, 5, 7, 11, 1, 87, 80, 2].map((x) => {
        return String.fromCharCode(x ^ 50);
      }).join("")).platformState.versionFlags.oHmyQl), g), s.write32(l + j(globalThis.moduleManager.getModuleByName([123, 126, 124, 124, 115, 41, 43, 121, 40, 123, 127, 123, 115, 40, 43, 120, 43, 114, 44, 126, 122, 40, 47, 120, 114, 125, 44, 124, 126, 124, 46, 126, 46, 125, 127, 115, 121, 47, 40, 122].map((x) => {
        return String.fromCharCode(x ^ 74);
      }).join("")).platformState.versionFlags.LM9blg), 4294967296 + (1381263994 ^ -1381263995)), s.write32(e + j(globalThis.moduleManager.getModuleByName([84, 81, 83, 83, 92, 6, 4, 86, 7, 84, 80, 84, 92, 7, 4, 87, 4, 93, 3, 81, 85, 7, 0, 87, 93, 82, 3, 83, 81, 83, 1, 81, 1, 82, 80, 92, 86, 0, 7, 85].map((x) => {
        return String.fromCharCode(x ^ 101);
      }).join("")).platformState.versionFlags.TLJcwX), 964121976 ^ 964122072);
      for (let t = 0; t < globalThis.moduleManager.getModuleByName([110, 107, 105, 105, 102, 60, 62, 108, 61, 110, 106, 110, 102, 61, 62, 109, 62, 103, 57, 107, 111, 61, 58, 109, 103, 104, 57, 105, 107, 105, 59, 107, 59, 104, 106, 102, 108, 58, 61, 111].map((x) => {
        return String.fromCharCode(x ^ 95);
      }).join("")).platformState.versionFlags.NfRtuR; t += 4) s.write32(this.Cd + j(t), s.read32(o) + t);
    }
    s.write64(e + j(globalThis.moduleManager.getModuleByName([97, 100, 102, 102, 105, 51, 49, 99, 50, 97, 101, 97, 105, 50, 49, 98, 49, 104, 54, 100, 96, 50, 53, 98, 104, 103, 54, 102, 100, 102, 52, 100, 52, 103, 101, 105, 99, 53, 50, 96].map((x) => {
      return String.fromCharCode(x ^ 80);
    }).join("")).platformState.versionFlags.OaAnPR), this.Cd);
    try {
      s.write64(this.Cd + j(globalThis.moduleManager.getModuleByName([127, 122, 120, 120, 119, 45, 47, 125, 44, 127, 123, 127, 119, 44, 47, 124, 47, 118, 40, 122, 126, 44, 43, 124, 118, 121, 40, 120, 122, 120, 42, 122, 42, 121, 123, 119, 125, 43, 44, 126].map((x) => {
        return String.fromCharCode(x ^ 78);
      }).join("")).platformState.versionFlags.qRQJn0), t), s.write64(e + j(globalThis.moduleManager.getModuleByName([70, 67, 65, 65, 78, 20, 22, 68, 21, 70, 66, 70, 78, 21, 22, 69, 22, 79, 17, 67, 71, 21, 18, 69, 79, 64, 17, 65, 67, 65, 19, 67, 19, 64, 66, 78, 68, 18, 21, 71].map((x) => {
        return String.fromCharCode(x ^ 119);
      }).join("")).platformState.versionFlags.SAobkS), a), i.next().value;
    } finally {
      s.write64(e + j(globalThis.moduleManager.getModuleByName([123, 126, 124, 124, 115, 41, 43, 121, 40, 123, 127, 123, 115, 40, 43, 120, 43, 114, 44, 126, 122, 40, 47, 120, 114, 125, 44, 124, 126, 124, 46, 126, 46, 125, 127, 115, 121, 47, 40, 122].map((x) => {
        return String.fromCharCode(x ^ 74);
      }).join("")).platformState.versionFlags.OaAnPR), o), s.write64(b + j(globalThis.moduleManager.getModuleByName([82, 87, 85, 85, 90, 0, 2, 80, 1, 82, 86, 82, 90, 1, 2, 81, 2, 91, 5, 87, 83, 1, 6, 81, 91, 84, 5, 85, 87, 85, 7, 87, 7, 84, 86, 90, 80, 6, 1, 83].map((x) => {
        return String.fromCharCode(x ^ 99);
      }).join("")).platformState.versionFlags.oHmyQl), r);
    }
  }
}
class _t {
  constructor() {
    P.platformState.Dn;
    const t = P.platformState.exploitPrimitive;
    this.ob = new Tt(), this.hb = {
      cb: this.ob.rb([29, 8, 9, 45, 4, 22, 13, 54, 6, 4, 11, 35, 16, 9, 9].map((x) => {
        return String.fromCharCode(x ^ 101);
      }).join(""))
    }, this.ub = t.allocZeroBuffer(32), this._b = t.allocZeroBuffer(48), this.gb = new dt();
  }
  call(t) {
    P.platformState.Dn;
    const a = P.platformState.exploitPrimitive;
    if (0x0n === t.sb) throw new Error("0x0n === t.sb");
    const s = [
    [this.ub, [
    [0, this._b],
    [8, 1],
    [12, 1]]],

    [this._b, [
    [0, 0],
    [8, t.x2],
    [16, t.ib],
    [24, t.bb],
    [32, t.sb],
    [40, 1]]]];


    for (const [t, i] of s)
    for (let [s, b] of i) null == b && (b = 0x0n), a.write64(j(t) + j(s), j(b));
    return this.gb.call({
      ab: this.hb.cb,
      sb: this.ub,
      x1: t.ab,
      x2: t.x1
    });
  }
}
class Tt {
  constructor() {
    const t = P.platformState.Dn;
    P.platformState.exploitPrimitive;
    this.hb = {
      ba: t.nl.ba
    }, this.gb = new dt();
  }
  rb(t) {
    P.platformState.Dn;
    const a = P.platformState.exploitPrimitive,
      [s, i] = a.allocCString(t);
    return this.gb.call({
      ab: this.hb.ba,
      sb: i,
      x1: 0x0n,
      x2: 0x0n
    });
  }
}
return r;