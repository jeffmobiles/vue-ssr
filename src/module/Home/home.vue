<template>
  <div class="hhly-mall">

    <!-- 头部 -->
    <header class="header-fixed so-header">
      <div class="header-wrapper">
        <div class="left">
          <i class="icon-search"></i>
        </div>
        <router-link :to="{path:'/mallList'}" tag="div" class="search-wrapper">
          <input type="text" class="header-input" placeholder="搜索商品"/>
        </router-link>
        <router-link :to="{name:'user'}" tag="div" class="right">
          <i class="icon-user"></i>
        </router-link>
      </div>
    </header>
    <!-- 滚动区域 -->
    <div class="content">
      <div class="mall-looper">
        <div class="header-container swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="./../../assets/img/loop1.png"/>
            </div>
            <div class="swiper-slide">
              <img src="./../../assets/img/loop2.png"/>
            </div>
            <div class="swiper-slide">
              <img src="./../../assets/img/loop3.png"/>
            </div>
            <div class="swiper-slide">
              <img src="./../../assets/img/loop4.png"/>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>


      <div class="mall-ads">
        <div class="lists">
          <div class="rows">
            <router-link tag="div" :to="{name:'goodDetail',params:{goodId:1}}" class="item-cell flex-vertical">
              <img src="./../../assets/img/ad1.png"/>
            </router-link>
            <router-link tag="div" :to="{name:'goodDetail',params:{goodId:2}}" class="item-cell flex-vertical">
              <img src="./../../assets/img/ad2.png"/>
            </router-link>
          </div>
          <div class="rows">
            <router-link tag="div" :to="{name:'goodDetail',params:{goodId:39}}" class="item-cell flex-vertical">
              <img src="./../../assets/img/ad3.png"/>
            </router-link>
            <router-link tag="div" :to="{name:'goodDetail',params:{goodId:13}}" class="item-cell flex-vertical">
              <img src="./../../assets/img/ad4.png"/>
            </router-link>
          </div>
        </div>

      </div>

      <div class="mall-hot">
        <div class="hot-title">
          热门推荐
          <router-link tag="a" :to="{path:'mallList',query:{type:'hot'}}" class="hot-more">
            <span class="more-title">查看更多</span>
            <i class="icon-more"></i>
          </router-link>
        </div>
        <div class="hot-content">
          <div class="hot-container swiper-container">
            <div class="swiper-wrapper box-shadow-round">
              <div class="swiper-slide" v-for="(hotItem,hotIndex) in business.hots">
                <router-link tag="div" :to="{name:'goodDetail',params:{goodId:hotItem.id}}" class="pic-item">
                  <div v-if="hotIndex <3" :class="{'top':hotIndex <3}">TOP</div>
                  <img v-bind:src="hotItem.picUrl" class="hot-pic"/>
                  <div class="hot-name-wrapper flex-vertical">
                    <div class="hot-name">{{hotItem.name}}</div>
                  </div>
                  <span class="hot-price">￥{{hotItem.price | FloatTwo}}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mall-new">
        <div class="new-title">
          新品上架
          <router-link tag="a" :to="{path:'mallList',query:{type:'new'}}" class="new-more">
            <span class="more-title">查看更多</span>
            <i class="icon-more"></i>
          </router-link>
        </div>
        <div class="new-content">
          <div class="new-lists ">
            <section data-group="2">
              {{business.news}}
              <router-link tag="div" :to="{name:'goodDetail',params:{goodId:newItem.id}}" class="item two-cell"
                           v-for="newItem in business.news">
                <img class="item-pic" v-bind:src="newItem.picUrl"/>
                <div class="name  flex-vertical">
                  <div class="title">{{newItem.name}}</div>
                </div>
                <div class="price">￥{{newItem.price | FloatTwo}}</div>
              </router-link>
            </section>
          </div>
          <div class="no-more" v-if="support.hasMore == false">
            没有更多商品了!
          </div>
        </div>
      </div>

      <!--<back-scroll></back-scroll>-->
    </div>


    <!-- 回到顶部 -->
    <!--<back-scroll :scroller="support.loadScroller" class="mall-backTop" ></back-scroll>-->
    <!-- 下拉加载更多 -->
    <!--<infinite-scroll :scroller="support.loadScroller" :loading = "support.loading"  @load="loadMore()"></infinite-scroll>-->
  </div>
</template>


<script>
import api from "./../../api/data";
export default {
  data: function () {
    return {
      support: {
        loadScroller: null,
        loading: false,
        currentPage: 0,
        hasMore: true
      },
      business: {
        hots: [],
        news: []
      }
    }
  },
  created: function () {
    this.init();
  },
  mounted: function () {
    this.support.loadScroller = $(".content")[0];
    this.initHeaderPicLoop();
    this.initHotLoop();

  },
  methods: {
    initHeaderPicLoop: function () {
      var headerPicLoop = new Swiper(' .header-container ', {
        autoplay: 4000,//可选选项，自动滑动
        pagination: '.swiper-pagination',
        observer: true
      })
    },
    initHotLoop: function () {
      var hotLoop = new Swiper('.hot-container', {
//          loop:true,
        centeredSlides: true,
        initialSlide: 0,
        slidesPerView: 1.3,
        spaceBetween: 12,
        observer: true,
        observeParents: true
      });
    },
    init: function () {
      var vue = this;
      api.mallHome().then(function (data) {
        console.log("获取的结果",data);
        if (data.status == 200) {
          var result = data && data.data && data.data.value;
          vue.business.hots = result.content;
        }
      }, function (err) {
        //console.log("err",err);
      })

      api.mallHomeNew(0).then(function (data) {
        if (data.status == 200) {
          var result = data && data.data && data.data.value;
          vue.business.news = result.content;
        }
      })
    },

    //loadMore
    loadMore: function () {
      var page = this.support.currentPage + 1;
      var vue = this;
      api.mallHomeNew(page).then(function (data) {
        if (data.status == 200) {
          var result = data && data.data && data.data.value;
          var resultCode = data && data.data && data.data.result;
          if (resultCode == 0) {
            vue.business.news = vue.business.news.concat(result.content);
          }
          var totalPage = result && result.totalPages;
          if (totalPage == page) {
            vue.support.hasMore = false;
          }
          vue.support.currentPage = vue.support.currentPage + 1;
        }
      })
    }
  }
}
</script>


<style lang="less" scoped>
@import url('./home.less');
</style>
