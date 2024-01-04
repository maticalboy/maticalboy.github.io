export default {
    data() {
        return {
            preList: {}  // 这是保存上一次已选择的option列表的对象,因为页面可能有多个下拉框,所以我统一放在这里面,当然你也可以直接放在data中
        }
    },
    methods: {
        isAllSelected(node) {
            // 判断是否是全选,也就是看已选择的选中中包不包含"全选"
            let isAllSelected = false
            for (let i = 0; i < node.length; i++) {
                if (node[i] === '全选') {
                    isAllSelected = true
                    break;
                }
            }
            return isAllSelected
        },
        checkAllSelected(list, type) {
            let origin = []
            let now = [...this.formInfo[type[0]][type[1]].value].filter(item => item !== '全选')
            list.forEach(e => {
                if (e.children && e.children.length > 1) {
                    e.children.forEach(j => {
                        if(j.disabled != true)
                        origin.push(j)
                    })
                } else {
                    if(e.disabled != true)
                    e.label !== '全选' && origin.push(e)
                }
            })
            if (origin.length > now.length) {
                // 非全选时, 如果有之前选过全选,要把全选过滤掉
                this.formInfo[type[0]][type[1]].value = this.formInfo[type[0]][type[1]].value.filter(item => item !== '全选')
            } else {
                // 当所有的数据都选择时, 要自动把全选勾选上
                if (this.formInfo[type[0]][type[1]].value[0] !== '全选') {
                    this.formInfo[type[0]][type[1]].value = ['全选', ...this.formInfo[type[0]][type[1]].value]
                }
            }
        },
        multipleHandleMixin(node, type,name) {
            this.preList[name] = this.preList[name] || []; // 创建列表保存上一次的已选择option列表
            const list = this.formInfo[type[0]][type[1]].options;
            let current = []; // 获取当前选中的option, 因为element文档中没有获取当前选中的option的方法,所以我通过上一次和本地的选中数据进行对比来获取
            let index = 0
            if (node.length >= this.preList[name].length) {
                // 取消某项
                let keys = this.preList[name].map(e => e[index])
                current = node.filter(item => !keys.includes(item[index]))
            } else {
                // 持续选中
                let keys = node.map(e => e[index])
                current = this.preList[name].filter(item => !keys.includes(item[index]))
            }
            const currentValue = current[0]
            if (currentValue === '全选') {
                let allSelected = []
                if (this.isAllSelected(node)) {
                    list.forEach(e => {
                        if (e.children) {
                            e.children.forEach(j => {
                                if(j.disabled != true)
                                allSelected.push(j.value)
                            })
                        } else {
                            if(e.disabled != true)
                            allSelected.push(e.value)
                        }
                    })
                } else {
                    allSelected = []
                }
                this.formInfo[type[0]][type[1]].value = [...allSelected]
            }
            this.checkAllSelected(list, type)
            this.preList[name] = this.formInfo[type[0]][type[1]].value; // 保存上一次的选择结果
            this.changeHandle(type)
        },
        changeHandle(type) {
            // 这里是处理成自己需要的数据格式, 需要把"全选"的这一选项过滤掉
            // 原始选择的数据格式['全选', '1', '2',...]
            let list = []
            let origin = [...this.formInfo[type[0]][type[1]].value]
            origin = origin.filter(item => item !== '全选')
            origin.forEach(e => {
                list.push(e)
            })
            return list
        }
    }
}
