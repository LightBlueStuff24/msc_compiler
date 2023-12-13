exports.ME = (t, o, l, e) => {
    switch (l.length) {
        case 0:
            return new Error(`[${t.name}] [ME: ERROR]: location length must be > 0`);
        case 1:
            return new Error(`[${t.name}] [component: ${l[0]}]: expected ${e} instead found ${typeof o}`);
        case 2:
            return new Error(`[${t.name}] [component: ${l[0]}] [child: ${l[1]}]: expected ${e} instead found ${typeof o}`);
        case 3:
            return new Error(`[${t.name}] [component: ${l[0]}] [child: ${l[1]}] [subChild: ${l[2]}]: expected ${e} instead found ${typeof o}`);
        case 4:
            return new Error(`[${t.name}] [component: ${l[0]}] [child: ${l[1]}] [subChild: ${l[2]}] [prop: ${l[3]}]: expected ${e} instead found ${typeof o}`);
        case 5:
            return new Error(`[${t.name}] [component: ${l[0]}] [child: ${l[1]}] [subChild: ${l[2]}] [prop: ${l[3]}] [subProp: ${l[4]}]: expected ${e} instead found ${typeof o}`);
        default:
            return;
    }
}
