import React from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

class SingleView extends React.Component {
    static defaultProps = {
        center: {
            lat: 41.3625202,
            lng: -100.5995477

        },
        zoom: 4.96
    };

    state = {
      pills: []
    }

    componentWillMount()
    {
        axios('http://52.244.229.246:5000/PillCoordinates').then((response) =>
        {
            this.setState({pills: response.data.pills})
        })
    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                   <div>Pill Map
                   </div>
                </div>
                <Row>
                    <Col xs={12} className="text-center">
                        <div style={{ height: '80vh', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyBBDqwdD-bi1UZI0tJag5KDQPV2Rt1I-lM" }}
                                defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}
                            >
                                {
                                    this.state.pills.map((pill) => {
                                        return <img
                                            src={"img/pill.png"}
                                            style={{"width": "32px", "height": "32px", "margin-left": "-16px", "margin-top": "-16px"}}
                                            lat={pill.lat}
                                            lng={pill.lng}
                                        />
                                    })
                                }


                            </GoogleMapReact>
                        </div>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }
}

export default withNamespaces('translations')(SingleView);