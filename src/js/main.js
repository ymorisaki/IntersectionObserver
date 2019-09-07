import '../scss/main.scss';

((win, doc) => {
  'use strict';

  /**
   * 汎用スクロール制御
   * @constructor
   * @param {object} root スクロールにより制御される要素
   * @param {object} options インスタンス生成時に設定したオプション
   * @returns {void}
   */
  class Scroll {
    constructor(root, options) {
      const o = {
        observerRoot: null,
        rootMargin: '-10%',
        threshold: 0,
        addClassName: 'is-visible',
        alternate: false
      };

      Object.assign(o, options);

      this.root = root;
      this.observerRoot = o.observerRoot;
      this.rootMargin = o.rootMargin;
      this.threshold = o.threshold;
      this.addClassName = o.addClassName;
      this.alternate = o.alternate;

      this.setObserver();
    }

    /**
     * 交差監視実行
     * @returns {void}
     */
    setObserver() {
      const options = {
        root: this.observerRoot,
        rootMargin: this.rootMargin,
        threshold: this.threshold
      };

      /**
       * setCallback
       * @param {Array} entries IntersectionObserverに関する情報の配列
       * @param {object} object 渡されたoptions等の値を格納
       */
      const setCallback = (entries, object) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(this.addClassName);

          if (!this.alternate) {
            object.unobserve(entry.target);
          }
        });
      };

      // インスタンス生成と監視の実行を開始
      const observer = new IntersectionObserver(setCallback, options);
      observer.observe(this.root);
    }
  }

  win.addEventListener('load', () => {
    doc.querySelectorAll('.point-01').forEach(el => {
      new Scroll(el, {
        alternate: true
      });
    });
  });
})(window, document);