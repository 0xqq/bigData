class ConditionType {
  constructor() {
    this.id = null;
    this.alias = null;
  }
}

const ConditionTypeEnum = {};

ConditionTypeEnum.EQUAL = new ConditionType('equal',"等于")
ConditionTypeEnum.IN = new ConditionType('in',"包含")
ConditionTypeEnum.NOT_IN = new ConditionType('not in',"排除")
ConditionTypeEnum.LIKE = new ConditionType('like',"模糊匹配")


export default ConditionTypeEnum
