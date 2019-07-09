<template>
    <div id="app">
         <div class="forum">
            <div class="item-1">
                <div class="msg">
                    <div class="info">
                        <div class="title">
                            关于我们
                        </div>
                        <div class="about">
                            {{this.txt}}
                        </div>
                    </div>
                </div>
                <div class="img">
                    <img :src="img" alt="">
                </div>
            </div>
            <div class="item-2">
            
                <div class="img">
                    <img :src="img2" alt="">
                    <div class="dizhi">
                        <div class="clearfix d_it">
                            <div class="title">会议标题：</div>
                            <div class="value">{{title}}</div>
                        </div>
                        <div class="clearfix d_it">
                            <div class="title">会议时间：</div>
                            <div class="value">{{time}}</div>
                        </div>
                        <div class="clearfix d_it">
                            <div class="title">会议地点：</div>
                            <div class="value">{{address}}</div>
                        </div>
                    </div>
                </div>
                <div class="msg">
                    <div class="title">
                        会议通知
                    </div>
                    <div class="m-it">
                        <div class="m-title">

                        </div>
                        <div v-show="list.length==0" class="nodata">暂无数据</div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            msg:{},
            txt:"我们致力于为世界青年学者提供发声机会，共同探讨事关全人类生存发展的重大课题，为推动全球气候问题的解决和构建人类命运共同体做出贡献。",
            img:"http://39.106.77.121:8081/files-upload/images/forum-index/1-e1414fba6ae14e298a47a7128c4b6649.png",
            img2:"http://39.106.77.121:8081/files-upload/images/forum-index/1-e1414fba6ae14e298a47a7128c4b6648.png",
            title:"444",
            time:"555",
            address:"666",
            list:[]
        }
    },
    created() {
        this.init();
    },
    methods: {
        init(){

        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
    .app{
        width: 100%;
        height: 100%;
        background: red;
        
    }
    .forum{
        width: 100%;
        height: 100%;
        .item-1{
            height:50%;
            width: 100%;
            margin:  0 auto;
            display: flex;
            flex-direction: row;
            .msg{
                flex: 1;
                .info{
                    padding: 32px;
                    .title{
                        font-size: 24px;
                        color: rgb(87, 76, 135);
                        margin-bottom: 20px;
                    }
                    .about{
                        text-indent: 2em;
                        font-size: 16px;
                        color: rgb(87, 76, 135);
                    }
                }
            }
            .img{
                flex: 2;
                padding: 20px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .item-2{
            width: 100%;
            margin: 0 auto;
            height: 50%;
            display: flex;
            flex-direction: row;
            .msg{
                flex: 1;
                .title{
                    padding: 32px;
                    font-size: 24px;
                    color: rgb(87, 76, 135);
                
                }
                .m-it{

                    padding-left: 32px;
                }

            }
            .img{
                position: relative;
                flex: 1;
                img{
                    width: 100%;
                    height: 100%;
                }
                .dizhi{
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    .d_it{
                        margin-top: 10px;
                        color: #673ab7;
                        line-height: 32px;
                        font-size: 16px;
                        .title{
                            float: left;
                        }
                        .value{
                            float: left;
                        }
                    }
                }
            }
        }
    }
</style>
