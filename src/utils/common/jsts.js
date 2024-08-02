// import * as jsts from 'jsts/dist/jsts.min.js';
// import * as jsts from 'jsts'
import {
    GeometryCollection,
    LinearRing,
    LineString,
    MultiLineString,
    MultiPoint,
    MultiPolygon,
    Point,
    Polygon,
} from 'ol/geom';
// 实例化OL解析类
const OLParser = new jsts.io.OL3Parser();

// 注入OL几何对象
OLParser.inject(
    Point,
    LineString,
    LinearRing,
    Polygon,
    MultiPoint,
    MultiLineString,
    MultiPolygon,
    GeometryCollection,
);
/**
 * 取交
 * @param geom
 * @param geomB
 * @returns
 */
const intersects = (geom, geomB) => {
    const jstsGeom = OLParser.read(geom);
    const jstsGeomB = OLParser.read(geomB);

    if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
        console.error('几何对象出现拓扑错误,请检查修复');

        return null;
    }

    const difference = jstsGeom.intersection(jstsGeomB);

    return OLParser.write(difference);
};

/**
 * 取geom中geomB的补集
 * @param geom
 * @param geomB
 * @returns
 */
const getDifference = (geom, geomB) => {
    const jstsGeom = OLParser.read(geom);
    const jstsGeomB = OLParser.read(geomB);

    if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
        console.error('几何对象出现拓扑错误,请检查修复');

        return null;
    }

    const difference = jstsGeom.difference(jstsGeomB);

    return OLParser.write(difference);
};
/**
* 融合
* @param geom
* @param geomB
* @returns
*/
const union = (geom, geomB) => {
    const jstsGeom = OLParser.read(geom);
    const jstsGeomB = OLParser.read(geomB);

    if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
        console.error('几何对象出现拓扑错误,请检查修复');

        return null;
    }

    const difference = jstsGeom.union(jstsGeomB);

    return OLParser.write(difference);
};
/**
* 对等差分
* @param geom
* @param geomB
* @returns
*/
const symDifference = (geom, geomB) => {
    const jstsGeom = OLParser.read(geom);
    const jstsGeomB = OLParser.read(geomB);

    if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
        console.error('几何对象出现拓扑错误,请检查修复');

        return null;
    }

    const difference = jstsGeom.symDifference(jstsGeomB);

    return OLParser.write(difference);
};
export default {
    intersects,
    getDifference,
    union,
    symDifference,
}
