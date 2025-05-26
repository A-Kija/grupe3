import * as T from '../Constants/types';

export default function coursesListReducer(state, action) {

    const newState = structuredClone(state);


    // console.log('REDUCER', action)

    switch (action.type) {

        case T.ADD_COURSES_LIST:
            {
                const topicId = action?.topic?.id ?? action.topicId;
                const topicTitle = action?.topic?.title ?? '---';
                const topicType = action?.topic?.topicType ?? '---';
                const courses = action.courses;
                newState.push({ topicId, topicTitle, topicType, courses })
                break;
            }

        case T.ADD_COURSE:
            {
                let course = null;
                const courseId = action.courseId;
                const courseParts = action.course;

                for (const topic of newState) {
                    course = topic.courses.find(c => c.id == courseId);
                    if (course) {
                        break;
                    }
                }

                if (null === course) {
                    break;
                }

                course.parts = courseParts;

            }


        default:
    }



    return newState;
}