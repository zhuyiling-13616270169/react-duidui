export default [
    {
        "id": "23456-98765-097654-8976-4567",
        "name": "首页",
        "icon": "DesktopOutlined",
        "router": "/home",
        "display": true,
        "children": [],
    },
    {
        "id": "8771BA25-F9D4-44C7-8261-68975CCEDEE4",
        "name": "数据列表",
        "icon": "ProfileOutlined",
        "router": "/dataReport",
        "display": true,
        "children": [
            {
                "id": "AE91972FC0BF",
                "name": "相关品牌",
                "icon": null,
                "router": "/dataReport/brand",
                "display": true,
                "children": [],
            },
            {
                "id": "E70822A78D96",
                "name": "流水列表",
                "icon": null,
                "router": "/dataReport/payment",
                "display": true,
                "children": [],
            }
        ],
    }
]