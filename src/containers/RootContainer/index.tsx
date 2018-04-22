/**
* @name RootContainer
* @describe 博客工程的根组件
* @author Baldwin/niceboybao@gmail.com
* @data 2018-3-30, 14:41:58
* @version 1.0.0
*
*/

import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {Switch} from 'react-router';
/*
 * Prompt:Prompt组件用于给用户提示信息
 */
import {BrowserRouter, Route, Link, withRouter, RouteComponentProps, Prompt} from 'react-router-dom';
import {connect, MapStateToProps} from 'react-redux';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

//import compontent
import {NoMatch} from '../NoMatch';
import createRoutes from '../../routes';

//import HomeContents from '../../components/HomeContents';
import HomeNavigation from '../../components/HomeNavigation';
import HomeInformation from '../../components/HomeInformation';
import BackToTop from '../../components/BackToTop';
import BlogFooter from '../../components/BlogFooter';

//import css
import style from './style.scss';

export interface RootContainerOwnProps {

}

export interface RootContainerStateProps {

}

export interface RootContainerState {
    click?: boolean,
}

export class RootContainer extends React.Component<RootContainerStateProps & RootContainerOwnProps, RootContainerState> {

    allRoutes: Array<{path: string, component?: any, exact?: Boolean, render?: (props: RouteComponentProps<any>) => React.ReactNode}>;

    constructor(props: RootContainerStateProps & RootContainerOwnProps) {
        super(props);
        this.state = {
            click: false
        };
        /*
         * 在这时候bind或者箭头函数都ok
         * 在每次 render 过程中， 再调用 bind 都会新建一个新的函数，浪费资源.
         * bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
         */
        this.generateRoutes = this.generateRoutes.bind(this);
        this.testClick = this.testClick.bind(this);

        this.allRoutes = [];
        this.allRoutes = createRoutes();
    }
    componentWillMount() {
        console.log("RootContainer componentWillMount");
    }
    componentDidMount() {
        const CONTENT_HEIGHT = document.getElementById("home_right").offsetHeight;

        console.log("RootContainer componentDidMount");
    }
    // 根路由方法
    generateRoutes() {
        return this.allRoutes.map((route, index) => {
            if (typeof route.component !== 'undefined') {
                if (route.exact) {
                    return <Route key={'ru_' + index} exact path={route.path} component={route.component} />;
                } else {
                    return <Route key={'ru_' + index} path={route.path} component={route.component} />;
                }
            }
            else if (typeof route.render !== 'undefined') {
                if (route.exact) {
                    return <Route key={'ru_' + index} exact path={route.path} render={route.render} />;
                } else {
                    return <Route key={'ru_' + index} path={route.path} render={route.render} />;
                }
            }
        })
    }

    testClick() {
        this.setState({
            click: true
        });
    }

    // 触发视图的重新渲染
    /*
     * @ 一些数据之类的可以通过属性的方式传给组件，不需要在组件里面调用 connect获取state上面的数据，保证组件的复用性
     * @ 传到组件里面的属性发生了变化，组件需要重新render
     */
    render() {
        console.log("====== RootContainer render ======");

        const routes = this.generateRoutes();
        return (
            <div className={style['root-home']}>
                <BackToTop />
                <div onClick={this.testClick} className={style.home}>
                    <div className={style['home-contents']}>
                        <div className={style['home-left']}>
                            <div className={style['home-navigation']}>
                                <HomeNavigation type={this.state.click} />
                            </div>
                            <div className={style['home-information']}>
                                <HomeInformation />
                            </div>
                        </div>
                        <div id="home_right" ref="homeRight" className={style['home-right']}>
                            <Prompt when={false} message="Are you sure you want to leave?" />
                            {React.createElement(Switch, null, [...routes, <Route key='ru_nomatch' component={NoMatch} />])}
                        </div>
                    </div>
                </div>
                <BlogFooter />
            </div>

        );
    }
    //


    //    render() {
    //        const routes = this.generateRoutes();
    //        return (
    //            <Layout>
    //
    //
    //                    <Content style={{margin: '0 1px'}}>
    //                        {routes}
    //                    </Content>
    //                    <Footer style={{textAlign: 'center'}}>
    //                        Blogs Management Console Powered by Ant Design ©2017
    //                    </Footer>
    //            </Layout>
    //        );
    //    }
    //    render() {
    //        const routes = this.generateRoutes();
    //        return (
    //            <Layout>
    //                <Sider collapsible trigger={null} collapsed={this.state.collapsed} >
    //                    <div className="logo" />
    //                    <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['home']}>
    //                        <Menu.Item key="home">
    //                            <Link to="/"><Icon type="home" /><span className="nav-text">Home</span></Link>
    //                        </Menu.Item>
    //                        <SubMenu key="sub1" title={<span><Icon type="user" /><span className="nav-text">User</span></span>} >
    //                            <Menu.Item key="1"><Link to="/user/tom">Tom</Link></Menu.Item>
    //                            <Menu.Item key="2"><Link to="/user/bill">Bill</Link></Menu.Item>
    //                            <Menu.Item key="3"><Link to="/user/alex">Alex</Link></Menu.Item>
    //                        </SubMenu>
    //                        <SubMenu key="sub2" title={<span><Icon type="team" /><span className="nav-text">Team</span></span>} >
    //                            <Menu.Item key="4"><Link to="/team/team1">Team 1</Link></Menu.Item>
    //                            <Menu.Item key="5"><Link to="/team/team2">Team 2</Link></Menu.Item>
    //                            <Menu.Item key="6"><Link to="/team/team3">Team 3</Link></Menu.Item>
    //                            <Menu.Item key="7"><Link to="/team/team4">Team 4</Link></Menu.Item>
    //                            <Menu.Item key="8"><Link to="/team/team5">Team 5</Link></Menu.Item>
    //                        </SubMenu>
    //
    //                    </Menu>
    //                </Sider>
    //                <Layout>
    //                    <Header style={{background: '#fff', padding: 0}} >
    //                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
    //                    </Header>
    //
    //                    <Content style={{margin: '0 16px'}}>
    //                        {React.createElement(Switch, null, [...routes, <Route key='ru_nomatch' component={NoMatch} />])}
    //
    //                    </Content>
    //                    <Footer style={{textAlign: 'center'}}>
    //                        Blogs Management Console Powered by Ant Design ©2017
    //                    </Footer>
    //                </Layout>
    //            </Layout>
    //        );
    //    }
}
