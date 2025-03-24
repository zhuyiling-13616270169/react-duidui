import React, { memo, useLayoutEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import Icon from '@/components/icon';
import { isEqual } from 'lodash-es';
import './index.less';

export default memo(function UserReport ({ param }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        const res =　{
            code: 0,
            data: [
              {title: 'Total Users', icon: 'UserOutlined', value: 2540 },
              {title: 'New Users', icon: 'PlusCircleOutlined', value: 120 },
              {title: 'Total Shop', icon: 'ShoppingCartOutlined', value: 656 },
              {title: 'Total Orders', icon: 'TagOutlined', value: 9540 },
              {title: 'Pending Orders', icon: 'ReloadOutlined', value: 10 },
              {title: 'Online Orders', icon: 'GlobalOutlined', value: 8540 }
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
        <Row className="user-report" gutter={[0, 0]}>
            {
                loading ?
                    <Spin style={{ margin: "190px auto", textAlign: 'center' }} tip="加载中..." /> :
                    <Col span={24}>
                      <ul className="site-stats">
                      {
                          data.map((item, index) => {
                              return <li key={index} className="bg_lh">
                              <Icon type={item.icon}/> <strong>{item.value}</strong> <small>{item.title}</small>
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