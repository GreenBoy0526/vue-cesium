define(["exports","./Cartesian2-b4b7b0b3","./Check-5e798bbf","./Transforms-73e77b72","./OrientedBoundingBox-2e9d8f93"],function(n,d,e,f,l){"use strict";var t={},i=new d.Cartesian3,x=new d.Cartesian3,b=new d.Cartesian3,B=new d.Cartesian3,P=new l.OrientedBoundingBox;function o(n,e,t,r,a){e=d.Cartesian3.subtract(n,e,i),t=d.Cartesian3.dot(t,e),e=d.Cartesian3.dot(r,e);return d.Cartesian2.fromElements(t,e,a)}t.validOutline=function(n){var e=l.OrientedBoundingBox.fromPoints(n,P).halfAxes,t=f.Matrix3.getColumn(e,0,x),n=f.Matrix3.getColumn(e,1,b),e=f.Matrix3.getColumn(e,2,B),t=d.Cartesian3.magnitude(t),n=d.Cartesian3.magnitude(n),e=d.Cartesian3.magnitude(e);return!(0===t&&(0===n||0===e)||0===n&&0===e)},t.computeProjectTo2DArguments=function(n,e,t,r){var a,i,o=l.OrientedBoundingBox.fromPoints(n,P),u=o.halfAxes,s=f.Matrix3.getColumn(u,0,x),C=f.Matrix3.getColumn(u,1,b),m=f.Matrix3.getColumn(u,2,B),c=d.Cartesian3.magnitude(s),g=d.Cartesian3.magnitude(C),n=d.Cartesian3.magnitude(m),u=Math.min(c,g,n);return(0!==c||0!==g&&0!==n)&&(0!==g||0!==n)&&(u!==g&&u!==n||(a=s),u===c?a=C:u===n&&(i=C),u!==c&&u!==g||(i=m),d.Cartesian3.normalize(a,t),d.Cartesian3.normalize(i,r),d.Cartesian3.clone(o.center,e),!0)},t.createProjectPointsTo2DFunction=function(r,a,i){return function(n){for(var e=new Array(n.length),t=0;t<n.length;t++)e[t]=o(n[t],r,a,i);return e}},t.createProjectPointTo2DFunction=function(t,r,a){return function(n,e){return o(n,t,r,a,e)}},n.CoplanarPolygonGeometryLibrary=t});