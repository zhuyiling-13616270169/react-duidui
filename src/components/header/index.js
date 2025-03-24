import { useState, useEffect } from 'react';
import { Affix, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { useAliveController } from 'react-activation';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/icon';
import { getAppState } from '@/store/getters';
import { uniqueArray } from '@/utils';
import { storage } from '@/utils/storage';
import { useUnsubscribe, useSubscribe } from '@/utils/usePubSub';
import Tag from './tag';
import './index.less';

function Header () {
    const navigate = useNavigate();
    const { routeList } = useSelector(getAppState);
    const { dropScope } = useAliveController();
    const unsubscribe = useUnsubscribe();
    const [currentTag, setCurrentTag] = useState(routeList[0] || {});
    const [tagList, setTagList] = useState(storage.get('tagList') || (routeList[0] ? [routeList[0]] : []));
    const [skinStyle, setSkinStyle] = useState({
        breadStyle: {
            color: 'rgba(0, 0, 0, 0.65)'
        },
        headerStyle: {
            borderBottom: '1px solid #fff'
        },
        header1Style: {
            backgroundColor: '#fff',
            color: '#999'
        }
    });

    const prevTag = () => {
        const current = tagList.findIndex(item => item.fullPath === currentTag.fullPath);
        if (current - 1 < 0) return;
        navigate(tagList[current - 1].fullPath, { state: tagList[current - 1].name });
    };

    const nextTag = () => {
        const current = tagList.findIndex(item => item.fullPath === currentTag.fullPath);
        if (current + 1 >= tagList.length) return;
        navigate(tagList[current + 1].fullPath, { state: tagList[current + 1].name });
    };

    const closeTag = (tagItem) => {
        dropScope(tagItem.fullPath);
        const current = tagList.findIndex(item => item.fullPath === currentTag.fullPath);
        const closeCurrent = tagList.findIndex(item => item.fullPath === tagItem.fullPath);
        const newTagList = tagList.filter(item => item.fullPath !== tagItem.fullPath);
        if (current === closeCurrent) navigate(tagList[closeCurrent - 1].fullPath, { state: tagList[closeCurrent - 1].name });
        setTagList(newTagList);
    };

    useEffect(() => {
        storage.set('tagList', tagList);
    }, [tagList, setTagList]);

    const pagePush = useSubscribe('PAGE_PUSH', (_, { pathname, search, state }) => {
        const fullPath = pathname + search;
        const existTag = tagList.find(item => item.fullPath === fullPath);
        const { name = 'Not Found' } = routeList.find(item => item.router === pathname) || {};

        if (!existTag) {
            const newTagList = tagList.concat({
                name: state || name,
                path: pathname,
                fullPath
            });
            setTagList(newTagList);
            setCurrentTag({
                name: state || name,
                path: pathname,
                fullPath
            });
        } else {
            setCurrentTag({
                name: existTag.name,
                path: existTag.path,
                fullPath: existTag.fullPath
            });
        }
    });

    useEffect(() => () => {
        unsubscribe(pagePush);
    }, [pagePush]);

    const pageReplace = useSubscribe('PAGE_REPLACE', (_, { pathname, search, state }) => {
        const fullPath = pathname + search;
        const current = tagList.findIndex(item => item.fullPath === currentTag.fullPath);
        const { name = 'Not Found' } = routeList.find(item => item.router === pathname) || {};;

        if (current !== -1) {
            const newTagList = uniqueArray(Object.assign([], tagList, {
                [current]: {
                    name: state || name,
                    path: pathname,
                    fullPath,
                }
            }), 'fullPath');
            setTagList(newTagList);
            setCurrentTag({
                name: state || name,
                path: pathname,
                fullPath
            });
        }
    });

    useEffect(() => () => {
        unsubscribe(pageReplace);
    }, [pageReplace]);

    const pageDelete = useSubscribe('PAGE_DELETE', (_, { fullPath }) => {
        dropScope(fullPath);
        const newTagList = tagList.filter(item => item.fullPath !== fullPath);
        setTagList(newTagList);
    });

    useEffect(() => () => {
        unsubscribe(pageDelete);
    }, [pageDelete]);

    const pubSubSkin = useSubscribe('changeHeaderStyle', (_, { type }) => {
        if (type === 'dark') {
            setSkinStyle({
                breadStyle: {
                    color: '#fff'
                },
                headerStyle: {
                    borderBottom: '1px solid #00102D'
                },
                header1Style: {
                    backgroundColor: '#00102D',
                    color: '#FFF'
                }
            });
        } else if (type === 'light') {
            setSkinStyle({
                breadStyle: {
                    color: 'rgba(0, 0, 0, 0.65)'
                },
                headerStyle: {
                    borderBottom: '1px solid #fff'
                },
                header1Style: {
                    backgroundColor: '#fff',
                    color: '#999'
                }
            });
        }
    });

    useEffect(() => () => {
        unsubscribe(pubSubSkin);
    }, [pubSubSkin]);

    return (
        <Affix offsetTop={0.1}>
            <div className="content-header">
                <Row className="tag-wrapper">
                    <Col className="actions">
                        <Icon type="LeftOutlined" className="icon" onClick={prevTag} />
                        <Icon type="RightOutlined" className="icon" onClick={nextTag} />
                    </Col>
                    <Col className="tag-list">
                        {
                            tagList.map((item, index) => {
                                return (
                                    <Tag
                                        key={item.fullPath}
                                        tagItem={item}
                                        currentTag={currentTag}
                                        showClose={index !== 0}
                                        closeTag={closeTag}
                                    />
                                );
                            })
                        }
                    </Col>
                </Row>
                <Row className="breadcrumb" style={skinStyle.header1Style}>
                    <Col>当前位置:<span className="breadcrumb-item" style={skinStyle.breadStyle}>{currentTag.name}</span></Col>
                </Row>
            </div>
        </Affix>
    );
}

export default Header;
