define([
  './when-4bbc8319',
  './PrimitivePipeline-fc555140',
  './createTaskProcessorWorker',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './WebGLConstants-1c8239cc',
  './combine-83860057',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './GeometryPipeline-2356afec',
  './AttributeCompression-af389d04',
  './EncodedCartesian3-f286cedc',
  './IndexDatatype-b7d979a6',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './WebMercatorProjection-58801a11'
], function (e, r, t, n, a, i, o, c, s, u, f, d, m, b, l, p, y, P) {
  'use strict'
  var v = {}
  function k(r) {
    var t = v[r]
    return (
      e.defined(t) ||
        ('object' == typeof exports
          ? (v[t] = t = require('Workers/' + r))
          : require(['Workers/' + r], function (e) {
              v[(t = e)] = e
            })),
      t
    )
  }
  return t(function (t, n) {
    for (var a = t.subTasks, i = a.length, o = new Array(i), c = 0; c < i; c++) {
      var s = a[c],
        u = s.geometry,
        f = s.moduleName
      if (e.defined(f)) {
        var d = k(f)
        o[c] = d(u, s.offset)
      } else o[c] = u
    }
    return e.when.all(o, function (e) {
      return r.PrimitivePipeline.packCreateGeometryResults(e, n)
    })
  })
})
