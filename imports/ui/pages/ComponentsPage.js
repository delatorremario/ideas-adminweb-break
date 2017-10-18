import React from 'react';

const ComponentsPage = () => (
    <div>
        {/* <!--main content start--> */}
        <section className="main-content-wrapper">
            <div className="pageheader">
                <h1>Buttons</h1>
                <div className="breadcrumb-wrapper hidden-xs">
                    <span className="label">You are here:</span>
                    <ol className="breadcrumb">
                        <li><a href="index.html">Dashboard</a>
                        </li>
                        <li>UI Elements</li>
                        <li className="active">Buttons</li>
                    </ol>
                </div>
            </div>
            <section id="main-content" className="animated fadeInUp">
                {/* <!--button start--> */}
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Default Buttons</h3>
                                <div className="actions pull-right">
                                    <i className="fa fa-expand"></i>
                                    <i className="fa fa-chevron-down"></i>
                                    <i className="fa fa-times"></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <button type="button" className="btn btn-default">Default</button>
                                <button type="button" className="btn btn-primary">Primary</button>
                                <button type="button" className="btn btn-success">Success</button>
                                <button type="button" className="btn btn-info">Info</button>
                                <button type="button" className="btn btn-warning">Warning</button>
                                <button type="button" className="btn btn-danger">Danger</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">3d Buttons</h3>
                                <div className="actions pull-right">
                                    <i className="fa fa-expand"></i>
                                    <i className="fa fa-chevron-down"></i>
                                    <i className="fa fa-times"></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <button type="button" className="btn btn-default btn-3d">Default</button>
                                <button type="button" className="btn btn-primary btn-3d">Primary</button>
                                <button type="button" className="btn btn-success btn-3d">Success</button>
                                <button type="button" className="btn btn-info btn-3d">Info</button>
                                <button type="button" className="btn btn-warning btn-3d">Warning</button>
                                <button type="button" className="btn btn-danger btn-3d">Danger</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Square Buttons</h3>
                                <div className="actions pull-right">
                                    <i className="fa fa-expand"></i>
                                    <i className="fa fa-chevron-down"></i>
                                    <i className="fa fa-times"></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <button type="button" className="btn btn-default btn-square">Default</button>
                                <button type="button" className="btn btn-primary btn-square">Primary</button>
                                <button type="button" className="btn btn-success btn-square">Success</button>
                                <button type="button" className="btn btn-info btn-square">Info</button>
                                <button type="button" className="btn btn-warning btn-square">Warning</button>
                                <button type="button" className="btn btn-danger btn-square">Danger</button>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Transparent Buttons</h3>
                                <div className="actions pull-right">
                                    <i className="fa fa-expand"></i>
                                    <i className="fa fa-chevron-down"></i>
                                    <i className="fa fa-times"></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <button type="button" className="btn btn-default btn-trans">Default</button>
                                <button type="button" className="btn btn-primary btn-trans">Primary</button>
                                <button type="button" className="btn btn-success btn-trans">Success</button>
                                <button type="button" className="btn btn-info btn-trans">Info</button>
                                <button type="button" className="btn btn-warning btn-trans">Warning</button>
                                <button type="button" className="btn btn-danger btn-trans">Danger</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Button Sizes</h3>
                                <div className="actions pull-right">
                                    <i className="fa fa-expand"></i>
                                    <i className="fa fa-chevron-down"></i>
                                    <i className="fa fa-times"></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <button type="button" className="btn btn-default btn-lg">Large button</button>
                                <button type="button" className="btn btn-primary">Default button</button>
                                <button type="button" className="btn btn-success btn-sm">Small button</button>
                                <button type="button" className="btn btn-info btn-xs">Extra small button</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Button Icons</h3>
                                <div className="actions pull-right">
                                    <i className="fa fa-expand"></i>
                                    <i className="fa fa-chevron-down"></i>
                                    <i className="fa fa-times"></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <button type="button" className="btn btn-success"><i className="fa fa-check"></i> Success button</button>
                                <button type="button" className="btn btn-info"><i className="fa fa-info-circle"></i> Info button</button>
                                <button type="button" className="btn btn-warning"><i className="fa fa-warning"></i> Warning button</button>
                                <button type="button" className="btn btn-danger"><i className="fa fa-times-circle"></i> Danger button</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Button dropdowns</h3>
                                <div className="actions pull-right">
                                    <i className="fa fa-expand"></i>
                                    <i className="fa fa-chevron-down"></i>
                                    <i className="fa fa-times"></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <h4>Single button dropdowns</h4>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                Action <span className="caret"></span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Action</a>
                                                </li>
                                                <li><a href="#">Another action</a>
                                                </li>
                                                <li><a href="#">Something else here</a>
                                                </li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="btn-group">
                                            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                                Action <span className="caret"></span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Action</a>
                                                </li>
                                                <li><a href="#">Another action</a>
                                                </li>
                                                <li><a href="#">Something else here</a>
                                                </li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="btn-group">
                                            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                                Action <span className="caret"></span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Action</a>
                                                </li>
                                                <li><a href="#">Another action</a>
                                                </li>
                                                <li><a href="#">Something else here</a>
                                                </li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Split button dropdowns</h4>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning">Action</button>
                                            <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Action</a>
                                                </li>
                                                <li><a href="#">Another action</a>
                                                </li>
                                                <li><a href="#">Something else here</a>
                                                </li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="btn-group">
                                            <button type="button" className="btn btn-info">Action</button>
                                            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Action</a>
                                                </li>
                                                <li><a href="#">Another action</a>
                                                </li>
                                                <li><a href="#">Something else here</a>
                                                </li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="btn-group">
                                            <button type="button" className="btn btn-danger">Action</button>
                                            <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Action</a>
                                                </li>
                                                <li><a href="#">Another action</a>
                                                </li>
                                                <li><a href="#">Something else here</a>
                                                </li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Dropup variation</h4>

                                        <div className="btn-group dropup">
                                            <button type="button" className="btn btn-default">Dropup</button>
                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Action</a>
                                                </li>
                                                <li><a href="#">Another action</a>
                                                </li>
                                                <li><a href="#">Something else here</a>
                                                </li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="btn-group dropup">
                                            <button type="button" className="btn btn-info">Dropup</button>
                                            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Action</a>
                                                </li>
                                                <li><a href="#">Another action</a>
                                                </li>
                                                <li><a href="#">Something else here</a>
                                                </li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="btn-group dropup">
                                            <button type="button" className="btn btn-primary">Dropup</button>
                                            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Action</a>
                                                </li>
                                                <li><a href="#">Another action</a>
                                                </li>
                                                <li><a href="#">Something else here</a>
                                                </li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Button Blocks</h3>
                                <div className="actions pull-right">
                                    <i className="fa fa-expand"></i>
                                    <i className="fa fa-chevron-down"></i>
                                    <i className="fa fa-times"></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <button type="button" className="btn btn-default btn-block">Default</button>
                                <button type="button" className="btn btn-primary btn-block">Primary</button>
                                <button type="button" className="btn btn-success btn-block">Success</button>
                                <button type="button" className="btn btn-info btn-block">Info</button>
                                <button type="button" className="btn btn-warning btn-block">Warning</button>
                                <button type="button" className="btn btn-danger btn-block">Danger</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Button groups</h3>
                                <div className="actions pull-right">
                                    <i className="fa fa-expand"></i>
                                    <i className="fa fa-chevron-down"></i>
                                    <i className="fa fa-times"></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <h4>Basic example</h4>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default">Left</button>
                                    <button type="button" className="btn btn-default">Middle</button>
                                    <button type="button" className="btn btn-default">Right</button>
                                </div>
                                <h4>Button toolbar</h4>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default">1</button>
                                        <button type="button" className="btn btn-default">2</button>
                                        <button type="button" className="btn btn-primary">3</button>
                                        <button type="button" className="btn btn-default">4</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-info">5</button>
                                        <button type="button" className="btn btn-info">6</button>
                                        <button type="button" className="btn btn-info">7</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default">8</button>
                                    </div>
                                </div>
                                <h4>Nesting</h4>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default">1</button>
                                    <button type="button" className="btn btn-default">2</button>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                            Dropdown
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">Dropdown link</a>
                                            </li>
                                            <li><a href="#">Dropdown link</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <h4>Justified button group</h4>
                                <div className="btn-group btn-group-justified">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default">Left</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-primary">Middle</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default">Right</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--button end--> */}
            </section>
        </section>
        {/* <!--main content end--> */}
    </div>
);


export default ComponentsPage;
