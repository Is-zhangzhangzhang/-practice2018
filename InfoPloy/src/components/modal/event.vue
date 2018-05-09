<template>
    <div id="app" @contextmenu="showMenu" style="width: 100px;height: 100px;background: red;">
        <vue-context-menu :contextMenuData="contextMenuData"
                          @savedata="savedata"
                          @newdata="newdata">
        </vue-context-menu>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data () {
            return {
                contextMenuData: {
                    menuName: 'demo',
                    axios: {
                        x: null,
                        y: null
                    },
                    menulists: [
                        {
                            fnHandler: 'savedata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'Save'
                        },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New'
                        }
                    ]
                }
            };
        },
        methods: {
            showMenu () {
                event.preventDefault();
                let x = event.clientX;
                let y = event.clientY;
                this.contextMenuData.axios = {
                    x, y
                };
            },
            savedata () {
                alert(1);
            },
            newdata () {
                console.log('newdata!');
            }
        }
    };
</script>
