import axios from '@/request/request'
const HomeQuest = {

    /**
     * @description: 获取古诗词
     * @return {*}
     */
    getLover: function () {
        return axios.get('/api/shuqing/aiqing')
    },
}

export default HomeQuest
