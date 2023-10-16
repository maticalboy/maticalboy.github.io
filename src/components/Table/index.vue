<template>
    <el-table
        ref="filterTable"
        :row-class-name="tableRowClassName"
        border
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        :height="height || undefined"
        :max-height="height || undefined"
        :cell-style="cellStyle"
        :default-sort="{ prop: 'id', order: null }"
        @sort-change="sortChange"
        @filter-change="handleFilterChange"
        style="width: 100%"
    >
        <template v-for="(item, index) in columns">
            <el-table-column
                :show-overflow-tooltip="true"
                v-if="item.show != false"
                :key="index"
                :sortable="item.sortable"
                :prop="item.prop"
                :label="item.label"
                :align="item.align ? item.align : 'left'"
                :width="item.width"
            ></el-table-column>
            <template v-for="(filter, index) in item.filterColums">
                <!-- 表格内联下拉框样式-->
                <el-table-column
                    v-if="filter.type == 'select' && filter.show != false"
                    :label="columnLabel[index]"
                    :key="filter.lable"
                    :prop="filter.prop"
                    :show-overflow-tooltip="true"
                    :fixed="filter.fixed ? filter.fixed : false"
                    :width="filter.width ? filter.width : ''"
                    :filter-multiple="multiple"
                    :filters="filter.filtersList"
                    :filter-method="filterMethod"
                    :column-key="filter.prop"
                >
                    <template slot-scope="props">
                        <el-select
                            class="select-row"
                            v-if="filter.part == 'sell'"
                            v-model="props.row.sell_id"
                            placeholder="请选择"
                            @change="filterChange(props.row)"
                            style="height: 25px"
                        >
                            <el-option
                                v-for="filter in filtersList"
                                :key="filter.id"
                                :label="filter.realname"
                                :value="filter.id"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </template>
            <!-- solt 自定义列-->
            <template v-if="item.type === 'slot'">
                <el-table-column
                    :key="index"
                    :width="item.width"
                    :prop="item.prop"
                    :label="item.label"
                >
                    <template slot-scope="scope">
                        <slot :name="item.slotType" :row="scope.row" />
                    </template>
                </el-table-column>
            </template>
        </template>
        <!-- 表格操作按钮-->
        <el-table-column
            v-if="tableOption && tableOption.label"
            :width="tableOption.width"
            :label="tableOption.label"
            fixed="right"
            align="center"
            class-name="small-padding fixed-width"
        >
            <template slot-scope="scope">
                <el-button
                    v-for="(item, index) in tableOption.options"
                    :key="index"
                    :type="item.type"
                    :icon="item.icon"
                    v-show="!scope.row.validStatus"
                    @click="handleButton(item.methods, scope.row)"
                    size="mini"
                >
                    {{ item.label }}
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: {
        tableData: Array,
        tableOption: Object,
        filterColums: Array,
        columns: Array,
        tableRowClassName: Function,
        loading: Boolean,
        filtersList: Array,
        filtersRoleList: Array,
        columnLabel: Array,
        filterMethod: Function,
        cellStyle: Function,
        refTable: String,
        height: String,
        multiple: {
            type: Boolean,
            default: false,
        },
        // 监听高度
        listenHeight: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        handleButton(methods, row, event) {
            this.$emit("handleButton", { methods: methods, row: row });
        },
        filterChange(row) {
            this.$emit("filterChange", row);
        },
        filterRoleChange(row) {
            this.$emit("filterRoleChange", row);
        },
        handleFilterChange(filters) {
            this.$emit("handleFilterChange", filters);
        },
        sortChange(filters) {
            this.$emit("sortChange", filters);
        },
        switchChange(row) {
            this.$emit("switchChange", row);
        },
        rowClick(type, value) {
            this.$emit("rowClick", type, value);
        },
    },
};
</script>
