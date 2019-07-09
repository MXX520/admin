<template>
    <div id="app">
        <quill-editor 
            class="essayNoticeBox"
            v-model="content" 
            ref="aboutUs" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>  
</template>

<script>
export default {
    name: 'essayNotice',
    data () {
        return {
            msg: '征文通知'
        }
    },
    created() {
        this.init();
    },
    methods: {
        init(){

        },
        //征文通知
        onEditorBlur(){//失去焦点事件
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(ev){//内容改变事件
            console.log(ev);
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
    .essayNoticeBox{
        min-height:500px;
        
    }
    /deep/ .ql-container{
        min-height:400px;
    }
</style>
