import CheckTextInput from "./CheckTextInput" ;
import TextInput from "./TextInput" ;
import CheckBox from "./CheckBox" ;
import ComboBox from "./ComboBox" ;
import DataGrid from "./DataGrid" ;
import GroupTab from "./GroupTab" ;
import HadoopFileOutput from "../output/HadoopFileOutput" ;
import LocalFileBrowse from "./LocalFileBrowse" ;
import FoldFileBrowe from "./FoldFileBrowe" ;
import HadoopCluster from "./HadoopCluster" ;
import MappingConfig from "../output/MappingConfig" ;
import HBaseTableName from "./HBaseTableName" ;
import GetMappingName from "./GetMappingName" ;
import HadoopFileInput from "../input/HadoopFileInput" ;
import SelectTable from "./SelectTable" ;
import CheckList from "./CheckList" ;
import ClusterComboBox from "./ClusterComboBox" ;
import ZipFile from "../zip/ZipFile" ;
import FieldCombox from "./FieldCombox" ;
import CheckComboBox from "./CheckComboBox" ;

class FormItemMap{
}

/**
 * 默认组件
 * @type {{props, data, mounted, watch, computed, methods}}
 */
FormItemMap.defaultComp = TextInput ;

/**
 * 组件引用对象
 * @returns {{TextInput: {props, data, mounted, watch, computed, methods}, CheckTextInput: {components, props, data, mounted, watch, computed, methods}, CheckBox: {components, props, data, mounted, watch, computed, methods}, ComboBox: {components, props, data, mounted, watch, computed, methods}, DataGrid: {components, props, data, mounted, watch, computed, methods}}}
 */
FormItemMap.comps =  {
  TextInput,
  CheckTextInput,
  CheckBox,
  ComboBox,
  DataGrid,
  GroupTab,
  SelectTable,
  CheckList,
  ClusterComboBox,
  FieldCombox,
  CheckComboBox,

  ZipFile,
  HadoopFileOutput,
  LocalFileBrowse,
  FoldFileBrowe,
  HadoopCluster,
  MappingConfig,
  HBaseTableName ,
  GetMappingName,
  HadoopFileInput
} ;

/**
 * 组件地图
 * @type {{textinput: {props, data, mounted, watch, computed, methods}, checktextinput: {components, props, data, mounted, watch, computed, methods}, checkbox: {components, props, data, mounted, watch, computed, methods}, combobox: {components, props, data, mounted, watch, computed, methods}, datagrid: {components, props, data, mounted, watch, computed, methods}}}
 */
FormItemMap.map = {
  "textinput":TextInput,
  "checktextinput":CheckTextInput,
  "checkbox":CheckBox,
  "combobox":ComboBox,
  "datagrid":DataGrid,
  "group":GroupTab,
  "selecttable":SelectTable,
  "checklist":CheckList,
  "clustercombobox":ClusterComboBox,
  "fieldcombox":FieldCombox,
  "checkcombobox":CheckComboBox,

  "zipfile":ZipFile,
  "hadoopfileoutput":HadoopFileOutput,
  "localfilebrowse": LocalFileBrowse,
  "foldfilebrowe":FoldFileBrowe,
  "hadoopcluster":HadoopCluster,
  "mappingconfig":MappingConfig,
  "hbasetablename":HBaseTableName ,
  "getmappingname":GetMappingName,
  "hadoopfileinput":HadoopFileInput,
} ;


/**
 *  获得对应渲染组件
 * @param item
 * @returns {*}
 */
FormItemMap.getItemComp = function(item) {
  if(!item || !item.type)
     return FormItemMap.defaultComp ;
  let _type = item.type.toLowerCase();
  if (FormItemMap.map.hasOwnProperty(_type))
    return FormItemMap.map[_type];
  return FormItemMap.defaultComp ;
}

export default FormItemMap ;

