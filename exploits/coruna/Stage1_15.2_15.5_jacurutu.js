let r = {};
const utilityModule = globalThis.moduleManager.getModuleByName("57620206d62079baad0e57e6d9ec93120c0f5247"),
  {
    N: G,
    Vt: m,
    v: o
  } = utilityModule,
  platformModule = globalThis.moduleManager.getModuleByName("14669ca3b1519ba2a8f40be287f646d4d7593eb0");
class E {
  busyWait(A, t, Q = 0) {
    let e = "";
    for (let s = 0; s < t; s += 8) {
      const t = this.read32(A + s + Q),
        n = this.read32(A + s + Q + 4);
      e += G(A + s) + "(" + G(s) + "): " + (i = t, r = n, "0x" + r.toString(16) + "00000000" + i.toString(16).slice(-8)) + "\n";
    }
    var i, r;
  }
  wr(A, t, Q) {
    for (let e = 0; e < Q; e += 4) this.write32(A + e, t);
  }
  copyMemory32(A, t, Q) {
    if (Q % 4 != 0) throw new Error("Q % 4 != 0");
    this.yr = !0;
    for (let e = 0; e < Q; e += 4) this.write32(A.H(e).W(), this.read32(t.H(e).W()));
    this.yr = !1;
  }
  read32FromInt64(A) {
    this.yr = !0;
    const t = this.read32(A.W());
    return this.yr = !1, t;
  }
  readInt64FromInt64(A) {
    this.yr = !0;
    const t = this.read32(A.W()),
      Q = this.read32(A.H(4).W());
    return this.yr = !1, new utilityModule.Int64(t, Q);
  }
  mr(A) {
    this.yr = !0;
    const t = this.read32(A.W()),
      Q = this.read32(A.H(4).W());
    return this.yr = !1, utilityModule.T(t, Q);
  }
  Ar(A) {
    const t = A.it % 4;
    A = A.Bt(t), this.yr = !0;
    const Q = this.read32(A.W()) >> 8 * t & (1299800684 ^ 1299800723);
    return this.yr = !1, Q;
  }
  readStringFromInt64(A, t = 1714237818 ^ 1714237562) {
    let Q = "";
    for (; Q.length < t;) {
      const t = this.Ar(A.H(Q.length));
      if (0 === t) break;
      Q += String.fromCharCode(t);
    }
    return Q;
  }
  Pr(A, t) {
    let Q = "";
    for (; Q.length < t;) {
      const t = this.Ar(A.H(Q.length));
      Q += String.fromCharCode(t);
    }
    return Q;
  }
  readByte(A) {
    const t = A % 4;
    let Q;
    return Q = !0 === this.yr ? utilityModule.q(A, -t) : A - t, this.read32(Q) >> 8 * t & (1966290542 ^ 1966290577);
  }
  readRawBigInt(A) {
    const t = this.read32(A),
      Q = this.read32(A + 4);
    if (Q > o) throw new Error("Q > o");
    return utilityModule.T(t, Q);
  }
  readDoubleAsPointer(A, t = !1) {
    const Q = this.read32(A);
    let e = this.read32(A + 4);
    return (!0 === t || globalThis.moduleManager.getModuleByName("14669ca3b1519ba2a8f40be287f646d4d7593eb0").platformState.versionFlags.zohDDd) && (e &= o), utilityModule.T(Q, e);
  }
  readInt64FromOffset(A) {
    const t = this.read32(A),
      Q = this.read32(A + 4);
    return new utilityModule.Int64(t, Q);
  }
  readString(A, t = 1597399620 ^ 1597399876) {
    let Q = 2020291918 ^ 127191729;
    [30, 5, 29, 18, 21, 2].map((x) => {
      return String.fromCharCode(x ^ 112);
    }).join("") == typeof t && (Q = t);
    let e = "";
    for (; e.length < Q;) {
      const t = this.readByte(A + e.length);
      if (0 === t) break;
      e += String.fromCharCode(t);
    }
    return e;
  }
  Nr(A, t) {
    let Q = "";
    for (; Q.length < t;) {
      const t = this.readByte(A + Q.length);
      Q += String.fromCharCode(t);
    }
    return Q;
  }
  addrof(A) {
    this._r.a = A;
    const t = this.readRawBigInt(this.Wr);
    return this._r.a = null, t;
  }
  pr(A) {
    const t = new DataView(new ArrayBuffer(A.length + 1));
    utilityModule.D(t);
    for (let Q = 0; Q < A.length; Q++) t.setUint8(Q, A.charCodeAt(Q));
    return this.fakeobj(t);
  }
  allocControlledBuffer(A, t = !1) {
    const Q = new ArrayBuffer(A),
      e = new Uint8Array(Q);
    utilityModule.D(Q);
    const i = this.addrof(e),
      r = this.readDoubleAsPointer(i + globalThis.moduleManager.getModuleByName([71, 66, 64, 64, 79, 21, 23, 69, 20, 71, 67, 71, 79, 20, 23, 68, 23, 78, 16, 66, 70, 20, 19, 68, 78, 65, 16, 64, 66, 64, 18, 66, 18, 65, 67, 79, 69, 19, 20, 70].map((x) => {
        return String.fromCharCode(x ^ 118);
      }).join("")).platformState.versionFlags.oGn3OG);
    if (!0 === t) {
      const A = this.addrof(Q),
        t = this.readDoubleAsPointer(A + globalThis.moduleManager.getModuleByName([72, 77, 79, 79, 64, 26, 24, 74, 27, 72, 76, 72, 64, 27, 24, 75, 24, 65, 31, 77, 73, 27, 28, 75, 65, 78, 31, 79, 77, 79, 29, 77, 29, 78, 76, 64, 74, 28, 27, 73].map((x) => {
          return String.fromCharCode(x ^ 121);
        }).join("")).platformState.versionFlags.CN3rr_);
      let e = this.read32(t + globalThis.moduleManager.getModuleByName([0, 5, 7, 7, 8, 82, 80, 2, 83, 0, 4, 0, 8, 83, 80, 3, 80, 9, 87, 5, 1, 83, 84, 3, 9, 6, 87, 7, 5, 7, 85, 5, 85, 6, 4, 8, 2, 84, 83, 1].map((x) => {
        return String.fromCharCode(x ^ 49);
      }).join("")).platformState.versionFlags.EMDU4o);
      e += 32, this.write32(t + globalThis.moduleManager.getModuleByName([125, 120, 122, 122, 117, 47, 45, 127, 46, 125, 121, 125, 117, 46, 45, 126, 45, 116, 42, 120, 124, 46, 41, 126, 116, 123, 42, 122, 120, 122, 40, 120, 40, 123, 121, 117, 127, 41, 46, 124].map((x) => {
        return String.fromCharCode(x ^ 76);
      }).join("")).platformState.versionFlags.EMDU4o, e);
    }
    return r;
  }
  fakeobj(A, t = !1) {
    A instanceof ArrayBuffer && (A = new Int8Array(A));
    const Q = this.addrof(A);
    return this.readDoubleAsPointer(Q + globalThis.moduleManager.getModuleByName([84, 81, 83, 83, 92, 6, 4, 86, 7, 84, 80, 84, 92, 7, 4, 87, 4, 93, 3, 81, 85, 7, 0, 87, 93, 82, 3, 83, 81, 83, 1, 81, 1, 82, 80, 92, 86, 0, 7, 85].map((x) => {
      return String.fromCharCode(x ^ 101);
    }).join("")).platformState.versionFlags.oGn3OG, t);
  }
  withTempOverrides(A, ...t) {
    const Q = new Array(t.length + 10);
    for (let A = 0; A < t.length; A++) Q[A] = this.readInt64FromOffset(t[A].Ir);
    try {
      for (let A = 0; A < t.length; A++) this.writeInt64ToOffset(t[A].Ir, t[A].Zt);
      A();
    } finally {
      for (let A = 0; A < t.length; A++) this.writeInt64ToOffset(t[A].Ir, Q[A]);
    }
  }
  constructor(A, t, Q, e) {
    const i = new Uint8Array([0, 97, 946231116 ^ 946231103, 826626901 ^ 826626872, 1, 0, 0, 0, 1, 17, 4, 96, 0, 1, 1212428661 ^ 1212428553, 96, 1, 1400203094 ^ 1400203050, 0, 96, 0, 1, 1517901910 ^ 1517901865, 96, 1, 1480681551 ^ 1480681520, 0, 3, 5, 4, 0, 1, 2, 3, 4, 4, 1, 1161312360 ^ 1161312280, 0, 1, 6, 27, 3, 1447643496 ^ 1447643414, 1, 66, 961377581 ^ 961377694, 761947713 ^ 761947781, 1865960010 ^ 1865960078, 1096307566 ^ 1096307638, 11, 11, 2003579511 ^ 2003579400, 1, 65, 1148146745 ^ 1148146860, 910383415 ^ 910383514, 927873360 ^ 927873422, 1383223911 ^ 1383223971, 1597008438 ^ 1597008463, 11, 1163883309 ^ 1163883346, 1, 65, 1850833253 ^ 1850833366, 2034985570 ^ 2034985638, 1229419061 ^ 1229419249, 25, 11, 7, 17, 4, 1, 97, 0, 0, 1, 98, 0, 1, 1, 99, 0, 2, 1, 1364608368 ^ 1364608276, 0, 3, 10, 27, 4, 5, 0, 35, 0, 1517506402 ^ 1517506525, 11, 7, 0, 32, 0, 1162504248 ^ 1162504325, 36, 0, 11, 4, 0, 35, 1, 11, 6, 0, 32, 0, 36, 1, 11]).buffer,
      r = new WebAssembly.Module(i, {}),
      s = new WebAssembly.Instance(r, {}),
      n = new WebAssembly.Instance(r, {});
    this.Vr = s, this.Cr = n, this.Kr = "a", this.Xr = "b", this.vr = "c", this.Hr = "d", this.$r = new ArrayBuffer(8), this.Gr = new Uint32Array(this.$r), this._r = {
      a: !1
    }, this.Wr = 0, this.yr = !1;
    for (let A = 0; A < 22; A++) this.Vr.exports[this.vr](0), this.Vr.exports[this.Hr](0, 0), this.Vr.exports[this.Kr](0), this.Vr.exports[this.Xr](0, 0);
    const g = (t) => {
        t[0] = 1;
        const e = A(t);
        return Q(e + globalThis.moduleManager.getModuleByName([97, 100, 102, 102, 105, 51, 49, 99, 50, 97, 101, 97, 105, 50, 49, 98, 49, 104, 54, 100, 96, 50, 53, 98, 104, 103, 54, 102, 100, 102, 52, 100, 52, 103, 101, 105, 99, 53, 50, 96].map((x) => {
          return String.fromCharCode(x ^ 80);
        }).join("")).platformState.versionFlags.zpy6Mu) + globalThis.moduleManager.getModuleByName([115, 118, 116, 116, 123, 33, 35, 113, 32, 115, 119, 115, 123, 32, 35, 112, 35, 122, 36, 118, 114, 32, 39, 112, 122, 117, 36, 116, 118, 116, 38, 118, 38, 117, 119, 123, 113, 39, 32, 114].map((x) => {
          return String.fromCharCode(x ^ 66);
        }).join("")).platformState.versionFlags.xK8SW0;
      },
      o = g(n),
      h = g(s);
    this.Yr = -8, this.Zr = 0, this.jr = Q(o), this.kr = o, t(o, h + this.Zr), this.Qr = this.Cr.exports[this.Kr](), this.Wr = A(this._r) + globalThis.moduleManager.getModuleByName([92, 89, 91, 91, 84, 14, 12, 94, 15, 92, 88, 92, 84, 15, 12, 95, 12, 85, 11, 89, 93, 15, 8, 95, 85, 90, 11, 91, 89, 91, 9, 89, 9, 90, 88, 84, 94, 8, 15, 93].map((x) => {
      return String.fromCharCode(x ^ 109);
    }).join("")).platformState.versionFlags.fGOrHX, e();
  }
  cleanup() {
    const A = JSON.parse([111, 4, 105].map((x) => {
        return String.fromCharCode(x ^ 52);
      }).join("")),
      t = JSON.parse([18, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 101, 105, 121, 103, 120, 20].map((x) => {
        return String.fromCharCode(x ^ 73);
      }).join(""));
    A[0] = !1, t[0] = 1.2;
    const Q = {
        Fr: .1,
        Lr: .2,
        Rr: .3,
        qr: .4
      },
      e = this.addrof(Q),
      i = this.addrof(t),
      r = this.addrof(A),
      s = this.readRawBigInt(i + 8),
      n = this.readRawBigInt(r + 8);
    for (let A = 0; A < 16; A += 4) this.write32(e + 20 + A, this.read32(i + A));
    const g = utilityModule.C(Q.Lr);
    this.copyBigInt(n, e + 20);
    const o = A[0];
    A[0] = void 0, Q.Lr = utilityModule.Y(g, utilityModule._(this.kr) - platformModule.platformState.Fn), Q.Rr = utilityModule.Y(utilityModule.F(this.kr), 1751865938 ^ 1751246476), this.Cr.exports[this.Xr](this.Qr), o[0] = utilityModule.J(this.jr), Q.Lr = utilityModule.Y(g, utilityModule._(s) - platformModule.platformState.Fn), Q.Rr = utilityModule.Y(utilityModule.F(s), 1866875953 ^ 1867315439);
  }
  read32(A) {
    return this.ri(A), this.Vr.exports[this.vr](0) >>> 0;
  }
  write32x2(A, t, Q) {
    this.write32(A, t), this.write32(A + 4, Q);
  }
  write32(A, t) {
    this.ri(A), this.Vr.exports[this.Hr](0 | t);
  }
  copyBigInt(A, t) {
    this.write32(A, t >>> 0), this.write32(A + 4, t / 4294967296 >>> 0);
  }
  writeInt64ToOffset(A, t) {
    this.write32(A, t.it), this.write32(A + 4, t.et);
  }
  ri(A) {
    if (!1 === this.yr) {
      if (A < 0x10000 || A != A) throw new Error("A < 0x10000|| A != A");
      this.Cr.exports[this.Xr](utilityModule.J(A + this.Yr));
    } else this.Cr.exports[this.Xr](utilityModule.q(A, this.Yr));
  }
}

function Q(A, t, Q) {
  A(), window.VHcWaK[1] = Q;
}
r.si = function () {
  const A = 1130706244 ^ 1130706386,
    t = A,
    e = [17, 21, 8, 23, 10, 12, 11].map((x) => {
      return String.fromCharCode(x ^ 120);
    }).join(""),
    i = "f",
    r = 9.4306048228214e-20,
    s = BigInt([8, 64, 11, 90, 94, 92, 92, 13, 1, 8, 12, 12, 11, 9, 89, 13, 92, 0].map((x) => {
      return String.fromCharCode(x ^ 56);
    }).join("")),
    n = 0,
    g = 1;

  function h(A) {
    const t = new Uint8Array(A.length);
    for (let Q = 0; Q < A.length; Q++) t[Q] = A.charCodeAt(Q);
    return t;
  }
  const a = h(atob([14, 8, 9, 53, 45, 30, 10, 14, 14, 14, 14, 13, 59, 30, 6, 12, 22, 14, 14, 14, 22, 5, 22, 13].map((x) => {
      return String.fromCharCode(x ^ 79);
    }).join("")) + "~".repeat(1984785218 ^ 1984785364) + atob([22, 29, 63, 71].map((x) => {
      return String.fromCharCode(x ^ 122);
    }).join("")) + "~".repeat(825313878 ^ 825313984) + atob("Ag8BB2ltcG9ydHMDbW9kAAADAgEBBQQBAQEBBwsCA21lbQIAAWYAAQrBEAG+EABBACAAQQggAUEQIAJBGCADQSAgBEEoIAVBMCAGQTggB0HAACAIQcgAIAlB0AAgCkHYACALQeAAIAxB6AAgDUHwACAOQfgAIA9BgAEgEEGIASARQZABIBJBmAEgE0GgASAUQagBIBVBsAEgFkG4ASAXQcABIBhByAEgGUHQASAaQdgBIBtB4AEgHEHoASAdQfABIB5B+AEgH0GAAiAgQYgCICFBkAIgIkGYAiAjQaACICRBqAIgJUGwAiAmQbgCICdBwAIgKEHIAiApQdACICpB2AIgK0HgAiAsQegCIC1B8AIgLkH4AiAvQYADIDBBiAMgMUGQAyAyQZgDIDNBoAMgNEGoAyA1QbADIDZBuAMgN0HAAyA4QcgDIDlB0AMgOkHYAyA7QeADIDxB6AMgPUHwAyA+QfgDID9BgAQgQEGIBCBBQZAEIEJBmAQgQ0GgBCBEQagEIEVBsAQgRkG4BCBHQcAEIEhByAQgSUHQBCBKQdgEIEtB4AQgTEHoBCBNQfAEIE5B+AQgT0GABSBQQYgFIFFBkAUgUkGYBSBTQaAFIFRBqAUgVUGwBSBWQbgFIFdBwAUgWEHIBSBZQdAFIFpB2AUgW0HgBSBcQegFIF1B8AUgXkH4BSBfQYAGIGBBiAYgYUGQBiBiQZgGIGNBoAYgZEGoBiBlQbAGIGZBuAYgZ0HABiBoQcgGIGlB0AYgakHYBiBrQeAGIGxB6AYgbUHwBiBuQfgGIG9BgAcgcEGIByBxQZAHIHJBmAcgc0GgByB0QagHIHVBsAcgdkG4ByB3QcAHIHhByAcgeUHQByB6QdgHIHtB4AcgfEHoByB9QfAHIH5B+Acgf0GACCCAAUGICCCBAUGQCCCCAUGYCCCDAUGgCCCEAUGoCCCFAUGwCCCGAUG4CCCHAUHACCCIAUHICCCJAUHQCCCKAUHYCCCLAUHgCCCMAUHoCCCNAUHwCCCOAUH4CCCPAUGACSCQAUGICSCRAUGQCSCSAUGYCSCTAUGgCSCUAUGoCSCVAQ==") + atob([36, 29, 43, 43].map((x) => {
      return String.fromCharCode(x ^ 106);
    }).join("")).repeat(1650027120 ^ 1650027238) + atob("EABBACkAAEEIKQAAQRApAABBGCkAAEEgKQAAQSgpAABBMCkAAEE4KQAAQcAAKQAAQcgAKQAAQdAAKQAAQdgAKQAAQeAAKQAAQegAKQAAQfAAKQAAQfgAKQAAQYABKQAAQYgBKQAAQZABKQAAQZgBKQAAQaABKQAAQagBKQAAQbABKQAAQbgBKQAAQcABKQAAQcgBKQAAQdABKQAAQdgBKQAAQeABKQAAQegBKQAAQfABKQAAQfgBKQAAQYACKQAAQYgCKQAAQZACKQAAQZgCKQAAQaACKQAAQagCKQAAQbACKQAAQbgCKQAAQcACKQAAQcgCKQAAQdACKQAAQdgCKQAAQeACKQAAQegCKQAAQfACKQAAQfgCKQAAQYADKQAAQYgDKQAAQZADKQAAQZgDKQAAQaADKQAAQagDKQAAQbADKQAAQbgDKQAAQcADKQAAQcgDKQAAQdADKQAAQdgDKQAAQeADKQAAQegDKQAAQfADKQAAQfgDKQAAQYAEKQAAQYgEKQAAQZAEKQAAQZgEKQAAQaAEKQAAQagEKQAAQbAEKQAAQbgEKQAAQcAEKQAAQcgEKQAAQdAEKQAAQdgEKQAAQeAEKQAAQegEKQAAQfAEKQAAQfgEKQAAQYAFKQAAQYgFKQAAQZAFKQAAQZgFKQAAQaAFKQAAQagFKQAAQbAFKQAAQbgFKQAAQcAFKQAAQcgFKQAAQdAFKQAAQdgFKQAAQeAFKQAAQegFKQAAQfAFKQAAQfgFKQAAQYAGKQAAQYgGKQAAQZAGKQAAQZgGKQAAQaAGKQAAQagGKQAAQbAGKQAAQbgGKQAAQcAGKQAAQcgGKQAAQdAGKQAAQdgGKQAAQeAGKQAAQegGKQAAQfAGKQAAQfgGKQAAQYAHKQAAQYgHKQAAQZAHKQAAQZgHKQAAQaAHKQAAQagHKQAAQbAHKQAAQbgHKQAAQcAHKQAAQcgHKQAAQdAHKQAAQdgHKQAAQeAHKQAAQegHKQAAQfAHKQAAQfgHKQAAQYAIKQAAQYgIKQAAQZAIKQAAQZgIKQAAQaAIKQAAQagIKQAAQbAIKQAAQbgIKQAAQcAIKQAAQcgIKQAAQdAIKQAAQdgIKQAAQeAIKQAAQegIKQAAQfAIKQAAQfgIKQAAQYAJKQAAQYgJKQAAQZAJKQAAQZgJKQAAQaAJKQAAQagJKQAACw==")),
    B = h(atob([21, 19, 18, 46, 54, 5, 17, 21, 21, 21, 21, 22, 22, 35, 30, 51, 21, 21, 22, 51, 21, 21, 21, 23, 60, 55, 21, 18, 51, 17, 21, 28, 53, 3, 101, 35, 54, 103, 30, 100, 55, 35, 26, 57, 48, 3, 96, 21, 21, 21, 105, 105].map((x) => {
      return String.fromCharCode(x ^ 84);
    }).join("")) + atob([52, 68, 26, 2, 21, 49, 79, 15, 18, 62, 59, 55, 55, 55, 51, 75].map((x) => {
      return String.fromCharCode(x ^ 118);
    }).join("")).repeat(893858670 ^ 893856913) + atob([112, 70, 120, 115, 112, 96, 82, 121, 112, 96, 123, 92, 124, 86, 114, 112, 96, 112, 94, 118, 112, 96, 96, 112, 116, 112, 112, 125].map((x) => {
      return String.fromCharCode(x ^ 49);
    }).join(""))),
    K = h(atob([12, 10, 11, 55, 47, 28, 8, 12, 12, 12, 12, 15, 62, 42, 4, 15, 20, 7, 20, 15].map((x) => {
      return String.fromCharCode(x ^ 77);
    }).join("")) + "~".repeat(1331844939 ^ 1331845085) + atob([41, 34, 0, 120].map((x) => {
      return String.fromCharCode(x ^ 69);
    }).join("")) + "~".repeat(1734894158 ^ 1734894296) + atob([53, 40, 58, 48, 48, 40, 51, 48].map((x) => {
      return String.fromCharCode(x ^ 113);
    }).join("")) + atob([12, 12, 112, 112].map((x) => {
      return String.fromCharCode(x ^ 77);
    }).join("")).repeat(2050573361 ^ 2050556977) + atob([55, 34, 62, 49, 50, 50, 50, 78].map((x) => {
      return String.fromCharCode(x ^ 115);
    }).join("")));

  function c() {}
  window.VHcWaK = new Array(16).fill([]).map((A, t) => {
    const Q = JSON.parse([45, 71, 88, 71, 90, 86, 71, 88, 68, 90, 86, 69, 88, 68, 43].map((x) => {
      return String.fromCharCode(x ^ 118);
    }).join(""));
    return Q[0] = .1 + t, Q["a" + t] = t, Q;
  });
  const b = function () {
      const o = {
          mode: n,
          AA: BigInt(0),
          A: !1
        },
        h = {
          fun: function (t) {
            const Q = new WebAssembly.Module(a),
              r = new WebAssembly.Instance(Q, {
                [e]: {
                  mod: function (t) {
                    t.A = !1;
                    const Q = new BigUint64Array(r.exports.mem.buffer);
                    for (let e = 0; e < A - 1; e++)
                    if (Q[e] === s) {
                      t.mode === n ? (t.A = !0, t.AA = Q[e + 1]) : t.mode === g && (t.A = !0, Q[e + 1] = t.AA);
                      break;
                    }
                  }.bind(null, t)
                }
              });
            return r.exports[i];
          }(o),
          "": c
        },
        b = [];
      for (let A = 0; A < (1414746221 ^ 1414746521); A++) b.push(new WebAssembly.Table({
        initial: 1783847238 ^ 1783855430,
        element: [93, 64, 76, 93, 74, 86, 74, 93, 94].map((x) => {
          return String.fromCharCode(x ^ 56);
        }).join("")
      }));
      for (let A = 0; A < 4; A++) b[(1380205894 ^ 1380205742) + 3 * A].grow(1786067060 ^ 1786058869);
      const f = [];
      for (let A = 0; A < 2; A++) f[A] = new WebAssembly.Module(B);
      for (let A = 0; A < 4; A++) b[(1163475029 ^ 1163475378) + 3 * A].grow(1479889253 ^ 1479897444);
      for (let A = 0; A < 1; A++) b.push(new WebAssembly.Table({
        initial: 1093890903 ^ 1093882711,
        element: [92, 65, 77, 92, 75, 87, 75, 92, 95].map((x) => {
          return String.fromCharCode(x ^ 57);
        }).join("")
      }));
      const l = [];
      for (let A = 0; A < 2; A++) l[A] = new WebAssembly.Module(K);
      let C = null;
      for (let A = 0; A < f.length; A++) try {
        C = new WebAssembly.Instance(f[A], {
          [e]: h
        });
        break;
      } catch (A) {}
      if (null === C) throw new Error("null === C");
      const w = new Array(t - 2);
      return {
        tA: function (A) {
          if (o.A = !1, o.mode = n, Q(C.exports.f2, r, A, ...w), !o.A) throw new Error("o.A = !1, o.mode = n, Q(C.exports.f2, r, A, ...w), !o.A");
          return o.AA;
        },
        QA: function (A) {
          if (o.A = !1, o.mode = g, o.AA = A, Q(C.exports.f2, r, null, ...w), !o.A) throw new Error("o.A = !1, o.mode = g, o.AA = A, Q(C.exports.f2, r, null, ...w), !o.A");
        }
      };
    }(),
    f = utilityModule.Z(1, 0, 34, 7),
    l = {
      a: .1,
      b: .2,
      c: .3,
      d: .4
    },
    C = {
      a: .1,
      b: .1,
      e: .1
    };
  C.b = new Array(2);
  const w = b.tA(l),
    d = b.tA(C),
    u = w + BigInt(20);
  const I = utilityModule.T(Number((d & BigInt(4294967296 + (1903440484 ^ -1903440485))).toString()), Number((d >> BigInt(32)).toString())),
    G = new Function("b", "L2", [75, 65, 29].map((x) => {
      return String.fromCharCode(x ^ 45);
    }).join(""), [8, 35, 59].map((x) => {
      return String.fromCharCode(x ^ 87);
    }).join(""), [13, 2, 68, 76, 2, 8, 84, 77, 68, 31, 68, 6, 63, 40, 86, 57, 63, 84, 57, 68, 89, 68, 59, 16, 8, 95, 68, 22, 1, 16, 17, 22, 10, 68, 84, 95, 68, 25, 68, 1, 8, 23, 1, 68, 31, 68, 22, 1, 16, 17, 22, 10, 68, 6, 63, 40, 86, 57, 63, 84, 57, 95, 68, 25].map((x) => {
      return String.fromCharCode(x ^ 100);
    }).join(""));
  for (let A = 0; A < (1731217207 ^ 1731314071); A++) G(window.VHcWaK, A % window.VHcWaK.length, !0, A + .1), G(window.VHcWaK, A % window.VHcWaK.length, !1, 0);

  function U(A) {
    const t = utilityModule._(A),
      Q = utilityModule.F(A);
    l.b = utilityModule.Y(f, t - (910241864 ^ 910372936)), l.c = utilityModule.Y(Q, 2035439692 ^ 2036180915);
    const e = G(window.VHcWaK, 1, !1, 0);
    return utilityModule.P(e);
  }
  b.QA(BigInt(u));
  const H = new E(function (A) {
    return C.b = A, U(I + 24);
  }, function (A, t) {
    const Q = utilityModule._(A),
      e = utilityModule.F(A),
      i = utilityModule.J(t);
    l.b = utilityModule.Y(f, Q - (2053727842 ^ 2053858914)), l.c = utilityModule.Y(e, 1868713291 ^ 1869460148), G(window.VHcWaK, 1, !0, i);
  }, U, function () {
    window.VHcWaK[1] = null, window.VHcWaK.length = 0;
  });
  platformModule.platformState.exploitPrimitive = H;
  const y = new Uint32Array(4);
  class Y {
    constructor(A, t) {
      if (A < 0 || A > 4294967296 + (1231440435 ^ -1231440436)) throw new Error("A < 0 || A > 4294967296 + (1231440435 ^ -1231440436)");
      if (t < 0 || t > 4294967296 + (2018474571 ^ -2018474572)) throw new Error("t < 0 || t > 4294967296 + (2018474571 ^ -2018474572)");
      this.ci = A, this.fi = t;
    }
    static null() {
      return new Y(0, 0);
    }
    static li(A) {
      const t = platformModule.platformState.exploitPrimitive.addrof(A);
      return Y.ut(t);
    }
    static bi(A) {
      const t = platformModule.platformState.exploitPrimitive.fakeobj(A);
      return Y.ut(t);
    }
    static ut(A) {
      return new Y(A >>> 0, A / 4294967296 >>> 0);
    }
    static L(A) {
      return new Y(utilityModule.C(A), utilityModule.H(A));
    }
    static ui(A) {
      return new Y(A, 0);
    }
    static wi(A, t) {
      return new Y(A, t);
    }
    di() {
      return 4294967296 * this.fi + this.ci;
    }
    gi() {
      return new m(this.ci, this.fi);
    }
    yi() {
      if (0 !== this.fi) throw new Error("0 !== this.fi");
      return this.ci;
    }
    readRawBigInt() {
      const A = platformModule.platformState.exploitPrimitive.read32(this.di()),
        t = platformModule.platformState.exploitPrimitive.read32(this.di() + 4);
      return new Y(A, t);
    }
    readString(A = 1870098266 ^ 1870098238) {
      return platformModule.platformState.exploitPrimitive.readString(this.di(), A);
    }
    copyBigInt(A) {
      platformModule.platformState.exploitPrimitive.write32(this.di(), A.ci), platformModule.platformState.exploitPrimitive.write32(this.di() + 4, A.fi);
    }
    Ui(A) {
      platformModule.platformState.exploitPrimitive.write32(this.di(), A);
    }
    mi() {
      return platformModule.platformState.exploitPrimitive.read32(this.di());
    }
    Ai() {
      return this.fi > o;
    }
    Ti() {
      return 0 === this.ci && 0 === this.fi;
    }
    lt(A) {
      return this.ci === A.ci && this.fi === A.fi;
    }
    Pi(A) {
      return this.fi === A.fi ? this.ci >= A.ci : this.fi >= A.fi;
    }
    Si(A) {
      return this.fi === A.fi ? this.ci <= A.ci : this.fi <= A.fi;
    }
    add(A) {
      if (A instanceof Y == !1) throw new Error("A instanceof Y == !1");
      if (y[0] = this.ci, y[1] = this.ci + A.ci, y[2] = this.fi, y[3] = this.fi + A.fi, y[1] < y[0] && (y[3] += 1), y[3] < y[2]) throw new Error("y[0] = this.ci, y[1] = this.ci + A.ci, y[2] = this.fi, y[3] = this.fi + A.fi, y[1] < y[0] && (y[3] += 1), y[3] < y[2]");
      return new Y(y[1], y[3]);
    }
    sub(A) {
      if (A instanceof Y == !1) throw new Error("A instanceof Y == !1");
      if (y[0] = this.ci, y[1] = this.ci - A.ci, y[2] = this.fi, y[3] = this.fi - A.fi, y[1] > y[0] && (y[3] -= 1), y[2] < y[3]) throw new Error("y[0] = this.ci, y[1] = this.ci - A.ci, y[2] = this.fi, y[3] = this.fi - A.fi, y[1] > y[0] && (y[3] -= 1), y[2] < y[3]");
      return new Y(y[1], y[3]);
    }
    H(A) {
      return this.add(Y.ui(A));
    }
    Bt(A) {
      return this.sub(Y.ui(A));
    }
    Di() {
      return this.ci;
    }
    Ei() {
      return this.fi;
    }
    Dt() {
      return new Y(this.ci, this.fi & o);
    }
    toString() {
      let A = this.ci.toString(16);
      return this.fi && (A = this.fi.toString(16) + ([122, 122, 122, 122, 122, 122, 122, 122].map((x) => {
        return String.fromCharCode(x ^ 74);
      }).join("") + A).slice(-8)), [98, 42].map((x) => {
        return String.fromCharCode(x ^ 82);
      }).join("") + A;
    }
  }
  platformModule.platformState.Ln = Y;
};
return r;