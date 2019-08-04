//定义广播事件的方法
const Event = {
    SHOW_PREVIEW:'showPreview',
    FORUMEDIT:'forumedit',
    PDF:'showPdf'
};

const ManuscriptListStyle = {
    0: '未审核',
    1: '审核中',
    2: '通过审核'
}

module.exports = {
    Event,
    ManuscriptListStyle
}