const getters = {
	shop_num: (state) => state.goodsList.items,
    permissions:(state)=>{
        return ['system:default-button']
    }
};

export default getters;
