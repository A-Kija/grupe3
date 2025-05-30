import * as T from '../Constants/types';


export const getCoursesByTopicId = (courses, topic, topicId) => {
    return {
        type: T.ADD_COURSES_LIST,
        courses,
        topic,
        topicId: parseInt(topicId)
    }
}

export const getCourseById = (course, courseId) => {
    return {
        type: T.ADD_COURSE,
        course,
        courseId: parseInt(courseId)
    }
}

export const getPartContentByPartId = (part, partId) => {
    return {
        type: T.ADD_PART,
        part,
        partId: parseInt(partId)
    }
}