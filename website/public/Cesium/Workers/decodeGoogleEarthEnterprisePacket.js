define(['./RuntimeError-346a3079', './when-4bbc8319', './createTaskProcessorWorker'], function (e, t, i) {
  'use strict'
  function r(t, i) {
    if (r.passThroughDataForTesting) return i
    var n = t.byteLength
    if (0 === n || n % 4 != 0) throw new e.RuntimeError('The length of key must be greater than 0 and a multiple of 4.')
    var a = new DataView(i),
      o = a.getUint32(0, !0)
    if (1953029805 === o || 2917034100 === o) return i
    for (var s, f = new DataView(t), l = 0, d = i.byteLength, h = d - (d % 8), c = n, u = 8; l < h; )
      for (s = u = (u + 8) % 24; l < h && s < c; )
        a.setUint32(l, a.getUint32(l, !0) ^ f.getUint32(s, !0), !0),
          a.setUint32(l + 4, a.getUint32(l + 4, !0) ^ f.getUint32(s + 4, !0), !0),
          (l += 8),
          (s += 24)
    if (l < d) for (s >= c && (s = u = (u + 8) % 24); l < d; ) a.setUint8(l, a.getUint8(l) ^ f.getUint8(s)), l++, s++
  }
  function n(e, t) {
    return 0 != (e & t)
  }
  r.passThroughDataForTesting = !1
  var a = [1, 2, 4, 8]
  function o(e, t, i, r, n, a) {
    ;(this._bits = e),
      (this.cnodeVersion = t),
      (this.imageryVersion = i),
      (this.terrainVersion = r),
      (this.imageryProvider = n),
      (this.terrainProvider = a),
      (this.ancestorHasTerrain = !1),
      (this.terrainState = void 0)
  }
  ;(o.clone = function (e, i) {
    return (
      t.defined(i)
        ? ((i._bits = e._bits),
          (i.cnodeVersion = e.cnodeVersion),
          (i.imageryVersion = e.imageryVersion),
          (i.terrainVersion = e.terrainVersion),
          (i.imageryProvider = e.imageryProvider),
          (i.terrainProvider = e.terrainProvider))
        : (i = new o(e._bits, e.cnodeVersion, e.imageryVersion, e.terrainVersion, e.imageryProvider, e.terrainProvider)),
      (i.ancestorHasTerrain = e.ancestorHasTerrain),
      (i.terrainState = e.terrainState),
      i
    )
  }),
    (o.prototype.setParent = function (e) {
      this.ancestorHasTerrain = e.ancestorHasTerrain || this.hasTerrain()
    }),
    (o.prototype.hasSubtree = function () {
      return n(this._bits, 16)
    }),
    (o.prototype.hasImagery = function () {
      return n(this._bits, 64)
    }),
    (o.prototype.hasTerrain = function () {
      return n(this._bits, 128)
    }),
    (o.prototype.hasChildren = function () {
      return n(this._bits, 15)
    }),
    (o.prototype.hasChild = function (e) {
      return n(this._bits, a[e])
    }),
    (o.prototype.getChildBitmask = function () {
      return 15 & this._bits
    })
  var s = t.createCommonjsModule(function (e, t) {
    var i = 'undefined' != typeof Uint8Array && 'undefined' != typeof Uint16Array && 'undefined' != typeof Int32Array
    function r(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }
    ;(t.assign = function (e) {
      for (var t = Array.prototype.slice.call(arguments, 1); t.length; ) {
        var i = t.shift()
        if (i) {
          if ('object' != typeof i) throw new TypeError(i + 'must be non-object')
          for (var n in i) r(i, n) && (e[n] = i[n])
        }
      }
      return e
    }),
      (t.shrinkBuf = function (e, t) {
        return e.length === t ? e : e.subarray ? e.subarray(0, t) : ((e.length = t), e)
      })
    var n = {
        arraySet: function (e, t, i, r, n) {
          if (t.subarray && e.subarray) e.set(t.subarray(i, i + r), n)
          else for (var a = 0; a < r; a++) e[n + a] = t[i + a]
        },
        flattenChunks: function (e) {
          var t, i, r, n, a, o
          for (r = 0, t = 0, i = e.length; t < i; t++) r += e[t].length
          for (o = new Uint8Array(r), n = 0, t = 0, i = e.length; t < i; t++) (a = e[t]), o.set(a, n), (n += a.length)
          return o
        }
      },
      a = {
        arraySet: function (e, t, i, r, n) {
          for (var a = 0; a < r; a++) e[n + a] = t[i + a]
        },
        flattenChunks: function (e) {
          return [].concat.apply([], e)
        }
      }
    ;(t.setTyped = function (e) {
      e
        ? ((t.Buf8 = Uint8Array), (t.Buf16 = Uint16Array), (t.Buf32 = Int32Array), t.assign(t, n))
        : ((t.Buf8 = Array), (t.Buf16 = Array), (t.Buf32 = Array), t.assign(t, a))
    }),
      t.setTyped(i)
  })
  var f = function (e, t, i, r) {
    for (var n = (65535 & e) | 0, a = ((e >>> 16) & 65535) | 0, o = 0; 0 !== i; ) {
      i -= o = i > 2e3 ? 2e3 : i
      do {
        a = (a + (n = (n + t[r++]) | 0)) | 0
      } while (--o)
      ;(n %= 65521), (a %= 65521)
    }
    return n | (a << 16) | 0
  }
  var l = (function () {
    for (var e, t = [], i = 0; i < 256; i++) {
      e = i
      for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1
      t[i] = e
    }
    return t
  })()
  var d = function (e, t, i, r) {
      var n = l,
        a = r + i
      e ^= -1
      for (var o = r; o < a; o++) e = (e >>> 8) ^ n[255 & (e ^ t[o])]
      return -1 ^ e
    },
    h = function (e, t) {
      var i, r, n, a, o, s, f, l, d, h, c, u, w, b, m, v, g, k, p, y, _, x, B, E, A
      ;(i = e.state),
        (r = e.next_in),
        (E = e.input),
        (n = r + (e.avail_in - 5)),
        (a = e.next_out),
        (A = e.output),
        (o = a - (t - e.avail_out)),
        (s = a + (e.avail_out - 257)),
        (f = i.dmax),
        (l = i.wsize),
        (d = i.whave),
        (h = i.wnext),
        (c = i.window),
        (u = i.hold),
        (w = i.bits),
        (b = i.lencode),
        (m = i.distcode),
        (v = (1 << i.lenbits) - 1),
        (g = (1 << i.distbits) - 1)
      e: do {
        w < 15 && ((u += E[r++] << w), (w += 8), (u += E[r++] << w), (w += 8)), (k = b[u & v])
        t: for (;;) {
          if (((u >>>= p = k >>> 24), (w -= p), 0 === (p = (k >>> 16) & 255))) A[a++] = 65535 & k
          else {
            if (!(16 & p)) {
              if (0 == (64 & p)) {
                k = b[(65535 & k) + (u & ((1 << p) - 1))]
                continue t
              }
              if (32 & p) {
                i.mode = 12
                break e
              }
              ;(e.msg = 'invalid literal/length code'), (i.mode = 30)
              break e
            }
            ;(y = 65535 & k),
              (p &= 15) && (w < p && ((u += E[r++] << w), (w += 8)), (y += u & ((1 << p) - 1)), (u >>>= p), (w -= p)),
              w < 15 && ((u += E[r++] << w), (w += 8), (u += E[r++] << w), (w += 8)),
              (k = m[u & g])
            i: for (;;) {
              if (((u >>>= p = k >>> 24), (w -= p), !(16 & (p = (k >>> 16) & 255)))) {
                if (0 == (64 & p)) {
                  k = m[(65535 & k) + (u & ((1 << p) - 1))]
                  continue i
                }
                ;(e.msg = 'invalid distance code'), (i.mode = 30)
                break e
              }
              if (
                ((_ = 65535 & k),
                w < (p &= 15) && ((u += E[r++] << w), (w += 8) < p && ((u += E[r++] << w), (w += 8))),
                (_ += u & ((1 << p) - 1)) > f)
              ) {
                ;(e.msg = 'invalid distance too far back'), (i.mode = 30)
                break e
              }
              if (((u >>>= p), (w -= p), _ > (p = a - o))) {
                if ((p = _ - p) > d && i.sane) {
                  ;(e.msg = 'invalid distance too far back'), (i.mode = 30)
                  break e
                }
                if (((x = 0), (B = c), 0 === h)) {
                  if (((x += l - p), p < y)) {
                    y -= p
                    do {
                      A[a++] = c[x++]
                    } while (--p)
                    ;(x = a - _), (B = A)
                  }
                } else if (h < p) {
                  if (((x += l + h - p), (p -= h) < y)) {
                    y -= p
                    do {
                      A[a++] = c[x++]
                    } while (--p)
                    if (((x = 0), h < y)) {
                      y -= p = h
                      do {
                        A[a++] = c[x++]
                      } while (--p)
                      ;(x = a - _), (B = A)
                    }
                  }
                } else if (((x += h - p), p < y)) {
                  y -= p
                  do {
                    A[a++] = c[x++]
                  } while (--p)
                  ;(x = a - _), (B = A)
                }
                for (; y > 2; ) (A[a++] = B[x++]), (A[a++] = B[x++]), (A[a++] = B[x++]), (y -= 3)
                y && ((A[a++] = B[x++]), y > 1 && (A[a++] = B[x++]))
              } else {
                x = a - _
                do {
                  ;(A[a++] = A[x++]), (A[a++] = A[x++]), (A[a++] = A[x++]), (y -= 3)
                } while (y > 2)
                y && ((A[a++] = A[x++]), y > 1 && (A[a++] = A[x++]))
              }
              break
            }
          }
          break
        }
      } while (r < n && a < s)
      ;(r -= y = w >> 3),
        (u &= (1 << (w -= y << 3)) - 1),
        (e.next_in = r),
        (e.next_out = a),
        (e.avail_in = r < n ? n - r + 5 : 5 - (r - n)),
        (e.avail_out = a < s ? s - a + 257 : 257 - (a - s)),
        (i.hold = u),
        (i.bits = w)
    },
    c = 15,
    u = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
    w = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
    b = [
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0,
      0
    ],
    m = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64],
    v = function (e, t, i, r, n, a, o, f) {
      var l,
        d,
        h,
        v,
        g,
        k,
        p,
        y,
        _,
        x = f.bits,
        B = 0,
        E = 0,
        A = 0,
        T = 0,
        U = 0,
        S = 0,
        R = 0,
        C = 0,
        I = 0,
        z = 0,
        D = null,
        V = 0,
        P = new s.Buf16(16),
        O = new s.Buf16(16),
        M = null,
        j = 0
      for (B = 0; B <= c; B++) P[B] = 0
      for (E = 0; E < r; E++) P[t[i + E]]++
      for (U = x, T = c; T >= 1 && 0 === P[T]; T--);
      if ((U > T && (U = T), 0 === T)) return (n[a++] = 20971520), (n[a++] = 20971520), (f.bits = 1), 0
      for (A = 1; A < T && 0 === P[A]; A++);
      for (U < A && (U = A), C = 1, B = 1; B <= c; B++) if (((C <<= 1), (C -= P[B]) < 0)) return -1
      if (C > 0 && (0 === e || 1 !== T)) return -1
      for (O[1] = 0, B = 1; B < c; B++) O[B + 1] = O[B] + P[B]
      for (E = 0; E < r; E++) 0 !== t[i + E] && (o[O[t[i + E]]++] = E)
      if (
        (0 === e ? ((D = M = o), (k = 19)) : 1 === e ? ((D = u), (V -= 257), (M = w), (j -= 257), (k = 256)) : ((D = b), (M = m), (k = -1)),
        (z = 0),
        (E = 0),
        (B = A),
        (g = a),
        (S = U),
        (R = 0),
        (h = -1),
        (v = (I = 1 << U) - 1),
        (1 === e && I > 852) || (2 === e && I > 592))
      )
        return 1
      for (;;) {
        ;(p = B - R),
          o[E] < k ? ((y = 0), (_ = o[E])) : o[E] > k ? ((y = M[j + o[E]]), (_ = D[V + o[E]])) : ((y = 96), (_ = 0)),
          (l = 1 << (B - R)),
          (A = d = 1 << S)
        do {
          n[g + (z >> R) + (d -= l)] = (p << 24) | (y << 16) | _ | 0
        } while (0 !== d)
        for (l = 1 << (B - 1); z & l; ) l >>= 1
        if ((0 !== l ? ((z &= l - 1), (z += l)) : (z = 0), E++, 0 == --P[B])) {
          if (B === T) break
          B = t[i + o[E]]
        }
        if (B > U && (z & v) !== h) {
          for (0 === R && (R = U), g += A, C = 1 << (S = B - R); S + R < T && !((C -= P[S + R]) <= 0); ) S++, (C <<= 1)
          if (((I += 1 << S), (1 === e && I > 852) || (2 === e && I > 592))) return 1
          n[(h = z & v)] = (U << 24) | (S << 16) | (g - a) | 0
        }
      }
      return 0 !== z && (n[g + z] = ((B - R) << 24) | (64 << 16) | 0), (f.bits = U), 0
    },
    g = -2,
    k = 12,
    p = 30
  function y(e) {
    return ((e >>> 24) & 255) + ((e >>> 8) & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
  }
  function _() {
    ;(this.mode = 0),
      (this.last = !1),
      (this.wrap = 0),
      (this.havedict = !1),
      (this.flags = 0),
      (this.dmax = 0),
      (this.check = 0),
      (this.total = 0),
      (this.head = null),
      (this.wbits = 0),
      (this.wsize = 0),
      (this.whave = 0),
      (this.wnext = 0),
      (this.window = null),
      (this.hold = 0),
      (this.bits = 0),
      (this.length = 0),
      (this.offset = 0),
      (this.extra = 0),
      (this.lencode = null),
      (this.distcode = null),
      (this.lenbits = 0),
      (this.distbits = 0),
      (this.ncode = 0),
      (this.nlen = 0),
      (this.ndist = 0),
      (this.have = 0),
      (this.next = null),
      (this.lens = new s.Buf16(320)),
      (this.work = new s.Buf16(288)),
      (this.lendyn = null),
      (this.distdyn = null),
      (this.sane = 0),
      (this.back = 0),
      (this.was = 0)
  }
  function x(e) {
    var t
    return e && e.state
      ? ((t = e.state),
        (e.total_in = e.total_out = t.total = 0),
        (e.msg = ''),
        t.wrap && (e.adler = 1 & t.wrap),
        (t.mode = 1),
        (t.last = 0),
        (t.havedict = 0),
        (t.dmax = 32768),
        (t.head = null),
        (t.hold = 0),
        (t.bits = 0),
        (t.lencode = t.lendyn = new s.Buf32(852)),
        (t.distcode = t.distdyn = new s.Buf32(592)),
        (t.sane = 1),
        (t.back = -1),
        0)
      : g
  }
  function B(e) {
    var t
    return e && e.state ? (((t = e.state).wsize = 0), (t.whave = 0), (t.wnext = 0), x(e)) : g
  }
  function E(e, t) {
    var i, r
    return e && e.state
      ? ((r = e.state),
        t < 0 ? ((i = 0), (t = -t)) : ((i = 1 + (t >> 4)), t < 48 && (t &= 15)),
        t && (t < 8 || t > 15) ? g : (null !== r.window && r.wbits !== t && (r.window = null), (r.wrap = i), (r.wbits = t), B(e)))
      : g
  }
  function A(e, t) {
    var i, r
    return e ? ((r = new _()), (e.state = r), (r.window = null), 0 !== (i = E(e, t)) && (e.state = null), i) : g
  }
  var T,
    U,
    S = !0
  function R(e) {
    if (S) {
      var t
      for (T = new s.Buf32(512), U = new s.Buf32(32), t = 0; t < 144; ) e.lens[t++] = 8
      for (; t < 256; ) e.lens[t++] = 9
      for (; t < 280; ) e.lens[t++] = 7
      for (; t < 288; ) e.lens[t++] = 8
      for (v(1, e.lens, 0, 288, T, 0, e.work, { bits: 9 }), t = 0; t < 32; ) e.lens[t++] = 5
      v(2, e.lens, 0, 32, U, 0, e.work, { bits: 5 }), (S = !1)
    }
    ;(e.lencode = T), (e.lenbits = 9), (e.distcode = U), (e.distbits = 5)
  }
  function C(e, t, i, r) {
    var n,
      a = e.state
    return (
      null === a.window && ((a.wsize = 1 << a.wbits), (a.wnext = 0), (a.whave = 0), (a.window = new s.Buf8(a.wsize))),
      r >= a.wsize
        ? (s.arraySet(a.window, t, i - a.wsize, a.wsize, 0), (a.wnext = 0), (a.whave = a.wsize))
        : ((n = a.wsize - a.wnext) > r && (n = r),
          s.arraySet(a.window, t, i - r, n, a.wnext),
          (r -= n)
            ? (s.arraySet(a.window, t, i - r, r, 0), (a.wnext = r), (a.whave = a.wsize))
            : ((a.wnext += n), a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += n))),
      0
    )
  }
  var I = {
      inflateReset: B,
      inflateReset2: E,
      inflateResetKeep: x,
      inflateInit: function (e) {
        return A(e, 15)
      },
      inflateInit2: A,
      inflate: function (e, t) {
        var i,
          r,
          n,
          a,
          o,
          l,
          c,
          u,
          w,
          b,
          m,
          _,
          x,
          B,
          E,
          A,
          T,
          U,
          S,
          I,
          z,
          D,
          V,
          P,
          O = 0,
          M = new s.Buf8(4),
          j = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
        if (!e || !e.state || !e.output || (!e.input && 0 !== e.avail_in)) return g
        ;(i = e.state).mode === k && (i.mode = 13),
          (o = e.next_out),
          (n = e.output),
          (c = e.avail_out),
          (a = e.next_in),
          (r = e.input),
          (l = e.avail_in),
          (u = i.hold),
          (w = i.bits),
          (b = l),
          (m = c),
          (D = 0)
        e: for (;;)
          switch (i.mode) {
            case 1:
              if (0 === i.wrap) {
                i.mode = 13
                break
              }
              for (; w < 16; ) {
                if (0 === l) break e
                l--, (u += r[a++] << w), (w += 8)
              }
              if (2 & i.wrap && 35615 === u) {
                ;(i.check = 0), (M[0] = 255 & u), (M[1] = (u >>> 8) & 255), (i.check = d(i.check, M, 2, 0)), (u = 0), (w = 0), (i.mode = 2)
                break
              }
              if (((i.flags = 0), i.head && (i.head.done = !1), !(1 & i.wrap) || (((255 & u) << 8) + (u >> 8)) % 31)) {
                ;(e.msg = 'incorrect header check'), (i.mode = p)
                break
              }
              if (8 != (15 & u)) {
                ;(e.msg = 'unknown compression method'), (i.mode = p)
                break
              }
              if (((w -= 4), (z = 8 + (15 & (u >>>= 4))), 0 === i.wbits)) i.wbits = z
              else if (z > i.wbits) {
                ;(e.msg = 'invalid window size'), (i.mode = p)
                break
              }
              ;(i.dmax = 1 << z), (e.adler = i.check = 1), (i.mode = 512 & u ? 10 : k), (u = 0), (w = 0)
              break
            case 2:
              for (; w < 16; ) {
                if (0 === l) break e
                l--, (u += r[a++] << w), (w += 8)
              }
              if (((i.flags = u), 8 != (255 & i.flags))) {
                ;(e.msg = 'unknown compression method'), (i.mode = p)
                break
              }
              if (57344 & i.flags) {
                ;(e.msg = 'unknown header flags set'), (i.mode = p)
                break
              }
              i.head && (i.head.text = (u >> 8) & 1),
                512 & i.flags && ((M[0] = 255 & u), (M[1] = (u >>> 8) & 255), (i.check = d(i.check, M, 2, 0))),
                (u = 0),
                (w = 0),
                (i.mode = 3)
            case 3:
              for (; w < 32; ) {
                if (0 === l) break e
                l--, (u += r[a++] << w), (w += 8)
              }
              i.head && (i.head.time = u),
                512 & i.flags &&
                  ((M[0] = 255 & u), (M[1] = (u >>> 8) & 255), (M[2] = (u >>> 16) & 255), (M[3] = (u >>> 24) & 255), (i.check = d(i.check, M, 4, 0))),
                (u = 0),
                (w = 0),
                (i.mode = 4)
            case 4:
              for (; w < 16; ) {
                if (0 === l) break e
                l--, (u += r[a++] << w), (w += 8)
              }
              i.head && ((i.head.xflags = 255 & u), (i.head.os = u >> 8)),
                512 & i.flags && ((M[0] = 255 & u), (M[1] = (u >>> 8) & 255), (i.check = d(i.check, M, 2, 0))),
                (u = 0),
                (w = 0),
                (i.mode = 5)
            case 5:
              if (1024 & i.flags) {
                for (; w < 16; ) {
                  if (0 === l) break e
                  l--, (u += r[a++] << w), (w += 8)
                }
                ;(i.length = u),
                  i.head && (i.head.extra_len = u),
                  512 & i.flags && ((M[0] = 255 & u), (M[1] = (u >>> 8) & 255), (i.check = d(i.check, M, 2, 0))),
                  (u = 0),
                  (w = 0)
              } else i.head && (i.head.extra = null)
              i.mode = 6
            case 6:
              if (
                1024 & i.flags &&
                ((_ = i.length) > l && (_ = l),
                _ &&
                  (i.head &&
                    ((z = i.head.extra_len - i.length),
                    i.head.extra || (i.head.extra = new Array(i.head.extra_len)),
                    s.arraySet(i.head.extra, r, a, _, z)),
                  512 & i.flags && (i.check = d(i.check, r, _, a)),
                  (l -= _),
                  (a += _),
                  (i.length -= _)),
                i.length)
              )
                break e
              ;(i.length = 0), (i.mode = 7)
            case 7:
              if (2048 & i.flags) {
                if (0 === l) break e
                _ = 0
                do {
                  ;(z = r[a + _++]), i.head && z && i.length < 65536 && (i.head.name += String.fromCharCode(z))
                } while (z && _ < l)
                if ((512 & i.flags && (i.check = d(i.check, r, _, a)), (l -= _), (a += _), z)) break e
              } else i.head && (i.head.name = null)
              ;(i.length = 0), (i.mode = 8)
            case 8:
              if (4096 & i.flags) {
                if (0 === l) break e
                _ = 0
                do {
                  ;(z = r[a + _++]), i.head && z && i.length < 65536 && (i.head.comment += String.fromCharCode(z))
                } while (z && _ < l)
                if ((512 & i.flags && (i.check = d(i.check, r, _, a)), (l -= _), (a += _), z)) break e
              } else i.head && (i.head.comment = null)
              i.mode = 9
            case 9:
              if (512 & i.flags) {
                for (; w < 16; ) {
                  if (0 === l) break e
                  l--, (u += r[a++] << w), (w += 8)
                }
                if (u !== (65535 & i.check)) {
                  ;(e.msg = 'header crc mismatch'), (i.mode = p)
                  break
                }
                ;(u = 0), (w = 0)
              }
              i.head && ((i.head.hcrc = (i.flags >> 9) & 1), (i.head.done = !0)), (e.adler = i.check = 0), (i.mode = k)
              break
            case 10:
              for (; w < 32; ) {
                if (0 === l) break e
                l--, (u += r[a++] << w), (w += 8)
              }
              ;(e.adler = i.check = y(u)), (u = 0), (w = 0), (i.mode = 11)
            case 11:
              if (0 === i.havedict) return (e.next_out = o), (e.avail_out = c), (e.next_in = a), (e.avail_in = l), (i.hold = u), (i.bits = w), 2
              ;(e.adler = i.check = 1), (i.mode = k)
            case k:
              if (5 === t || 6 === t) break e
            case 13:
              if (i.last) {
                ;(u >>>= 7 & w), (w -= 7 & w), (i.mode = 27)
                break
              }
              for (; w < 3; ) {
                if (0 === l) break e
                l--, (u += r[a++] << w), (w += 8)
              }
              switch (((i.last = 1 & u), (w -= 1), 3 & (u >>>= 1))) {
                case 0:
                  i.mode = 14
                  break
                case 1:
                  if ((R(i), (i.mode = 20), 6 === t)) {
                    ;(u >>>= 2), (w -= 2)
                    break e
                  }
                  break
                case 2:
                  i.mode = 17
                  break
                case 3:
                  ;(e.msg = 'invalid block type'), (i.mode = p)
              }
              ;(u >>>= 2), (w -= 2)
              break
            case 14:
              for (u >>>= 7 & w, w -= 7 & w; w < 32; ) {
                if (0 === l) break e
                l--, (u += r[a++] << w), (w += 8)
              }
              if ((65535 & u) != ((u >>> 16) ^ 65535)) {
                ;(e.msg = 'invalid stored block lengths'), (i.mode = p)
                break
              }
              if (((i.length = 65535 & u), (u = 0), (w = 0), (i.mode = 15), 6 === t)) break e
            case 15:
              i.mode = 16
            case 16:
              if ((_ = i.length)) {
                if ((_ > l && (_ = l), _ > c && (_ = c), 0 === _)) break e
                s.arraySet(n, r, a, _, o), (l -= _), (a += _), (c -= _), (o += _), (i.length -= _)
                break
              }
              i.mode = k
              break
            case 17:
              for (; w < 14; ) {
                if (0 === l) break e
                l--, (u += r[a++] << w), (w += 8)
              }
              if (
                ((i.nlen = 257 + (31 & u)),
                (u >>>= 5),
                (w -= 5),
                (i.ndist = 1 + (31 & u)),
                (u >>>= 5),
                (w -= 5),
                (i.ncode = 4 + (15 & u)),
                (u >>>= 4),
                (w -= 4),
                i.nlen > 286 || i.ndist > 30)
              ) {
                ;(e.msg = 'too many length or distance symbols'), (i.mode = p)
                break
              }
              ;(i.have = 0), (i.mode = 18)
            case 18:
              for (; i.have < i.ncode; ) {
                for (; w < 3; ) {
                  if (0 === l) break e
                  l--, (u += r[a++] << w), (w += 8)
                }
                ;(i.lens[j[i.have++]] = 7 & u), (u >>>= 3), (w -= 3)
              }
              for (; i.have < 19; ) i.lens[j[i.have++]] = 0
              if (
                ((i.lencode = i.lendyn),
                (i.lenbits = 7),
                (V = { bits: i.lenbits }),
                (D = v(0, i.lens, 0, 19, i.lencode, 0, i.work, V)),
                (i.lenbits = V.bits),
                D)
              ) {
                ;(e.msg = 'invalid code lengths set'), (i.mode = p)
                break
              }
              ;(i.have = 0), (i.mode = 19)
            case 19:
              for (; i.have < i.nlen + i.ndist; ) {
                for (; (A = ((O = i.lencode[u & ((1 << i.lenbits) - 1)]) >>> 16) & 255), (T = 65535 & O), !((E = O >>> 24) <= w); ) {
                  if (0 === l) break e
                  l--, (u += r[a++] << w), (w += 8)
                }
                if (T < 16) (u >>>= E), (w -= E), (i.lens[i.have++] = T)
                else {
                  if (16 === T) {
                    for (P = E + 2; w < P; ) {
                      if (0 === l) break e
                      l--, (u += r[a++] << w), (w += 8)
                    }
                    if (((u >>>= E), (w -= E), 0 === i.have)) {
                      ;(e.msg = 'invalid bit length repeat'), (i.mode = p)
                      break
                    }
                    ;(z = i.lens[i.have - 1]), (_ = 3 + (3 & u)), (u >>>= 2), (w -= 2)
                  } else if (17 === T) {
                    for (P = E + 3; w < P; ) {
                      if (0 === l) break e
                      l--, (u += r[a++] << w), (w += 8)
                    }
                    ;(w -= E), (z = 0), (_ = 3 + (7 & (u >>>= E))), (u >>>= 3), (w -= 3)
                  } else {
                    for (P = E + 7; w < P; ) {
                      if (0 === l) break e
                      l--, (u += r[a++] << w), (w += 8)
                    }
                    ;(w -= E), (z = 0), (_ = 11 + (127 & (u >>>= E))), (u >>>= 7), (w -= 7)
                  }
                  if (i.have + _ > i.nlen + i.ndist) {
                    ;(e.msg = 'invalid bit length repeat'), (i.mode = p)
                    break
                  }
                  for (; _--; ) i.lens[i.have++] = z
                }
              }
              if (i.mode === p) break
              if (0 === i.lens[256]) {
                ;(e.msg = 'invalid code -- missing end-of-block'), (i.mode = p)
                break
              }
              if (((i.lenbits = 9), (V = { bits: i.lenbits }), (D = v(1, i.lens, 0, i.nlen, i.lencode, 0, i.work, V)), (i.lenbits = V.bits), D)) {
                ;(e.msg = 'invalid literal/lengths set'), (i.mode = p)
                break
              }
              if (
                ((i.distbits = 6),
                (i.distcode = i.distdyn),
                (V = { bits: i.distbits }),
                (D = v(2, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, V)),
                (i.distbits = V.bits),
                D)
              ) {
                ;(e.msg = 'invalid distances set'), (i.mode = p)
                break
              }
              if (((i.mode = 20), 6 === t)) break e
            case 20:
              i.mode = 21
            case 21:
              if (l >= 6 && c >= 258) {
                ;(e.next_out = o),
                  (e.avail_out = c),
                  (e.next_in = a),
                  (e.avail_in = l),
                  (i.hold = u),
                  (i.bits = w),
                  h(e, m),
                  (o = e.next_out),
                  (n = e.output),
                  (c = e.avail_out),
                  (a = e.next_in),
                  (r = e.input),
                  (l = e.avail_in),
                  (u = i.hold),
                  (w = i.bits),
                  i.mode === k && (i.back = -1)
                break
              }
              for (i.back = 0; (A = ((O = i.lencode[u & ((1 << i.lenbits) - 1)]) >>> 16) & 255), (T = 65535 & O), !((E = O >>> 24) <= w); ) {
                if (0 === l) break e
                l--, (u += r[a++] << w), (w += 8)
              }
              if (A && 0 == (240 & A)) {
                for (
                  U = E, S = A, I = T;
                  (A = ((O = i.lencode[I + ((u & ((1 << (U + S)) - 1)) >> U)]) >>> 16) & 255), (T = 65535 & O), !(U + (E = O >>> 24) <= w);

                ) {
                  if (0 === l) break e
                  l--, (u += r[a++] << w), (w += 8)
                }
                ;(u >>>= U), (w -= U), (i.back += U)
              }
              if (((u >>>= E), (w -= E), (i.back += E), (i.length = T), 0 === A)) {
                i.mode = 26
                break
              }
              if (32 & A) {
                ;(i.back = -1), (i.mode = k)
                break
              }
              if (64 & A) {
                ;(e.msg = 'invalid literal/length code'), (i.mode = p)
                break
              }
              ;(i.extra = 15 & A), (i.mode = 22)
            case 22:
              if (i.extra) {
                for (P = i.extra; w < P; ) {
                  if (0 === l) break e
                  l--, (u += r[a++] << w), (w += 8)
                }
                ;(i.length += u & ((1 << i.extra) - 1)), (u >>>= i.extra), (w -= i.extra), (i.back += i.extra)
              }
              ;(i.was = i.length), (i.mode = 23)
            case 23:
              for (; (A = ((O = i.distcode[u & ((1 << i.distbits) - 1)]) >>> 16) & 255), (T = 65535 & O), !((E = O >>> 24) <= w); ) {
                if (0 === l) break e
                l--, (u += r[a++] << w), (w += 8)
              }
              if (0 == (240 & A)) {
                for (
                  U = E, S = A, I = T;
                  (A = ((O = i.distcode[I + ((u & ((1 << (U + S)) - 1)) >> U)]) >>> 16) & 255), (T = 65535 & O), !(U + (E = O >>> 24) <= w);

                ) {
                  if (0 === l) break e
                  l--, (u += r[a++] << w), (w += 8)
                }
                ;(u >>>= U), (w -= U), (i.back += U)
              }
              if (((u >>>= E), (w -= E), (i.back += E), 64 & A)) {
                ;(e.msg = 'invalid distance code'), (i.mode = p)
                break
              }
              ;(i.offset = T), (i.extra = 15 & A), (i.mode = 24)
            case 24:
              if (i.extra) {
                for (P = i.extra; w < P; ) {
                  if (0 === l) break e
                  l--, (u += r[a++] << w), (w += 8)
                }
                ;(i.offset += u & ((1 << i.extra) - 1)), (u >>>= i.extra), (w -= i.extra), (i.back += i.extra)
              }
              if (i.offset > i.dmax) {
                ;(e.msg = 'invalid distance too far back'), (i.mode = p)
                break
              }
              i.mode = 25
            case 25:
              if (0 === c) break e
              if (((_ = m - c), i.offset > _)) {
                if ((_ = i.offset - _) > i.whave && i.sane) {
                  ;(e.msg = 'invalid distance too far back'), (i.mode = p)
                  break
                }
                _ > i.wnext ? ((_ -= i.wnext), (x = i.wsize - _)) : (x = i.wnext - _), _ > i.length && (_ = i.length), (B = i.window)
              } else (B = n), (x = o - i.offset), (_ = i.length)
              _ > c && (_ = c), (c -= _), (i.length -= _)
              do {
                n[o++] = B[x++]
              } while (--_)
              0 === i.length && (i.mode = 21)
              break
            case 26:
              if (0 === c) break e
              ;(n[o++] = i.length), c--, (i.mode = 21)
              break
            case 27:
              if (i.wrap) {
                for (; w < 32; ) {
                  if (0 === l) break e
                  l--, (u |= r[a++] << w), (w += 8)
                }
                if (
                  ((m -= c),
                  (e.total_out += m),
                  (i.total += m),
                  m && (e.adler = i.check = i.flags ? d(i.check, n, m, o - m) : f(i.check, n, m, o - m)),
                  (m = c),
                  (i.flags ? u : y(u)) !== i.check)
                ) {
                  ;(e.msg = 'incorrect data check'), (i.mode = p)
                  break
                }
                ;(u = 0), (w = 0)
              }
              i.mode = 28
            case 28:
              if (i.wrap && i.flags) {
                for (; w < 32; ) {
                  if (0 === l) break e
                  l--, (u += r[a++] << w), (w += 8)
                }
                if (u !== (4294967295 & i.total)) {
                  ;(e.msg = 'incorrect length check'), (i.mode = p)
                  break
                }
                ;(u = 0), (w = 0)
              }
              i.mode = 29
            case 29:
              D = 1
              break e
            case p:
              D = -3
              break e
            case 31:
              return -4
            default:
              return g
          }
        return (
          (e.next_out = o),
          (e.avail_out = c),
          (e.next_in = a),
          (e.avail_in = l),
          (i.hold = u),
          (i.bits = w),
          (i.wsize || (m !== e.avail_out && i.mode < p && (i.mode < 27 || 4 !== t))) && C(e, e.output, e.next_out, m - e.avail_out),
          (b -= e.avail_in),
          (m -= e.avail_out),
          (e.total_in += b),
          (e.total_out += m),
          (i.total += m),
          i.wrap && m && (e.adler = i.check = i.flags ? d(i.check, n, m, e.next_out - m) : f(i.check, n, m, e.next_out - m)),
          (e.data_type = i.bits + (i.last ? 64 : 0) + (i.mode === k ? 128 : 0) + (20 === i.mode || 15 === i.mode ? 256 : 0)),
          ((0 === b && 0 === m) || 4 === t) && 0 === D && (D = -5),
          D
        )
      },
      inflateEnd: function (e) {
        if (!e || !e.state) return g
        var t = e.state
        return t.window && (t.window = null), (e.state = null), 0
      },
      inflateGetHeader: function (e, t) {
        var i
        return e && e.state ? (0 == (2 & (i = e.state).wrap) ? g : ((i.head = t), (t.done = !1), 0)) : g
      },
      inflateSetDictionary: function (e, t) {
        var i,
          r = t.length
        return e && e.state
          ? 0 !== (i = e.state).wrap && 11 !== i.mode
            ? g
            : 11 === i.mode && f(1, t, r, 0) !== i.check
            ? -3
            : C(e, t, r, r)
            ? ((i.mode = 31), -4)
            : ((i.havedict = 1), 0)
          : g
      },
      inflateInfo: 'pako inflate (from Nodeca project)'
    },
    z = !0,
    D = !0
  try {
    String.fromCharCode.apply(null, [0])
  } catch (e) {
    z = !1
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1))
  } catch (e) {
    D = !1
  }
  for (var V = new s.Buf8(256), P = 0; P < 256; P++) V[P] = P >= 252 ? 6 : P >= 248 ? 5 : P >= 240 ? 4 : P >= 224 ? 3 : P >= 192 ? 2 : 1
  V[254] = V[254] = 1
  function O(e, t) {
    if (t < 65534 && ((e.subarray && D) || (!e.subarray && z))) return String.fromCharCode.apply(null, s.shrinkBuf(e, t))
    for (var i = '', r = 0; r < t; r++) i += String.fromCharCode(e[r])
    return i
  }
  var M = function (e) {
      var t,
        i,
        r,
        n,
        a,
        o = e.length,
        f = 0
      for (n = 0; n < o; n++)
        55296 == (64512 & (i = e.charCodeAt(n))) &&
          n + 1 < o &&
          56320 == (64512 & (r = e.charCodeAt(n + 1))) &&
          ((i = 65536 + ((i - 55296) << 10) + (r - 56320)), n++),
          (f += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4)
      for (t = new s.Buf8(f), a = 0, n = 0; a < f; n++)
        55296 == (64512 & (i = e.charCodeAt(n))) &&
          n + 1 < o &&
          56320 == (64512 & (r = e.charCodeAt(n + 1))) &&
          ((i = 65536 + ((i - 55296) << 10) + (r - 56320)), n++),
          i < 128
            ? (t[a++] = i)
            : i < 2048
            ? ((t[a++] = 192 | (i >>> 6)), (t[a++] = 128 | (63 & i)))
            : i < 65536
            ? ((t[a++] = 224 | (i >>> 12)), (t[a++] = 128 | ((i >>> 6) & 63)), (t[a++] = 128 | (63 & i)))
            : ((t[a++] = 240 | (i >>> 18)), (t[a++] = 128 | ((i >>> 12) & 63)), (t[a++] = 128 | ((i >>> 6) & 63)), (t[a++] = 128 | (63 & i)))
      return t
    },
    j = function (e) {
      for (var t = new s.Buf8(e.length), i = 0, r = t.length; i < r; i++) t[i] = e.charCodeAt(i)
      return t
    },
    H = function (e, t) {
      var i,
        r,
        n,
        a,
        o = t || e.length,
        s = new Array(2 * o)
      for (r = 0, i = 0; i < o; )
        if ((n = e[i++]) < 128) s[r++] = n
        else if ((a = V[n]) > 4) (s[r++] = 65533), (i += a - 1)
        else {
          for (n &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && i < o; ) (n = (n << 6) | (63 & e[i++])), a--
          a > 1 ? (s[r++] = 65533) : n < 65536 ? (s[r++] = n) : ((n -= 65536), (s[r++] = 55296 | ((n >> 10) & 1023)), (s[r++] = 56320 | (1023 & n)))
        }
      return O(s, r)
    },
    N = function (e, t) {
      var i
      for ((t = t || e.length) > e.length && (t = e.length), i = t - 1; i >= 0 && 128 == (192 & e[i]); ) i--
      return i < 0 || 0 === i ? t : i + V[e[i]] > t ? i : t
    },
    L = 0,
    Y = 2,
    F = 4,
    G = 0,
    K = 1,
    Q = 2,
    q = -5,
    W = {
      2: 'need dictionary',
      1: 'stream end',
      0: '',
      '-1': 'file error',
      '-2': 'stream error',
      '-3': 'data error',
      '-4': 'insufficient memory',
      '-5': 'buffer error',
      '-6': 'incompatible version'
    }
  var J = function () {
    ;(this.input = null),
      (this.next_in = 0),
      (this.avail_in = 0),
      (this.total_in = 0),
      (this.output = null),
      (this.next_out = 0),
      (this.avail_out = 0),
      (this.total_out = 0),
      (this.msg = ''),
      (this.state = null),
      (this.data_type = 2),
      (this.adler = 0)
  }
  var X = function () {
      ;(this.text = 0),
        (this.time = 0),
        (this.xflags = 0),
        (this.os = 0),
        (this.extra = null),
        (this.extra_len = 0),
        (this.name = ''),
        (this.comment = ''),
        (this.hcrc = 0),
        (this.done = !1)
    },
    Z = Object.prototype.toString
  function $(e) {
    if (!(this instanceof $)) return new $(e)
    this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: '' }, e || {})
    var t = this.options
    t.raw && t.windowBits >= 0 && t.windowBits < 16 && ((t.windowBits = -t.windowBits), 0 === t.windowBits && (t.windowBits = -15)),
      !(t.windowBits >= 0 && t.windowBits < 16) || (e && e.windowBits) || (t.windowBits += 32),
      t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
      (this.err = 0),
      (this.msg = ''),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new J()),
      (this.strm.avail_out = 0)
    var i = I.inflateInit2(this.strm, t.windowBits)
    if (i !== G) throw new Error(W[i])
    if (
      ((this.header = new X()),
      I.inflateGetHeader(this.strm, this.header),
      t.dictionary &&
        ('string' == typeof t.dictionary
          ? (t.dictionary = M(t.dictionary))
          : '[object ArrayBuffer]' === Z.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)),
        t.raw && (i = I.inflateSetDictionary(this.strm, t.dictionary)) !== G))
    )
      throw new Error(W[i])
  }
  function ee(e, t) {
    var i = new $(t)
    if ((i.push(e, !0), i.err)) throw i.msg || W[i.err]
    return i.result
  }
  ;($.prototype.push = function (e, t) {
    var i,
      r,
      n,
      a,
      o,
      f = this.strm,
      l = this.options.chunkSize,
      d = this.options.dictionary,
      h = !1
    if (this.ended) return !1
    ;(r = t === ~~t ? t : !0 === t ? F : L),
      'string' == typeof e ? (f.input = j(e)) : '[object ArrayBuffer]' === Z.call(e) ? (f.input = new Uint8Array(e)) : (f.input = e),
      (f.next_in = 0),
      (f.avail_in = f.input.length)
    do {
      if (
        (0 === f.avail_out && ((f.output = new s.Buf8(l)), (f.next_out = 0), (f.avail_out = l)),
        (i = I.inflate(f, L)) === Q && d && (i = I.inflateSetDictionary(this.strm, d)),
        i === q && !0 === h && ((i = G), (h = !1)),
        i !== K && i !== G)
      )
        return this.onEnd(i), (this.ended = !0), !1
      f.next_out &&
        ((0 !== f.avail_out && i !== K && (0 !== f.avail_in || (r !== F && r !== Y))) ||
          ('string' === this.options.to
            ? ((n = N(f.output, f.next_out)),
              (a = f.next_out - n),
              (o = H(f.output, n)),
              (f.next_out = a),
              (f.avail_out = l - a),
              a && s.arraySet(f.output, f.output, n, a, 0),
              this.onData(o))
            : this.onData(s.shrinkBuf(f.output, f.next_out)))),
        0 === f.avail_in && 0 === f.avail_out && (h = !0)
    } while ((f.avail_in > 0 || 0 === f.avail_out) && i !== K)
    return (
      i === K && (r = F),
      r === F ? ((i = I.inflateEnd(this.strm)), this.onEnd(i), (this.ended = !0), i === G) : r !== Y || (this.onEnd(G), (f.avail_out = 0), !0)
    )
  }),
    ($.prototype.onData = function (e) {
      this.chunks.push(e)
    }),
    ($.prototype.onEnd = function (e) {
      e === G && ('string' === this.options.to ? (this.result = this.chunks.join('')) : (this.result = s.flattenChunks(this.chunks))),
        (this.chunks = []),
        (this.err = e),
        (this.msg = this.strm.msg)
    })
  var te = {
      Inflate: $,
      inflate: ee,
      inflateRaw: function (e, t) {
        return ((t = t || {}).raw = !0), ee(e, t)
      },
      ungzip: ee
    },
    ie = Uint16Array.BYTES_PER_ELEMENT,
    re = Int32Array.BYTES_PER_ELEMENT,
    ne = Uint32Array.BYTES_PER_ELEMENT,
    ae = { METADATA: 0, TERRAIN: 1, DBROOT: 2 }
  ae.fromString = function (e) {
    return 'Metadata' === e ? ae.METADATA : 'Terrain' === e ? ae.TERRAIN : 'DbRoot' === e ? ae.DBROOT : void 0
  }
  var oe = 1953029805,
    se = 2917034100
  return i(function (t, i) {
    var n = ae.fromString(t.type),
      a = t.buffer
    r(t.key, a)
    var s = (function (t) {
      var i = new DataView(t),
        r = 0,
        n = i.getUint32(r, !0)
      if (((r += ne), n !== oe && n !== se)) throw new e.RuntimeError('Invalid magic')
      var a = i.getUint32(r, n === oe)
      r += ne
      var o = new Uint8Array(t, r),
        s = te.inflate(o)
      if (s.length !== a) throw new e.RuntimeError("Size of packet doesn't match header")
      return s
    })(a)
    a = s.buffer
    var f = s.length
    switch (n) {
      case ae.METADATA:
        return (function (t, i, r) {
          var n = new DataView(t),
            a = 0,
            s = n.getUint32(a, !0)
          if (((a += ne), 32301 !== s)) throw new e.RuntimeError('Invalid magic')
          var f = n.getUint32(a, !0)
          if (((a += ne), 1 !== f)) throw new e.RuntimeError('Invalid data type. Must be 1 for QuadTreePacket')
          var l = n.getUint32(a, !0)
          if (((a += ne), 2 !== l)) throw new e.RuntimeError('Invalid QuadTreePacket version. Only version 2 is supported.')
          var d = n.getInt32(a, !0)
          a += re
          var h = n.getInt32(a, !0)
          if (((a += re), 32 !== h)) throw new e.RuntimeError('Invalid instance size.')
          var c = n.getInt32(a, !0)
          a += re
          var u = n.getInt32(a, !0)
          a += re
          var w = n.getInt32(a, !0)
          if (c !== d * h + (a += re)) throw new e.RuntimeError('Invalid dataBufferOffset')
          if (c + u + w !== i) throw new e.RuntimeError('Invalid packet offsets')
          for (var b = [], m = 0; m < d; ++m) {
            var v = n.getUint8(a)
            ++a, ++a
            var g = n.getUint16(a, !0)
            a += ie
            var k = n.getUint16(a, !0)
            a += ie
            var p = n.getUint16(a, !0)
            ;(a += ie), (a += ie), (a += ie), (a += re), (a += re), (a += 8)
            var y = n.getUint8(a++),
              _ = n.getUint8(a++)
            ;(a += ie), b.push(new o(v, g, k, p, y, _))
          }
          var x = [],
            B = 0
          function E(e, t, i) {
            var r = !1
            if (4 === i) {
              if (t.hasSubtree()) return
              r = !0
            }
            for (var n = 0; n < 4; ++n) {
              var a = e + n.toString()
              if (r) x[a] = null
              else if (i < 4)
                if (t.hasChild(n)) {
                  if (B === d) return void console.log('Incorrect number of instances')
                  var o = b[B++]
                  ;(x[a] = o), E(a, o, i + 1)
                } else x[a] = null
            }
          }
          var A = 0,
            T = b[B++]
          '' === r ? ++A : (x[r] = T)
          return E(r, T, A), x
        })(a, f, t.quadKey)
      case ae.TERRAIN:
        return (function (t, i, r) {
          var n = new DataView(t),
            a = function (t) {
              for (var r = 0; r < 4; ++r) {
                var a = n.getUint32(t, !0)
                if (((t += ne), (t += a) > i)) throw new e.RuntimeError('Malformed terrain packet found.')
              }
              return t
            },
            o = 0,
            s = []
          for (; s.length < 5; ) {
            var f = o
            o = a(o)
            var l = t.slice(f, o)
            r.push(l), s.push(l)
          }
          return s
        })(a, f, i)
      case ae.DBROOT:
        return i.push(a), { buffer: a }
    }
  })
})
