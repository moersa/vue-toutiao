<template>
  <div class="hello">
    <Form class="allform" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem class="from" label="电子邮件" prop="mail">
        <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
      </FormItem>
      <FormItem class="from" label="数字" prop="number">
        <Input v-model="formValidate.number" placeholder="输入数字"></Input>
      </FormItem>
      <FormItem class="from" label="价格" prop="moeny">
        <Input v-model="formValidate.moeny" placeholder="输入金额" />
      </FormItem>
      <FormItem class="from" label="密码" prop="passwd">
        <Input type="password" v-model="formValidate.passwd"></Input>
      </FormItem>
      <FormItem class="from" label="确认密码" prop="passwdCheck">
        <Input type="password" v-model="formValidate.passwdCheck"></Input>
      </FormItem>
      <FormItem class="from" label="选择" prop="select">
        <Select class="Select" v-model="formValidate.select" placeholder="请选择">
          <Option :value="item.code" v-for="item in dataList" v-bind:key="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem class="from" label="未来日期" prop="olddate">
        <DatePicker type="date" placeholder="请选择日期" :options="options1" v-model="formValidate.olddate"></DatePicker>
      </FormItem>
      <FormItem class="from" label="过去日期" prop="newdate">
        <DatePicker type="date" placeholder="请选择日期" :options="options2" v-model="formValidate.newdate"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmits('formValidate')">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import Nest from '../../nest'
  export default {
    name: 'HelloWorld',
    data() {
      const valimoney = (rule, value, callback) => {
        var numReg = /^\d+(\.\d+)?$/ //判断数字以及小数点的正则
        var numRe = new RegExp(numReg)
        if (value.indexOf(".") != -1) {
          if (numRe.test(value)) {
            if (value.toString().split(".")[0].length > 8) {
              callback(new Error('金额最多八位'));
            } else if (value.toString().split(".")[1].length > 2) {
              callback(new Error('小数点后最多两位'));
            }
          } else {
            callback(new Error('金钱格式不正确'));
          }
          callback();
        } else if (!numRe.test(value)) {
          callback(new Error('金钱格式不正确'));
        } else if (value.length > 8) {
          callback(new Error('金额最多八位'));
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入你的密码'));
        } else if (value.indexOf(' ') != -1 || value.indexOf(' ') != -1) {
          callback(new Error('密码不准含有空格'));
        } else {
          if (this.formValidate.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入你的密码'));
        } else if (value !== this.formValidate.passwd) {
          callback(new Error('两个输入密码不匹配！'));
        } else {
          callback();
        }
      };
      return {
        options1: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        options2: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now() - 86400000;
          }
        },
        dataList: [{
          id: 1,
          name: '中华人民共和国',
          code: 'china'
        }, {
          id: 2,
          name: '美国',
          code: 'usa'
        }],
        formValidate: {
          mail: '',
          number: '',
          moeny: '',
          select: '',
          olddate: '',
          newdate: '',
        },
        ruleValidate: {
          mail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '数字不能为空', trigger: 'blur' },
            { type: 'string', pattern: /^\d+$/, message: '不准输入非数字字符', trigger: 'blur' }
          ],
          moeny: [
            { required: true, message: '金钱数不可为空', trigger: 'blur' },
            { type: 'string', validator: valimoney, trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '密码不可为空', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { required: true, message: '密码不可为空', trigger: 'blur' },
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          select: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          olddate: [
            { required: true, message: '日期不可为空', trigger: 'change', pattern: /.+/ }
          ],
          newdate: [
            { required: true, message: '日期不可为空', trigger: 'change', pattern: /.+/ }
          ],
        }
      }
    },
    created() {
      let saMenuList = [
        {
          name: "1",
          children: [
            {
              name: "1-1"
            }
          ]
        },
        {
          name: "2",
          children: [
            {
              name: "2-1"
            },
            {
              name: "2-2",
              children: [
                {
                  name: "2-3"
                },
                {
                  name: "2-4",
                  children: [
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "3",
          children: [
            {
              name: "3-1",
              children: [
                {
                  name: "3-2"
                },
                {
                  name: "3-3",
                  children: []
                }
              ]
            }
          ]
        }
      ];   
      const nest = new Nest();
      console.log(nest.recursion(saMenuList,'name','children',false,[]))
      console.log(nest.recursion(saMenuList,'name','children',true,[]))
    },
    methods: {
      handleSubmits(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .from {
    width: 300px;
  }

  .allform {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>