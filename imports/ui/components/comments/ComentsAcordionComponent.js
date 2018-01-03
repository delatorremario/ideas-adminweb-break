import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import CommentsComponent from './CommentsComponent';

const CommentsAcordionComponent = ({ ideas }) => {
    let iCC = [];
    let iSC = [];
    let iSV = [];
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
                {
                    iCC.length < 1 ? '' :
                    _.map(iCC, (idea, index) => {
                        const cantComments = idea && idea.comments && idea.comments.length || 0;
                        if (cantComments > 0) {
                            return <Panel className="ci-item" header={idea.opportunity + ' (' + cantComments + ') - ' + moment(idea.createAt).format('DD/MM/YYYY')} eventKey={index} key={index}>
                                <CommentsComponent idea={idea} />
                            </Panel>
                        } else {
                            return
                        }
                    })
                }
            </Accordion>
            {/* TODO: Agregar lista de ideas sin comentar */}
        </div>
    )
}

export default CommentsAcordionComponent;