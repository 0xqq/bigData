/**
 * 分析的单独写 方便别人用 避免弄不明白dfd
 * @Author: zc
 * @Modifications:
 * @See:
 */
import ServerBase from "./ServerBase";
import SPath from "./SPath";

export default class AnalysisServer extends ServerBase{

  constructor( ) {
    super( SPath.ANAYSIS_BASE,SPath.ANAYSIS_TEST ,SPath.ANAYSIS_PROXY ) ;
  }
}
