/* @win_input组件
 * @Author: mikey.zhaopeng
 * @Date: 2019-06-05 14:01:33
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-06-11 14:17:12
 */

import { Menu } from "element-ui";
import "./style.css/menu.scss";
export const win_menu = {
    extends: Menu
};
import { MenuItem } from "element-ui";
export const win_menu_item = {
    extends: MenuItem
};

import { Submenu } from "element-ui";
export const win_sub = {
    extends: Submenu
};
