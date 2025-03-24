import { Suspense, useState, useEffect, useCallback } from 'react';
import { Layout, Row, Menu, Watermark, Col, Dropdown} from 'antd';
import { LogoutOutlined, SyncOutlined, } from '@ant-design/icons';
import { useOutlet, useLocation, useNavigate } from 'react-router-dom';
import KeepAlive from 'react-activation';
import { useSelector } from 'react-redux';
import { getAppState } from '@/store/getters';
import Header from '@/components/header';
import MenuIcons from '@/components/menuIcons';
import { logout } from '@/utils';
import './index.less';

const generateMenu = (list) => {
    if (!list.length) return [];
    return list.map((item) => {
        return {
            key: item.router,
            icon: item.icon ? <MenuIcons custom={item.icon.includes('icon-')} type={item.icon} /> : null,
            label: item.name,
            children: item.children?.length && item.children.filter(item => item.display)?.length && generateMenu(item.children.filter(item => item.display))
        };
    });
};

function JRLayout () {
    const outlet = useOutlet();
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const { menuList, userInfo } = useSelector(getAppState);
    const [openKeys, setOpenKeys] = useState([]);

    const transformMenu = useCallback((list) => generateMenu(list.filter(item => item.display)), []);
    const onMenuClick = ({ key }) => {
        if (pathname === key) return;
        navigate(key);
    };

    useEffect(() => {
        const openKeys = [];
        pathname.split('/').forEach((item, index) => {
            if (index == 0 || index == pathname.split('/').length - 1) return;
            openKeys.push(`${openKeys[index - 2] || ''}/${item}`)
        });
        setOpenKeys(openKeys);
    }, [pathname]);

    const showDropdown = (flag) => {
        return (
            <div className="sider-userinfo-dropdown">
                <div className="sider-userinfo-name">{userInfo?.userName}</div>
            </div>
        );
    };

    const handleMenuClick = (e) => {
        if (e.key == 'logout') {//退出登录
            logout();
        }
    }

    return (
        <div className="container">
            <Layout className='framework'>
                <Layout.Sider className="menu" width={180}>
                <Row className="sider-logo">
                      <img className="sider-logo-img" src={require("@/images/common/logo.png")} alt="" />
                  </Row>
                  <Row className="sider-userinfo">
                        <Col className="sider-userinfo-left">
                            <img className="sider-userinfo-img" src={require("@/images/common/default-avatar.png")} />
                        </Col>
                        <Col className="sider-userinfo-right">
                        <Dropdown menu={{
                                        items: [
                                            {
                                                label: '退出登录',
                                                key: 'logout',
                                                icon: <LogoutOutlined />,
                                            }
                                        ],
                                        onClick: handleMenuClick,
                                    }} placement="bottomLeft" trigger={['click']}>
                                        {showDropdown(true)}
                                    </Dropdown>
                            <div className="sider-userinfo-rolename">{userInfo?.region}</div>
                        </Col>
                    </Row>
                    <Row className='in-web'>
                        <Menu
                            mode="inline"
                            theme="dark"
                            selectedKeys={[pathname]}
                            openKeys={openKeys}
                            onOpenChange={(keys) => setOpenKeys(keys)}
                            items={transformMenu(menuList)}
                            onClick={onMenuClick}
                        />
                    </Row>
                </Layout.Sider>
                <Layout.Content className="workspace">
                    <Header />
                    <Watermark content={process.env.BUILD_ENV !== 'prod' ? 'uat环境' : ''} font={{ color: 'rgba(184, 184, 184, 0.3)' }}>
                        <div className="site-layout-content">
                            <KeepAlive key={pathname + search} name={pathname + search} saveScrollPosition="screen">
                                <Suspense>
                                    {outlet}
                                </Suspense>
                            </KeepAlive>
                        </div>
                    </Watermark>
                </Layout.Content>
            </Layout>
        </div >
    );
}

export default JRLayout;
