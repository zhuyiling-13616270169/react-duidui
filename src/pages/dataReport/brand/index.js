import React, { memo, useLayoutEffect, useState } from 'react';
import { Table, Tag, Space, Card, Row, Col, Spin } from 'antd';
import { isEqual } from 'lodash-es';
import { guid } from '@/utils';

export default memo(function BrandReport ({ param }) {
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
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
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
              <a>Invite {record.name}</a>
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
                      name: 'Brown',
                      age: 32,
                      address: 'New York No. 1 Lake Park',
                      tags: ['nice', 'developer'],
                    },
                    {
                      key: '2',
                      name: 'Green',
                      age: 42,
                      address: 'London No. 1 Lake Park',
                      tags: ['loser'],
                    },
                    {
                      key: '3',
                      name: 'Black',
                      age: 32,
                      address: 'Sydney No. 1 Lake Park',
                      tags: ['cool', 'teacher'],
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