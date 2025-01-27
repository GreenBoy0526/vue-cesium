define([
  'exports',
  './AxisAlignedBoundingBox-07c6b7f2',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './when-4bbc8319',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './Transforms-d13cc04e'
], function (t, e, n, i, r, a, o, s) {
  'use strict'
  var l = new n.Cartesian4()
  function d(t, e) {
    t = (e = r.defaultValue(e, n.Ellipsoid.WGS84)).scaleToGeodeticSurface(t)
    var i = s.Transforms.eastNorthUpToFixedFrame(t, e)
    ;(this._ellipsoid = e),
      (this._origin = t),
      (this._xAxis = n.Cartesian3.fromCartesian4(n.Matrix4.getColumn(i, 0, l))),
      (this._yAxis = n.Cartesian3.fromCartesian4(n.Matrix4.getColumn(i, 1, l)))
    var a = n.Cartesian3.fromCartesian4(n.Matrix4.getColumn(i, 2, l))
    this._plane = o.Plane.fromPointNormal(t, a)
  }
  Object.defineProperties(d.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    },
    origin: {
      get: function () {
        return this._origin
      }
    },
    plane: {
      get: function () {
        return this._plane
      }
    },
    xAxis: {
      get: function () {
        return this._xAxis
      }
    },
    yAxis: {
      get: function () {
        return this._yAxis
      }
    },
    zAxis: {
      get: function () {
        return this._plane.normal
      }
    }
  })
  var c = new e.AxisAlignedBoundingBox()
  d.fromPoints = function (t, n) {
    return new d(e.AxisAlignedBoundingBox.fromPoints(t, c).center, n)
  }
  var p = new a.Ray(),
    u = new n.Cartesian3()
  ;(d.prototype.projectPointOntoPlane = function (t, e) {
    var i = p
    ;(i.origin = t), n.Cartesian3.normalize(t, i.direction)
    var o = a.IntersectionTests.rayPlane(i, this._plane, u)
    if ((r.defined(o) || (n.Cartesian3.negate(i.direction, i.direction), (o = a.IntersectionTests.rayPlane(i, this._plane, u))), r.defined(o))) {
      var s = n.Cartesian3.subtract(o, this._origin, o),
        l = n.Cartesian3.dot(this._xAxis, s),
        d = n.Cartesian3.dot(this._yAxis, s)
      return r.defined(e) ? ((e.x = l), (e.y = d), e) : new n.Cartesian2(l, d)
    }
  }),
    (d.prototype.projectPointsOntoPlane = function (t, e) {
      r.defined(e) || (e = [])
      for (var n = 0, i = t.length, a = 0; a < i; a++) {
        var o = this.projectPointOntoPlane(t[a], e[n])
        r.defined(o) && ((e[n] = o), n++)
      }
      return (e.length = n), e
    }),
    (d.prototype.projectPointToNearestOnPlane = function (t, e) {
      r.defined(e) || (e = new n.Cartesian2())
      var i = p
      ;(i.origin = t), n.Cartesian3.clone(this._plane.normal, i.direction)
      var o = a.IntersectionTests.rayPlane(i, this._plane, u)
      r.defined(o) || (n.Cartesian3.negate(i.direction, i.direction), (o = a.IntersectionTests.rayPlane(i, this._plane, u)))
      var s = n.Cartesian3.subtract(o, this._origin, o),
        l = n.Cartesian3.dot(this._xAxis, s),
        d = n.Cartesian3.dot(this._yAxis, s)
      return (e.x = l), (e.y = d), e
    }),
    (d.prototype.projectPointsToNearestOnPlane = function (t, e) {
      r.defined(e) || (e = [])
      var n = t.length
      e.length = n
      for (var i = 0; i < n; i++) e[i] = this.projectPointToNearestOnPlane(t[i], e[i])
      return e
    })
  var f = new n.Cartesian3()
  ;(d.prototype.projectPointOntoEllipsoid = function (t, e) {
    r.defined(e) || (e = new n.Cartesian3())
    var i = this._ellipsoid,
      a = this._origin,
      o = this._xAxis,
      s = this._yAxis,
      l = f
    return (
      n.Cartesian3.multiplyByScalar(o, t.x, l),
      (e = n.Cartesian3.add(a, l, e)),
      n.Cartesian3.multiplyByScalar(s, t.y, l),
      n.Cartesian3.add(e, l, e),
      i.scaleToGeocentricSurface(e, e),
      e
    )
  }),
    (d.prototype.projectPointsOntoEllipsoid = function (t, e) {
      var n = t.length
      r.defined(e) ? (e.length = n) : (e = new Array(n))
      for (var i = 0; i < n; ++i) e[i] = this.projectPointOntoEllipsoid(t[i], e[i])
      return e
    }),
    (t.EllipsoidTangentPlane = d)
})
