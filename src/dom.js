import { toJpeg } from 'dom-to-image';

export function copyText(text) {
    const p = document.createElement('p');
    p.style.position = 'absolute';
    p.style.left = '-1000px';
    p.innerText = text;
    document.body.appendChild(p);

    const selection = document.getSelection();
    const range = document.createRange();

    range.setStart(p, 0);
    range.setEnd(p, p.childNodes.length);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy', false, null);

    selection.removeAllRanges();
    document.body.removeChild(p);
}

/**
 *
 * @param {HTMLElement} node
 * @param {{style: {}}} config
 * @returns {Promise<unknown>}
 */
export const nodeToJpeg = (node, config = {}) => {
    return new Promise((resolve, reject) => {
        const {
            style,
            ...otherConfig
        } = config;
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        const scale = Math.max(window.devicePixelRatio, 3);
        const params = {
            height: height * scale,
            width: width * scale,
            style: {
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: width + 'px',
                height: height + 'px',
                ...style,
            },
            ...otherConfig,
        };
        toJpeg(node, params).
          then(() => {
              toJpeg(node, params).
                then(dataUrl => {
                    resolve(dataUrl);
                }).
                catch(error => {
                    reject(error);
                });
          }).
          catch(error => {
              reject(error);
          });
    });
};

/**
 * 预加载给定图片url列表
 * @param {string[]} imagesSrc 包含图片url的列表
 * @return {Promise<unknown[]>}
 */
export const preloadImages = (imagesSrc = []) => {
    function loadingImage(src) {
        return new Promise((resolve, reject) => {
            try {
                let img = new Image();
                img.src = src;
                img.onload = () => {
                    resolve(img);
                };
            } catch (e) {
                reject(e);
            }
        });
    }

    const loadingImages = imagesSrc.map(imageSrc => loadingImage(imageSrc));
    return Promise.all(loadingImages);
};
