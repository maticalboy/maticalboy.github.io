// tableColumns.js
export const tableColumns = [
    { prop: "id", label: "ID", width: 70 },
    { prop: "name", label: "名称" },
    { prop: "description", label: "描述" },
    {
        show: false,
        filterColums: [
            {
                prop: "software_name",
                label: "适用软件",
                type: "select",
                filtersList: [
                    {
                        text: "软件1",
                        value: 1,
                    },
                    {
                        text: "软件2",
                        value: 2,
                    },
                    {
                        text: "软件3",
                        value: 3,
                    },
                    {
                        text: "软件4",
                        value: 4,
                    },
                    {
                        text: "软件5",
                        value: 5,
                    },
                ],
            },
        ],
    },
    { prop: "price", label: "单价" },
    { prop: "price_range", label: "价格范围" },
    { prop: "scale", label: "系数" },
    {
        show: false,
        prop: "enable",
        label: "可用",
        type: "slot",
        slotType: "enable",
    },
];

export const tableOption = {
    label: "操作",
    width: "120",
    options: [
        {
            label: "",
            type: "text",
            icon: "el-icon-edit-outline",
            methods: "edit",
        },
        { label: "", type: "text", icon: "el-icon-delete", methods: "delete" },
    ],
};
