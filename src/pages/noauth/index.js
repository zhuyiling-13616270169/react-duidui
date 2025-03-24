import './index.less';

export default function NoAuth () {

    return (
        <div className="no-auth">
            <img className="no-auth-img" src={require("@/images/noauth.png")} alt="" />
            <p className='no-auth-desc'> 暂无权限，请切换角色或退出登录</p>
        </div>
    );
}
