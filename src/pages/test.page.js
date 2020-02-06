import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../redux/user/user.selectors";
import { setCurrentUser } from "../redux/user/user.actions";

import { CarouselProvider, Slider, Slide } from "../components/carousel";

class Test extends Component {
    constructor() {
        super();
        /*if(props.staticContext && props.staticContext.data) {
            this.state = {
                data: props.staticContext.data
            }
        }else
            this.state = {
                data: []
            }*/
    }

    componentDidMount(){
        /*setTimeout(() => {
            if(window.__ROUTE_DATA__) {
                this.setState({
                    data: window.__ROUTE_DATA__
                });
                delete window.__ROUTE_DATA__;
            }else{
                loadData('posts').then(data => {
                    this.setState({ data });
                });
            }
        }, 0);*/
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                {user}
                Tests
                

                <CarouselProvider
                    visibleSlides={3}
                    totalSlides={9}
                >
                    <Slider>
                        <Slide index={0}>
                            <img src="https://www.albertjuhe.com/images/01.jpg" style={{width: '100%'}}/>
                        </Slide>
                        <Slide index={1}>
                            <img src="https://www.albertjuhe.com/images/02.jpg" style={{width: '100%'}}/>
                        </Slide>
                        <Slide index={2}>
                            <img src="https://www.albertjuhe.com/images/03.jpg" style={{width: '100%'}}/>
                        </Slide>
                        <Slide index={3}>
                            <img src="https://www.albertjuhe.com/images/04.jpg" style={{width: '100%'}}/>
                        </Slide>
                        <Slide index={4}>
                            <img src="https://www.albertjuhe.com/images/05.jpg" style={{width: '100%'}}/>
                        </Slide>
                        <Slide index={5}>
                            <img src="https://www.albertjuhe.com/images/06.jpg" style={{width: '100%'}}/>
                        </Slide>
                        <Slide index={6}>
                            <img src="https://www.albertjuhe.com/images/07.jpg" style={{width: '100%'}}/>
                        </Slide>
                        <Slide index={7}>
                            <img src="https://www.albertjuhe.com/images/08.jpg" style={{width: '100%'}}/>
                        </Slide>
                        <Slide index={8}>
                            <img src="https://www.albertjuhe.com/images/09.jpg" style={{width: '100%'}}/>
                        </Slide>
                    </Slider>
                </CarouselProvider>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);