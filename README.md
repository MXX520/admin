# admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

``` bash
## 项目简介
一、
    框架:vue2.+
    UI:elementUi
    路由:vue-router
    全局状态管理:vuex

二、富文本: vue-quill-editor
    示例：
    import { quillEditor } from 'vue-quill-editor'
    <quill-editor 
        class="contactUs"
        v-model="content" 
        ref="aboutUs" 
        :options="editorOption" 
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
    </quill-editor>
三、定义全局广播事件 $eventHub
    //代码示例
        //发送广播事件
        this.$eventHub.$emit('mxx', '你的需要传送的数据')
        //接收广播事件
        this.$eventHub.$on('mxx', (item)=>{
            console.log(item);
            this.showMask = true;
        });
四、网络请求：axios
    
五、时间格式化：dayjs
六、导航菜单动态生成、根据后台权限控制

七、api文件夹
        http.js 封装的网络请求
            //代码示例
            // post
                let data = await this.$api.post("forum",{
                title:this.form.name,
                sponsor:this.form.people,
                sponsorPhone:this.form.phone,
                sponsorEmail:this.form.email,
                applyReason:this.form.reson,
                scaleOfMark:this.form.desc
                })
                if(data.data.code){
                this.$message({
                    message: '申请成功',
                    type: 'success'
                    });
                }



            // get
                let {data}  = await this.$api.get("forum/list",{
                pageNum:this.currentPage,
                pageSize:10,
                order:"id",
                orderType:"desc",
                query:this.filters.name,
                type:"1"
                })
        util.js 全局的方法 动态路由方法在这里


```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
