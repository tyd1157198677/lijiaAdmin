<!--  -->
<template>
    <el-dialog title="确认完成" :visible.sync="dialogFormVisible" width="60%">
        <el-form :model="form" label-position="left" size="small" :rules="rules" ref="ruleForm">
            <el-form-item label="实际收款" prop="cost">
                <el-input v-model.number="form.cost" placeholder="请输入实际收款"></el-input>
            </el-form-item>
            <el-form-item label="服务记录" prop="serviceRecord">
                <el-input v-model="form.serviceRecord" type="textarea" placeholder="请输入服务记录"></el-input>
            </el-form-item>
        </el-form>

        <el-row :gutter="40">
            <el-col :span="12">
                <div style="text-align:right">
                    <el-button type="success" size="mini" @click="addPro(1)">添加项目</el-button>
                </div>
                <el-table :data="additionalCosts" style="width: 100%">
                    <el-table-column label="项目" align="left">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.item" placeholder="请输入项目"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center">
                        <template slot-scope="scope">
                            <el-input v-model.number="scope.row.cost" placeholder="请输入金额"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(1,scope.$index)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <div style="text-align:right">
                    <el-button type="success" size="mini" @click="addPro(2)">添加优惠券</el-button>
                </div>
                <el-table :data="arr" style="width: 100%">
                    <el-table-column label="优惠券码" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.coupon" placeholder="请输入优惠券码"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(2,scope.$index)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false" size="small">取 消</el-button>
            <el-button size="small" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { finishOrder, checkCoupon } from '@/api/order'
export default {
    components: {},
    data() {
        return {
            dialogFormVisible: false,
            form: {
                cost: null,
                serviceRecord: '',
                id: '',
            },

            additionalCosts: [
                {
                    item: '',
                    cost: null,
                },
            ],
            arr: [
                {
                    coupon: '',
                },
            ],
            rules: {
                serviceRecord: [
                    {
                        required: true,
                        message: '请输入服务记录',
                        trigger: 'change',
                    },
                ],
                cost: [
                    {
                        required: true,
                        message: '请输入实际收款',
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
            this.$nextTick(() => {
                this.reset()
            })
        },
        finishOrder(obj) {
            finishOrder(obj)
                .then((res) => {
                    this.$emit('finishOrder')
                    this.dialogFormVisible = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        checkCoupon(obj, obj1) {
            checkCoupon(obj1).then((res) => {
                if (res.rc === 0) {
                    this.$message.success('校验成功！')
                    this.finishOrder(obj)
                    return true
                } else {
                    this.$message.error('优惠券码错误！')
                    return false
                }
            })
        },
        handleDelete(i, index) {
            this.$confirm('您确定要删除此项吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    if (i == 1) {
                        this.additionalCosts.splice(index, 1)
                    } else {
                        this.arr.splice(index, 1)
                    }
                })
                .catch(() => {})
        },
        addPro(i) {
            if (i == 1) {
                this.additionalCosts.push({
                    item: '',
                    cost: null,
                })
            } else {
                this.arr.push({
                    item: '',
                })
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let isHave = this.arr.every((e) => e.coupon)
                    let isHave1 = this.additionalCosts.every((e) => e.item)

                    let obj = {
                        id: this.form.id,
                        cost: this.form.cost,
                        serviceRecord: this.form.serviceRecord,
                        additionalCosts: isHave1 ? this.additionalCosts : [],
                    }

                    if (isHave) {
                        let coupon = this.arr.map((e) => e.coupon) + []
                        let obj1 = {
                            id: this.form.id,
                            coupon: coupon,
                        }
                        this.checkCoupon(obj, obj1)
                    } else {
                        this.finishOrder(obj)
                    }
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
            this.arr = [
                {
                    coupon: '',
                },
            ]
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