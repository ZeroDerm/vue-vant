<script type="text/javascript">
var host = 'test.3dclothes.org/clothmanager/public/index.php'
var scheme = 'http'

if (process.env.NODE_ENV === 'development') {
  // alert('开发环境');
}
else {
  scheme = 'https'
  host = 'uniqlo4d.com/test/clothmanager/public/index.php'
  // alert('生产环境');
}
const version = '1.01'
const url = {
  // 商品列表数据
  HOST: `${scheme}://${host}`,

  // 商品列表数据
  GoodsList: `${scheme}://${host}/GoodsList`,

  // 商品详情
  GoodsDetail: `${scheme}://${host}/GoodsDetail`,
  // 推荐搭配列表
  RecommendMatchList: `${scheme}://${host}/RecommendList`,
  // 获取试衣数据
  GetClothes: `${scheme}://${host}/getClothes`,
  // 分类
  Classification: `${scheme}://${host}/Classification`,
  // 购买链接
  getCodeUrl: `${scheme}://${host}/getCodeUrl`,
  // 获取试衣相关的搭配数据
  getMatch: `${scheme}://${host}/getMatch`,
  // 推荐试衣
  reMatchClothInfo: `${scheme}://${host}/reMatchClothInfo`
}

export default
  {
    url: url
  }
</script>
