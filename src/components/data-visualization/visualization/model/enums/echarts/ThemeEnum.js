import echarts from 'echarts/lib/echarts'
import defaultTheme from './themes/default'

class Theme {
  constructor(id,name){
    this.id = id
    this.name = name
  }
}

const ThemeEnum = {}
ThemeEnum.themeEnumList = []
ThemeEnum.themeEnumMap = new Map()


ThemeEnum.ECHARTS_DEFAULT = new Theme('default', '默认主题')
echarts.registerTheme(ThemeEnum.ECHARTS_DEFAULT.id,defaultTheme)
ThemeEnum.themeEnumMap.set(ThemeEnum.ECHARTS_DEFAULT.id, ThemeEnum.ECHARTS_DEFAULT)
ThemeEnum.themeEnumList.push(ThemeEnum.ECHARTS_DEFAULT)

export default ThemeEnum
