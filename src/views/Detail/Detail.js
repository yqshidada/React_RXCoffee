import { Component } from "react";

import "./Detail.css";

import Navbar from "../../components/Navbar/Navbar";
import Stepper from "../../components/Stepper/Stepper";
import ActionBar from "../../components/ActionBar/ActionBar";

export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      detailData: {
        desc: [],

        //规格
        rules: [],
      },

      //是否收藏
      isLike: false,

      //商品数量
      count: 1,

      //购物袋的总数量
      total: 0
    };
  }

  componentDidMount() {
    console.log("this.props ==> ", this.props);
    this.getProductDataByPid(this.props.match.params.pid);

    this.findUserLike();

    this.getUserProductCount();
  }

  back() {
    // console.log('Detail this.props ==> ', this.props);
    this.props.history.goBack();
  }

  //接收数量
  receiveCount(count) {
    // console.log("count ==> ", count);
    this.state.count = count;

    
  }

  //创建商品描述列表
  createDescList() {
    // console.log('this.state.detailData.desc ==> ', this.state.detailData.desc);
    return this.state.detailData.desc.map((v, i) => {
      return (
        <div key={i} className="d-desc-item">
          {i + 1}、{v}
        </div>
      );
    });
  }

  //创建规格列表
  createRuleList() {
    return this.state.detailData.rules.map((v1, i1) => {
      return (
        <div className="d-rule-item" key={i1}>
          <div className="d-rule-title">{v1.title}</div>
          <div className="d-subrule">
            {
              v1.subRule.map((v2, i2) => {
                return (
                  <div key={i2} className={`d-subrule-item ${v1.activeIndex === i2 ? 'active' : ''}`} onClick={this.toggleSubRuleStatus.bind(this, i1, i2)}>{v2.title}</div>
                );
              })
            }
          </div>
        </div>
      );
    });
  }

  //切换子规格状态
  toggleSubRuleStatus(i1, i2) {
    if (this.state.detailData.rules[i1].activeIndex === i2) {
      return;
    }
    this.state.detailData.rules[i1].activeIndex = i2;
    this.setState({
      detailData: this.state.detailData
    })
  }

  //根据商品pid获取商品信息
  getProductDataByPid(pid) {
    this.$axios({
      method: "get",
      url: "/productDetail",
      params: {
        pid,
      },
    })
      .then((res) => {
        console.log("res ==> ", res);
        if (res.data.code === 600) {
          let data = res.data.result[0];
          data.desc = data.desc.split(/\n/);
          // console.log('data ==> ', data);

          // [
          //   {
          //     title: '温度',
          //     subRule: [
          //       {
          //         title: '热'
          //       },
          //       {
          //         title: '冷'
          //       }
          //     ]
          //   },
          //   {

          //   }
          // ]

          data.rules = [];

          let rules = ["cream", "sugar", "tem", "milk"];
          rules.forEach((v) => {
            //判断是否存在当前规格
            if (!data[v]) {
              return;
            }

            let o = {
              //当前子规格的激活下标
              activeIndex: 0,
              title: data[`${v}_desc`],
              subRule: [],
            };

            //获取data的子规格
            let subRules = data[v].split(/\//);
            subRules.forEach((item) => {
              o.subRule.push({
                title: item,
              });
            });

            data.rules.push(o);
          });

          console.log("data.rules ==> ", data.rules);

          this.setState({
            detailData: data,
          });
        }
      })
      .catch((err) => {
        console.log("err ==> ", err);
      });
  }

  //如果用户登录，则需要查询当前商品是否收藏
  findUserLike() {
    //获取token
    let token = this.$cookies.load('token');

    this.$axios({
      method: 'get',
      url: '/findlike',
      params: {
        pid: this.props.match.params.pid,
        tokenString: token
      }
    }).then(res => {
      console.log('findUserLike res ==> ', res);

      if (res.data.code === 1000 && res.data.result.length === 1) {
        //该商品已经被收藏
        this.setState({
          isLike: true
        })
      }
      
    }).catch(err => {
      console.log('err ==> ', err);
    })
  }

  //收藏商品
  likeAndNotLike() {

    let url = this.state.isLike ? '/notlike' : '/like';
    
    //获取token
    let token = this.$cookies.load('token');

    this.$axios({
      method: 'post',
      url,
      data: {
        pid: this.props.match.params.pid,
        tokenString: token
      }
    }).then(res => {
      console.log('res ==> ', res);
      if (res.data.code === 700) {
        console.log('请先登录');
        return this.props.history.push({pathname: '/login'});
      }


      if (res.data.code === 800) {
        console.log('收藏成功');
        this.setState({
          isLike: true
        })
      } else if (res.data.code === 900 && res.data.result === 1) {
        //取消收藏
        console.log('取消收藏成功');
        this.setState({
          isLike: false
        })
      }

    }).catch(err => {
      console.log('err ==> ', err);
    })
  }

  //加入购物袋
  addShopbag() {
    // console.log('this.state.count ==> ', this.state.count);
    // console.log('this.state.detailData ==> ', this.state.detailData);

    let token = this.$cookies.load('token');

    //获取规格
    let rule = [];
    this.state.detailData.rules.forEach(v => {
      rule.push(v.subRule[v.activeIndex].title)
    })

    // console.log('rule ==> ', rule);

    this.$axios({
      method: 'post',
      url: '/addShopcart',
      data: {
        pid: this.props.match.params.pid,
        count: this.state.count,
        rule: rule.join('/'),
        tokenString: token
      }
    }).then(res => {
      console.log('res ==> ', res);
      console.log(res.data.msg);

      if (res.data.code === 3000) {
        this.setState({
          total: this.state.total + this.state.count
        })
      }

    }).catch(err => {
      console.log('err ==> ', err);
    })
  
  }

  //如果用户登录, 则需要查询用户购物袋的商品数量
  getUserProductCount() {
    let token = this.$cookies.load('token');

    this.$axios({
      method: 'get',
      url: '/shopcartCount',
      params: {
        tokenString: token
      }
    }).then(res => {

      console.log('getUserProductCount res ==> ', res);

      if (res.data.code === 4000) {
        this.setState({
          total: res.data.result
        })
      }

    }).catch(err => {
      console.log('err ==> ', err);
    })
  }

  render() {
    return (
      <div className="detail">
        <Navbar
          clickLeft={this.back.bind(this)}
          leftTitle="返回"
          title="商品详情"
          sticky
        ></Navbar>
        <div>
          <div className="detail-img">
            <img
              className="auto-img"
              src={this.state.detailData.large_img}
              alt=""
            />
          </div>

          <div className="detail-info">
            <div className="d-pro">
              <div className="d-name">
                <div className="d-zhname">{this.state.detailData.name}</div>
                <div className="d-enname">{this.state.detailData.enname}</div>
              </div>
              <div className="d-price">&yen;{this.state.detailData.price}</div>
            </div>

            <div className="d-rule">
              {this.createRuleList()}
            </div>

            <div className="d-count">
              <div className="d-count-title">选择数量</div>
              <div className="d-count-box">
                <Stepper sendCount={this.receiveCount.bind(this)}></Stepper>
              </div>
            </div>

            <div className="d-desc">
              <div className="d-desc-title">商品描述</div>
              <div className="d-desc-content">{this.createDescList()}</div>
            </div>
          </div>
        </div>

        <ActionBar badge={this.state.total} isLike={this.state.isLike} like={this.likeAndNotLike.bind(this)} add={this.addShopbag.bind(this)}></ActionBar>
      </div>
    );
  }
}
