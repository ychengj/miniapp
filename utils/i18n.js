let T = {
    locale: null,
    locales: {},
    langCode: ['zh-Hans', 'en']
};
let lastLangIndex;

T.registerLocale = function (locales) {
    T.locales = locales;
};

T.setLocale = function (code) {
    T.locale = code;
};

T.setLocaleByIndex = function (index) {
    lastLangIndex = index;
    T.setLocale(T.langCode[index]);

    setTabBarLang(index);
};

T.getLanguage = function () {
    return T.locales[T.locale];
};


let navigationBarTitles = [
    '会员中心',
    'Center',
];
// 设置导航栏标题
T.setNavigationBarTitle = function() {
    console.log(lastLangIndex);
    wx.setNavigationBarTitle({
        title: navigationBarTitles[lastLangIndex]
    });
};

let tabBarLangs = [
    [
        '最近使用',
        '动态密码',
        '会员中心'
    ],
    [
        'Recents',
        'Dynamic',
        'Center',
    ]
];
// 设置 TabBar 语言
function setTabBarLang(index) {
    let tabBarLang = tabBarLangs[index];
    console.log(index);
    tabBarLang.forEach((element, index) => {
        console.log(element);
        wx.setTabBarItem({
            index: index,
            text: element
        });
    });
}

export default T;