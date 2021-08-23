Component({
    data: {
        result: null
    },
    properties: {
        bounce: {
            type: Boolean,
            value: true
        },
        // 手动初始化
        initByHand: {
            type: Boolean,
            value: false
        }
    },
    lifetimes: {
        attached() {
            if (this.data.initByHand) return
            this.init()
        }
    },
    methods: {
        async init() {
            const wrapper = this.createSelectorQuery().select('#t-scroll-wrapper')
            const scroller = this.createSelectorQuery().select('#t-scroll-scroller')
            const [ scrollerRect, wrapperRect ] = await Promise.all([
                this.invoke(scroller, 'boundingClientRect'),
                this.invoke(wrapper, 'boundingClientRect'),
            ])
            this.setData({
                result: { 
                    scrollerHeight: scrollerRect.height,
                    wrapperHeight: wrapperRect.height,
                    bounce: this.data.bounce
                }
            })
        },
        /**
         * 调用元素的异步方法
         * @param {any} el          元素
         * @param {string} method   方法名
         * @returns {Promise}
         */
        invoke(el, method) {
            return new Promise((resolve) => {
                el[method](resolve).exec()
            }).catch(err => {
                console.log(err)
            })
        }
    }
})
