export default {
    initActive(state) {
        let path = location.pathname + location.search;
        let path2 = '';
        if (location.search === '') {
            path2 = '/' + path.split('/')[1];
        }
        // main menu
        for (let key in state.menuConfig) {
            let main = state.menuConfig[key];
            // console.log(main);
            if (typeof main['items'] === 'undefined') {
                if (typeof main['link'] !== 'undefined' && main['link'] === path) {
                    state.activeMain = parseInt(key);
                }
            } else {
                // sub menu
                for (let key_2 in main['items']) {
                    let sub = main['items'][key_2];
                    // console.log(sub);
                    if (typeof sub['items'] === 'undefined') {
                        if (typeof sub['link'] !== 'undefined' && (sub['link'] === path || sub['link'] === path2)) {
                            state.activeMain = parseInt(key);
                            state.activeSub = parseInt(key_2);
                        }
                    } else {
                        // child menu
                        for (let key_3 in sub['items']) {
                            let child = sub['items'][key_3];
                            let key_4 = key + '_' + key_2 + '_' + key_3;
                            this.commit('menu/setActiveChild', {k1: key, k2: key_2, child: child, k4: key_4});
                        }
                    }
                }
            }
        }
    },
    setActiveChild(state, data) {
        let key = data['k1'];
        let key_2 = data['k2'];
        let key_4 = data['k4'];
        let child = data['child'];
        let path = location.pathname + location.search;
        let path2 = '';
        if (location.search === '') {
            path2 = '/' + path.split('/')[1];
        }
        if (typeof child['items'] === 'undefined') {
            if (typeof child['link'] !== 'undefined' && (child['link'] === path || child['link'] === path2)) {
                state.activeMain = parseInt(key);
                state.activeSub = parseInt(key_2);
                let split = key_4.split('_');
                let arr = [];
                for (let i in split) {
                    arr[i] = split[i];
                    if (i > 1 && i < split.length - 1) {
                        state.activeChild[arr.join('_')] = true;
                    }
                }
            }
        } else {
            for (let key_3 in child['items']) {
                let key_4_2 = key_4 + '_' + key_3;
                let child_2 = child['items'][key_3];
                this.commit('menu/setActiveChild', {k1: key, k2: key_2, child: child_2, k4: key_4_2});
            }
        }
    },
    mainMenuClick(state, key) {
        if (state.activeMain !== key) {
            state.activeMain = key;
            state.activeSub = ''
        }
    },
    subMenuClick(state, data) {
        state.activeSub = data['key'];
        if (data['sidebar']) {
            state.sidebar = data['sidebar'];
        }
        this.commit('menu/setSidebar');
    },
    setSidebar(state) {
        setTimeout(function () {
            if (state.sidebar) {
                $('.report-container').addClass('has-sidebar');
            } else {
                $('.report-container').removeClass('has-sidebar');
            }
        }, 1);
    },
    sidebarToggle(state) {
        state.sidebar = !state.sidebar;
        this.commit('menu/setSidebar');
    },
}
