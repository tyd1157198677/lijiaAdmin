<!--  -->
<template>
    <el-dialog title="设置失效订单" :visible.sync="dialogFormVisible" width="65%">
        <el-form :model="form" label-position="left" size="small" :rules="rules" ref="ruleForm">
            <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" type="textarea" placeholder="请输入备注信息"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="reset" size="small">取 消</el-button>
            <el-button size="small" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { invalidOrder } from '@/api/order'
export default {
    components: {},
    data() {
        return {
            dialogFormVisible: false,
            form: {
                remark: '',
                id: '',
            },

            additionalCosts: [
                {
                    item: '',
                    cost: null,
                },
            ],
            rules: {
                remark: [
                    {
                        required: true,
                        message: '请填写失效原因或与客户的沟通记录',
                        trigger: 'change',
                    },
                ],
            },
        }
    },
    computed: {},
    watch: {},
    methods: {
        open(id) {
            this.form.id = id
            this.dialogFormVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {
                        id: this.form.id,
                        remark: this.form.remark,
                    }
                    this.$confirm('确定要设置该订单为失效订单吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            invalidOrder(obj)
                                .then((res) => {
                                    if (res.rc == 0) {
                                        this.$message.success('设置成功')
                                        this.reset()
                                        this.$emit('invalidOrder')
                                    }
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        })
                        .catch(() => {})
                }
            })
        },
        reset() {
            this.$refs.ruleForm.resetFields()
            this.additionalCosts = [
                {
                    item: '',
                    cost: null,
                },
            ]
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