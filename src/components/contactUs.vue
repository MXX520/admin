<template>
    <div id="app">
        <quill-editor 
            class="contactUs"
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
    name: 'contactUs',
    data () {
        return {
            msg: '联系我们'
        }
    },
    created() {
        this.init();
    },
    methods: {
        init(){

        },
        //联系我们
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
    /deep/ .quill-editor{
        min-height:500px;
        
    }
    /deep/ .ql-container{
        min-height:400px;
    }
</style>
