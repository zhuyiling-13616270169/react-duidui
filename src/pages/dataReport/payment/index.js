import React, { memo, useLayoutEffect, useState } from 'react';
import { Table, Tag, Space, Card, Row, Col, Spin } from 'antd';
import { isEqual } from 'lodash-es';
import { guid } from '@/utils';

export default memo(function PaymentReport ({ param }) {
    const [loading, setLoading] = useState(false);
    const [table, setTable] = useState({
        list: [],
        pagination: {
            current: 1,
            pageSize: 10,
        }
    });

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'price(万元)',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'platform',
          dataIndex: 'platform',
          key: 'platform',
        },
        {
          title: 'version',
          key: 'version',
          dataIndex: 'version',
          render: (_, { version }) => (
            <>
              {version.map((tag) => {
                let color = tag.length > 1 ? 'geekblue' : 'green';
                if (tag === '-') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>Delete</a>
            </Space>
          ),
        },
      ];

    const fetchData = async () => {
        setLoading(true);
        const res =　{
            code: 0,
            data:{
                data: [
                    {
                      key: '1',
                      name: 'Misc',
                      price: 3.2,
                      platform: 'Embedded devices',
                      version: ['3.1', '1.0'],
                    },
                    {
                      key: '2',
                      name: 'Webkit',
                      price: 4.2,
                      platform: 'Mac OS 7.6-9',
                      version: ['-'],
                    },
                    {
                      key: '3',
                      name: 'Tasman',
                      price: 2.78,
                      platform: 'Gnome',
                      version: ['4.2', '2.2'],
                    },
                ],
                page: 1,
                pageSize: 10,
                totalRecords: 2,
            }
            
        };
        if (res.code == 0) {
            setLoading(false);
            setTable({
                list: res.data.data,
                pagination: {
                    current: res.data.page,
                    pageSize: res.data.pageSize,
                    total: res.data.totalRecords,
                }
            });
        }
    };

    useLayoutEffect(() => {
        fetchData();
    }, [param]);

    const modalChange = (pagination) => {
    //     let params = {
    //         ...param,
    //         page: pagination.current,
    //         size: pagination.pageSize,
    //     }
    //     fetchData(params);
    };

    return (
        <Row className="brand-report" gutter={[0, 0]}>
            <Col span={24}>
                <Card>
                    <Table
                        columns={[...columns]}
                        loading={loading}
                        dataSource={table.list}
                        pagination={table.pagination}
                        onChange={modalChange}
                        rowKey={() => guid()}>
                    </Table>
                </Card>
            </Col>       
            
        </Row>
    );

}, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})