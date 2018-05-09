// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
        es6: true
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/essential'],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 强制使用单引号
        'quotes': [2, 'single'],
        // 当没有严格要求时，禁止对象字面量属性名称使用引号
        'quote-props': [2, 'as-needed'],
        // 缩进风格
        // 'indent': [2, 4],
        'indent': 0,
        'vue/script-indent': [2, 4,{ 'baseIndent': 1}],
        'vue/html-indent': [2, 4],
        // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格
        'array-bracket-spacing': [2, 'never'],
        // if while function 后面的{必须与if在同一行。
        'brace-style': [2, '1tbs', {'allowSingleLine': true}],
        // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
        'comma-dangle': [2, 'never'],
        // 控制逗号前后的空格
        'comma-spacing': [2, {'before': false, 'after': true}],
        // 禁止在计算属性内使用空格
        'computed-property-spacing': 2,
        // 必须使用 if(){} 中的{}
        'curly': [2, 'all'],
        // 强制属性名驼峰法命名
        'camelcase': [2,{'properties': 'always'}],
        // 强制用使用self作为this的别名
        'consistent-this':[2,'self'],
        // switch语句最后必须有default
        'default-case': 2,
        // 文件以单一的换行符结束
        'eol-last': [2, 'always'],
        // 必须使用全等
        'eqeqeq': 2,
        // 禁止在函数名和开括号之间有空格
        'func-call-spacing': 2,
        // 对象字面量中冒号的前后空格
        'key-spacing': [2, {'beforeColon': false, 'afterColon': true}],
        // 强制对多行注释使用特定风格
        'multiline-comment-style': [2,'starred-block'],
        // 换行时运算符在行尾还是行首
        'operator-linebreak': [2, 'after'],
        // 强制每个变量初始化语句换行
        'one-var-declaration-per-line': 2,
        // 语句强制分号结尾
        'semi': [2, 'always'],
        // 函数定义时括号前面要不要有空格
        'space-before-function-paren': [2, 'always'],
        // 关键字周围空格的一致性
        'keyword-spacing': 2,
        // 强制在一元操作符前后使用一致的空格,words - 适用于单词类一元操作符，例如：new、delete、typeof、void、yield,nonwords - 适用于这些一元操作符: -、+、--、++、!、!!
        'space-unary-ops': [2, {'words': true, 'nonwords': false}],
        // 要求中缀操作符周围有空格
        'space-infix-ops': [2,{'int32Hint': false}],
        // 注释风格要有空格
        'spaced-comment': [2, 'always'],
        // 必须使用合法的typeof的值,只与字符串字面量或其它 typeof 表达式 进行比较，禁止与其它值进行比较。
        'valid-typeof': [2, {'requireStringLiterals': true}],
        // 立即执行函数表达式的小括号风格
        'wrap-iife': [2, 'inside'],
        // 禁用war申明变量
        'no-var': 2,
        // 禁止在 function 定义中出现重复的参数 ()
        'no-dupe-args': 2,
        // 禁止在对象字面量中出现重复的键
        'no-dupe-keys': 2,
        // 禁止对 function 声明重新赋值
        'no-func-assign': 2,
        // switch中的case标签不能重复
        'no-duplicate-case': 2,
        // 块语句中的内容不能为空
        'no-empty': 2,
        // 禁止使用eval
        'no-eval': 2,
        // 禁止非必要的括号
        'no-extra-parens': 2,
        // 不能用多余的空格
        'no-multi-spaces': 2,
        // 空行最多不能超过2行
        'no-multiple-empty-lines': [2, {'max': 1}],
        // 禁止重复声明变量
        'no-redeclare': 2,
        // 函数调用时 函数名与()之间不能有空格
        'no-spaced-func': 2,
        // 禁止稀疏数组， [1,,2]
        'no-sparse-arrays': 2,
        // 一行结束后面不要有空格
        'no-trailing-spaces': 2,
        // 不能有未定义的变量
        'no-undef': 2,
        // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
        'no-unreachable': 2,
        // 禁止无用的表达式
        'no-unused-expressions': 2,
        // 不能有声明后未被使用的变量或参数
        'no-unused-vars': [2, {'vars': 'all', 'args': 'after-used'}],
        // 未定义前不能使用
        'no-use-before-define': 2,
        // 禁止不必要的分号
        'no-extra-semi': 2,
        // 禁止在字符串和注释之外不规则的空白
        'no-irregular-whitespace': 2,
        // 禁止出现空函数
        'no-empty-function': 2,
        // 禁止在没有类型检查操作符的情况下与 null 进行比较
        'no-eq-null': 2,
        // 禁止将 undefined 作为标识符
        'no-undefined': 2,
    }
};
