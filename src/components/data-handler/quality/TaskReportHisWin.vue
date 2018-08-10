<script>
  import TaskReportPM from "./TaskReportPM" ;
  import TaskReportHisDetailWin from "./TaskReportHisDetailWin" ;
  import Inject from "@/common/model/Inject" ;
  import ProcessAPI from "@/common/service/ProcessAPI" ;


  export default {
    components:{TaskReportHisDetailWin},
    data() {
      this.viewPM = Inject.getClass(TaskReportPM) ;
      return {
        viewData:this.viewPM.data,
        isOpen:false,
        orgDetail:[],
        timeCycle:[],
        jobId:"",
        items:'',
        keys:[]
      }
    },

    mounted(){

    },
    methods:{
      //本组件页面打开
      open(item){
        this.jobId = item.id ;
        this.items = item;
        //table内容
        ProcessAPI.qualityQualityReportListSeeDetails({
          id:item.id
        }).then(
          (result)=>{
            if(result.resultdata.length > 0){
              this.orgDetail = result.resultdata;
            }else{
              this.orgDetail =  [];
            }
          },
          ()=>{

          }
        );
        this.isOpen = true;
      },
      closeWin(){
        this.isOpen = false;
      },
      //element-ui中时间日期格式获取
      getTime(date){
        this.timeCycle = date;
        // console.log(this.timeCycle);
      },
      //查询
      query(){
        ProcessAPI.qualityQualityReportListSeeDetails({
          id:this.jobId,
          startTime:this.timeCycle[0],
          endTime:this.timeCycle[1]
        }).then(
          (result)=>{
             // console.log(result.resultdata);
            this.orgDetail = result.resultdata;
          },
          ()=>{

          }
        );
      },
      //去重（弹出框---3）
      goHeavy(items){
        // console.log(items);
        let arr = items.resultVal;
        for(let key in arr){
          if(arr.hasOwnProperty(key)){
            this.keys.push(key);
          }
        }
        Object.assign(items,{type:this.keys[3],title:'去重'});
        if(this.keys[3] === 'valDweight')
        this.$refs.taskHisDetail.open(items);
        delete items.type;
        delete  items.title;
      },
      //空值（弹出框---1）
      emptyValue(items){
        let arr = items.resultVal;
        for(let key in arr){
          if(arr.hasOwnProperty(key)){
            this.keys.push(key);
          }
        }
        Object.assign(items,{type:this.keys[1],title:'空值'});
        // console.log(items);
        if(this.keys[1] === 'valNull')
        this.$refs.taskHisDetail.open(items);
        delete items.type;
        delete  items.title;
      },
      //值域（弹出框---4）
      valueField(items){
        let arr = items.resultVal;
        for(let key in arr){
          if(arr.hasOwnProperty(key)){
            this.keys.push(key);
          }
        }
        Object.assign(items,{type:this.keys[4],title:'值域'});
        // console.log(items);
        if(this.keys[1] === 'valNull')
          this.$refs.taskHisDetail.open(items);
        delete items.type;
        delete  items.title;
      },
      //身份证（弹出框---2）
      identityCard(items){
        let arr = items.resultVal;
        for(let key in arr){
          if(arr.hasOwnProperty(key)){
            this.keys.push(key);
          }
        }
        Object.assign(items,{type:this.keys[2],title:'身份证'});
        // console.log(items);
        if(this.keys[1] === 'valNull')
          this.$refs.taskHisDetail.open(items);
        delete items.type;
        delete  items.title;
      },
      //URL(弹出框----0)
      uRl(items){
        let arr = items.resultVal;
        for(let key in arr){
          if(arr.hasOwnProperty(key)){
            this.keys.push(key);
          }
        }
        Object.assign(items,{type:this.keys[0],title:'URL'});
        // console.log(items);
        if(this.keys[1] === 'valNull')
          this.$refs.taskHisDetail.open(items);
        delete items.type;
        delete  items.title;
      }
    }
  }

</script>

<style scoped lang="scss">
  .container{
    @include abs-group(10px,10px,10px,10px) ;
    .layout{
      @include abs-group( ) ;
      .table-view{
        flex:auto;
        width:100%;
        overflow: auto;
        .table-inner{
          position: relative;
          .btn{
            position: absolute;
            right:4%;
            top: 0;

          }
        }
        .table-text{

          .tale-time{
            display:flex;
            justify-content: center;
          }

        }
      }
    }
    .footer{
      width:100%;
    }
  }
  .auto-layout{
    width:100%;
  }
</style>

<template>
  <s-window title="查看详情"
            @close="()=>{this.closeWin()}"
            :visible="isOpen"
            :width="'1000px'"
            :height="'400px'" >
    <div class="container">
      <v-group-iwt class="layout">
        <!--tabale-->
        <div class="table-view">
          <!--时间查询-->
          <div class="table-inner">
            <el-form ref="form"
                     size="mini"
                     label-width="100px"
                     label-position="right">
              <tile-group-iwt :column="1" style="width:100%">
                <tile-item-iwt>
                  <el-form-item label="时间周期:" >

                    <el-date-picker
                      style="width:80%;"
                      v-model="timeCycle"
                      type="daterange"
                      @change="getTime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>

                  </el-form-item>
                </tile-item-iwt>
              </tile-group-iwt>
            </el-form>
            <div class="btn">
              <el-button type="primary" size="mini"
                         style="min-width: 64px;"
                         @click="query">查询</el-button>
            </div>
          </div>
         <!--列表内容 table-->
          <div class="table-text">
            <div class="table-time" style="text-align: center">
                字段明细情况
            </div>
            <el-table
              border
              :data="orgDetail"
              size="mini"
              style="width:100%"
              min-height="100%">
              <el-table-column type="index"  label="序号">
              </el-table-column>

              <el-table-column prop="insertTIme"  label="执行时间">
              </el-table-column>

              <el-table-column  prop="resouceName" label="资源名称">
              </el-table-column>

              <el-table-column  prop="sums" label="总数" width="80">
              </el-table-column>

              <el-table-column  prop="sumerro" label="问题数" width="80">
              </el-table-column>

              <el-table-column align="center"  label="问题数（个）">

                <el-table-column align="center"  prop="resultVal.valDweight" label="去重" width="80">
                  <template slot-scope="scope">
                    <div style="color:#409EFF;text-decoration:underline;cursor:pointer;" @click="goHeavy(scope.row)">{{ scope.row.resultVal.valDweight}}
                    </div>
                  </template>
                </el-table-column>

                <el-table-column align="center"  prop="resultVal.valNull" label="空值" width="80">
                  <template slot-scope="scope">
                    <div style="color:#409EFF;text-decoration:underline;cursor:pointer;" @click="emptyValue(scope.row)">{{ scope.row.resultVal.valNull}}
                    </div>
                  </template>
                </el-table-column>

                <el-table-column align="center"  prop="resultVal.val" label="值域" width="80">
                  <template slot-scope="scope">
                    <div style="color:#409EFF;text-decoration:underline;cursor:pointer;" @click="valueField(scope.row)">{{ scope.row.resultVal.val}}
                    </div>
                  </template>
                </el-table-column>

                <el-table-column align="center"  prop="resultVal.valIDcard" label="身份证" width="80">
                  <template slot-scope="scope">
                    <div style="color:#409EFF;text-decoration:underline;cursor:pointer;" @click="identityCard(scope.row)">{{ scope.row.resultVal.valIDcard}}
                    </div>
                  </template>
                </el-table-column>

                <el-table-column align="center"  prop="resultVal.valURL" label="URL" width="80">
                  <template slot-scope="scope">
                    <div style="color:#409EFF;text-decoration:underline;cursor:pointer;" @click="uRl(scope.row)">{{ scope.row.resultVal.valURL}}
                    </div>
                  </template>
                </el-table-column>

              </el-table-column>
            </el-table>
          </div>


        </div>
        <v-gap-iwt></v-gap-iwt>
        <h-group-iwt :hor="'center'" class="footer">
          <el-button type="warning" @click="closeWin">取消</el-button>
        </h-group-iwt>
      </v-group-iwt>
    </div>
    <!--问题数弹出框-->
    <task-report-his-detail-win ref="taskHisDetail"></task-report-his-detail-win>

  </s-window>
</template>

