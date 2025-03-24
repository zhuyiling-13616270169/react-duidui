import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const MenuIcons = ({ type, className, custom = false, style = {}, onClick = () => { } }) => {
    const CustomIconFonts = createFromIconfontCN({
        scriptUrl: '/iconfont_menu_20230522.js'
    });

    if (custom) {
        return <CustomIconFonts type={type} className={className} style={style} onClick={onClick} />;
    } else {
        const Icons = require('@ant-design/icons')[type];
        return <Icons type={type} className={className} style={style} onClick={onClick} />;
    }
};

export default MenuIcons;