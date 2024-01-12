/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-30 15:05:43
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-30 15:10:29
 * @FilePath: \openlayers-demo\src\utils\leaf.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

class Leaf {

    constructor(x, y, rotateAngle, rotateDirection) {
        // 在绘制部分的位置
        this.x = x;
        this.y = y;
        this.rotateAngle = rotateAngle;
        this.rotateDirection = rotateDirection;
    }
}
export default Leaf;
