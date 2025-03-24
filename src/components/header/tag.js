import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import './tag.less';

export default function Tag ({ tagItem, currentTag, showClose, closeTag }) {
    const navigate = useNavigate();

    const switchTag = () => {
        if (tagItem.fullPath === currentTag.fullPath) return;
        navigate(tagItem.fullPath, { state: tagItem.name });
    };

    return (
        <div className={classnames('tag-item', { 'active': tagItem.fullPath === currentTag.fullPath })}>
            <div className="tag-title" onClick={switchTag}>{tagItem.name}</div>
            {
                showClose &&
                <div className="tag-close" onClick={() => closeTag(tagItem)}>
                    <img
                        alt=""
                        title="关闭"
                        className="tag-close-img"
                        src={tagItem.fullPath === currentTag.fullPath ? require("@/images/common/close-selected.png") : require("@/images/common/close.png")}
                    />
                </div>
            }

        </div>
    );
}