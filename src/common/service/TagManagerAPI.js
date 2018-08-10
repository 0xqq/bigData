import SPath from "./server/SPath";
import RdjcServer from "./server/RdjcServer";

/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
class TagManagerAPI {
    constructor() {
    }


  /**
   * 数据 标签添加
   * @param params
   * @param options
   * @returns {*}
   */
  static saveDataTag(params,options=null){
    return TagManagerAPI.server.postData("/api/resourceTag/saveTag",params) ;
  }

  /**
   * 标签 数据 查询
   * @param params
   * @param options
   * @returns {*}http://10.0.40.28:8090/tagTree//getAllTagList GET
   */
  static queryDataTagList(params,options=null){
    return TagManagerAPI.server.getData("/api/resourceTag/getAllTagList",params) ;
  }

  /**
   * 删除标签
   */
  static queryDeleteTag(params,options=null){
    return TagManagerAPI.server.postData("/api/resourceTag/deleteTag",params) ;
  }


  /**
   * 标签 数据 查询
   * @param params
   * @param options
   * @returns {*}http://10.0.40.28:8090/tagTree//getAllTagList GET
   */
  static queryTagList(params,options=null){
    return TagManagerAPI.server.getData("/api/resourceTag/getTagList",params) ;
  }



}

//服务对象
TagManagerAPI.server = new RdjcServer()
export default TagManagerAPI;
