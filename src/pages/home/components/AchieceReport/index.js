import React, { memo, useLayoutEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import { isEqual } from 'lodash-es';
import Icon from '@/components/icon';
import './index.less';

export default memo(function AchieceReport ({ param }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const fetchData = async () => {
        setLoading(true);
        const res =　{
            code: 0,
            data:[]
        };
        if (res.code == 0) {
            setLoading(false);
            setData(res.data);
        }
    };
    useLayoutEffect(() => {
        fetchData();
    }, [param]);

    return (
        <Row className="achiece-report" gutter={[0, 0]}>
            <Col span="24">
                {
                    loading ?
                        <Row>
                            <Spin style={{ margin: '30px auto' }} tip="加载中..." />
                        </Row> :
                        <Row gutter={[0, 16]}>
                           <ul className="quick-actions">
                                <li className="bg_lb"> <a href="index.html"> <Icon type="DesktopOutlined" /> <span className="label label-important">20</span> My Dashboard </a> </li>
                                <li className="bg_lg span3"> <a href="charts.html"> <Icon type="BarChartOutlined" /> Charts</a> </li>
                                <li className="bg_ly"> <a href="widgets.html"> <Icon type="InboxOutlined" /><span className="label label-success">101</span> Widgets </a> </li>
                                <li className="bg_lo"> <a href="tables.html"> <Icon type="TableOutlined" /> Tables</a> </li>
                                <li className="bg_ls"> <a href="grid.html"> <Icon type="FullscreenOutlined" /> Full width</a> </li>
                                <li className="bg_lo span3"> <a href="form-common.html"> <Icon type="FormOutlined" /> Forms</a> </li>
                                <li className="bg_ls"> <a href="buttons.html"> <Icon type="FireFilled" /> Buttons</a> </li>
                                <li className="bg_lb"> <a href="interface.html"> <Icon type="EditOutlined" />Elements</a> </li>
                                <li className="bg_lg"> <a href="calendar.html"> <Icon type="CalendarOutlined" /> Calendar</a> </li>
                                <li className="bg_lr"> <a href="error404.html"> <Icon type="InfoCircleOutlined" /> Error</a> </li>
                            </ul>
                        </Row>
                }
            </Col>
        </Row>
    );

}, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})