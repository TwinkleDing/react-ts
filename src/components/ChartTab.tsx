import React, { PureComponent } from "react";
import * as echarts from "echarts";

class ChartTab extends PureComponent<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            width: 400,
            height: 350
        };

    }
    chart: any = {};
    el: any = null;

    componentDidUpdate() {
        this.setOption(this.props.option);
    }
    async componentDidMount() {
        await this.initChart(this.el);
        this.setOption(this.props.option);
        // window.addEventListener('resize')
    }
    componentWillUnmount() {
        // this.disPose();
    }

    initChart(el: any) {
        const renderer = this.props.renderer || "canvas";

        return new Promise((resolve) => {
            setTimeout(() => {
                this.chart = echarts.init(el, this.props.option, {
                    renderer,
                    height: this.state.height,
                    width: this.state.width
                });
                resolve(this.chart);
            }, 0);
        });

    }
    setOption(option: any) {
        if (!this.chart) {
            return;
        }
        const notMerge = this.props.notMerge;
        const lazyUpdate = this.props.lazyUpdate;

        this.chart.setOption(option, notMerge, lazyUpdate);
    }
    disPose() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    }
    getInstance() {
        return this.chart;
    }

    render() {
        const { width, height } = this.state;

        return <div
            ref={el => {
                this.el = el;
            }}
            style={{ width, height }}>
        </div>;
    }
}

export default ChartTab;
