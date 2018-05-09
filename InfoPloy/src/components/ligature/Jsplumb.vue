<template>
    <div>
        <div @contextmenu="showMenu" class="panel-body points demo flow_chart" id="points">
            <vue-context-menu :contextMenuData="contextMenuData"
                              @saveData="saveData"
                              @newData="newData">
            </vue-context-menu>
        </div>
        <convert-properties v-if="changeShow" @okCallbackT="okCallbackTransform" @cancelCallbackT="cancelCallbackTransform" :transForm="changeShow"></convert-properties>
    </div>
</template>

<script>
    import $ from 'jquery';
    import { jsPlumb } from 'jsplumb';
    import '../../assets/css/demo.css';
    import '../../assets/css/jsplumb.css';
    import convertProperties from './../console/Configuration';
    let instance;
    export default {
        name: 'Index',
        components: {
            convertProperties
        },
        data () {
            return {
                data: {
                    point: [
                        {
                            _id: '58c21d713819d56d68763918',
                            name: 'node1',
                            status: '0'
                        },
                        {
                            _id: '58c21d803819d56d68763919',
                            name: 'node2',
                            status: '1'
                        },
                        {
                            _id: '58c21da83819d56d6876391a',
                            name: 'node3',
                            status: '0'
                        },
                        {
                            _id: '58c63ecf3819d5a22f2c7f24',
                            name: 'node4',
                            status: '1'
                        }
                    ],
                    location: [
                        ['node2', 14, 14],
                        ['node1', 14, 4],
                        ['node3', 4, 24],
                        ['node4', 24, 24]
                    ],
                    line: [
                        ['58c21d713819d56d68763918', '58c21d803819d56d68763919'],
                        ['58c21d803819d56d68763919', '58c21da83819d56d6876391a'],
                        ['58c21d803819d56d68763919', '58c63ecf3819d5a22f2c7f24'],
                        ['58c21da83819d56d6876391a', '58c63ecf3819d5a22f2c7f24']
                    ]
                },
                contextMenuData: {
                    menuName: 'demo',
                    axios: {
                        x: null,
                        y: null
                    },
                    menulists: [
                        {
                            fnHandler: 'saveData',
                            icoName: 'fa fa-home fa-fw',
                            btnName: '新建注释'
                        },
                        {
                            fnHandler: 'newData',
                            icoName: 'fa fa-home fa-fw',
                            btnName: '转换设置'
                        }
                    ]
                },
                changeShow: false
            };
        },
        methods: {
            createFlow () {
                const color = '#acd';
                instance = jsPlumb.getInstance({
                    Connector: ['Bezier', { curviness: 10 }],
                    Endpoint: ['Dot', { radius: 2 }],
                    DragOptions: { cursor: 'pointer', zIndex: 5000 },
                    PaintStyle: { lineWidth: 30, stroke: '#445566' },
                    EndpointStyle: { radius: 8, fill: color, stroke: 'red' },
                    HoverPaintStyle: { stroke: '#ec9f2e', lineWidth: 4 },
                    EndpointHoverStyle: { fill: '#ec9f2e', stroke: '#acd' },
                    ConnectionOverlays: [
                        ['Arrow', {
                            location: 0.5,
                            id: 'arrow',
                            length: 16,
                            foldback: 0.8,
                            paintStyle: {
                                lineWidth: 5,
                                stroke: 'lightgray',
                                fill: 'lightgray'
                            },
                            direction: 1// 箭头方向
                        }]
                    ],
                    Container: 'points'// 设置容器
                });
                jsPlumb.fire('jsPlumbDemoLoaded', instance);
            },
            showMenu () {
                event.preventDefault();
                let x = event.clientX - 236;
                let y = event.clientY - 102;
                this.contextMenuData.axios = {
                    x, y
                };
            },
            saveData () {
                alert(1);
            },
            newData () {
                this.changeShow = true;
            },
            okCallbackTransform (value) {
                this.changeShow = value;
                console.log(value);
            },
            cancelCallbackTransform (value) {
                this.changeShow = value;
                console.log(value);
            }
        },
        mounted () {
            jsPlumb.ready(() => {
                let self = this;
                self.createFlow(self.data);
                $('.draggable-component').attr('draggable', 'true').on('dragstart', (ev) => {
                    ev.originalEvent.dataTransfer.setData('text', ev.target.textContent);
                });

                $('#points').on('drop', (ev) => {
                    // avoid event conlict for jsPlumb
                    if (ev.target.className.indexOf('_jsPlumb') >= 0) {
                        return;
                    }

                    ev.preventDefault();
                    const mx = `${ev.originalEvent.offsetX}px`;
                    const my = `${ev.originalEvent.offsetY}px`;

                    const nodeName = ev.originalEvent.dataTransfer.getData('text');
                    console.log(ev.originalEvent.dataTransfer.getData('text'));
                    const uid = new Date().getTime();
                    $('.points').append(
                        `<div id="${uid}" class="point chart_act_1 ${nodeName}">
                             <mu-icon value="face" style="width: 24px;height: 24px;"/>${nodeName}
                        </div>`,
                    );
                    $('#' + uid).css('left', mx);
                    $('#' + uid).css('top', my);
                    $('#' + uid).dblclick(function () {
                        console.log(nodeName);
                        if (nodeName === '表输出'){
                            self.$emit('show', 'exportShow', { show: true, title: nodeName });
                        } else {
                            self.$emit('show', 'show', { show: true, title: nodeName });
                        }

                    });
                    instance.addEndpoint(`${uid}`, {
                        uuid: `${uid}-bottom`,
                        anchor: 'Bottom',
                        maxConnections: -1
                    }, {
                        isSource: true,
                        isTarget: true,
                        dragAllowedWhenFull: true
                    });
                    /**
                     * 调用了JsPlumb里面的addEndpoint方法，添加链接点
                     * jsPlumb.addEndpoint(id, { anchors: "RightMiddle" }, hollowCircle);
                     * 第一个参数表示页面标签的id，第一个表示连线点的位置（RightMiddle、LeftMiddle、TopCenter、BottomCenter四个选项）；
                     * 第三参数表示点的样式以及连线的样式。没调用依次addEndpoint方法，元素上面就会多一个连线的节点。
                     * 关于hollowCircle里面各个参数的意义，可以查看api。
                     */
                    instance.addEndpoint(`${uid}`, {
                        uuid: `${uid}-top`,
                        anchor: 'Top',
                        maxConnections: -1
                        // connectorStyle: { stroke: 'gray' },
                    }, {
                        isSource: true,
                        isTarget: true,
                        dragAllowedWhenFull: true
                    });

                    // 线的点击
                    instance.bind('click', function (component) {
                        self.$emit('showLine', {
                            show: true,
                            source: component.source.innerText,
                            target: component.target.innerText
                        });
                    });
                    instance.draggable(`${uid}`);
                }).on('dragover', (ev) => {
                    ev.preventDefault();
                });

            });
        }
    };
</script>

<style>
    .point.chart_act_0 {
        color: #9cc;
    }

    .point.chart_act_1 {
        color: #fac;
    }
</style>
