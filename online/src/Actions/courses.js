import * as T from '../Constants/types';


export const getCoursesByTopicId = (courses, topic, topicId) => {
    return {
        type: T.ADD_COURSES_LIST,
        courses,
        topic,
        topicId: parseInt(topicId)
    }
}