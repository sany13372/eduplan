import {query} from '@src/gql-client';

export const getEduPlanWebinarRecordLinkQuery = (id:string) => {
    const resp = query.getEduPlanWebinarRecordLink({
        webinarId:id
    });
    return resp
};
