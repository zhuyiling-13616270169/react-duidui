import React, { useState, useRef } from 'react';
import { Row, Col, Tabs, DatePicker, Button } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Icon from '@/components/icon';
import { downloadFile } from '@/utils';
import AchieceReport from './components/AchieceReport';
import ProgressReport from './components/ProgressReport';
import UserReport from './components/UserReport';
import './index.less';

export default function Home () {

    const scene = useRef();
    const [apiParam, setApiParam] = useState({
        activeKey: 'month',
        queryDate: [],
        type: 4 // 3：房源维度，4：客源维度
    });

    const changeTab = (key) => {
        if (key === apiParam.activeKey) return;
        setApiParam({
            ...apiParam,
            activeKey: key,
            queryDate: [],
        });
    };
    const changeDate = (dateList) => {
        if (dateList) {
            setApiParam({
                ...apiParam,
                activeKey: 'range',
                queryDate: dateList,
            });
        } else {
            setApiParam({
                ...apiParam,
                activeKey: 'month',
                queryDate: [],
            });
        }
    };
    const changeDateFooter = (type) => {
        if (type === 'lastWeek') {
            const baseDate = dayjs().subtract(1, 'isoWeek');
            setApiParam({
                ...apiParam,
                activeKey: type,
                queryDate: [baseDate.startOf('isoWeek'), baseDate.endOf('isoWeek')]
            });
        } else if (type === 'lastMonth') {
            const baseDate = dayjs().subtract(1, 'month');
            setApiParam({
                ...apiParam,
                activeKey: type,
                queryDate: [baseDate.startOf('month'), baseDate.endOf('month')]
            });
        } else if (type === 'year') {
            setApiParam({
                ...apiParam,
                activeKey: type,
                queryDate: [dayjs().startOf('year'), dayjs().endOf('year')]
            });
        }
    };

    const renderExtraFooter = () => {
        return (
            <div className="rangePicker-footer">
                <span>
                    {
                        apiParam.queryDate.length ?
                            dayjs(apiParam.queryDate[0]).format('YYYY/MM/DD') + ' - ' +
                            dayjs(apiParam.queryDate[1]).format('YYYY/MM/DD') : null
                    }
                </span>
                <div>
                    <a onClick={() => changeDateFooter('lastWeek')} style={apiParam.activeKey == 'lastWeek' ? { fontSize: 16, fontWeight: 'bold' } : {}} >上周</a>
                    <a onClick={() => changeDateFooter('lastMonth')} style={apiParam.activeKey == 'lastMonth' ? { fontSize: 16, fontWeight: 'bold' } : {}} >上月</a>
                    <a onClick={() => changeDateFooter('year')} style={apiParam.activeKey == 'year' ? { fontSize: 16, fontWeight: 'bold' } : {}}>本年</a>
                </div>
            </div>
        );
    };

    const exportReport = () => {
        downloadFile('https://', '数据说明手册');
    };

    return (
        <div className="home-large">
            <div className="home-large-less">
                <Row className="home-large-row" align="middle">
                    <Col className="home-large-tab">
                        <Tabs activeKey={apiParam.activeKey} items={[
                            {
                                key: 'day',
                                label: '今日',
                            },
                            {
                                key: 'week',
                                label: '本周',
                            },
                            {
                                key: 'month',
                                label: '本月',
                            }
                        ]} onChange={changeTab} />
                    </Col>
                    <Col className="home-large-rangePicker" flex="auto">
                        <DatePicker.RangePicker value={apiParam.queryDate} renderExtraFooter={renderExtraFooter} getPopupContainer={triggerNode => triggerNode.parentNode} onChange={changeDate} />
                    </Col>
                    <Col className="home-large-button">
                        <Button type="primary" onClick={exportReport}>导出<Icon type="ExclamationCircleOutlined" /></Button>
                    </Col>
                    <Col>
                        <AchieceReport param={apiParam} />
                    </Col>

                </Row>
                <div className="home-large-charts-less">
                    <Row gutter={[24, 24]} className="data-box">
                        <Col span={18}>
                           <ProgressReport param={apiParam} />
                        </Col>
                        <Col span={6}>
                            <UserReport param={apiParam} />
                        </Col>
                    </Row>
                </div>
            </div>
            <div ref={scene} className="scene"></div>
        </div>
    );
}