export type PureSnowConfig = {
    root: Element,
    cssRoot: Element,
    snowflakesCount: number,
    snowWrapperClass: string,
    // when snowflakeClass is changed, make sure to update the baseCSS accordingly
    snowflakeClass: string,
    heightPx?: number,
    heightVh?: number,
    widthPx?: number,
    widthVw?: number,
    baseCSS: string,
}

class PureSnow {
    config: PureSnowConfig;

    constructor(config?: PureSnowConfig) {
        const defaultConfig = {
            snowflakesCount: 200,
            snowWrapperClass: 'snow-wrapper',
            snowflakeClass: 'snowflake',
            root: document.body,
            cssRoot: document.head,
            baseCSS: '',
        };
        this.config = { ...defaultConfig, ...config };
    }

    generateSnow() {
        const root = this.config.root;
        const wrapperClass = this.config.snowWrapperClass;
        const snowWrapper = this.config.root.querySelector(`.${wrapperClass}`) as HTMLElement | null | undefined;
        if (!snowWrapper) return;
        const overwriteCount = Number(snowWrapper.dataset['count']);
        if (isFinite(overwriteCount) && overwriteCount > 0) {
            this.config.snowflakesCount = overwriteCount;
        }
        // Clear existing snowflakes
        snowWrapper.innerHTML = '';
        for (let i = 0; i < this.config.snowflakesCount; i++) {
            const snowflake = root.ownerDocument.createElement('div');
            snowflake.className = this.config.snowflakeClass;
            snowWrapper.appendChild(snowflake);
        }
    }

    ensureCSSElem() {
        const cssRoot = this.config.cssRoot;
        let cssElement = cssRoot.querySelector('#psts-css');
        // Create CSS element if it doesn't exist
        if (cssElement === null) {
            cssElement = cssRoot.ownerDocument.createElement('style');
            cssElement.id = 'psts-css';
        }
        cssElement.innerHTML = this.config.baseCSS || '';
        return cssElement;
    }

    randomInt(value: number) {
        return Math.floor(Math.random() * value) + 1;
    }

    randomIntRange(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    generateSnowCSS() {
        const cssRoot = this.config.cssRoot;
        const cssElem = this.ensureCSSElem();
        const snowflakesCount = this.config.snowflakesCount;
        const snowflakeName = this.config.snowflakeClass;
        const rules = new Array<string>(snowflakesCount);
        let pageHeightVh = this.config.heightVh;
        if (!pageHeightVh) {
            if (this.config.heightPx) {
                pageHeightVh = this.config.heightPx / window.innerHeight * 100;
            } else {
                pageHeightVh = this.config.root.scrollHeight / window.innerHeight * 100;
            }
        }
        let pageWidthVw = this.config.widthVw;
        if (!pageWidthVw) {
            if (this.config.widthPx) {
                pageWidthVw = this.config.widthPx / window.innerWidth * 100;
            } else {
                pageWidthVw = this.config.root.scrollWidth / window.innerWidth * 100;
            }
        }
        for (let i = 1; i <= this.config.snowflakesCount; i++) {
            const randomX = this.getRandomArbitrary(0, pageWidthVw); // vw
            const randomOffset = Math.random() * 10 // vw;
            const randomXEnd = randomX + randomOffset;
            const randomXEndYoyo = randomX + (randomOffset / 2);
            const randomYoyoTime = this.getRandomArbitrary(0.3, 0.8);
            const randomYoyoY = randomYoyoTime * pageHeightVh; // vh
            const randomScale = Math.random();
            const fallDuration = this.randomIntRange(10, pageHeightVh / 10 * 3); // s
            const fallDelay = this.randomInt(pageHeightVh / 10 * 3) * -1; // s
            const opacity = Math.random();
            rules[i] = `
.${snowflakeName}:nth-child(${i}) {
    opacity: ${opacity};
    transform: translate(${randomX}svw, -10px) scale(${randomScale});
    animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
}
@keyframes fall-${i} {
    ${randomYoyoTime * 100}% {
        transform: translate(${randomXEnd}svw, ${randomYoyoY}svh) scale(${randomScale});
    }
    to {
        transform: translate(${randomXEndYoyo}svw, ${pageHeightVh}svh) scale(${randomScale});
    }
}`
        }
        cssElem.innerHTML = rules.join("");
        cssRoot.appendChild(cssElem);
    }
    init() {
        this.generateSnow();
        this.generateSnowCSS();
    }
}

function init(config?: PureSnowConfig) {
    const pureSnow = new PureSnow(config);
    pureSnow.init();
    return pureSnow;
}

export { PureSnow, init };
(() => {
    if (typeof window !== 'undefined') {
        (window as any).PureSnow = PureSnow;
        (window as any).initPureSnow = init;
    }
    if (document.currentScript) {
        if (document.currentScript.dataset["init"] === "true") {
            document.addEventListener('DOMContentLoaded', () => {
                init();
            });
        }
    } else if (import.meta.url) {
        const queryString = import.meta.url.split('?')[1];
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.get('init') === 'true') {
            document.addEventListener('DOMContentLoaded', () => {
                init();
            });
        }
    }
})();