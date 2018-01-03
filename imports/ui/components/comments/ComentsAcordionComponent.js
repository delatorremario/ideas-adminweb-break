import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import CommentsComponent from './CommentsComponent';

const CommentsAcordionComponent = ({ ideas }) => {
    let iSV = [];
    let iCC = [];
    let iSC = [];
    _.forEach(ideas, (idea) => {
        if (idea.comments && idea.comments.length > 0) {
            /* TODO: Filtrar por visto o no visto */
            iCC.push(idea);
        } else {
            iSC.push(idea);
        }
    })
    return (
        <div>
            <Accordion>
                <Panel className="ci-item" header={`Ideas con comentarios no leidos (${iSV.length})`} eventKey="1" key="1">
                    <Accordion key="1">
                        {
                            _.map(iSV, (idea, index) => {
                                const cantComments = idea && idea.comments && idea.comments.length || 0;
                                return <Panel className="ci-item" header={idea.opportunity + ' (' + cantComments + ') - ' + moment(idea.createAt).format('DD/MM/YYYY')} eventKey={index} key={index}>
                                    <CommentsComponent idea={idea} />
                                </Panel>
                            })
                        }
                    </Accordion>
                </Panel>
                <Panel className="ci-item" header={`Ideas comentadas (${iCC.length})`} eventKey="2" key="2">
                    <Accordion key="2">
                        {
                            _.map(iCC, (idea, index) => {
                                const cantComments = idea && idea.comments && idea.comments.length || 0;
                                return <Panel className="ci-item" header={idea.opportunity + ' (' + cantComments + ') - ' + moment(idea.createAt).format('DD/MM/YYYY')} eventKey={index} key={index}>
                                    <CommentsComponent idea={idea} />
                                </Panel>
                            })
                        }
                    </Accordion>
                </Panel>
                <Panel className="ci-item" header={`Ideas sin comentarios (${iSC.length})`} eventKey="3" key="3">
                    <Accordion key="3">
                        {
                            _.map(iSC, (idea, index) => {
                                const cantComments = idea && idea.comments && idea.comments.length || 0;
                                return <Panel className="ci-item" header={idea.opportunity + ' (' + cantComments + ') - ' + moment(idea.createAt).format('DD/MM/YYYY')} eventKey={index} key={index}>
                                    <CommentsComponent idea={idea} />
                                </Panel>
                            })
                        }
                    </Accordion>
                </Panel>
            </Accordion>
        </div>
    )
}

export default CommentsAcordionComponent;