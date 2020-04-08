export default {
    debounce(fn, wait, immediate=false) {
        let timer = null;
        return function(...args) {
            let context = this;
            if (immediate) {
                fn.apply(context, args);
                immediate = false;
            } else {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    fn.apply(context, args);
                }, wait);
            }
        }
    },

    throttle(fn, wait, immediate=false) {
        let prev = Date.now();
        return function(...args) {
            let context = this;
            if (immediate) {
                fn.apply(context, args);
                immediate = false;
            } else {
                let now = Date.now();
                if (now - prev >= wait) {
                    fn.apply(context, args);
                    prev = Date.now();
                }
            }
        }
    }
}
