<!--  -->
<template>
    <el-dialog
        title="创建订单"
        :visible.sync="dialogFormVisible"
        width="65%"
        :close-on-click-modal="false"
    >
        <el-form
            :model="form"
            label-position="top"
            inline
            size="small"
            :rules="rules"
            ref="ruleForm"
        >
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="姓名" prop="uname">
                        <el-input v-model="form.uname" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="性别">
                        <el-select v-model="form.gender" placeholder="请选择">
                            <el-option label="男" :value="1"></el-option>
                            <el-option label="女" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电话或手机号码" prop="mobile">
                        <el-input v-model="form.mobile" type="number" placeholder="请输入电话或手机号码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="常驻人口数量" prop="unum">
                        <el-input v-model.number="form.unum" type="number" placeholder="请输入常驻人口数量"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="家庭户型">
                        <el-select v-model="form.houseType" placeholder="请选择">
                            <el-option label="33平米星光开间Mini" :value="1"></el-option>
                            <el-option label="38极光星光开间Standard" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="室内面积">
                        <el-select v-model="form.area" placeholder="请选择">
                            <el-option label="50以内" :value="1"></el-option>
                            <el-option label="50-80" :value="2"></el-option>
                            <el-option label="89-90" :value="3"></el-option>
                            <el-option label="100-139" :value="4"></el-option>
                            <el-option label="139以上" :value="5"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="预计费用" prop="estimatedCost">
                        <el-input v-model.number="form.estimatedCost" type="number"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="期望服务时间" prop="expectedServiceTime">
                        <el-date-picker
                            v-model="form.expectedServiceTime"
                            type="datetime"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="reset" size="mini">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { saveOrder } from '@/api/order'
import { parseTime } from '@/filters/filters'
export default {
    components: {},
    data() {
        return {
            dialogFormVisible: false,
            form: {
                uname: '',
                unum: null,
                gender: 1,
                area: 1,
                mobile: '',
                houseType: 1,
                estimatedCost: null,
                expectedServiceTime: '',
            },
            rules: {
                uname: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur',
                    },
                ],
                mobile: [
                    {
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur',
                    },
                    {
                        validator: function (rule, value, callback) {
                            if (/^1[34578]\d{9}$/.test(value) == false) {
                                callback(new Error('请输入正确的手机号'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur',
                    },
                ],
                unum: [
                    {
                        required: true,
                        message: '请输入常驻人口数量',
                        trigger: 'blur',
                    },
                ],
                estimatedCost: [
                    {
                        required: true,
                        message: '请输入预计费用',
                        trigger: 'blur',
                    },
                ],
                expectedServiceTime: [
                    {
                        // type: 'date',
                        required: true,
                        message: '请选择期望服务时间',
                        trigger: 'change',
                    },
                ],
            },
        }
    },
    computed: {},
    watch: {},
    methods: {
        open() {
            this.dialogFormVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.expectedServiceTime = parseTime(
                        this.form.expectedServiceTime
                    )
                    saveOrder(this.form)
                        .then((res) => {
                            this.$emit('createOrder')
                            this.reset()
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        reset() {
            this.$refs.ruleForm.resetFields()
            this.dialogFormVisible = false
        },
    },
    created() {},
    mounted() {},
}
</script>
<style lang='scss' scoped>
::v-deep .el-form-item--small .el-form-item__label {
    line-height: 10px;
}
</style>