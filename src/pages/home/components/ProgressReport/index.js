import React, { memo, useLayoutEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import { isEqual } from 'lodash-es';
import './index.less';

export default memo(function ProgressReport ({ param }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        const res =　{
            code: 0,
            data: [
              {title: 'Clicks', percent: 81, value: 567 },
              {title: 'Uniquie Clicks', percent: 72, value: 507 },
              {title: 'Impressions', percent: 53, value: 439 },
              {title: 'Online Users', percent: 3, value: 8 },
              {title: 'Other', percent: 62, value: 567 }
            ]
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
        <Row className="progress-report" gutter={[0, 0]}>
            {
                loading ?
                    <Spin style={{ margin: "190px auto", textAlign: 'center' }} tip="加载中..." /> :
                    <Col span={24}>
                      <ul className="unstyled">
                      {
                          data.map((item, index)  => {
                              return <li key={index}>{item.percent}% {item.title} <span className="pull-right">{item.value}</span>
                              <div className={'progress ' + (item.percent >= 60 && item.percent <80 ? 'progress-success' : (item.percent>=30 && item.percent < 60 ? 'progress-warning' : (item.percent<30 ? 'progress-danger' : ''))) + ' progress-striped'}>
                                <div style={{width: item.percent + '%'}} className="bar"></div>
                              </div>
                            </li>;
                          })
                      } 
                      </ul>
                    </Col>       
            }
        </Row>
    );

}, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})