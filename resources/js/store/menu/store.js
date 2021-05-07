import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
    namespaced: true,
    state: {
        menuConfig: typeof window.menu_config !== 'undefined' ? window.menu_config : [],
        activeMain: 0,
        activeSub: '',
        activeChild: {},
        sidebar: false,
    },
    getters,
    mutations,
    actions
}
