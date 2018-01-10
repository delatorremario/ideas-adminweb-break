import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

export default class UpSideDown extends Component {

    componentWillMount() {
    }

    componentDidMount() {
        $(document).scroll(function () {
            $('.up').stop(true, true);
            $('.down').stop(true, true);
            var y = $('html,body').scrollTop();
            if (y >= 0 && y < 500) {
                $('.up').animate({ opacity: '0' }, 500);
                $('.down').animate({ opacity: '1' }, 500);
            }
            if (y >= 500 && y < document.body.scrollHeight - $(window).height() - 500) {
                $('.up').animate({ opacity: '1' }, 500);
                $('.down').animate({ opacity: '1' }, 500);
            }
            if (y >= document.body.scrollHeight - $(window).height() - 500) {
                $('.up').animate({ opacity: '1' }, 500);
                $('.down').animate({ opacity: '0' }, 500);
            }
        });
    }

    scroll = move => event => {
        event.preventDefault();
        switch (move) {
            case 'up':
                $('html,body').stop(true, true);
                $('html,body').animate({ scrollTop: 0 }, 'slow', 'swing');
                break;

            case 'down':
                $('html,body').stop(true, true);
                $('html,body').animate({ scrollTop: document.body.scrollHeight }, 'slow', 'swing');
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <div className="upsidedown">
                <i className='fa fa-chevron-circle-up btn up'
                    onClick={this.scroll('up').bind(this)}>
                </i>
                <i className='fa fa-chevron-circle-down btn down'
                    onClick={this.scroll('down').bind(this)}>
                </i>
            </div>
        )
    }
}