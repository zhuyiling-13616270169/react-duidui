import { createFromIconfontCN } from '@ant-design/icons';

const Icon = ({ type, className, style = {}, custom = false, onClick = () => { } }) => {
    const CustomIconFonts = createFromIconfontCN({
        scriptUrl: '/iconfont_20230511.js'
    });

    if (custom) {
        return <CustomIconFonts type={type} className={className} style={style} onClick={onClick} />;
    } else {
        const Icons = require('@ant-design/icons')[type];
        return <Icons type={type} className={className} style={style} onClick={onClick} />;
    }
};

export default Icon;
