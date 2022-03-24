<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="创建时间">
                <el-date-picker
                    v-model="formInline.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formInline.mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getOrders">搜索</el-button>
                <el-button type="primary" @click="onSubmit">创建订单</el-button>
            </el-form-item>
        </el-form>
        <div class="formFlex">
            <ul class="statuItem">
                <li
                    v-for="(item,index) in statusList"
                    :key="item"
                    :class="order===index?'active':''"
                    @click="handleClick(index)"
                >{{ item }}</li>
            </ul>
            <el-button type="primary" size="small" @click="exportOrders">导出</el-button>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%;margin-top:10px"
            :header-cell-style="rowClass"
        >
            <el-table-column prop="id" label="订单编号" width="120" align="center" fixed="left"></el-table-column>
            <el-table-column prop="status" label="订单状态" width="100" align="center" fixed="left"></el-table-column>
            <el-table-column prop="uname" label="姓名" width="80" align="center"></el-table-column>
            <el-table-column prop="gender" label="姓别" width="60" align="center"></el-table-column>
            <el-table-column prop="mobile" label="电话" width="120" align="center"></el-table-column>
            <el-table-column prop="expectedServiceTime" label="期望服务时间" width="160" align="center"></el-table-column>
            <el-table-column prop="houseType" label="户型" width="180" align="center"></el-table-column>
            <el-table-column prop="area" label="面积(㎡)" width="80" align="center"></el-table-column>
            <el-table-column prop="unum" label="常驻人口数量" width="110" align="center"></el-table-column>
            <el-table-column prop="serviceTime" label="实际服务时间" width="160" align="center"></el-table-column>
            <el-table-column prop="estimatedCost" label="订单金额" width="100" align="center"></el-table-column>
            <el-table-column prop="cost" label="实际收款" width="100" align="center"></el-table-column>
            <el-table-column label="优惠券" prop="coupons" min-width="100px" align="center">
                <template slot-scope="scope">
                    <span v-if="!scope.row.coupons"></span>
                    <span
                        v-else-if="scope.row.coupons&&scope.row.coupons.length==1"
                    >{{scope.row.coupons[0]}}</span>
                    <el-popover v-else placement="right" width="80" trigger="hover">
                        <div v-for="item in scope.row.coupons" :key="item">{{item}}</div>
                        <span class="btnTab" slot="reference">更多优惠券</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作"
                align="center"
                min-width="250px"
                fixed="right"
            >
                <template slot-scope="scope">
                    <span class="btnTab" @click="handleTo(scope.row,1)">服务时间</span>
                    <span class="btnTab" @click="handleTo(scope.row,2)">下载工单</span>
                    <span class="btnTab" @click="handleTo(scope.row.id,3)">确认完成</span>
                    <span
                        v-if="scope.row.status!=='已失效'"
                        class="btnTab"
                        @click="handleTo(scope.row.id,4)"
                    >失效</span>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            :total="total"
            :current-page="formInline.pn"
            :pageSize="formInline.ps"
            @pageChange="pageAChange"
        />
        <createOrder ref="createOrder" @createOrder="getOrders"></createOrder>
        <serveTime ref="serveTime" @updateServiceTime="getOrders"></serveTime>
        <finishOrder ref="finishOrder" @finishOrder="getOrders"></finishOrder>
        <invalidOrder ref="invalidOrder" @invalidOrder="getOrders"></invalidOrder>
    </div>
</template>

  <script>
import { getOrders } from '@/api/order'
import { parseTime } from '@/filters/filters'
export default {
    components: {
        Pagination: () => import('@/components/Pagination.vue'),
        createOrder: () => import('./components/Create_order.vue'),
        serveTime: () => import('./components/Serve_time.vue'),
        finishOrder: () => import('./components/Finish_order.vue'),
        invalidOrder: () => import('./components/InvalidOrder.vue'),
    },
    data() {
        return {
            formInline: {
                time: [],
                mobile: '',
                pn: 1,
                ps: 10,
            },
            total: 0,
            order: 0,
            statusList: ['全部', '未服务', '已服务', '已失效'],
            tableData: [],
        }
    },
    mounted() {
        this.getOrders()
        // console.log(process.env)
    },
    methods: {
        rowClass() {
            return 'background:#F3F4F7;color:#555;font-weight:600'
        },
        onSubmit() {
            this.$refs.createOrder.open()
        },
        exportOrders() {
            let obj = {
                mobile: this.formInline.mobile,
                pn: this.formInline.pn, //页码
                ps: this.formInline.ps, //每页数据
                status:
                    this.order === 0
                        ? ''
                        : this.order === 1
                        ? 0
                        : this.order === 2
                        ? 1
                        : 2,
                begn: this.formInline.time
                    ? parseTime(this.formInline.time[0], 'yy-dd-ss') || ''
                    : '',
                end: this.formInline.time
                    ? parseTime(this.formInline.time[1]) || ''
                    : '',
            }
            this.$download('/lijia/order/exportOrders', obj, 'order')
        },
        handleTo(row, i) {
            if (i == 1) {
                this.$refs.serveTime.open(row)
            } else if (i == 2) {
                let obj = {
                    id: row.id,
                    serviceTime: row.serviceTime,
                }
                if (row.serviceTime) {
                    this.$download(
                        '/lijia/order/exportOrder',
                        obj,
                        `${row.uname}的工单`
                    )
                } else {
                    this.$confirm(
                        `确定该时间:${row.expectedServiceTime}为服务时间可下载工单，是否确认？`,
                        '提示',
                        {
                            confirmButtonText: '确认并下载',
                            cancelButtonText: '取消',
                            type: 'warning',
                        }
                    )
                        .then(() => {
                            this.$download(
                                '/lijia/order/exportOrder',
                                obj,
                                `${row.uname}的工单`
                            )
                        })
                        .catch(() => {})
                }
            } else if (i == 3) {
                this.$refs.finishOrder.open(row)
            } else if (i == 4) {
                this.$refs.invalidOrder.open(row)
            }
        },

        async getOrders() {
            let obj = {
                mobile: this.formInline.mobile,
                pn: this.formInline.pn, //页码
                ps: this.formInline.ps, //每页数量
                status:
                    this.order === 0
                        ? ''
                        : this.order === 1
                        ? 0
                        : this.order === 2
                        ? 1
                        : 2,
                begn: this.formInline.time
                    ? parseTime(this.formInline.time[0]) || ''
                    : '',
                end: this.formInline.time
                    ? parseTime(this.formInline.time[1]) || ''
                    : '',
            }
            try {
                let { data } = await getOrders(obj)
                data.lst.forEach((e) => {
                    e.expectedServiceTime = parseTime(e.expectedServiceTime)
                    e.serviceTime = parseTime(e.serviceTime)
                    e.coupons = e.coupons ? e.coupons.split(',') : ''
                    e.status =
                        e.status === 0
                            ? '未服务'
                            : e.status === 1
                            ? '已服务'
                            : '已失效'
                    e.gender = e.gender === 1 ? '男' : '女'
                    e.uname = decodeURI(e.uname)
                    e.houseType =
                        e.houseType === 1
                            ? '33平米星光开间Mini'
                            : '38极光星光开间Standard'
                    e.area =
                        e.area === 1
                            ? '50以内'
                            : e.area === 2
                            ? '50-80'
                            : e.area === 3
                            ? '89-90'
                            : e.area === 4
                            ? '100-139'
                            : '139以上'
                })
                this.tableData = data.lst
                this.total = data.num
            } catch (e) {
                this.tableData = []
            }
        },
        handleClick(i) {
            this.order = i
            this.formInline.pn = 1
            this.getOrders()
        },
        pageAChange(page) {
            this.formInline.pn = page._currentPage
            this.formInline.ps = page._pageSize
            this.getOrders()
        },
    },
}
</script>
<style lang="scss" scoped>
.formFlex {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    .statuItem {
        display: flex;
        li {
            width: 50px;
            height: 30px;
            cursor: pointer;
            text-align: center;
            font-size: 13px;
        }
        .active {
            background-color: #4f96a1;
            color: #fff;
            border-radius: 10px;
        }
    }
}
.btnTab {
    display: inline-block;
    margin: 0 4px;
    color: #2cd3ec;
    cursor: pointer;
}
</style>
