import {
	HIDE_LOADING,
	SHOW_LOADING,
} from './type'

const state={
	loading:false,
};

const mutations={
	/*loading*/
	[HIDE_LOADING](state){
		state.loading=false;
	},
	[SHOW_LOADING](state){
		state.loading=true;
	}
};

const getters={
	loading(state){
		return state.loading;
	}
};

export default{
	state,
	mutations,
	getters
}
