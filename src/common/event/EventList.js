class EventList{
}

//当前坐席状态变化通知


//切换路由
EventList.CHANGE_MAIN_VIEW_SYS = "change_main_view_sys" ;

//显示隐藏菜单
EventList.COLLAPSE_MENU_SYS = "collapse_menu_sys" ;

EventList.REFRESH_VIEW_SYS = "refresh_view_sys" ;

/**
 * 布局模板新增或修改操作
 * @type {string}
 */
EventList.GRID_LAYOUT_SAVE_OR_UPDATE = "grid_layout_save_or_update" ;

/**
 * 编辑页面屏幕过程中，重新编辑某屏幕布局模板
 * @type {string}
 */
EventList.CHANGE_SCREEN_GRID_LAYOUT = "change_screen_grid_layout" ;
/**
 * 编辑页面屏幕过程中，重新编辑某屏幕基本属性
 * @type {string}
 */
EventList.CHANGE_SCREEN_BASE_INFO = "change_screen_base_info" ;
/**
 * 编辑页面容器过程中，重新编辑某容器基本属性
 * @type {string}
 */
EventList.EDIT_CONTAINER_BASE_INFO = "edit_container_base_info" ;
/**
 * 编辑图表过程中，重新编辑某图表基本属性
 * @type {string}
 */
EventList.EDIT_CHART_BASE_INFO = "edit_chart_base_info" ;
/**
 * 开始配置图表
 * @type {string}
 */
EventList.CHART_CONFIG_BEGAIN = "chart_config_begain";
/**
 * 完成和保存配置图表
 * @type {string}
 */
EventList.CHART_CONFIG_COMPLETE = "chart_config_complete";
/**
 * 图表数据源配置
 * @type {string}
 */
EventList.CHART_DATASOURCE_CONFIG = "chart_datasource_config";

export default EventList ;
