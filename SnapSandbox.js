class SnapSandbox {
    constructor(name) {
        this.name = name;
        this.modifyMap = {}; // 存放修改的属性
        this.windowSnapshot = {};
    }

    active() {
        // 缓存active状态的沙箱
        this.windowSnapshot = {};
        for (const item in window) {
            this.windowSnapshot[item] = window[item];
        }

        Object.keys(this.modifyMap).forEach(p => {
            window[p] = this.modifyMap[p];
        });
    }

    deactive() {
        for (const item in window) {
            if (this.windowSnapshot[item] !== window[item]) {
      
              // 记录变更
              this.modifyMap[item] = window[item];
      
              // 还原window
              window[item] = this.windowSnapshot[item];
            }
        }
    }
}

const snapSandbox = new SnapSandbox('快照沙箱');

snapSandbox.active();  // 激活沙箱
window.a = '1';
console.log('开启沙箱：',window.a);
// snapSandbox.deactive(); //失活沙箱
// console.log('失活沙箱：', window.a);
// snapSandbox.active();   // 重新激活
// console.log('再次激活', window.a);