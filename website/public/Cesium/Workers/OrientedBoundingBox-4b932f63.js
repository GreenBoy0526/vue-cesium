define([
  'exports',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './when-4bbc8319',
  './EllipsoidTangentPlane-eecce7e8',
  './ComponentDatatype-93750d1a',
  './Plane-318d6937'
], function (a, t, e, n, r, i, s, o) {
  'use strict'
  function C(a, t) {
    ;(this.center = e.Cartesian3.clone(r.defaultValue(a, e.Cartesian3.ZERO))), (this.halfAxes = e.Matrix3.clone(r.defaultValue(t, e.Matrix3.ZERO)))
  }
  ;(C.packedLength = e.Cartesian3.packedLength + e.Matrix3.packedLength),
    (C.pack = function (a, t, n) {
      return (n = r.defaultValue(n, 0)), e.Cartesian3.pack(a.center, t, n), e.Matrix3.pack(a.halfAxes, t, n + e.Cartesian3.packedLength), t
    }),
    (C.unpack = function (a, t, n) {
      return (
        (t = r.defaultValue(t, 0)),
        r.defined(n) || (n = new C()),
        e.Cartesian3.unpack(a, t, n.center),
        e.Matrix3.unpack(a, t + e.Cartesian3.packedLength, n.halfAxes),
        n
      )
    })
  var c = new e.Cartesian3(),
    u = new e.Cartesian3(),
    l = new e.Cartesian3(),
    d = new e.Cartesian3(),
    h = new e.Cartesian3(),
    x = new e.Cartesian3(),
    m = new e.Matrix3(),
    M = { unitary: new e.Matrix3(), diagonal: new e.Matrix3() }
  C.fromPoints = function (a, t) {
    if ((r.defined(t) || (t = new C()), !r.defined(a) || 0 === a.length)) return (t.halfAxes = e.Matrix3.ZERO), (t.center = e.Cartesian3.ZERO), t
    var n,
      i = a.length,
      s = e.Cartesian3.clone(a[0], c)
    for (n = 1; n < i; n++) e.Cartesian3.add(s, a[n], s)
    var o = 1 / i
    e.Cartesian3.multiplyByScalar(s, o, s)
    var f,
      p = 0,
      g = 0,
      w = 0,
      y = 0,
      N = 0,
      O = 0
    for (n = 0; n < i; n++)
      (p += (f = e.Cartesian3.subtract(a[n], s, u)).x * f.x), (g += f.x * f.y), (w += f.x * f.z), (y += f.y * f.y), (N += f.y * f.z), (O += f.z * f.z)
    ;(p *= o), (g *= o), (w *= o), (y *= o), (N *= o), (O *= o)
    var b = m
    ;(b[0] = p), (b[1] = g), (b[2] = w), (b[3] = g), (b[4] = y), (b[5] = N), (b[6] = w), (b[7] = N), (b[8] = O)
    var v = e.Matrix3.computeEigenDecomposition(b, M),
      P = e.Matrix3.clone(v.unitary, t.halfAxes),
      T = e.Matrix3.getColumn(P, 0, d),
      A = e.Matrix3.getColumn(P, 1, h),
      I = e.Matrix3.getColumn(P, 2, x),
      R = -Number.MAX_VALUE,
      E = -Number.MAX_VALUE,
      S = -Number.MAX_VALUE,
      U = Number.MAX_VALUE,
      L = Number.MAX_VALUE,
      z = Number.MAX_VALUE
    for (n = 0; n < i; n++)
      (f = a[n]),
        (R = Math.max(e.Cartesian3.dot(T, f), R)),
        (E = Math.max(e.Cartesian3.dot(A, f), E)),
        (S = Math.max(e.Cartesian3.dot(I, f), S)),
        (U = Math.min(e.Cartesian3.dot(T, f), U)),
        (L = Math.min(e.Cartesian3.dot(A, f), L)),
        (z = Math.min(e.Cartesian3.dot(I, f), z))
    ;(T = e.Cartesian3.multiplyByScalar(T, 0.5 * (U + R), T)),
      (A = e.Cartesian3.multiplyByScalar(A, 0.5 * (L + E), A)),
      (I = e.Cartesian3.multiplyByScalar(I, 0.5 * (z + S), I))
    var B = e.Cartesian3.add(T, A, t.center)
    e.Cartesian3.add(B, I, B)
    var V = l
    return (
      (V.x = R - U), (V.y = E - L), (V.z = S - z), e.Cartesian3.multiplyByScalar(V, 0.5, V), e.Matrix3.multiplyByScale(t.halfAxes, V, t.halfAxes), t
    )
  }
  var f = new e.Cartesian3(),
    p = new e.Cartesian3()
  function g(a, t, n, i, s, o, c, u, l, d, h) {
    r.defined(h) || (h = new C())
    var x = h.halfAxes
    e.Matrix3.setColumn(x, 0, t, x), e.Matrix3.setColumn(x, 1, n, x), e.Matrix3.setColumn(x, 2, i, x)
    var m = f
    ;(m.x = (s + o) / 2), (m.y = (c + u) / 2), (m.z = (l + d) / 2)
    var M = p
    ;(M.x = (o - s) / 2), (M.y = (u - c) / 2), (M.z = (d - l) / 2)
    var g = h.center
    return (m = e.Matrix3.multiplyByVector(x, m, m)), e.Cartesian3.add(a, m, g), e.Matrix3.multiplyByScale(x, M, x), h
  }
  var w = new e.Cartographic(),
    y = new e.Cartesian3(),
    N = new e.Cartographic(),
    O = new e.Cartographic(),
    b = new e.Cartographic(),
    v = new e.Cartographic(),
    P = new e.Cartographic(),
    T = new e.Cartesian3(),
    A = new e.Cartesian3(),
    I = new e.Cartesian3(),
    R = new e.Cartesian3(),
    E = new e.Cartesian3(),
    S = new e.Cartesian2(),
    U = new e.Cartesian2(),
    L = new e.Cartesian2(),
    z = new e.Cartesian2(),
    B = new e.Cartesian2(),
    V = new e.Cartesian3(),
    _ = new e.Cartesian3(),
    k = new e.Cartesian3(),
    W = new e.Cartesian3(),
    D = new e.Cartesian2(),
    X = new e.Cartesian3(),
    q = new e.Cartesian3(),
    j = new e.Cartesian3(),
    Z = new o.Plane(e.Cartesian3.UNIT_X, 0)
  ;(C.fromRectangle = function (a, t, n, C, c) {
    var u, l, d, h, x, m, M
    if (((t = r.defaultValue(t, 0)), (n = r.defaultValue(n, 0)), (C = r.defaultValue(C, e.Ellipsoid.WGS84)), a.width <= s.CesiumMath.PI)) {
      var f = e.Rectangle.center(a, w),
        p = C.cartographicToCartesian(f, y),
        Y = new i.EllipsoidTangentPlane(p, C)
      M = Y.plane
      var G = f.longitude,
        F = a.south < 0 && a.north > 0 ? 0 : f.latitude,
        H = e.Cartographic.fromRadians(G, a.north, n, N),
        J = e.Cartographic.fromRadians(a.west, a.north, n, O),
        K = e.Cartographic.fromRadians(a.west, F, n, b),
        Q = e.Cartographic.fromRadians(a.west, a.south, n, v),
        $ = e.Cartographic.fromRadians(G, a.south, n, P),
        aa = C.cartographicToCartesian(H, T),
        ta = C.cartographicToCartesian(J, A),
        ea = C.cartographicToCartesian(K, I),
        na = C.cartographicToCartesian(Q, R),
        ra = C.cartographicToCartesian($, E),
        ia = Y.projectPointToNearestOnPlane(aa, S),
        sa = Y.projectPointToNearestOnPlane(ta, U),
        oa = Y.projectPointToNearestOnPlane(ea, L),
        Ca = Y.projectPointToNearestOnPlane(na, z),
        ca = Y.projectPointToNearestOnPlane(ra, B)
      return (
        (l = -(u = Math.min(sa.x, oa.x, Ca.x))),
        (h = Math.max(sa.y, ia.y)),
        (d = Math.min(Ca.y, ca.y)),
        (J.height = Q.height = t),
        (ta = C.cartographicToCartesian(J, A)),
        (na = C.cartographicToCartesian(Q, R)),
        (x = Math.min(o.Plane.getPointDistance(M, ta), o.Plane.getPointDistance(M, na))),
        (m = n),
        g(Y.origin, Y.xAxis, Y.yAxis, Y.zAxis, u, l, d, h, x, m, c)
      )
    }
    var ua = a.south > 0,
      la = a.north < 0,
      da = ua ? a.south : la ? a.north : 0,
      ha = e.Rectangle.center(a, w).longitude,
      xa = e.Cartesian3.fromRadians(ha, da, n, C, V)
    xa.z = 0
    var ma = Math.abs(xa.x) < s.CesiumMath.EPSILON10 && Math.abs(xa.y) < s.CesiumMath.EPSILON10 ? e.Cartesian3.UNIT_X : e.Cartesian3.normalize(xa, _),
      Ma = e.Cartesian3.UNIT_Z,
      fa = e.Cartesian3.cross(ma, Ma, k)
    M = o.Plane.fromPointNormal(xa, ma, Z)
    var pa = e.Cartesian3.fromRadians(ha + s.CesiumMath.PI_OVER_TWO, da, n, C, W)
    ;(u = -(l = e.Cartesian3.dot(o.Plane.projectPointOntoPlane(M, pa, D), fa))),
      (h = e.Cartesian3.fromRadians(0, a.north, la ? t : n, C, X).z),
      (d = e.Cartesian3.fromRadians(0, a.south, ua ? t : n, C, q).z)
    var ga = e.Cartesian3.fromRadians(a.east, da, n, C, j)
    return g(xa, fa, Ma, ma, u, l, d, h, (x = o.Plane.getPointDistance(M, ga)), (m = 0), c)
  }),
    (C.clone = function (a, t) {
      if (r.defined(a))
        return r.defined(t) ? (e.Cartesian3.clone(a.center, t.center), e.Matrix3.clone(a.halfAxes, t.halfAxes), t) : new C(a.center, a.halfAxes)
    }),
    (C.intersectPlane = function (a, n) {
      var r = a.center,
        i = n.normal,
        s = a.halfAxes,
        o = i.x,
        C = i.y,
        c = i.z,
        u =
          Math.abs(o * s[e.Matrix3.COLUMN0ROW0] + C * s[e.Matrix3.COLUMN0ROW1] + c * s[e.Matrix3.COLUMN0ROW2]) +
          Math.abs(o * s[e.Matrix3.COLUMN1ROW0] + C * s[e.Matrix3.COLUMN1ROW1] + c * s[e.Matrix3.COLUMN1ROW2]) +
          Math.abs(o * s[e.Matrix3.COLUMN2ROW0] + C * s[e.Matrix3.COLUMN2ROW1] + c * s[e.Matrix3.COLUMN2ROW2]),
        l = e.Cartesian3.dot(i, r) + n.distance
      return l <= -u ? t.Intersect.OUTSIDE : l >= u ? t.Intersect.INSIDE : t.Intersect.INTERSECTING
    })
  var Y = new e.Cartesian3(),
    G = new e.Cartesian3(),
    F = new e.Cartesian3(),
    H = new e.Cartesian3(),
    J = new e.Cartesian3(),
    K = new e.Cartesian3()
  C.distanceSquaredTo = function (a, t) {
    var n = e.Cartesian3.subtract(t, a.center, f),
      r = a.halfAxes,
      i = e.Matrix3.getColumn(r, 0, Y),
      o = e.Matrix3.getColumn(r, 1, G),
      C = e.Matrix3.getColumn(r, 2, F),
      c = e.Cartesian3.magnitude(i),
      u = e.Cartesian3.magnitude(o),
      l = e.Cartesian3.magnitude(C),
      d = !0,
      h = !0,
      x = !0
    c > 0 ? e.Cartesian3.divideByScalar(i, c, i) : (d = !1),
      u > 0 ? e.Cartesian3.divideByScalar(o, u, o) : (h = !1),
      l > 0 ? e.Cartesian3.divideByScalar(C, l, C) : (x = !1)
    var m,
      M,
      p,
      g = !d + !h + !x
    if (1 === g) {
      var w = i
      ;(m = o),
        (M = C),
        h ? x || ((w = C), (M = i)) : ((w = o), (m = i)),
        (p = e.Cartesian3.cross(m, M, J)),
        w === i ? (i = p) : w === o ? (o = p) : w === C && (C = p)
    } else if (2 === g) {
      ;(m = i), h ? (m = o) : x && (m = C)
      var y = e.Cartesian3.UNIT_Y
      y.equalsEpsilon(m, s.CesiumMath.EPSILON3) && (y = e.Cartesian3.UNIT_X),
        (M = e.Cartesian3.cross(m, y, H)),
        e.Cartesian3.normalize(M, M),
        (p = e.Cartesian3.cross(m, M, J)),
        e.Cartesian3.normalize(p, p),
        m === i ? ((o = M), (C = p)) : m === o ? ((C = M), (i = p)) : m === C && ((i = M), (o = p))
    } else 3 === g && ((i = e.Cartesian3.UNIT_X), (o = e.Cartesian3.UNIT_Y), (C = e.Cartesian3.UNIT_Z))
    var N = K
    ;(N.x = e.Cartesian3.dot(n, i)), (N.y = e.Cartesian3.dot(n, o)), (N.z = e.Cartesian3.dot(n, C))
    var O,
      b = 0
    return (
      N.x < -c ? (b += (O = N.x + c) * O) : N.x > c && (b += (O = N.x - c) * O),
      N.y < -u ? (b += (O = N.y + u) * O) : N.y > u && (b += (O = N.y - u) * O),
      N.z < -l ? (b += (O = N.z + l) * O) : N.z > l && (b += (O = N.z - l) * O),
      b
    )
  }
  var Q = new e.Cartesian3(),
    $ = new e.Cartesian3()
  C.computePlaneDistances = function (a, n, i, s) {
    r.defined(s) || (s = new t.Interval())
    var o = Number.POSITIVE_INFINITY,
      C = Number.NEGATIVE_INFINITY,
      c = a.center,
      u = a.halfAxes,
      l = e.Matrix3.getColumn(u, 0, Y),
      d = e.Matrix3.getColumn(u, 1, G),
      h = e.Matrix3.getColumn(u, 2, F),
      x = e.Cartesian3.add(l, d, Q)
    e.Cartesian3.add(x, h, x), e.Cartesian3.add(x, c, x)
    var m = e.Cartesian3.subtract(x, n, $),
      M = e.Cartesian3.dot(i, m)
    return (
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      e.Cartesian3.add(c, l, x),
      e.Cartesian3.add(x, d, x),
      e.Cartesian3.subtract(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (M = e.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      e.Cartesian3.add(c, l, x),
      e.Cartesian3.subtract(x, d, x),
      e.Cartesian3.add(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (M = e.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      e.Cartesian3.add(c, l, x),
      e.Cartesian3.subtract(x, d, x),
      e.Cartesian3.subtract(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (M = e.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      e.Cartesian3.subtract(c, l, x),
      e.Cartesian3.add(x, d, x),
      e.Cartesian3.add(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (M = e.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      e.Cartesian3.subtract(c, l, x),
      e.Cartesian3.add(x, d, x),
      e.Cartesian3.subtract(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (M = e.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      e.Cartesian3.subtract(c, l, x),
      e.Cartesian3.subtract(x, d, x),
      e.Cartesian3.add(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (M = e.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      e.Cartesian3.subtract(c, l, x),
      e.Cartesian3.subtract(x, d, x),
      e.Cartesian3.subtract(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (M = e.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      (s.start = o),
      (s.stop = C),
      s
    )
  }
  var aa = new t.BoundingSphere()
  ;(C.isOccluded = function (a, e) {
    var n = t.BoundingSphere.fromOrientedBoundingBox(a, aa)
    return !e.isBoundingSphereVisible(n)
  }),
    (C.prototype.intersectPlane = function (a) {
      return C.intersectPlane(this, a)
    }),
    (C.prototype.distanceSquaredTo = function (a) {
      return C.distanceSquaredTo(this, a)
    }),
    (C.prototype.computePlaneDistances = function (a, t, e) {
      return C.computePlaneDistances(this, a, t, e)
    }),
    (C.prototype.isOccluded = function (a) {
      return C.isOccluded(this, a)
    }),
    (C.equals = function (a, t) {
      return a === t || (r.defined(a) && r.defined(t) && e.Cartesian3.equals(a.center, t.center) && e.Matrix3.equals(a.halfAxes, t.halfAxes))
    }),
    (C.prototype.clone = function (a) {
      return C.clone(this, a)
    }),
    (C.prototype.equals = function (a) {
      return C.equals(this, a)
    }),
    (a.OrientedBoundingBox = C)
})
