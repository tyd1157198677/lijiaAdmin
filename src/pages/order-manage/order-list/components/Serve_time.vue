<!--  -->
<template>
    <el-dialog
        title="服务时间"
        :visible.sync="dialogFormVisible"
        width="65%"
        :close-on-click-modal="false"
    >
        <el-form
            :model="form"
            label-position="left"
            inline
            size="small"
            :rules="rules"
            ref="ruleForm"
        >
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="订单编号">
                        <span>{{form.id}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="姓名">
                        <span>{{form.uname}}</span>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="电话">
                        <span>{{form.mobile}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="常驻人口数量">
                        <span>{{form.unum}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="实际服务时间">
                        <el-date-picker
                            v-model="form.expectedServiceTime"
                            type="datetime"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="室内面积">
                        <span>{{form.area}}</span>
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
import { updateServiceTime } from '@/api/order'
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
        open(row) {
            this.form = { ...row }
            this.dialogFormVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.expectedServiceTime = parseTime(
                        this.form.expectedServiceTime
                    )
                    let obj = {
                        id: this.form.id,
                        serviceTime: this.form.expectedServiceTime,
                    }
                    console.log(this.form.expectedServiceTime)
                    updateServiceTime(obj)
                        .then((res) => {
                            this.reset()
                            this.$emit('updateServiceTime')
                        })
                        .catch((err) => {
                            console.log(err)
                        })
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
// ::v-deep .el-form-item--small .el-form-item__label {
//     line-height: 10px;
// }
</style>